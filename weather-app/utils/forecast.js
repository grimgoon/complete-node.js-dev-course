const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/db0a1be86676a8f0071e35dc0cac1c11/' + latitude + ',' + longitude  + '?units=si&lang=sv';

    request({url : url, json : true}, (error, response, body) => { 
        if(error) {
            callback('Error to use service');
        } else if(body.error) {
            callback('Error to find location');
        } else {
            callback(undefined, {
                percipProbability : body.currently.precipProbability,
                summary : body.currently.summary,
                temperature : body.currently.temperature,

            })
        }
    });

}

module.exports = forecast;