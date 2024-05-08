let searchBtn = document.getElementById("search-button");
let cityInp = document.getElementById("city-input");
let countryCodeInp = document.getElementById("country-code-input");
const inputContainer = document.querySelector('.container')
const weatherAppDiv = document.querySelector('.weather-app');

let searchPerformed = false;


searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
    let cityName = cityInp.value; 
    let countryCode = countryCodeInp.value;
    let finalUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=fe6cfa1d62a176fd021ef3230c91df51`;
  
 
    fetch(finalUrl).then((response) => response.json()).then((data) => {
    
      if (!searchPerformed) {
        let currentWeatherContainer = document.createElement("div"); 
        currentWeatherContainer.classList.add("current-weather-container"); 
        weatherAppDiv.appendChild(currentWeatherContainer);
      } 

      if ((document.querySelector('.error-msg-div')) !== null) {
        inputContainer.removeChild(document.querySelector('.error-msg-div'));
      }

  
      let weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&appid=fe6cfa1d62a176fd021ef3230c91df51`
      
      fetch(weatherUrl).then((response2) => response2.json()).then((data2) => {
        
        const currentWeatherContainer = document.querySelector('.current-weather-container');

        currentWeatherContainer.innerHTML = `
        <div class="metric-switch-div">
            <input type="checkbox" id="check">
            <label for="check" class="metric-button"></label>    
        </div>
        <div class="city-name-div">
          <h3 class="city-name">${data[0].name}, ${data[0].country}</h3>
        </div>
        <div class="current-weather-condition">
         
        </div>
        <div class="current-temp-windspeed">
          <div class="current-temp">
              <img class="current-temp-icon" src="icons/thermometer-svgrepo-com.svg" alt="">
              <h3 class="current-temp-info">${Math.round((1.8 * (data2.current.temp - 273.15) + 32))}°F</h3>
          </div>
          <div class="current-windspeed">
            <img class="current-windspeed-icon"src="icons/wind-svgrepo-com.svg" alt="">
            <h3 class="current-windspeed-info">${Math.round(((data2.current.wind_speed)*2.23694))} MPH</h3>
          </div>
        </div>

        <div class="current-humidity-visibility">
          <div class="current-humidity">
            <img class="current-humidity-icon" src="icons/humidity-svgrepo-com.svg" alt="">
            <h3 class="current-humidity-info">${(data2.current.humidity)}%</h3>
          </div>
          <div class="current-visibility">
            <img class="current-visibilty-icon" src="icons/binoculars-svgrepo-com.svg" alt="">
            <h3 class="current-visibility-info">${Math.round(((data2.current.visibility)*0.000621371))} Miles</h3>
          </div>
        </div>`
        
          const metricCheckBox = document.getElementById("check");

          metricCheckBox.addEventListener('change', function(e) {

          const currentTemp = document.querySelector('.current-temp');
          const currentWindSpeed = document.querySelector('.current-windspeed');
          const currentVisibility = document.querySelector('.current-visibility');

            if(metricCheckBox.checked) {

              currentTemp.innerHTML = `<img class="current-temp-icon" src="icons/thermometer-svgrepo-com.svg" alt="">
              <h3 class="current-temp-info">${Math.round(((data2.current.temp - 273.15)))}°C</h3>`

              currentWindSpeed.innerHTML = `<img class="current-windspeed-icon"src="icons/wind-svgrepo-com.svg" alt="">
              <h3 class="current-windspeed-info">${Math.round((data2.current.wind_speed))} M/S</h3>`

              currentVisibility.innerHTML = `<img class="current-visibilty-icon" src="icons/binoculars-svgrepo-com.svg" alt="">
              <h3 class="current-visibility-info">${Math.round(((data2.current.visibility) / 1000))} KM</h3>`
            } 
            
            else {
              currentTemp.innerHTML = `  <img class="current-temp-icon" src="icons/thermometer-svgrepo-com.svg" alt="">
              <h3 class="current-temp-info">${Math.round((1.8 * (data2.current.temp - 273.15) + 32))}°F</h3>`

              currentWindSpeed.innerHTML = ` <img class="current-windspeed-icon"src="icons/wind-svgrepo-com.svg" alt="">
              <h3 class="current-windspeed-info">${Math.round(((data2.current.wind_speed)*2.23694))} MPH</h3>`

              currentVisibility.innerHTML = `<img class="current-visibilty-icon" src="icons/binoculars-svgrepo-com.svg" alt="">
              <h3 class="current-visibility-info">${Math.round(((data2.current.visibility)*0.000621371))} Miles</h3>`
            }
          })

        let currentUnixTime = (Math.floor(Date.now()/1000));
        let nightTime = (currentUnixTime > (data2.current.sunset) || (currentUnixTime < (data2.current.sunset)) && (currentUnixTime < (data2.current.sunrise)));
        
        const currentWeatherCondition = document.querySelector('.current-weather-condition');

          if ((data2.current.weather[0].main === "Clear") && nightTime == true) {
            currentWeatherCondition.innerHTML= 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/night.svg" alt="night">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Clear") && nightTime == false) { 
            currentWeatherCondition.innerHTML =
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/day.svg" alt="sunny">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Clouds") && (data2.current.clouds < 50) && nightTime == true) {
            currentWeatherCondition.innerHTML = 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/cloudy-night-3.svg" alt="partly-cloudy-night">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Clouds") && (data2.current.clouds < 50) && nightTime == false) {
            currentWeatherCondition.innerHTML = 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/cloudy-day-3.svg" alt="partly-cloudy-day">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Clouds") && (data2.current.clouds > 50)) {
            currentWeatherCondition.innerHTML = 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/cloudy.svg" alt="cloudy">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Drizzle")) {
            currentWeatherCondition.innerHTML = 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/rainy-7.svg" alt="drizzle">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Rain")) {
            currentWeatherCondition.innerHTML = 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/rainy-6.svg" alt="rain">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Snow")) {
            currentWeatherCondition.innerHTML = 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/snowy-5.svg" alt="snow">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].main === "Thunderstorm")) {
            currentWeatherCondition.innerHTML = 
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/thunder.svg" alt="storm">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>`
          }

          if ((data2.current.weather[0].id >= 701) && (data2.current.weather[0].id <= 781)) {
            currentWeatherCondition.innerHTML =
            `<img class="current-weather-condition-img" src="amcharts_weather_icons_1.0.0/animated/wind-icon.svg" alt="wind">
            <h2 class="current-weather-condition-name">${data2.current.weather[0].main}</h2>` 
          }
      })
    })
    .catch((err) => {
      
      if (((document.querySelector('.error-msg-div')) == null)) {
        let errorMsgDiv = document.createElement("div");
        errorMsgDiv.classList.add("error-msg-div");
        inputContainer.appendChild(errorMsgDiv);
        document.querySelector('.error-msg-div').innerHTML = 
        `<p>Error, cannot find location</p>
        <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes" target="Wikipedia">For a list of proper country codes, click here</a>` 
      }
    })  
});

