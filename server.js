var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root: './public'});
});




var port = 80;
app.listen(port, function() {
	console.log('Server running on port ' + port);

});