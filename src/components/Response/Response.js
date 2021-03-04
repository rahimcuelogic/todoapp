import '../../assets/semantic/semantic.min.css';
import { Message } from 'semantic-ui-react';


const response = (props) => {
    // let responseMessage = <Message warning>
    //     <Message.Header>{props.message}</Message.Header>
    // </Message>
    // if(props.type === 'success'){
    //     responseMessage = <Message info>
    //     <Message.Header>{props.message}</Message.Header>
    // </Message>
    // }
    return (
        // {responseMessage}
        <Message info>
            <Message.Header>{props.message}</Message.Header>
        </Message>
    );
}
 
export default response;

