import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index'
import { Redirect } from 'react-router-dom';

import Task from './Task/Task';
import Loader from '../../components/UI/Spinner/Spinner';


class Tasks extends Component {
    componentDidMount = () => {
        if(!this.props.userId){
            this.props.onCheckToken();
        }else{
            this.props.onInitTasks(this.props.userId);
        }
    };

    componentWillMount = () => {
        
    };

    deleteTaskHandler = (taskId) => {
        console.log('deleteTaskHandler', taskId);
    };

    render() {
        let authRedirect = null;
        const { taskList } = this.props;

        let allTasks = <Loader />
        if(this.props.userId === null){
            authRedirect = <Redirect to="/" />
        }else if(taskList.length){
            allTasks = taskList.map(fetchedTask => (
                <Task
                    {...fetchedTask}
                    key={fetchedTask.id}
                />
            ));
        }else{
            allTasks = <p>No task found! Try adding one.</p>
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
        userId: state.authReducer.userId,
        taskList: state.taskReducer.taskList
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onCheckToken: () => dispatch(actionTypes.authCheckState()),
        onInitTasks: (userId) => dispatch(actionTypes.initTasks(userId)),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);