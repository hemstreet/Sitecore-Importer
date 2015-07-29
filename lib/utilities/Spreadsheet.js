var _ = require('lodash'),
    xj = require("xls-to-json");

var Spreadsheet = function (options, config) {

    this.sitecore = options.sitecore;

    this.config = config;

    this.tool = options.tool;
};

Spreadsheet.prototype = {
    config: null,
    sitecore: null,
    tool: null,
    importFromSpreadsheet: function (path, sheetName, fields, target) {

        var details = this.getSheetDetails(path, sheetName, target);

        xj(details.config,
            function (err, result) {

                if (err) {
                    console.error(err);
                } else {

                    console.log('Import target:', details.target);

                    _.forEach(result, function (data, key) {

                        if (result[key][fields[0]] == '') {
                            return;
                        }

                        setTimeout(function () {


                            this.sitecore.createItem({
                                'name': result[key][fields[0]],
                                'body': {
                                    'Title': result[key][fields[0]],
                                    'ManufacturerName': result[key][fields[0]],
                                    'PageDescription': result[key][fields[2]]
                                },
                                'sc_item': details.target
                            }, function(data) {
                                console.log(data);
                            });


                        }.bind(this), key * this.config.delayBetweenRequests);

                    }.bind(this));
                }

            }.bind(this));
    },
    importFromSpreadsheetWithMedia: function (path, sheetName, fields, target, mediaPath) {

        var details = this.getSheetDetails(path, sheetName, target),
            mediaPath = mediaPath || this.config.baseMediaPath;

        xj(details.config,
            function (err, result) {

                if (err) {
                    console.error(err);
                } else {

                    console.log('Import target:', details.target);

                    // Get all media files files
                    this.sitecore.query(mediaPath + '/*', function(_data) {
                        var mediaItems = _data.items;

                        _.forEach(result, function (data, key) {

                            if (result[key][fields[0]] == '') {
                                return;
                            }

                            var content = data["Description"];

                            // late night coding :(
                            var match = this.tool.getInnerContents(content);

                            if(match) {
                                _.forEach(mediaItems, function(media, key) {
                                    if(media.DisplayName == match[1]) {
                                        content = this.tool.changeNameToImage(content, media.ID);
                                    }
                                }.bind(this));
                            }



                            this.sitecore.createItem({
                                'name': result[key][fields[0]],
                                'body': {
                                    'Title': result[key][fields[0]],
                                    'ManufacturerName': result[key][fields[0]],
                                    'PageDescription': result[key][fields[2]]
                                },
                                'sc_item': details.target
                            }, function(newItem) {


                                console.log(newItem);

                            });


                        }.bind(this));

                    }.bind(this));

                }

            }.bind(this));
    },
    updateFromSpreadSheet: function(options, config) {

        var details = this.getSheetDetails(options.path, options.sheetName);

        this.sitecore.query(options.destinationPath + '/*', function(items) {

            var items = items.items;

            xj(details.config,
                function (err, result) {

                    if (err) {
                        console.error(err);
                    } else {

                        console.log('Import target:', details.target);

                        _.forEach(result, function (data, key) {

                            if (result[key]["Title"] == '') {
                                return;
                            }

                            _.forEach(items, function (_data, _key) {
                                if(items[_key]["DisplayName"] === result[key]["Title"]) {

                                    // need to pass data through and pass it into updateItemById
                                    // shift result[key] out of updated list. at end check for remaining items, console.log any remainders

                                    //this.sitecore.updateItemById(items[_key]["DisplayName"]["ID"], {
                                    //
                                    //});

                                    console.log('Match Found!', items[_key]);

                                }
                            }.bind(this));

                            //setTimeout(function () {
                            //
                            //
                            //    this.sitecore.createItem({
                            //        'name': result[key][fields[0]],
                            //        'body': {
                            //            'Title': result[key][fields[0]],
                            //            'ManufacturerName': result[key][fields[0]],
                            //            'PageDescription': result[key][fields[2]]
                            //        },
                            //        'sc_item': details.target
                            //    });
                            //
                            //}.bind(this), key * this.config.delayBetweenRequests);


                        }.bind(this));
                    }

                }.bind(this));

        });

    },
    getSheetDetails: function(path, sheetName, target) {

        var pieces = path.split('/'),
            fileName = pieces[pieces.length - 1],
            name = fileName.split('.')[0],
            details = {
            pieces : pieces,
            fileName : pieces[pieces.length - 1],
            name : name,
            extension : fileName.split('.')[1],
            target : target || this.config.sc_itemid,
            config : {
                input: this.config.spreadsheetPath + '/' + path,
                output: this.config.outputPath + "/" + name + '.json',
                sheet: sheetName || 'Sheet 1',
            }
        }

        return details;

    }
}

module.exports = Spreadsheet;