let weather = {
  tokyo: {
    temp: 16.6,
    temperatureF: 62,
    humidity: 71,
  },
  london: {
    temp: 16.6,
    temperatureF: 49,
    humidity: 95,
  },
  lisbon: {
    temp: 14.4,
    temperatureF: 58,
    humidity: 54,
  },
  paris: {
    temp: 11.6,
    temperatureF: 53,
    humidity: 93,
  },
};
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} | ${hours}:${minutes}`;
}
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function changeTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#serch-text-input");

  let cityElement = document.querySelector("h1");
  if (searchInput.value) {
    cityElement.innerHTML = `${searchInput.value}`;
  } else {
    cityElement.innerHTML = null;
    alert("Plese type a city");
  }

  let city = searchInput.value;
  let apiKey = "903bbfab25a139539824b07e1tfo211c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeTemperature);
  cityElement.innerHTML = city;
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", search);
