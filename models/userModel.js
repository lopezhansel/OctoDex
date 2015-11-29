var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username     : {type: String, required: true},
    name         : {type: String, required: true},
    email        : {type: String, required: true},
    gitToken     : {type: String, required: true},
    githubId     : {type: String, required: true}

});

module.exports = mongoose.model('user', userSchema);

