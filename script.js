var _    = require( 'lodash' ),
    xj   = require( "xls-to-json" ),
    curl = require( 'curlrequest' );

var obj = {

    data : null,
    config : null,

    init : function ( config ) {

        var _config = require( './config/config.json' );

        this.config = _.assign( config || {}, _config );

        xj( {
            input : "config/site.xls",  // input xls
            output : "output/site.json", // output json
            sheet : "Manufacture Pages"  // specific sheetname
        }, function ( err, result ) {

            if ( err ) {
                console.error( err );
            } else {

                _.forEach( result, function ( data, key ) {

                    //console.log( this.config.fieldNames );

                    setTimeout( function () {
                        //curl.request({ url: 'http://google.com', pretend: true }, function (err, stdout, meta) {
                        //    console.log('%s %s', meta.cmd, meta.args.join(' '));
                        //});
                        this.createItem( data );
                    }.bind( this ), key * this.config.delayBetweenRequests )

                }.bind( this ) );
            }

        }.bind( this ) );

    },
    createItem : function ( data ) {

        console.log( data );
        //this.request({});

    },
    readItem : function () {

    },
    updateItem : function () {

    },
    request : function ( options ) {

        curl.request( {
            url : obj.config.baseUrl
        }, function ( err, stdout, meta ) {
            console.log( '%s %s', meta.cmd, meta.args.join( ' ' ) );
        } );
    }
};

obj.init();