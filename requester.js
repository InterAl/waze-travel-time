var http = require("https");
var concat = require("concat-stream");
var Q = require("q");

exports.get = function get(requestOptions) {
    var deferred = Q.defer();
    
    http.get(requestOptions, function (res) {
        if (res.statusCode === 200) {
            res.setEncoding("utf8");
            
            var concatStream = concat(function gotBody(body) {
                var response = requestOptions.json ? JSON.parse(body) : body;
                deferred.resolve(response);
            });
            
            res.pipe(concatStream);
        } else {
            deferred.reject(res);
        }
    });
    
    return deferred.promise;
};