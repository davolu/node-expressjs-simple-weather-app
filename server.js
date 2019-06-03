const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'xxxxxxx'; //get your key from  openweathermap.org 
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function(req,res){
    res.render('index');
});

app.post('/result', function (req, res) {
   // originally gotten from : https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b

    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
      if(err){
        res.render('result', {weather: null, query:city, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('result', {weather: null, query:city, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
          res.render('result', {weather: weatherText, query:city, error: null});
        }
      }
    });
  });

app.listen(3000, function(){
    console.log("Server started");
})