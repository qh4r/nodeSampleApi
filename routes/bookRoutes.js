var express = require('express');

var routes = function (bookController) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.getAll);


    bookRouter.use('/:bookId', bookController.fetchBook);
    bookRouter.route('/:bookId')
        .get(bookController.getSingle)
        .put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.delete);

    return bookRouter;
};

module.exports = routes;