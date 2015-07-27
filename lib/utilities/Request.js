var request = require('request');

var Request = function (options, config) {

    this.sitecore = options.sitecore;

    this.config = config;

};

Request.prototype = {
    config: null,
    sitecore: null,
    request: function(_options, callback) {

        var callback = callback || function () {};

        var options = {
            url: _options.url,
            method: _options.method,
            headers: this.config.headers,
        }

        if(options.method == "POST" || options.method == "PUT") {
            options.form = _options.body;
        }
        else if(options.method == "GET") {

            options.url = (!_options.noEncode) ? encodeURI(this.config.baseUrl + options.url) : this.config.baseUrl + options.url;
        }

        // Start the request
        request(options, function (error, response, body) {

            if (error) {
                console.log('Error:', error);
                return;
            }

            var data = JSON.parse(body) || {};

            if(data.statusCode !== 200) {
                console.log(data.error)
                return;
            }

            console.log('data', data.result);


            callback(data.result);

        });

    },
}

module.exports = Request;