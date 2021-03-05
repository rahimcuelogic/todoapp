import * as actionTypes from './actionTypes';
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

export const sendTask = (task, token) => {
    const createTaskUrl = 'https://react-my-burger-492b4-default-rtdb.firebaseio.com/tasks.json?auth=' + token;
    return dispatch => {
        axios.post(createTaskUrl, task)
            .then( (response) => {
                dispatch(initTasks(token, task.userId, 'added'));
            })
            .catch( (err) => {
                console.log(err);
        });
    };
}

export const startAddTask = () => {
    return {
        type: actionTypes.START_ADD_TASK,
        loading: true,
        taskStatus: 'pending'
    };
}

export const addTask = (task, token) => {
    return dispatch => {
        dispatch(startAddTask());
        dispatch(sendTask(task, token));
    };
};

export const deleteTask = (task) => {
    return {
        type: actionTypes.REMOVE_TASK,
        task: task
    }
};

export const getTask = (token) => {
    return dispatch => {
        axios.get('tasks.json?auth=' + token)
         .then( (response) => {

         })
         .catch( (err) => {
             console.log(err);
         });
    };
};