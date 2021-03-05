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
        if(!this.props.taskList.length){
            this.props.onInitTasks(this.props.token);
            this.setState({ loading: true });
        }
    };

    deleteTaskHandler = (taskId) => {
        console.log(taskId);
    };

    render() {
        let authRedirect = null;
        if(this.props.token === null){
            authRedirect = <Redirect to="/" />
        }
        let allTasks = <Loader />
        if(this.props.taskList.length){
            allTasks = this.props.taskList.map(fetchedTask => (
                <Task
                    title={fetchedTask.title}
                    description={fetchedTask.description}
                    id={fetchedTask.id}
                    key={fetchedTask.id}
                />

            ));
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
        onInitTasks: (token) => dispatch(actionTypes.initTasks(token))
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);