import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../firebaseConfig';

// import Task from '../Task/Task';

import Loader from '../../../components/UI/Spinner/Spinner';
import { Form, Input, Button, Icon, Header, Segment } from 'semantic-ui-react';
// import ResponseMessage from '../../../components/UI/ResponseMessage/ResponseMessage';

const TaskDetails = (props) => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false);
    
    useEffect( () => {
        const taskId = props.match.params.id;
        const db = firebase.firestore();
        const getTask = async () => {
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
        const updatedTask = [];
        const updatedTaskDetails = {
            ...task[0],
            [event.target.name]: event.target.value
        }
        updatedTask.push(updatedTaskDetails);
        setTask(updatedTask);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        const { title, description, userId } = task[0];
        const db = firebase.firestore();
        db.collection("tasks").doc(task[0].id).set({'title': title, 'description': description, 'userId': userId});
        setTimeout( () => {
            setLoading(false);
            props.history.push("/todos");
        }, 1000);
    };

    let currentTask = '';
    if(task.length){
        currentTask = task.map( (fetchedTask) => (
            <div key={fetchedTask.id}>
                <Form>
                    <Form.Field>
                        <Header as='h2' attached='top'>{fetchedTask.title}</Header>
                    </Form.Field>
                    <Form.Field>
                        <Segment attached>{fetchedTask.description}</Segment>
                    </Form.Field>
                    <Button onClick={editHandler} icon >Edit<Icon name='pencil' /></Button>
                </Form>
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