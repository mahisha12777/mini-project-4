const input = document.getElementById("cityname");
const button = document.getElementById("button");

const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const cloud = document.getElementById("cloud");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const country = document.getElementById("country");
const weatherIcon = document.getElementById("weatherIcon");

const locationDiv = document.querySelector(".location");

const API_KEY = "da13bb7e4b89ce816ffa712cbe09aaaf";

button.addEventListener("click", (e) => {
  e.preventDefault();
  const city = input.value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found");
      return;
    }
    /*document.getElementById(
      "img"
    ).innerHTML = `<img src="${iconUrl}" alt="Weather Icon" style="with:80px;height:80px;"/>`;*/
    locationDiv.textContent = `📍 ${data.name}`;
    temperature.textContent = `Temperature: ${(data.main.temp - 273.15).toFixed(
      1
    )} °C`;
    wind.textContent = `Wind: ${data.wind.speed} m/s`;
    cloud.textContent = `Cloud: ${data.weather[0].description}`;
    sunrise.textContent = `Sunrise: ${convertTime(data.sys.sunrise)}`;
    sunset.textContent = `Sunset: ${convertTime(data.sys.sunset)}`;
    country.textContent = `Country: ${data.sys.country}`;
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Something went wrong. Try again.");
  }
}

function convertTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString();
}
