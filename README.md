How to run
===

To start the script run: node script.js

Setup
==
[http://devdocs.io/lodash/](http://devdocs.io/lodash/) [https://lodash.com/docs](https://lodash.com/docs)


Upload media, get id and filepath.

Inserting Images into articles
====
```<img height="1667" alt="Image Title" width="2500" src="~/media/{123-345-6789-101112}.ashx" />```

Inserting Main images into articles
====
insert file path into main image field
```/Images/Social/Connector/Facebook```
Base Path 
```/{image name}```


Reading items by id
this.readItem('123-345-6789-101112');

Query
this.query('/sitecore/content/*');