let now = new Date();
days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(day);

months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
console.log(month);

let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
console.log(hour);
let minute = now.getMinutes();
console.log(minute);

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hour}:${minute}`;

//

let searchFormm = document.querySelector("#search-form");

searchFormm.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let temperatureElement = document.querySelector("#temperature");

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", convertF);

function convertF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  console.log(temperatureElement);
  let temp = temperatureElement.innerHTML;
  temp = Number(temp);
  temperatureElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", convertC);

function convertC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  console.log(temperatureElement);
  let temp = temperatureElement.innerHTML;
  temp = Number(temp);
  temperatureElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
}

//Weather API

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;

  let temperatureDes = response.data.weather[0].description;
  let description = document.querySelector(".temperatureDes");
  description.innerHTML = `${temperatureDes}`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML =
    response.data.main.feels_like;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `${response.data.wind.speed}km/h`;
}

//geolocation
function showPosition(position) {
  let apiKey = "3bc520cc14bbdedfd7e45158f2ef0439";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLoc");
button.addEventListener("click", getCurrentPosition);

console.log(search("New York"));
