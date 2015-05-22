var requester = require("./requester");

function getGeoLocation(locationReference) {
    return requester.get({
        host: "www.waze.com",
        path: "/maps/api/place/details/json?reference=" + encodeURIComponent(locationReference) + "&sensor=false&key=AIzaSyBIfV0EMXrTDjrvD92QX5bBiyFmBbT-W8E",
        json: true
    });
}

exports.getGeoLocation = getGeoLocation;