const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


if(process.argv.length >= 3 ) {

    geocode(process.argv[2], (error,{longitude,latitude,location}) => {
        if(error) {
            return console.log(error);
        } 

        forecast(longitude, latitude, (error, forecastData) => {

            if(error) {
                return console.log(error);
            }

            console.log(location);
            console.log(forecastData.summary + '. Temperature: ' + forecastData.temperature + ' Rain Probability: ' + forecastData.percipProbability + '%');
        });
    });
}