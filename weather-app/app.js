const request = require('request');

const url  = 'https://api.darksky.net/forecast/db0a1be86676a8f0071e35dc0cac1c11/37.8267,-122.4233';

request(url, (error,response,body) => {
    const data = JSON.parse(body);
    console.log(data.currently);
});