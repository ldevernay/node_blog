var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';

var dbName = 'revisions-node-blog';

MongoClient.connect(
  url,
  function(err, client) {
    if (err) {
      console.log(err);
      db.close();
    }
    var db = client.db(dbName);
    console.log('youpi');
    var posts = db.collection('posts');

    posts.updateMany({ title: '1' }, { $set: { author: 'toto' } }, function(
      err,
      result
    ) {
      console.log('updated');
    });
    posts.deleteOne({ title: '1' }, function(err, result) {
      console.log('Deleted:' + result.deletedCount);
    });
    posts.find({ title: '1' }).toArray(function(err, docs) {
      console.log(docs);
    });
  }
);
