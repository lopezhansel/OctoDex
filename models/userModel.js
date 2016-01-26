    var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username      : {type: String, required: true},
    name          : {type: String},
    email         : {type: String, required: true},
    gitToken      : {type: String, required: true},
    githubId      : {type: String, required: true}, // should be a number but might cause error if not string
    avatar_url    : {type: String},
    apiUrl        : {type: String},
    company       : {type: String},
    blog          : {type: String},
    location      : {type: String},
    hireable      : {type: String},
    bio           : {type: String},
    createdGit    : {type: String},
    updatedGit    : {type: String},
    profileUrl    : {type: String},
	displayName   : {type: String}
});

module.exports = mongoose.model('user', userSchema);
