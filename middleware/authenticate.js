var data = require('../data.json');

exports.authenticate = {
  getUser: function() {
    return data.currentUser;
  },
  isAuthenticated: function(req, res, next) {
    var user = data.currentUser;
    if (user) {
      req.user = user;
      next();
    } else {
      res.redirect('/');
    }
  },
  login: function(email, password) {
    var filterUser = function(elem) {
      return elem.email == email && elem.password == password;
    };
    var users = data.users.filter(filterUser);
    if ((users.length = 1)) {
      return users[0];
    }
  }
};
