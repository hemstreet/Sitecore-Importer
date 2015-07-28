var _ = require('lodash'),
    glob = require('glob'),
    queryString = require('query-string'),
    Spreadsheet = require('./utilities/Spreadsheet.js'),
    Request = require('./utilities/Request.js'),
    FormData = require('form-data'),
    fs = require('fs');

var Sitecore = function (config) {

    this.data = null;
    this.config = null;
    this.spreadsheet = null;
    this.request = null;

    var _config = require('../config/config.json');

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

        //@TODO: Make this work
        //You can use the following values to define the scope:
        //     s for self — default if nothing is specified
        //     p for parent
        //     c for children

        //Examples:
        //    scope=p
        //    scope=c|p
        //    scope=s|p|c

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
    createMedia: function(options, callback) {

        var database = options.database || 'master',
            callback = callback ||  function() {},
            target   = options.target || this.config.mediaPath;

        var form = new FormData(),
            name = 'No-Name';

        // options is optional
        glob(options.path + "/*.*", function (error, files) {
            if(error) {
                console.log('Error', error);
                return;
            }

            if(files.length == 1) {
                var pieces = files[0].split('/'),
                    file = pieces[pieces.length - 1].split('.'),
                    fileName = file[0];

                name = fileName;
            }
            _.each(files, function(path, key) {

                var pieces = path.split('/'),
                    file = pieces[pieces.length - 1].split('.'),
                    fileName = file[0];


                form.append(fileName, fs.createReadStream(path));
            });

            console.log(form);

            this.post({
                url: this.config.baseUrl + '?name=' + name + '&sc_itemid=' + target + '&sc_database=' + database,
                headers: {
                    'Content-Type' : 'multipart/form-data'
                },
                body: form
            }, callback);

        }.bind(this));


    },
    post: function (options, callback) {

        options.method = "POST";
        this.request.request(options, callback);

    },
    get: function (options, callback) {

        options.method = "GET";
        this.request.request(options, callback);

    },
    put: function (options, callback) {

        options.method = "PUT";
        this.request.request(options, callback);

    },
    // Delete
    remove: function(options, callback) {
        //@TODO: Make this work ( Had to be remove because delete is a reserved word )
        options.method = "DELETE";
        //this.request.request(options, callback);

    },
    getPathForItem: function(id, callback) {
        this.readItem(id, null, function(data) {
            callback(data);
        });
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