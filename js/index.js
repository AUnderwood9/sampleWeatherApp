var weatherRequestObject = new XMLHttpRequest();

weatherRequestObject.onreadystatechange = function(){
	
	if(weatherRequestObject.readyState == 4 && weatherRequestObject.status == 200){
		var response = JSON.parse(weatherRequestObject.responseText);	
		
		displayForcastData(response.properties.periods);
	}	
}

function displayForcastData(forcastObject){
	var currentForcastDay = document.getElementById("current-day-forcast-text");
	var currentForcastTemperature = document.getElementById("current-temperature-display");
	var currentForcastMessage = document.getElementById("current-forcast-message-display");
	var nextForcastDay = document.getElementById("next-day-forcast-text");
	var nextForcastTemperature = document.getElementById("next-temperature-display");
	var nextForcastMessage = document.getElementById("next-forcast-message-display");
	var currentForcastIcon = document.createElement("img");
	var nextForcastIcon = document.createElement("img");
	var currentForcastDate = new Date(forcastObject[0].startTime);
	var nextForcastDate = new Date(forcastObject[1].startTime);
	var dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
	
	currentForcastDay.textContent = currentForcastDate.toLocaleDateString("en" , dateOptions);
	nextForcastDay.textContent = nextForcastDate.toLocaleDateString("en" , dateOptions);
	currentForcastIcon.src = forcastObject[0].icon;
	nextForcastIcon.src = forcastObject[1].icon;
	
	currentForcastTemperature.textContent = forcastObject[0].temperature + "\u00b0 " + forcastObject[0].temperatureUnit;
	currentForcastMessage.textContent = forcastObject[0].shortForecast;
	nextForcastTemperature.textContent = forcastObject[1].temperature + "\u00b0 " + forcastObject[1].temperatureUnit;
	nextForcastMessage.textContent = forcastObject[1].shortForecast;
	currentForcastMessage.append(currentForcastIcon);
	nextForcastMessage.append(nextForcastIcon);
}

weatherRequestObject.open("GET", "https://api.weather.gov/points/33.5186,-86.8104/forecast", true);
weatherRequestObject.send();