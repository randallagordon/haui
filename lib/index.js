"use strict";

var Hapi = require("hapi"),
    x10 = require("x10"),
    path = require("path"),
    opts = require(path.resolve(process.argv[2]) || "../settings");

var cm11 = new x10.CM11(opts.x10);

var server = Hapi.createServer(opts.host || "0.0.0.0", parseInt(process.env.PORT, 10) || opts.port || 8000, {
  views: {
    engines: { jade: "jade" },
    path: __dirname + "/views"
  }
});

var indexHandler = function (request, reply) {
  reply.view("index", {
    server: opts.uri || server.info.uri,
    buttons: opts.buttons,
  });
};

var x10Handler = function (request, reply) {
  var address = {
    house: x10.HOUSE[request.params.house],
    unit: x10.UNIT["UNIT_" + request.params.unit]
  };

  cm11.sendCommand(address, x10.FUNCTION[request.params.command], function(err) {
    if (err) { return console.log(err); }
  });

  reply(address);
};

server.route([
  { method: "GET", path: "/", handler: indexHandler },
  { method: "GET", path: "/x10/{command}/{house}/{unit?}", handler: x10Handler }
]);

server.start(function () { console.log("Haui at your service! " + server.info.uri ); });
