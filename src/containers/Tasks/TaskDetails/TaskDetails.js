import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../firebaseConfig';

// import Task from '../Task/Task';

import Loader from '../../../components/UI/Spinner/Spinner';
import { Form, Input, Button } from 'semantic-ui-react';
import ResponseMessage from '../../../components/UI/ResponseMessage/ResponseMessage';

const TaskDetails = (props) => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false);
    
    useEffect( () => {
        const db = firebase.firestore();
        const getTask = async () => {
            const taskId = props.match.params.id;
            setLoading(true);
            setEditable(false);
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

    const editHandler = () => {
        setEditable(!editable);
    }

    const updateInputHandler = (event) => {
        // this.setState({ [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {

    };

    let currentTask = '';
    if(task.length){
        currentTask = task.map( (fetchedTask) => (
            <div key={fetchedTask.id}>
                <h1>{fetchedTask.title}</h1>
                <p>{fetchedTask.description}</p>
                <button onClick={editHandler}>Edit</button>
            </div>
        ))
    }else{
        currentTask = <p>No task found! Try adding one.</p>
    }

    if(editable){
        currentTask = (
            <div>
                <Form onSubmit={submitHandler}>
                    <Form.Field>
                        <Input 
                            label="Title" 
                            placeholder='Enter title' 
                            type="text" 
                            name="title"
                            onChange={updateInputHandler} 
                            required
                            value={task[0].title} />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            label="Description" 
                            placeholder='Enter description' 
                            type="text"
                            name="description"
                            required
                            onChange={updateInputHandler} 
                            value={task[0].description} />
                    </Form.Field>
                    {/* { this.props.loading ? <Loader /> : '' } */}
                    {/* { this.props.isError ? <ResponseMessage color="red" message={this.props.isError} /> : '' } */}
                    <Button type='submit' primary >Submit</Button>
                </Form>
            </div>
        )
    }

    return (
        <div>
            <h1>Task Details</h1>
            {currentTask}
        </div>
    )
}
 
export default connect()(TaskDetails);