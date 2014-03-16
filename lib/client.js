"use strict";

var http = require("http"),
    async = require("async");

var buildCommandPath = function (cmd) {
  var cmdPath = "/";

  if (cmd.type === "x10") {
    cmdPath += "x10" +
               "/" + cmd.command +
               "/" + cmd.house +
               "/" + cmd.unit;
  } else if (cmd.type === "lirc") {
    cmdPath += "lirc" +
               "?command=" + cmd.command +
               "&device=" + cmd.device +
               "&button=" + cmd.button;
  }

  return cmdPath;
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
