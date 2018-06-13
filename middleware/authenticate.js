var data = require('./data.json');

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
