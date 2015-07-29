***Sitecore importer is a work in progress***

Setup
===

*If items are not showing make sure they are published*

To start the script run: `node script.js`

`config/config.json`
```
{
  "baseUrl": "my-sitecore-site.com/-/item/v1/",
  "templatePath": "sitecore/templates/sample/Sample Item",
  "templateId": "{1111111-1111111-1111-1111-111111111}",
  "sc_itemid": "{1111111-1111111-1111-1111-111111111}",
  "baseMediaId": "{1111111-1111111-1111-1111-111111111}",
  "baseMediaPath": "/sitecore/media library",
  "database": "master",
  "path": "sitecore/content/home",
  "delayBetweenRequests": 250,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Scitemwebapi-Username": "extranet\\webapi",
    "X-Scitemwebapi-Password": "secretPassword"
  },
  "outputPath" : "import/output",
  "spreadsheetPath" : "import/spreadsheets",
  "mediaPath" : "import/media"
}
```

Examples
===
```
    // Home directory
    sitecore.readItem( '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}' );

    // Manufacture Template
    sitecore.readItem( '{2987BF93-3CC5-4D01-91E7-2CD5B9553673}', {
        payload: 'full'
    });

    sitecore.query('/sitecore/Content/Hemstreet/*');

    sitecore.createItem({
        'name' : 'Script imported item',
        'body' : {
            'title' : 'Test Item',
            'description' : 'Test importing an article'
        }
    });

    sitecore.updateItemById('{5B075E7C-7430-49B2-8DFC-9A55A93CBBED}', {
        'ManufacturerName': 'Dummy Name',
        'PageDescription': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. An eum discere ea mavis, quae cum plane perdidiceriti nihil sciat? Iubet igitur nos Pythius Apollo noscere nosmet ipsos. Suam denique cuique naturam esse ad vivendum ducem. Istam voluptatem perpetuam quis potest praestare sapienti? Idem adhuc; Id Sextilius factum negabat.'
    });
    
    // Import Manufacture Pages sheet from lib/import/spreadsheets/site.xls
    sitecore.importFromSpreadsheet('test.xls',
        'Manufacture Pages',
        [
            "Title",
            "Heading",
            "Description"
        ]
    );
```

Story
===

New Content ( v1 )

* Upload zip of images e.g. (2015.zip)
* config has base media folder to upload into ( pops off zip name and creates or upserts images for 2015.zip it would be , /media/events/2015/* )
* Zip contains images named like "{name of image}.jpg" like "Event One.jpg"
* After all images are uploaded, upload articles from csv, 
    * match main image to field in csv for main image location
    * serach description for {image name} without extension, swap out that string for `<img height="{image-y}" width="{image-x}" alt="{Name of Image}" src="~/media/{ID-Of-Image}.ashx" />`
    
Updating Content ( v2 )
* upload CSV
    * match title of article to post
    * Use that matched Id to get fields
    * swap out content with new content