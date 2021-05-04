import { Segment, Header } from 'semantic-ui-react';

const responseMessage = (props) => {
    return (
        <Segment>
            <Header as='h3' color={props.color} inverted textAlign='center' >{props.message}</Header>
        </Segment>
    );
}
 
export default responseMessage;