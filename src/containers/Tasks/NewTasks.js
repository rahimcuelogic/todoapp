import React, { useState, useEffect } from 'react';
import firebase from '../../firebaseConfig';

import Task from './Task/Task';

import Loader from '../../components/UI/Spinner/Spinner';

const NewTasks = (props) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect( () => {
        const ref = firebase.firestore().collection('tasks');
        function getTasks() {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            ref.onSnapshot( (snapshot) => {
                const items = [];
                snapshot.forEach((doc) => {
                    if(doc.data().userId === userId){
                        items.push({
                            ...doc.data(),
                            id: doc.id
                        })

                    }
                });
                setTasks(items);
                setLoading(false);
            });
        }
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
 
export default NewTasks;