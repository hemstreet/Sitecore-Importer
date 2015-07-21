var _  = require('lodash' ),
    xj = require("xls-to-json");

var obj = {

    data: null,

    init: function(config) {

        var config = _.assign( config, {
            "test": true
        });

        xj({
            input: "config/site.xls",  // input xls
            output: "output/site.json", // output json
            sheet: "Manufacture Pages"  // specific sheetname
        }, function(err, result) {

            if(err) {
                console.error(err);
            } else {

                _.forEach(result, function(data, key) {

                    console.log(data["Supplier Name"], data["Description"]);
                });
            }

        }.bind(this));

    }
};

//curl -d "" -X POST http://trainingarrow.cloudapp.net/-/item/v1/sitecore/Content/Home/Arrow%20Training?name=TestItem&template=Sample/SampleItem&sc_database=master

obj.init({});