//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8888;
var server = http.createServer(function(request, response){
  var path = url.parse(request.url).pathname;
  var query = url.parse(request.url).query;
  console.log(path);
  console.log(query);
  switch(path){
    case '/':
      fs.readFile('./index.html', function(error, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data, 'utf-8');
      });
      break;
    case '/getComments':
      fs.readFile('./comments.json', function(error, data){
        response.writeHead(200, {'Content-Type': 'text/json'});
        response.end(data, 'utf-8');
      });
      break;
    case '/addComment':
      var comment = query.split('=')[1];
      fs.readFile('./comments.json', function(error, data){
        var comments = JSON.parse(data);
        comments.push(comment);
        fs.writeFile('./comments.json', JSON.stringify(comments), function(error){
          if(error) throw error;
          console.log('The comment has been saved!');
        });
      });
      break;
    default:
      response.writeHead(404);
      response.write('Route not defined');
      response.end();
  }
});
server.listen(port);
console.log('Server running at http://localhost:' + port);