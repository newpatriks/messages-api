var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var Message     = require('./message');

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb:27017//localhost/terete-api';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 9000;        // set our port


var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/message')
    .post(function(req, res) {
        Message.findOne({id: req.body.id}, function(err, message) {
            message = new Message();      // create a new instance of the Message model
            message.name = req.body.name;
            message.msg = req.body.msg;
            message.pic = req.body.pic;

            message.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ status: '200', message: 'Message created!', data: message.id });
            });
        });

    })

    .get(function(req, res) {
        console.log('GET!');
        Message.find(function(err, message) {
            if (err)
                res.send(err);

            res.json(message);
        });
    });

router.route('/message/:messageId').get(function(req, res) {
    Message.findOne({id: req.params.messageId}, function(err, message) {
        if (err)
            res.send(err);

        res.json(message);
    });
});


app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
