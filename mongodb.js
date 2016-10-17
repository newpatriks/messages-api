var mongoose            = require('mongoose');
var SALT_WORK_FACTOR    = 10;
var mongodbURL          = process.env.MONGODB_URI || 'mongodb://localhost:27017/terete-api';

mongoose.connect(mongodbURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose > connection error: ', mongodbURL));
db.once('open', function() {
    console.log('mongoose > connection successful!');
});
