var _ = require('lodash'),
    xj = require("xls-to-json"),
    requestify = require('requestify');

var obj = {

    data: null,
    config: null,

    init: function (config) {

        var _config = require('./config/config.json');

        this.config = _.assign(config || {}, _config);

        // Home directory
        //this.readItem( '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}' );

        // Web Template
        //this.readItem( '{AB86861A-6030-46C5-B394-E8F99E8B87DB}' );

        //this.query('/sitecore/Content/Hemstreet/*');
        //this.query('/sitecore/content/Home/Products/Manufacturers/0 to 9/3M');

        //this.createItem({
        //    'name' : 'Script imported item',
        //    'body' : {
        //        'title' : 'Test Item',
        //        'description' : 'Test importing an article'
        //    }
        //});

        // Import Manufacture Pages sheet from config/site.xls
        this.importFromSpreadsheet('config/site.xls',
            'Manufacture Pages',
            [
                "Supplier Name",
                "Description"
            ]
        );

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
    readItem: function (id) {

        this.request({
            'url': '?sc_itemid=' + id + '&'
        });

    },
    query: function (path) {

        return this.request({
            'url': '?query=fast:' + path
        });

    },

    post: function (options) {

        requestify.request(options.url, {
            method: 'POST',
            headers: this.config.headers,
            body: options.body
        }).then(function(response) {

            console.log(response);
            var data = response.getBody();

            console.log(data);

        });

    },
    request: function (options) {

        var url = encodeURI(this.config.baseUrl + options.url);

        requestify.get(url, {
            headers: this.config.headers
        }).then(function(response) {

            var data = response.getBody().result;

            console.log(data)

        });

    },
    importFromSpreadsheet: function(path, sheetName, fields, target) {

        var pieces = path.split('/'),
            fileName   = pieces[pieces.length - 1],
            name = fileName.split('.')[0],
            extension = fileName.split('.')[1],
            target = target || this.config.sc_itemid,
            config = {
                input: path,
                output: this.config.outputPath + "/" + name + '.json'
            };

        if(sheetName) {
            config.sheet = sheetName;
        }

        xj(config,
            function (err, result) {

                if (err) {
                    console.error(err);
                } else {

                    _.forEach( result, function ( data, key ) {

                        setTimeout( function () {

                            this.createItem({
                                'name' : result[key][fields[0]],
                                'body' : {
                                    'title' : result[key][fields[0]],
                                    'description' : result[key][fields[1]]
                                },
                                'sc_item': target
                            });

                        }.bind( this ), key * this.config.delayBetweenRequests )

                    }.bind( this ) );
                }

            }.bind(this));
    },
    // findById(id)
    // findByName(name)
    // updateById(id)
    // updateByName(name)
    // getTemplateByKey(key)
    // getTemplateByName(name)
    // alphabetizeByField(field, array)
    // getFieldKeyByName(name, template)
    // createFolder(name)
        // deleteById(id)
        // deleteByName(name)
};

obj.init();