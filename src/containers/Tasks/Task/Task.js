import React from 'react';
import { Link } from 'react-router-dom';

import '../../../assets/semantic/semantic.min.css';
import { Card, Header, Segment, Button, Icon, Modal } from 'semantic-ui-react';

const Task = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <><Card>
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
                        <Button onClick={() => setOpen(true)} negative >Delete</Button>
                    </Button.Group>
                </Header>
            </Segment>
        </Card>
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            >
            <Header icon>
                <Icon name='archive' />
                Attention!!
            </Header>
            <Modal.Content>
                <p>Are you sure you want to delete this task? This action won't be undone.</p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={() => props.onDelete(props.id)}>
                <Icon name='checkmark' /> Yes
                </Button>
            </Modal.Actions>
            </Modal>
        </>
    );
}
 
export default Task;