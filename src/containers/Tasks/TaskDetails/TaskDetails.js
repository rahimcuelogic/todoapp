import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../firebaseConfig';

import Task from '../Task/Task';

import Loader from '../../../components/UI/Spinner/Spinner';

const TaskDetails = (props) => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect( () => {
        const taskId = props.match.params.id;
        const db = firebase.firestore();
        const getTask = async () => {
            setLoading(true);
            const data = await db.collection('tasks').get()
            const taskList = [];
            data.forEach((doc) => {
                if(doc.id === taskId){
                    taskList.push({
                        ...doc.data(),
                        id: doc.id
                    })
                }
            });
            setTask(taskList);
            setLoading(false);
        }
        getTask();
    }, []);
    
    if(loading){
        return <Loader />;
    }

    let currentTask = '';
    if(task.length){
        currentTask = task.map( (fetchedTask) => (
            <div>
                <h1>{fetchedTask.title}</h1>
                <p>{fetchedTask.description}</p>
            </div>
        ))
    }else{
        currentTask = <p>No task found! Try adding one.</p>
    }

    return (
        <div>
            <h1>Task Details</h1>
            {currentTask}
        </div>
    )
}
 
export default connect()(TaskDetails);