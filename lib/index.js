"use strict";

var Hapi = require("hapi"),
    x10 = require("x10"),
    lirc = require("lirc_node"),
    path = require("path"),
    optsFile = path.resolve(process.argv[2] || __dirname + "/../settings"),
    opts = require(optsFile);

var server = Hapi.createServer(opts.host || "0.0.0.0", parseInt(process.env.PORT, 10) || opts.port || 8000, {
  views: {
    engines: { jade: "jade" },
    path: path.resolve(__dirname + "/../views"),
    isCached: false,
  },
});

var indexHandler = function (request, reply) {
  delete require.cache[optsFile];
  opts = require(optsFile);

  reply.view("index", opts);
};

var x10Handler = function (request, reply) {
  var address = {
    house: x10.HOUSE[request.params.house],
    unit: x10.UNIT["UNIT_" + request.params.unit]
  };

  var cm11 = new x10.CM11(opts.x10);

  cm11.on("open", function () {
    cm11.sendCommand(address, x10.FUNCTION[request.params.command], function(err) {
      if (err) { return console.log(err); }
    });
  });

  reply(address);
};

var lircHandler = function (request, reply) {
  var command = request.params.command,
      device = request.params.device,
      button = request.params.button;

  lirc.irsend[command](device, button, function () {});

  reply({
    command: command,
    device: device,
    button: button
  });
};

if (opts.good) { server.pack.require("good", opts.good, function () {}); }

server.route([
  { method: "GET", path: "/", handler: indexHandler },
  { method: "GET", path: "/x10/{command}/{house}/{unit?}", handler: x10Handler },
  { method: "GET", path: "/lirc/{command}/{device}/{button}", handler: lircHandler },
  { method: "GET", path: "/{path*}", handler: { directory: { path: path.resolve(__dirname + "/../public"), listing: false, index: true } } },
]);

server.start(function () { console.log("Haui at your service! " + server.info.uri ); });
