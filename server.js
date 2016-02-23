"strict mode";
var express = require('express');
var port = 2000;
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var sercrets = require("./config/secrets");  // my app secrets 

mongoose.connect('mongodb://localhost/octoDex');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: sercrets.sessionSecret,
    resave: false,
    saveUninitialized: true,
}));


require('./config/passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session());

require('./controllers/routeCtrl.js')(app, passport);
require('./controllers/reactCtrl.js')(app, passport);



app.listen(port, () => console.log(`Server running on port ${port}`));
