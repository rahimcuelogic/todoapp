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
        email: '',
        password: '',
        loginForm: {
            email: {
                elementConfig: {
                    type: 'email',
                    label: 'Email',
                    placeholder: 'Enter Email',

                },
                value: ''
            },
            password: {
                elementConfig: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter Password',

                },
                value: ''
            },
        }
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

    inputChangedHandler = (e, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }

        updatedFormElement.value = e.target.value;
        updatedLoginForm[inputIdentifier] = updatedFormElement;
        this.setState({ loginForm: updatedLoginForm });
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
                             />
                    </Form.Field>
                ))}
                { this.props.loading ? <Loader /> : '' }
                { this.props.isError && this.state.errors ? <ResponseMessage color="red" message={this.props.isError} /> : '' }
                <Button type='submit' primary >Submit</Button>
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