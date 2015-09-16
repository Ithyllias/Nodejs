var https = require("https");
var fs = require('fs');
var pk = fs.readFileSync('ssl/privatekey.pem');
var pc = fs.readFileSync('ssl/certificate.pem');
var opts = { key: pk, cert: pc };
var index = fs.readFileSync('index.html');
var server = https.createServer(opts, function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index);
});

server.listen(8080);
console.log("Server is listening on port 8080");