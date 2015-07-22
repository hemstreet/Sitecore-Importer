var _       = require( 'lodash' ),
    xj      = require( "xls-to-json" ),
    curl    = require('curlrequest');

var obj = {

    data : null,

    init : function ( config ) {

        var config = _.assign( config, {
            "test" : true
        } );

        xj( {
            input : "config/site.xls",  // input xls
            output : "output/site.json", // output json
            sheet : "Manufacture Pages"  // specific sheetname
        }, function ( err, result ) {

            if ( err ) {
                console.error( err );
            } else {

                _.forEach( result, function ( data, key ) {

                    console.log( data[ "Supplier Name" ], data[ "Description" ] );

                    // Make request to sitecore
                    curl.request({ url: 'http://eample.com', pretend: true }, function (err, stdout, meta) {
                        console.log('%s %s', meta.cmd, meta.args.join(' '));
                    });

                } );
            }

        }.bind( this ) );

    }
};

obj.init( {} );

