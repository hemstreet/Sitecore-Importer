***Sitecore importer is a work in progress***

How to run
===

To start the script run: node script.js

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