import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import * as actionTypes from '../../../store/actions/index'

import Aux from '../../../hoc/aux';
import Loader from '../../../components/UI/Spinner/Spinner';



class TaskDetails extends Component {
    state = {
        isEdited: false
    };

    componentDidMount = () => {
        const taskId = this.props.match.params.id;
        this.props.onGetTask(this.props.token, taskId);
    };

    render() {
        console.log(this.props.taskDetails);
        let getTaskDetails = <Loader />
        if(this.props.taskDetails){
            getTaskDetails = <Aux>
                <h1>{this.props.taskDetails.title}</h1>
                <p>{this.props.taskDetails.description}</p>
            </Aux>

        }
        return (
            <Aux>{getTaskDetails}</Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.authReducer.userId,
        token: state.authReducer.token,
        taskDetails: state.taskReducer.taskDetails
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onGetTask: (token, taskId) => dispatch(actionTypes.getTask(token, taskId))
    }
};

 
export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);