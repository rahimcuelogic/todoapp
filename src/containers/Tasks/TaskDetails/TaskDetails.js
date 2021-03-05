import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import * as actionTypes from '../../../store/actions/index'

import Aux from '../../../hoc/aux';



class TaskDetails extends Component {
    state = {
        isEdited: false
    };

    componentDidMount = () => {
        console.log('TaskDetails');
        const taskId = this.props.match.params.id;
        console.log('taskId', taskId);
        this.props.onGetTask(this.props.token);

        /*
        axios.get('https://react-my-burger-492b4-default-rtdb.firebaseio.com/tasks/')
         .then( (response) => {
             console.log(response);

         })
         .catch( (err) => {
             console.log(err);
         });
         */
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
        taskList: state.taskReducer.taskList,
        userId: state.authReducer.userId,
        token: state.authReducer.token
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onGetTask: (token) => dispatch(actionTypes.getTask(token))
    }
};

 
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);