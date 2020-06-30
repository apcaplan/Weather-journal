// Event listeners
document.getElementById('generate').addEventListener('click', getData)

//
function getData (event) {
  event.preventDefault()
  // get user input values
  const zip = document.getElementById('zip').value
  const text = document.getElementById('feelings').value
}
