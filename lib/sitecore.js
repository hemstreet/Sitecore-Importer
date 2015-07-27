var _ = require('lodash'),
    queryString = require('query-string'),
    request = require('request'),
    spreadsheet = require('./utilities/spreadsheet.js');

var sitecore = {

    data: null,
    config: null,

    init: function (config) {

        var _config = require('./config/config.json');

        this.config = _.assign(config || {}, _config);

        spreadsheet.init({
            sitecore: this
        }, this.config);

    },
    createItem: function (data) {

        var name = data.name || 'No Name',
            database = data.database || 'master',
            sc_itemid = data.sc_itemid || this.config.sc_itemid,
            template = data.template || this.config.template;

        this.post({
            'url': this.config.baseUrl + '?name=' + name + '&sc_itemid=' + sc_itemid + '&template=' + template + '&sc_database=' + database,
            'body': data.body
        });

    },
    /**
     * Retrieve item by id, can be any type of item ( page, media, etc...)
     * @param id
     */
    readItem: function (id, params, callback) {

        var query = null;

        if (params) {
            query = '?' + queryString.stringify(params) + '&sc_itemid=' + id;
        }

        this.get({
            'url': query || '?sc_itemid=' + id
        }, callback);

    },
    updateItem: function (options, data, callback) {

        var database = data.database || 'master';

        this.put({
            'url': this.config.baseUrl + '?sc_itemid=' + options.id + '&name=' + options.name + '&template=' + options.template + '&sc_database=' + database,
            'body': data
        });

    },
    query: function (path, callback) {

        this.get({
            'url': '?query=fast:' + path
        });

    },
    queryByName: function(path, name) {

        //You can use the following values to define the scope:
        //     s for self — default if nothing is specified
        //     p for parent
        //     c for children

        //Examples:
        //    scope=p
        //    scope=c|p
        //    scope=s|p|c

        // query=/sitecore/content/home//*[@@templatekey='sample item']
        // /sitecore/content/Home/*[@TITLE = 'Welcome to Sitecore']

        //https://qa.beta.arrow.com/-/item/v1/?query=/sitecore/content/Hemstreet/*%5B%40TITLE%20%3D%20%27Test%20title%27%5D
        //                                           /sitecore/Content/Hemstreet/*%5B@TITLE=Test%20title%5D
        //https://qa.beta.arrow.com/-/item/v1/?query=/sitecore/content/Hemstreet/*[@TITLE=Test title]

        var title = 'Test title',
            query = encodeURIComponent("[@TITLE = '" + title + "']").replace(/'/g, '%27');


        this.get({
            'url': '?query=' + path + query,
            'noEncode': true
        });
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
    get: function (options, callback) {

        options.method = "GET";
        this.request(options, callback);

    },
    put: function (options, callback) {

        options.method = "PUT";
        this.request(options, callback);

    },
    post: function (options, callback) {

        options.method = "POST";
        this.request(options, callback);

    },

    updateItemById: function (id, data) {
        this.readItem(id, null, function (response) {

            console.log(response);

            if (response.items.length > 1) {
                console.log('More than one item found, bail out!');
                return;
            }

            var item = response.items[0],
                options = {
                    'name': item.Name,
                    'template': item.TemplateId,
                    'id' : id
                };

            this.updateItem(options, data);

        }.bind(this));
    },
    importFromSpreadsheet: function (path, sheetName, fields, target) {
        spreadsheet.importFromSpreadsheet(path, sheetName, fields, target);
    }
    // findById(id)
    // findByName(name)
    // updateById(id)
    // updateByName(name)
    // getTemplateByKey(key)
    // getTemplateByName(name)
    // alphabetizeByField(field, array)
    // getFieldKeyByName(name, template)
    // getFieldsByTemplateId
    // getFieldsByTemplateName
    // createFolder(name)
    // deleteById(id)
    // deleteByName(name)
    // importFromSpreadsheet(path)
    // updateFromSpreadsheet(path)
    // generateTemplateFieldSchema(id)

};

sitecore.init();

module.exports = sitecore;