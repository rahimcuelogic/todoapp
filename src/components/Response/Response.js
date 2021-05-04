import '../../assets/semantic/semantic.min.css';
import { Message } from 'semantic-ui-react';


const response = (props) => {
    return (
        <Message info>
            <Message.Header>{props.message}</Message.Header>
        </Message>
    );
}
 
export default response;

