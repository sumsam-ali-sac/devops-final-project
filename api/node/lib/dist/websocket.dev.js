"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupWebSocket = setupWebSocket;

var _ws = require("ws");

var _mistralai = _interopRequireDefault(require("@mistralai/mistralai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

function setupWebSocket(server) {
  var wss = new _ws.WebSocketServer({
    server: server
  }); // const apiKey = process.env.MISTRAL_API_KEY;

  var client = new _mistralai["default"]("K0akN4V32EAlmkHjMj2gZT5UkAdSIjcT");
  console.log("client ws 1");
  wss.on("connection", function (socket) {
    console.log("client ws 2");
    console.log("New WebSocket connection established");
    socket.on("message", function _callee(message) {
      var messageString, messageArray, context, userMessage, chatStreamResponse, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, streamText;

      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              messageString = message.toString("utf-8");
              messageArray = messageString.split("CONTEXT");
              context = messageArray[messageArray.length - 1];
              userMessage = messageArray[0];
              console.log("Received message:", userMessage);
              console.log("Received assessment context:", context);
              _context.next = 9;
              return regeneratorRuntime.awrap(client.chatStream({
                model: "mistral-small-latest",
                messages: [{
                  role: "system",
                  content: "\n\t\t\t\t\t\t\t\tSimulate the following situation:\n\t\t\t\t\t\t\t\tYou are Helper Hive, an AI system designed to assist users with a wide range of queries and provide tailored assistance. Your design utilizes your deployment on the Monster API platform to offer precise, relevant, and instant answers across various topics and domains.\n\t\t\t\t\n\t\t\t\t\t\t\t\tYour capabilities include:\n\t\t\t\t\t\t\t\t- Providing accurate and concise answers to user queries.\n\t\t\t\t\t\t\t\t- Offering guidance and suggestions based on user questions.\n\t\t\t\t\t\t\t\t- Assisting with a variety of topics including general knowledge, troubleshooting, advice, and more.\n\t\t\t\t\n\t\t\t\t\t\t\t\tAdditionally, you are programmed to respond promptly, ensuring that users receive the information they need efficiently. Your responses should be short and to the point, ensuring clarity and relevance.\n\t\t\t\t\n\t\t\t\t\t\t\t\tKeep your responses focused and directly related to the user's queries, adhering strictly to the capabilities defined herein.\n\t\t\t\t\n\t\t\t\t\t\t\t\t".concat(context, "\n\t\t\t\t\t\t\t")
                }, {
                  role: "user",
                  content: userMessage
                }]
              }));

            case 9:
              chatStreamResponse = _context.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context.prev = 12;
              _iterator = _asyncIterator(chatStreamResponse);

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(_iterator.next());

            case 16:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 20;
              return regeneratorRuntime.awrap(_step.value);

            case 20:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 27;
                break;
              }

              chunk = _value;

              if (chunk.choices && chunk.choices[0].delta && chunk.choices[0].delta.content !== undefined) {
                streamText = chunk.choices[0].delta.content;
                socket.send(streamText);
              }

            case 24:
              _iteratorNormalCompletion = true;
              _context.next = 14;
              break;

            case 27:
              _context.next = 33;
              break;

            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](12);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 33:
              _context.prev = 33;
              _context.prev = 34;

              if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
                _context.next = 38;
                break;
              }

              _context.next = 38;
              return regeneratorRuntime.awrap(_iterator["return"]());

            case 38:
              _context.prev = 38;

              if (!_didIteratorError) {
                _context.next = 41;
                break;
              }

              throw _iteratorError;

            case 41:
              return _context.finish(38);

            case 42:
              return _context.finish(33);

            case 43:
              _context.next = 49;
              break;

            case 45:
              _context.prev = 45;
              _context.t1 = _context["catch"](0);
              console.error("Error during chat stream:", _context.t1);
              socket.send("Error: " + _context.t1.message);

            case 49:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 45], [12, 29, 33, 43], [34,, 38, 42]]);
    });
    socket.on("close", function () {
      console.log("WebSocket connection closed");
    });
    socket.on("error", function (error) {
      console.error("WebSocket error:", error);
    });
  });
}