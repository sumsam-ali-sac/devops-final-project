"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = require("http");

var _dotenv = require("dotenv");

var _middleware = require("./config/middleware.js");

var _websocket = require("./lib/websocket.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();
var app = (0, _express["default"])();
(0, _middleware.setupMiddlewares)(app);
var server = (0, _http.createServer)(app);
(0, _websocket.setupWebSocket)(server);
var PORT = process.env.PORT || 8080;
server.listen(PORT, function () {
  console.log("Server is listening on http://localhost:".concat(PORT));
});