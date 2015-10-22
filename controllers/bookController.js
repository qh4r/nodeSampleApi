/**
 * Created by qh4r on 22.10.15.
 */

var bookController = function (Book) {

    var fetchBook = function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)return res.status(599).json([err]);

            if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).json({"error": "No book found"});
            }
        });
    };

    var post = function (req, res) {
        var book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save(function (err, result) {
                if (err) return res.status(599).json(err);

                res.status(201);
                res.json(booksList);
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

        Book.find(query, function (err, result) {
            if (err)return res.status(599).json([err]);

            var booksList = [];

            result.forEach(function(book, index, array){
                //to escape mongoose model validation and ger simple object
                var newBook = book.toJSON();
                newBook.links = {};
                newBook.links.self = 'http://' + req.headers.host + '/api/books/' + book.id;

                booksList.push(newBook);
            })

            res.status(200).json(booksList);
        });
    };

    var getSingle = function (req, res) {
        res.status(200).json(req.book);
    };

    var put = function (req, res) {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;
        req.book.save(function (err) {
            if (err) return res.status(599).json(err);
            res.status(201).json(req.book);
        })
    };

    var patch = function (req, res) {
        //req.book.title = req.body.title || req.book.title;
        //req.book.author = req.body.author || req.book.author;
        //req.book.genre = req.body.genre || req.book.genre;
        //req.book.result = req.body.result || req.book.result;
        if (req.body._id) delete req.body._id;
        for (var x in req.body) {
            req.book[x] = req.body[x];
        }
        req.book.save(function (err) {
            if (err) res.status(599).json(err);
            res.status(201).json(req.book);
        });
    };

    var deleteBook = function (req, res) {
        req.book.remove(function (err) {
            if (err) return res.status(500).json(err);

            res.status(204).json({message: "book removed"});
        })
    };

    return {
        post: post,
        getAll: getAll,
        getSingle: getSingle,
        put: put,
        patch: patch,
        delete: deleteBook,
        fetchBook: fetchBook
    };
};

module.exports = bookController;