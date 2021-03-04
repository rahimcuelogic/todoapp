import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Aux from '../../../hoc/aux';



class TaskDetails extends Component {
    state = {
        isEdited: false
    };

    componentDidMount = () => {
        console.log('TaskDetails');
        axios.get('https://react-my-burger-492b4-default-rtdb.firebaseio.com/tasks/')
         .then( (response) => {
             console.log(response);

         })
         .catch( (err) => {
             console.log(err);
         });
    };

    render() { 
        return (
            <Aux>
                <h1>{this.props.title}</h1>
                <p>{this.props.description}</p>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token
    }
};
 
export default connect(mapStateToProps)(TaskDetails);