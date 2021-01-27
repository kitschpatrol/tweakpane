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
var quick_tour_1 = __webpack_require__(/*! ./route/quick-tour */ "./src/doc/js/route/quick-tour.ts");
var theming_1 = __webpack_require__(/*! ./route/theming */ "./src/doc/js/route/theming.ts");
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
    router.add(theming_1.ThemingRoute);
    router.add(quick_tour_1.QuickTourRoute);
    router.add(ui_components_1.UiComponentsRoute);
    router.route(location.pathname);
    setUpScrews();
    setUpSpMenu();
    hljs.initHighlightingOnLoad();
})();


/***/ }),

/***/ "./src/doc/js/panepaint.ts":
/*!*********************************!*\
  !*** ./src/doc/js/panepaint.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCss = exports.createPane = void 0;
var ColorConverter = __webpack_require__(/*! ../../main/js/converter/color */ "./src/main/js/converter/color.ts");
var color_1 = __webpack_require__(/*! ../../main/js/model/color */ "./src/main/js/model/color.ts");
var Themes = __webpack_require__(/*! ./themes */ "./src/doc/js/themes.ts");
var GROUPS = [
    {
        name: 'Base',
        expanded: true,
        props: ['base-background-color', 'base-shadow-color'],
        label: function (prop) {
            var m = prop.match(/^base-(.+)-color$/);
            return (m && m[1]) || prop;
        },
    },
    {
        name: 'Input',
        props: [
            'input-foreground-color',
            'input-guide-color',
            'input-background-color',
            'input-background-color:state',
        ],
        label: function (prop) {
            var m = prop.match(/^input-(.+)-color(-.+)?$/);
            return (m && "" + m[1] + (m[2] || '')) || prop;
        },
    },
    {
        name: 'Monitor',
        props: ['monitor-foreground-color', 'monitor-background-color'],
        label: function (prop) {
            var m = prop.match(/^monitor-(.+)-color(-.+)?$/);
            return (m && "" + m[1] + (m[2] || '')) || prop;
        },
    },
    {
        name: 'Button',
        props: [
            'button-foreground-color',
            'button-background-color',
            'button-background-color:state',
        ],
        label: function (prop) {
            var m = prop.match(/^button-(.+)-color(-.+)?$/);
            return (m && "" + m[1] + (m[2] || '')) || prop;
        },
    },
    {
        name: 'Folder',
        props: [
            'folder-foreground-color',
            'folder-background-color',
            'folder-background-color:state',
        ],
        label: function (prop) {
            var m = prop.match(/^folder-(.+)-color(-.+)?$/);
            return (m && "" + m[1] + (m[2] || '')) || prop;
        },
    },
    {
        name: 'Misc',
        expanded: true,
        props: ['label-foreground-color', 'separator-color'],
        label: function (prop) {
            var m = prop.match(/^(.+)-color(-.+)?$/);
            return (m && "" + m[1] + (m[2] || '')) || prop;
        },
    },
];
function createPane(container, theme) {
    var pane = new Tweakpane({
        container: container,
        title: 'Panepaint',
    });
    var presetObj = {
        preset: 'Select...',
    };
    pane
        .addInput(presetObj, 'preset', {
        options: {
            'Select...': '',
            Default: 'default',
            Iceberg: 'iceberg',
            Jetblack: 'jetblack',
            Light: 'light',
            Retro: 'retro',
            Translucent: 'translucent',
        },
    })
        .on('change', function (value) {
        if (value === '') {
            return;
        }
        var t = Themes.create(value);
        Object.keys(t).forEach(function (prop) {
            theme[prop] = t[prop];
        });
        presetObj.preset = '';
        pane.refresh();
    });
    pane
        .addButton({
        title: 'Shuffle background image',
    })
        .on('click', function () {
        var bgElem = document.querySelector('.common-paint_bgImage');
        if (!bgElem) {
            return;
        }
        var now = new Date().getTime();
        bgElem.style.backgroundImage = "url(https://source.unsplash.com/collection/91620523?date=" + now + ")";
        var creditElems = Array.prototype.slice.call(document.querySelectorAll('.common-paint .common-photoCredit'));
        creditElems.forEach(function (elem, index) {
            elem.style.visibility = index === 0 ? 'visible' : 'hidden';
        });
    });
    GROUPS.forEach(function (group) {
        var f = pane.addFolder({
            expanded: !!group.expanded,
            title: group.name,
        });
        group.props.forEach(function (prop) {
            var m = prop.match(/(.+):state$/);
            if (!m) {
                f.addInput(theme, prop, {
                    label: group
                        .label(prop)
                        .replace('background', 'bg')
                        .replace('foreground', 'fg'),
                });
                return;
            }
            var sf = f.addFolder({
                title: 'State',
            });
            sf.addButton({
                title: 'Autofill',
            }).on('click', function () {
                var value = theme[m[1]];
                var c = ColorConverter.fromString(value);
                var hslComps = c.getComponents('hsl');
                var sign = hslComps[2] > 50 ? -1 : +1;
                theme[m[1] + "-hover"] = ColorConverter.toFunctionalRgbaString(new color_1.Color([hslComps[0], hslComps[1], hslComps[2] + 5 * sign, hslComps[3]], 'hsl'));
                theme[m[1] + "-focus"] = ColorConverter.toFunctionalRgbaString(new color_1.Color([hslComps[0], hslComps[1], hslComps[2] + 10 * sign, hslComps[3]], 'hsl'));
                theme[m[1] + "-active"] = ColorConverter.toFunctionalRgbaString(new color_1.Color([hslComps[0], hslComps[1], hslComps[2] + 15 * sign, hslComps[3]], 'hsl'));
                pane.refresh();
            });
            var baseProp = m[1];
            ['active', 'focus', 'hover'].forEach(function (state) {
                var prop = [baseProp, state].join('-');
                sf.addInput(theme, prop, {
                    label: group
                        .label(prop)
                        .replace('background', 'bg')
                        .replace('foreground', 'fg'),
                });
            });
        });
    });
    return pane;
}
exports.createPane = createPane;
function toCss(selector, theme) {
    var decls = Object.keys(theme).reduce(function (result, key) {
        var a = theme[key];
        return [].concat(result, "  --tp-" + key + ": " + a + ";");
    }, []);
    return __spreadArrays([selector + " {"], decls, ['}']).join('\n');
}
exports.toCss = toCss;


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
            hello: function (container) {
                new Tweakpane({
                    container: container,
                });
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer2(marker);
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
        var wavet = 0;
        setInterval(function () {
            SHARED_PARAMS.wave = Util.wave(wavet);
            SHARED_PARAMS.positive = SHARED_PARAMS.wave >= 0;
            wavet += 1;
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

/***/ "./src/doc/js/route/quick-tour.ts":
/*!****************************************!*\
  !*** ./src/doc/js/route/quick-tour.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickTourRoute = void 0;
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
exports.QuickTourRoute = {
    pathname: /^(\/tweakpane)?\/quick-tour\.html$/,
    init: function () {
        var markerToFnMap = {
            inputs: function (container) {
                var PARAMS = {
                    factor: 123,
                    title: 'hello',
                    color: '#0f0',
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'factor');
                pane.addInput(PARAMS, 'title');
                pane.addInput(PARAMS, 'color');
            },
            inputparams: function (container) {
                var PARAMS = {
                    percentage: 50,
                    theme: 'dark',
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'percentage', {
                    min: 0,
                    max: 100,
                    step: 10,
                });
                pane.addInput(PARAMS, 'theme', {
                    options: {
                        Dark: 'dark',
                        Light: 'light',
                    },
                });
            },
            folders: function (container) {
                var PARAMS = {
                    factor: 123,
                    text: 'hello',
                    size: 16,
                };
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'factor');
                var f = pane.addFolder({
                    title: 'Title',
                    expanded: true,
                });
                f.addInput(PARAMS, 'text');
                f.addInput(PARAMS, 'size', {
                    min: 8,
                    max: 100,
                    step: 1,
                });
            },
            title: function (container) {
                var PARAMS = {
                    factor: 123,
                    text: 'hello',
                    size: 16,
                };
                var pane = new Tweakpane({
                    container: container,
                    title: 'Parameters',
                });
                pane.addInput(PARAMS, 'factor');
                var f = pane.addFolder({
                    title: 'Title',
                    expanded: true,
                });
                f.addInput(PARAMS, 'text');
                f.addInput(PARAMS, 'size', {
                    min: 8,
                    max: 100,
                    step: 1,
                });
            },
            events: function (container) {
                var consoleElem = Util.selectContainer2('eventsconsole');
                if (!consoleElem) {
                    return;
                }
                var PARAMS = {
                    log: '',
                    size: 16,
                };
                var consolePane = new Tweakpane({
                    container: consoleElem,
                });
                consolePane.addMonitor(PARAMS, 'log', {
                    count: 100,
                    interval: 0,
                    label: 'console',
                });
                var pane = new Tweakpane({
                    container: container,
                });
                pane
                    .addInput(PARAMS, 'size', {
                    min: 8,
                    max: 100,
                    step: 1,
                })
                    .on('change', function (value) {
                    PARAMS.log = "change: " + value;
                    consolePane.refresh();
                });
            },
            preset: function (container) {
                var consoleElem = Util.selectContainer2('presetconsole');
                if (!consoleElem) {
                    return;
                }
                var PARAMS = {
                    factor: 50,
                    title: 'hello',
                    color: '#0f0',
                    log: '',
                };
                var consolePane = new Tweakpane({
                    container: consoleElem,
                });
                consolePane.addMonitor(PARAMS, 'log', {
                    interval: 0,
                    label: 'preset',
                    multiline: true,
                });
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addInput(PARAMS, 'factor', {
                    min: 0,
                    max: 100,
                    step: 1,
                });
                pane.addInput(PARAMS, 'title');
                pane.addInput(PARAMS, 'color');
                pane.addSeparator();
                pane
                    .addButton({
                    title: 'Export',
                })
                    .on('click', function () {
                    var preset = pane.exportPreset();
                    PARAMS.log = JSON.stringify(preset, undefined, 2);
                    consolePane.refresh();
                });
            },
            monitors: function (container) {
                var PARAMS = {
                    signal: 0,
                };
                var t = 0;
                setInterval(function () {
                    PARAMS.signal = Util.wave(t);
                    t += 1;
                }, 50);
                var pane = new Tweakpane({
                    container: container,
                });
                pane.addMonitor(PARAMS, 'signal', {
                    view: 'graph',
                    min: -1,
                    max: +1,
                });
            },
        };
        Object.keys(markerToFnMap).forEach(function (marker) {
            var initFn = markerToFnMap[marker];
            var container = Util.selectContainer2(marker);
            initFn(container);
        });
    },
};


/***/ }),

/***/ "./src/doc/js/route/theming.ts":
/*!*************************************!*\
  !*** ./src/doc/js/route/theming.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemingRoute = void 0;
var panepaint_1 = __webpack_require__(/*! ../panepaint */ "./src/doc/js/panepaint.ts");
var Themes = __webpack_require__(/*! ../themes */ "./src/doc/js/themes.ts");
var Util = __webpack_require__(/*! ../util */ "./src/doc/js/util.ts");
function applyPreviewHtml(selector, theme, comment) {
    var elem = document.querySelector(selector);
    if (!elem) {
        return;
    }
    elem.textContent = [
        "<!-- " + comment + " -->",
        '<style>',
        panepaint_1.toCss(':root', theme),
        '</style>',
    ].join('\n');
    hljs.highlightBlock(elem);
}
function applyTheme(_a) {
    var styleElem = _a.styleElem, theme = _a.theme;
    styleElem.textContent = panepaint_1.toCss('*[data-preview-css]', theme);
    applyPreviewHtml('*[data-preview-code]', theme, 'Append this element into your head element to apply the theme');
}
function createPreviewPane(containerElem) {
    var PARAMS = {
        color: 'rgba(0, 0, 0, 0)',
        point2d: { x: 0, y: 0 },
        slider: 0,
        text: 'text',
        monitor: [0, 1, 2, 3].map(function () { return Math.random().toFixed(2); }).join('\n'),
    };
    var pane = new Tweakpane({
        container: containerElem,
        title: 'Preview',
    });
    pane.addInput(PARAMS, 'text');
    pane.addInput(PARAMS, 'slider', {
        max: 64,
        min: 0,
    });
    pane.addButton({
        title: 'button',
    });
    pane.addSeparator();
    pane.addMonitor(PARAMS, 'monitor', {
        interval: 0,
        multiline: true,
    });
    pane
        .addFolder({
        title: 'folder',
    })
        .addInput(PARAMS, 'color');
    pane
        .addFolder({
        title: 'folder',
    })
        .addInput(PARAMS, 'point2d');
    return pane;
}
exports.ThemingRoute = {
    pathname: /^(\/tweakpane)?\/theming\.html$/,
    init: function () {
        var styleElem = document.createElement('style');
        document.head.appendChild(styleElem);
        var controllerElem = Util.selectContainer('controller');
        var previewElem = Util.selectContainer('preview');
        if (!controllerElem || !previewElem) {
            return;
        }
        var theme = Themes.create('translucent');
        applyPreviewHtml('*[data-exampleCss]', theme, 'Example theme: Translucent');
        var pane = panepaint_1.createPane(controllerElem, theme);
        applyTheme({
            styleElem: styleElem,
            theme: theme,
        });
        pane.on('change', function () {
            applyTheme({
                styleElem: styleElem,
                theme: theme,
            });
        });
        createPreviewPane(previewElem);
        var markerToFnMap = {
            header: function (container) {
                if (container) {
                    createPreviewPane(container);
                }
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

/***/ "./src/doc/js/themes.ts":
/*!******************************!*\
  !*** ./src/doc/js/themes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var ID_TO_THEME_MAP = {
    default: function () { return ({
        'base-background-color': 'hsla(230, 7%, 20%, 1)',
        'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
        'button-background-color': 'hsla(230, 7%, 70%, 1)',
        'button-background-color-active': 'hsla(230, 7%, 85%, 1)',
        'button-background-color-focus': 'hsla(230, 7%, 80%, 1)',
        'button-background-color-hover': 'hsla(230, 7%, 75%, 1)',
        'button-foreground-color': 'hsla(230, 7%, 20%, 1)',
        'folder-background-color': 'hsla(230, 7%, 80%, 0.1)',
        'folder-background-color-active': 'hsla(230, 7%, 80%, 0.25)',
        'folder-background-color-focus': 'hsla(230, 7%, 80%, 0.2)',
        'folder-background-color-hover': 'hsla(230, 7%, 80%, 0.15)',
        'folder-foreground-color': 'hsla(230, 7%, 70%, 1)',
        'input-background-color': 'hsla(230, 7%, 70%, 0.15)',
        'input-background-color-active': 'hsla(230, 7%, 70%, 0.35)',
        'input-background-color-focus': 'hsla(230, 7%, 70%, 0.25)',
        'input-background-color-hover': 'hsla(230, 7%, 70%, 0.15)',
        'input-foreground-color': 'hsla(230, 7%, 70%, 1)',
        'input-guide-color': 'hsla(230, 7%, 20%, 0.5)',
        'monitor-background-color': 'hsla(230, 7%, 10%, 0.5)',
        'monitor-foreground-color': 'hsla(230, 7%, 70%, 0.7)',
        'label-foreground-color': 'hsla(230, 7%, 70%, 0.8)',
        'separator-color': 'hsla(230, 7%, 10%, 0.3)',
    }); },
    jetblack: function () { return ({
        'base-background-color': 'hsla(0, 0%, 0%, 1)',
        'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
        'button-background-color': 'hsla(0, 0%, 70%, 1)',
        'button-background-color-active': 'hsla(0, 0%, 85%, 1)',
        'button-background-color-focus': 'hsla(0, 0%, 80%, 1)',
        'button-background-color-hover': 'hsla(0, 0%, 75%, 1)',
        'button-foreground-color': 'hsla(0, 0%, 0%, 1)',
        'folder-background-color': 'hsla(0, 0%, 10%, 1)',
        'folder-background-color-active': 'hsla(0, 0%, 25%, 1)',
        'folder-background-color-focus': 'hsla(0, 0%, 20%, 1)',
        'folder-background-color-hover': 'hsla(0, 0%, 15%, 1)',
        'folder-foreground-color': 'hsla(0, 0%, 50%, 1)',
        'input-background-color': 'hsla(0, 0%, 10%, 1)',
        'input-background-color-active': 'hsla(0, 0%, 25%, 1)',
        'input-background-color-focus': 'hsla(0, 0%, 20%, 1)',
        'input-background-color-hover': 'hsla(0, 0%, 15%, 1)',
        'input-foreground-color': 'hsla(0, 0%, 70%, 1)',
        'input-guide-color': 'hsla(0, 0%, 100%, 0.05)',
        'monitor-background-color': 'hsla(0, 0%, 8%, 1)',
        'monitor-foreground-color': 'hsla(0, 0%, 48%, 1)',
        'label-foreground-color': 'hsla(0, 0%, 50%, 1)',
        'separator-color': 'hsla(0, 0%, 10%, 1)',
    }); },
    light: function () { return ({
        'base-background-color': 'hsla(230, 5%, 90%, 1)',
        'base-shadow-color': 'hsla(0, 0%, 0%, 0.1)',
        'button-background-color': 'hsla(230, 5%, 70%, 1)',
        'button-background-color-active': 'hsla(230, 5%, 55%, 1)',
        'button-background-color-focus': 'hsla(230, 5%, 60%, 1)',
        'button-background-color-hover': 'hsla(230, 5%, 65%, 1)',
        'button-foreground-color': 'hsla(230, 5%, 20%, 1)',
        'folder-background-color': 'hsla(230, 5%, 80%, 1)',
        'folder-background-color-active': 'hsla(230, 5%, 65%, 1)',
        'folder-background-color-focus': 'hsla(230, 5%, 70%, 1)',
        'folder-background-color-hover': 'hsla(230, 5%, 75%, 1)',
        'folder-foreground-color': 'hsla(230, 5%, 30%, 1)',
        'input-background-color': 'hsla(230, 5%, 85%, 1)',
        'input-background-color-active': 'hsla(230, 5%, 70%, 1)',
        'input-background-color-focus': 'hsla(230, 5%, 75%, 1)',
        'input-background-color-hover': 'hsla(230, 5%, 80%, 1)',
        'input-foreground-color': 'hsla(230, 5%, 30%, 1)',
        'input-guide-color': 'hsla(230, 5%, 30%, 0.1)',
        'monitor-background-color': 'hsla(230, 5%, 80%, 1)',
        'monitor-foreground-color': 'hsla(230, 5%, 60%, 1)',
        'label-foreground-color': 'hsla(230, 5%, 50%, 1)',
        'separator-color': 'hsla(230, 5%, 85%, 1)',
    }); },
    iceberg: function () { return ({
        'base-background-color': 'hsla(230, 20%, 11%, 1)',
        'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
        'button-background-color': 'hsla(230, 10%, 80%, 1)',
        'button-background-color-active': 'hsla(230, 10%, 95%, 1)',
        'button-background-color-focus': 'hsla(230, 10%, 90%, 1)',
        'button-background-color-hover': 'hsla(230, 10%, 85%, 1)',
        'button-foreground-color': 'hsla(230, 20%, 11%, 1)',
        'folder-background-color': 'hsla(230, 25%, 16%, 1)',
        'folder-background-color-active': 'hsla(230, 25%, 31%, 1)',
        'folder-background-color-focus': 'hsla(230, 25%, 26%, 1)',
        'folder-background-color-hover': 'hsla(230, 25%, 21%, 1)',
        'folder-foreground-color': 'hsla(230, 10%, 80%, 1)',
        'input-background-color': 'hsla(230, 20%, 16%, 1)',
        'input-background-color-active': 'hsla(230, 28%, 31%, 1)',
        'input-background-color-focus': 'hsla(230, 28%, 26%, 1)',
        'input-background-color-hover': 'hsla(230, 20%, 21%, 1)',
        'input-foreground-color': 'hsla(230, 10%, 80%, 1)',
        'input-guide-color': 'hsla(230, 10%, 80%, 5%)',
        'monitor-background-color': 'hsla(230, 20%, 8%, 1)',
        'monitor-foreground-color': 'hsla(230, 12%, 48%, 1)',
        'label-foreground-color': 'hsla(230, 12%, 48%, 1)',
        'separator-color': 'hsla(230, 20%, 8%, 1)',
    }); },
    retro: function () { return ({
        'base-background-color': 'hsla(40, 3%, 90%, 1)',
        'base-shadow-color': 'hsla(0, 0%, 0%, 0.3)',
        'button-background-color': 'hsla(40, 3%, 70%, 1)',
        'button-background-color-active': 'hsla(40, 3%, 55%, 1)',
        'button-background-color-focus': 'hsla(40, 3%, 60%, 1)',
        'button-background-color-hover': 'hsla(40, 3%, 65%, 1)',
        'button-foreground-color': 'hsla(40, 3%, 20%, 1)',
        'folder-background-color': 'hsla(40, 3%, 40%, 1)',
        'folder-background-color-active': 'hsla(34, 3%, 55%, 1)',
        'folder-background-color-focus': 'hsla(43, 3%, 50%, 1)',
        'folder-background-color-hover': 'hsla(43, 3%, 45%, 1)',
        'folder-foreground-color': 'hsla(40, 3%, 70%, 1)',
        'input-background-color': 'hsla(120, 3%, 20%, 1)',
        'input-background-color-active': 'hsla(120, 3%, 35%, 1)',
        'input-background-color-focus': 'hsla(120, 3%, 30%, 1)',
        'input-background-color-hover': 'hsla(120, 3%, 25%, 1)',
        'input-foreground-color': 'hsla(120, 40%, 60%, 1)',
        'input-guide-color': 'hsla(120, 40%, 60%, 0.1)',
        'monitor-background-color': 'hsla(120, 3%, 20%, 0.8)',
        'monitor-foreground-color': 'hsla(120, 40%, 60%, 0.8)',
        'label-foreground-color': 'hsla(40, 3%, 50%, 1)',
        'separator-color': 'hsla(40, 3%, 40%, 1)',
    }); },
    translucent: function () { return ({
        'base-background-color': 'hsla(0, 0%, 10%, 0.8)',
        'base-shadow-color': 'hsla(0, 0%, 0%, 0.2)',
        'button-background-color': 'hsla(0, 0%, 100%, 0.5)',
        'button-background-color-active': 'hsla(0, 0%, 100%, 0.8)',
        'button-background-color-focus': 'hsla(0, 0%, 100%, 0.7)',
        'button-background-color-hover': 'hsla(0, 0%, 100%, 0.6)',
        'button-foreground-color': 'hsla(0, 0%, 0%, 0.8)',
        'folder-background-color': 'hsla(0, 0%, 0%, 0.3)',
        'folder-background-color-active': 'hsla(0, 0%, 0%, 0.6)',
        'folder-background-color-focus': 'hsla(0, 0%, 0%, 0.5)',
        'folder-background-color-hover': 'hsla(0, 0%, 0%, 0.4)',
        'folder-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
        'input-background-color': 'hsla(0, 0%, 0%, 0.3)',
        'input-background-color-active': 'hsla(0, 0%, 0%, 0.6)',
        'input-background-color-focus': 'hsla(0, 0%, 0%, 0.5)',
        'input-background-color-hover': 'hsla(0, 0%, 0%, 0.4)',
        'input-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
        'input-guide-color': 'hsla(0, 0%, 100%, 0.1)',
        'monitor-background-color': 'hsla(0, 0%, 0%, 0.3)',
        'monitor-foreground-color': 'hsla(0, 0%, 100%, 0.3)',
        'label-foreground-color': 'hsla(0, 0%, 100%, 0.5)',
        'separator-color': 'hsla(0, 0%, 0%, 0.2)',
    }); },
};
function create(id) {
    return ID_TO_THEME_MAP[id]();
}
exports.create = create;


/***/ }),

/***/ "./src/doc/js/util.ts":
/*!****************************!*\
  !*** ./src/doc/js/util.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.wave = exports.selectContainer2 = exports.selectContainer = void 0;
function selectContainer(marker) {
    return document.querySelector(".common-paneContainer-" + marker);
}
exports.selectContainer = selectContainer;
function selectContainer2(marker) {
    return document.querySelector("*[data-pane-" + marker + "]");
}
exports.selectContainer2 = selectContainer2;
function wave(t) {
    var p = t * 0.02;
    return (((3 * 4) / Math.PI) *
        (Math.sin(p * 1 * Math.PI) +
            Math.sin(p * 3 * Math.PI) / 3 +
            Math.sin(p * 5 * Math.PI) / 5) *
        0.25);
}
exports.wave = wave;


/***/ }),

/***/ "./src/main/js/converter/color.ts":
/*!****************************************!*\
  !*** ./src/main/js/converter/color.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.toRgbaNumber = exports.toRgbNumber = exports.getStringifier = exports.toFunctionalHslaString = exports.toFunctionalHslString = exports.toFunctionalRgbaString = exports.toFunctionalRgbString = exports.toHexRgbaString = exports.toHexRgbString = exports.fromNumberToRgba = exports.fromNumberToRgb = exports.fromObject = exports.fromString = void 0;
var number_1 = __webpack_require__(/*! ../formatter/number */ "./src/main/js/formatter/number.ts");
var percentage_1 = __webpack_require__(/*! ../formatter/percentage */ "./src/main/js/formatter/percentage.ts");
var ColorModel = __webpack_require__(/*! ../misc/color-model */ "./src/main/js/misc/color-model.ts");
var number_util_1 = __webpack_require__(/*! ../misc/number-util */ "./src/main/js/misc/number-util.ts");
var color_1 = __webpack_require__(/*! ../model/color */ "./src/main/js/model/color.ts");
var NumberColorParser = __webpack_require__(/*! ../parser/number-color */ "./src/main/js/parser/number-color.ts");
var StringColorParser = __webpack_require__(/*! ../parser/string-color */ "./src/main/js/parser/string-color.ts");
function createEmptyColor() {
    return new color_1.Color([0, 0, 0], 'rgb');
}
/**
 * @hidden
 */
function fromString(value) {
    if (typeof value === 'string') {
        var cv = StringColorParser.CompositeParser(value);
        if (cv) {
            return cv;
        }
    }
    return createEmptyColor();
}
exports.fromString = fromString;
/**
 * @hidden
 */
function fromObject(value) {
    if (color_1.Color.isColorObject(value)) {
        return color_1.Color.fromObject(value);
    }
    return createEmptyColor();
}
exports.fromObject = fromObject;
/**
 * @hidden
 */
function fromNumberToRgb(value) {
    if (typeof value === 'number') {
        var cv = NumberColorParser.RgbParser(value);
        if (cv) {
            return cv;
        }
    }
    return createEmptyColor();
}
exports.fromNumberToRgb = fromNumberToRgb;
/**
 * @hidden
 */
function fromNumberToRgba(value) {
    if (typeof value === 'number') {
        var cv = NumberColorParser.RgbaParser(value);
        if (cv) {
            return cv;
        }
    }
    return createEmptyColor();
}
exports.fromNumberToRgba = fromNumberToRgba;
function zerofill(comp) {
    var hex = number_util_1.NumberUtil.constrain(Math.floor(comp), 0, 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}
/**
 * @hidden
 */
function toHexRgbString(value) {
    var hexes = ColorModel.withoutAlpha(value.getComponents('rgb'))
        .map(zerofill)
        .join('');
    return "#" + hexes;
}
exports.toHexRgbString = toHexRgbString;
/**
 * @hidden
 */
function toHexRgbaString(value) {
    var rgbaComps = value.getComponents('rgb');
    var hexes = [rgbaComps[0], rgbaComps[1], rgbaComps[2], rgbaComps[3] * 255]
        .map(zerofill)
        .join('');
    return "#" + hexes;
}
exports.toHexRgbaString = toHexRgbaString;
/**
 * @hidden
 */
function toFunctionalRgbString(value) {
    var formatter = new number_1.NumberFormatter(0);
    var comps = ColorModel.withoutAlpha(value.getComponents('rgb')).map(function (comp) { return formatter.format(comp); });
    return "rgb(" + comps.join(', ') + ")";
}
exports.toFunctionalRgbString = toFunctionalRgbString;
/**
 * @hidden
 */
function toFunctionalRgbaString(value) {
    var aFormatter = new number_1.NumberFormatter(2);
    var rgbFormatter = new number_1.NumberFormatter(0);
    var comps = value.getComponents('rgb').map(function (comp, index) {
        var formatter = index === 3 ? aFormatter : rgbFormatter;
        return formatter.format(comp);
    });
    return "rgba(" + comps.join(', ') + ")";
}
exports.toFunctionalRgbaString = toFunctionalRgbaString;
/**
 * @hidden
 */
function toFunctionalHslString(value) {
    var formatters = [
        new number_1.NumberFormatter(0),
        new percentage_1.PercentageFormatter(),
        new percentage_1.PercentageFormatter(),
    ];
    var comps = ColorModel.withoutAlpha(value.getComponents('hsl')).map(function (comp, index) { return formatters[index].format(comp); });
    return "hsl(" + comps.join(', ') + ")";
}
exports.toFunctionalHslString = toFunctionalHslString;
/**
 * @hidden
 */
function toFunctionalHslaString(value) {
    var formatters = [
        new number_1.NumberFormatter(0),
        new percentage_1.PercentageFormatter(),
        new percentage_1.PercentageFormatter(),
        new number_1.NumberFormatter(2),
    ];
    var comps = value
        .getComponents('hsl')
        .map(function (comp, index) { return formatters[index].format(comp); });
    return "hsla(" + comps.join(', ') + ")";
}
exports.toFunctionalHslaString = toFunctionalHslaString;
var NOTATION_TO_STRINGIFIER_MAP = {
    'func.hsl': toFunctionalHslString,
    'func.hsla': toFunctionalHslaString,
    'func.rgb': toFunctionalRgbString,
    'func.rgba': toFunctionalRgbaString,
    'hex.rgb': toHexRgbString,
    'hex.rgba': toHexRgbaString,
};
function getStringifier(notation) {
    return NOTATION_TO_STRINGIFIER_MAP[notation];
}
exports.getStringifier = getStringifier;
/**
 * @hidden
 */
function toRgbNumber(value) {
    return ColorModel.withoutAlpha(value.getComponents('rgb')).reduce(function (result, comp) {
        return (result << 8) | (Math.floor(comp) & 0xff);
    }, 0);
}
exports.toRgbNumber = toRgbNumber;
/**
 * @hidden
 */
function toRgbaNumber(value) {
    return value.getComponents('rgb').reduce(function (result, comp, index) {
        var hex = Math.floor(index === 3 ? comp * 255 : comp) & 0xff;
        return (result << 8) | hex;
    }, 0);
}
exports.toRgbaNumber = toRgbaNumber;


/***/ }),

/***/ "./src/main/js/formatter/number.ts":
/*!*****************************************!*\
  !*** ./src/main/js/formatter/number.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberFormatter = void 0;
/**
 * @hidden
 */
var NumberFormatter = /** @class */ (function () {
    function NumberFormatter(digits) {
        this.digits_ = digits;
    }
    Object.defineProperty(NumberFormatter.prototype, "digits", {
        get: function () {
            return this.digits_;
        },
        enumerable: false,
        configurable: true
    });
    NumberFormatter.prototype.format = function (value) {
        return value.toFixed(Math.max(Math.min(this.digits_, 20), 0));
    };
    return NumberFormatter;
}());
exports.NumberFormatter = NumberFormatter;


/***/ }),

/***/ "./src/main/js/formatter/percentage.ts":
/*!*********************************************!*\
  !*** ./src/main/js/formatter/percentage.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentageFormatter = void 0;
var number_1 = __webpack_require__(/*! ./number */ "./src/main/js/formatter/number.ts");
var innerFormatter = new number_1.NumberFormatter(0);
/**
 * @hidden
 */
var PercentageFormatter = /** @class */ (function () {
    function PercentageFormatter() {
    }
    PercentageFormatter.prototype.format = function (value) {
        return innerFormatter.format(value) + '%';
    };
    return PercentageFormatter;
}());
exports.PercentageFormatter = PercentageFormatter;


/***/ }),

/***/ "./src/main/js/misc/color-model.ts":
/*!*****************************************!*\
  !*** ./src/main/js/misc/color-model.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMode = exports.withAlpha = exports.withoutAlpha = exports.opaque = exports.hsvToRgb = void 0;
var number_util_1 = __webpack_require__(/*! ./number-util */ "./src/main/js/misc/number-util.ts");
function rgbToHsl(r, g, b) {
    var rp = number_util_1.NumberUtil.constrain(r / 255, 0, 1);
    var gp = number_util_1.NumberUtil.constrain(g / 255, 0, 1);
    var bp = number_util_1.NumberUtil.constrain(b / 255, 0, 1);
    var cmax = Math.max(rp, gp, bp);
    var cmin = Math.min(rp, gp, bp);
    var c = cmax - cmin;
    var h = 0;
    var s = 0;
    var l = (cmin + cmax) / 2;
    if (c !== 0) {
        s = l > 0.5 ? c / (2 - cmin - cmax) : c / (cmax + cmin);
        if (rp === cmax) {
            h = (gp - bp) / c;
        }
        else if (gp === cmax) {
            h = 2 + (bp - rp) / c;
        }
        else {
            h = 4 + (rp - gp) / c;
        }
        h = h / 6 + (h < 0 ? 1 : 0);
    }
    return [h * 360, s * 100, l * 100];
}
function hslToRgb(h, s, l) {
    var _a, _b, _c, _d, _e, _f;
    var hp = ((h % 360) + 360) % 360;
    var sp = number_util_1.NumberUtil.constrain(s / 100, 0, 1);
    var lp = number_util_1.NumberUtil.constrain(l / 100, 0, 1);
    var c = (1 - Math.abs(2 * lp - 1)) * sp;
    var x = c * (1 - Math.abs(((hp / 60) % 2) - 1));
    var m = lp - c / 2;
    var rp, gp, bp;
    if (hp >= 0 && hp < 60) {
        _a = [c, x, 0], rp = _a[0], gp = _a[1], bp = _a[2];
    }
    else if (hp >= 60 && hp < 120) {
        _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
    }
    else if (hp >= 120 && hp < 180) {
        _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
    }
    else if (hp >= 180 && hp < 240) {
        _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
    }
    else if (hp >= 240 && hp < 300) {
        _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
    }
    else {
        _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
    }
    return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
function rgbToHsv(r, g, b) {
    var rp = number_util_1.NumberUtil.constrain(r / 255, 0, 1);
    var gp = number_util_1.NumberUtil.constrain(g / 255, 0, 1);
    var bp = number_util_1.NumberUtil.constrain(b / 255, 0, 1);
    var cmax = Math.max(rp, gp, bp);
    var cmin = Math.min(rp, gp, bp);
    var d = cmax - cmin;
    var h;
    if (d === 0) {
        h = 0;
    }
    else if (cmax === rp) {
        h = 60 * (((((gp - bp) / d) % 6) + 6) % 6);
    }
    else if (cmax === gp) {
        h = 60 * ((bp - rp) / d + 2);
    }
    else {
        h = 60 * ((rp - gp) / d + 4);
    }
    var s = cmax === 0 ? 0 : d / cmax;
    var v = cmax;
    return [h, s * 100, v * 100];
}
/**
 * @hidden
 */
function hsvToRgb(h, s, v) {
    var _a, _b, _c, _d, _e, _f;
    var hp = number_util_1.NumberUtil.loop(h, 360);
    var sp = number_util_1.NumberUtil.constrain(s / 100, 0, 1);
    var vp = number_util_1.NumberUtil.constrain(v / 100, 0, 1);
    var c = vp * sp;
    var x = c * (1 - Math.abs(((hp / 60) % 2) - 1));
    var m = vp - c;
    var rp, gp, bp;
    if (hp >= 0 && hp < 60) {
        _a = [c, x, 0], rp = _a[0], gp = _a[1], bp = _a[2];
    }
    else if (hp >= 60 && hp < 120) {
        _b = [x, c, 0], rp = _b[0], gp = _b[1], bp = _b[2];
    }
    else if (hp >= 120 && hp < 180) {
        _c = [0, c, x], rp = _c[0], gp = _c[1], bp = _c[2];
    }
    else if (hp >= 180 && hp < 240) {
        _d = [0, x, c], rp = _d[0], gp = _d[1], bp = _d[2];
    }
    else if (hp >= 240 && hp < 300) {
        _e = [x, 0, c], rp = _e[0], gp = _e[1], bp = _e[2];
    }
    else {
        _f = [c, 0, x], rp = _f[0], gp = _f[1], bp = _f[2];
    }
    return [(rp + m) * 255, (gp + m) * 255, (bp + m) * 255];
}
exports.hsvToRgb = hsvToRgb;
/**
 * @hidden
 */
function opaque(comps) {
    return [comps[0], comps[1], comps[2], 1];
}
exports.opaque = opaque;
/**
 * @hidden
 */
function withoutAlpha(comps) {
    return [comps[0], comps[1], comps[2]];
}
exports.withoutAlpha = withoutAlpha;
/**
 * @hidden
 */
function withAlpha(comps, alpha) {
    return [comps[0], comps[1], comps[2], alpha];
}
exports.withAlpha = withAlpha;
var MODE_CONVERTER_MAP = {
    hsl: {
        hsl: function (h, s, l) { return [h, s, l]; },
        hsv: function (h, s, l) {
            var _a = hslToRgb(h, s, l), r = _a[0], g = _a[1], b = _a[2];
            return rgbToHsv(r, g, b);
        },
        rgb: hslToRgb,
    },
    hsv: {
        hsl: function (h, s, v) {
            var _a = hsvToRgb(h, s, v), r = _a[0], g = _a[1], b = _a[2];
            return rgbToHsl(r, g, b);
        },
        hsv: function (h, s, v) { return [h, s, v]; },
        rgb: hsvToRgb,
    },
    rgb: {
        hsl: rgbToHsl,
        hsv: rgbToHsv,
        rgb: function (r, g, b) { return [r, g, b]; },
    },
};
/**
 * @hidden
 */
function convertMode(components, fromMode, toMode) {
    var _a;
    return (_a = MODE_CONVERTER_MAP[fromMode])[toMode].apply(_a, components);
}
exports.convertMode = convertMode;


/***/ }),

/***/ "./src/main/js/misc/number-util.ts":
/*!*****************************************!*\
  !*** ./src/main/js/misc/number-util.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtil = void 0;
exports.NumberUtil = {
    map: function (value, start1, end1, start2, end2) {
        var p = (value - start1) / (end1 - start1);
        return start2 + p * (end2 - start2);
    },
    getDecimalDigits: function (value) {
        var text = String(value.toFixed(10));
        var frac = text.split('.')[1];
        return frac.replace(/0+$/, '').length;
    },
    constrain: function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
    loop: function (value, max) {
        return ((value % max) + max) % max;
    },
};


/***/ }),

/***/ "./src/main/js/misc/type-util.ts":
/*!***************************************!*\
  !*** ./src/main/js/misc/type-util.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUtil = void 0;
exports.TypeUtil = {
    forceCast: function (v) {
        return v;
    },
    isEmpty: function (value) {
        return value === null || value === undefined;
    },
    getOrDefault: function (value, defaultValue) {
        return !exports.TypeUtil.isEmpty(value) ? value : defaultValue;
    },
    deepEqualsArray: function (a1, a2) {
        if (a1.length !== a2.length) {
            return false;
        }
        for (var i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    },
};


/***/ }),

/***/ "./src/main/js/model/color.ts":
/*!************************************!*\
  !*** ./src/main/js/model/color.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
var ColorModel = __webpack_require__(/*! ../misc/color-model */ "./src/main/js/misc/color-model.ts");
var number_util_1 = __webpack_require__(/*! ../misc/number-util */ "./src/main/js/misc/number-util.ts");
var type_util_1 = __webpack_require__(/*! ../misc/type-util */ "./src/main/js/misc/type-util.ts");
var CONSTRAINT_MAP = {
    hsl: function (comps) {
        return [
            number_util_1.NumberUtil.loop(comps[0], 360),
            number_util_1.NumberUtil.constrain(comps[1], 0, 100),
            number_util_1.NumberUtil.constrain(comps[2], 0, 100),
            number_util_1.NumberUtil.constrain(type_util_1.TypeUtil.getOrDefault(comps[3], 1), 0, 1),
        ];
    },
    hsv: function (comps) {
        return [
            number_util_1.NumberUtil.loop(comps[0], 360),
            number_util_1.NumberUtil.constrain(comps[1], 0, 100),
            number_util_1.NumberUtil.constrain(comps[2], 0, 100),
            number_util_1.NumberUtil.constrain(type_util_1.TypeUtil.getOrDefault(comps[3], 1), 0, 1),
        ];
    },
    rgb: function (comps) {
        return [
            number_util_1.NumberUtil.constrain(comps[0], 0, 255),
            number_util_1.NumberUtil.constrain(comps[1], 0, 255),
            number_util_1.NumberUtil.constrain(comps[2], 0, 255),
            number_util_1.NumberUtil.constrain(type_util_1.TypeUtil.getOrDefault(comps[3], 1), 0, 1),
        ];
    },
};
function isRgbColorComponent(obj, key) {
    if (typeof obj !== 'object' || type_util_1.TypeUtil.isEmpty(obj)) {
        return false;
    }
    return key in obj && typeof obj[key] === 'number';
}
/**
 * @hidden
 */
var Color = /** @class */ (function () {
    function Color(comps, mode) {
        this.mode_ = mode;
        this.comps_ = CONSTRAINT_MAP[mode](comps);
    }
    Color.fromObject = function (obj) {
        var comps = 'a' in obj ? [obj.r, obj.g, obj.b, obj.a] : [obj.r, obj.g, obj.b];
        return new Color(comps, 'rgb');
    };
    Color.toRgbaObject = function (color) {
        return color.toRgbaObject();
    };
    Color.isRgbColorObject = function (obj) {
        return (isRgbColorComponent(obj, 'r') &&
            isRgbColorComponent(obj, 'g') &&
            isRgbColorComponent(obj, 'b'));
    };
    Color.isRgbaColorObject = function (obj) {
        return this.isRgbColorObject(obj) && isRgbColorComponent(obj, 'a');
    };
    Color.isColorObject = function (obj) {
        return this.isRgbColorObject(obj);
    };
    Object.defineProperty(Color.prototype, "mode", {
        get: function () {
            return this.mode_;
        },
        enumerable: false,
        configurable: true
    });
    Color.prototype.getComponents = function (opt_mode) {
        return ColorModel.withAlpha(ColorModel.convertMode(ColorModel.withoutAlpha(this.comps_), this.mode_, opt_mode || this.mode_), this.comps_[3]);
    };
    Color.prototype.toRgbaObject = function () {
        var rgbComps = this.getComponents('rgb');
        // tslint:disable:object-literal-sort-keys
        return {
            r: rgbComps[0],
            g: rgbComps[1],
            b: rgbComps[2],
            a: rgbComps[3],
        };
        // tslint:enable:object-literal-sort-keys
    };
    return Color;
}());
exports.Color = Color;


/***/ }),

/***/ "./src/main/js/parser/number-color.ts":
/*!********************************************!*\
  !*** ./src/main/js/parser/number-color.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RgbaParser = exports.RgbParser = void 0;
var number_util_1 = __webpack_require__(/*! ../misc/number-util */ "./src/main/js/misc/number-util.ts");
var color_1 = __webpack_require__(/*! ../model/color */ "./src/main/js/model/color.ts");
/**
 * @hidden
 */
exports.RgbParser = function (num) {
    return new color_1.Color([(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff], 'rgb');
};
/**
 * @hidden
 */
exports.RgbaParser = function (num) {
    return new color_1.Color([
        (num >> 24) & 0xff,
        (num >> 16) & 0xff,
        (num >> 8) & 0xff,
        number_util_1.NumberUtil.map(num & 0xff, 0, 255, 0, 1),
    ], 'rgb');
};


/***/ }),

/***/ "./src/main/js/parser/string-color.ts":
/*!********************************************!*\
  !*** ./src/main/js/parser/string-color.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAlphaComponent = exports.CompositeParser = exports.getNotation = void 0;
var number_util_1 = __webpack_require__(/*! ../misc/number-util */ "./src/main/js/misc/number-util.ts");
var color_1 = __webpack_require__(/*! ../model/color */ "./src/main/js/model/color.ts");
function parseCssNumberOrPercentage(text, maxValue) {
    var m = text.match(/^(.+)%$/);
    if (!m) {
        return Math.min(parseFloat(text), maxValue);
    }
    return Math.min(parseFloat(m[1]) * 0.01 * maxValue, maxValue);
}
var ANGLE_TO_DEG_MAP = {
    deg: function (angle) { return angle; },
    grad: function (angle) { return (angle * 360) / 400; },
    rad: function (angle) { return (angle * 360) / (2 * Math.PI); },
    turn: function (angle) { return angle * 360; },
};
function parseCssNumberOrAngle(text) {
    var m = text.match(/^([0-9.]+?)(deg|grad|rad|turn)$/);
    if (!m) {
        return parseFloat(text);
    }
    var angle = parseFloat(m[1]);
    var unit = m[2];
    return ANGLE_TO_DEG_MAP[unit](angle);
}
var NOTATION_TO_PARSER_MAP = {
    'func.rgb': function (text) {
        var m = text.match(/^rgb\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        var comps = [
            parseCssNumberOrPercentage(m[1], 255),
            parseCssNumberOrPercentage(m[2], 255),
            parseCssNumberOrPercentage(m[3], 255),
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
            return null;
        }
        return new color_1.Color(comps, 'rgb');
    },
    'func.rgba': function (text) {
        var m = text.match(/^rgba\(\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        var comps = [
            parseCssNumberOrPercentage(m[1], 255),
            parseCssNumberOrPercentage(m[2], 255),
            parseCssNumberOrPercentage(m[3], 255),
            parseCssNumberOrPercentage(m[4], 1),
        ];
        if (isNaN(comps[0]) ||
            isNaN(comps[1]) ||
            isNaN(comps[2]) ||
            isNaN(comps[3])) {
            return null;
        }
        return new color_1.Color(comps, 'rgb');
    },
    'func.hsl': function (text) {
        var m = text.match(/^hsl\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        var comps = [
            parseCssNumberOrAngle(m[1]),
            parseCssNumberOrPercentage(m[2], 100),
            parseCssNumberOrPercentage(m[3], 100),
        ];
        if (isNaN(comps[0]) || isNaN(comps[1]) || isNaN(comps[2])) {
            return null;
        }
        return new color_1.Color(comps, 'hsl');
    },
    'func.hsla': function (text) {
        var m = text.match(/^hsla\(\s*([0-9A-Fa-f.]+(?:deg|grad|rad|turn)?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*,\s*([0-9A-Fa-f.]+%?)\s*\)$/);
        if (!m) {
            return null;
        }
        var comps = [
            parseCssNumberOrAngle(m[1]),
            parseCssNumberOrPercentage(m[2], 100),
            parseCssNumberOrPercentage(m[3], 100),
            parseCssNumberOrPercentage(m[4], 1),
        ];
        if (isNaN(comps[0]) ||
            isNaN(comps[1]) ||
            isNaN(comps[2]) ||
            isNaN(comps[3])) {
            return null;
        }
        return new color_1.Color(comps, 'hsl');
    },
    'hex.rgb': function (text) {
        var mRrggbb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
        if (mRrggbb) {
            return new color_1.Color([
                parseInt(mRrggbb[1] + mRrggbb[1], 16),
                parseInt(mRrggbb[2] + mRrggbb[2], 16),
                parseInt(mRrggbb[3] + mRrggbb[3], 16),
            ], 'rgb');
        }
        var mRgb = text.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
        if (mRgb) {
            return new color_1.Color([parseInt(mRgb[1], 16), parseInt(mRgb[2], 16), parseInt(mRgb[3], 16)], 'rgb');
        }
        return null;
    },
    'hex.rgba': function (text) {
        var mRrggbb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
        if (mRrggbb) {
            return new color_1.Color([
                parseInt(mRrggbb[1] + mRrggbb[1], 16),
                parseInt(mRrggbb[2] + mRrggbb[2], 16),
                parseInt(mRrggbb[3] + mRrggbb[3], 16),
                number_util_1.NumberUtil.map(parseInt(mRrggbb[4] + mRrggbb[4], 16), 0, 255, 0, 1),
            ], 'rgb');
        }
        var mRgb = text.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
        if (mRgb) {
            return new color_1.Color([
                parseInt(mRgb[1], 16),
                parseInt(mRgb[2], 16),
                parseInt(mRgb[3], 16),
                number_util_1.NumberUtil.map(parseInt(mRgb[4], 16), 0, 255, 0, 1),
            ], 'rgb');
        }
        return null;
    },
};
/**
 * @hidden
 */
function getNotation(text) {
    var notations = Object.keys(NOTATION_TO_PARSER_MAP);
    return notations.reduce(function (result, notation) {
        if (result) {
            return result;
        }
        var subparser = NOTATION_TO_PARSER_MAP[notation];
        return subparser(text) ? notation : null;
    }, null);
}
exports.getNotation = getNotation;
/**
 * @hidden
 */
exports.CompositeParser = function (text) {
    var notation = getNotation(text);
    return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
};
function hasAlphaComponent(notation) {
    return (notation === 'func.hsla' ||
        notation === 'func.rgba' ||
        notation === 'hex.rgba');
}
exports.hasAlphaComponent = hasAlphaComponent;


/***/ })

/******/ });