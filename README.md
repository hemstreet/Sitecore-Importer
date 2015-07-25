***Sitecore importer is a work in progress***

How to run
===

To start the script run: `node script.js`

Examples
===
```
    // Home directory
    sitecore.readItem( '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}' );

    // Web Template
    sitecore.readItem( '{AB86861A-6030-46C5-B394-E8F99E8B87DB}' );

    // Manufacture Template
    sitecore.readItem( '{2987BF93-3CC5-4D01-91E7-2CD5B9553673}', {
        payload: 'full'
    });

    sitecore.query('/sitecore/Content/Hemstreet/*');
    sitecore.query('/sitecore/content/Home/Products/Manufacturers/0 to 9/3M');

    sitecore.createItem({
        'name' : 'Script imported item',
        'body' : {
            'title' : 'Test Item',
            'description' : 'Test importing an article'
        }
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