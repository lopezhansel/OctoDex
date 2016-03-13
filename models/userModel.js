    var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    login               : {type: String, required: true, unique : true}, 
    name                : {type: String},
    email               : {type: String, required: true},
    gitToken            : {type: String, required: true},
    githubId            : {type: String, required: true}, 
    avatar_url          : {type: String},
    company             : {type: String},
    phone               : {type: String}, 
    blog                : {type: String},
    location            : {type: String},
    hireable            : {type: String},
    bio                 : {type: String},
    created_at          : {type: String},  
    updated_at          : {type: String}, 
    profileUrl          : {type: String}, 
    followersArray      : {type: Array},
    followers           : {type: Number},
    reposArray          : {type: Array},
    public_repos        : {type: Number},
    followingArray      : {type: Array},
    following           : {type: Number},
    public_gists        : {type: Number},
    organizations       : {type: String},
    twitterHandle       : {type: String},
    facebookUrl         : {type: String},
    linkedInUrl         : {type: String},
    jobTitle            : {type: String},
    xRatelimitLimit     : {type: String},
    xRatelimitRemaining : {type: String},
    xRatelimitReset     : {type: String},
    lastModified        : {type: String}
});

module.exports = mongoose.model('user', userSchema);
