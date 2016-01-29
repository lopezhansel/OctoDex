    var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username      : {type: String, required: true},
    name          : {type: String},
    email         : {type: String, required: true},
    gitToken      : {type: String, required: true},
    githubId      : {type: String, required: true}, // Bug :  Number or String
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
    followers     : {type: Array},
    repos         : {type: Array},
    followerNum   : {type: Number},
    followingNum  : {type: Number},
    publicGists   : {type: Number},
	publicRepos   : {type: Number}

});

module.exports = mongoose.model('user', userSchema);
