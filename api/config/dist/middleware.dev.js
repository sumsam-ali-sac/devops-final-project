"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupMiddlewares = setupMiddlewares;

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _dotenv.config)();
process.env.VITE_WS_URL;

function setupMiddlewares(app) {
  app.use((0, _helmet["default"])({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "ws://localhost:8080"] // Adjust according to your needs

      }
    }
  }));
  app.use((0, _cors["default"])());
  app.use(_express["default"].json());
  app.use(_express["default"]["static"]("public"));
}