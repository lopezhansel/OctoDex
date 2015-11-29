"strict mode";
var express = require('express');
var port = 80;
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var oauth = require("./config/oauth");

mongoose.connect('mongodb://localhost/virtualBusinessCard');
var User = require('./models/userModel.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.sessionMiddleware = session({
    secret: oauth.sessionSecret,
    resave: false,
    saveUninitialized: true,
});

app.use(app.sessionMiddleware);


require('./config/passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/routeCtrl.js')(app, passport,User);



app.listen(port, () => console.log(`Server running on port ${port}`));
