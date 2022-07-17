/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
define(function() { return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ClassA.js":
/*!**************************!*\
  !*** ./client/ClassA.js ***!
  \**************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ClassA; }\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n// import 'reflect-metadata';\n// function log(target, name, descriptor) {\n//     // console.log('this is decorator');\n//     // console.log('decorator.target', target);\n//     // console.log('decorator.target._msg', target._msg);\n//     // console.log('decorator.name', name);\n//     // console.log('decorator.descriptor', descriptor);\n//     // // descriptor.writable = false;\n//     // return descriptor;\n//     const original = descriptor.value;\n//     if (typeof original === 'function') {\n//         // console.log('run sum');\n//         descriptor.value = function(...args) {\n//             console.log(`Arguments: ${args}`);\n//             try {\n//                 const result = original.apply(this, args);\n//                 console.log(`Result: ${result}`);\n//                 return result;\n//             } catch (e) {\n//                 console.log(`Error: ${e}`);\n//                 throw e;\n//             }\n//         }\n//     }\n//     return descriptor;\n// }\nvar ClassA = /*#__PURE__*/function () {\n  function ClassA() {\n    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'this is default msg';\n\n    _classCallCheck(this, ClassA);\n\n    this._msg = msg;\n  }\n\n  _createClass(ClassA, [{\n    key: \"msg\",\n    get: function get() {\n      return this._msg;\n    }\n  }, {\n    key: \"sum\",\n    value: function sum(a, b) {\n      return a + b;\n    }\n  }]);\n\n  return ClassA;\n}();\n\n\n\n//# sourceURL=webpack://heroes_ts/./client/ClassA.js?");

/***/ }),

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval("var _core_data_test_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache;\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_data_test_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/data/test.json */ \"./core/data/test.json\");\n/* harmony import */ var _ClassA_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClassA.js */ \"./client/ClassA.js\");\n\n\nconsole.log('Hello, World! (#client#/index.js)');\nconsole.log(/*#__PURE__*/ (_core_data_test_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_core_data_test_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_core_data_test_json__WEBPACK_IMPORTED_MODULE_0__))));\nvar classA = new _ClassA_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconsole.log('classA', classA);\n\n//# sourceURL=webpack://heroes_ts/./client/index.js?");

/***/ }),

/***/ "./core/data/test.json":
/*!*****************************!*\
  !*** ./core/data/test.json ***!
  \*****************************/
/***/ (function(module) {

eval("module.exports = {\"foo\":\"bar\"};\n\n//# sourceURL=webpack://heroes_ts/./core/data/test.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	!function() {
/******/ 		var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });
/******/ 			}
/******/ 			def['default'] = function() { return value; };
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;