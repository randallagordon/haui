# haui ########################################################################

Haui, the "Home Automation UI"

Mainly just a placeholder for future goodness...but, it currently supports sending most X10 events via a CM11 interface and is configured via a simple JSON settings file.

WARNING: The X10 module being used has stability issues, at least with my own personal X10 interface...

## Install and Setup

```sh
$ npm install haui -g
$ haui ./path/to/settings-file.json
```

## Example Settings JSON

The `uri` property is optional, simply provided as a way to override what gets used in the HTML (Jade) view.

```json
{
  "x10": { "serialPath": "/dev/ttyUSB0" },
  "port": 8000,
  "host": "127.0.0.1",
  "uri": "http://127.0.0.1:8000",
  "buttons": [
    {
      "label": "Livingroom - Front - ON",
      "command": "ON",
      "house": "A",
      "unit": "1"
    },
    {
      "label": "Livingroom - Front - OFF",
      "command": "OFF",
      "house": "A",
      "unit": "1"
    },
    {
      "label": "Livingroom - Hall - ON",
      "command": "ON",
      "house": "A",
      "unit": "2"
    },
    {
      "label": "Livingroom - Hall - OFF",
      "command": "OFF",
      "house": "A",
      "unit": "2"
    }
  ]
}
```

## Screenshot

![Screenshot](https://github.com/randallagordon/haui/raw/master/img/readme-screenshot.png "Screenshot")

## CHANGELOG ######################################################################

### v0.0.2

 * Fix path resolution, add optional logging with 'good'

### v0.0.1

 * First release, sorely lacking in awesome...

## TODO ######################################################################

 * Leverage [node-lirc](https://github.com/alexbain/lirc_node) for home theater control
 * Create a non-crap UI

## LICENSE ####################################################################

MIT
