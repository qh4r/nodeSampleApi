var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function (req, res) {
        console.log(req.body);
        var book = new Book(req.body);
        //book.author = req.body.author;
        console.log(book);
        book.save(function (err, result) {
            if(err) return res.status(599).json(err);

            res.status(201).json(book);
        });
    })
    .get(function (req, res) {
        var query = {};
        if (req.query) {
            if (req.query.genre) query.genre = req.query.genre;
            if (req.query.author)query.author = req.query.author;
            if (req.query.title)query.title = req.query.title;
            if (req.query.read)query.read = req.query.read;
        }

        Book.find(query, function (err, result) {
            if (err)return res.status(599).json([err]);

            res.status(200).json(result);
        });
    });

bookRouter.route('/Books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, result) {
            if (err)return res.status(599).json([err]);

            res.status(200).json(result);
        });
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Api running with gulp on port: ' + port);
});