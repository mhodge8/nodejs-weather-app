# Weather Web App
A weather web application that displays the weather for the user's current location, allows users to search for weather of other cities.


# Overview
The purpose of this project was to better understande Node.js and Express as well as working with APIs. 
### Features
* On startup, the web application displays the current weather based on the location of the IP address
* The user is able to search for the current weather of a city


# Screenshots
![Imgur](https://i.imgur.com/4Mc0fur.png)


# Installation
### Clone project
``` 
$ git clone https://github.com/mhodge8/nodejs-weather-app.git
```
### Change into project folder
```
$ cd nodejs-weather-app/
```
### Install packages
```
$ npm install
```
### Add .env file
* Signup and generate a free OpenWeatger api key [here](https://openweathermap.org/) and an OpenWeather key [here](https://ipstack.com/)
* Withnin the root directory of the project, create a .env file with the following variables:
```
OPENWEATHER_API_KEY=[Enter your OpenWeather API key]
IPSTACK_API_KEY=[Enter your Ipstack API key]
```
### Start server
```
$ node app.js
```
* Project will be accessible at http://localhost:3000/

# Roadmap
No plans to further update this project.


# Technologies Used
* HTML
* CSS
* Node.js