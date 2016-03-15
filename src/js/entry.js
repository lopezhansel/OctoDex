var _ = require('lodash');
var angular = require('angular');
var angularanimate = require('angular-animate');
var angulararia = require('angular-aria');
var angularroute = require('angular-route');
var angularresource = require('angular-resource');
var angularmaterial = require('angular-material');
var ngFileUpload = require('ng-file-upload');

var app = require('./octoModule');
require('./octoService')(app);
require('./inlineDirective')(app);
require('./octoDirectives')(app);
require('./groupController')(app);
require('./indexController')(app);
require('./myProfileController')(app);
require('./otherProfileController')(app);
