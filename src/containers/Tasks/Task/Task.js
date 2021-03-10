import { Link } from 'react-router-dom';

import '../../../assets/semantic/semantic.min.css';
import { Card, Header, Segment, Button } from 'semantic-ui-react';

const Task = (props) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                
            </Card.Content>
            <Segment>
                <Header as='h3' textAlign='left'>
                    <Button.Group>
                        <Button as={Link} to={"/todos/" + props.id} positive >View</Button>
                        <Button.Or />
                        <Button onClick={() => props.onDelete(props.id)} negative >Delete</Button>
                    </Button.Group>
                </Header>
            </Segment>
        </Card>
    );
}
 
export default Task;