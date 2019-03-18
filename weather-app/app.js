const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


if(process.argv.length >= 3 ) {

    geocode(process.argv[2], (error,data) => {
        if(error) {
            return console.log(error);
        } 

        forecast(data.longitude, data.latitude, (error, forecastData) => {

            if(error) {
                return console.log(error);
            }

            console.log(data.location);
            console.log(forecastData.summary + '. Temperature: ' + forecastData.temperature + ' Rain Probability: ' + forecastData.percipProbability + '%');
        });
    });
}