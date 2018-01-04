$(document).ready(function() {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function(json) {
      var data = json;
      $("#loading-icon").css("display", "none");
      $("#loading").css("display", "none");
      $("#location").html(data.name + ", " + data.sys.country);
      $("#temperature").html(Math.round(data.main.temp) + "°C");
      $("#weather-desc").html(data.weather[0].description);
      $("#converter").html('<span id="celsius">°C</span> | <span id="fahrenheit">°F</span>');
      switch (data.weather[0].main) {
        case "Snow":
          $("#weather-icon").html('<i class="wi wi-snow"></i>');
          $("#container").addClass("snowy");
          break;
        case "Clear":
          $("#weather-icon").html('<i class="wi wi-day-sunny"></i>');
          $("#container").addClass("sunny");
          break;
        case "Rain":
          $("#weather-icon").html('<i class="wi wi-rain"></i>');
          $("#container").addClass("rainy");
          break;
        case "Clouds":
          $("#weather-icon").html('<i class="wi wi-cloud"></i>');
          $("#container").addClass("cloudy");
          break;
        case "Thunderstorm":
          $("#weather-icon").html('<i class="wi wi-thunderstorm"></i>');
          $("#container").addClass("thunderstorm");
          break;
        case "Extreme":
          $("#weather-icon").html('<i class="wi wi-tornado"></i>');
          $("#container").addClass("extreme");
          break;
        default:
          break;
      }
      console.log(json)
      var celsius = true;
      $("#converter").on("click", function(){
        var tempF = Math.round(data.main.temp) * 1.8 + 32;
        if (celsius) {
          $("#temperature").html(tempF + "°F");
          $("#celsius").css("font-weight", "400");
          $("#fahrenheit").css("font-weight", "700");
          $("#celsius").css("opacity", "0.5");
          $("#fahrenheit").css("opacity", "1");
          celsius = false;
        } else if (!celsius) {
          $("#temperature").html(Math.round(data.main.temp) + "°C");
          $("#celsius").css("font-weight", "700");
          $("#fahrenheit").css("font-weight", "400");
          $("#celsius").css("opacity", "1");
          $("#fahrenheit").css("opacity", "0.5");
          celsius = true;
        }
      });
    });
  });    
  }
});

// https://openweathermap.org/weather-conditions