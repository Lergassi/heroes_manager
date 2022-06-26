define(["./Client.js"], function (_Client) {
  "use strict";

  _Client = _interopRequireDefault(_Client);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var msg = 'Hello, Client!';
  var client = new _Client["default"]();
  client.msg(msg);
});