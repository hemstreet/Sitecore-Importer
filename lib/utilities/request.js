var request = require('request');

var _request = {
    config: null,
    sitecore: null,
    init: function (options, config) {

        this.config = config;

        this.sitecore = options.sitecore;

    },
    request: function(_options, callback) {

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

            var data = JSON.parse(body);

            if (error) {
                console.log('Error:', error);
                return;
            }
            else if(data.statusCode !== 200) {
                console.log(data.error)
                return;
            }

            console.log('data', data.result);

            if (callback) {
                callback(data.result);
            }

        });

    },
}

module.exports = _request;