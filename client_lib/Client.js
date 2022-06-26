define(["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

  var Client = /*#__PURE__*/function () {
    function Client() {
      _classCallCheck(this, Client);
    }

    _createClass(Client, [{
      key: "msg",
      value: function msg() {
        var _msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default msg';

        console.log(_msg);
      }
    }]);

    return Client;
  }();

  _exports["default"] = Client;
});