var requester = require("./requester");

function getAutoCompleteOptions(address) {
    return requester.get({
        host: "www.waze.com",
        path: "/maps/api/place/autocomplete/json?input=" + encodeURIComponent(address) + "&sensor=false&key=AIzaSyBIfV0EMXrTDjrvD92QX5bBiyFmBbT-W8E",
        json: true
    }).then(function (response) {
        return response.predictions;
    });
}

exports.getAutoCompleteOptions = getAutoCompleteOptions;