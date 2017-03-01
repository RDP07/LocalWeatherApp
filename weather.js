$(document).ready(function() {
  var getIP = "http://ipinfo.io/json?";
  var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather?';
  var apiKey = "&appid=72f9ca665b6ae4484291de94c1486b6b";
  var units = "&units=metric";

  var loc = {};
  var city = {};
  var country = {};

  $.ajax({
    url: getIP,
    async: false,
    dataType: 'json',
    success: function(data) {
      state = data.region;
      city = data.city;
      loc = data.loc;
    }
  });
  var split = loc.split(",");
  var lat = "lat=" + split[0];
  var lon = "&lon=" + split[1];
  var weatherURL = openWeatherMap + lat + lon + apiKey + units;
  $("#loc").html(city + ", " + region);

  var description = {};
  var celcius = {};
  var icon = {};
  var code = {};

  $.ajax({
    url: weatherURL,
    async: false,
    dataType: 'json',
    success: function(w) {
      celcius = w.main.temp;
      description = w.weather[0].description;
      icon = '<img id="icon" src="https://openweathermap.org/img/w/' + w.weather[0].icon + '.png"/>';
      code = w.weather[0].id;
    }
  });

  $('#cel').html(Math.floor(celcius) + '&degC');
  $('#icon').html(icon);
  $('#weather').html(description);

  var far = function() {
    return Math.round((celcius * 9) / 5 + 32) + '&degF';
  };

  //hides F and sets button to toggle to show F when C is hidden in vice versa
  $("#far").html(far);
  $('#cel').hide();
  $("#convert").click(function() {
    $('#far').toggle();
    $('#cel').toggle();
  });

  if (code >= 800 && code <= 801) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/clear.jpg) no-repeat center bottom / cover fixed');
  } else if (code >= 802 && code <= 804) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/cloudy.jpg) no-repeat center bottom / cover fixed');
  } else if (code >= 500 && code <= 531) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/rain.jpg) no-repeat center center / cover fixed');
  } else if (code >= 200 && code <= 232) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/thunderstorm.jpg) no-repeat center bottom / cover fixed');
  } else if (code >= 600 && code <= 622) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/snow.jpg) no-repeat center bottom / cover fixed');
  } else if (code >= 701 && code <= 741) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/mist.jpg) no-repeat center bottom / cover fixed');
  } else if (code >= 300 && code <= 321) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/drizzle.jpg) no-repeat center bottom / cover fixed');
  } else if (code >= 952 && code <= 956) {
    $('body').css('background', 'url(https://s3.amazonaws.com/rossweather/wind.jpg) no-repeat center bottom / cover fixed');
  }

});