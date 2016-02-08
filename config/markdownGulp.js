module.exports = function (inputFile,outputFile) {
	var fs = require('fs');
	var Markdown = require('markdown-to-html').Markdown;
	var opts = require('markdown-to-html/lib/getopts');
	var fileName = inputFile;
	var verbose = opts.verbose || opts.debug;
	if (verbose) console.error('>>>opts=', opts);

	var md = new Markdown();
	md.debug = opts.debug;
	md.bufmax = 2048;

	md.render(fileName, {}, function(err) {
	  if (err) {
	    console.error('>>>' + err);
	  }
	  if (verbose) console.error('>>>starting to pipe...');

	  fs.writeFile(outputFile, md.html,function (err)  {
	    if (err) throw err;
	  });

	});
};