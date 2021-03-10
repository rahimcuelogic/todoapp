import * as actionTypes from './actionTypes';
// import axios from '../../axios-tasks';
import * as firestore from '../../firebaseConfig';
import firebase from 'firebase/app';

export const setTasks = (tasks) => {
    return {
        type: actionTypes.SET_TASKS,
        taskList: tasks,
        loading: false,
        taskStatus: 'added'
    };
};

export const initTasks = (userId) => {
    return dispatch => {
        const allTasks = async () => {
            const db = firebase.firestore();
            db.collection('tasks').get().then((snapshot) => {
                const allTasks = [];
                snapshot.docs.forEach(doc => {
                    let items = doc.data();
                    if(items.userId === userId){
                        allTasks.push({
                            ...items,
                            id: doc.id
                        });
                    }
                });
                dispatch(setTasks(allTasks));
            });
        }
        allTasks();
    };
};

export const sendTask = (task) => {
    return dispatch => {
        firestore.addTask(task);
        dispatch(initTasks(task.userId));
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

export const getTask = (taskId) => {
    return dispatch => {
        console.log(' ----------- get task -----------');
        const taskDetails = async () => {
        //     const db = firebase.firestore();
        //     const data = await db.collection('tasks').get();
        }
        taskDetails();
        // firestore.getTasks(taskId);
        // console.log(taskDetails);
        // axios.get('tasks.json?auth=' + token)
        // .then( (response) => {
        //     dispatch(setTaskDetails(taskDetails[0]));
        // })
        // .catch( (err) => {
        //     console.log(err);
        // });

    };
};