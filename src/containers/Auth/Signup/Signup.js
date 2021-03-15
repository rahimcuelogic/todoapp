import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index'

import { Form, Input, Button } from 'semantic-ui-react';

import InputComponent from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Spinner/Spinner';
import ResponseMessage from '../../../components/UI/ResponseMessage/ResponseMessage';



class Signup extends Component {
    state = {
        errors: '',
        registrationForm: {
            firstName: {
                elementConfig: {
                    type: 'text',
                    label: 'First Name',
                    placeholder: 'Enter First Name',
                    required: true
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                }
            },
            lastName: {
                elementConfig: {
                    type: 'text',
                    label: 'Last Name',
                    placeholder: 'Enter Last Name',
                    required: true
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                }
            },
            email: {
                elementConfig: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter Email',
                    required: true
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                }
            },
            password: {
                elementConfig: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter Password',
                    required: true
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10
                }
            },
        },
        formIsValid: false,
    }

    createUserHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.registrationForm){
            formData[formElementIdentifier] = this.state.registrationForm[formElementIdentifier].value;
        }
        this.props.onAuth(formData, 'signup');
        this.setState({ errors: 'pending' });
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
        const updatedRegistrationForm = {
            ...this.state.registrationForm
        }
        const updatedFormElement = {
            ...updatedRegistrationForm[inputIdentifier]
        }

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedRegistrationForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedRegistrationForm){
            formIsValid = updatedRegistrationForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ registrationForm: updatedRegistrationForm, formIsValid: formIsValid });
    }

    render() { 
        const formElementsArray = [];
        for (let key in this.state.registrationForm){
            formElementsArray.push({
                id: key,
                config: this.state.registrationForm[key]
            });
        }

        let registrationForm = (
            <Form onSubmit={this.createUserHandler}>
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
                { this.props.isError && this.state.errors ? <ResponseMessage color="red" message={this.props.isError} /> : '' }
                {this.props.isAuth ? <Redirect to="/" /> : ''}
            </Form>
        );
        return (
            <>
                <h1>Signup to start using service.</h1>
                {registrationForm}
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.userId !== null,
        loading: state.authReducer.loading,
        isError: state.authReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userdata, type) => dispatch(actions.auth(userdata, type))
    };
};

 
export default connect(mapStateToProps, mapDispatchToProps)(Signup);