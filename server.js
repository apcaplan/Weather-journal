// Require dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Create empty object as an endpoint for all routes
projectData = {}

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
  projectData.temperature = req.body.temp
  projectData.feelings = req.body.feelings
  console.log('POST request received')
  res.send(projectData)
}
