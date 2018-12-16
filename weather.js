const https = require('https');
const api = require('./api.json');
const EventEmitter = require('events');

class Weather extends EventEmitter {
    get(query) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`;
        const request = https.get(url, response => {
            let body = "";
            response.on('data', chunk => {
                body += chunk.toString();
            });
            response.on('end', () => {
                const description = JSON.parse(body);
                this.emit('fetchData', description);
            });
        });
    }
}

module.exports = Weather;