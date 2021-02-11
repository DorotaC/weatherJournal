/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
//Please paste your API key here (after &appid= and before &units=imperial, where the ' ' is)
const apiKey = '&appid= &units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
const generateButton = document.getElementById('generate');

generateButton.addEventListener('click', generateAndPost);

//Main function that gets data from WeatherMap API as well as user data and dynamically update UI
//Many thanks to Manmeet S for his help in solving zipcode validation issue
//https://knowledge.udacity.com/questions/484862?utm_campaign=ret_600_auto_ndxxx_knowledge-answer-created_na&utm_source=blueshift&utm_medium=email&utm_content=ret_600_auto_ndxxx_knowledge-answer-created_na&bsft_clkid=bfcb36c0-13bb-4308-8f5f-6b6ec17ac09d&bsft_uid=56e493f5-14e2-4104-bb33-db8d9f070ea0&bsft_mid=5cfbc8af-7160-42ee-b8a5-188e01014420&bsft_eid=22b8f7b6-5eac-66ee-cf9f-0d5b86b9fddc&bsft_txnid=b0f2abc6-ab31-437a-beae-0cf9d9e6d8f7&bsft_mime_type=html&bsft_ek=2021-02-//11T06%3A34%3A52Z&bsft_aaid=8d7e276e-4a10-41b2-8868-423fe96dd6b2&bsft_lx=1&bsft_tv=1#485619
function generateAndPost(event) {
  const zipField = document.getElementById('zip');
  if (zipField.validity.patternMismatch || zipField.value == ''){
    console.log('Please enter zip code in XXXXX format');
  } else {
    const zipCode = zipField.value;
    const response = document.getElementById('feelings').value;
    getLocation(baseURL, zipCode, apiKey)
    .then(function(weatherData){
      postWeather('/weather', {temp: weatherData.main.temp, date: newDate, response: response});
    })
    .then(function() {
      updateUI()
    });
  }
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
