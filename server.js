var express = require('express');
var data = require('./data.json');
var bodyparser = require('body-parser');
var fs = require('fs');
var { commit, redirect } = require('./utils/utils.js');
var { authenticate } = require('./middleware/authenticate.js');

var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {
    posts: data.posts
  });
});

app.post('/login', function(req, res) {
  console.log('login');
  authenticate.login(req.body.email, req.body.password);
  res.render('index', {
    posts: data.posts
  });
});

app.get('/post/new', function(req, res) {
  res.render('post/create');
});

app.post('/post/create', function(req, res) {
  var post = {
    title: req.body.title,
    content: req.body.content
  };
  data.posts.push(post);
  commit(data);
  redirect(res, data);
});

app.get('/post/edit/:id', function(req, res) {
  var post_edit = data.posts[req.params.id];
  res.render('post/edit', { post: post_edit, id: req.params.id });
});

app.get('/post/read/:id', function(req, res) {
  var post_read = data.posts[req.params.id];
  res.render('post/read', { post: post_read, id: req.params.id });
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
    date: ''
  };
  post_read.comments.push(comment);
  commit(data);
  res.render('post/read', { post: post_read, id: req.params.id });
});

app.post('/post/update/:id', function(req, res) {
  var post_id = req.params.id;
  data.posts[post_id] = {
    title: req.body.title,
    content: req.body.content
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
