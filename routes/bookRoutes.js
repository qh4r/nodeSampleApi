var express = require('express');

var routes = function (bookController) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.getAll);


   // bookRouter.use('/:bookId', bookController.fetchBook);
    bookRouter.route('/:bookId')
        .get(bookController.getSingle)
        .put(bookController.put)
        .patch(bookController.patch)
        .delete(bookController.delete);

    //bookRouter.route('/:bookId/review')
    //    .get(bookController.getSingle)
    //    .post(bookController.addReview);

    return bookRouter;
};

module.exports = routes;