// ! OpenWeatherMap API key NOT TO BE SHARED !
const apiKey = "f153095090ee8f94607ab26d50c75dd6";

const cityInput = document.getElementById("cityInput"); // Input field for entering a city.
const weatherContainer = document.getElementById("weather-info"); // To display weather info.
const btn = document.getElementById("btn"); // Button to activate search for the given city.

// Adding our button as an event listener to keep listening for user events.
btn.addEventListener("click", function () {
  // Get the city value from the input field inside an event listener.
  const city = cityInput.value;

  // If city is empty alert the user.
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  // URL responsible for retrieving weather related data.
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  // Create ourRequest constructor to be used for sending a HTTP GET request.
  const ourRequest = new XMLHttpRequest();
  ourRequest.open("GET", weatherApiUrl);

  // When our response is received call the below function to run.
  ourRequest.onload = function () {
    // If our HTTP response status code is less than 200 or above 400 it indicates an HTTP status error.
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      // Once response is received and validated parse the JSON response and store it in 'data' variable to be further manipulated.
      const data = JSON.parse(ourRequest.responseText);
      renderHTML(data);
    } else {
      // Handle HTTP Status Code errors
      handleErrors(new Error(`HTTP Error Status Code: ${ourRequest.status}`));
    }
  };

  // If there's an error during the network request, handle it.
  ourRequest.onerror = function () {
    handleErrors(
      new Error(
        "Network Error: Unable to complete the request. Please check your internet connection."
      )
    );
  };

  // Where the HTTP GET request is sent.
  ourRequest.send();
});

// Function to handle the dynamic rendering of HTML.
function renderHTML(data) {
  const weatherDescription = data.weather[0].description;
  const cityMainTemp = data.main.temp;
  const windSpeed = data.wind.speed;
  const cityName = data.name;

  // Append the variables to HTML paragraph tags and assign to 'htmlString'.
  const htmlString = `<p>The weather in ${cityName} is ${weatherDescription}.<br>
                      The temperature is ${cityMainTemp}°C with a wind speed of ${windSpeed}m/s.</p>`;

  // Parse htmlString variable to be displayed inside weather-info division.
  weatherContainer.insertAdjacentHTML("afterbegin", htmlString);
}

function handleErrors(error) {
  // Display briefly something went wrong in the weatherContainer
  weatherContainer.insertAdjacentHTML(
    "afterbegin",
    `<p>Failed to fetch weather information. Please check console to debug further.</p>`
  );
  // Log the error to the console
  console.error(error);
}
