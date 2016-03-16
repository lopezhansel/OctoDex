// var _ = require('lodash/lodash.min');
// var angular = require('angular');
// var angularanimate = require('angular-animate/angular-animate.min');
// var angulararia = require('angular-aria/angular-aria.min');
// var angularroute = require('angular-route/angular-route.min');
// var angularresource = require('angular-resource/angular-resource.min');
// var angularmaterial = require('angular-material/angular-material.min');
// var ngFileUpload = require('ng-file-upload');

var app = require('babel!././octoModule');
require('babel!././octoService')(app);
require('babel!././inlineDirective')(app);
require('babel!././octoDirectives')(app);
require('babel!././groupController')(app);
require('babel!././indexController')(app);
require('babel!././myProfileController')(app);
require('babel!././otherProfileController')(app);
