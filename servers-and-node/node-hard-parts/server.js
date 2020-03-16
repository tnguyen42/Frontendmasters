const http = require('http');
const fs = require('fs');

function doOnRequest(request, response){
  // Send back a message saying "Welcome to Twitter"
  // code here...
  response.write("Welcome to Twitter")  
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...
	  fs.createReadStream("./index.html");
	  const index = fs.readFileSync("./index.html", "utf8");
	  response.writeHeader(200, {"Content-Type": "text/html"}); 
	  response.write(index);
  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
	  response.end("hi back to you!");
	  fs.appendFileSync("hi_log.txt", "Somebody said hi.\n");
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    
  }
  else {
    // Handle 404 error: page not found
    // code here...
    
  }
}

const server = http.createServer(doOnRequest)

server.listen(3000);
