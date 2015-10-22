var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

//for test
if (process.env.ENV === 'Test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}

var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

//Models
var Book = require('./models/bookModel');

//Controllers
var bookController = require('./controllers/bookController')(Book);

//Routers
var bookRouter = require('./routes/bookRoutes')(bookController);


app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Api running with gulp on port: ' + port);
});

//for supertest
module.exports = app;