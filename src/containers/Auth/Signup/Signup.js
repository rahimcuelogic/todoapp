import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index'

import '../../../assets/semantic/semantic.min.css';
import { Form, Input, Button } from 'semantic-ui-react';

import Aux from '../../../hoc/aux';



class Signup extends Component {
    state = {
        user: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    createUserHandler = (event) => {
        event.preventDefault();
        event.preventDefault();
        this.props.onAuth(this.state.user, 'signup');
    };

    firstNameChangeHandler = (event) => {
        const updatedName = {
            ...this.state.user,
            firstName: event.target.value
        };
        this.setState({ user: updatedName });
    };

    lastNameChangeHandler = (event) => {
        const updatedLastName = {
            ...this.state.user,
            lastName: event.target.value
        };
        this.setState({ user: updatedLastName });
    };

    emailChangeHandler = (event) => {
        const updatedEmail = {
            ...this.state.user,
            email: event.target.value
        };
        this.setState({ user: updatedEmail });
    };

    passwordChangeHandler = (event) => {
        const updatedPassword = {
            ...this.state.user,
            password: event.target.value
        };
        this.setState({ user: updatedPassword });
    };

    render() { 
        return (
            <Aux>
                <h1>Signup to start using service.</h1>
                <Form onSubmit={this.createUserHandler}>
                    <Form.Field>
                        <Input 
                            label="First Name" 
                            placeholder='Enter first name' 
                            type="text" 
                            onChange={this.firstNameChangeHandler} 
                            required
                            value={this.state.user.firstName} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Last Name" 
                            placeholder='Enter last name' 
                            type="text" 
                            onChange={this.lastNameChangeHandler} 
                            required
                            value={this.state.user.lastName} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Email" 
                            placeholder='Enter email' 
                            type="email" 
                            onChange={this.emailChangeHandler} 
                            required
                            value={this.state.user.email} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Password" 
                            placeholder='Enter password' 
                            type="password"
                            required
                            onChange={this.passwordChangeHandler} 
                            value={this.state.user.password} />
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

 
export default connect(mapStateToProps, mapDispatchToProps)(Signup);