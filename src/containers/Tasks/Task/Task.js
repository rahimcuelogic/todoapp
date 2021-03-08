import { Link } from 'react-router-dom';

import '../../../assets/semantic/semantic.min.css';
import { Card, Header, Segment, Button } from 'semantic-ui-react';


const task = (props) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Description>{props.content}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                
            </Card.Content>
            <Segment>
                <Header as='h3' textAlign='left'>
                    <Link to={"/todos/" + props.id} >View</Link>
                </Header>
                <Header as='h3' textAlign='left'>
                    <Button>Delete</Button>
                </Header>
            </Segment>






        </Card>
    );
}
 
export default task;