import { Link } from 'react-router-dom';

import '../../../assets/semantic/semantic.min.css';
import { Card } from 'semantic-ui-react';


const task = (props) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.title}</Card.Header>
                <Card.Description>{props.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Link to={"/todos/" + props.id} >View</Link>
            </Card.Content>
        </Card>
    );
}
 
export default task;