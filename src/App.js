import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import logo from './logo.svg';
import './App.css';
import './assets/semantic/semantic.min.css';
// import { Header, Button, Divider } from 'semantic-ui-react';

import * as actions from './store/actions';

import Layout from './components/Layout/Layout';
import TaskBuilder from './containers/Tasks/TaskBuilder/TaskBuilder';
import Tasks from './containers/Tasks/NewTasks';
import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Signup/Signup';
import Logout from './containers/Auth/Logout/Logout';
import TaskDetails from './containers/Tasks/TaskDetails/TaskDetails';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }
  render() { 
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/todos/create" component={TaskBuilder} />
            <Route path="/todos/:id" component={TaskDetails} />
            <Route path="/signin" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/todos" exact render={() => <Tasks isAuth={this.props.isAuth} />} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact render={ () => <h1>Welcome to "To do app"</h1>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.userId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));