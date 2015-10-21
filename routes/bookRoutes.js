var express = require('express');

var routes = function(Book){
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function (req, res) {
            console.log(req.body);
            var book = new Book(req.body);
            //book.author = req.body.author;
            console.log(book);
            book.save(function (err, result) {
                if(err) return res.status(599).json(err);

                res.status(201).json(result);
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

    bookRouter.route('/:bookId')
        .get(function (req, res) {
            Book.findById(req.params.bookId, function (err, result) {
                if (err)return res.status(599).json([err]);

                res.status(200).json(result);
            });
        });

    return bookRouter;
};

module.exports = routes;