import * as actionTypes from './actionTypes';
// import axios from '../../axios-tasks';
import * as firestore from '../../firebaseConfig';
import firebase from 'firebase/app';

export const setTasks = (tasks) => {
    return {
        type: actionTypes.SET_TASKS,
        taskList: tasks,
        loading: false,
    };
};

export const initTasks = (userId) => {
    console.log('-------- init task --------- ');
    return dispatch => {
        // const allTasks = firestore.getTasks(userId);
        const allTasks = async () => {
            const db = firebase.firestore();
            const data = await db.collection('tasks').get();
            data.map( doc => {
                // console.log(doc.data());
                return doc.data();
            }); 
        }
        allTasks();
        // const allTasks = [
        //     {
        //         'title': 'this is a title',
        //         'description': 'description description description title',
        //         'userId': 2222,
        //         'id': 1
        //     },
        //     {
        //         'title': 'this is a title',
        //         'description': 'description description description title',
        //         'userId': 2222,
        //         'id': 2
        //     },
        //     {
        //         'title': 'this is a title',
        //         'description': 'description description description title',
        //         'userId': 2222,
        //         'id': 3
        //     },
        // ];
        if(allTasks){
            dispatch(setTasks(allTasks));
        }
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