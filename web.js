var http = require('http');
var url = require('url');
var fs = require('fs');
var port = process.env.PORT || 5000;
var type = {'html': 'text/xml',
	'ico': 'image/ico',
	'css': 'text/css',
	'js': 'text/javascript'};
var tokens = {'NOWSHOWING': 'Aguirre, the Wraith of God'};

//force string return in fileread
fs.read = function (path) {
	return fs.readFileSync(path, {encoding: 'utf8'});
}

//supplant tokenized strings
String.prototype.supplant = require('./script/tokenizer');

//serve chat
var msgs = [];
http.ServerResponse.prototype.serveChat = function (request) {
	var response = this;
	var msg = '';
	request.on('data', function(data) {
		msg += data;
	});
	request.on('end', function() {
		msgs.push(msg);
		while (msgs.length > 10)
			msgs.shift();
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('{' + msgs.join() + '}');
		response.end();
	});
}

//serve blog
http.ServerResponse.prototype.serveBlog = function (request) {
	console.log(request);
}

//serve page
http.ServerResponse.prototype.serve = function (path) {
	if (path == '/') // redirect from landing page
		this.writeHead(302, {'Location': '/index.html'});
	else {
		path = '.' + path;
		var ext = path.slice(path.lastIndexOf('.') + 1);
		console.log(ext,type[ext],type);
		this.writeHead(200, {'Content-Type': type[ext]});
		this.write(fs.read(path).supplant(tokens));
	}
	this.end();
}

http.createServer(function (request, response) {
	var path = url.parse(request.url).path;
	if (path == '/chat')
		response.serveChat(request);
	else if (path == '/blog')
		response.serveBlog();
	else
		response.serve(path);
}).listen(port);
