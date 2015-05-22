var Q = require("q");
var autocomplete = require("./autocomplete.js");
var geolocation = require('./geolocation.js');
var crosstimeCalc = require('./crosstimeCalc.js');

function getCrossTime(from, to) {
    return Q
    .all([autocomplete.getAutoCompleteOptions(from),
           autocomplete.getAutoCompleteOptions(to)])
    .then(function (predictions) {
        return [geolocation.getGeoLocation(predictions[0][0].reference),
                geolocation.getGeoLocation(predictions[1][0].reference)];
    })
    .spread(function (fromGeoloc, toGeoloc) {
        var fromLoc = fromGeoloc.result.geometry.location;
        var toLoc = toGeoloc.result.geometry.location;
        var routingManager = getRoutingManagerName(fromGeoloc);
        return crosstimeCalc.calculateCrosstime(fromLoc, toLoc, routingManager);
    });
}

function getRoutingManagerName(geoloc) {
    var country = geoloc.result["address_components"][1]["short_name"];

    switch (country) {
        case "IL":
            return "il-RoutingManager";
        case "US":
            return "RoutingManager";
        default:
            return "row-RoutingManager";
    }
}

exports.getCrossTime = getCrossTime;