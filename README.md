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

```json
{
  "x10": { "serialPath": "/dev/ttyUSB0" },
  "port": 8000,
  "host": "127.0.0.1",
  "buttons": [
    {
      "type": "x10",
      "label": "Livingroom - Front - ON",
      "command": "ON",
      "house": "A",
      "unit": "1"
    },
    {
      "type": "x10",
      "label": "Livingroom - Front - OFF",
      "command": "OFF",
      "house": "A",
      "unit": "1"
    },
    {
      "type": "x10",
      "label": "Livingroom - Hall - ON",
      "command": "ON",
      "house": "A",
      "unit": "2"
    },
    {
      "type": "x10",
      "label": "Livingroom - Hall - OFF",
      "command": "OFF",
      "house": "A",
      "unit": "2"
    },
    {
      "type": "lirc",
      "label": "Kenwood - Power",
      "command": "send_once",
      "device": "Kenwood",
      "button": "Power"
    },
    {
      "type": "lirc",
      "label": "Kenwood - Volume Up",
      "command": "send_once",
      "device": "Kenwood",
      "button": "Volume_Up"
    },
    {
      "type": "lirc",
      "label": "Kenwood - Volume Down",
      "command": "send_once",
      "device": "Kenwood",
      "button": "Volume_Down"
    }
  ]
}
```

## Screenshot

![Screenshot](https://github.com/randallagordon/haui/raw/master/img/readme-screenshot.png "Screenshot")

## CHANGELOG ######################################################################

### v0.0.3

 * LIRC support via [lirc_node](https://github.com/alexbain/lirc_node)

### v0.0.2

 * Fix path resolution, add optional logging with 'good'

### v0.0.1

 * First release, sorely lacking in awesome...

## TODO ######################################################################

 * Create a non-crap UI
 * Break out device support into HAPI plugins

## LICENSE ####################################################################

MIT
