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

function showCityName(event) {
  console.log("Show city");
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let heading = document.querySelector("h1");
  heading.innerHTML = input.value;
  getCity(event);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = ((temperature - 32) * 5) / 9;
}

let now = new Date();
console.log(formatTime(now));
document.getElementById("time").innerHTML = formatTime(now);

let cityInput = document.querySelector(".searchbox");
console.log(cityInput);
cityInput.addEventListener("submit", showCityName);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

// change and show the temperature and the name of the city

function getTemperature(response) {
  console.log("test");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
 // temperatureElement.innerHTML = temperature;
  (response.data.main.temp);

  //let cityName = document.querySelector(".city");
  //cityName.innerHTML = response.data.name;
}
function getCity(response) {
  console.log("Get cit test" + response);
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  let unit = "metric";
  //let h1 = document.querySelector("h1");
  let apiKey = "88b78149fb5d36f32843eb429fe1c6d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getTemperature);
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", getCity);

// show geolocation
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let unit = "metric";
  let apiKey = "88b78149fb5d36f32843eb429fe1c6d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

// let userLocation = document.querySelector("#user-location");
// userLocation.addEventListener("click", getCurrentPosition);
