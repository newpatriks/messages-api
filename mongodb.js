var mongoose            = require('mongoose');
var SALT_WORK_FACTOR    = 10;
var mongodbURL          = process.env.MONGODB_URI || 'mongodb://localhost/terete-api';
var mongodbOptions      = { };

mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    } else {
        console.log('...Mongo is ready');
    }
});
