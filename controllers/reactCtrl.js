// Babel ES6/JSX Compiler
require('babel-register');
var path = require('path');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('underscore');
var mongoose = require('mongoose');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');

var User = require("../models/userModel");


module.exports = (app, passport) => {

	app.get('/react', (req, res) => {
		res.sendFile('index.html', {root: './public/views'});
	});
	
};