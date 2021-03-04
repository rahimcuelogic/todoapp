import * as actionTypes from './actionTypes';
import axios from '../../axios-tasks';

export const setTasks = (tasks) => {
    return {
        type: actionTypes.SET_TASKS,
        taskList: tasks,
        // taskStatus: 'success'
    };
};

export const initTasks = (token) => {
    return dispatch => {
        axios.get('tasks.json?auth=' + token)
         .then( (response) => {
            const allTasks = [];
            for (let key in response.data){
                allTasks.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(setTasks(allTasks));

         })
         .catch( (err) => {
             console.log(err);
         });
    };
};

export const addTask = (task, token) => {
    console.log('token', token);
    return dispatch => {
        axios.post('https://react-my-burger-492b4-default-rtdb.firebaseio.com/tasks.json?auth=' + token, task)
         .then( (response) => {
            dispatch(initTasks());
         })
         .catch( (err) => {
            console.log(err);
         });
    };
};

export const deleteTask = (task) => {
    return {
        type: actionTypes.REMOVE_TASK,
        task: task
    }
};