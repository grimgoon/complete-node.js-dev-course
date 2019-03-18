const request = require('request');

// const urlDarksky  = 'https://api.darksky.net/forecast/db0a1be86676a8f0071e35dc0cac1c11/37.8267,-122.4233?units=si&lang=sv';
// const urlMapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=2&access_token=pk.eyJ1IjoiZ3JpbWdvb24iLCJhIjoiY2p0ZTM5amI2MWFqNTRhcDh1aGdpbnRkbSJ9.4-Xjwa6vruF5lYpvKI0uYw&limit=1'

// request({url : urlDarksky, json : true}, (error,response,body) => {

//     if(error) {
//         console.log('Unable to connect to Weather API');
//     } else if(response.body.error) {
//         console.log('Unable to find Location');
//     } else {
//         console.log(body.daily.data[0].summary);
//         console.log("It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.");
//     }
// });

request({url : urlMapbox, json : true}, (error,response,body) => {
    if(error) {
        console.log('Meep, thing are wrong');
    } else if(body.body.features.length === 0) {
        console.log('Meep. The request is having troubles.');
    } else {
        console.log(body.features[0].center[0]); //Longitude
        console.log(body.features[0].center[1]); //Latitude
    }
});
