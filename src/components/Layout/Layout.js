import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import { Container } from 'semantic-ui-react';

class Layout extends Component {
    render() { 
        return (
            <Container>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuthenticated} />
                </div>
                <main>
                    {this.props.children}
                </main>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.userId !== null
    };
}
 
export default connect(mapStateToProps)(Layout);