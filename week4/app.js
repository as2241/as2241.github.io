const apiKey = "f153095090ee8f94607ab26d50c75dd6";

const cityInput = document.getElementById("cityInput");
var weatherContainer = document.getElementById("weather-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function () {
  var cityInput = document.getElementById("cityInput").value;
  if (cityInput === "") {
    alert("Please enter a city name");
  } else {
    var ourRequest = new XMLHttpRequest();
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

    ourRequest.open("GET", url);
    ourRequest.onload = function () {
      if (ourRequest.status >= 200 && ourRequest.status < 300) {
        var data = JSON.parse(ourRequest.responseText);
        renderHTML(data);
      } else {
        alert("Request failed. Status: " + ourRequest.status);
      }
    };
    ourRequest.onerror = function () {
      alert("Request failed");
    };
    ourRequest.send();
  }
});

function renderHTML(data) {
  var weatherDescription = data.weather[0].description;
  var cityMainTemp = data.main.temp;
  var windSpeed = data.wind.speed;
  var htmlString = `<p>Weather Description: ${weatherDescription}</p>
                      <p>Main Temperature: ${cityMainTemp} °C</p>
                      <p>Wind Speed: ${windSpeed} m/s</p>`;

  weatherContainer.insertAdjacentHTML("beforeend", htmlString);
}
