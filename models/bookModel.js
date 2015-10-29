var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    review = require('./reviewModel'),
    Sequelize = require('sequelize');

var book = function (sequelize) {

    var bookModel = sequelize.define('Book', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                //isEmail:true,
                len: {args: [8, 255], msg: "Title length mus be between 8 and 20 signs"}
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                //isNotNull: {args: true, msg: 'author is required'}
            }
        },
        genre: {
            type: Sequelize.STRING,
            validate: {
                len: [0, 8]
            }
        },
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