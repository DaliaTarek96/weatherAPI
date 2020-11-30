/* Global Variables */

// Create a new date instance dynamically with JS

// Personal API Key for OpenWeatherMap API
const weatherAPI = 'b137dc878df1008f06924c615831191a';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
let generateButton = document.getElementById('generate');
generateButton.addEventListener('click', weatherInfo);
/* Function called by event listener */
function weatherInfo() {
    let zip = document.getElementById('zip').value;
    let response = document.getElementById('feelings').value;
    if (response == '' || zip == '') {
        alert('All fields are requird !');
    } else {
        let d = new Date();
        let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
        getWeather(baseURL, zip, weatherAPI).then((data) => {
            if (data.cod !='200') {
                sendData('/addWeather', { temperature: 'notemp' })
            } else {
                let temperature = data.main.temp;
                sendData('/addWeather', { temperature: temperature, date: newDate, userResponse: response })
            }
        }).then(()=>{
            updateUI('/weather')
        }
        );
    }
}
/* Function to GET Web API Data*/
const getWeather = async (baseURL, zip, weatherAPI) => {
    const weather = await fetch(baseURL + zip + '&appid=' + weatherAPI);
    try {
        let weatherData = await weather.json();
        return weatherData;
    } catch (error) {
        console.log('error: ' + error);
    }
}
/* Function to POST data */
const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData
    } catch (e) {
        console.log('error: ');
    }
}

/* Function to GET Project Data */

const updateUI = async (url  ) => {
    const res = await fetch(url);
    try {
        let data = await res.json();
        let addData = data.pop();
        if (addData.temperature == 'notemp') {
            document.getElementById('temp').innerText = 'Zip code is incorrect';
            document.getElementById('date').innerText = '';
            document.getElementById('content').innerText = '';
        } else {
            document.getElementById('temp').innerText = addData.temperature;
            document.getElementById('date').innerText = addData.date;
            document.getElementById('content').innerText = addData.userResponse;
        }
    } catch (error) { console.log(error); }
}