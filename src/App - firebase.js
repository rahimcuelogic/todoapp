import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';
import './assets/semantic/semantic.min.css';
// import { Header, Button, Divider } from 'semantic-ui-react';

import Layout from './components/Layout/Layout';
import TaskBuilder from './containers/Tasks/TaskBuilder/TaskBuilder';
import Tasks from './containers/Tasks/Tasks';
import Login from './containers/Auth/Login/Login';
import Signup from './containers/Auth/Signup/Signup';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};





class App extends Component {
  render() { 
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    return (
      <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {
        user 
          ? <p>Hello, {user.displayName}</p>
          : <p>Please sign in.</p>
      }
      {
        user
          ? <button onClick={signOut}>Sign out</button>
          : <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </header>
  </div>
    );
  }
}
 
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);