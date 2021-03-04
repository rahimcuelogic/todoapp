import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Aux from '../../hoc/aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import '../../assets/semantic/semantic.min.css';
import { Container } from 'semantic-ui-react';

class Layout extends Component {
    state = {  }
    render() { 
        return (
            <Container>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuthenticated} />
                    {/* SideDrawer, Backdrop */}
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
        isAuthenticated: state.authReducer.token !== null
    };
}
 
export default connect(mapStateToProps)(Layout);