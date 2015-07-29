var _       = require( 'lodash' );

var Tools = function ( options, config ) {

    this.sitecore = options.sitecore;

    this.config = config;

};

Tools.prototype = {
    config : null,
    sitecore : null,
    getInnerContents: function(data, pattern) {

        pattern = pattern || /{{(.*?)}}/i;

        var arr = data.match( pattern );

        return arr || null;

    },
    changeNameToImage: function(data, id, pattern) {

        var arr = this.getInnerContents(data),
            imgTag = '<img title="' + arr[1] + '" src="~/media/' + id + '.ashx"/>';

        var replaced = data.replace(arr[0], imgTag );

        return replaced;
    }
}

module.exports = Tools;
