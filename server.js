const express = require('express');
const port = 80;
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

mongoose.connect('mongodb://localhost/virtualBusinessCard');
const User = require('./models/userModel.js');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));

require('./config/passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session()); 

require('./controllers/routeCtrl.js')(app, passport);



app.listen(port, () => console.log(`Server running on port ${port}`));
