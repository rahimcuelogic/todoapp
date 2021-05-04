import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

import { Form, Input, Button } from 'semantic-ui-react';
import Loader from '../../../components/UI/Spinner/Spinner';

import InputComponent from '../../../components/UI/Input/Input';


class TaskBuilder extends Component {
    state = {
        task: {
            title: '',
            description: ''
        },
        taskForm: {
            title: {
                elementConfig: {
                    type: 'text',
                    label: 'Title',
                    placeholder: 'Enter Title',
                    required: true
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                }
            },
            description: {
                elementConfig: {
                    type: 'text',
                    label: 'Description',
                    placeholder: 'Enter Description',
                    required: true
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                }
            },
        },
        formIsValid: false,
    };

    createTaskHandler = () => {
        const formData = {};
        formData['userId'] = this.props.userId;
        for (let formElementIdentifier in this.state.taskForm){
            formData[formElementIdentifier] = this.state.taskForm[formElementIdentifier].value;
        }

        this.props.onAddTasks(formData);
        this.props.history.push('/todos');
    };

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedTaskForm = {
            ...this.state.taskForm
        }
        const updatedFormElement = {
            ...updatedTaskForm[inputIdentifier]
        }

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedTaskForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedTaskForm){
            formIsValid = updatedTaskForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ taskForm: updatedTaskForm, formIsValid: formIsValid });
    }

    render() {
        let taskStatus = '';

        let authRedirect = null;
        const userId = localStorage.getItem('userId');
        if(!userId){
            authRedirect = <Redirect to="/" />
        }

        if(this.props.taskStatus === 'added' && !this.props.loading){
            // authRedirect = <Redirect to="/todos/" />
        }

        const formElementsArray = [];
        for (let key in this.state.taskForm){
            formElementsArray.push({
                id: key,
                config: this.state.taskForm[key]
            });
        }

        let taskForm = (
            <Form onSubmit={this.createTaskHandler}>
                {formElementsArray.map( formElement => (
                    <Form.Field key={formElement.id}>
                        <InputComponent 
                            elementConfig={formElement.config.elementConfig}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            value={formElement.config.value}
                            error={!formElement.config.valid}
                             />
                    </Form.Field>
                ))}
                <Button type='submit' primary disabled={!this.state.formIsValid} >Submit </Button>
                { this.props.loading ? <Loader /> : '' }
            </Form>
        );
        return (
          <>
            {authRedirect}
            <h1>Create new task</h1>
            {taskForm}
            {taskStatus}
          </>  
        );
    }
}


const mapStateToProps = state => {
    return {
        error: state.authReducer.error,
        loading: state.taskReducer.loading,
        taskStatus: state.taskReducer.taskStatus,
        userId: state.authReducer.userId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddTasks: (task) => dispatch(actionTypes.addTask(task)),
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(TaskBuilder);