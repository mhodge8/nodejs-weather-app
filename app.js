require("dotenv").config();

const express = require("express");
const https = require("https");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//get timeOfDay to display background based on time
let timeOfDay = "";
const currentTime = new Date().getHours();
if (currentTime > 6 && currentTime < 20){
    timeOfDay = "day";
} else {
    timeOfDay = "night";
}

app.get('/', (req, res) => {
    //get user location
    http.get(`http://api.ipstack.com/check?access_key=${process.env.IPSTACK_API_KEY}`, (response) =>{
        response.on("data", (info) =>{
            const ipInfo = JSON.parse(info);
            const zipCode = ipInfo.zip

            //get weather based on user location
            const apiKey = process.env.OPENWEATHER_API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`;
        
            https.get(url, (response) => {
                response.on("data", (info) => {
                    const weatherInfo = JSON.parse(info);
        
                    const cityName = weatherInfo.name;
                    const description = weatherInfo.weather[0].description;
                    const imgUrl = `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
                    const temperature = weatherInfo.main.temp;
                    const feelsLike = weatherInfo.main.feels_like;
                    const humidity = weatherInfo.main.humidity;
                    const wind = weatherInfo.wind.speed;
        
                    res.render("index", {
                        timeOfDay: timeOfDay, 
                        cityName: cityName, 
                        description: description,
                        imgUrl: imgUrl, 
                        temperature: temperature, 
                        feelsLike: feelsLike, 
                        humidity: humidity,
                        wind: wind
                    });
                });
            });
        }); 
    });
});

app.post("/", (req, res) => {
    //get weather based on city name
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = req.body.userCity
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    https.get(url, (response) => {
        if (response.statusCode != 200){
            res.render("error", {timeOfDay: timeOfDay});
        } else{
            response.on("data", (info) => {
                const weatherInfo = JSON.parse(info);
    
                const cityName = weatherInfo.name;
                const description = weatherInfo.weather[0].description;
                const imgUrl = `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`;
                const temperature = weatherInfo.main.temp;
                const feelsLike = weatherInfo.main.feels_like;
                const humidity = weatherInfo.main.humidity;
                const wind = weatherInfo.wind.speed;
    
                res.render("index", {
                    timeOfDay: timeOfDay, 
                    cityName: cityName, 
                    description: description, 
                    imgUrl: imgUrl, 
                    temperature: temperature, 
                    feelsLike: feelsLike, 
                    humidity: humidity,
                    wind: wind
                });
            })
        }
    });
});

app.listen(3000);