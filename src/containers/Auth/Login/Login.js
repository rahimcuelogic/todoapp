import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index'

import { Form, Input, Button } from 'semantic-ui-react';
import Aux from '../../../hoc/aux';
import Loader from '../../../components/UI/Spinner/Spinner';
import ResponseMessage from '../../../components/UI/ResponseMessage/ResponseMessage';


class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: ''
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state, 'login');
        this.setState({ errors: 'pending' });
    };

    updateInputHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <Aux>
                { this.props.isAuth ? <Redirect to="/" /> : '' }
                <h1>Login to continue</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Field>
                        <Input 
                            label="Email" 
                            placeholder='Enter email' 
                            type="email" 
                            name="email"
                            onChange={this.updateInputHandler} 
                            required
                            value={this.state.email} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Password" 
                            placeholder='Enter password' 
                            type="password"
                            name="password"
                            required
                            onChange={this.updateInputHandler} 
                            value={this.state.password} />
                    </Form.Field>
                    { this.props.loading ? <Loader /> : '' }
                    { this.props.isError && this.state.errors ? <ResponseMessage color="red" message={this.props.isError} /> : '' }
                    <Button type='submit' primary >Submit</Button>
                </Form>
            </Aux>
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