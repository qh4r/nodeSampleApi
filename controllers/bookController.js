/**
 * Created by qh4r on 22.10.15.
 */

var bookController = function (Book, Review) {

    var fetchBook = function (req, res, next) {
        next();
    };

    var post = function (req, res) {
        //var book = Book.create(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            Book.create(req.body).then(function (err, result) {
                res.status(201);
                res.json(result);
            }).catch(function (err) {
                return res.status(599).json(err);
            });
        }
    };

    var getAll = function (req, res) {
        var query = {};
        if (req.query) {
            if (req.query.genre) query.genre = req.query.genre;
            if (req.query.author)query.author = req.query.author;
            if (req.query.title)query.title = req.query.title;
            if (req.query.read)query.read = req.query.read;
        }
        Book.findAll(query).then(function (err, result) {
            if (err)return res.status(599).json([err]);

            var booksList = [];

            result.forEach(function (book, index, array) {
                //to escape mongoose model validation and ger simple object
                var newBook = book.toJSON();
                newBook.links = {};
                newBook.links.self = 'http://' + req.headers.host + '/api/books/' + book.id;

                booksList.push(newBook);
            });

            res.status(200).json(booksList);
        });
    };

    var getSingle = function (req, res) {
        console.log(req.book);

        Book.find({
            where: {id: req.params.bookId},
            include: [Review]
        })
            .then(function (err, book) {
                if (err)return res.status(599).json([err]);

                if (book) {
                    res.status(200).json(req.book);

                } else {
                    res.status(404).json({"error": "No book found"});
                }
            });
    };

    var put = function (req, res) {
        if (req.body.id) {
            delete req.body.id;
        }
        var book = {};
        console.log(book);

        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;
        console.log(book);
        Book.update(book, {
            where: {
                id: req.params.bookId
            }
        }).then(function (err) {
            if (err) {
                console.log(book);
                return res.status(599).json(err);
            }

            console.log(book);

            res.status(201).json(req.book);
        }).catch(function (e) {
            console.log(e.message);
        });
    };

    var patch = function (req, res) {
        //req.book.title = req.body.title || req.book.title;
        //req.book.author = req.body.author || req.book.author;
        //req.book.genre = req.body.genre || req.book.genre;
        //req.book.result = req.body.result || req.book.result;
        if (req.body._id) {
            delete req.body._id;
        }
        var book = {};
        console.log(book);

        for (var x in req.body) {
            book[x] = req.body[x];
        }
        console.log(book);
        Book.update(book, {
            where: {
                id: req.params.bookId
            }
        }).then(function (err) {
            if (err) {
                console.log(book);

                res.status(599).json(err);
            }
            console.log(book);

            res.status(201).json(req.book);
        }).catch(function (e) {
            console.log(e.message);
        });
    };

    var deleteBook = function (req, res) {
        Book.destroy({
            where: {id: req.params.bookId}
        })
            .then(function () {
                res.status(204).json({message: "book removed"});
            }).catch(function (err) {
                return res.status(500).json(err);
            });
    };

    var addReview = function (req, res) {
        var review = {}
        for(var prop in req.body){
            review[prop] = req.body[prop];
        }
        if (!review.author) {
            return res.status(400).json({error: new Error("wrong input")})
        }
        review.Book_FK = req.params.bookId;
        console.log(review);
        Review.create(review).then(function () {
            res.status(201).json(review);
        }).catch(function (err) {
            return res.status(599).json(err)
        });
    };

    return {
        post: post,
        getAll: getAll,
        getSingle: getSingle,
        put: put,
        patch: patch,
        delete: deleteBook,
        fetchBook: fetchBook,
        addReview: addReview
    };
};

module.exports = bookController;