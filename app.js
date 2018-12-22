var http = require('http');
var router = require('./router');

http.createServer((request, response) => {
    router.home(request, response);
    router.user(request, response);
}).listen(process.env.PORT || 3000);
console.log('server running');
