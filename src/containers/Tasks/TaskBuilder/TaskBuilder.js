import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

import Aux from '../../../hoc/aux';

import { Form, Input, Button } from 'semantic-ui-react';
import Loader from '../../../components/UI/Spinner/Spinner';


class TaskBuilder extends Component {
    state = {
        task: {
            title: '',
            description: ''
        },
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
        };
        this.setState({ updatedState });
    };

    updateInputHandler = (event) => {
        const updatedTask = {
            ...this.state.task,
            [event.target.name]: event.target.value
        };
        this.setState({ task: updatedTask });
    };

    render() {
        let taskStatus = '';

        let authRedirect = null;
        if(this.props.token === null){
            authRedirect = <Redirect to="/" />
        }

        if(this.props.taskStatus === 'added' && !this.props.loading){
            authRedirect = <Redirect to="/todos/" />
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
                        name="title"
                        onChange={this.updateInputHandler} 
                        value={this.state.task.title} />
                </Form.Field>
                <Form.Field>
                    <Input 
                        label="Description" 
                        placeholder='Add Description' 
                        type="text"
                        name="description"
                        onChange={this.updateInputHandler   } 
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
        loading: state.taskReducer.loading,
        taskStatus: state.taskReducer.taskStatus,
        token: state.authReducer.userId,
        userId: state.authReducer.userId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTasks: (task, token) => dispatch(actionTypes.addTask(task, token)),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(TaskBuilder);