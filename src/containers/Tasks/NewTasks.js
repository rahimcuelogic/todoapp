import React, { useState, useEffect } from 'react';
import firebase from '../../firebaseConfig';

import Task from './Task/Task';

import Loader from '../../components/UI/Spinner/Spinner';

const NewTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection('tasks');


    // function getTasks() {
    //     setLoading(true);
    //     ref.onSnapshot( (querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach( (doc) => {
    //             items.push(doc.data());
    //         });
    //         setTasks(items);
    //         setLoading(false);
    //     });
    // }

    function getTasks() {
        setLoading(true);
        ref.get().then( (item) => {
            const items = item.docs.map( (doc) => doc.data());
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
                // console.log(task);
                <Task
                    {...fetchedTask}
                    key={fetchedTask.id}
                />
            ))}
        </div>
    )
}
 
export default NewTasks;