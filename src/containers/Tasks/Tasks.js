import React, { Component } from 'react';
// import axios from '../../axios-tasks';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index'
import { Redirect } from 'react-router-dom';

import Task from './Task/Task';
import Loader from '../../components/UI/Spinner/Spinner';

// import '../../assets/semantic/semantic.min.css';
// import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';


class Tasks extends Component {
    state = {
        fetchedTasks: [],
        loading: false
    };

    componentDidMount = () => {
        console.log('componentDidMount');
    };

    componentWillMount = () => {
        console.log('compoenenWill Mount');
        if(!this.props.token){
            this.props.onCheckToken();
        }

        if(!this.props.taskList.length){
            this.props.onInitTasks(this.props.token, this.props.userId);
            this.setState({ loading: true });
        }
    };

    deleteTaskHandler = (taskId) => {
        console.log('deleteTaskHandler', taskId);
    };

    render() {
        let authRedirect = null;

        let allTasks = <Loader />
        if(this.props.token === null){
            authRedirect = <Redirect to="/" />
        }else{
            if(this.props.taskList.length){
                allTasks = this.props.taskList.map(fetchedTask => (
                    <Task
                        {...fetchedTask}
                        key={fetchedTask.id}
                    />
    
                ));
            }else{
                allTasks = <p>No task found! Try adding one.</p>
            }
        }
        return (
            <div>
                {authRedirect}
                <h1>Todos List</h1>
                {allTasks}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        taskList: state.taskReducer.taskList,
        userId: state.authReducer.userId,
        token: state.authReducer.token
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onInitTasks: (token, userId) => dispatch(actionTypes.initTasks(token, userId)),
        onCheckToken: () => dispatch(actionTypes.authCheckState())
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);