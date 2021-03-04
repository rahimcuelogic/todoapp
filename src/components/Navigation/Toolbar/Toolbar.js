import React from 'react';
import { Link } from 'react-router-dom';

import '../../../assets/semantic/semantic.min.css';
import { Menu } from 'semantic-ui-react';

const toolbar = (props) => (
    <Menu>
        <Menu.Item>
            <Link to="/" >Home</Link>
        </Menu.Item>
        {props.isAuth ? 
            <Menu.Item>
                <Link to="/todos" >Tasks</Link>
            </Menu.Item> : ''
        }
        {props.isAuth ? 
            <Menu.Item>
                <Link to="/todos/create" >Create</Link>
            </Menu.Item> : <Menu.Item>
                <Link to="/signup" >Signup</Link>
            </Menu.Item>
        }
        {props.isAuth ? 
            <Menu.Item>
                <Link to="/logout" >Logout</Link>
            </Menu.Item> : <Menu.Item>
                <Link to="/signin" >Login</Link>
            </Menu.Item>
        }
        
    </Menu>
);
 
export default toolbar;