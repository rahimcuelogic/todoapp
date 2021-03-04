import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index'

import '../../../assets/semantic/semantic.min.css';
import { Form, Input, Button } from 'semantic-ui-react';
import Aux from '../../../hoc/aux';



class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state, 'login');

    };

    emailChangeHandler = (event) => {
        this.setState({ email: event.target.value });
    };

    passwordChangeHandler = (event) => {
        this.setState({ password: event.target.value });
    };

    render() { 
        return (
            <Aux>
                <h1>Login to continue</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Field>
                        <Input 
                            label="Email" 
                            placeholder='Enter email' 
                            type="email" 
                            onChange={this.emailChangeHandler} 
                            required
                            value={this.state.email} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Password" 
                            placeholder='Enter password' 
                            type="password"
                            required
                            onChange={this.passwordChangeHandler} 
                            value={this.state.password} />
                    </Form.Field>
                    <Button type='submit' primary >Submit</Button>
                    {this.props.isAuth ? <Redirect to="/" /> : ''}
                </Form>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userdata, type) => dispatch(actions.auth(userdata, type))
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);