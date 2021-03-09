import { Link } from 'react-router-dom';

import '../../../assets/semantic/semantic.min.css';
import { Card, Header, Segment, Button } from 'semantic-ui-react';

import firebase from 'firebase';


const task = (props) => {

    const deleteTask = (taskId) => {
        // setLoading(true);
        const db = firebase.firestore();
        db.collection("tasks").doc(taskId).delete();
    };


    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                
            </Card.Content>
            <Segment>
                {/* <Header as='h3' textAlign='left'>
                    <Link to={"/todos/" + props.id} >View</Link>
                </Header>
                <Header as='h3' textAlign='left'>
                    <Button onClick={() => deleteTask(props.id)}>Delete</Button>
                </Header> */}
                <Header as='h3' textAlign='left'>
                    <Button.Group>
                        <Button as={Link} to={"/todos/" + props.id} positive >View</Button>
                        <Button.Or />
                        <Button onClick={() => deleteTask(props.id)} negative >Delete</Button>
                    </Button.Group>
                </Header>
            </Segment>
        </Card>
    );
}
 
export default task;