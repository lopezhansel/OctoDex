var app = require("../server");

app.get('/', function(req, res) {
	res.sendFile('index.html', {
		root: './public'
	});  
});

module.exports = app;
