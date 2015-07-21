var _  = require('lodash' ),
    xj = require("xls-to-json");

var obj = {

    data: null,

    init: function() {

        var config = require('./config/config.json');

        xj({
            input: "config/site.xls",  // input xls
            output: "output/site.json", // output json
            sheet: "Manufacture Pages"  // specific sheetname
        }, function(err, result) {

            if(err) {
                console.error(err);
            } else {

                _.forEach(result, function(data, key) {


                    console.log(data[config.fieldName[0]], data[config.fieldName[1]]);
                });
            }

        }.bind(this));

    }
};

obj.init();