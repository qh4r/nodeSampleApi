/**
 * Created by qhr66_000 on 2015-10-27.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Sequelize = require('sequelize');

var review = function (sequelize) {
    var reviewModel = sequelize.define('Review', {
        author: {
            type: Sequelize.STRING,
            allowNull: false
        },
        score: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                //for some reason does not accept zero
                min: {args: 1, msg: "must be value from between 1 and 100"},
                max: {args: 100, msg: "must be value from between 1 and 100"}
            }
        },
        comment: Sequelize.STRING
    });
    return reviewModel;
};

module.exports = review;

//var reviewSchema = new Schema({
//    author: {type: String, required: true},
//    score: {type: Number, min: 0, max: 100, required: true},
//    comment: String,
//});
//
//exports.Model = mongoose.model('Review', reviewSchema);
//
//exports.schema = reviewSchema;