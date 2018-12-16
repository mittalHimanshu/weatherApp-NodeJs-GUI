var Weather = require('./weather');
var renderer = require('./renderer')
var querystring = require('querystring');
var commonHeader = {'Content-Type': 'text/html'};

function home(request, response){
    if(request.url === '/'){
        if(request.method.toLowerCase() === "get"){
            response.writeHead(200, commonHeader);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        }
        else{
            request.on('data', (postBody) => {
                var query = querystring.parse(postBody.toString());
                response.writeHead(303, {"Location": "/"+query.location});
                response.end();
            });
        }
    }
}

function user(request, response){
    var location = request.url.replace('/', '');
    var values;
    if(location.length > 0){
        response.writeHead(200, commonHeader);
        renderer.view("header", {}, response);
        const weather = new Weather()
        weather.get(location);
        weather.on('fetchData', (weatherInfo) => {
            var desc;
            if (weatherInfo.message) {
                renderer.view("error", {errorMessage : weatherInfo.message}, response);
                renderer.view("search", {}, response);
                renderer.view("footer", {}, response);
            }
            else {
                values = {
                    location: weatherInfo.name,
                    temperature : weatherInfo.main.temp,
                    weatherCondition : weatherInfo.weather[0].main
                }
                renderer.view("profile", values, response);
                renderer.view("footer", {}, response);
            }
            response.end();
        });
    }
}

module.exports.home = home;
module.exports.user = user;