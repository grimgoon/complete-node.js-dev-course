const path = require('path');

const express = require('express');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Alexander H',
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Page',
        name : 'Alexander H',
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        message : 'This is a help message',
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Cloudy',
        location: 'Stockholm',
    });
});

app.listen(3000, () => {    
    console.log('Server is up on port 3000.');
});