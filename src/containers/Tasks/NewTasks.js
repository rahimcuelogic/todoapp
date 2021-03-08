import React, { useState, useEffect } from 'react';
import firebase from '../../firebaseConfig';

import Task from './Task/Task';

import Loader from '../../components/UI/Spinner/Spinner';

const NewTasks = (props) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection('tasks');

    function getTasks() {
        setLoading(true);
        ref.onSnapshot( (snapshot) => {
            const items = [];
            snapshot.forEach((doc) => items.push({
                ...doc.data(),
                id: doc.id
            }));
            setTasks(items);
            setLoading(false);
        });
    }

    useEffect( () => {
        getTasks();
    }, []);
    
    if(loading){
        return <Loader />;
    }


    return (
        <div>
            <h1>Tasks</h1>
            {tasks.map( (fetchedTask) => (
                <Task
                    {...fetchedTask}
                    key={fetchedTask.id}
                />
            ))}
        </div>
    )
}
 
export default NewTasks;