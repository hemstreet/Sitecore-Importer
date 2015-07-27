var Sitecore = require('./lib/sitecore.js');

var sitecore = new Sitecore();

// Home directory
sitecore.readItem( '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}' );

// Web Template
//sitecore.readItem( '{AB86861A-6030-46C5-B394-E8F99E8B87DB}' );

// Manufacture Template
//this.readItem( '{2987BF93-3CC5-4D01-91E7-2CD5B9553673}', {
//    payload: 'full'
//});

//sitecore.query('/sitecore/Content/Hemstreet/*');
//sitecore.query('/sitecore/content/Home/Products/Manufacturers/0 to 9/3M');

//sitecore.queryByName('/sitecore/Content/Hemstreet/*', 'Test title');

//this.createItem({
//    'name' : 'Script imported item',
//    'body' : {
//        'title' : 'Test Item',
//        'description' : 'Test importing an article'
//    }
//});

// Import Manufacture Pages sheet from import/spreadsheets/site.xls
//sitecore.importFromSpreadsheet('test.xls',
//    'Manufacture Pages',
//    [
//        "Title",
//        "Heading",
//        "Description"
//    ]
//);

//sitecore.updateItemById('{5B075E7C-7430-49B2-8DFC-9A55A93CBBED}', {
//    'ManufacturerName': 'Dummy Name',
//    'PageDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. An eum discere ea mavis, quae cum plane perdidiceriti nihil sciat? Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Suam denique cuique naturam esse ad vivendum ducem. Istam voluptatem perpetuam quis potest praestare sapienti? Idem adhuc; Id Sextilius factum negabat.'
//});