const request = require('request');

const geocode = (address, callback) => {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=2&access_token=pk.eyJ1IjoiZ3JpbWdvb24iLCJhIjoiY2p0ZTM5amI2MWFqNTRhcDh1aGdpbnRkbSJ9.4-Xjwa6vruF5lYpvKI0uYw&limit=1';

    request({url : url, json : true}, (error, response,body) => {

        if(error) {
            callback('Unable to connect to location services.');
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {

            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name,
            });
        }

    });

}

module.exports = geocode;