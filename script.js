var sitecore = require('./lib/sitecore.js');

// Home directory
sitecore.readItem( '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}' );

// Web Template
//this.readItem( '{AB86861A-6030-46C5-B394-E8F99E8B87DB}' );

// Manufacture Template
//this.readItem( '{2987BF93-3CC5-4D01-91E7-2CD5B9553673}', {
//    payload: 'full'
//});

sitecore.query('/sitecore/Content/Hemstreet/*');
//this.query('/sitecore/content/Home/Products/Manufacturers/0 to 9/3M');

//this.createItem({
//    'name' : 'Script imported item',
//    'body' : {
//        'title' : 'Test Item',
//        'description' : 'Test importing an article'
//    }
//});

//// Import Manufacture Pages sheet from import/spreadsheets/site.xls
//this.importFromSpreadsheet('test.xls',
//    'Manufacture Pages',
//    [
//        "Title",
//        "Heading",
//        "Description"
//    ]
//);