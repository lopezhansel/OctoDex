    var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username        : {type: String, required: true}, // login instead 
    name            : {type: String},
    email           : {type: String, required: true},
    gitToken        : {type: String, required: true},
    githubId        : {type: String, required: true}, // Bug :  Number or String // id instead 
    avatar_url      : {type: String},
    company         : {type: String},
    blog            : {type: String},
    location        : {type: String},
    hireable        : {type: String},
    bio             : {type: String},
    created_at      : {type: String},  
    updated_at      : {type: String}, 
    profileUrl      : {type: String}, // html_url instead
    followersArray  : {type: Array},
    followers       : {type: Number},
    reposArray      : {type: Array},
    public_repos    : {type: Number},
    followingArray  : {type: Array},
    following       : {type: Number},
    public_gists    : {type: Number} 

});

module.exports = mongoose.model('user', userSchema);
