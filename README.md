# Link Button Block for Editor.js
Allows to add a customizable link-button with the caption 

## Preview
![Preview image](https://github.com/VolgaIgor/editorjs-link-button/raw/main/asset/screenshot.png)

## Installation
### Install via NPM
Get the package

```shell
$ npm i editorjs-link-button
```

Include module at your application

```javascript
import LinkButton from 'editorjs-link-button';
```

### Load from CDN

You can load a specific version of the package from jsDelivr CDN.

Require this script on a page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/editorjs-link-button"></script>
```

### Download to your project's source dir
1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Usage
```javascript
var editor = EditorJS({
  // ...
  tools: {
    // ...
    linkButton: LinkButton
  },
  // ...
});
```

## Config Params
You can add custom color tunes or disabled it
```javascript
new Editorjs({
  // ...
  tools: {
    linkButton: {
        class: LinkButton,
        config: {
            colors: [
                {
                    name: 'tune1',
                    icon: 'Tune1',
                    title: 'Tune1',
                },
                {
                    name: 'tune2',
                    icon: 'Tune2',
                    title: 'Tune2',
                }
            ]
        }
    },
  },
})
```

## Output data
```json
{
    "type" : "linkButton",
    "data" : {
        "url" : "https://example.com",
        "caption" : "Button caption",
        "color" : "blue"
    }
}
```