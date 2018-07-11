var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'revisionsblog',
  'revisionsblog',
  'Cb1Gy7~zu~38',
  {
    host: 'den1.mysql6.gear.host',
    dialect: 'mysql'
  }
);

const Post = sequelize.define('post', {
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  author: Sequelize.STRING,
  date: Sequelize.DATE
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});
Post.belongsTo(User, { as: 'Author', foreignKey: 'author_id' });

const Comment = sequelize.define('comment', {
  content: Sequelize.STRING
});

Comment.belongsTo(User, { as: 'Author', foreignKey: 'author_id' });
Comment.belongsTo(Post);

sequelize.sync().then(function() {
  var default_user;
  var current_post;

  User.create({
    username: 'toto',
    email: 'toto@toto.com',
    password: 'toto1234'
  }).then(user => (default_user = user));

  Post.create({
    title: 'Titre de mon post',
    content: 'Contenu de mon post',
    author: 'toto@toto.com',
    date: new Date()
  })
    .then(post => post.setAuthor(default_user))
    .then(post => {
      current_post = post;
      console.log(post);
    });

  Comment.create({
    content: "c'est nul"
  })
    .then(comment => comment.setAuthor(default_user))
    .then(comment => comment.setPost(current_post));
});
