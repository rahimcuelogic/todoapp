import React from 'react';
import { Input } from 'semantic-ui-react';

const input = (props) => {
    return (
        <div>
            <Input 
                label={props.label} 
                {...props.elementConfig} 
                onChange={props.changed}
                value={props.value}
                />
        </div>
    );
}
 
export default input;