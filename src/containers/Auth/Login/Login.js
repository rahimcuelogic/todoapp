import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index'

import { Form, Input, Button } from 'semantic-ui-react';
import InputComponent from '../../../components/UI/Input/Input';
import Loader from '../../../components/UI/Spinner/Spinner';
import ResponseMessage from '../../../components/UI/ResponseMessage/ResponseMessage';


class Login extends Component {
    state = {
        errors: '',
        loginForm: {
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

    submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.loginForm){
            formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
        }
        this.props.onAuth(formData, 'login');
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
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedLoginForm){
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.loginForm){
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let loginForm = (
            <Form onSubmit={this.submitHandler}>
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
                { this.props.loading ? <Loader /> : '' }
                { this.props.isError && this.state.errors ? <ResponseMessage color="red" message={this.props.isError} /> : '' }
                <Button type='submit' primary disabled={!this.state.formIsValid} >Submit </Button>
            </Form>
        );

        return (
            <>
                { this.props.isAuth ? <Redirect to="/" /> : '' }
                <h1>Login to continue</h1>
                {loginForm}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.userId !== null,
        isError: state.authReducer.error,
        loading: state.authReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userdata, type) => dispatch(actions.auth(userdata, type)),
        onResetError: () => dispatch(actions.resetErrors())
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);