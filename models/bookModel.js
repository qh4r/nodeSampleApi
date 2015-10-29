var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    review = require('./reviewModel'),
    Sequelize = require('sequelize');

var book = function(sequelize) {

    var bookModel = sequelize.define('Book', {
        title: Sequelize.STRING,
        author: Sequelize.STRING,
        genre: Sequelize.STRING,
        read: Sequelize.BOOLEAN
    });


    //var bookSchema = new Schema({
    //    title: {
    //        type: String
    //    },
    //    author: {
    //        type: String
    //    },
    //    genre: {
    //        type: String
    //    },
    //    read: {
    //        type: Boolean,
    //        default: false
    //    },
    //    reviews: [review.schema]
    //});
    return bookModel;
};
//module.exports = mongoose.model('Book', bookSchema);

module.exports = book;