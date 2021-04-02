function formatTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hour}:${minutes}`;
}

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hour = date.getHours();
    if (hour < 10) {
    hour = `0${hour}`;    
} 
    let minutes = date.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`;

    return `${hour}:${minutes}`;
}
}

function showCityName(event) {
  console.log("Show city");
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let heading = document.querySelector("h1");
  heading.innerHTML = input.value;
  getCity(event);
}

function setSourceOfTruthTemperature(temperature) {
  document.querySelector("#temperature").setAttribute('data-celsius-temp', temperature)
}

function getSourceOfTruthTemperature() {
  return document.querySelector("#temperature").getAttribute('data-celsius-temp')
}


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Number(getSourceOfTruthTemperature());
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Number(temperatureElement.innerHTML);
  temperatureElement.innerHTML = getSourceOfTruthTemperature()
}

let now = new Date();
console.log(formatTime(now));
document.getElementById("time").innerHTML = formatTime(now);

let cityInput = document.querySelector("#searchbox");
// let cityInput = document.querySelector(".searchbox");
cityInput.addEventListener("submit", showCityName);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

// Change the temperature and the name of the city

function getTemperature(response) {
  console.log("test");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  temperatureElement.innerHTML = temperature;
  setSourceOfTruthTemperature(temperature)
 // (response.data.main.temp);

  //let cityName = document.querySelector(".city");
  //cityName.innerHTML = response.data.name;
}
function getCity(response) {
  console.log("Get city test" + response);
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  let unit = "metric";
  //let h1 = document.querySelector("h1");
  let apiKey = "88b78149fb5d36f32843eb429fe1c6d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${unit}`;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", getCity);


// show forecast
function displayForecast(response) {
  console.log("Test getting forecast");
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
      ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

// show geolocation
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let unit = "metric";
  let apiKey = "88b78149fb5d36f32843eb429fe1c6d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// Get the position when the screen loads
getCurrentPosition()

// let userLocation = document.querySelector("#user-location");
// userLocation.addEventListener("click", getCurrentPosition);
