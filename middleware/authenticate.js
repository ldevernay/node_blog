var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');
// Initialize Firebase for the application
var config = {
  apiKey: 'AIzaSyDpYuXPcgMvLovxrio8GiRSNNU3_h3vcgg',
  authDomain: 'node-blog-46ee1.firebaseapp.com',
  databaseURL: 'https://node-blog-46ee1.firebaseio.com',
  projectId: 'node-blog-46ee1',
  storageBucket: '',
  messagingSenderId: '803140928732'
};

var user;

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  console.log(user);
  this.user = user;
});

exports.authenticate = {
  isAuthenticated: function(req, res, next) {
    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect('/');
    }
  },
  login: function(email, password) {
    console.log('firebase');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      })
      .then(function() {
        console.log('logged in');
      });
  },
  getUser: function() {
    return this.user;
  }
};
