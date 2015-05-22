var crosstime = require("./crosstimeFetcher");

crosstime.getCrossTime("Hertzeliya", "Tel Aviv").then(function (time) {
    console.log(time);
});