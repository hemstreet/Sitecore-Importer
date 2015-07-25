***Sitecore importer is a work in progress***

How to run
===

To start the script run: `node script.js`

Setup
==
* [http://devdocs.io/lodash/](http://devdocs.io/lodash/) 
* [https://lodash.com/docs](https://lodash.com/docs)
* [https://sdn.sitecore.net/upload/sdn5/modules/sitecore%20item%20web%20api/sitecore_item_web_api_developer_guide_sc65-66-usletter.pdf](https://sdn.sitecore.net/upload/sdn5/modules/sitecore%20item%20web%20api/sitecore_item_web_api_developer_guide_sc65-66-usletter.pdf)

Upload media, get id and filepath.

Inserting Images into articles
====

```
<img height="1667" alt="Image Title" width="2500" src="~/media/{123-345-6789-101112}.ashx" />
```

Inserting Main images into articles
====

insert file path into main image field
```
/Images/Social/Connector/Facebook
```

===
```
/{image name}
```

Reading items by id
===
```
this.readItem('{123-345-6789-101112}');
```

Query support
===

```
this.query('/sitecore/content/*');
```

Run tests
===
Install mocha
`npm install -g mocha`

run tests
`mocha`


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


Examples
===
```
    // Home directory
    this.readItem( '{110D559F-DEA5-42EA-9C1C-8A5DF7E70EF9}' );

    // Web Template
    this.readItem( '{AB86861A-6030-46C5-B394-E8F99E8B87DB}' );

    // Manufacture Template
    this.readItem( '{2987BF93-3CC5-4D01-91E7-2CD5B9553673}', {
        payload: 'full'
    });

    this.query('/sitecore/Content/Hemstreet/*');
    this.query('/sitecore/content/Home/Products/Manufacturers/0 to 9/3M');

    this.createItem({
        'name' : 'Script imported item',
        'body' : {
            'title' : 'Test Item',
            'description' : 'Test importing an article'
        }
    });

    // Import Manufacture Pages sheet from import/spreadsheets/site.xls
    this.importFromSpreadsheet('test.xls',
        'Manufacture Pages',
        [
            "Title",
            "Heading",
            "Description"
        ]
    );
```