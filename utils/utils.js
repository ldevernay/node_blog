var fs = require('fs');

exports.commit = function(data) {
  // console.log(JSON.stringify(data));
  fs.writeFile('data.json', JSON.stringify(data));
  console.log('JSON successfully modified!');
};

exports.redirect = function(res, data) {
  res.render('index', {
    posts: data.posts
  });
};
