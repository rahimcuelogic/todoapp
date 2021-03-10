import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index'

import { Form, Input, Button } from 'semantic-ui-react';

import Aux from '../../../hoc/aux';
import Loader from '../../../components/UI/Spinner/Spinner';
import ResponseMessage from '../../../components/UI/ResponseMessage/ResponseMessage';



class Signup extends Component {
    state = {
        user: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        },
        errors: ''
    }

    createUserHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.user, 'signup');
        this.setState({ errors: 'pending' });
    };

    updateInputHandler = (event) => {
        const updatedUser = {
            ...this.state.user,
            [event.target.name]: event.target.value
        };
        this.setState({ user: updatedUser });
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
                            name="firstName"
                            onChange={this.updateInputHandler} 
                            required
                            value={this.state.user.firstName} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Last Name" 
                            placeholder='Enter last name' 
                            type="text" 
                            name="lastName"
                            onChange={this.updateInputHandler} 
                            required
                            value={this.state.user.lastName} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Email" 
                            placeholder='Enter email' 
                            type="email" 
                            name="email"
                            onChange={this.updateInputHandler} 
                            required
                            value={this.state.user.email} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Password" 
                            placeholder='Enter password' 
                            type="password"
                            name="password"
                            required
                            onChange={this.updateInputHandler} 
                            value={this.state.user.password} />
                    </Form.Field>
                    { this.props.loading ? <Loader /> : '' }
                    { this.props.isError && this.state.errors ? <ResponseMessage color="red" message={this.props.isError} /> : '' }
                    <Button type='submit' primary >Submit</Button>
                    {this.props.isAuth ? <Redirect to="/" /> : ''}
                </Form>
            </Aux>
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