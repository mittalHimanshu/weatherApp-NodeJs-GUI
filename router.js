var Weather = require('./weather');

function home(request, response){
    if(request.url === '/'){
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Header\n');
        response.write('Search\n');
        response.end('Footer');
    }
}

function user(request, response){
    var location = request.url.replace('/', '');
    if(location.length > 0){
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Header\n');
        const weather = new Weather()
        weather.get(location);
        weather.on('fetchData', (weatherInfo) => {
            var desc;
            if (weatherInfo.message) {
                desc = `${weatherInfo.message}`;
            }
            else {
                const temp = `Current temperature in ${weatherInfo.name} is ${weatherInfo.main.temp} C`;
                const condition = `Weather condition in ${weatherInfo.name} is ${weatherInfo.weather[0].main}`;
                desc = temp + " and " + condition;
            }
            response.write(`${desc}` + '\n');
            response.end('Footer');
        });
    }
}

module.exports.home = home;
module.exports.user = user;