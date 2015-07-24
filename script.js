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

        this.createItem({
            'name' : 'Script imported item',
            'body' : {
                'title' : 'Test Item',
                'description' : 'Test importing an article'
            }
        });

        //xj({
        //    input: "config/site.xls",  // input xls
        //    output: "output/site.json", // output json
        //    sheet: "Manufacture Pages"  // specific sheetname
        //}, function (err, result) {
        //
        //    if (err) {
        //        console.error(err);
        //    } else {
        //
        //        //this.createItem(result[0]);
        //
        //        //_.forEach( result, function ( data, key ) {
        //        //
        //        //    //console.log( this.config.fieldNames );
        //        //
        //        //    setTimeout( function () {
        //        //        //curl.request({ url: 'http://google.com', pretend: true }, function (err, stdout, meta) {
        //        //        //    console.log('%s %s', meta.cmd, meta.args.join(' '));
        //        //        //});
        //        //        this.createItem( data );
        //        //    }.bind( this ), key * this.config.delayBetweenRequests )
        //        //
        //        //}.bind( this ) );
        //    }
        //
        //}.bind(this));

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
    updateItem: function () {

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
            body: options.body,
        }).then(function(response) {

            console.log(response);
            var data = response.getBody().result;

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
    createFolder: function() {

    }
};

obj.init();