/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/doc/js/bundle.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/doc/js/bundle.ts":
/*!******************************!*\
  !*** ./src/doc/js/bundle.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getting_started_1 = __webpack_require__(/*! ./route/getting-started */ "./src/doc/js/route/getting-started.ts");
var index_1 = __webpack_require__(/*! ./route/index */ "./src/doc/js/route/index.ts");
var input_1 = __webpack_require__(/*! ./route/input */ "./src/doc/js/route/input.ts");
var misc_1 = __webpack_require__(/*! ./route/misc */ "./src/doc/js/route/misc.ts");
var monitor_1 = __webpack_require__(/*! ./route/monitor */ "./src/doc/js/route/monitor.ts");
var ui_components_1 = __webpack_require__(/*! ./route/ui-components */ "./src/doc/js/route/ui-components.ts");
var screw_1 = __webpack_require__(/*! ./screw */ "./src/doc/js/screw.ts");
var simple_router_1 = __webpack_require__(/*! ./simple-router */ "./src/doc/js/simple-router.ts");
var sp_menu_1 = __webpack_require__(/*! ./sp-menu */ "./src/doc/js/sp-menu.ts");
function setUpScrews() {
    var screwElems = document.querySelectorAll('.common-logo_symbol');
    screwElems.forEach(function (elem) {
        new screw_1.Screw(elem);
    });
}
function setUpSpMenu() {
    var buttonElem = document.getElementById('spMenuButton');
    var menuElem = document.querySelector('.common-menu');
    if (!buttonElem || !menuElem) {
        return;
    }
    new sp_menu_1.SpMenu({
        buttonElement: buttonElem,
        menuElement: menuElem,
    });
}
(function () {
    var router = new simple_router_1.SimpleRouter();
    router.add(getting_started_1.GettingStartedRoute);
    router.add(index_1.IndexRoute);
    router.add(input_1.InputRoute);
    router.add(misc_1.MiscRoute);
    router.add(monitor_1.MonitorRoute);
    router.add(ui_components_1.UiComponentsRoute);
    router.route(location.pathname);
    setUpScrews();
    setUpSpMenu();
    hljs.initHighlightingOnLoad();
})();


/***/ }),

/***/ "./src/doc/js/route/getting-started.ts":
/*!*********************************************!*\
  !*** ./src/doc/js/route/getting-started.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GettingStartedRoute = void 0;
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
exports.GettingStartedRoute = {
    pathname: /^(\/tweakpane)?\/getting-started\.html$/,
    init: function () {
        var markerToFnMap = {
            first: function (container) {
                var PARAMS = { speed: 0.5 };
                var pane = new Tweakpane({
                    container: container,
                });
                var updatePreset = function () {
                    var elem = document.querySelector('*[data-first]');
                    if (elem) {
                        var preset = pane.exportPreset();
                        elem.textContent =
                            'PARAMS = ' + JSON.stringify(preset, null, 2) + ';';
                    }
                };
                pane.addInput(PARAMS, 'speed').on('change', updatePreset);
                updatePreset();
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer(marker);
            initFn(container);
        });
    },
};


/***/ }),

/***/ "./src/doc/js/route/index.ts":
/*!***********************************!*\
  !*** ./src/doc/js/route/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRoute = void 0;
var sketch_1 = __webpack_require__(/*! ../sketch */ "./src/doc/js/sketch.ts");
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
exports.IndexRoute = {
    pathname: /^(\/tweakpane)?\/$/,
    init: function () {
        var ENV = {
            amp: { x: 0.1, y: 0.5 },
            color: '#e4e4e7',
            freq: {
                x: 12.57,
                y: 6.28,
            },
            maxSize: 64,
            range: 0.8,
            spacing: 24,
            speed: 0.02,
            title: 'Tweakpane',
        };
        var PRESETS = {
            atmos: {
                amp: { x: 0.1, y: 0.53 },
                color: '#e4e4e7',
                freq: { x: 45, y: 16 },
                maxSize: 128,
                range: 0.79,
                spacing: 24,
                speed: 0.02,
                title: 'Tweakpane',
            },
            bubble: {
                amp: { x: 0.3, y: 0.51 },
                color: '#ffffff',
                freq: { x: 64, y: 32 },
                maxSize: 128,
                range: 0.65,
                spacing: 48,
                speed: 0.02,
                title: 'Tweakpane',
            },
            cloud: {
                amp: { x: 0.07, y: 0 },
                color: '#e4e4e7',
                freq: { x: 22.25, y: 0 },
                maxSize: 105,
                range: 0.63,
                spacing: 48,
                speed: 0.02,
                title: 'Tweakpane',
            },
        };
        var HIDDEN_PARAMS = {
            presetId: '',
            presetJson: '',
        };
        var sketchElem = document.querySelector('.common-pageHeader_sketchContainer');
        if (!sketchElem) {
            return;
        }
        var sketch = new sketch_1.Sketch(sketchElem, ENV);
        var markerToFnMap = {
            index: function (container) {
                var pane = new Tweakpane({
                    container: container,
                    title: 'Tweakpane',
                });
                pane.addInput(ENV, 'title').on('change', function (value) {
                    var titleElem = document.querySelector('.common-pageHeader_title');
                    if (titleElem) {
                        titleElem.textContent = value;
                    }
                });
                pane.addInput(ENV, 'color');
                pane.addSeparator();
                pane.addInput(ENV, 'spacing', {
                    max: 48,
                    min: 24,
                });
                pane.addInput(ENV, 'range', {
                    max: 1,
                    min: 0,
                });
                pane.addInput(ENV, 'maxSize', {
                    max: 128,
                    min: 5,
                });
                pane.addInput(ENV, 'freq', {
                    x: { max: 64, min: 0 },
                    y: { max: 32, min: 0 },
                });
                pane.addInput(ENV, 'amp', {
                    x: { max: 0.3, min: 0 },
                    y: { max: 1, min: 0 },
                });
                var pf = pane.addFolder({
                    expanded: false,
                    title: 'Preset',
                });
                pf.addInput(HIDDEN_PARAMS, 'presetId', {
                    label: 'preset',
                    options: {
                        'Import...': '',
                        Atmos: 'atmos',
                        Bubble: 'bubble',
                        Cloud: 'cloud',
                    },
                }).on('change', function (value) {
                    var preset = PRESETS[value];
                    if (preset) {
                        HIDDEN_PARAMS.presetId = '';
                        pane.importPreset(preset);
                    }
                });
                pf.addMonitor(HIDDEN_PARAMS, 'presetJson', {
                    label: 'data',
                    multiline: true,
                });
                pane.on('change', function () {
                    sketch.reset();
                    HIDDEN_PARAMS.presetJson = JSON.stringify(pane.exportPreset(), null, 2);
                });
                pane.on('fold', function () {
                    sketch.resize();
                    setTimeout(function () {
                        sketch.resize();
                    }, 200);
                });
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer(marker);
            initFn(container);
        });
        sketch.resize();
    },
};


/***/ }),

/***/ "./src/doc/js/route/input.ts":
/*!***********************************!*\
  !*** ./src/doc/js/route/input.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.InputRoute = void 0;
// tslint:disable:object-literal-sort-keys
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
exports.InputRoute = {
    pathname: /^(\/tweakpane)?\/input\.html$/,
    init: function () {
        var markerToFnMap = {
            input: function (container) {
                var PARAMS = {
                    b: true,
                    c: '#ff8800',
                    n: 50,
                    p: { x: 12, y: 34 },
                    s: 'string',
                };
                var pane = new Tweakpane({
                    container: container,
                });
                var nf = pane.addFolder({
                    title: 'Number',
                });
                nf.addInput(PARAMS, 'n', {
                    label: 'text',
                });
                nf.addInput(PARAMS, 'n', {
                    label: 'slider',
                    max: 100,
                    min: 0,
                });
                nf.addInput(PARAMS, 'n', {
                    label: 'list',
                    options: {
                        low: 0,
                        medium: 50,
                        high: 100,
                    },
                });
                var sf = pane.addFolder({
                    title: 'String',
                });
                sf.addInput(PARAMS, 's', {
                    label: 'text',
                });
                sf.addInput(PARAMS, 's', {
                    label: 'list',
                    options: {
                        dark: 'Dark',
                        light: 'Light',
                    },
                });
                var bf = pane.addFolder({
                    title: 'Boolean',
                });
                bf.addInput(PARAMS, 'b', {
                    label: 'checkbox',
                });
                var cf = pane.addFolder({
                    title: 'Color',
                });
                cf.addInput(PARAMS, 'c', {
                    label: 'picker',
                });
                var pf = pane.addFolder({
                    title: 'Point',
                });
                pf.addInput(PARAMS, 'p', {
                    label: 'picker',
                });
            },
            numberText: function (container) {
                var PARAMS = { value: 50 };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'text',
                });
            },
            slider: function (container) {
                var PARAMS = { value: 50 };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'slider',
                    max: 100,
                    min: 0,
                });
            },
            step: function (container) {
                var PARAMS = {
                    speed: 0.5,
                    count: 10,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'speed', {
                    step: 0.1,
                });
                pane.addInput(PARAMS, 'count', {
                    label: 'count',
                    max: 100,
                    min: 0,
                    step: 10,
                });
            },
            numberList: function (container) {
                var PARAMS = { value: 50 };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'quality',
                    options: {
                        low: 0,
                        medium: 50,
                        high: 100,
                    },
                });
                pane.addSeparator();
                pane.addMonitor(PARAMS, 'value', {
                    label: '(actual)',
                });
            },
            stringText: function (container) {
                var PARAMS = { value: 'hello, world' };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'message',
                });
            },
            stringList: function (container) {
                var PARAMS = { value: '' };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'theme',
                    options: {
                        none: '',
                        dark: 'path/to/dark.json',
                        light: 'path/to/Light.json',
                    },
                });
                pane.addSeparator();
                pane.addMonitor(PARAMS, 'value', {
                    label: '(actual)',
                });
            },
            checkbox: function (container) {
                var PARAMS = { value: true };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'hidden',
                });
            },
            objectColor: function (container) {
                var PARAMS = {
                    background: { r: 255, g: 127, b: 0 },
                    tint: { r: 255, g: 255, b: 0, a: 0.5 },
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'background');
                pane.addInput(PARAMS, 'tint');
            },
            stringColor: function (container) {
                var PARAMS = {
                    primary: '#8df',
                    secondary: 'rgb(255, 136, 221)',
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'primary');
                pane.addInput(PARAMS, 'secondary');
            },
            numberColor: function (container) {
                var PARAMS = {
                    background: 0x0088ff,
                    tint: 0x00ff0044,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'background', {
                    input: 'color',
                });
                pane.addInput(PARAMS, 'tint', {
                    input: 'color.rgba',
                });
            },
            inputString: function (container) {
                var PARAMS = {
                    hex: '#0088ff',
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'hex', {
                    input: 'string',
                });
            },
            point2d: function (container) {
                var PARAMS = { value: { x: 50, y: 25 } };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'offset',
                });
            },
            point2dParams: function (container) {
                var PARAMS = { value: { x: 20, y: 30 } };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'offset',
                    x: { step: 20 },
                    y: { min: 0, max: 100 },
                });
            },
            point2dInvertedY: function (container) {
                var PARAMS = { value: { x: 50, y: 50 } };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'offset',
                    y: { inverted: true },
                });
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer(marker);
            initFn(container);
        });
    },
};


/***/ }),

/***/ "./src/doc/js/route/misc.ts":
/*!**********************************!*\
  !*** ./src/doc/js/route/misc.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscRoute = void 0;
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
exports.MiscRoute = {
    pathname: /^(\/tweakpane)?\/misc\.html$/,
    init: function () {
        var IMEX_PARAMS = {
            color: '#ff8000',
            name: 'export',
            size: 10,
        };
        var IMEX_LOG = {
            log: '',
        };
        var showTheme = function (params) {
            var elem = document.querySelector('*[data-themeCss]');
            if (!elem) {
                return;
            }
            var indentedProps = params.cssProps
                .map(function (cssProp) { return "  " + cssProp; })
                .join('\n');
            elem.textContent = "<!-- Example theme: " + params.title + " -->\n<!-- Copy and paste the element into your head element -->\n<style>\n:root {\n" + indentedProps + "\n}\n</style>";
            hljs.highlightBlock(elem);
        };
        var setUpThemedPane = function (container, params) {
            var PARAMS = {
                background: '#f1f2f3',
                point2d: { x: 0, y: 0 },
                slider: 0,
                variables: (params && params.cssProps.join('\n')) || '',
            };
            var pane = new Tweakpane({
                container: container,
                title: (params && params.title) || 'Default',
            });
            pane.addInput(PARAMS, 'slider', {
                max: 64,
                min: 0,
            });
            pane.addSeparator();
            pane.addInput(PARAMS, 'point2d');
            if (!params) {
                var fp = pane.addFolder({
                    title: 'Preview',
                });
                fp.addInput(PARAMS, 'background').on('change', function () {
                    document.documentElement.style.setProperty('--themes-background-color', PARAMS.background);
                });
                return;
            }
            var styleElem = document.createElement('style');
            styleElem.textContent = ".common-paneContainer-" + params.id + "Theme {" + params.cssProps.join('') + "}";
            document.head.appendChild(styleElem);
            var f = pane.addFolder({
                title: 'CSS',
            });
            f.addMonitor(PARAMS, 'variables', {
                interval: 0,
                multiline: true,
            });
            f.addButton({
                title: 'Show',
            }).on('click', function () {
                showTheme(params);
            });
        };
        var markerToFnMap = {
            misc: function (container) {
                var PARAMS = { value: 0 };
                var pane = new Tweakpane({
                    container: container,
                    title: 'Global title',
                });
                pane.addInput(PARAMS, 'value', {
                    label: 'custom label',
                });
                var f = pane.addFolder({
                    title: 'Folder',
                });
                f.addButton({
                    title: 'Button1',
                });
                f.addButton({
                    title: 'Button2',
                });
                f.addSeparator();
                f.addButton({
                    title: 'Button3',
                });
            },
            event: function (container) {
                var PARAMS = {
                    log: '',
                    value: 0,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                var m = null;
                pane
                    .addInput(PARAMS, 'value', {
                    max: 100,
                    min: 0,
                })
                    .on('change', function (value) {
                    PARAMS.log = value.toFixed(2);
                    if (m) {
                        m.refresh();
                    }
                });
                pane.addSeparator();
                m = pane.addMonitor(PARAMS, 'log', {
                    count: 10,
                    interval: 0,
                    label: '(log)',
                });
            },
            globalEvent: function (container) {
                var PARAMS = {
                    boolean: true,
                    color: '#0080ff',
                    number: 0,
                    string: 'text',
                    log: '',
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'boolean');
                pane.addInput(PARAMS, 'color');
                pane.addInput(PARAMS, 'number', {
                    max: 100,
                    min: 0,
                });
                pane.addInput(PARAMS, 'string');
                pane.addSeparator();
                var m = pane.addMonitor(PARAMS, 'log', {
                    count: 10,
                    interval: 0,
                    label: '(log)',
                });
                pane.on('change', function (value) {
                    var v = typeof value === 'number' ? value.toFixed(2) : value;
                    PARAMS.log = "changed: " + v;
                    m.refresh();
                });
            },
            export: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(IMEX_PARAMS, 'name');
                pane.addInput(IMEX_PARAMS, 'size', {
                    max: 100,
                    min: 0,
                });
                pane.addInput(IMEX_PARAMS, 'color');
                pane.addSeparator();
                pane.addMonitor(IMEX_LOG, 'log', {
                    label: '(preset)',
                    multiline: true,
                });
                var updatePreset = function () {
                    var preset = pane.exportPreset();
                    IMEX_LOG.log = JSON.stringify(preset, null, 2);
                };
                pane.on('change', updatePreset);
                updatePreset();
            },
            import: function (container) {
                var PARAMS = {
                    color: '#0080ff',
                    log: '',
                    name: 'import',
                    size: 50,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addMonitor(IMEX_LOG, 'log', {
                    label: '(preset)',
                    multiline: true,
                });
                pane
                    .addButton({
                    title: 'Import',
                })
                    .on('click', function () {
                    pane.importPreset(IMEX_PARAMS);
                });
                pane.addSeparator();
                pane.addInput(PARAMS, 'name');
                pane.addInput(PARAMS, 'size');
                pane.addInput(PARAMS, 'color');
            },
            presetKey: function (container) {
                var PARAMS = {
                    foo: { speed: 1 / 3 },
                    bar: { speed: 2 / 3 },
                    preset: '',
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS.foo, 'speed', {
                    max: 1,
                    min: 0,
                });
                pane.addInput(PARAMS.bar, 'speed', {
                    max: 1,
                    min: 0,
                    presetKey: 'speed2',
                });
                pane.addSeparator();
                var m = pane.addMonitor(PARAMS, 'preset', {
                    interval: 0,
                    label: '(preset)',
                    multiline: true,
                });
                var updatePreset = function () {
                    var preset = pane.exportPreset();
                    PARAMS.preset = JSON.stringify(preset, null, 2);
                    m.refresh();
                };
                pane.on('change', updatePreset);
                updatePreset();
            },
            rootTitle: function (container) {
                var PARAMS = {
                    bounce: 0.5,
                    gravity: 0.01,
                    speed: 0.1,
                };
                var pane = new Tweakpane({
                    container: container,
                    title: 'Parameters',
                });
                pane.addInput(PARAMS, 'speed', {
                    max: 1,
                    min: 0,
                });
                var f = pane.addFolder({
                    title: 'Advanced',
                });
                f.addInput(PARAMS, 'gravity', {
                    max: 1,
                    min: 0,
                });
                f.addInput(PARAMS, 'bounce', {
                    max: 1,
                    min: 0,
                });
            },
            label: function (container) {
                var PARAMS = {
                    initSpd: 0,
                    size: 30,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'initSpd', {
                    label: 'Initial speed',
                });
                pane.addInput(PARAMS, 'size', {
                    label: 'Force field\nradius',
                });
            },
            insert: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addButton({ title: 'Run' });
                pane.addButton({ title: 'Stop' });
                pane.addButton({ title: '**Reset**', index: 1 });
            },
            hidden: function (container) {
                var PARAMS = {
                    seed: 0.1,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                var f = pane.addFolder({ title: 'Advanced' });
                f.addInput(PARAMS, 'seed');
                pane
                    .addButton({
                    index: 0,
                    title: 'Toggle',
                })
                    .on('click', function () {
                    f.hidden = !f.hidden;
                });
            },
            defaultTheme: function (container) {
                return setUpThemedPane(container);
            },
            jetblackTheme: function (container) {
                var params = {
                    cssProps: [
                        '/* Base colors */',
                        '--tp-base-background-color: hsl(0, 0%, 0%);',
                        '--tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);',
                        '',
                        '/* Button-like control colors */',
                        '--tp-button-background-color: hsl(0, 0%, 70%);',
                        '--tp-button-background-color-active: hsl(0, 0%, 85%);',
                        '--tp-button-background-color-focus: hsl(0, 0%, 80%);',
                        '--tp-button-background-color-hover: hsl(0, 0%, 75%);',
                        '--tp-button-foreground-color: var(--tp-base-background-color);',
                        '',
                        '/* Folder colors */',
                        '--tp-folder-background-color: hsl(0, 0%, 10%);',
                        '--tp-folder-background-color-active: hsl(0, 0%, 25%);',
                        '--tp-folder-background-color-focus: hsl(0, 0%, 20%);',
                        '--tp-folder-background-color-hover: hsl(0, 0%, 15%);',
                        '--tp-folder-foreground-color: hsl(0, 0%, 50%);',
                        '',
                        '/* Input control colors */',
                        '--tp-input-background-color: hsl(0, 0%, 10%);',
                        '--tp-input-background-color-active: hsl(0, 0%, 25%);',
                        '--tp-input-background-color-focus: hsl(0, 0%, 20%);',
                        '--tp-input-background-color-hover: hsl(0, 0%, 15%);',
                        '--tp-input-foreground-color: hsl(0, 0%, 70%);',
                        '--tp-input-guide-color: hsla(0, 0%, 100%, 5%);',
                        '',
                        '/* Monitor control colors */',
                        '--tp-monitor-background-color: hsl(0, 0%, 8%);',
                        '--tp-monitor-foreground-color: hsl(0, 0%, 48%);',
                        '',
                        '/* Misc */',
                        '--tp-label-foreground-color: hsl(0, 0%, 50%);',
                        '--tp-separator-color: hsl(0, 0%, 10%);',
                    ],
                    id: 'jetblack',
                    title: 'Jetblack',
                };
                showTheme(params);
                return setUpThemedPane(container, params);
            },
            lightTheme: function (container) {
                return setUpThemedPane(container, {
                    cssProps: [
                        '/* Base colors */',
                        '--tp-base-background-color: hsl(230deg, 5%, 90%);',
                        '--tp-base-shadow-color: hsla(0, 0%, 0%, 0.1);',
                        '',
                        '/* Button-like control colors */',
                        '--tp-button-background-color: hsl(230deg, 5%, 70%);',
                        '--tp-button-background-color-active: hsl(230deg, 5%, 55%);',
                        '--tp-button-background-color-focus: hsl(230deg, 5%, 60%);',
                        '--tp-button-background-color-hover: hsl(230deg, 5%, 65%);',
                        '--tp-button-foreground-color: hsl(230deg, 5%, 20%);',
                        '',
                        '/* Folder colors */',
                        '--tp-folder-background-color: hsl(230deg, 5%, 80%);',
                        '--tp-folder-background-color-active: hsl(230deg, 5%, 65%);',
                        '--tp-folder-background-color-focus: hsl(230deg, 5%, 70%);',
                        '--tp-folder-background-color-hover: hsl(230deg, 5%, 75%);',
                        '--tp-folder-foreground-color: var(--tp-input-foreground-color);',
                        '',
                        '/* Input control colors */',
                        '--tp-input-background-color: hsl(230deg, 5%, 85%);',
                        '--tp-input-background-color-active: hsl(230deg, 5%, 70%);',
                        '--tp-input-background-color-focus: hsl(230deg, 5%, 75%);',
                        '--tp-input-background-color-hover: hsl(230deg, 5%, 80%);',
                        '--tp-input-foreground-color: hsl(230deg, 5%, 30%);',
                        '--tp-input-guide-color: hsla(230deg, 5%, 30%, 10%);',
                        '',
                        '/* Monitor control colors */',
                        '--tp-monitor-background-color: var(--tp-input-background-color);',
                        '--tp-monitor-foreground-color: hsl(230deg, 5%, 60%);',
                        '',
                        '/* Misc */',
                        '--tp-label-foreground-color: hsl(230deg, 5%, 50%);',
                        '--tp-separator-color: hsl(230deg, 5%, 85%);',
                    ],
                    id: 'light',
                    title: 'Light',
                });
            },
            icebergTheme: function (container) {
                return setUpThemedPane(container, {
                    cssProps: [
                        '/* Base colors */',
                        '--tp-base-background-color: hsl(230deg, 20%, 11%);',
                        '--tp-base-shadow-color: hsla(0, 0%, 0%, 0.2);',
                        '',
                        '/* Button-like control colors */',
                        '--tp-button-background-color: hsl(230deg, 10%, 80%);',
                        '--tp-button-background-color-active: hsl(230deg, 10%, 95%);',
                        '--tp-button-background-color-focus: hsl(230deg, 10%, 90%);',
                        '--tp-button-background-color-hover: hsl(230deg, 10%, 85%);',
                        '--tp-button-foreground-color: var(--tp-base-background-color);',
                        '',
                        '/* Folder colors */',
                        '--tp-folder-background-color: hsl(230deg, 25%, 16%);',
                        '--tp-folder-background-color-active: hsl(230deg, 25%, 31%);',
                        '--tp-folder-background-color-focus: hsl(230deg, 25%, 26%);',
                        '--tp-folder-background-color-hover: hsl(230deg, 25%, 21%);',
                        '--tp-folder-foreground-color: var(--tp-input-foreground-color);',
                        '',
                        '/* Input control colors */',
                        '--tp-input-background-color: hsl(230deg, 20%, 8%);',
                        '--tp-input-background-color-active: hsl(230deg, 28%, 26%);',
                        '--tp-input-background-color-focus: hsl(230deg, 28%, 21%);',
                        '--tp-input-background-color-hover: hsl(230deg, 20%, 16%);',
                        '--tp-input-foreground-color: hsl(230deg, 10%, 80%);',
                        '--tp-input-guide-color: hsla(230deg, 10%, 80%, 5%);',
                        '',
                        '/* Monitor control colors */',
                        '--tp-monitor-background-color: hsl(230deg, 20%, 8%);',
                        '--tp-monitor-foreground-color: hsl(230deg, 12%, 48%);',
                        '',
                        '/* Misc */',
                        '--tp-label-foreground-color: hsl(230deg, 12%, 48%);',
                        '--tp-separator-color: hsl(230deg, 20%, 8%);',
                    ],
                    id: 'iceberg',
                    title: 'Iceberg',
                });
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer(marker);
            initFn(container);
        });
    },
};


/***/ }),

/***/ "./src/doc/js/route/monitor.ts":
/*!*************************************!*\
  !*** ./src/doc/js/route/monitor.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorRoute = void 0;
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
exports.MonitorRoute = {
    pathname: /^(\/tweakpane)?\/monitor\.html$/,
    init: function () {
        var SHARED_PARAMS = {
            positive: false,
            time: '',
            wave: 0,
        };
        var updateTime = function () {
            var matches = String(new Date()).match(/\d{2}:\d{2}:\d{2}/);
            SHARED_PARAMS.time = (matches && matches[0]) || '';
        };
        setInterval(updateTime, 1000);
        updateTime();
        var wavep = 0;
        setInterval(function () {
            SHARED_PARAMS.wave =
                ((3 * 4) / Math.PI) *
                    (Math.sin(wavep * 1 * Math.PI) +
                        Math.sin(wavep * 3 * Math.PI) / 3 +
                        Math.sin(wavep * 5 * Math.PI) / 5) *
                    0.25;
            SHARED_PARAMS.positive = SHARED_PARAMS.wave >= 0;
            wavep += 0.02;
        }, 50);
        var markerToFnMap = {
            monitor: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                var nf = pane.addFolder({
                    title: 'Number',
                });
                nf.addMonitor(SHARED_PARAMS, 'wave', {
                    label: 'text',
                });
                nf.addMonitor(SHARED_PARAMS, 'wave', {
                    count: 10,
                    label: 'multiline',
                });
                nf.addMonitor(SHARED_PARAMS, 'wave', {
                    label: 'graph',
                    max: +1,
                    min: -1,
                    view: 'graph',
                });
                var bf = pane.addFolder({
                    title: 'Boolean',
                });
                bf.addMonitor(SHARED_PARAMS, 'positive', {
                    label: 'positive',
                });
            },
            multiline: function (container) {
                var PARAMS = { params: '' };
                var pane = new Tweakpane({
                    container: container,
                });
                pane
                    .addMonitor(PARAMS, 'params', {
                    multiline: true,
                })
                    .on('update', function () {
                    PARAMS.params = JSON.stringify(SHARED_PARAMS, null, 2);
                });
            },
            count: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addMonitor(SHARED_PARAMS, 'wave', {
                    count: 10,
                });
            },
            interval: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addMonitor(SHARED_PARAMS, 'time', {
                    interval: 1000,
                });
            },
            graph: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addMonitor(SHARED_PARAMS, 'wave', {
                    max: +1,
                    min: -1,
                    view: 'graph',
                });
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer(marker);
            initFn(container);
        });
    },
};


/***/ }),

/***/ "./src/doc/js/route/ui-components.ts":
/*!*******************************************!*\
  !*** ./src/doc/js/route/ui-components.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UiComponentsRoute = void 0;
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
exports.UiComponentsRoute = {
    pathname: /^(\/tweakpane)?\/ui-components\.html$/,
    init: function () {
        var markerToFnMap = {
            header: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                var f = pane.addFolder({
                    title: 'Folder',
                });
                f.addButton({
                    title: 'Button',
                });
                f.addButton({
                    title: 'Button',
                });
                var sf = f.addFolder({
                    title: 'Subfolder',
                });
                sf.addButton({
                    title: 'Button',
                });
                sf.addButton({
                    title: 'Button',
                });
                f.addSeparator();
                f.addButton({
                    title: 'Button',
                });
            },
            folder: function (container) {
                var PARAMS = {
                    acceleration: 0,
                    randomness: 0,
                    speed: 0,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                var f1 = pane.addFolder({
                    title: 'Basic',
                });
                f1.addInput(PARAMS, 'speed');
                var f2 = pane.addFolder({
                    expanded: false,
                    title: 'Advanced',
                });
                f2.addInput(PARAMS, 'acceleration');
                f2.addInput(PARAMS, 'randomness');
            },
            button: function (container) {
                var PARAMS = { count: '0' };
                var pane = new Tweakpane({
                    container: container,
                });
                pane
                    .addButton({
                    title: 'Increment',
                })
                    .on('click', function () {
                    PARAMS.count = String(parseInt(PARAMS.count, 10) + 1);
                    pane.refresh();
                });
                pane.addSeparator();
                pane.addMonitor(PARAMS, 'count', {
                    interval: 0,
                });
            },
            separator: function (container) {
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addButton({
                    title: 'Previous',
                });
                pane.addButton({
                    title: 'Next',
                });
                pane.addSeparator();
                pane.addButton({
                    title: 'Reset',
                });
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer(marker);
            initFn(container);
        });
    },
};


/***/ }),

/***/ "./src/doc/js/screw.ts":
/*!*****************************!*\
  !*** ./src/doc/js/screw.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Screw = void 0;
var Screw = /** @class */ (function () {
    function Screw(elem) {
        this.onWindowScroll_ = this.onWindowScroll_.bind(this);
        this.elem_ = elem;
        window.addEventListener('scroll', this.onWindowScroll_);
    }
    Screw.prototype.onWindowScroll_ = function () {
        var angle = window.scrollY * 0.5;
        this.elem_.style.transform = "rotate(" + angle + "deg)";
    };
    return Screw;
}());
exports.Screw = Screw;


/***/ }),

/***/ "./src/doc/js/simple-router.ts":
/*!*************************************!*\
  !*** ./src/doc/js/simple-router.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRouter = void 0;
var SimpleRouter = /** @class */ (function () {
    function SimpleRouter() {
        this.routes_ = [];
    }
    SimpleRouter.prototype.add = function (route) {
        this.routes_.push(route);
    };
    SimpleRouter.prototype.route = function (pathname) {
        this.routes_.forEach(function (route) {
            if (route.pathname.test(pathname)) {
                route.init();
            }
        });
    };
    return SimpleRouter;
}());
exports.SimpleRouter = SimpleRouter;


/***/ }),

/***/ "./src/doc/js/sketch.ts":
/*!******************************!*\
  !*** ./src/doc/js/sketch.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Sketch = void 0;
function map(v, s1, e1, s2, e2) {
    return s2 + ((v - s1) / (e1 - s1)) * (e2 - s2);
}
function dist(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}
var DEFAULT_DOT_SIZE = 20;
var Sketch = /** @class */ (function () {
    function Sketch(element, env) {
        var _this = this;
        this.elem_ = element;
        this.env_ = env;
        this.dots_ = [];
        this.t_ = 0;
        this.app_ = new PIXI.Application({
            transparent: true,
        });
        this.elem_.appendChild(this.app_.renderer.view);
        window.addEventListener('resize', function () {
            _this.resize();
        });
        this.resize();
        this.app_.ticker.add(function () {
            _this.onTick_();
        });
    }
    Sketch.prototype.reset = function () {
        var w = this.width_;
        var h = this.height_;
        var env = this.env_;
        var g = new PIXI.Graphics();
        var color = parseInt(env.color.substring(1), 16);
        g.beginFill(color)
            .drawCircle(0, 0, DEFAULT_DOT_SIZE)
            .endFill();
        var tex = g.generateCanvasTexture();
        this.app_.stage.removeChildren();
        this.dots_ = [];
        var xstep = env.spacing;
        var ystep = (xstep * Math.sqrt(3)) / 2;
        var xcount = Math.ceil(w / xstep);
        var ycount = Math.ceil(h / ystep);
        for (var iy = 0; iy <= ycount; iy++) {
            for (var ix = 0; ix <= xcount; ix++) {
                var dot = new PIXI.Sprite(tex);
                dot.anchor.set(0.5, 0.5);
                dot.en = 0;
                dot.x = (ix + (iy % 2 === 0 ? 0 : 0.5)) * xstep;
                dot.y = iy * ystep;
                this.app_.stage.addChild(dot);
                this.dots_.push(dot);
            }
        }
    };
    Sketch.prototype.resize = function () {
        var rect = this.elem_.getBoundingClientRect();
        this.height_ = rect.height;
        this.width_ = rect.width;
        this.app_.renderer.resize(this.width_, this.height_);
        this.reset();
    };
    Sketch.prototype.onTick_ = function () {
        var w = this.width_;
        var h = this.height_;
        var env = this.env_;
        this.dots_.forEach(function (dot) {
            dot.en = 0;
        });
        this.t_ -= env.speed;
        var t = this.t_;
        var _loop_1 = function (iw) {
            var p = map(iw, 0, 100, 0, 1);
            var wx = p * w + Math.sin(p * env.freq.x + t) * env.amp.x * w;
            var py = Math.sin(t + p * env.freq.y);
            var wy = h / 2 + py * env.amp.y * h;
            this_1.dots_.forEach(function (dot) {
                var d = dist(dot.x, dot.y, wx, wy);
                dot.en += Math.pow(env.range, d * 0.1);
            });
        };
        var this_1 = this;
        for (var iw = 0; iw <= 100; iw++) {
            _loop_1(iw);
        }
        this.dots_.forEach(function (dot) {
            var sz = ((1 - Math.pow(0.9, dot.en)) * env.maxSize) / DEFAULT_DOT_SIZE;
            dot.scale.set(sz);
        });
    };
    return Sketch;
}());
exports.Sketch = Sketch;


/***/ }),

/***/ "./src/doc/js/sp-menu.ts":
/*!*******************************!*\
  !*** ./src/doc/js/sp-menu.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SpMenu = void 0;
var SpMenu = /** @class */ (function () {
    function SpMenu(config) {
        this.expanded_ = false;
        this.onDocumentClick_ = this.onDocumentClick_.bind(this);
        this.onButtonClick_ = this.onButtonClick_.bind(this);
        this.onWindowHashChange_ = this.onWindowHashChange_.bind(this);
        this.onWindowScroll_ = this.onWindowScroll_.bind(this);
        this.buttonElem_ = config.buttonElement;
        this.menuElem_ = config.menuElement;
        this.menuElem_.classList.add('common-menu-loaded');
        document.addEventListener('click', this.onDocumentClick_);
        window.addEventListener('hashchange', this.onWindowHashChange_);
        window.addEventListener('scroll', this.onWindowScroll_);
        this.buttonElem_.addEventListener('click', this.onButtonClick_);
        this.updateActiveItem_();
    }
    Object.defineProperty(SpMenu.prototype, "expanded", {
        get: function () {
            return this.expanded_;
        },
        set: function (expanded) {
            this.expanded_ = expanded;
            if (this.expanded_) {
                this.menuElem_.classList.add('common-menu-expanded');
            }
            else {
                this.menuElem_.classList.remove('common-menu-expanded');
            }
        },
        enumerable: false,
        configurable: true
    });
    SpMenu.prototype.updateActiveItem_ = function () {
        var classNames = ['common-menuItem_anchor', 'common-submenuItem_anchor'];
        classNames.forEach(function (className) {
            var activeClass = className + "-active";
            var elems = Array.prototype.slice.call(document.querySelectorAll("." + activeClass));
            elems.forEach(function (elem) {
                elem.classList.remove(activeClass);
            });
        });
        classNames.forEach(function (className) {
            var comps = location.pathname.split('/');
            var lastComp = comps[comps.length - 1];
            var href = lastComp + location.hash;
            var elems = document.querySelector("." + className + "[href='" + href + "']");
            if (elems) {
                elems.classList.add(className + "-active");
            }
        });
    };
    SpMenu.prototype.onDocumentClick_ = function (ev) {
        var elem = ev.target;
        if (this.menuElem_.contains(elem)) {
            return;
        }
        if (elem === this.buttonElem_ || this.buttonElem_.contains(elem)) {
            return;
        }
        if (!this.expanded) {
            return;
        }
        ev.preventDefault();
        ev.stopImmediatePropagation();
        this.expanded = false;
    };
    SpMenu.prototype.onWindowScroll_ = function () {
        this.expanded = false;
    };
    SpMenu.prototype.onWindowHashChange_ = function () {
        this.updateActiveItem_();
    };
    SpMenu.prototype.onButtonClick_ = function () {
        this.expanded = true;
    };
    return SpMenu;
}());
exports.SpMenu = SpMenu;


/***/ }),

/***/ "./src/doc/js/util.ts":
/*!****************************!*\
  !*** ./src/doc/js/util.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.selectContainer = void 0;
function selectContainer(marker) {
    return document.querySelector(".common-paneContainer-" + marker);
}
exports.selectContainer = selectContainer;


/***/ })

/******/ });