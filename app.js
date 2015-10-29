var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;

////for test
//if (process.env.ENV === 'Test') {
//    db = mongoose.connect('mongodb://localhost/bookAPI_test');
//} else {
//    db = mongoose.connect('mongodb://localhost/bookAPI');
//}

var Sequelize = require('sequelize')
    , sequelize = new Sequelize('nodeTest', 'nodeUser', 'ewqasdcxz', {
        dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
        port: 5432, // or 5432 (for postgres)
    });

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

//Models
var Book = require('./models/bookModel')(sequelize);

var Review = require('./models/reviewModel')(sequelize);

Book.hasMany(Review, {foreignKey: 'Book_FK'});

//Review.belongsTo(Book, {foreignKey: 'Book_FK'});

//relations setup

//Sync with db
sequelize.sync().then(function(){

})
//Controllers
var bookController = require('./controllers/bookController')(Book, Review);
//var bookController = require('./controllers/bookController')(Book);

//Routers
var bookRouter = require('./routes/bookRoutes')(bookController);


app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my API');
});

app.listen(port, function () {
    console.log('Api running with gulp on port: ' + port);
});

//for supertest
module.exports = app;