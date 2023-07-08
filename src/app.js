const appContainer = document.querySelector(".app");
const searchButton = document.querySelector(".searchButton");

searchButton.addEventListener("click", () => {
  const APIKey = "03ee15bcaa69fad3b353c03c2d55cd6f";

  const city = document.getElementById("searchInput").value;
  console.log(city);

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        console.log("Error 404");
      }

      if (json.cod === "401") {
        console.log("Error 401");
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.getElementById("temperature");
      const desc = document.getElementById("description");
      const humidity = document.getElementById("humidityPercent");
      const wind = document.getElementById("windSpeed");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "./assets/clear.png";
          break;
        case "Rain":
          image.src = "./assets/rain.png";
          break;
        case "Clouds":
          image.src = "./assets/cloud.png";
          break;
        case "Snow":
          image.src = "./assets/snow.png";
          break;
        case "Haze":
          image.src = "./assets/mist.png";
          break;
        default:
          image.src = "";
      }

      console.log(parseFloat(json.main.temp), json.weather[0].main);
      temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
      desc.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
      appContainer.style.maxHeight = "700px";
    });
});
