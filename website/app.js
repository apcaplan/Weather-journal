// Event listeners
document.getElementById('generate').addEventListener('click', getData)

// Get date function
function getDate () {
  const today = new Date(Date.now())

  // Parse date
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December']

  const day = days[today.getDay()]
  const month = months[today.getMonth()]
  const date = today.getDate()
  const year = today.getFullYear()
  const minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes()
  const time = `${today.getHours()}:${minutes}`

  return `${time} on ${day}, ${month} ${date}, ${year}`
}

// Gather data function
function getData (event) {
  event.preventDefault()
  // get user input values
  const zipcode = document.getElementById('zip').value
  const text = document.getElementById('feelings').value
  // get date
  const date = getDate()
  // send data in POST request
  postData('http://localhost:8000/add', { date: date, feelings: text, zip: zipcode })
    .then((newData) => console.log(newData))
    .then(() => updateUI())
    .then(() => document.getElementById('form').reset())
    .catch(error => console.error(error))
}

// Function to POST data
const postData = async (url='', data={}) => {
  const req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      date: data.date,
      feelings: data.feelings,
      zip: data.zip
    })
  })
  try {
    const newData = await req.json()
    return newData
  }
  catch(error){
    console.error(error)
  }
}

// Update UI
const updateUI = async () => {
  const getAll = await fetch('http://localhost:8000/all')
  try {
    const data = await getAll.json()
    // udate on screen
    document.getElementById('date').innerHTML = `It is now ${data.date}.`
    // document.getElementById('city').innerHTML = data.city
    document.getElementById('temp').innerHTML =
      `The temperature ${data.city ? `in ${data.city}` : ''} is
        ${Math.round(data.temperature) + '\u2109'}.`;
    if (data.description) {
      document.getElementById('weather').innerHTML = `...and ${data.description}.`
    }
    if (data.feelings)
    document.getElementById('content').innerHTML = `You're feeling ${data.feelings}`
    // show div for results
    document.getElementById('entryHolder').classList.add('show')
  }
  catch (error) {
    console.log('error: ', error)
  }
}
