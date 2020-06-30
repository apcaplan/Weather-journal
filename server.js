// Require dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const fetch = require('node-fetch')

// Create empty object as an endpoint for all routes
let projectData = {}

// Create instance of app
const app = express()

// Add middleware
// bodyParser to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }))
// bodyParser to parse JSON data sent in POST request
app.use(bodyParser.json())
// Cors for cross origin allowance
app.use(cors())

// Initialize main project folder
app.use(express.static('website'))

// Setup server
const port = 8000

const server = app.listen(port, listening)

function listening () {
  console.log(`server running on localhost: ${port}`)
}

// Define route methods
// GET
app.get('/all', getAll)

function getAll (req, res) {
  console.log('GET request received')
  res.send(projectData)
}

// POST
app.post('/add', addData)

function addData (req, res) {
  projectData.date = req.body.date
  projectData.feelings = req.body.feelings
  projectData.zip = req.body.zip
  console.log('POST request received')
  getWeather()
  res.send(projectData)
}

// GET weather from OpenWeatherMap API

// load key variables
dotenv.config()

// base URL and API key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = process.env.WEATHER_API_KEY
const url2 = '&appid=' + apiKey + '&units=imperial'

//Helper function to generate url for request
const requestUrl = function (zip) {
  const newUrl = baseURL + zip + url2
  return newUrl
}

// Fetch weather data from OpenWeatherMap API
app.post('/weather', getWeather)

function getWeather (req, res) {
  console.log("finding weather...")
  fetch(requestUrl(projectData.zip))
    .then(res => res.json())
    .then(data => {
      projectData.city = data.name
      data.weather.length > 1 ?
        projectData.description = data.weather[0].description :
        projectData.description = data.weather.description
      projectData.temperature = data.main.temp
      // res.send({ data })
      // res.send(projectData)
    })
    .then(()=> console.log(projectData))
    .catch(error => {
      console.log(error)
    })
}
