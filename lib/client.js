"use strict";

var querystring = require("querystring"),
    http = require("http"),
    async = require("async");

var buildCommandPath = function (cmd) {
  var type = cmd.type,
      query = {};

  if (type === "x10") {
    query = {
      "command": cmd.command,
      "house": cmd.house,
      "unit": cmd.unit
    };
  } else if (type === "lirc") {
    query = {
      "command": cmd.command,
      "device": cmd.device,
      "button": cmd.button
    };
  }

  return "/" + querystring.stringify(query);
};

var runCommand = function (cmd, done) {
  var options = {
    path: buildCommandPath(cmd)
  };

  http.get(options, function (res) {
    res.on("data", function () {});
    res.on("end", function () {
      done();
    });
  });

  if (typeof done === "function") { done(); }
};

var runMacro = function (macro, done) {
  if (macro.type === "parallel") {
    async.each(macro.commands, runCommand);
  }

  if (typeof done === "function") { done(); }
};

global.window.runCommand = runCommand;
global.window.runMacro = runMacro;

document.addEventListener("DOMContentLoaded", function () {
});
