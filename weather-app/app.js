const request = require('request');

const url  = 'https://api.darksky.net/forecast/db0a1be86676a8f0071e35dc0cac1c11/37.8267,-122.4233?units=si&lang=sv';

request({url : url, json : true}, (error,response,body) => {
    console.log(body.daily.data[0].summary);
    console.log("It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.");

});


