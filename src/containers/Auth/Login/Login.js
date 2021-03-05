import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index'

import '../../../assets/semantic/semantic.min.css';
import { Form, Input, Button } from 'semantic-ui-react';
import Aux from '../../../hoc/aux';
import Loader from '../../../components/UI/Spinner/Spinner';



class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {
            'INVALID_PASSWORD': 'Please enter correct password.',
            'EMAIL_NOT_FOUND' : 'Entered email is invalid, try Signining up.'
        }
    }

    componentDidMount = () => {
        // console.log(' ------------- did mount -------------');
        // console.log(this.props.responseMessage);
        // console.log(' ------------- did mount -------------');
    }

    componentDidUpdate = () => {
        // console.log(' ------------- UPDATE -------------');
        // console.log(this.props.responseMessage);
        // console.log(' ------------- UPDATE -------------');
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
        let responseMessage = '';
        // if(this.props.responseMessage.length){
        //     let keys = 1;
        //     responseMessage = this.props.responseMessage.map( respMessage => {
        //         ++keys;
        //         return <p key={keys}>{this.state.errors[respMessage.message]}</p>
        //     });

        // }
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
                    {this.props.loading ? <Loader /> : ''}
                    <Button type='submit' primary >Submit</Button>
                    {this.props.isAuth ? <Redirect to="/" /> : ''}
                </Form>
                {responseMessage}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token !== null,
        // responseMessage: state.authReducer.error
        loading: state.authReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userdata, type) => dispatch(actions.auth(userdata, type))
    };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);