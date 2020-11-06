const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// TODO: extract connection to config file
mongoose.connect("mongodb://root:example@localhost:27017/md-editor?authSource=admin", {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongo database')
});

module.exports = db;