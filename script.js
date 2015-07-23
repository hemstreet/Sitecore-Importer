var _    = require( 'lodash' ),
    xj   = require( "xls-to-json" ),
    curl = require( 'curlrequest' );

var http = require('http');
http.post = require('http-post');

var obj = {

    data : null,
    config : null,

    init : function ( config ) {

        var _config = require( './config/config.json' );

        this.config = _.assign( config || {}, _config );

        //{F1D3C2D3-43DF-4A14-B282-D51367207538}
        this.readItem('F1D3C2D3-43DF-4A14-B282-D51367207538');

        //
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

        //'url' : '/-/item/v1/' + this.config.path + '?name=' + data["Supplier Name"] + '&template=' + this.config.templatePath + '&sc_database=master'


        this.post({
            'url' : '/-/item/v1/' + obj.config.path + '?name=' + data["Supplier Name"] + '&template=' + obj.config.templatePath
        });

        //http://<host_name>

        //this.request({});

    },
    readItem : function (id) {
        this.request({
            'url' : '/-/item/v1/?sc_itemid={' + id + '}'
        });

    },
    updateItem : function () {

    },
    post: function(options) {

        var url = encodeURI(obj.config.baseUrl + options.url);


        console.log(url);

        //http.post(url, {
        //
        //}, function(res){
        //    //response.setEncoding('utf8');
        //    res.on('data', function(chunk) {
        //        console.log(chunk);
        //    });
        //});
    },
    request : function ( options ) {

        var url = encodeURI(obj.config.baseUrl + options.url);

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