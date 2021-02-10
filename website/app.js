/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
//Please paste your API key here (after &appid=)
let apiKey = '&appid=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', generateAndPost);

//Main function that gets data from WeatherMap API as well as user data and dynamically update UI
function generateAndPost(event) {
  const zipCode = document.getElementById('zip').value;
  const response = document.getElementById('feelings').value;
  getLocation(baseURL, zipCode, apiKey)
  .then(function(weatherData){
    postWeather('/weather', {temp: weatherData.main.temp, date: newDate, response: response});
  })
  .then(
    updateUI()
  )
}

//this is GET request using fetch (it takes data from API)
const getLocation = async (baseURL, zip, key) => {
  const res = await fetch(baseURL+zip+key);
  try {
    const weatherData = await res.json();
    return weatherData;
  } catch(error) {
    console.log('error', error);
  };
};

//POST request to add API data
const postWeather = async (url = ' ', weatherData = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(weatherData),
  });
  try {
    const getWeatherData = await response.json();
    return getWeatherData;
  } catch (error) {
    console.log(error);
  };
};

//function that dynamically update UI
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const reqData = await req.json();
    console.log(reqData);
    document.getElementById('date').innerHTML = reqData.date;
    document.getElementById('temp').innerHTML = reqData.temp;
    document.getElementById('content').innerHTML = reqData.response;
  } catch(error) {
    console.log(error);
  }
}