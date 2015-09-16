var http = require("http");
var fs = require('fs');
var index = fs.readFileSync('index.html');
var server = http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(index);
});

server.listen(8080);
console.log("Server is listening on port 8080");