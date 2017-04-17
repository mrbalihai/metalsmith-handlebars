# metalsmith-handlebars
> A basic implimentation of handlebars for metalsmith

I made this plugin as an alternative to metalsmith-jstransformer so that the handlebars inline templating functionality can be leveraged. This means you can use handlebars like this:

##### `src/index.hbs`
```html
---
title: Home
---
{{#> main-layout }}
    {{#* inline "content-block" }}
        Hello, welcome to my metalsmith static site.
    {{/inline}}
{{/main-layout}}

```
##### `partials/main-layout.hbs`
```html
<html>
    <head>
    </head>
    <body>
        {{>content-block}}
    </body>
</html>

```

The plugin can be used in the metalsmith 'use' definition like this:
```js
const Metalsmith = require('metalsmith'),
      handlebars = require('metalsmith-handlebars');

Metalsmith(__dirname)
    .use(handlebars({
        partials: 'partials', // defaults to 'partials' in the root
        targetExtension: 'html' // defaults to html
    }))
    .build(function(err) {
        if (err) throw err;
        console.log('Build finished!');
    });
```
