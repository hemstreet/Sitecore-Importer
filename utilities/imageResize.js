var ImageResize = require( 'node-image-resize' ),
    fs          = require( 'fs' );

var resizer = {

    height : 1000,
    width : 500,
    size : 2 * 1000000, // 2MB
    destination : 'images/',

    init : function () {

        this.resize('./images/me.jpg', 'me.jpg' );

    },
    getImages : function () {


    },
    resize : function ( path, fileName ) {

        var image = new ImageResize( path );

        image.loaded.then( function () {

            image.smartResizeDown( {
                width : this.width,
                height : this.height
            } ).then( function () {
                image.stream( function ( err, stdout, stderr ) {
                    var writeStream = fs.createWriteStream( this.destination + fileName );
                    stdout.pipe( writeStream );
                }.bind( this ) );
            }.bind( this ) );
        }.bind( this ) );
    }
};

module.exports = resizer;