require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = process.env.apiKey;
const PORT = process.env.PORT || 5000;
//const gi = require('gitignore');

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    // NEW CODE
    res.render('index', { weather: null, error: null });
})

app.post('/', function (req, res) {
    let city = req.body.city;
    console.log(city);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            console.log(weather);
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} C degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})


app.listen(PORT, function () {
    console.log('Example app listening on port 5000!')
})