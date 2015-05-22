#waze-travel-time

## Docs
Calculates the travel time between 2 addresses (up to a distance of 1000 miles).

## Usage

var crosstime = require("waze-travel-time");

crosstime.getCrossTime("London", "Manchester")
		 .then(function (timeInSeconds) {
			console.log(timeInSeconds); 
		 });