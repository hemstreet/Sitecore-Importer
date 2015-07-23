var _    = require( 'lodash' ),
    xj   = require( "xls-to-json" ),
    curl = require( 'curlrequest' );

var http = require('http');
http.post = require('http-post');

var unirest = require('unirest');

var obj = {

    data : null,
    config : null,

    init : function ( config ) {

        var _config = require( './config/config.json' );

        this.config = _.assign( config || {}, _config );

        //this.readItem('F1D3C2D3-43DF-4A14-B282-D51367207538');

        this.query('/sitecore/content/*');

        //this.createItem({
        //    'template' : obj.config.templateId,
        //    'name' : 'Test Template'
        //});

        xj( {
            input : "config/site.xls",  // input xls
            output : "output/site.json", // output json
            sheet : "Manufacture Pages"  // specific sheetname
        }, function ( err, result ) {

            if ( err ) {
                console.error( err );
            } else {

                //this.createItem(result[0]);

                //_.forEach( result, function ( data, key ) {
                //
                //    //console.log( this.config.fieldNames );
                //
                //    setTimeout( function () {
                //        //curl.request({ url: 'http://google.com', pretend: true }, function (err, stdout, meta) {
                //        //    console.log('%s %s', meta.cmd, meta.args.join(' '));
                //        //});
                //        this.createItem( data );
                //    }.bind( this ), key * this.config.delayBetweenRequests )
                //
                //}.bind( this ) );
            }

        }.bind( this ) );

    },
    createItem : function ( data ) {

        //console.log( data );
        //'template' : 'F1D3C2D3-43DF-4A14-B282-D51367207538',
        //    'name' : 'Test Template'
        //
        //data.template,


        //'url' : '/-/item/v1/' + this.config.path + '?name=' + data["Supplier Name"] + '&template=' + this.config.templatePath + '&sc_database=master'

        //this.post({
        //    'url' : '/-/item/v1/' + obj.config.path + '?name=' + data.name + '&template=' + obj.config.templateId,
        //});

        this.post({
            'url' : obj.config.path,
            'data' : {
                'name' : data.name,
                'template' : obj.config.templateId
            }
        });

        //http://<host_name>

        //this.request({});

    },
    /**
     * Retrieve item by id, can be any type of item ( page, media, etc...)
     * @param id
     */
    readItem : function (id) {

        this.request({
            'url' : '?sc_itemid={' + id + '}'
        });

    },
    updateItem : function () {

    },
    query: function(path) {
        this.request({
            'url' : '?query=fast:' + path
        });
    },

    post: function(options) {

        // Fields can be updated from field name or by field id



        var url = encodeURI(obj.config.baseUrl + options.url);

        //console.log(url);
        //
        //http.post(url, {
        //
        //}, function(res){
        //    response.setEncoding('utf8');
        //    res.on('data', function(chunk) {
        //        console.log(chunk);
        //    });
        //});

        unirest.post(url)
            .header('Content-Type', 'application/x-www-form-urlencoded')
            .send(options.data)
            .end(function (response) {
                console.log(response.body);
            });


        //var post_data = querystring.stringify(options.data);
        //
        //var post_options = {
        //    host: obj.config.baseUrl,
        //    port: '80',
        //    path: options.url,
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded',
        //        'Content-Length': post_data.length
        //    }
        //};
        //
        //// Set up the request
        //var post_req = http.request(post_options, function(res) {
        //    res.setEncoding('utf8');
        //    res.on('data', function (chunk) {
        //        console.log('Response: ' + chunk);
        //    });
        //});
        //
        //// post the data
        //post_req.write(post_data);
        //post_req.end();

    },
    request : function ( options ) {

        var url = encodeURI(obj.config.baseUrl + options.url);

        console.log(url);

        curl.request( {
            url : url
        }, function ( err, data, meta ) {
            if(err) {
                console.log('Error:', err);
                return;
            }

            var json = JSON.parse(data ).result;

            console.log(json);
            //console.log(json.items[0 ].Fields);


        } );
    }
};

obj.init();