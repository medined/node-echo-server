var http = require('http');
 
http.createServer(function(request,response) {
  response.writeHead(200);
  response.write('silver-argint');
  response.end();
}).listen(8080);
