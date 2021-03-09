import * as actionTypes from './actionTypes';
import firebase from 'firebase';
import axios from '../../axios-tasks';

export const setTasks = (tasks, taskStatus) => {
    return {
        type: actionTypes.SET_TASKS,
        taskList: tasks,
        loading: false,
        taskStatus: taskStatus
    };
};

export const initTasks = (token, userId, taskStatus = '') => {
    return dispatch => {
        axios.get('tasks.json?auth=' + token)
         .then( (response) => {
            const allTasks = [];
            for (let key in response.data){
                if(userId === response.data[key].userId){
                    allTasks.push({
                        ...response.data[key],
                        id: key
                    });
                }
            }
            dispatch(setTasks(allTasks, taskStatus));
        })
        .catch( (err) => {
            console.log(err);
        });
    };
};

export const sendTask = (task) => {
    return dispatch => {
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("tasks").add(task);
        /*
        const createTaskUrl = 'https://react-my-burger-492b4-default-rtdb.firebaseio.com/tasks.json?auth=';
        axios.post(createTaskUrl, task)
            .then( (response) => {
                dispatch(initTasks('', task.userId, 'added'));
            })
            .catch( (err) => {
                console.log(err);
        });
        */
    };
}

export const startAddTask = () => {
    return {
        type: actionTypes.START_ADD_TASK,
        loading: true,
        taskStatus: 'pending'
    };
}

export const addTask = (task) => {
    return dispatch => {
        dispatch(startAddTask());
        dispatch(sendTask(task));
    };
};

export const deleteTask = (task) => {
    return {
        type: actionTypes.REMOVE_TASK,
        task: task
    }
};

export const setTaskDetails = (taskDetails) => {
    return {
        type: actionTypes.SET_TASK_DETAILS,
        taskDetails: taskDetails
    }
};

export const getTask = (token, taskId) => {
    return dispatch => {
        axios.get('tasks.json?auth=' + token)
        .then( (response) => {

            const taskDetails = [];
            for (let key in response.data){
                if(taskId === key){
                    taskDetails.push({
                        ...response.data[key],
                        id: key
                    });
                }
            }
            dispatch(setTaskDetails(taskDetails[0]));
        })
        .catch( (err) => {
            console.log(err);
        });
    };
};