var requester = require("./requester");

function calculateCrosstime(fromGeoloc, toGeoloc, routingManager) {
    routingManager = routingManager || "row-RoutingManager";

    return requester.get({
        host: "www.waze.com",
        path: "/" + routingManager + "/routingRequest?from=x%3A" + fromGeoloc.lng + "+y%3A" + fromGeoloc.lat + "&to=x%3A" + toGeoloc.lng + "+y%3A" + toGeoloc.lat + "&at=0&returnJSON=true&returnGeometries=true&returnInstructions=true&timeout=60000&nPaths=1&options=AVOID_TRAILS%3At"
    }).then(function (response) {
        return calculate(response);
    });
}

function calculate(routingDetails) {
    var regExp = /"crossTime":(\d+)/g;
    var match = regExp.exec(routingDetails);
    
    var sum = 0;
    while (match != null) {
        sum += parseInt(match[1]);

        match = regExp.exec(routingDetails);
    }

    return sum;
}

exports.calculateCrosstime = calculateCrosstime;