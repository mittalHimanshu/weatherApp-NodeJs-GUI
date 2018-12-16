var http = require('http');
http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type':'text/plain'});
    setInterval(() => {
        response.write(new Date() + '\n');
    }, 2000);
}).listen(3000, '127.0.0.1');
console.log('server running');