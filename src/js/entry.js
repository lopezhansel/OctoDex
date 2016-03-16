// var _ = require('lodash/lodash.min');
// var angular = require('angular');
// var angularanimate = require('angular-animate/angular-animate.min');
// var angulararia = require('angular-aria/angular-aria.min');
// var angularroute = require('angular-route/angular-route.min');
// var angularresource = require('angular-resource/angular-resource.min');
// var angularmaterial = require('angular-material/angular-material.min');
// var ngFileUpload = require('ng-file-upload');

var app = require('./octoModule');
require('./octoService')(app);
require('./inlineDirective')(app);
require('./octoDirectives')(app);
require('./groupController')(app);
require('./indexController')(app);
require('./myProfileController')(app);
require('./otherProfileController')(app);
