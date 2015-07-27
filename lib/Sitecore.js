var _ = require('lodash'),
    queryString = require('query-string'),
    Spreadsheet = require('./utilities/Spreadsheet.js'),
    Request = require('./utilities/Request.js');

var Sitecore = function (config) {

    this.data = null;
    this.config = null;
    this.spreadsheet = null;
    this.request = null;

    var _config = require('./config/config.json');

    this.config = _.assign(config || {}, _config);

    this.spreadsheet = new Spreadsheet({
            sitecore: this
        },
        this.config
    );

    this.request = new Request({
            sitecore: this
        },
        this.config
    );

};

Sitecore.prototype = {

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
        }, callback);

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
    updateItemById: function (id, data) {
        this.readItem(id, null, function (response) {

            if (response.items.length > 1) {
                console.log('More than one item found, bail out!');
                return;
            }

            var item = response.items[0],
                options = {
                    'name': item.Name,
                    'template': item.TemplateId,
                    'id': id
                };

            this.updateItem(options, data);

        }.bind(this));
    },
    get: function (options, callback) {

        options.method = "GET";
        this.request.request(options, callback);

    },
    put: function (options, callback) {

        options.method = "PUT";
        this.request.request(options, callback);

    },
    post: function (options, callback) {

        options.method = "POST";
        this.request.request(options, callback);

    },
    importFromSpreadsheet: function (path, sheetName, fields, target) {
        this.spreadsheet.importFromSpreadsheet(path, sheetName, fields, target);
    },
    updateFromSpreadSheet: function (options, config) {

        this.spreadsheet.updateFromSpreadSheet(options, config);
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

module.exports = Sitecore;