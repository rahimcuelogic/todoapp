import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import firebase from '../../firebaseConfig';

import Task from './Task/Task';

import Loader from '../../components/UI/Spinner/Spinner';

const NewTasks = (props) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const userId = localStorage.getItem('userId');
    if(!props.isAuth && !userId){
        history.push("/signin");
    }

    const deleteTask = (taskId) => {
        // const db = firebase.firestore();
        db.collection("tasks").doc(taskId).delete().then( response => {
            getTasks();
        });
    };

    const db = firebase.firestore();
    const getTasks = async () => {
        setLoading(true);
        const data = await db.collection('tasks').get()
        const taskList = [];
        data.forEach((doc) => {
            if(doc.data().userId === userId){
                taskList.push({
                    ...doc.data(),
                    id: doc.id
                })
            }
        });
        setTasks(taskList);
        setLoading(false);
    };

    useEffect( () => {
        getTasks();
    }, []);
    
    if(loading){
        return <Loader />;
    }

    let allTasks = '';
    if(tasks.length){
        allTasks = tasks.map( (fetchedTask) => (
            <Task
                {...fetchedTask}
                key={fetchedTask.id}
                onDelete={deleteTask}
            />
        ))
    }else{
        allTasks = <p>No task found! Try adding one.</p>
    }


    return (
        <div>
            <h1>Tasks</h1>
            {allTasks}
        </div>
    )
}
 
export default connect()(NewTasks);