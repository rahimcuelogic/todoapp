import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_FIRESTORE_API,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app();
}

const db = firebase.firestore();

export const addTask = task => {
    return db.collection("tasks").add(task);
}

export const getTasks = (userId) => {
  const ref = db.collection('tasks');
  const items = [];
  ref.onSnapshot( (snapshot) => {
    snapshot.forEach((doc) => {
        if(doc.data().userId === userId){
            items.push({
                ...doc.data(),
                id: doc.id
            })

        }
    });
  });
  return items;

}

export const getUser = (userId) => {
  const ref = db.collection('users');
  let userdata = {};
  ref.onSnapshot( (snapshot) => {
    snapshot.forEach((doc) => {
        if(doc.data().userId === userId){
          userdata = doc.data();
        }
    });
  });
  return userdata;

}

export const getTask = (taskId) => {
  const ref = db.collection('tasks');
  let taskDetails = {};
  ref.onSnapshot( (snapshot) => {
    snapshot.forEach((doc) => {
        if(doc.data().id === taskId){
          taskDetails = doc.data();
        }
    });
  });
  return taskDetails;

}

export default firebase;