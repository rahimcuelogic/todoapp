import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';
// import axios from '../../../axios-tasks';
import { Redirect } from 'react-router-dom';

import Aux from '../../../hoc/aux';

import { Form, Input, Button } from 'semantic-ui-react';
import Loader from '../../../components/UI/Spinner/Spinner';

import Response from '../../../components/Response/Response';



class TaskBuilder extends Component {
    state = {
        task: {
            title: '',
            description: ''
        },
        taskStatus: ''
    };

    createTaskHandler = () => {
        const task = {
            ...this.state.task,
            userId: this.props.userId
        }
        this.props.onAddTasks(task, this.props.token);
        const updatedState = {
            ...this.state,
            task: {
                ...this.state.task,
                title: '',
                description: '',
            },
            taskStatus: 'success'
        };
        this.setState({ updatedState });
    };

    titleChangeHandler = (event) => {
        const updatedTask = {
            ...this.state.task,
            title: event.target.value
        };
        this.setState({ task: updatedTask });
    };

    descriptionChangeHandler = (event) => {
        const updatedDescription = {
            ...this.state.task,
            description: event.target.value
        };
        this.setState({ task: updatedDescription });
    };

    render() {
        let taskStatus = '';
        if(this.state.taskStatus === 'success'){
            taskStatus = <Response
                type="info"
                message="Task added successfully."
            />
        }
        if(this.state.taskStatus === 'failed'){
            taskStatus = <Response
                type="failed"
                message="Please try again later."
            />
        }
        let authRedirect = null;
        if(this.props.token === null){
            authRedirect = <Redirect to="/" />
        }
        return (
          <Aux>
            {authRedirect}
            <h1>Create new task</h1>
            <Form onSubmit={this.createTaskHandler}>
                <Form.Field>
                    <Input 
                        label="Title" 
                        placeholder='Add title' 
                        type="text" 
                        onChange={this.titleChangeHandler} 
                        value={this.state.task.title} />
                </Form.Field>
                <Form.Field>
                    <Input 
                        label="Description" 
                        placeholder='Add Description' 
                        type="text"
                        onChange={this.descriptionChangeHandler} 
                        value={this.state.task.description} />
                </Form.Field>
                { this.props.loading ? <Loader /> : '' }
                <Button type='submit' primary >Submit</Button>
            </Form>
            {taskStatus}
          </Aux>  
        );
    }
}


const mapStateToProps = state => {
    return {
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTasks: (task, token) => dispatch(actionTypes.addTask(task, token)),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(TaskBuilder);