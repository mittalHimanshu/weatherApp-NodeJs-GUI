var http = require('http');
var router = require('./router');

http.createServer((request, response) => {
    router.home(request, response);
    router.user(request, response);
}).listen(process.env.port || 3000, '127.0.0.1');
console.log('server running');
