var express = require('express');
var data = require('./data.json');
var bodyparser = require('body-parser');
var fs = require('fs');
var { commit, redirect } = require('./utils/utils.js');
var { authenticate } = require('./middleware/authenticate.js');
var moment = require('moment');

moment().locale('fr');

var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  redirect(res, data);
});

app.get('/login', function(req, res) {
  res.render('user/login', {
    user: authenticate.getUser()
  });
});

app.post('/sign_in', function(req, res) {
  var user = authenticate.login(req.body.email, req.body.password);
  data.currentUser = user;
  commit(data);
  redirect(res, data);
});

app.get('/logout', function(req, res) {
  data.currentUser = '';
  commit(data);
  redirect(res, data);
});

app.get('/post/new', authenticate.isAuthenticated, function(req, res) {
  res.render('post/create', {
    user: authenticate.getUser()
  });
});

app.post('/post/create', function(req, res) {
  var post = {
    title: req.body.title,
    content: req.body.content,
    author: authenticate.getUser().email,
    date: moment().format('DD/MM/YYYY, h:mm:ss'),
    comments: []
  };
  data.posts.push(post);
  commit(data);
  redirect(res, data);
});

app.get('/post/edit/:id', function(req, res) {
  var post_edit = data.posts[req.params.id];
  res.render('post/edit', {
    post: post_edit,
    id: req.params.id,
    user: authenticate.getUser()
  });
});

app.get('/post/read/:id', function(req, res) {
  var post_read = data.posts[req.params.id];
  res.render('post/read', {
    post: post_read,
    id: req.params.id,
    user: authenticate.getUser()
  });
});

app.post('/comment/create/:id', authenticate.isAuthenticated, function(
  req,
  res
) {
  var post_read = data.posts[req.params.id];
  var user = authenticate.getUser();
  var comment = {
    content: req.body.content,
    author: user.email,
    date: moment().format('DD/MM/YYYY, h:mm:ss')
  };
  post_read.comments.push(comment);
  commit(data);
  res.render('post/read', {
    post: post_read,
    id: req.params.id,
    user: authenticate.getUser()
  });
});

app.post('/post/update/:id', function(req, res) {
  var post_id = req.params.id;
  data.posts[post_id] = {
    title: req.body.title,
    content: req.body.content,
    author: authenticate.getUser().email,
    date: moment().format('DD/MM/YYYY, h:mm:ss'),
    comments: data.posts[post_id].comments
  };
  commit(data);
  redirect(res, data);
});

app.get('/post/delete/:id', function(req, res) {
  data.posts.splice(req.params.id, 1);
  commit(data);
  redirect(res, data);
});

app.listen(3000, function(req, res) {
  console.log('ça marche');
});
