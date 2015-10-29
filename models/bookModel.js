var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    review = require('./reviewModel');


var bookSchema = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    reviews: [review.schema]
});

module.exports = mongoose.model('Book', bookSchema);
