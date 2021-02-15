/*! Tweakpane 1.5.9 (c) 2016 cocopon, licensed under the MIT license. */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tweakpane = factory());
}(this, (function () { 'use strict';

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * @hidden
     */
    var Emitter = /** @class */ (function () {
        function Emitter() {
            this.observers_ = {};
        }
        Emitter.prototype.on = function (eventName, handler) {
            var observers = this.observers_[eventName];
            if (!observers) {
                observers = this.observers_[eventName] = [];
            }
            observers.push({
                handler: handler,
            });
            return this;
        };
        Emitter.prototype.off = function (eventName, handler) {
            var observers = this.observers_[eventName];
            if (observers) {
                this.observers_[eventName] = observers.filter(function (observer) {
                    return observer.handler !== handler;
                });
            }
            return this;
        };
        Emitter.prototype.emit = function (eventName, event) {
            var observers = this.observers_[eventName];
            if (!observers) {
                return;
            }
            observers.forEach(function (observer) {
                observer.handler(event);
            });
        };
        return Emitter;
    }());

    /**
     * @hidden
     */
    var Button = /** @class */ (function () {
        function Button(title) {
            this.emitter = new Emitter();
            this.title = title;
        }
        Button.prototype.click = function () {
            this.emitter.emit('click', {
                sender: this,
            });
        };
        return Button;
    }());

    var PREFIX = 'tp';
    var TYPE_TO_POSTFIX_MAP = {
        '': 'v',
        input: 'iv',
        monitor: 'mv',
    };
    function ClassName(viewName, opt_viewType) {
        var viewType = opt_viewType || '';
        var postfix = TYPE_TO_POSTFIX_MAP[viewType];
        return function (opt_elementName, opt_modifier) {
            return [
                PREFIX,
                '-',
                viewName,
                postfix,
                opt_elementName ? "_" + opt_elementName : '',
                opt_modifier ? "-" + opt_modifier : '',
            ].join('');
        };
    }

    function disposeElement(elem) {
        if (elem && elem.parentElement) {
            elem.parentElement.removeChild(elem);
        }
        return null;
    }

    function createMessage(config) {
        if (config.type === 'alreadydisposed') {
            return 'View has been already disposed';
        }
        if (config.type === 'emptyvalue') {
            return "Value is empty for " + config.context.key;
        }
        if (config.type === 'invalidparams') {
            return "Invalid parameters for " + config.context.name;
        }
        if (config.type === 'nomatchingcontroller') {
            return "No matching controller for " + config.context.key;
        }
        if (config.type === 'shouldneverhappen') {
            return 'This error should never happen';
        }
        return 'Unexpected error';
    }
    var PaneError = /** @class */ (function () {
        function PaneError(config) {
            this.message = createMessage(config);
            this.name = this.constructor.name;
            this.stack = new Error(this.message).stack;
            this.type = config.type;
        }
        PaneError.alreadyDisposed = function () {
            return new PaneError({ type: 'alreadydisposed' });
        };
        PaneError.shouldNeverHappen = function () {
            return new PaneError({ type: 'shouldneverhappen' });
        };
        return PaneError;
    }());
    PaneError.prototype = Object.create(Error.prototype);
    PaneError.prototype.constructor = PaneError;

    function getAll() {
        return ['first', 'last'];
    }

    var className = ClassName('');
    /**
     * @hidden
     */
    var View = /** @class */ (function () {
        function View(document, config) {
            this.onChange_ = this.onChange_.bind(this);
            this.onDispose_ = this.onDispose_.bind(this);
            this.model_ = config.model;
            this.model_.emitter.on('change', this.onChange_);
            this.model_.emitter.on('dispose', this.onDispose_);
            this.doc_ = document;
            this.elem_ = this.doc_.createElement('div');
            this.elem_.classList.add(className());
        }
        Object.defineProperty(View.prototype, "document", {
            get: function () {
                if (!this.doc_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.doc_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(View.prototype, "element", {
            get: function () {
                if (!this.elem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.elem_;
            },
            enumerable: false,
            configurable: true
        });
        View.prototype.onDispose_ = function () {
            this.doc_ = null;
            this.elem_ = disposeElement(this.elem_);
        };
        View.prototype.onChange_ = function (ev) {
            var elem = this.elem_;
            if (!elem) {
                throw PaneError.alreadyDisposed();
            }
            if (ev.propertyName === 'hidden') {
                var hiddenClass = className(undefined, 'hidden');
                if (this.model_.hidden) {
                    elem.classList.add(hiddenClass);
                }
                else {
                    elem.classList.remove(hiddenClass);
                }
            }
            else if (ev.propertyName === 'positions') {
                getAll().forEach(function (pos) {
                    elem.classList.remove(className(undefined, pos));
                });
                this.model_.positions.forEach(function (pos) {
                    elem.classList.add(className(undefined, pos));
                });
            }
        };
        return View;
    }());

    var className$1 = ClassName('btn');
    /**
     * @hidden
     */
    var ButtonView = /** @class */ (function (_super) {
        __extends(ButtonView, _super);
        function ButtonView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.button = config.button;
            _this.element.classList.add(className$1());
            var buttonElem = document.createElement('button');
            buttonElem.classList.add(className$1('b'));
            buttonElem.textContent = _this.button.title;
            _this.element.appendChild(buttonElem);
            _this.buttonElem_ = buttonElem;
            config.model.emitter.on('dispose', function () {
                _this.buttonElem_ = disposeElement(_this.buttonElem_);
            });
            return _this;
        }
        Object.defineProperty(ButtonView.prototype, "buttonElement", {
            get: function () {
                if (!this.buttonElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.buttonElem_;
            },
            enumerable: false,
            configurable: true
        });
        return ButtonView;
    }(View));

    /**
     * @hidden
     */
    var ButtonController = /** @class */ (function () {
        function ButtonController(document, config) {
            this.onButtonClick_ = this.onButtonClick_.bind(this);
            this.button = new Button(config.title);
            this.viewModel = config.viewModel;
            this.view = new ButtonView(document, {
                button: this.button,
                model: this.viewModel,
            });
            this.view.buttonElement.addEventListener('click', this.onButtonClick_);
        }
        ButtonController.prototype.onButtonClick_ = function () {
            this.button.click();
        };
        return ButtonController;
    }());

    var TypeUtil = {
        forceCast: function (v) {
            return v;
        },
        isEmpty: function (value) {
            return value === null || value === undefined;
        },
        getOrDefault: function (value, defaultValue) {
            return !TypeUtil.isEmpty(value) ? value : defaultValue;
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

    var SVG_NS = 'http://www.w3.org/2000/svg';
    function forceReflow(element) {
        element.offsetHeight;
    }
    function disableTransitionTemporarily(element, callback) {
        var t = element.style.transition;
        element.style.transition = 'none';
        callback();
        element.style.transition = t;
    }
    function supportsTouch(document) {
        return document.ontouchstart !== undefined;
    }
    function getGlobalObject() {
        return new Function('return this')();
    }
    function getWindowDocument() {
        var globalObj = TypeUtil.forceCast(getGlobalObject());
        return globalObj.document;
    }
    function isBrowser() {
        return 'document' in getGlobalObject();
    }
    function getCanvasContext(canvasElement) {
        // HTMLCanvasElement.prototype.getContext is not defined on testing environment
        return isBrowser() ? canvasElement.getContext('2d') : null;
    }
    var ICON_ID_TO_INNER_HTML_MAP = {
        p2dpad: '<path d="M8 2V14" stroke="currentColor" stroke-width="1.5"/><path d="M2 8H14" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/>',
    };
    function createSvgIconElement(document, iconId) {
        var elem = document.createElementNS(SVG_NS, 'svg');
        elem.innerHTML = ICON_ID_TO_INNER_HTML_MAP[iconId];
        return elem;
    }
    function insertElementAt(parentElement, element, index) {
        parentElement.insertBefore(element, parentElement.children[index]);
    }
    function findNextTarget(ev) {
        if (ev.relatedTarget) {
            return TypeUtil.forceCast(ev.relatedTarget);
        }
        // Workaround for Firefox
        if ('explicitOriginalTarget' in ev) {
            return ev.explicitOriginalTarget;
        }
        // TODO: Workaround for Safari
        // Safari doesn't set next target for some elements
        // (e.g. button, input[type=checkbox], etc.)
        return null;
    }

    /**
     * @hidden
     */
    var Folder = /** @class */ (function () {
        function Folder(title, expanded) {
            this.emitter = new Emitter();
            this.expanded_ = expanded;
            this.expandedHeight_ = null;
            this.temporaryExpanded_ = null;
            this.shouldFixHeight_ = false;
            this.title = title;
        }
        Object.defineProperty(Folder.prototype, "expanded", {
            get: function () {
                return this.expanded_;
            },
            set: function (expanded) {
                var changed = this.expanded_ !== expanded;
                if (!changed) {
                    return;
                }
                this.emitter.emit('beforechange', {
                    propertyName: 'expanded',
                    sender: this,
                });
                this.expanded_ = expanded;
                this.emitter.emit('change', {
                    propertyName: 'expanded',
                    sender: this,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "temporaryExpanded", {
            get: function () {
                return this.temporaryExpanded_;
            },
            set: function (expanded) {
                var changed = this.temporaryExpanded_ !== expanded;
                if (!changed) {
                    return;
                }
                this.emitter.emit('beforechange', {
                    propertyName: 'temporaryExpanded',
                    sender: this,
                });
                this.temporaryExpanded_ = expanded;
                this.emitter.emit('change', {
                    propertyName: 'temporaryExpanded',
                    sender: this,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "expandedHeight", {
            get: function () {
                return this.expandedHeight_;
            },
            set: function (expandedHeight) {
                var changed = this.expandedHeight_ !== expandedHeight;
                if (!changed) {
                    return;
                }
                this.emitter.emit('beforechange', {
                    propertyName: 'expandedHeight',
                    sender: this,
                });
                this.expandedHeight_ = expandedHeight;
                this.emitter.emit('change', {
                    propertyName: 'expandedHeight',
                    sender: this,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "shouldFixHeight", {
            get: function () {
                return this.shouldFixHeight_;
            },
            set: function (shouldFixHeight) {
                var changed = this.shouldFixHeight_ !== shouldFixHeight;
                if (!changed) {
                    return;
                }
                this.emitter.emit('beforechange', {
                    propertyName: 'shouldFixHeight',
                    sender: this,
                });
                this.shouldFixHeight_ = shouldFixHeight;
                this.emitter.emit('change', {
                    propertyName: 'shouldFixHeight',
                    sender: this,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "styleExpanded", {
            get: function () {
                return TypeUtil.getOrDefault(this.temporaryExpanded, this.expanded);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "styleHeight", {
            get: function () {
                if (!this.styleExpanded) {
                    return '0';
                }
                if (this.shouldFixHeight && !TypeUtil.isEmpty(this.expandedHeight)) {
                    return this.expandedHeight + "px";
                }
                return 'auto';
            },
            enumerable: false,
            configurable: true
        });
        return Folder;
    }());

    var className$2 = ClassName('lbl');
    function createLabelNode(document, label) {
        var frag = document.createDocumentFragment();
        var lineNodes = label.split('\n').map(function (line) {
            return document.createTextNode(line);
        });
        lineNodes.forEach(function (lineNode, index) {
            if (index > 0) {
                frag.appendChild(document.createElement('br'));
            }
            frag.appendChild(lineNode);
        });
        return frag;
    }
    /**
     * @hidden
     */
    var LabeledView = /** @class */ (function (_super) {
        __extends(LabeledView, _super);
        function LabeledView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.label = config.label;
            _this.element.classList.add(className$2());
            var labelElem = document.createElement('div');
            labelElem.classList.add(className$2('l'));
            labelElem.appendChild(createLabelNode(document, _this.label));
            _this.element.appendChild(labelElem);
            var viewElem = document.createElement('div');
            viewElem.classList.add(className$2('v'));
            viewElem.appendChild(config.view.element);
            _this.element.appendChild(viewElem);
            return _this;
        }
        return LabeledView;
    }(View));

    /**
     * @hidden
     */
    var InputBindingController = /** @class */ (function () {
        function InputBindingController(document, config) {
            this.binding = config.binding;
            this.controller = config.controller;
            this.view = new LabeledView(document, {
                model: this.controller.viewModel,
                label: config.label,
                view: this.controller.view,
            });
        }
        Object.defineProperty(InputBindingController.prototype, "viewModel", {
            get: function () {
                return this.controller.viewModel;
            },
            enumerable: false,
            configurable: true
        });
        return InputBindingController;
    }());

    /**
     * @hidden
     */
    var MonitorBindingController = /** @class */ (function () {
        function MonitorBindingController(document, config) {
            var _this = this;
            this.binding = config.binding;
            this.controller = config.controller;
            this.view = new LabeledView(document, {
                label: config.label,
                model: this.viewModel,
                view: this.controller.view,
            });
            this.viewModel.emitter.on('dispose', function () {
                _this.binding.dispose();
            });
        }
        Object.defineProperty(MonitorBindingController.prototype, "viewModel", {
            get: function () {
                return this.controller.viewModel;
            },
            enumerable: false,
            configurable: true
        });
        return MonitorBindingController;
    }());

    /**
     * @hidden
     */
    var List = /** @class */ (function () {
        function List() {
            this.emitter = new Emitter();
            this.items_ = [];
        }
        Object.defineProperty(List.prototype, "items", {
            get: function () {
                return this.items_;
            },
            enumerable: false,
            configurable: true
        });
        List.prototype.add = function (item, opt_index) {
            var index = opt_index !== undefined ? opt_index : this.items_.length;
            this.items_.splice(index, 0, item);
            this.emitter.emit('add', {
                index: index,
                item: item,
                sender: this,
            });
        };
        List.prototype.remove = function (item) {
            var index = this.items_.indexOf(item);
            if (index < 0) {
                return;
            }
            this.items_.splice(index, 1);
            this.emitter.emit('remove', {
                sender: this,
            });
        };
        return List;
    }());

    /**
     * @hidden
     */
    var UiContainer = /** @class */ (function () {
        function UiContainer() {
            this.onItemFolderFold_ = this.onItemFolderFold_.bind(this);
            this.onListItemLayout_ = this.onListItemLayout_.bind(this);
            this.onSubitemLayout_ = this.onSubitemLayout_.bind(this);
            this.onSubitemFolderFold_ = this.onSubitemFolderFold_.bind(this);
            this.onSubitemInputChange_ = this.onSubitemInputChange_.bind(this);
            this.onSubitemMonitorUpdate_ = this.onSubitemMonitorUpdate_.bind(this);
            this.onItemInputChange_ = this.onItemInputChange_.bind(this);
            this.onListAdd_ = this.onListAdd_.bind(this);
            this.onListItemDispose_ = this.onListItemDispose_.bind(this);
            this.onListRemove_ = this.onListRemove_.bind(this);
            this.onItemMonitorUpdate_ = this.onItemMonitorUpdate_.bind(this);
            this.ucList_ = new List();
            this.emitter = new Emitter();
            this.ucList_.emitter.on('add', this.onListAdd_);
            this.ucList_.emitter.on('remove', this.onListRemove_);
        }
        Object.defineProperty(UiContainer.prototype, "items", {
            get: function () {
                return this.ucList_.items;
            },
            enumerable: false,
            configurable: true
        });
        UiContainer.prototype.add = function (uc, opt_index) {
            this.ucList_.add(uc, opt_index);
        };
        UiContainer.prototype.onListAdd_ = function (ev) {
            var uc = ev.item;
            this.emitter.emit('add', {
                index: ev.index,
                sender: this,
                uiController: uc,
            });
            uc.viewModel.emitter.on('dispose', this.onListItemDispose_);
            uc.viewModel.emitter.on('change', this.onListItemLayout_);
            if (uc instanceof InputBindingController) {
                var emitter = uc.binding.emitter;
                // TODO: Find more type-safe way
                emitter.on('change', this.onItemInputChange_);
            }
            else if (uc instanceof MonitorBindingController) {
                var emitter = uc.binding.emitter;
                // TODO: Find more type-safe way
                emitter.on('update', this.onItemMonitorUpdate_);
            }
            else if (uc instanceof FolderController) {
                uc.folder.emitter.on('change', this.onItemFolderFold_);
                var emitter = uc.uiContainer.emitter;
                emitter.on('itemfold', this.onSubitemFolderFold_);
                emitter.on('itemlayout', this.onSubitemLayout_);
                emitter.on('inputchange', this.onSubitemInputChange_);
                emitter.on('monitorupdate', this.onSubitemMonitorUpdate_);
            }
        };
        UiContainer.prototype.onListRemove_ = function (_) {
            this.emitter.emit('remove', {
                sender: this,
            });
        };
        UiContainer.prototype.onListItemLayout_ = function (ev) {
            if (ev.propertyName === 'hidden' || ev.propertyName === 'positions') {
                this.emitter.emit('itemlayout', {
                    sender: this,
                });
            }
        };
        UiContainer.prototype.onListItemDispose_ = function (_) {
            var _this = this;
            var disposedUcs = this.ucList_.items.filter(function (uc) {
                return uc.viewModel.disposed;
            });
            disposedUcs.forEach(function (uc) {
                _this.ucList_.remove(uc);
            });
        };
        UiContainer.prototype.onItemInputChange_ = function (ev) {
            this.emitter.emit('inputchange', {
                inputBinding: ev.sender,
                sender: this,
                value: ev.rawValue,
            });
        };
        UiContainer.prototype.onItemMonitorUpdate_ = function (ev) {
            this.emitter.emit('monitorupdate', {
                monitorBinding: ev.sender,
                sender: this,
                value: ev.rawValue,
            });
        };
        UiContainer.prototype.onItemFolderFold_ = function (ev) {
            if (ev.propertyName !== 'expanded') {
                return;
            }
            this.emitter.emit('itemfold', {
                expanded: ev.sender.expanded,
                sender: this,
            });
        };
        UiContainer.prototype.onSubitemLayout_ = function (_) {
            this.emitter.emit('itemlayout', {
                sender: this,
            });
        };
        UiContainer.prototype.onSubitemInputChange_ = function (ev) {
            this.emitter.emit('inputchange', {
                inputBinding: ev.inputBinding,
                sender: this,
                value: ev.value,
            });
        };
        UiContainer.prototype.onSubitemMonitorUpdate_ = function (ev) {
            this.emitter.emit('monitorupdate', {
                monitorBinding: ev.monitorBinding,
                sender: this,
                value: ev.value,
            });
        };
        UiContainer.prototype.onSubitemFolderFold_ = function (ev) {
            this.emitter.emit('itemfold', {
                expanded: ev.expanded,
                sender: this,
            });
        };
        return UiContainer;
    }());

    var className$3 = ClassName('fld');
    /**
     * @hidden
     */
    var FolderView = /** @class */ (function (_super) {
        __extends(FolderView, _super);
        function FolderView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onFolderChange_ = _this.onFolderChange_.bind(_this);
            _this.folder_ = config.folder;
            _this.folder_.emitter.on('change', _this.onFolderChange_);
            _this.element.classList.add(className$3());
            var titleElem = document.createElement('button');
            titleElem.classList.add(className$3('t'));
            titleElem.textContent = _this.folder_.title;
            _this.element.appendChild(titleElem);
            _this.titleElem_ = titleElem;
            var markElem = document.createElement('div');
            markElem.classList.add(className$3('m'));
            _this.titleElem_.appendChild(markElem);
            var containerElem = document.createElement('div');
            containerElem.classList.add(className$3('c'));
            _this.element.appendChild(containerElem);
            _this.containerElem_ = containerElem;
            _this.applyModel_();
            config.model.emitter.on('dispose', function () {
                _this.containerElem_ = disposeElement(_this.containerElem_);
                _this.titleElem_ = disposeElement(_this.titleElem_);
            });
            return _this;
        }
        Object.defineProperty(FolderView.prototype, "titleElement", {
            get: function () {
                if (!this.titleElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.titleElem_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FolderView.prototype, "containerElement", {
            get: function () {
                if (!this.containerElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.containerElem_;
            },
            enumerable: false,
            configurable: true
        });
        FolderView.prototype.applyModel_ = function () {
            var containerElem = this.containerElem_;
            if (!containerElem) {
                throw PaneError.alreadyDisposed();
            }
            var expanded = this.folder_.styleExpanded;
            var expandedClass = className$3(undefined, 'expanded');
            if (expanded) {
                this.element.classList.add(expandedClass);
            }
            else {
                this.element.classList.remove(expandedClass);
            }
            containerElem.style.height = this.folder_.styleHeight;
        };
        FolderView.prototype.onFolderChange_ = function () {
            this.applyModel_();
        };
        return FolderView;
    }(View));

    function updateAllItemsPositions(uiContainer) {
        var visibleItems = uiContainer.items.filter(function (uc) { return !uc.viewModel.hidden; });
        var firstVisibleItem = visibleItems[0];
        var lastVisibleItem = visibleItems[visibleItems.length - 1];
        uiContainer.items.forEach(function (uc) {
            var ps = [];
            if (uc === firstVisibleItem) {
                ps.push('first');
            }
            if (uc === lastVisibleItem) {
                ps.push('last');
            }
            uc.viewModel.positions = ps;
        });
    }
    /**
     * @hidden
     */
    function computeExpandedFolderHeight(folder, containerElement) {
        var height = 0;
        disableTransitionTemporarily(containerElement, function () {
            // Expand folder temporarily
            folder.expandedHeight = null;
            folder.temporaryExpanded = true;
            forceReflow(containerElement);
            // Compute height
            height = containerElement.clientHeight;
            // Restore expanded
            folder.temporaryExpanded = null;
            forceReflow(containerElement);
        });
        return height;
    }

    /**
     * @hidden
     */
    var FolderController = /** @class */ (function () {
        function FolderController(document, config) {
            this.onContainerTransitionEnd_ = this.onContainerTransitionEnd_.bind(this);
            this.onFolderBeforeChange_ = this.onFolderBeforeChange_.bind(this);
            this.onTitleClick_ = this.onTitleClick_.bind(this);
            this.onUiContainerAdd_ = this.onUiContainerAdd_.bind(this);
            this.onUiContainerItemLayout_ = this.onUiContainerItemLayout_.bind(this);
            this.onUiContainerRemove_ = this.onUiContainerRemove_.bind(this);
            this.viewModel = config.viewModel;
            this.folder = new Folder(config.title, TypeUtil.getOrDefault(config.expanded, true));
            this.folder.emitter.on('beforechange', this.onFolderBeforeChange_);
            this.ucList_ = new UiContainer();
            this.ucList_.emitter.on('add', this.onUiContainerAdd_);
            this.ucList_.emitter.on('itemlayout', this.onUiContainerItemLayout_);
            this.ucList_.emitter.on('remove', this.onUiContainerRemove_);
            this.doc_ = document;
            this.view = new FolderView(this.doc_, {
                folder: this.folder,
                model: this.viewModel,
            });
            this.view.titleElement.addEventListener('click', this.onTitleClick_);
            this.view.containerElement.addEventListener('transitionend', this.onContainerTransitionEnd_);
        }
        Object.defineProperty(FolderController.prototype, "document", {
            get: function () {
                return this.doc_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FolderController.prototype, "uiContainer", {
            get: function () {
                return this.ucList_;
            },
            enumerable: false,
            configurable: true
        });
        FolderController.prototype.onFolderBeforeChange_ = function (ev) {
            if (ev.propertyName !== 'expanded') {
                return;
            }
            if (TypeUtil.isEmpty(this.folder.expandedHeight)) {
                this.folder.expandedHeight = computeExpandedFolderHeight(this.folder, this.view.containerElement);
            }
            this.folder.shouldFixHeight = true;
            forceReflow(this.view.containerElement);
        };
        FolderController.prototype.onTitleClick_ = function () {
            this.folder.expanded = !this.folder.expanded;
        };
        FolderController.prototype.applyUiContainerChange_ = function () {
            updateAllItemsPositions(this.uiContainer);
        };
        FolderController.prototype.onUiContainerAdd_ = function (ev) {
            insertElementAt(this.view.containerElement, ev.uiController.view.element, ev.index);
            this.applyUiContainerChange_();
        };
        FolderController.prototype.onUiContainerRemove_ = function (_) {
            this.applyUiContainerChange_();
        };
        FolderController.prototype.onUiContainerItemLayout_ = function (_) {
            this.applyUiContainerChange_();
        };
        FolderController.prototype.onContainerTransitionEnd_ = function (ev) {
            if (ev.propertyName !== 'height') {
                return;
            }
            this.folder.shouldFixHeight = false;
            this.folder.expandedHeight = null;
        };
        return FolderController;
    }());

    var className$4 = ClassName('spt');
    /**
     * @hidden
     */
    var SeparatorView = /** @class */ (function (_super) {
        __extends(SeparatorView, _super);
        function SeparatorView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.element.classList.add(className$4());
            var hrElem = document.createElement('hr');
            hrElem.classList.add(className$4('r'));
            _this.element.appendChild(hrElem);
            return _this;
        }
        return SeparatorView;
    }(View));

    /**
     * @hidden
     */
    var SeparatorController = /** @class */ (function () {
        function SeparatorController(document, config) {
            this.viewModel = config.viewModel;
            this.view = new SeparatorView(document, {
                model: this.viewModel,
            });
        }
        return SeparatorController;
    }());

    var Point2d = /** @class */ (function () {
        function Point2d(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Point2d.prototype.getComponents = function () {
            return [this.x, this.y];
        };
        Point2d.isObject = function (obj) {
            if (TypeUtil.isEmpty(obj)) {
                return false;
            }
            var x = obj.x;
            var y = obj.y;
            if (typeof x !== 'number' || typeof y !== 'number') {
                return false;
            }
            return true;
        };
        Point2d.equals = function (v1, v2) {
            return v1.x === v2.x && v1.y === v2.y;
        };
        Point2d.prototype.toObject = function () {
            return {
                x: this.x,
                y: this.y,
            };
        };
        return Point2d;
    }());

    /**
     * @hidden
     */
    var Point2dConstraint = /** @class */ (function () {
        function Point2dConstraint(config) {
            this.xConstraint = config.x;
            this.yConstraint = config.y;
        }
        Point2dConstraint.prototype.constrain = function (value) {
            return new Point2d(this.xConstraint ? this.xConstraint.constrain(value.x) : value.x, this.yConstraint ? this.yConstraint.constrain(value.y) : value.y);
        };
        return Point2dConstraint;
    }());

    /**
     * @hidden
     */
    var RangeConstraint = /** @class */ (function () {
        function RangeConstraint(config) {
            this.maxValue = config.max;
            this.minValue = config.min;
        }
        RangeConstraint.prototype.constrain = function (value) {
            var result = value;
            if (!TypeUtil.isEmpty(this.minValue)) {
                result = Math.max(result, this.minValue);
            }
            if (!TypeUtil.isEmpty(this.maxValue)) {
                result = Math.min(result, this.maxValue);
            }
            return result;
        };
        return RangeConstraint;
    }());

    /**
     * @hidden
     */
    var StepConstraint = /** @class */ (function () {
        function StepConstraint(config) {
            this.step = config.step;
        }
        StepConstraint.prototype.constrain = function (value) {
            var r = value < 0
                ? -Math.round(-value / this.step)
                : Math.round(value / this.step);
            return r * this.step;
        };
        return StepConstraint;
    }());

    /**
     * @hidden
     */
    var CompositeConstraint = /** @class */ (function () {
        function CompositeConstraint(config) {
            this.constraints_ = config.constraints;
        }
        Object.defineProperty(CompositeConstraint.prototype, "constraints", {
            get: function () {
                return this.constraints_;
            },
            enumerable: false,
            configurable: true
        });
        CompositeConstraint.prototype.constrain = function (value) {
            return this.constraints_.reduce(function (result, c) {
                return c.constrain(result);
            }, value);
        };
        return CompositeConstraint;
    }());

    /**
     * @hidden
     */
    var ConstraintUtil = {
        findConstraint: function (c, constraintClass) {
            if (c instanceof constraintClass) {
                return c;
            }
            if (c instanceof CompositeConstraint) {
                var result = c.constraints.reduce(function (tmpResult, sc) {
                    if (tmpResult) {
                        return tmpResult;
                    }
                    return sc instanceof constraintClass ? sc : null;
                }, null);
                if (result) {
                    return result;
                }
            }
            return null;
        },
    };

    var NumberUtil = {
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

    /**
     * @hidden
     */
    function normalizeInputParamsOptions(options, convert) {
        if (Array.isArray(options)) {
            return options.map(function (item) {
                return {
                    text: item.text,
                    value: convert(item.value),
                };
            });
        }
        var textToValueMap = options;
        var texts = Object.keys(textToValueMap);
        return texts.reduce(function (result, text) {
            return result.concat({
                text: text,
                value: convert(textToValueMap[text]),
            });
        }, []);
    }
    /**
     * @hidden
     */
    function findControllers(uiControllers, controllerClass) {
        return uiControllers.reduce(function (results, uc) {
            if (uc instanceof FolderController) {
                // eslint-disable-next-line no-use-before-define
                results.push.apply(results, findControllers(uc.uiContainer.items, controllerClass));
            }
            if (uc instanceof controllerClass) {
                results.push(uc);
            }
            return results;
        }, []);
    }
    function findStep(constraint) {
        var c = constraint
            ? ConstraintUtil.findConstraint(constraint, StepConstraint)
            : null;
        if (!c) {
            return null;
        }
        return c.step;
    }
    /**
     * @hidden
     */
    function getStepForTextInput(constraint) {
        var step = findStep(constraint);
        return TypeUtil.getOrDefault(step, 1);
    }
    /**
     * @hidden
     */
    function getStepForKey(baseStep, keys) {
        var step = baseStep * (keys.altKey ? 0.1 : 1) * (keys.shiftKey ? 10 : 1);
        if (keys.upKey) {
            return +step;
        }
        else if (keys.downKey) {
            return -step;
        }
        return 0;
    }
    /**
     * @hidden
     */
    function getVerticalStepKeys(ev) {
        return {
            altKey: ev.altKey,
            downKey: ev.keyCode === 40,
            shiftKey: ev.shiftKey,
            upKey: ev.keyCode === 38,
        };
    }
    /**
     * @hidden
     */
    function getHorizontalStepKeys(ev) {
        return {
            altKey: ev.altKey,
            downKey: ev.keyCode === 37,
            shiftKey: ev.shiftKey,
            upKey: ev.keyCode === 39,
        };
    }
    /**
     * @hidden
     */
    function isVerticalArrowKey(keyCode) {
        return keyCode === 38 || keyCode === 40;
    }
    /**
     * @hidden
     */
    function isArrowKey(keyCode) {
        return isVerticalArrowKey(keyCode) || keyCode === 37 || keyCode === 39;
    }
    /**
     * @hidden
     */
    function getSuitableDecimalDigits(constraint, rawValue) {
        var sc = constraint && ConstraintUtil.findConstraint(constraint, StepConstraint);
        if (sc) {
            return NumberUtil.getDecimalDigits(sc.step);
        }
        return Math.max(NumberUtil.getDecimalDigits(rawValue), 2);
    }
    /**
     * @hidden
     */
    function getSuitableMaxDimensionValue(constraint, rawValue) {
        var rc = constraint && ConstraintUtil.findConstraint(constraint, RangeConstraint);
        if (rc) {
            return Math.max(Math.abs(rc.minValue || 0), Math.abs(rc.maxValue || 0));
        }
        var step = getStepForTextInput(constraint);
        return Math.max(Math.abs(step) * 10, Math.abs(rawValue) * 10);
    }
    /**
     * @hidden
     */
    function getSuitableMaxValueForPoint2dPad(constraint, rawValue) {
        var xc = constraint instanceof Point2dConstraint
            ? constraint.xConstraint
            : undefined;
        var yc = constraint instanceof Point2dConstraint
            ? constraint.yConstraint
            : undefined;
        var xr = getSuitableMaxDimensionValue(xc, rawValue.x);
        var yr = getSuitableMaxDimensionValue(yc, rawValue.y);
        return Math.max(xr, yr);
    }
    /**
     * @hidden
     */
    function getBaseStepForColor(forAlpha) {
        return forAlpha ? 0.1 : 1;
    }

    /**
     * @hidden
     */
    var Target = /** @class */ (function () {
        function Target(object, key, opt_id) {
            this.obj_ = object;
            this.key_ = key;
            this.presetKey_ = TypeUtil.getOrDefault(opt_id, key);
        }
        Object.defineProperty(Target.prototype, "key", {
            get: function () {
                return this.key_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Target.prototype, "presetKey", {
            get: function () {
                return this.presetKey_;
            },
            enumerable: false,
            configurable: true
        });
        Target.prototype.read = function () {
            return this.obj_[this.key_];
        };
        Target.prototype.write = function (value) {
            this.obj_[this.key_] = value;
        };
        return Target;
    }());

    /**
     * @hidden
     */
    var Disposable = /** @class */ (function () {
        function Disposable() {
            this.emitter = new Emitter();
            this.disposed_ = false;
        }
        Object.defineProperty(Disposable.prototype, "disposed", {
            get: function () {
                return this.disposed_;
            },
            enumerable: false,
            configurable: true
        });
        Disposable.prototype.dispose = function () {
            if (this.disposed_) {
                return false;
            }
            this.disposed_ = true;
            this.emitter.emit('dispose', {
                sender: this,
            });
            return true;
        };
        return Disposable;
    }());

    var ViewModel = /** @class */ (function () {
        function ViewModel() {
            this.onDispose_ = this.onDispose_.bind(this);
            this.emitter = new Emitter();
            this.positions_ = [];
            this.hidden_ = false;
            this.disposable_ = new Disposable();
            this.disposable_.emitter.on('dispose', this.onDispose_);
        }
        Object.defineProperty(ViewModel.prototype, "hidden", {
            get: function () {
                return this.hidden_;
            },
            set: function (hidden) {
                if (this.hidden_ === hidden) {
                    return;
                }
                this.hidden_ = hidden;
                this.emitter.emit('change', {
                    propertyName: 'hidden',
                    sender: this,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewModel.prototype, "positions", {
            get: function () {
                return this.positions_;
            },
            set: function (positions) {
                if (TypeUtil.deepEqualsArray(positions, this.positions_)) {
                    return;
                }
                this.positions_ = positions;
                this.emitter.emit('change', {
                    propertyName: 'positions',
                    sender: this,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ViewModel.prototype, "disposed", {
            get: function () {
                return this.disposable_.disposed;
            },
            enumerable: false,
            configurable: true
        });
        ViewModel.prototype.dispose = function () {
            this.disposable_.dispose();
        };
        ViewModel.prototype.onDispose_ = function () {
            this.emitter.emit('dispose', {
                sender: this,
            });
        };
        return ViewModel;
    }());

    var ButtonApi = /** @class */ (function () {
        /**
         * @hidden
         */
        function ButtonApi(buttonController) {
            this.controller = buttonController;
        }
        Object.defineProperty(ButtonApi.prototype, "hidden", {
            get: function () {
                return this.controller.viewModel.hidden;
            },
            set: function (hidden) {
                this.controller.viewModel.hidden = hidden;
            },
            enumerable: false,
            configurable: true
        });
        ButtonApi.prototype.dispose = function () {
            this.controller.viewModel.dispose();
        };
        ButtonApi.prototype.on = function (eventName, handler) {
            var emitter = this.controller.button.emitter;
            emitter.on(eventName, handler.bind(this));
            return this;
        };
        return ButtonApi;
    }());

    /**
     * @hidden
     */
    function input(_a) {
        var binding = _a.binding, eventName = _a.eventName, handler = _a.handler;
        if (eventName === 'change') {
            var emitter = binding.emitter;
            emitter.on('change', function (ev) {
                handler(ev.sender.getValueToWrite(ev.rawValue));
            });
        }
    }
    /**
     * @hidden
     */
    function monitor(_a) {
        var binding = _a.binding, eventName = _a.eventName, handler = _a.handler;
        if (eventName === 'update') {
            var emitter = binding.emitter;
            emitter.on('update', function (ev) {
                handler(ev.sender.target.read());
            });
        }
    }
    /**
     * @hidden
     */
    function folder(_a) {
        var eventName = _a.eventName, folder = _a.folder, handler = _a.handler, uiContainer = _a.uiContainer;
        if (eventName === 'change') {
            var emitter = uiContainer.emitter;
            emitter.on('inputchange', function (ev) {
                // TODO: Find more type-safe way
                handler(ev.inputBinding.getValueToWrite(ev.value));
            });
        }
        if (eventName === 'update') {
            var emitter = uiContainer.emitter;
            emitter.on('monitorupdate', function (ev) {
                handler(ev.monitorBinding.target.read());
            });
        }
        if (eventName === 'fold') {
            uiContainer.emitter.on('itemfold', function (ev) {
                handler(ev.expanded);
            });
            folder === null || folder === void 0 ? void 0 : folder.emitter.on('change', function (ev) {
                if (ev.propertyName !== 'expanded') {
                    return;
                }
                handler(ev.sender.expanded);
            });
        }
    }

    /**
     * The API for the input binding between the parameter and the pane.
     * @param In The type internal Tweakpane.
     * @param Ex The type externalTweakpane (= parameter object).
     */
    var InputBindingApi = /** @class */ (function () {
        /**
         * @hidden
         */
        function InputBindingApi(bindingController) {
            this.controller = bindingController;
        }
        Object.defineProperty(InputBindingApi.prototype, "hidden", {
            get: function () {
                return this.controller.viewModel.hidden;
            },
            set: function (hidden) {
                this.controller.viewModel.hidden = hidden;
            },
            enumerable: false,
            configurable: true
        });
        InputBindingApi.prototype.dispose = function () {
            this.controller.viewModel.dispose();
        };
        InputBindingApi.prototype.on = function (eventName, handler) {
            input({
                binding: this.controller.binding,
                eventName: eventName,
                handler: handler.bind(this),
            });
            return this;
        };
        InputBindingApi.prototype.refresh = function () {
            this.controller.binding.read();
        };
        return InputBindingApi;
    }());

    /**
     * @hidden
     */
    var InputBinding = /** @class */ (function () {
        function InputBinding(config) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.reader = config.reader;
            this.writer = config.writer;
            this.emitter = new Emitter();
            this.value = config.value;
            this.value.emitter.on('change', this.onValueChange_);
            this.target = config.target;
            this.read();
        }
        InputBinding.prototype.read = function () {
            var targetValue = this.target.read();
            if (targetValue !== undefined) {
                this.value.rawValue = this.reader(targetValue);
            }
        };
        InputBinding.prototype.getValueToWrite = function (rawValue) {
            return this.writer(rawValue);
        };
        InputBinding.prototype.write_ = function (rawValue) {
            this.target.write(this.getValueToWrite(rawValue));
        };
        InputBinding.prototype.onValueChange_ = function (ev) {
            this.write_(ev.rawValue);
            this.emitter.emit('change', {
                rawValue: ev.rawValue,
                sender: this,
            });
        };
        return InputBinding;
    }());

    /**
     * @hidden
     */
    var InputValue = /** @class */ (function () {
        function InputValue(initialValue, constraint, equals) {
            this.constraint_ = constraint;
            this.equals_ = equals || (function (v1, v2) { return v1 === v2; });
            this.emitter = new Emitter();
            this.rawValue_ = initialValue;
        }
        Object.defineProperty(InputValue.prototype, "constraint", {
            get: function () {
                return this.constraint_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputValue.prototype, "rawValue", {
            get: function () {
                return this.rawValue_;
            },
            set: function (rawValue) {
                var constrainedValue = this.constraint_
                    ? this.constraint_.constrain(rawValue)
                    : rawValue;
                var changed = !this.equals_(this.rawValue_, constrainedValue);
                if (changed) {
                    this.rawValue_ = constrainedValue;
                    this.emitter.emit('change', {
                        rawValue: constrainedValue,
                        sender: this,
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        return InputValue;
    }());

    function createController(plugin, args) {
        var initialValue = plugin.model.accept(args.target.read(), args.params);
        if (initialValue === null) {
            return null;
        }
        var valueArgs = {
            target: args.target,
            initialValue: initialValue,
            params: args.params,
        };
        var reader = plugin.model.reader(valueArgs);
        var constraint = plugin.model.constraint
            ? plugin.model.constraint(valueArgs)
            : undefined;
        var value = new InputValue(reader(initialValue), constraint, plugin.model.equals);
        var binding = new InputBinding({
            reader: reader,
            target: args.target,
            value: value,
            writer: plugin.model.writer(valueArgs),
        });
        return new InputBindingController(args.document, {
            binding: binding,
            controller: plugin.controller({
                binding: binding,
                document: args.document,
                initialValue: initialValue,
                params: args.params,
            }),
            label: args.params.label || args.target.key,
        });
    }

    var Plugins = {
        inputs: [],
        monitors: [],
    };

    /**
     * @hidden
     */
    function create(document, target, params) {
        var initialValue = target.read();
        if (TypeUtil.isEmpty(initialValue)) {
            throw new PaneError({
                context: {
                    key: target.key,
                },
                type: 'emptyvalue',
            });
        }
        var bc = Plugins.inputs.reduce(function (result, plugin) {
            return result ||
                createController(plugin, {
                    document: document,
                    target: target,
                    params: params,
                });
        }, null);
        if (bc) {
            return bc;
        }
        throw new PaneError({
            context: {
                key: target.key,
            },
            type: 'nomatchingcontroller',
        });
    }

    /**
     * The API for the monitor binding between the parameter and the pane.
     */
    var MonitorBindingApi = /** @class */ (function () {
        /**
         * @hidden
         */
        function MonitorBindingApi(bindingController) {
            this.controller = bindingController;
        }
        Object.defineProperty(MonitorBindingApi.prototype, "hidden", {
            get: function () {
                return this.controller.viewModel.hidden;
            },
            set: function (hidden) {
                this.controller.viewModel.hidden = hidden;
            },
            enumerable: false,
            configurable: true
        });
        MonitorBindingApi.prototype.dispose = function () {
            this.controller.viewModel.dispose();
        };
        MonitorBindingApi.prototype.on = function (eventName, handler) {
            monitor({
                binding: this.controller.binding,
                eventName: eventName,
                handler: handler.bind(this),
            });
            return this;
        };
        MonitorBindingApi.prototype.refresh = function () {
            this.controller.binding.read();
        };
        return MonitorBindingApi;
    }());

    /**
     * @hidden
     */
    var MonitorBinding = /** @class */ (function () {
        function MonitorBinding(config) {
            this.onTick_ = this.onTick_.bind(this);
            this.onValueUpdate_ = this.onValueUpdate_.bind(this);
            this.reader_ = config.reader;
            this.target = config.target;
            this.emitter = new Emitter();
            this.value = config.value;
            this.value.emitter.on('update', this.onValueUpdate_);
            this.ticker = config.ticker;
            this.ticker.emitter.on('tick', this.onTick_);
            this.read();
        }
        MonitorBinding.prototype.dispose = function () {
            this.ticker.disposable.dispose();
        };
        MonitorBinding.prototype.read = function () {
            var targetValue = this.target.read();
            if (targetValue !== undefined) {
                this.value.append(this.reader_(targetValue));
            }
        };
        MonitorBinding.prototype.onTick_ = function (_) {
            this.read();
        };
        MonitorBinding.prototype.onValueUpdate_ = function (ev) {
            this.emitter.emit('update', {
                rawValue: ev.rawValue,
                sender: this,
            });
        };
        return MonitorBinding;
    }());

    var Constants = {
        monitor: {
            defaultInterval: 200,
            defaultLineCount: 3,
        },
    };

    /**
     * @hidden
     */
    var IntervalTicker = /** @class */ (function () {
        function IntervalTicker(document, interval) {
            var _this = this;
            this.onTick_ = this.onTick_.bind(this);
            // this.onWindowBlur_ = this.onWindowBlur_.bind(this);
            // this.onWindowFocus_ = this.onWindowFocus_.bind(this);
            this.doc_ = document;
            this.emitter = new Emitter();
            if (interval <= 0) {
                this.id_ = null;
            }
            else {
                var win = this.doc_.defaultView;
                if (win) {
                    this.id_ = win.setInterval(this.onTick_, interval);
                }
            }
            // TODO: Stop on blur?
            // const win = document.defaultView;
            // if (win) {
            //   win.addEventListener('blur', this.onWindowBlur_);
            //   win.addEventListener('focus', this.onWindowFocus_);
            // }
            this.disposable = new Disposable();
            this.disposable.emitter.on('dispose', function () {
                if (_this.id_ !== null) {
                    var win = _this.doc_.defaultView;
                    if (win) {
                        win.clearInterval(_this.id_);
                    }
                }
                _this.id_ = null;
            });
        }
        IntervalTicker.prototype.onTick_ = function () {
            // if (!this.active_) {
            // 	return;
            // }
            this.emitter.emit('tick', {
                sender: this,
            });
        };
        return IntervalTicker;
    }());

    /**
     * @hidden
     */
    var ManualTicker = /** @class */ (function () {
        function ManualTicker() {
            this.disposable = new Disposable();
            this.emitter = new Emitter();
        }
        ManualTicker.prototype.tick = function () {
            this.emitter.emit('tick', {
                sender: this,
            });
        };
        return ManualTicker;
    }());

    /**
     * @hidden
     */
    var MonitorValue = /** @class */ (function () {
        function MonitorValue(bufferSize) {
            this.emitter = new Emitter();
            this.rawValues_ = [];
            this.bufferSize_ = bufferSize;
        }
        Object.defineProperty(MonitorValue.prototype, "rawValues", {
            get: function () {
                return this.rawValues_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(MonitorValue.prototype, "bufferSize", {
            get: function () {
                return this.bufferSize_;
            },
            enumerable: false,
            configurable: true
        });
        MonitorValue.prototype.append = function (rawValue) {
            this.rawValues_.push(rawValue);
            if (this.rawValues_.length > this.bufferSize_) {
                this.rawValues_.splice(0, this.rawValues_.length - this.bufferSize_);
            }
            this.emitter.emit('update', {
                rawValue: rawValue,
                sender: this,
            });
        };
        return MonitorValue;
    }());

    function createTicker(document, interval) {
        return interval === 0
            ? new ManualTicker()
            : new IntervalTicker(document, TypeUtil.getOrDefault(interval, Constants.monitor.defaultInterval));
    }
    function createController$1(plugin, args) {
        var initialValue = plugin.model.accept(args.target.read(), args.params);
        if (initialValue === null) {
            return null;
        }
        var valueArgs = {
            target: args.target,
            initialValue: initialValue,
            params: args.params,
        };
        var reader = plugin.model.reader(valueArgs);
        var bufferSize = TypeUtil.getOrDefault(TypeUtil.getOrDefault(args.params.bufferSize, args.params.count), plugin.model.defaultBufferSize(args.params));
        var value = new MonitorValue(bufferSize);
        var binding = new MonitorBinding({
            reader: reader,
            target: args.target,
            ticker: createTicker(args.document, args.params.interval),
            value: value,
        });
        return new MonitorBindingController(args.document, {
            binding: binding,
            controller: plugin.controller({
                binding: binding,
                document: args.document,
                params: args.params,
            }),
            label: args.params.label || args.target.key,
        });
    }

    /**
     * @hidden
     */
    function create$1(document, target, params) {
        var initialValue = target.read();
        if (TypeUtil.isEmpty(initialValue)) {
            throw new PaneError({
                context: {
                    key: target.key,
                },
                type: 'emptyvalue',
            });
        }
        var bc = Plugins.monitors.reduce(function (result, plugin) {
            return result ||
                createController$1(plugin, {
                    document: document,
                    params: params,
                    target: target,
                });
        }, null);
        if (bc) {
            return bc;
        }
        throw new PaneError({
            context: {
                key: target.key,
            },
            type: 'nomatchingcontroller',
        });
    }

    var SeparatorApi = /** @class */ (function () {
        /**
         * @hidden
         */
        function SeparatorApi(controller) {
            this.controller = controller;
        }
        Object.defineProperty(SeparatorApi.prototype, "hidden", {
            get: function () {
                return this.controller.viewModel.hidden;
            },
            set: function (hidden) {
                this.controller.viewModel.hidden = hidden;
            },
            enumerable: false,
            configurable: true
        });
        SeparatorApi.prototype.dispose = function () {
            this.controller.viewModel.dispose();
        };
        return SeparatorApi;
    }());

    var FolderApi = /** @class */ (function () {
        /**
         * @hidden
         */
        function FolderApi(folderController) {
            this.controller = folderController;
        }
        Object.defineProperty(FolderApi.prototype, "expanded", {
            get: function () {
                return this.controller.folder.expanded;
            },
            set: function (expanded) {
                this.controller.folder.expanded = expanded;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FolderApi.prototype, "hidden", {
            get: function () {
                return this.controller.viewModel.hidden;
            },
            set: function (hidden) {
                this.controller.viewModel.hidden = hidden;
            },
            enumerable: false,
            configurable: true
        });
        FolderApi.prototype.dispose = function () {
            this.controller.viewModel.dispose();
        };
        FolderApi.prototype.addInput = function (object, key, opt_params) {
            var params = opt_params || {};
            var uc = create(this.controller.document, new Target(object, key, params.presetKey), params);
            this.controller.uiContainer.add(uc, params.index);
            return new InputBindingApi(uc);
        };
        FolderApi.prototype.addMonitor = function (object, key, opt_params) {
            var params = opt_params || {};
            var uc = create$1(this.controller.document, new Target(object, key), params);
            this.controller.uiContainer.add(uc, params.index);
            return new MonitorBindingApi(uc);
        };
        FolderApi.prototype.addFolder = function (params) {
            var uc = new FolderController(this.controller.document, __assign(__assign({}, params), { viewModel: new ViewModel() }));
            this.controller.uiContainer.add(uc, params.index);
            return new FolderApi(uc);
        };
        FolderApi.prototype.addButton = function (params) {
            var uc = new ButtonController(this.controller.document, __assign(__assign({}, params), { viewModel: new ViewModel() }));
            this.controller.uiContainer.add(uc, params.index);
            return new ButtonApi(uc);
        };
        FolderApi.prototype.addSeparator = function (opt_params) {
            var params = opt_params || {};
            var uc = new SeparatorController(this.controller.document, {
                viewModel: new ViewModel(),
            });
            this.controller.uiContainer.add(uc, params.index);
            return new SeparatorApi(uc);
        };
        FolderApi.prototype.on = function (eventName, handler) {
            folder({
                eventName: eventName,
                folder: this.controller.folder,
                handler: handler.bind(this),
                uiContainer: this.controller.uiContainer,
            });
            return this;
        };
        return FolderApi;
    }());

    /**
     * @hidden
     */
    function exportJson(targets) {
        return targets.reduce(function (result, target) {
            var _a;
            return Object.assign(result, (_a = {},
                _a[target.presetKey] = target.read(),
                _a));
        }, {});
    }
    /**
     * @hidden
     */
    function importJson(targets, preset) {
        targets.forEach(function (target) {
            var value = preset[target.presetKey];
            if (value !== undefined) {
                target.write(value);
            }
        });
    }

    /**
     * The Tweakpane interface.
     *
     * ```
     * new Tweakpane(options: TweakpaneConfig): RootApi
     * ```
     *
     * See [[`TweakpaneConfig`]] interface for available options.
     */
    var RootApi = /** @class */ (function () {
        /**
         * @hidden
         */
        function RootApi(rootController) {
            this.controller = rootController;
        }
        // TODO: Publish
        /**
         * @hidden
         */
        RootApi.registerPlugin = function (r) {
            if (r.type === 'input') {
                Plugins.inputs.push(r.plugin);
            }
            else if (r.type === 'monitor') {
                Plugins.monitors.push(r.plugin);
            }
        };
        Object.defineProperty(RootApi.prototype, "element", {
            get: function () {
                return this.controller.view.element;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RootApi.prototype, "expanded", {
            get: function () {
                var folder = this.controller.folder;
                return folder ? folder.expanded : true;
            },
            set: function (expanded) {
                var folder = this.controller.folder;
                if (folder) {
                    folder.expanded = expanded;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RootApi.prototype, "hidden", {
            get: function () {
                return this.controller.viewModel.hidden;
            },
            set: function (hidden) {
                this.controller.viewModel.hidden = hidden;
            },
            enumerable: false,
            configurable: true
        });
        RootApi.prototype.dispose = function () {
            this.controller.viewModel.dispose();
        };
        RootApi.prototype.addInput = function (object, key, opt_params) {
            var params = opt_params || {};
            var uc = create(this.controller.document, new Target(object, key, params.presetKey), params);
            this.controller.uiContainer.add(uc, params.index);
            return new InputBindingApi(uc);
        };
        RootApi.prototype.addMonitor = function (object, key, opt_params) {
            var params = opt_params || {};
            var uc = create$1(this.controller.document, new Target(object, key), params);
            this.controller.uiContainer.add(uc, params.index);
            return new MonitorBindingApi(uc);
        };
        RootApi.prototype.addButton = function (params) {
            var uc = new ButtonController(this.controller.document, __assign(__assign({}, params), { viewModel: new ViewModel() }));
            this.controller.uiContainer.add(uc, params.index);
            return new ButtonApi(uc);
        };
        RootApi.prototype.addFolder = function (params) {
            var uc = new FolderController(this.controller.document, __assign(__assign({}, params), { viewModel: new ViewModel() }));
            this.controller.uiContainer.add(uc, params.index);
            return new FolderApi(uc);
        };
        RootApi.prototype.addSeparator = function (opt_params) {
            var params = opt_params || {};
            var uc = new SeparatorController(this.controller.document, {
                viewModel: new ViewModel(),
            });
            this.controller.uiContainer.add(uc, params.index);
            return new SeparatorApi(uc);
        };
        /**
         * Import a preset of all inputs.
         * @param preset The preset object to import.
         */
        RootApi.prototype.importPreset = function (preset) {
            var targets = findControllers(this.controller.uiContainer.items, InputBindingController).map(function (ibc) {
                return ibc.binding.target;
            });
            importJson(targets, preset);
            this.refresh();
        };
        /**
         * Export a preset of all inputs.
         * @return The exported preset object.
         */
        RootApi.prototype.exportPreset = function () {
            var targets = findControllers(this.controller.uiContainer.items, InputBindingController).map(function (ibc) {
                return ibc.binding.target;
            });
            return exportJson(targets);
        };
        /**
         * Adds a global event listener. It handles all events of child inputs/monitors.
         * @param eventName The event name to listen.
         * @return The API object itself.
         */
        RootApi.prototype.on = function (eventName, handler) {
            folder({
                eventName: eventName,
                folder: this.controller.folder,
                handler: handler.bind(this),
                uiContainer: this.controller.uiContainer,
            });
            return this;
        };
        /**
         * Refreshes all bindings of the pane.
         */
        RootApi.prototype.refresh = function () {
            // Force-read all input bindings
            findControllers(this.controller.uiContainer.items, InputBindingController).forEach(function (ibc) {
                ibc.binding.read();
            });
            // Force-read all monitor bindings
            findControllers(this.controller.uiContainer.items, MonitorBindingController).forEach(function (mbc) {
                mbc.binding.read();
            });
        };
        return RootApi;
    }());

    var className$5 = ClassName('rot');
    /**
     * @hidden
     */
    var RootView = /** @class */ (function (_super) {
        __extends(RootView, _super);
        function RootView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onFolderChange_ = _this.onFolderChange_.bind(_this);
            _this.folder_ = config.folder;
            if (_this.folder_) {
                _this.folder_.emitter.on('change', _this.onFolderChange_);
            }
            _this.element.classList.add(className$5());
            var folder = _this.folder_;
            if (folder) {
                var titleElem = document.createElement('button');
                titleElem.classList.add(className$5('t'));
                titleElem.textContent = folder.title;
                _this.element.appendChild(titleElem);
                var markElem = document.createElement('div');
                markElem.classList.add(className$5('m'));
                titleElem.appendChild(markElem);
                _this.titleElem_ = titleElem;
            }
            var containerElem = document.createElement('div');
            containerElem.classList.add(className$5('c'));
            _this.element.appendChild(containerElem);
            _this.containerElem_ = containerElem;
            _this.applyModel_();
            config.model.emitter.on('dispose', function () {
                _this.containerElem_ = disposeElement(_this.containerElem_);
                _this.folder_ = null;
                _this.titleElem_ = disposeElement(_this.titleElem_);
            });
            return _this;
        }
        Object.defineProperty(RootView.prototype, "titleElement", {
            get: function () {
                return this.titleElem_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RootView.prototype, "containerElement", {
            get: function () {
                if (!this.containerElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.containerElem_;
            },
            enumerable: false,
            configurable: true
        });
        RootView.prototype.applyModel_ = function () {
            var containerElem = this.containerElem_;
            if (!containerElem) {
                throw PaneError.alreadyDisposed();
            }
            var expanded = this.folder_ ? this.folder_.styleExpanded : true;
            var expandedClass = className$5(undefined, 'expanded');
            if (expanded) {
                this.element.classList.add(expandedClass);
            }
            else {
                this.element.classList.remove(expandedClass);
            }
            containerElem.style.height = this.folder_
                ? this.folder_.styleHeight
                : 'auto';
        };
        RootView.prototype.onFolderChange_ = function () {
            this.applyModel_();
        };
        return RootView;
    }(View));

    function createFolder(config) {
        if (!config.title) {
            return null;
        }
        return new Folder(config.title, TypeUtil.getOrDefault(config.expanded, true));
    }
    /**
     * @hidden
     */
    var RootController = /** @class */ (function () {
        function RootController(document, config) {
            this.onContainerTransitionEnd_ = this.onContainerTransitionEnd_.bind(this);
            this.onFolderBeforeChange_ = this.onFolderBeforeChange_.bind(this);
            this.onTitleClick_ = this.onTitleClick_.bind(this);
            this.onUiContainerAdd_ = this.onUiContainerAdd_.bind(this);
            this.onUiContainerItemLayout_ = this.onUiContainerItemLayout_.bind(this);
            this.onUiContainerRemove_ = this.onUiContainerRemove_.bind(this);
            this.folder = createFolder(config);
            if (this.folder) {
                this.folder.emitter.on('beforechange', this.onFolderBeforeChange_);
            }
            this.ucList_ = new UiContainer();
            this.ucList_.emitter.on('add', this.onUiContainerAdd_);
            this.ucList_.emitter.on('itemlayout', this.onUiContainerItemLayout_);
            this.ucList_.emitter.on('remove', this.onUiContainerRemove_);
            this.doc_ = document;
            this.viewModel = config.viewModel;
            this.view = new RootView(this.doc_, {
                folder: this.folder,
                model: this.viewModel,
            });
            if (this.view.titleElement) {
                this.view.titleElement.addEventListener('click', this.onTitleClick_);
            }
            this.view.containerElement.addEventListener('transitionend', this.onContainerTransitionEnd_);
        }
        Object.defineProperty(RootController.prototype, "document", {
            get: function () {
                return this.doc_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RootController.prototype, "uiContainer", {
            get: function () {
                return this.ucList_;
            },
            enumerable: false,
            configurable: true
        });
        RootController.prototype.onFolderBeforeChange_ = function (ev) {
            if (ev.propertyName !== 'expanded') {
                return;
            }
            var folder = this.folder;
            if (!folder) {
                return;
            }
            if (TypeUtil.isEmpty(folder.expandedHeight)) {
                folder.expandedHeight = computeExpandedFolderHeight(folder, this.view.containerElement);
            }
            folder.shouldFixHeight = true;
            forceReflow(this.view.containerElement);
        };
        RootController.prototype.applyUiContainerChange_ = function () {
            updateAllItemsPositions(this.uiContainer);
        };
        RootController.prototype.onUiContainerAdd_ = function (ev) {
            insertElementAt(this.view.containerElement, ev.uiController.view.element, ev.index);
            this.applyUiContainerChange_();
        };
        RootController.prototype.onUiContainerRemove_ = function (_) {
            this.applyUiContainerChange_();
        };
        RootController.prototype.onUiContainerItemLayout_ = function (_) {
            this.applyUiContainerChange_();
        };
        RootController.prototype.onTitleClick_ = function () {
            if (this.folder) {
                this.folder.expanded = !this.folder.expanded;
            }
        };
        RootController.prototype.onContainerTransitionEnd_ = function (ev) {
            if (ev.propertyName !== 'height') {
                return;
            }
            if (this.folder) {
                this.folder.shouldFixHeight = false;
                this.folder.expandedHeight = null;
            }
        };
        return RootController;
    }());

    /**
     * @hidden
     */
    var ListConstraint = /** @class */ (function () {
        function ListConstraint(config) {
            this.opts_ = config.options;
        }
        Object.defineProperty(ListConstraint.prototype, "options", {
            get: function () {
                return this.opts_;
            },
            enumerable: false,
            configurable: true
        });
        ListConstraint.prototype.constrain = function (value) {
            var opts = this.opts_;
            if (opts.length === 0) {
                return value;
            }
            var matched = opts.filter(function (item) {
                return item.value === value;
            }).length > 0;
            return matched ? value : opts[0].value;
        };
        return ListConstraint;
    }());

    var className$6 = ClassName('ckb', 'input');
    /**
     * @hidden
     */
    var CheckboxInputView = /** @class */ (function (_super) {
        __extends(CheckboxInputView, _super);
        function CheckboxInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.element.classList.add(className$6());
            var labelElem = document.createElement('label');
            labelElem.classList.add(className$6('l'));
            _this.element.appendChild(labelElem);
            var inputElem = document.createElement('input');
            inputElem.classList.add(className$6('i'));
            inputElem.type = 'checkbox';
            labelElem.appendChild(inputElem);
            _this.inputElem_ = inputElem;
            var markElem = document.createElement('div');
            markElem.classList.add(className$6('m'));
            labelElem.appendChild(markElem);
            config.value.emitter.on('change', _this.onValueChange_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.inputElem_ = disposeElement(_this.inputElem_);
            });
            return _this;
        }
        Object.defineProperty(CheckboxInputView.prototype, "inputElement", {
            get: function () {
                if (!this.inputElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.inputElem_;
            },
            enumerable: false,
            configurable: true
        });
        CheckboxInputView.prototype.update = function () {
            if (!this.inputElem_) {
                throw PaneError.alreadyDisposed();
            }
            this.inputElem_.checked = this.value.rawValue;
        };
        CheckboxInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return CheckboxInputView;
    }(View));

    /**
     * @hidden
     */
    var CheckboxInputController = /** @class */ (function () {
        function CheckboxInputController(document, config) {
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.view = new CheckboxInputView(document, {
                model: this.viewModel,
                value: this.value,
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
        }
        CheckboxInputController.prototype.onInputChange_ = function (e) {
            var inputElem = TypeUtil.forceCast(e.currentTarget);
            this.value.rawValue = inputElem.checked;
            this.view.update();
        };
        return CheckboxInputController;
    }());

    var className$7 = ClassName('lst', 'input');
    /**
     * @hidden
     */
    var ListInputView = /** @class */ (function (_super) {
        __extends(ListInputView, _super);
        function ListInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.element.classList.add(className$7());
            _this.stringifyValue_ = config.stringifyValue;
            var selectElem = document.createElement('select');
            selectElem.classList.add(className$7('s'));
            config.options.forEach(function (item, index) {
                var optionElem = document.createElement('option');
                optionElem.dataset.index = String(index);
                optionElem.textContent = item.text;
                optionElem.value = _this.stringifyValue_(item.value);
                selectElem.appendChild(optionElem);
            });
            _this.element.appendChild(selectElem);
            _this.selectElem_ = selectElem;
            var markElem = document.createElement('div');
            markElem.classList.add(className$7('m'));
            _this.element.appendChild(markElem);
            config.value.emitter.on('change', _this.onValueChange_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.selectElem_ = disposeElement(_this.selectElem_);
            });
            return _this;
        }
        Object.defineProperty(ListInputView.prototype, "selectElement", {
            get: function () {
                if (!this.selectElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.selectElem_;
            },
            enumerable: false,
            configurable: true
        });
        ListInputView.prototype.update = function () {
            if (!this.selectElem_) {
                throw PaneError.alreadyDisposed();
            }
            this.selectElem_.value = this.stringifyValue_(this.value.rawValue);
        };
        ListInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return ListInputView;
    }(View));

    function findListItems(value) {
        var c = value.constraint
            ? ConstraintUtil.findConstraint(value.constraint, ListConstraint)
            : null;
        if (!c) {
            return null;
        }
        return c.options;
    }
    /**
     * @hidden
     */
    var ListInputController = /** @class */ (function () {
        function ListInputController(document, config) {
            this.onSelectChange_ = this.onSelectChange_.bind(this);
            this.value_ = config.value;
            this.listItems_ = findListItems(this.value_) || [];
            this.viewModel = config.viewModel;
            this.view_ = new ListInputView(document, {
                model: this.viewModel,
                options: this.listItems_,
                stringifyValue: config.stringifyValue,
                value: this.value_,
            });
            this.view_.selectElement.addEventListener('change', this.onSelectChange_);
        }
        Object.defineProperty(ListInputController.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListInputController.prototype, "view", {
            get: function () {
                return this.view_;
            },
            enumerable: false,
            configurable: true
        });
        ListInputController.prototype.onSelectChange_ = function (e) {
            var selectElem = TypeUtil.forceCast(e.currentTarget);
            var optElem = selectElem.selectedOptions.item(0);
            if (!optElem) {
                return;
            }
            var itemIndex = Number(optElem.dataset.index);
            this.value_.rawValue = this.listItems_[itemIndex].value;
            this.view_.update();
        };
        return ListInputController;
    }());

    /**
     * @hidden
     */
    function fromMixed(value) {
        if (value === 'false') {
            return false;
        }
        return !!value;
    }
    /**
     * @hidden
     */
    function toString(value) {
        return String(value);
    }

    function createConstraint(params) {
        var constraints = [];
        if ('options' in params && params.options !== undefined) {
            constraints.push(new ListConstraint({
                options: normalizeInputParamsOptions(params.options, fromMixed),
            }));
        }
        return new CompositeConstraint({
            constraints: constraints,
        });
    }
    function createController$2(document, value) {
        var c = value.constraint;
        if (c && ConstraintUtil.findConstraint(c, ListConstraint)) {
            return new ListInputController(document, {
                viewModel: new ViewModel(),
                stringifyValue: toString,
                value: value,
            });
        }
        return new CheckboxInputController(document, {
            viewModel: new ViewModel(),
            value: value,
        });
    }
    /**
     * @hidden
     */
    var BooleanInputPlugin = {
        model: {
            accept: function (value) { return (typeof value === 'boolean' ? value : null); },
            reader: function (_args) { return fromMixed; },
            writer: function (_args) { return function (v) { return v; }; },
            constraint: function (args) { return createConstraint(args.params); },
        },
        controller: function (args) {
            return createController$2(args.document, args.binding.value);
        },
    };

    var className$8 = ClassName('cswtxt', 'input');
    /**
     * @hidden
     */
    var ColorSwatchTextInputView = /** @class */ (function (_super) {
        __extends(ColorSwatchTextInputView, _super);
        function ColorSwatchTextInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.element.classList.add(className$8());
            var swatchElem = document.createElement('div');
            swatchElem.classList.add(className$8('s'));
            _this.swatchInputView_ = config.swatchInputView;
            swatchElem.appendChild(_this.swatchInputView_.element);
            _this.element.appendChild(swatchElem);
            var textElem = document.createElement('div');
            textElem.classList.add(className$8('t'));
            _this.textInputView = config.textInputView;
            textElem.appendChild(_this.textInputView.element);
            _this.element.appendChild(textElem);
            return _this;
        }
        Object.defineProperty(ColorSwatchTextInputView.prototype, "value", {
            get: function () {
                return this.textInputView.value;
            },
            enumerable: false,
            configurable: true
        });
        ColorSwatchTextInputView.prototype.update = function () {
            this.swatchInputView_.update();
            this.textInputView.update();
        };
        return ColorSwatchTextInputView;
    }(View));

    var PickedColor = /** @class */ (function () {
        function PickedColor(value) {
            this.onValueChange_ = this.onValueChange_.bind(this);
            this.mode_ = 'rgb';
            this.value = value;
            this.value.emitter.on('change', this.onValueChange_);
            this.emitter = new Emitter();
        }
        Object.defineProperty(PickedColor.prototype, "mode", {
            get: function () {
                return this.mode_;
            },
            set: function (mode) {
                if (this.mode_ === mode) {
                    return;
                }
                this.mode_ = mode;
                this.emitter.emit('change', {
                    propertyName: 'mode',
                    sender: this,
                });
            },
            enumerable: false,
            configurable: true
        });
        PickedColor.prototype.onValueChange_ = function () {
            this.emitter.emit('change', {
                propertyName: 'value',
                sender: this,
            });
        };
        return PickedColor;
    }());

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

    var innerFormatter = new NumberFormatter(0);
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

    function rgbToHsl(r, g, b) {
        var rp = NumberUtil.constrain(r / 255, 0, 1);
        var gp = NumberUtil.constrain(g / 255, 0, 1);
        var bp = NumberUtil.constrain(b / 255, 0, 1);
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
        var sp = NumberUtil.constrain(s / 100, 0, 1);
        var lp = NumberUtil.constrain(l / 100, 0, 1);
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
        var rp = NumberUtil.constrain(r / 255, 0, 1);
        var gp = NumberUtil.constrain(g / 255, 0, 1);
        var bp = NumberUtil.constrain(b / 255, 0, 1);
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
        var hp = NumberUtil.loop(h, 360);
        var sp = NumberUtil.constrain(s / 100, 0, 1);
        var vp = NumberUtil.constrain(v / 100, 0, 1);
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
    /**
     * @hidden
     */
    function withoutAlpha(comps) {
        return [comps[0], comps[1], comps[2]];
    }
    /**
     * @hidden
     */
    function withAlpha(comps, alpha) {
        return [comps[0], comps[1], comps[2], alpha];
    }
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

    var CONSTRAINT_MAP = {
        hsl: function (comps) {
            return [
                NumberUtil.loop(comps[0], 360),
                NumberUtil.constrain(comps[1], 0, 100),
                NumberUtil.constrain(comps[2], 0, 100),
                NumberUtil.constrain(TypeUtil.getOrDefault(comps[3], 1), 0, 1),
            ];
        },
        hsv: function (comps) {
            return [
                NumberUtil.loop(comps[0], 360),
                NumberUtil.constrain(comps[1], 0, 100),
                NumberUtil.constrain(comps[2], 0, 100),
                NumberUtil.constrain(TypeUtil.getOrDefault(comps[3], 1), 0, 1),
            ];
        },
        rgb: function (comps) {
            return [
                NumberUtil.constrain(comps[0], 0, 255),
                NumberUtil.constrain(comps[1], 0, 255),
                NumberUtil.constrain(comps[2], 0, 255),
                NumberUtil.constrain(TypeUtil.getOrDefault(comps[3], 1), 0, 1),
            ];
        },
    };
    function isRgbColorComponent(obj, key) {
        if (typeof obj !== 'object' || TypeUtil.isEmpty(obj)) {
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
        Color.equals = function (v1, v2) {
            if (v1.mode_ !== v2.mode_) {
                return false;
            }
            var comps1 = v1.comps_;
            var comps2 = v2.comps_;
            for (var i = 0; i < comps1.length; i++) {
                if (comps1[i] !== comps2[i]) {
                    return false;
                }
            }
            return true;
        };
        Object.defineProperty(Color.prototype, "mode", {
            get: function () {
                return this.mode_;
            },
            enumerable: false,
            configurable: true
        });
        Color.prototype.getComponents = function (opt_mode) {
            return withAlpha(convertMode(withoutAlpha(this.comps_), this.mode_, opt_mode || this.mode_), this.comps_[3]);
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

    /**
     * @hidden
     */
    var RgbParser = function (num) {
        return new Color([(num >> 16) & 0xff, (num >> 8) & 0xff, num & 0xff], 'rgb');
    };
    /**
     * @hidden
     */
    var RgbaParser = function (num) {
        return new Color([
            (num >> 24) & 0xff,
            (num >> 16) & 0xff,
            (num >> 8) & 0xff,
            NumberUtil.map(num & 0xff, 0, 255, 0, 1),
        ], 'rgb');
    };

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
            return new Color(comps, 'rgb');
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
            return new Color(comps, 'rgb');
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
            return new Color(comps, 'hsl');
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
            return new Color(comps, 'hsl');
        },
        'hex.rgb': function (text) {
            var mRrggbb = text.match(/^#([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRrggbb) {
                return new Color([
                    parseInt(mRrggbb[1] + mRrggbb[1], 16),
                    parseInt(mRrggbb[2] + mRrggbb[2], 16),
                    parseInt(mRrggbb[3] + mRrggbb[3], 16),
                ], 'rgb');
            }
            var mRgb = text.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRgb) {
                return new Color([parseInt(mRgb[1], 16), parseInt(mRgb[2], 16), parseInt(mRgb[3], 16)], 'rgb');
            }
            return null;
        },
        'hex.rgba': function (text) {
            var mRrggbb = text.match(/^#?([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])$/);
            if (mRrggbb) {
                return new Color([
                    parseInt(mRrggbb[1] + mRrggbb[1], 16),
                    parseInt(mRrggbb[2] + mRrggbb[2], 16),
                    parseInt(mRrggbb[3] + mRrggbb[3], 16),
                    NumberUtil.map(parseInt(mRrggbb[4] + mRrggbb[4], 16), 0, 255, 0, 1),
                ], 'rgb');
            }
            var mRgb = text.match(/^#?([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (mRgb) {
                return new Color([
                    parseInt(mRgb[1], 16),
                    parseInt(mRgb[2], 16),
                    parseInt(mRgb[3], 16),
                    NumberUtil.map(parseInt(mRgb[4], 16), 0, 255, 0, 1),
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
    /**
     * @hidden
     */
    var CompositeParser = function (text) {
        var notation = getNotation(text);
        return notation ? NOTATION_TO_PARSER_MAP[notation](text) : null;
    };
    function hasAlphaComponent(notation) {
        return (notation === 'func.hsla' ||
            notation === 'func.rgba' ||
            notation === 'hex.rgba');
    }

    function createEmptyColor() {
        return new Color([0, 0, 0], 'rgb');
    }
    /**
     * @hidden
     */
    function fromString(value) {
        if (typeof value === 'string') {
            var cv = CompositeParser(value);
            if (cv) {
                return cv;
            }
        }
        return createEmptyColor();
    }
    /**
     * @hidden
     */
    function fromObject(value) {
        if (Color.isColorObject(value)) {
            return Color.fromObject(value);
        }
        return createEmptyColor();
    }
    /**
     * @hidden
     */
    function fromNumberToRgb(value) {
        if (typeof value === 'number') {
            var cv = RgbParser(value);
            if (cv) {
                return cv;
            }
        }
        return createEmptyColor();
    }
    /**
     * @hidden
     */
    function fromNumberToRgba(value) {
        if (typeof value === 'number') {
            var cv = RgbaParser(value);
            if (cv) {
                return cv;
            }
        }
        return createEmptyColor();
    }
    function zerofill(comp) {
        var hex = NumberUtil.constrain(Math.floor(comp), 0, 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    /**
     * @hidden
     */
    function toHexRgbString(value) {
        var hexes = withoutAlpha(value.getComponents('rgb'))
            .map(zerofill)
            .join('');
        return "#" + hexes;
    }
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
    /**
     * @hidden
     */
    function toFunctionalRgbString(value) {
        var formatter = new NumberFormatter(0);
        var comps = withoutAlpha(value.getComponents('rgb')).map(function (comp) { return formatter.format(comp); });
        return "rgb(" + comps.join(', ') + ")";
    }
    /**
     * @hidden
     */
    function toFunctionalRgbaString(value) {
        var aFormatter = new NumberFormatter(2);
        var rgbFormatter = new NumberFormatter(0);
        var comps = value.getComponents('rgb').map(function (comp, index) {
            var formatter = index === 3 ? aFormatter : rgbFormatter;
            return formatter.format(comp);
        });
        return "rgba(" + comps.join(', ') + ")";
    }
    /**
     * @hidden
     */
    function toFunctionalHslString(value) {
        var formatters = [
            new NumberFormatter(0),
            new PercentageFormatter(),
            new PercentageFormatter(),
        ];
        var comps = withoutAlpha(value.getComponents('hsl')).map(function (comp, index) { return formatters[index].format(comp); });
        return "hsl(" + comps.join(', ') + ")";
    }
    /**
     * @hidden
     */
    function toFunctionalHslaString(value) {
        var formatters = [
            new NumberFormatter(0),
            new PercentageFormatter(),
            new PercentageFormatter(),
            new NumberFormatter(2),
        ];
        var comps = value
            .getComponents('hsl')
            .map(function (comp, index) { return formatters[index].format(comp); });
        return "hsla(" + comps.join(', ') + ")";
    }
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
    /**
     * @hidden
     */
    function toRgbNumber(value) {
        return withoutAlpha(value.getComponents('rgb')).reduce(function (result, comp) {
            return (result << 8) | (Math.floor(comp) & 0xff);
        }, 0);
    }
    /**
     * @hidden
     */
    function toRgbaNumber(value) {
        return value.getComponents('rgb').reduce(function (result, comp, index) {
            var hex = Math.floor(index === 3 ? comp * 255 : comp) & 0xff;
            return (result << 8) | hex;
        }, 0);
    }

    var className$9 = ClassName('csw', 'input');
    /**
     * @hidden
     */
    var ColorSwatchInputView = /** @class */ (function (_super) {
        __extends(ColorSwatchInputView, _super);
        function ColorSwatchInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            if (_this.element === null) {
                throw PaneError.alreadyDisposed();
            }
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            config.value.emitter.on('change', _this.onValueChange_);
            _this.value = config.value;
            _this.element.classList.add(className$9());
            var swatchElem = document.createElement('div');
            swatchElem.classList.add(className$9('sw'));
            _this.element.appendChild(swatchElem);
            _this.swatchElem_ = swatchElem;
            var buttonElem = document.createElement('button');
            buttonElem.classList.add(className$9('b'));
            _this.element.appendChild(buttonElem);
            _this.buttonElem_ = buttonElem;
            var pickerElem = document.createElement('div');
            pickerElem.classList.add(className$9('p'));
            _this.pickerView_ = config.pickerInputView;
            pickerElem.appendChild(_this.pickerView_.element);
            _this.element.appendChild(pickerElem);
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.buttonElem_ = disposeElement(_this.buttonElem_);
                _this.swatchElem_ = disposeElement(_this.swatchElem_);
            });
            return _this;
        }
        Object.defineProperty(ColorSwatchInputView.prototype, "buttonElement", {
            get: function () {
                if (this.buttonElem_ === null) {
                    throw PaneError.alreadyDisposed();
                }
                return this.buttonElem_;
            },
            enumerable: false,
            configurable: true
        });
        ColorSwatchInputView.prototype.update = function () {
            if (!this.swatchElem_) {
                throw PaneError.alreadyDisposed();
            }
            var value = this.value.rawValue;
            this.swatchElem_.style.backgroundColor = toHexRgbaString(value);
        };
        ColorSwatchInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return ColorSwatchInputView;
    }(View));

    /**
     * @hidden
     */
    var Foldable = /** @class */ (function () {
        function Foldable() {
            this.emitter = new Emitter();
            this.expanded_ = false;
        }
        Object.defineProperty(Foldable.prototype, "expanded", {
            get: function () {
                return this.expanded_;
            },
            set: function (expanded) {
                var changed = this.expanded_ !== expanded;
                if (changed) {
                    this.expanded_ = expanded;
                    this.emitter.emit('change', {
                        sender: this,
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        return Foldable;
    }());

    /**
     * @hidden
     */
    function connect(_a) {
        var primary = _a.primary, secondary = _a.secondary;
        primary.emitter(primary.value).on('change', function () {
            primary.apply(primary.value, secondary.value);
        });
        secondary.emitter(secondary.value).on('change', function () {
            secondary.apply(secondary.value, primary.value);
        });
        primary.apply(primary.value, secondary.value);
    }

    /**
     * @hidden
     */
    var StringNumberParser = function (text) {
        var num = parseFloat(text);
        if (isNaN(num)) {
            return null;
        }
        return num;
    };

    var className$a = ClassName('clp', 'input');
    /**
     * @hidden
     */
    var ColorPickerInputView = /** @class */ (function (_super) {
        __extends(ColorPickerInputView, _super);
        function ColorPickerInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onFoldableChange_ = _this.onFoldableChange_.bind(_this);
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.pickedColor = config.pickedColor;
            _this.pickedColor.value.emitter.on('change', _this.onValueChange_);
            _this.foldable = config.foldable;
            _this.foldable.emitter.on('change', _this.onFoldableChange_);
            _this.element.classList.add(className$a());
            var hsvElem = document.createElement('div');
            hsvElem.classList.add(className$a('hsv'));
            var svElem = document.createElement('div');
            svElem.classList.add(className$a('sv'));
            _this.svPaletteView_ = config.svPaletteInputView;
            svElem.appendChild(_this.svPaletteView_.element);
            hsvElem.appendChild(svElem);
            var hElem = document.createElement('div');
            hElem.classList.add(className$a('h'));
            _this.hPaletteView_ = config.hPaletteInputView;
            hElem.appendChild(_this.hPaletteView_.element);
            hsvElem.appendChild(hElem);
            _this.element.appendChild(hsvElem);
            var rgbElem = document.createElement('div');
            rgbElem.classList.add(className$a('rgb'));
            _this.compTextsView_ = config.componentTextsView;
            rgbElem.appendChild(_this.compTextsView_.element);
            _this.element.appendChild(rgbElem);
            if (config.alphaInputViews) {
                _this.alphaViews_ = {
                    palette: config.alphaInputViews.palette,
                    text: config.alphaInputViews.text,
                };
                var aElem = document.createElement('div');
                aElem.classList.add(className$a('a'));
                var apElem = document.createElement('div');
                apElem.classList.add(className$a('ap'));
                apElem.appendChild(_this.alphaViews_.palette.element);
                aElem.appendChild(apElem);
                var atElem = document.createElement('div');
                atElem.classList.add(className$a('at'));
                atElem.appendChild(_this.alphaViews_.text.element);
                aElem.appendChild(atElem);
                _this.element.appendChild(aElem);
            }
            _this.update();
            return _this;
        }
        Object.defineProperty(ColorPickerInputView.prototype, "allFocusableElements", {
            get: function () {
                var elems = __spreadArrays([
                    this.svPaletteView_.element,
                    this.hPaletteView_.element
                ], this.compTextsView_.inputElements);
                if (this.alphaViews_) {
                    elems.push(this.alphaViews_.palette.element, this.alphaViews_.text.inputElement);
                }
                return TypeUtil.forceCast(elems);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorPickerInputView.prototype, "value", {
            get: function () {
                return this.pickedColor.value;
            },
            enumerable: false,
            configurable: true
        });
        ColorPickerInputView.prototype.update = function () {
            if (this.foldable.expanded) {
                this.element.classList.add(className$a(undefined, 'expanded'));
            }
            else {
                this.element.classList.remove(className$a(undefined, 'expanded'));
            }
        };
        ColorPickerInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        ColorPickerInputView.prototype.onFoldableChange_ = function () {
            this.update();
        };
        return ColorPickerInputView;
    }(View));

    function computeOffset(ev, elem) {
        // NOTE: OffsetX/Y should be computed from page and window properties to capture mouse events
        var win = elem.ownerDocument.defaultView;
        var rect = elem.getBoundingClientRect();
        return [
            ev.pageX - (((win && win.scrollX) || 0) + rect.left),
            ev.pageY - (((win && win.scrollY) || 0) + rect.top),
        ];
    }
    /**
     * A utility class to handle both mouse and touch events.
     * @hidden
     */
    var PointerHandler = /** @class */ (function () {
        function PointerHandler(document, element) {
            this.onDocumentMouseMove_ = this.onDocumentMouseMove_.bind(this);
            this.onDocumentMouseUp_ = this.onDocumentMouseUp_.bind(this);
            this.onMouseDown_ = this.onMouseDown_.bind(this);
            this.onTouchMove_ = this.onTouchMove_.bind(this);
            this.onTouchStart_ = this.onTouchStart_.bind(this);
            this.document = document;
            this.element = element;
            this.emitter = new Emitter();
            this.pressed_ = false;
            if (supportsTouch(this.document)) {
                element.addEventListener('touchstart', this.onTouchStart_);
                element.addEventListener('touchmove', this.onTouchMove_);
            }
            else {
                element.addEventListener('mousedown', this.onMouseDown_);
                this.document.addEventListener('mousemove', this.onDocumentMouseMove_);
                this.document.addEventListener('mouseup', this.onDocumentMouseUp_);
            }
        }
        PointerHandler.prototype.computePosition_ = function (offsetX, offsetY) {
            var rect = this.element.getBoundingClientRect();
            return {
                px: offsetX / rect.width,
                py: offsetY / rect.height,
            };
        };
        PointerHandler.prototype.onMouseDown_ = function (e) {
            var _a;
            // Prevent native text selection
            e.preventDefault();
            (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.focus();
            this.pressed_ = true;
            this.emitter.emit('down', {
                data: this.computePosition_.apply(this, computeOffset(e, this.element)),
                sender: this,
            });
        };
        PointerHandler.prototype.onDocumentMouseMove_ = function (e) {
            if (!this.pressed_) {
                return;
            }
            this.emitter.emit('move', {
                data: this.computePosition_.apply(this, computeOffset(e, this.element)),
                sender: this,
            });
        };
        PointerHandler.prototype.onDocumentMouseUp_ = function (e) {
            if (!this.pressed_) {
                return;
            }
            this.pressed_ = false;
            this.emitter.emit('up', {
                data: this.computePosition_.apply(this, computeOffset(e, this.element)),
                sender: this,
            });
        };
        PointerHandler.prototype.onTouchStart_ = function (e) {
            // Prevent native page scroll
            e.preventDefault();
            var touch = e.targetTouches[0];
            var rect = this.element.getBoundingClientRect();
            this.emitter.emit('down', {
                data: this.computePosition_(touch.clientX - rect.left, touch.clientY - rect.top),
                sender: this,
            });
        };
        PointerHandler.prototype.onTouchMove_ = function (e) {
            var touch = e.targetTouches[0];
            var rect = this.element.getBoundingClientRect();
            this.emitter.emit('move', {
                data: this.computePosition_(touch.clientX - rect.left, touch.clientY - rect.top),
                sender: this,
            });
        };
        return PointerHandler;
    }());

    var className$b = ClassName('apl', 'input');
    /**
     * @hidden
     */
    var APaletteInputView = /** @class */ (function (_super) {
        __extends(APaletteInputView, _super);
        function APaletteInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.value = config.value;
            _this.value.emitter.on('change', _this.onValueChange_);
            _this.element.classList.add(className$b());
            _this.element.tabIndex = 0;
            var barElem = document.createElement('div');
            barElem.classList.add(className$b('b'));
            _this.element.appendChild(barElem);
            var colorElem = document.createElement('div');
            colorElem.classList.add(className$b('c'));
            barElem.appendChild(colorElem);
            _this.colorElem_ = colorElem;
            var markerElem = document.createElement('div');
            markerElem.classList.add(className$b('m'));
            _this.element.appendChild(markerElem);
            _this.markerElem_ = markerElem;
            var previewElem = document.createElement('div');
            previewElem.classList.add(className$b('p'));
            _this.markerElem_.appendChild(previewElem);
            _this.previewElem_ = previewElem;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.colorElem_ = disposeElement(_this.colorElem_);
                _this.markerElem_ = disposeElement(_this.markerElem_);
            });
            return _this;
        }
        APaletteInputView.prototype.update = function () {
            if (!this.markerElem_ || !this.previewElem_ || !this.colorElem_) {
                throw PaneError.alreadyDisposed();
            }
            var c = this.value.rawValue;
            var rgbaComps = c.getComponents('rgb');
            var leftColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 0], 'rgb');
            var rightColor = new Color([rgbaComps[0], rgbaComps[1], rgbaComps[2], 255], 'rgb');
            var gradientComps = [
                'to right',
                toFunctionalRgbaString(leftColor),
                toFunctionalRgbaString(rightColor),
            ];
            this.colorElem_.style.background = "linear-gradient(" + gradientComps.join(',') + ")";
            this.previewElem_.style.backgroundColor = toFunctionalRgbaString(c);
            var left = NumberUtil.map(rgbaComps[3], 0, 1, 0, 100);
            this.markerElem_.style.left = left + "%";
        };
        APaletteInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return APaletteInputView;
    }(View));

    /**
     * @hidden
     */
    var APaletteInputController = /** @class */ (function () {
        function APaletteInputController(document, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.view = new APaletteInputView(document, {
                model: this.viewModel,
                value: this.value,
            });
            this.ptHandler_ = new PointerHandler(document, this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
        }
        APaletteInputController.prototype.handlePointerEvent_ = function (d) {
            var alpha = d.px;
            var c = this.value.rawValue;
            var _a = c.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2];
            this.value.rawValue = new Color([h, s, v, alpha], 'hsv');
            this.view.update();
        };
        APaletteInputController.prototype.onPointerDown_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        APaletteInputController.prototype.onPointerMove_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        APaletteInputController.prototype.onPointerUp_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        APaletteInputController.prototype.onKeyDown_ = function (ev) {
            var step = getStepForKey(getBaseStepForColor(true), getHorizontalStepKeys(ev));
            var c = this.value.rawValue;
            var _a = c.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
            this.value.rawValue = new Color([h, s, v, a + step], 'hsv');
        };
        return APaletteInputController;
    }());

    var className$c = ClassName('cctxts', 'input');
    var FORMATTER = new NumberFormatter(0);
    function createModeSelectElement(document) {
        var selectElem = document.createElement('select');
        var items = [
            { text: 'RGB', value: 'rgb' },
            { text: 'HSL', value: 'hsl' },
            { text: 'HSV', value: 'hsv' },
        ];
        selectElem.appendChild(items.reduce(function (frag, item) {
            var optElem = document.createElement('option');
            optElem.textContent = item.text;
            optElem.value = item.value;
            frag.appendChild(optElem);
            return frag;
        }, document.createDocumentFragment()));
        return selectElem;
    }
    /**
     * @hidden
     */
    var ColorComponentTextsInputView = /** @class */ (function (_super) {
        __extends(ColorComponentTextsInputView, _super);
        function ColorComponentTextsInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.element.classList.add(className$c());
            var modeElem = document.createElement('div');
            modeElem.classList.add(className$c('m'));
            _this.modeSelectElement = createModeSelectElement(document);
            _this.modeSelectElement.classList.add(className$c('ms'));
            modeElem.appendChild(_this.modeSelectElement);
            var modeMarkerElem = document.createElement('div');
            modeMarkerElem.classList.add(className$c('mm'));
            modeElem.appendChild(modeMarkerElem);
            _this.element.appendChild(modeElem);
            var wrapperElem = document.createElement('div');
            wrapperElem.classList.add(className$c('w'));
            _this.element.appendChild(wrapperElem);
            var inputElems = [0, 1, 2].map(function () {
                var inputElem = document.createElement('input');
                inputElem.classList.add(className$c('i'));
                inputElem.type = 'text';
                return inputElem;
            });
            inputElems.forEach(function (elem) {
                wrapperElem.appendChild(elem);
            });
            _this.inputElems_ = [inputElems[0], inputElems[1], inputElems[2]];
            _this.pickedColor = config.pickedColor;
            _this.pickedColor.emitter.on('change', _this.onValueChange_);
            _this.update();
            config.model.emitter.on('dispose', function () {
                if (_this.inputElems_) {
                    _this.inputElems_.forEach(function (elem) {
                        disposeElement(elem);
                    });
                    _this.inputElems_ = null;
                }
            });
            return _this;
        }
        Object.defineProperty(ColorComponentTextsInputView.prototype, "inputElements", {
            get: function () {
                if (!this.inputElems_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.inputElems_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ColorComponentTextsInputView.prototype, "value", {
            get: function () {
                return this.pickedColor.value;
            },
            enumerable: false,
            configurable: true
        });
        ColorComponentTextsInputView.prototype.update = function () {
            var inputElems = this.inputElems_;
            if (!inputElems) {
                throw PaneError.alreadyDisposed();
            }
            var comps = this.pickedColor.value.rawValue.getComponents(this.pickedColor.mode);
            comps.forEach(function (comp, index) {
                var inputElem = inputElems[index];
                if (!inputElem) {
                    return;
                }
                inputElem.value = FORMATTER.format(comp);
            });
        };
        ColorComponentTextsInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return ColorComponentTextsInputView;
    }(View));

    /**
     * @hidden
     */
    var ColorComponentTextsInputController = /** @class */ (function () {
        function ColorComponentTextsInputController(document, config) {
            var _this = this;
            this.onModeSelectChange_ = this.onModeSelectChange_.bind(this);
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
            this.parser_ = config.parser;
            this.pickedColor = config.pickedColor;
            this.viewModel = config.viewModel;
            this.view = new ColorComponentTextsInputView(document, {
                model: this.viewModel,
                pickedColor: this.pickedColor,
            });
            this.view.inputElements.forEach(function (inputElem) {
                inputElem.addEventListener('change', _this.onInputChange_);
                inputElem.addEventListener('keydown', _this.onInputKeyDown_);
            });
            this.view.modeSelectElement.addEventListener('change', this.onModeSelectChange_);
        }
        Object.defineProperty(ColorComponentTextsInputController.prototype, "value", {
            get: function () {
                return this.pickedColor.value;
            },
            enumerable: false,
            configurable: true
        });
        ColorComponentTextsInputController.prototype.findIndexOfInputElem_ = function (inputElem) {
            var inputElems = this.view.inputElements;
            for (var i = 0; i < inputElems.length; i++) {
                if (inputElems[i] === inputElem) {
                    return i;
                }
            }
            return null;
        };
        ColorComponentTextsInputController.prototype.updateComponent_ = function (index, newValue) {
            var mode = this.pickedColor.mode;
            var comps = this.value.rawValue.getComponents(mode);
            var newComps = comps.map(function (comp, i) {
                return i === index ? newValue : comp;
            });
            this.value.rawValue = new Color(newComps, mode);
            this.view.update();
        };
        ColorComponentTextsInputController.prototype.onInputChange_ = function (e) {
            var inputElem = TypeUtil.forceCast(e.currentTarget);
            var parsedValue = this.parser_(inputElem.value);
            if (TypeUtil.isEmpty(parsedValue)) {
                return;
            }
            var compIndex = this.findIndexOfInputElem_(inputElem);
            if (TypeUtil.isEmpty(compIndex)) {
                return;
            }
            this.updateComponent_(compIndex, parsedValue);
        };
        ColorComponentTextsInputController.prototype.onInputKeyDown_ = function (e) {
            var compIndex = this.findIndexOfInputElem_(e.currentTarget);
            var step = getStepForKey(getBaseStepForColor(compIndex === 3), getVerticalStepKeys(e));
            if (step === 0) {
                return;
            }
            var inputElem = TypeUtil.forceCast(e.currentTarget);
            var parsedValue = this.parser_(inputElem.value);
            if (TypeUtil.isEmpty(parsedValue)) {
                return;
            }
            if (TypeUtil.isEmpty(compIndex)) {
                return;
            }
            this.updateComponent_(compIndex, parsedValue + step);
        };
        ColorComponentTextsInputController.prototype.onModeSelectChange_ = function (ev) {
            var selectElem = ev.currentTarget;
            this.pickedColor.mode = selectElem.value;
        };
        return ColorComponentTextsInputController;
    }());

    var className$d = ClassName('hpl', 'input');
    /**
     * @hidden
     */
    var HPaletteInputView = /** @class */ (function (_super) {
        __extends(HPaletteInputView, _super);
        function HPaletteInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.value = config.value;
            _this.value.emitter.on('change', _this.onValueChange_);
            _this.element.classList.add(className$d());
            _this.element.tabIndex = 0;
            var colorElem = document.createElement('div');
            colorElem.classList.add(className$d('c'));
            _this.element.appendChild(colorElem);
            _this.colorElem_ = colorElem;
            var markerElem = document.createElement('div');
            markerElem.classList.add(className$d('m'));
            _this.element.appendChild(markerElem);
            _this.markerElem_ = markerElem;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.colorElem_ = disposeElement(_this.colorElem_);
                _this.markerElem_ = disposeElement(_this.markerElem_);
            });
            return _this;
        }
        HPaletteInputView.prototype.update = function () {
            if (!this.markerElem_) {
                throw PaneError.alreadyDisposed();
            }
            var c = this.value.rawValue;
            var h = c.getComponents('hsv')[0];
            this.markerElem_.style.backgroundColor = toFunctionalRgbString(new Color([h, 100, 100], 'hsv'));
            var left = NumberUtil.map(h, 0, 360, 0, 100);
            this.markerElem_.style.left = left + "%";
        };
        HPaletteInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return HPaletteInputView;
    }(View));

    /**
     * @hidden
     */
    var HPaletteInputController = /** @class */ (function () {
        function HPaletteInputController(document, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.view = new HPaletteInputView(document, {
                model: this.viewModel,
                value: this.value,
            });
            this.ptHandler_ = new PointerHandler(document, this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
        }
        HPaletteInputController.prototype.handlePointerEvent_ = function (d) {
            var hue = NumberUtil.map(d.px, 0, 1, 0, 360);
            var c = this.value.rawValue;
            var _a = c.getComponents('hsv'), s = _a[1], v = _a[2], a = _a[3];
            this.value.rawValue = new Color([hue, s, v, a], 'hsv');
            this.view.update();
        };
        HPaletteInputController.prototype.onPointerDown_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        HPaletteInputController.prototype.onPointerMove_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        HPaletteInputController.prototype.onPointerUp_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        HPaletteInputController.prototype.onKeyDown_ = function (ev) {
            var step = getStepForKey(getBaseStepForColor(false), getHorizontalStepKeys(ev));
            var c = this.value.rawValue;
            var _a = c.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
            this.value.rawValue = new Color([h + step, s, v, a], 'hsv');
        };
        return HPaletteInputController;
    }());

    var className$e = ClassName('txt', 'input');
    /**
     * @hidden
     */
    var TextInputView = /** @class */ (function (_super) {
        __extends(TextInputView, _super);
        function TextInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.formatter_ = config.formatter;
            _this.element.classList.add(className$e());
            var inputElem = document.createElement('input');
            inputElem.classList.add(className$e('i'));
            inputElem.type = 'text';
            _this.element.appendChild(inputElem);
            _this.inputElem_ = inputElem;
            config.value.emitter.on('change', _this.onValueChange_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.inputElem_ = disposeElement(_this.inputElem_);
            });
            return _this;
        }
        Object.defineProperty(TextInputView.prototype, "inputElement", {
            get: function () {
                if (!this.inputElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.inputElem_;
            },
            enumerable: false,
            configurable: true
        });
        TextInputView.prototype.update = function () {
            if (!this.inputElem_) {
                throw PaneError.alreadyDisposed();
            }
            this.inputElem_.value = this.formatter_.format(this.value.rawValue);
        };
        TextInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return TextInputView;
    }(View));

    /**
     * @hidden
     */
    var TextInputController = /** @class */ (function () {
        function TextInputController(document, config) {
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.parser_ = config.parser;
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.view = new TextInputView(document, {
                formatter: config.formatter,
                model: this.viewModel,
                value: this.value,
            });
            this.view.inputElement.addEventListener('change', this.onInputChange_);
        }
        TextInputController.prototype.onInputChange_ = function (e) {
            var inputElem = TypeUtil.forceCast(e.currentTarget);
            var value = inputElem.value;
            var parsedValue = this.parser_(value);
            if (!TypeUtil.isEmpty(parsedValue)) {
                this.value.rawValue = parsedValue;
            }
            this.view.update();
        };
        return TextInputController;
    }());

    /**
     * @hidden
     */
    var NumberTextInputController = /** @class */ (function (_super) {
        __extends(NumberTextInputController, _super);
        function NumberTextInputController(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onInputKeyDown_ = _this.onInputKeyDown_.bind(_this);
            _this.step_ = TypeUtil.getOrDefault(config.step, getStepForTextInput(_this.value.constraint));
            _this.view.inputElement.addEventListener('keydown', _this.onInputKeyDown_);
            return _this;
        }
        NumberTextInputController.prototype.onInputKeyDown_ = function (e) {
            var step = getStepForKey(this.step_, getVerticalStepKeys(e));
            if (step !== 0) {
                this.value.rawValue += step;
                this.view.update();
            }
        };
        return NumberTextInputController;
    }(TextInputController));

    var className$f = ClassName('svp', 'input');
    var CANVAS_RESOL = 64;
    /**
     * @hidden
     */
    var SvPaletteInputView = /** @class */ (function (_super) {
        __extends(SvPaletteInputView, _super);
        function SvPaletteInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.value = config.value;
            _this.value.emitter.on('change', _this.onValueChange_);
            _this.element.classList.add(className$f());
            _this.element.tabIndex = 0;
            var canvasElem = document.createElement('canvas');
            canvasElem.height = CANVAS_RESOL;
            canvasElem.width = CANVAS_RESOL;
            canvasElem.classList.add(className$f('c'));
            _this.element.appendChild(canvasElem);
            _this.canvasElem_ = canvasElem;
            var markerElem = document.createElement('div');
            markerElem.classList.add(className$f('m'));
            _this.element.appendChild(markerElem);
            _this.markerElem_ = markerElem;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.canvasElem_ = disposeElement(_this.canvasElem_);
                _this.markerElem_ = disposeElement(_this.markerElem_);
            });
            return _this;
        }
        Object.defineProperty(SvPaletteInputView.prototype, "canvasElement", {
            get: function () {
                if (!this.canvasElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.canvasElem_;
            },
            enumerable: false,
            configurable: true
        });
        SvPaletteInputView.prototype.update = function () {
            if (!this.markerElem_) {
                throw PaneError.alreadyDisposed();
            }
            var ctx = getCanvasContext(this.canvasElement);
            if (!ctx) {
                return;
            }
            var c = this.value.rawValue;
            var hsvComps = c.getComponents('hsv');
            var width = this.canvasElement.width;
            var height = this.canvasElement.height;
            var imgData = ctx.getImageData(0, 0, width, height);
            var data = imgData.data;
            for (var iy = 0; iy < height; iy++) {
                for (var ix = 0; ix < width; ix++) {
                    var s = NumberUtil.map(ix, 0, width, 0, 100);
                    var v = NumberUtil.map(iy, 0, height, 100, 0);
                    var rgbComps = hsvToRgb(hsvComps[0], s, v);
                    var i = (iy * width + ix) * 4;
                    data[i] = rgbComps[0];
                    data[i + 1] = rgbComps[1];
                    data[i + 2] = rgbComps[2];
                    data[i + 3] = 255;
                }
            }
            ctx.putImageData(imgData, 0, 0);
            var left = NumberUtil.map(hsvComps[1], 0, 100, 0, 100);
            this.markerElem_.style.left = left + "%";
            var top = NumberUtil.map(hsvComps[2], 0, 100, 100, 0);
            this.markerElem_.style.top = top + "%";
        };
        SvPaletteInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return SvPaletteInputView;
    }(View));

    /**
     * @hidden
     */
    var SvPaletteInputController = /** @class */ (function () {
        function SvPaletteInputController(document, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.view = new SvPaletteInputView(document, {
                model: this.viewModel,
                value: this.value,
            });
            this.ptHandler_ = new PointerHandler(document, this.view.element);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
        }
        SvPaletteInputController.prototype.handlePointerEvent_ = function (d) {
            var saturation = NumberUtil.map(d.px, 0, 1, 0, 100);
            var value = NumberUtil.map(d.py, 0, 1, 100, 0);
            var _a = this.value.rawValue.getComponents('hsv'), h = _a[0], a = _a[3];
            this.value.rawValue = new Color([h, saturation, value, a], 'hsv');
            this.view.update();
        };
        SvPaletteInputController.prototype.onPointerDown_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        SvPaletteInputController.prototype.onPointerMove_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        SvPaletteInputController.prototype.onPointerUp_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        SvPaletteInputController.prototype.onKeyDown_ = function (ev) {
            if (isArrowKey(ev.keyCode)) {
                ev.preventDefault();
            }
            var _a = this.value.rawValue.getComponents('hsv'), h = _a[0], s = _a[1], v = _a[2], a = _a[3];
            var baseStep = getBaseStepForColor(false);
            this.value.rawValue = new Color([
                h,
                s + getStepForKey(baseStep, getHorizontalStepKeys(ev)),
                v + getStepForKey(baseStep, getVerticalStepKeys(ev)),
                a,
            ], 'hsv');
        };
        return SvPaletteInputController;
    }());

    /**
     * @hidden
     */
    var ColorPickerInputController = /** @class */ (function () {
        function ColorPickerInputController(document, config) {
            var _this = this;
            this.triggerElement = null;
            this.onFocusableElementBlur_ = this.onFocusableElementBlur_.bind(this);
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.pickedColor = config.pickedColor;
            this.foldable = new Foldable();
            this.viewModel = config.viewModel;
            this.hPaletteIc_ = new HPaletteInputController(document, {
                value: this.pickedColor.value,
                viewModel: this.viewModel,
            });
            this.svPaletteIc_ = new SvPaletteInputController(document, {
                value: this.pickedColor.value,
                viewModel: this.viewModel,
            });
            this.alphaIcs_ = config.supportsAlpha
                ? {
                    palette: new APaletteInputController(document, {
                        value: this.pickedColor.value,
                        viewModel: this.viewModel,
                    }),
                    text: new NumberTextInputController(document, {
                        formatter: new NumberFormatter(2),
                        parser: StringNumberParser,
                        step: 0.1,
                        value: new InputValue(0),
                        viewModel: this.viewModel,
                    }),
                }
                : null;
            if (this.alphaIcs_) {
                connect({
                    primary: {
                        apply: function (from, to) {
                            to.rawValue = from.value.rawValue.getComponents()[3];
                        },
                        emitter: function (m) { return m.value.emitter; },
                        value: this.pickedColor,
                    },
                    secondary: {
                        apply: function (from, to) {
                            var comps = to.value.rawValue.getComponents();
                            comps[3] = from.rawValue;
                            to.value.rawValue = new Color(comps, to.value.rawValue.mode);
                        },
                        emitter: function (m) { return m.emitter; },
                        value: this.alphaIcs_.text.value,
                    },
                });
            }
            this.compTextsIc_ = new ColorComponentTextsInputController(document, {
                parser: StringNumberParser,
                pickedColor: this.pickedColor,
                viewModel: this.viewModel,
            });
            this.view = new ColorPickerInputView(document, {
                alphaInputViews: this.alphaIcs_
                    ? {
                        palette: this.alphaIcs_.palette.view,
                        text: this.alphaIcs_.text.view,
                    }
                    : null,
                componentTextsView: this.compTextsIc_.view,
                foldable: this.foldable,
                hPaletteInputView: this.hPaletteIc_.view,
                model: this.viewModel,
                pickedColor: this.pickedColor,
                supportsAlpha: config.supportsAlpha,
                svPaletteInputView: this.svPaletteIc_.view,
            });
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.allFocusableElements.forEach(function (elem) {
                elem.addEventListener('blur', _this.onFocusableElementBlur_);
            });
        }
        Object.defineProperty(ColorPickerInputController.prototype, "value", {
            get: function () {
                return this.pickedColor.value;
            },
            enumerable: false,
            configurable: true
        });
        ColorPickerInputController.prototype.onFocusableElementBlur_ = function (ev) {
            var elem = this.view.element;
            var nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
                // Next target is in the picker
                return;
            }
            if (nextTarget &&
                nextTarget === this.triggerElement &&
                !supportsTouch(elem.ownerDocument)) {
                // Next target is the trigger button
                return;
            }
            this.foldable.expanded = false;
        };
        ColorPickerInputController.prototype.onKeyDown_ = function (ev) {
            if (ev.keyCode === 27) {
                this.foldable.expanded = false;
            }
        };
        return ColorPickerInputController;
    }());

    /**
     * @hidden
     */
    var ColorSwatchInputController = /** @class */ (function () {
        function ColorSwatchInputController(document, config) {
            this.onButtonBlur_ = this.onButtonBlur_.bind(this);
            this.onButtonClick_ = this.onButtonClick_.bind(this);
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.pickerIc_ = new ColorPickerInputController(document, {
                pickedColor: new PickedColor(this.value),
                supportsAlpha: config.supportsAlpha,
                viewModel: this.viewModel,
            });
            this.view = new ColorSwatchInputView(document, {
                model: this.viewModel,
                pickerInputView: this.pickerIc_.view,
                value: this.value,
            });
            this.view.buttonElement.addEventListener('blur', this.onButtonBlur_);
            this.view.buttonElement.addEventListener('click', this.onButtonClick_);
            this.pickerIc_.triggerElement = this.view.buttonElement;
        }
        ColorSwatchInputController.prototype.onButtonBlur_ = function (e) {
            var elem = this.view.element;
            var nextTarget = TypeUtil.forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
                this.pickerIc_.foldable.expanded = false;
            }
        };
        ColorSwatchInputController.prototype.onButtonClick_ = function () {
            this.pickerIc_.foldable.expanded = !this.pickerIc_.foldable.expanded;
            if (this.pickerIc_.foldable.expanded) {
                this.pickerIc_.view.allFocusableElements[0].focus();
            }
        };
        return ColorSwatchInputController;
    }());

    /**
     * @hidden
     */
    var ColorSwatchTextInputController = /** @class */ (function () {
        function ColorSwatchTextInputController(document, config) {
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.swatchIc_ = new ColorSwatchInputController(document, {
                supportsAlpha: config.supportsAlpha,
                value: this.value,
                viewModel: this.viewModel,
            });
            this.textIc_ = new TextInputController(document, {
                formatter: config.formatter,
                parser: config.parser,
                value: this.value,
                viewModel: this.viewModel,
            });
            this.view = new ColorSwatchTextInputView(document, {
                swatchInputView: this.swatchIc_.view,
                textInputView: this.textIc_.view,
                model: this.viewModel,
            });
        }
        return ColorSwatchTextInputController;
    }());

    /**
     * @hidden
     */
    var ColorFormatter = /** @class */ (function () {
        function ColorFormatter(stringifier) {
            this.stringifier_ = stringifier;
        }
        ColorFormatter.prototype.format = function (value) {
            return this.stringifier_(value);
        };
        return ColorFormatter;
    }());

    function shouldSupportAlpha(inputParams) {
        return 'input' in inputParams && inputParams.input === 'color.rgba';
    }
    /**
     * @hidden
     */
    var NumberColorInputPlugin = {
        model: {
            accept: function (value, params) {
                if (typeof value !== 'number') {
                    return null;
                }
                if (!('input' in params)) {
                    return null;
                }
                if (params.input !== 'color' &&
                    params.input !== 'color.rgb' &&
                    params.input !== 'color.rgba') {
                    return null;
                }
                return value;
            },
            reader: function (args) {
                return shouldSupportAlpha(args.params)
                    ? fromNumberToRgba
                    : fromNumberToRgb;
            },
            writer: function (args) {
                return shouldSupportAlpha(args.params)
                    ? toRgbaNumber
                    : toRgbNumber;
            },
            equals: Color.equals,
        },
        controller: function (args) {
            var supportsAlpha = shouldSupportAlpha(args.params);
            var formatter = supportsAlpha
                ? new ColorFormatter(toHexRgbaString)
                : new ColorFormatter(toHexRgbString);
            return new ColorSwatchTextInputController(args.document, {
                formatter: formatter,
                parser: CompositeParser,
                supportsAlpha: supportsAlpha,
                value: args.binding.value,
                viewModel: new ViewModel(),
            });
        },
    };

    /**
     * @hidden
     */
    var ObjectColorInputPlugin = {
        model: {
            accept: function (value, _params) { return (Color.isColorObject(value) ? value : null); },
            reader: function (_args) { return fromObject; },
            writer: function (_args) { return Color.toRgbaObject; },
            equals: Color.equals,
        },
        controller: function (args) {
            var supportsAlpha = Color.isRgbaColorObject(args.initialValue);
            var formatter = supportsAlpha
                ? new ColorFormatter(toHexRgbaString)
                : new ColorFormatter(toHexRgbString);
            return new ColorSwatchTextInputController(args.document, {
                viewModel: new ViewModel(),
                formatter: formatter,
                parser: CompositeParser,
                supportsAlpha: supportsAlpha,
                value: args.binding.value,
            });
        },
    };

    /**
     * @hidden
     */
    var StringColorInputPlugin = {
        model: {
            accept: function (value, params) {
                if (typeof value !== 'string') {
                    return null;
                }
                if ('input' in params && params.input === 'string') {
                    return null;
                }
                var notation = getNotation(value);
                if (!notation) {
                    return null;
                }
                return value;
            },
            reader: function (_args) { return fromString; },
            writer: function (args) {
                var notation = getNotation(args.initialValue);
                if (!notation) {
                    throw PaneError.shouldNeverHappen();
                }
                return getStringifier(notation);
            },
            equals: Color.equals,
        },
        controller: function (args) {
            var notation = getNotation(args.initialValue);
            if (!notation) {
                throw PaneError.shouldNeverHappen();
            }
            return new ColorSwatchTextInputController(args.document, {
                formatter: new ColorFormatter(args.binding.writer),
                parser: CompositeParser,
                supportsAlpha: hasAlphaComponent(notation),
                value: args.binding.value,
                viewModel: new ViewModel(),
            });
        },
    };

    var className$g = ClassName('sldtxt', 'input');
    /**
     * @hidden
     */
    var SliderTextInputView = /** @class */ (function (_super) {
        __extends(SliderTextInputView, _super);
        function SliderTextInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.element.classList.add(className$g());
            var sliderElem = document.createElement('div');
            sliderElem.classList.add(className$g('s'));
            _this.sliderInputView_ = config.sliderInputView;
            sliderElem.appendChild(_this.sliderInputView_.element);
            _this.element.appendChild(sliderElem);
            var textElem = document.createElement('div');
            textElem.classList.add(className$g('t'));
            _this.textInputView_ = config.textInputView;
            textElem.appendChild(_this.textInputView_.element);
            _this.element.appendChild(textElem);
            return _this;
        }
        Object.defineProperty(SliderTextInputView.prototype, "value", {
            get: function () {
                return this.sliderInputView_.value;
            },
            enumerable: false,
            configurable: true
        });
        SliderTextInputView.prototype.update = function () {
            this.sliderInputView_.update();
            this.textInputView_.update();
        };
        return SliderTextInputView;
    }(View));

    var className$h = ClassName('sld', 'input');
    /**
     * @hidden
     */
    var SliderInputView = /** @class */ (function (_super) {
        __extends(SliderInputView, _super);
        function SliderInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.minValue_ = config.minValue;
            _this.maxValue_ = config.maxValue;
            _this.element.classList.add(className$h());
            var outerElem = document.createElement('div');
            outerElem.classList.add(className$h('o'));
            outerElem.tabIndex = 0;
            _this.element.appendChild(outerElem);
            _this.outerElem_ = outerElem;
            var innerElem = document.createElement('div');
            innerElem.classList.add(className$h('i'));
            _this.outerElem_.appendChild(innerElem);
            _this.innerElem_ = innerElem;
            config.value.emitter.on('change', _this.onValueChange_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.innerElem_ = disposeElement(_this.innerElem_);
                _this.outerElem_ = disposeElement(_this.outerElem_);
            });
            return _this;
        }
        Object.defineProperty(SliderInputView.prototype, "outerElement", {
            get: function () {
                if (!this.outerElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.outerElem_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderInputView.prototype, "innerElement", {
            get: function () {
                if (!this.innerElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.innerElem_;
            },
            enumerable: false,
            configurable: true
        });
        SliderInputView.prototype.update = function () {
            if (!this.innerElem_) {
                throw PaneError.alreadyDisposed();
            }
            var p = NumberUtil.constrain(NumberUtil.map(this.value.rawValue, this.minValue_, this.maxValue_, 0, 100), 0, 100);
            this.innerElem_.style.width = p + "%";
        };
        SliderInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return SliderInputView;
    }(View));

    function findRange(value) {
        var c = value.constraint
            ? ConstraintUtil.findConstraint(value.constraint, RangeConstraint)
            : null;
        if (!c) {
            return [undefined, undefined];
        }
        return [c.minValue, c.maxValue];
    }
    function estimateSuitableRange(value) {
        var _a = findRange(value), min = _a[0], max = _a[1];
        return [
            TypeUtil.getOrDefault(min, 0),
            TypeUtil.getOrDefault(max, 100),
        ];
    }
    /**
     * @hidden
     */
    var SliderInputController = /** @class */ (function () {
        function SliderInputController(document, config) {
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.step_ = getStepForTextInput(this.value.constraint);
            var _a = estimateSuitableRange(this.value), min = _a[0], max = _a[1];
            this.minValue_ = min;
            this.maxValue_ = max;
            this.viewModel = config.viewModel;
            this.view = new SliderInputView(document, {
                maxValue: this.maxValue_,
                minValue: this.minValue_,
                model: this.viewModel,
                value: this.value,
            });
            this.ptHandler_ = new PointerHandler(document, this.view.outerElement);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.outerElement.addEventListener('keydown', this.onKeyDown_);
        }
        SliderInputController.prototype.handlePointerEvent_ = function (d) {
            this.value.rawValue = NumberUtil.map(d.px, 0, 1, this.minValue_, this.maxValue_);
        };
        SliderInputController.prototype.onPointerDown_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        SliderInputController.prototype.onPointerMove_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        SliderInputController.prototype.onPointerUp_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        SliderInputController.prototype.onKeyDown_ = function (ev) {
            this.value.rawValue += getStepForKey(this.step_, getHorizontalStepKeys(ev));
        };
        return SliderInputController;
    }());

    /**
     * @hidden
     */
    var SliderTextInputController = /** @class */ (function () {
        function SliderTextInputController(document, config) {
            this.value_ = config.value;
            this.viewModel = config.viewModel;
            this.sliderIc_ = new SliderInputController(document, {
                value: config.value,
                viewModel: this.viewModel,
            });
            this.textIc_ = new NumberTextInputController(document, {
                formatter: config.formatter,
                parser: config.parser,
                value: config.value,
                viewModel: this.viewModel,
            });
            this.view_ = new SliderTextInputView(document, {
                model: this.viewModel,
                sliderInputView: this.sliderIc_.view,
                textInputView: this.textIc_.view,
            });
        }
        Object.defineProperty(SliderTextInputController.prototype, "value", {
            get: function () {
                return this.value_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SliderTextInputController.prototype, "view", {
            get: function () {
                return this.view_;
            },
            enumerable: false,
            configurable: true
        });
        return SliderTextInputController;
    }());

    /**
     * @hidden
     */
    function fromMixed$1(value) {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string') {
            var pv = StringNumberParser(value);
            if (!TypeUtil.isEmpty(pv)) {
                return pv;
            }
        }
        return 0;
    }
    /**
     * @hidden
     */
    function toString$1(value) {
        return String(value);
    }

    function createConstraint$1(params) {
        var constraints = [];
        if ('step' in params && !TypeUtil.isEmpty(params.step)) {
            constraints.push(new StepConstraint({
                step: params.step,
            }));
        }
        if (('max' in params && !TypeUtil.isEmpty(params.max)) ||
            ('min' in params && !TypeUtil.isEmpty(params.min))) {
            constraints.push(new RangeConstraint({
                max: params.max,
                min: params.min,
            }));
        }
        if ('options' in params && params.options !== undefined) {
            constraints.push(new ListConstraint({
                options: normalizeInputParamsOptions(params.options, fromMixed$1),
            }));
        }
        return new CompositeConstraint({
            constraints: constraints,
        });
    }
    function createController$3(document, value) {
        var c = value.constraint;
        if (c && ConstraintUtil.findConstraint(c, ListConstraint)) {
            return new ListInputController(document, {
                stringifyValue: toString$1,
                value: value,
                viewModel: new ViewModel(),
            });
        }
        if (c && ConstraintUtil.findConstraint(c, RangeConstraint)) {
            return new SliderTextInputController(document, {
                formatter: new NumberFormatter(getSuitableDecimalDigits(value.constraint, value.rawValue)),
                parser: StringNumberParser,
                value: value,
                viewModel: new ViewModel(),
            });
        }
        return new NumberTextInputController(document, {
            formatter: new NumberFormatter(getSuitableDecimalDigits(value.constraint, value.rawValue)),
            parser: StringNumberParser,
            value: value,
            viewModel: new ViewModel(),
        });
    }
    /**
     * @hidden
     */
    var NumberInputPlugin = {
        model: {
            accept: function (value) { return (typeof value === 'number' ? value : null); },
            reader: function (_args) { return fromMixed$1; },
            writer: function (_args) { return function (v) { return v; }; },
            constraint: function (args) { return createConstraint$1(args.params); },
        },
        controller: function (args) {
            return createController$3(args.document, args.binding.value);
        },
    };

    var className$i = ClassName('p2dpadtxt', 'input');
    /**
     * @hidden
     */
    var Point2dPadTextInputView = /** @class */ (function (_super) {
        __extends(Point2dPadTextInputView, _super);
        function Point2dPadTextInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.element.classList.add(className$i());
            var padWrapperElem = document.createElement('div');
            padWrapperElem.classList.add(className$i('w'));
            _this.element.appendChild(padWrapperElem);
            var buttonElem = document.createElement('button');
            buttonElem.classList.add(className$i('b'));
            buttonElem.appendChild(createSvgIconElement(document, 'p2dpad'));
            padWrapperElem.appendChild(buttonElem);
            _this.padButtonElem_ = buttonElem;
            var padElem = document.createElement('div');
            padElem.classList.add(className$i('p'));
            padWrapperElem.appendChild(padElem);
            _this.padInputView_ = config.padInputView;
            padElem.appendChild(_this.padInputView_.element);
            var textElem = document.createElement('div');
            textElem.classList.add(className$i('t'));
            _this.textInputView_ = config.textInputView;
            textElem.appendChild(_this.textInputView_.element);
            _this.element.appendChild(textElem);
            return _this;
        }
        Object.defineProperty(Point2dPadTextInputView.prototype, "value", {
            get: function () {
                return this.textInputView_.value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Point2dPadTextInputView.prototype, "padButtonElement", {
            get: function () {
                return this.padButtonElem_;
            },
            enumerable: false,
            configurable: true
        });
        Point2dPadTextInputView.prototype.update = function () {
            this.padInputView_.update();
            this.textInputView_.update();
        };
        return Point2dPadTextInputView;
    }(View));

    var SVG_NS$1 = SVG_NS;
    var className$j = ClassName('p2dpad', 'input');
    /**
     * @hidden
     */
    var Point2dPadInputView = /** @class */ (function (_super) {
        __extends(Point2dPadInputView, _super);
        function Point2dPadInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onFoldableChange_ = _this.onFoldableChange_.bind(_this);
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.foldable = config.foldable;
            _this.foldable.emitter.on('change', _this.onFoldableChange_);
            _this.invertsY_ = config.invertsY;
            _this.maxValue_ = config.maxValue;
            _this.element.classList.add(className$j());
            var padElem = document.createElement('div');
            padElem.tabIndex = 0;
            padElem.classList.add(className$j('p'));
            _this.element.appendChild(padElem);
            _this.padElem_ = padElem;
            var svgElem = document.createElementNS(SVG_NS$1, 'svg');
            svgElem.classList.add(className$j('g'));
            _this.padElem_.appendChild(svgElem);
            _this.svgElem_ = svgElem;
            var xAxisElem = document.createElementNS(SVG_NS$1, 'line');
            xAxisElem.classList.add(className$j('ax'));
            xAxisElem.setAttributeNS(null, 'x1', '0');
            xAxisElem.setAttributeNS(null, 'y1', '50%');
            xAxisElem.setAttributeNS(null, 'x2', '100%');
            xAxisElem.setAttributeNS(null, 'y2', '50%');
            _this.svgElem_.appendChild(xAxisElem);
            var yAxisElem = document.createElementNS(SVG_NS$1, 'line');
            yAxisElem.classList.add(className$j('ax'));
            yAxisElem.setAttributeNS(null, 'x1', '50%');
            yAxisElem.setAttributeNS(null, 'y1', '0');
            yAxisElem.setAttributeNS(null, 'x2', '50%');
            yAxisElem.setAttributeNS(null, 'y2', '100%');
            _this.svgElem_.appendChild(yAxisElem);
            var lineElem = document.createElementNS(SVG_NS$1, 'line');
            lineElem.classList.add(className$j('l'));
            lineElem.setAttributeNS(null, 'x1', '50%');
            lineElem.setAttributeNS(null, 'y1', '50%');
            _this.svgElem_.appendChild(lineElem);
            _this.lineElem_ = lineElem;
            var markerElem = document.createElementNS(SVG_NS$1, 'circle');
            markerElem.classList.add(className$j('m'));
            markerElem.setAttributeNS(null, 'r', '2px');
            _this.svgElem_.appendChild(markerElem);
            _this.markerElem_ = markerElem;
            config.value.emitter.on('change', _this.onValueChange_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.padElem_ = disposeElement(_this.padElem_);
            });
            return _this;
        }
        Object.defineProperty(Point2dPadInputView.prototype, "padElement", {
            get: function () {
                if (!this.padElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.padElem_;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Point2dPadInputView.prototype, "allFocusableElements", {
            get: function () {
                if (!this.padElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return [this.padElem_];
            },
            enumerable: false,
            configurable: true
        });
        Point2dPadInputView.prototype.update = function () {
            if (this.foldable.expanded) {
                this.element.classList.add(className$j(undefined, 'expanded'));
            }
            else {
                this.element.classList.remove(className$j(undefined, 'expanded'));
            }
            var lineElem = this.lineElem_;
            var markerElem = this.markerElem_;
            if (!lineElem || !markerElem) {
                throw PaneError.alreadyDisposed();
            }
            var _a = this.value.rawValue.getComponents(), x = _a[0], y = _a[1];
            var max = this.maxValue_;
            var px = NumberUtil.map(x, -max, +max, 0, 100);
            var py = NumberUtil.map(y, -max, +max, 0, 100);
            var ipy = this.invertsY_ ? 100 - py : py;
            lineElem.setAttributeNS(null, 'x2', px + "%");
            lineElem.setAttributeNS(null, 'y2', ipy + "%");
            markerElem.setAttributeNS(null, 'cx', px + "%");
            markerElem.setAttributeNS(null, 'cy', ipy + "%");
        };
        Point2dPadInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        Point2dPadInputView.prototype.onFoldableChange_ = function () {
            this.update();
        };
        return Point2dPadInputView;
    }(View));

    /**
     * @hidden
     */
    var Point2dPadInputController = /** @class */ (function () {
        function Point2dPadInputController(document, config) {
            var _this = this;
            this.triggerElement = null;
            this.onFocusableElementBlur_ = this.onFocusableElementBlur_.bind(this);
            this.onKeyDown_ = this.onKeyDown_.bind(this);
            this.onPadKeyDown_ = this.onPadKeyDown_.bind(this);
            this.onPointerDown_ = this.onPointerDown_.bind(this);
            this.onPointerMove_ = this.onPointerMove_.bind(this);
            this.onPointerUp_ = this.onPointerUp_.bind(this);
            this.value = config.value;
            this.foldable = new Foldable();
            this.maxValue_ = getSuitableMaxValueForPoint2dPad(this.value.constraint, this.value.rawValue);
            this.invertsY_ = config.invertsY;
            var c = this.value.constraint;
            this.xStep_ = getStepForTextInput(c instanceof Point2dConstraint ? c.xConstraint : undefined);
            this.yStep_ = getStepForTextInput(c instanceof Point2dConstraint ? c.yConstraint : undefined);
            this.viewModel = config.viewModel;
            this.view = new Point2dPadInputView(document, {
                foldable: this.foldable,
                invertsY: this.invertsY_,
                maxValue: this.maxValue_,
                model: this.viewModel,
                value: this.value,
            });
            this.ptHandler_ = new PointerHandler(document, this.view.padElement);
            this.ptHandler_.emitter.on('down', this.onPointerDown_);
            this.ptHandler_.emitter.on('move', this.onPointerMove_);
            this.ptHandler_.emitter.on('up', this.onPointerUp_);
            this.view.padElement.addEventListener('keydown', this.onPadKeyDown_);
            this.view.element.addEventListener('keydown', this.onKeyDown_);
            this.view.allFocusableElements.forEach(function (elem) {
                elem.addEventListener('blur', _this.onFocusableElementBlur_);
            });
        }
        Point2dPadInputController.prototype.handlePointerEvent_ = function (d) {
            var max = this.maxValue_;
            var px = NumberUtil.map(d.px, 0, 1, -max, +max);
            var py = NumberUtil.map(this.invertsY_ ? 1 - d.py : d.py, 0, 1, -max, +max);
            this.value.rawValue = new Point2d(px, py);
            this.view.update();
        };
        Point2dPadInputController.prototype.onPointerDown_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        Point2dPadInputController.prototype.onPointerMove_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        Point2dPadInputController.prototype.onPointerUp_ = function (ev) {
            this.handlePointerEvent_(ev.data);
        };
        Point2dPadInputController.prototype.onPadKeyDown_ = function (ev) {
            if (isArrowKey(ev.keyCode)) {
                ev.preventDefault();
            }
            this.value.rawValue = new Point2d(this.value.rawValue.x +
                getStepForKey(this.xStep_, getHorizontalStepKeys(ev)), this.value.rawValue.y +
                getStepForKey(this.yStep_, getVerticalStepKeys(ev)) *
                    (this.invertsY_ ? 1 : -1));
        };
        Point2dPadInputController.prototype.onFocusableElementBlur_ = function (ev) {
            var elem = this.view.element;
            var nextTarget = findNextTarget(ev);
            if (nextTarget && elem.contains(nextTarget)) {
                // Next target is in the picker
                return;
            }
            if (nextTarget &&
                nextTarget === this.triggerElement &&
                !supportsTouch(elem.ownerDocument)) {
                // Next target is the trigger button
                return;
            }
            this.foldable.expanded = false;
        };
        Point2dPadInputController.prototype.onKeyDown_ = function (ev) {
            if (ev.keyCode === 27) {
                this.foldable.expanded = false;
            }
        };
        return Point2dPadInputController;
    }());

    var COMPONENT_LABELS = ['X', 'Y'];
    var className$k = ClassName('p2dtxt', 'input');
    /**
     * @hidden
     */
    var Point2dTextInputView = /** @class */ (function (_super) {
        __extends(Point2dTextInputView, _super);
        function Point2dTextInputView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueChange_ = _this.onValueChange_.bind(_this);
            _this.formatters_ = [config.xFormatter, config.yFormatter];
            _this.element.classList.add(className$k());
            var inputElems = COMPONENT_LABELS.map(function () {
                var inputElem = document.createElement('input');
                inputElem.classList.add(className$k('i'));
                inputElem.type = 'text';
                return inputElem;
            });
            COMPONENT_LABELS.forEach(function (_, index) {
                var elem = document.createElement('div');
                elem.classList.add(className$k('w'));
                elem.appendChild(inputElems[index]);
                _this.element.appendChild(elem);
            });
            _this.inputElems_ = [inputElems[0], inputElems[1]];
            config.value.emitter.on('change', _this.onValueChange_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                if (_this.inputElems_) {
                    _this.inputElems_.forEach(function (elem) {
                        disposeElement(elem);
                    });
                    _this.inputElems_ = null;
                }
            });
            return _this;
        }
        Object.defineProperty(Point2dTextInputView.prototype, "inputElements", {
            get: function () {
                if (!this.inputElems_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.inputElems_;
            },
            enumerable: false,
            configurable: true
        });
        Point2dTextInputView.prototype.update = function () {
            var _this = this;
            var inputElems = this.inputElems_;
            if (!inputElems) {
                throw PaneError.alreadyDisposed();
            }
            var xyComps = this.value.rawValue.getComponents();
            xyComps.forEach(function (comp, index) {
                var inputElem = inputElems[index];
                inputElem.value = _this.formatters_[index].format(comp);
            });
        };
        Point2dTextInputView.prototype.onValueChange_ = function () {
            this.update();
        };
        return Point2dTextInputView;
    }(View));

    /**
     * @hidden
     */
    var Point2dTextInputController = /** @class */ (function () {
        function Point2dTextInputController(document, config) {
            var _this = this;
            this.onInputChange_ = this.onInputChange_.bind(this);
            this.onInputKeyDown_ = this.onInputKeyDown_.bind(this);
            this.parser_ = config.parser;
            this.value = config.value;
            var c = this.value.constraint;
            this.xStep_ = getStepForTextInput(c instanceof Point2dConstraint ? c.xConstraint : undefined);
            this.yStep_ = getStepForTextInput(c instanceof Point2dConstraint ? c.yConstraint : undefined);
            this.viewModel = config.viewModel;
            this.view = new Point2dTextInputView(document, {
                model: this.viewModel,
                value: this.value,
                xFormatter: config.xFormatter,
                yFormatter: config.yFormatter,
            });
            this.view.inputElements.forEach(function (inputElem) {
                inputElem.addEventListener('change', _this.onInputChange_);
                inputElem.addEventListener('keydown', _this.onInputKeyDown_);
            });
        }
        Point2dTextInputController.prototype.findIndexOfInputElem_ = function (inputElem) {
            var inputElems = this.view.inputElements;
            for (var i = 0; i < inputElems.length; i++) {
                if (inputElems[i] === inputElem) {
                    return i;
                }
            }
            return null;
        };
        Point2dTextInputController.prototype.updateComponent_ = function (index, newValue) {
            var comps = this.value.rawValue.getComponents();
            var newComps = comps.map(function (comp, i) {
                return i === index ? newValue : comp;
            });
            this.value.rawValue = new Point2d(newComps[0], newComps[1]);
            this.view.update();
        };
        Point2dTextInputController.prototype.onInputChange_ = function (e) {
            var inputElem = TypeUtil.forceCast(e.currentTarget);
            var parsedValue = this.parser_(inputElem.value);
            if (TypeUtil.isEmpty(parsedValue)) {
                return;
            }
            var compIndex = this.findIndexOfInputElem_(inputElem);
            if (TypeUtil.isEmpty(compIndex)) {
                return;
            }
            this.updateComponent_(compIndex, parsedValue);
        };
        Point2dTextInputController.prototype.onInputKeyDown_ = function (e) {
            var inputElem = TypeUtil.forceCast(e.currentTarget);
            var parsedValue = this.parser_(inputElem.value);
            if (TypeUtil.isEmpty(parsedValue)) {
                return;
            }
            var compIndex = this.findIndexOfInputElem_(inputElem);
            if (TypeUtil.isEmpty(compIndex)) {
                return;
            }
            var step = getStepForKey(compIndex === 0 ? this.xStep_ : this.yStep_, getVerticalStepKeys(e));
            if (step === 0) {
                return;
            }
            this.updateComponent_(compIndex, parsedValue + step);
        };
        return Point2dTextInputController;
    }());

    /**
     * @hidden
     */
    var Point2dPadTextInputController = /** @class */ (function () {
        function Point2dPadTextInputController(document, config) {
            this.onPadButtonBlur_ = this.onPadButtonBlur_.bind(this);
            this.onPadButtonClick_ = this.onPadButtonClick_.bind(this);
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.padIc_ = new Point2dPadInputController(document, {
                invertsY: config.invertsY,
                value: this.value,
                viewModel: this.viewModel,
            });
            this.textIc_ = new Point2dTextInputController(document, {
                parser: config.parser,
                value: this.value,
                viewModel: this.viewModel,
                xFormatter: config.xFormatter,
                yFormatter: config.yFormatter,
            });
            this.view = new Point2dPadTextInputView(document, {
                model: this.viewModel,
                padInputView: this.padIc_.view,
                textInputView: this.textIc_.view,
            });
            this.view.padButtonElement.addEventListener('blur', this.onPadButtonBlur_);
            this.view.padButtonElement.addEventListener('click', this.onPadButtonClick_);
            this.padIc_.triggerElement = this.view.padButtonElement;
        }
        Point2dPadTextInputController.prototype.onPadButtonBlur_ = function (e) {
            var elem = this.view.element;
            var nextTarget = TypeUtil.forceCast(e.relatedTarget);
            if (!nextTarget || !elem.contains(nextTarget)) {
                this.padIc_.foldable.expanded = false;
            }
        };
        Point2dPadTextInputController.prototype.onPadButtonClick_ = function () {
            this.padIc_.foldable.expanded = !this.padIc_.foldable.expanded;
            if (this.padIc_.foldable.expanded) {
                this.padIc_.view.allFocusableElements[0].focus();
            }
        };
        return Point2dPadTextInputController;
    }());

    /**
     * @hidden
     */
    var AnyPoint2dParser = function (obj) {
        return Point2d.isObject(obj) ? new Point2d(obj.x, obj.y) : null;
    };

    /**
     * @hidden
     */
    function fromMixed$2(value) {
        return AnyPoint2dParser(value) || new Point2d();
    }

    function createDimensionConstraint(params) {
        if (!params) {
            return undefined;
        }
        var constraints = [];
        if (!TypeUtil.isEmpty(params.step)) {
            constraints.push(new StepConstraint({
                step: params.step,
            }));
        }
        if (!TypeUtil.isEmpty(params.max) || !TypeUtil.isEmpty(params.min)) {
            constraints.push(new RangeConstraint({
                max: params.max,
                min: params.min,
            }));
        }
        return new CompositeConstraint({
            constraints: constraints,
        });
    }
    function createConstraint$2(params) {
        return new Point2dConstraint({
            x: createDimensionConstraint('x' in params ? params.x : undefined),
            y: createDimensionConstraint('y' in params ? params.y : undefined),
        });
    }
    function createController$4(document, value, invertsY) {
        var c = value.constraint;
        if (!(c instanceof Point2dConstraint)) {
            throw PaneError.shouldNeverHappen();
        }
        return new Point2dPadTextInputController(document, {
            invertsY: invertsY,
            parser: StringNumberParser,
            value: value,
            viewModel: new ViewModel(),
            xFormatter: new NumberFormatter(getSuitableDecimalDigits(c.xConstraint, value.rawValue.x)),
            yFormatter: new NumberFormatter(getSuitableDecimalDigits(c.yConstraint, value.rawValue.y)),
        });
    }
    /**
     * @hidden
     */
    var Point2dInputPlugin = {
        model: {
            accept: function (value, _params) { return (Point2d.isObject(value) ? value : null); },
            reader: function (_args) { return fromMixed$2; },
            writer: function (_args) { return function (v) { return v.toObject(); }; },
            constraint: function (args) { return createConstraint$2(args.params); },
            equals: Point2d.equals,
        },
        controller: function (args) {
            var yParams = 'y' in args.params ? args.params.y : undefined;
            var invertsY = yParams ? !!yParams.inverted : false;
            return createController$4(args.document, args.binding.value, invertsY);
        },
    };

    /**
     * @hidden
     */
    function fromMixed$3(value) {
        return String(value);
    }
    /**
     * @hidden
     */
    function toString$2(value) {
        return value;
    }

    /**
     * @hidden
     */
    var StringFormatter = /** @class */ (function () {
        function StringFormatter() {
        }
        StringFormatter.prototype.format = function (value) {
            return value;
        };
        return StringFormatter;
    }());

    function createConstraint$3(params) {
        var constraints = [];
        if ('options' in params && params.options !== undefined) {
            constraints.push(new ListConstraint({
                options: normalizeInputParamsOptions(params.options, fromMixed$3),
            }));
        }
        return new CompositeConstraint({
            constraints: constraints,
        });
    }
    function createController$5(document, value) {
        var c = value.constraint;
        if (c && ConstraintUtil.findConstraint(c, ListConstraint)) {
            return new ListInputController(document, {
                stringifyValue: toString$2,
                value: value,
                viewModel: new ViewModel(),
            });
        }
        return new TextInputController(document, {
            formatter: new StringFormatter(),
            parser: toString$2,
            value: value,
            viewModel: new ViewModel(),
        });
    }
    /**
     * @hidden
     */
    var StringInputPlugin = {
        model: {
            accept: function (value, _params) { return (typeof value === 'string' ? value : null); },
            reader: function (_args) { return fromMixed$3; },
            writer: function (_args) { return function (v) { return v; }; },
            constraint: function (args) { return createConstraint$3(args.params); },
        },
        controller: function (params) {
            return createController$5(params.document, params.binding.value);
        },
    };

    var className$l = ClassName('mll', 'monitor');
    /**
     * @hidden
     */
    var MultiLogMonitorView = /** @class */ (function (_super) {
        __extends(MultiLogMonitorView, _super);
        function MultiLogMonitorView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueUpdate_ = _this.onValueUpdate_.bind(_this);
            _this.formatter_ = config.formatter;
            _this.element.classList.add(className$l());
            var textareaElem = document.createElement('textarea');
            textareaElem.classList.add(className$l('i'));
            textareaElem.style.height = "calc(var(--unit-size) * " + config.lineCount + ")";
            textareaElem.readOnly = true;
            _this.element.appendChild(textareaElem);
            _this.textareaElem_ = textareaElem;
            config.value.emitter.on('update', _this.onValueUpdate_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.textareaElem_ = disposeElement(_this.textareaElem_);
            });
            return _this;
        }
        MultiLogMonitorView.prototype.update = function () {
            var _this = this;
            var elem = this.textareaElem_;
            if (!elem) {
                throw PaneError.alreadyDisposed();
            }
            var shouldScroll = elem.scrollTop === elem.scrollHeight - elem.clientHeight;
            elem.textContent = this.value.rawValues
                .map(function (value) {
                return _this.formatter_.format(value);
            })
                .join('\n');
            if (shouldScroll) {
                elem.scrollTop = elem.scrollHeight;
            }
        };
        MultiLogMonitorView.prototype.onValueUpdate_ = function () {
            this.update();
        };
        return MultiLogMonitorView;
    }(View));

    /**
     * @hidden
     */
    var MultiLogMonitorController = /** @class */ (function () {
        function MultiLogMonitorController(document, config) {
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.view = new MultiLogMonitorView(document, {
                formatter: config.formatter,
                lineCount: config.lineCount,
                model: this.viewModel,
                value: this.value,
            });
        }
        return MultiLogMonitorController;
    }());

    var className$m = ClassName('sgl', 'monitor');
    /**
     * @hidden
     */
    var SingleLogMonitorView = /** @class */ (function (_super) {
        __extends(SingleLogMonitorView, _super);
        function SingleLogMonitorView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onValueUpdate_ = _this.onValueUpdate_.bind(_this);
            _this.formatter_ = config.formatter;
            _this.element.classList.add(className$m());
            var inputElem = document.createElement('input');
            inputElem.classList.add(className$m('i'));
            inputElem.readOnly = true;
            inputElem.type = 'text';
            _this.element.appendChild(inputElem);
            _this.inputElem_ = inputElem;
            config.value.emitter.on('update', _this.onValueUpdate_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.inputElem_ = disposeElement(_this.inputElem_);
            });
            return _this;
        }
        SingleLogMonitorView.prototype.update = function () {
            if (!this.inputElem_) {
                throw PaneError.alreadyDisposed();
            }
            var values = this.value.rawValues;
            this.inputElem_.value =
                values.length > 0
                    ? this.formatter_.format(values[values.length - 1])
                    : '';
        };
        SingleLogMonitorView.prototype.onValueUpdate_ = function () {
            this.update();
        };
        return SingleLogMonitorView;
    }(View));

    /**
     * @hidden
     */
    var SingleLogMonitorController = /** @class */ (function () {
        function SingleLogMonitorController(document, config) {
            this.value = config.value;
            this.viewModel = config.viewModel;
            this.view = new SingleLogMonitorView(document, {
                formatter: config.formatter,
                model: this.viewModel,
                value: this.value,
            });
        }
        return SingleLogMonitorController;
    }());

    /**
     * @hidden
     */
    var BooleanFormatter = /** @class */ (function () {
        function BooleanFormatter() {
        }
        BooleanFormatter.prototype.format = function (value) {
            return toString(value);
        };
        return BooleanFormatter;
    }());

    /**
     * @hidden
     */
    var BooleanMonitorPlugin = {
        model: {
            accept: function (value, _params) { return (typeof value === 'boolean' ? value : null); },
            defaultBufferSize: function (_params) { return 1; },
            reader: function (_args) { return fromMixed; },
        },
        controller: function (args) {
            if (args.binding.value.bufferSize === 1) {
                return new SingleLogMonitorController(args.document, {
                    viewModel: new ViewModel(),
                    formatter: new BooleanFormatter(),
                    value: args.binding.value,
                });
            }
            return new MultiLogMonitorController(args.document, {
                viewModel: new ViewModel(),
                formatter: new BooleanFormatter(),
                lineCount: TypeUtil.getOrDefault(args.params.lineCount, Constants.monitor.defaultLineCount),
                value: args.binding.value,
            });
        },
    };

    /**
     * @hidden
     */
    var GraphCursor = /** @class */ (function () {
        function GraphCursor() {
            this.emitter = new Emitter();
            this.index_ = -1;
        }
        Object.defineProperty(GraphCursor.prototype, "index", {
            get: function () {
                return this.index_;
            },
            set: function (index) {
                var changed = this.index_ !== index;
                if (changed) {
                    this.index_ = index;
                    this.emitter.emit('change', {
                        index: index,
                        sender: this,
                    });
                }
            },
            enumerable: false,
            configurable: true
        });
        return GraphCursor;
    }());

    var SVG_NS$2 = SVG_NS;
    var className$n = ClassName('grp', 'monitor');
    /**
     * @hidden
     */
    var GraphMonitorView = /** @class */ (function (_super) {
        __extends(GraphMonitorView, _super);
        function GraphMonitorView(document, config) {
            var _this = _super.call(this, document, config) || this;
            _this.onCursorChange_ = _this.onCursorChange_.bind(_this);
            _this.onValueUpdate_ = _this.onValueUpdate_.bind(_this);
            _this.element.classList.add(className$n());
            _this.formatter_ = config.formatter;
            _this.minValue_ = config.minValue;
            _this.maxValue_ = config.maxValue;
            _this.cursor_ = config.cursor;
            _this.cursor_.emitter.on('change', _this.onCursorChange_);
            var svgElem = document.createElementNS(SVG_NS$2, 'svg');
            svgElem.classList.add(className$n('g'));
            svgElem.style.height = "calc(var(--unit-size) * " + config.lineCount + ")";
            _this.element.appendChild(svgElem);
            _this.svgElem_ = svgElem;
            var lineElem = document.createElementNS(SVG_NS$2, 'polyline');
            _this.svgElem_.appendChild(lineElem);
            _this.lineElem_ = lineElem;
            var tooltipElem = document.createElement('div');
            tooltipElem.classList.add(className$n('t'));
            _this.element.appendChild(tooltipElem);
            _this.tooltipElem_ = tooltipElem;
            config.value.emitter.on('update', _this.onValueUpdate_);
            _this.value = config.value;
            _this.update();
            config.model.emitter.on('dispose', function () {
                _this.lineElem_ = disposeElement(_this.lineElem_);
                _this.svgElem_ = disposeElement(_this.svgElem_);
                _this.tooltipElem_ = disposeElement(_this.tooltipElem_);
            });
            return _this;
        }
        Object.defineProperty(GraphMonitorView.prototype, "graphElement", {
            get: function () {
                if (!this.svgElem_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.svgElem_;
            },
            enumerable: false,
            configurable: true
        });
        GraphMonitorView.prototype.update = function () {
            var tooltipElem = this.tooltipElem_;
            if (!this.lineElem_ || !this.svgElem_ || !tooltipElem) {
                throw PaneError.alreadyDisposed();
            }
            var bounds = this.svgElem_.getBoundingClientRect();
            // Graph
            var maxIndex = this.value.bufferSize - 1;
            var min = this.minValue_;
            var max = this.maxValue_;
            this.lineElem_.setAttributeNS(null, 'points', this.value.rawValues
                .map(function (v, index) {
                var x = NumberUtil.map(index, 0, maxIndex, 0, bounds.width);
                var y = NumberUtil.map(v, min, max, bounds.height, 0);
                return [x, y].join(',');
            })
                .join(' '));
            // Cursor
            var value = this.value.rawValues[this.cursor_.index];
            if (value === undefined) {
                tooltipElem.classList.remove(className$n('t', 'valid'));
                return;
            }
            tooltipElem.classList.add(className$n('t', 'valid'));
            var tx = NumberUtil.map(this.cursor_.index, 0, maxIndex, 0, bounds.width);
            var ty = NumberUtil.map(value, min, max, bounds.height, 0);
            tooltipElem.style.left = tx + "px";
            tooltipElem.style.top = ty + "px";
            tooltipElem.textContent = "" + this.formatter_.format(value);
        };
        GraphMonitorView.prototype.onValueUpdate_ = function () {
            this.update();
        };
        GraphMonitorView.prototype.onCursorChange_ = function () {
            this.update();
        };
        return GraphMonitorView;
    }(View));

    /**
     * @hidden
     */
    var GraphMonitorController = /** @class */ (function () {
        function GraphMonitorController(document, config) {
            this.onGraphMouseLeave_ = this.onGraphMouseLeave_.bind(this);
            this.onGraphMouseMove_ = this.onGraphMouseMove_.bind(this);
            this.value = config.value;
            this.cursor_ = new GraphCursor();
            this.viewModel = config.viewModel;
            this.view = new GraphMonitorView(document, {
                cursor: this.cursor_,
                formatter: config.formatter,
                lineCount: config.lineCount,
                maxValue: config.maxValue,
                minValue: config.minValue,
                model: this.viewModel,
                value: this.value,
            });
            this.view.graphElement.addEventListener('mouseleave', this.onGraphMouseLeave_);
            this.view.graphElement.addEventListener('mousemove', this.onGraphMouseMove_);
        }
        GraphMonitorController.prototype.onGraphMouseLeave_ = function () {
            this.cursor_.index = -1;
        };
        GraphMonitorController.prototype.onGraphMouseMove_ = function (e) {
            var bounds = this.view.graphElement.getBoundingClientRect();
            var x = e.offsetX;
            this.cursor_.index = Math.floor(NumberUtil.map(x, 0, bounds.width, 0, this.value.bufferSize));
        };
        return GraphMonitorController;
    }());

    function createFormatter() {
        // TODO: formatter precision
        return new NumberFormatter(2);
    }
    function createTextMonitor(document, binding, params) {
        if (binding.value.bufferSize === 1) {
            return new SingleLogMonitorController(document, {
                formatter: createFormatter(),
                value: binding.value,
                viewModel: new ViewModel(),
            });
        }
        return new MultiLogMonitorController(document, {
            formatter: createFormatter(),
            lineCount: TypeUtil.getOrDefault(params.lineCount, Constants.monitor.defaultLineCount),
            value: binding.value,
            viewModel: new ViewModel(),
        });
    }
    function createGraphMonitor(document, binding, params) {
        return new GraphMonitorController(document, {
            formatter: createFormatter(),
            lineCount: TypeUtil.getOrDefault(params.lineCount, Constants.monitor.defaultLineCount),
            maxValue: TypeUtil.getOrDefault('max' in params ? params.max : null, 100),
            minValue: TypeUtil.getOrDefault('min' in params ? params.min : null, 0),
            value: binding.value,
            viewModel: new ViewModel(),
        });
    }
    function shouldShowGraph(params) {
        return 'view' in params && params.view === 'graph';
    }
    /**
     * @hidden
     */
    var NumberMonitorPlugin = {
        model: {
            accept: function (value, _params) { return (typeof value === 'number' ? value : null); },
            defaultBufferSize: function (params) { return (shouldShowGraph(params) ? 64 : 1); },
            reader: function (_args) { return fromMixed$1; },
        },
        controller: function (args) {
            if (shouldShowGraph(args.params)) {
                return createGraphMonitor(args.document, args.binding, args.params);
            }
            return createTextMonitor(args.document, args.binding, args.params);
        },
    };

    /**
     * @hidden
     */
    var StringMonitorPlugin = {
        model: {
            accept: function (value, _params) { return (typeof value === 'string' ? value : null); },
            defaultBufferSize: function (_params) { return 1; },
            reader: function (_args) { return fromMixed$3; },
        },
        controller: function (args) {
            var value = args.binding.value;
            var multiline = value.bufferSize > 1 ||
                ('multiline' in args.params && args.params.multiline);
            if (multiline) {
                return new MultiLogMonitorController(args.document, {
                    formatter: new StringFormatter(),
                    lineCount: TypeUtil.getOrDefault(args.params.lineCount, Constants.monitor.defaultLineCount),
                    value: value,
                    viewModel: new ViewModel(),
                });
            }
            return new SingleLogMonitorController(args.document, {
                formatter: new StringFormatter(),
                value: value,
                viewModel: new ViewModel(),
            });
        },
    };

    function createDefaultWrapperElement(document) {
        var elem = document.createElement('div');
        elem.classList.add(ClassName('dfw')());
        if (document.body) {
            document.body.appendChild(elem);
        }
        return elem;
    }
    var PlainTweakpane = /** @class */ (function (_super) {
        __extends(PlainTweakpane, _super);
        function PlainTweakpane(opt_config) {
            var _this = this;
            var config = opt_config || {};
            var document = TypeUtil.getOrDefault(config.document, getWindowDocument());
            var rootController = new RootController(document, {
                expanded: config.expanded,
                viewModel: new ViewModel(),
                title: config.title,
            });
            _this = _super.call(this, rootController) || this;
            _this.containerElem_ =
                config.container || createDefaultWrapperElement(document);
            _this.containerElem_.appendChild(_this.element);
            _this.doc_ = document;
            _this.usesDefaultWrapper_ = !config.container;
            return _this;
        }
        PlainTweakpane.prototype.dispose = function () {
            var containerElem = this.containerElem_;
            if (!containerElem) {
                throw PaneError.alreadyDisposed();
            }
            if (this.usesDefaultWrapper_) {
                var parentElem = containerElem.parentElement;
                if (parentElem) {
                    parentElem.removeChild(containerElem);
                }
            }
            this.containerElem_ = null;
            this.doc_ = null;
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(PlainTweakpane.prototype, "document", {
            get: function () {
                if (!this.doc_) {
                    throw PaneError.alreadyDisposed();
                }
                return this.doc_;
            },
            enumerable: false,
            configurable: true
        });
        return PlainTweakpane;
    }(RootApi));
    function registerDefaultPlugins() {
        [
            BooleanInputPlugin,
            NumberColorInputPlugin,
            ObjectColorInputPlugin,
            StringColorInputPlugin,
            NumberInputPlugin,
            StringInputPlugin,
            Point2dInputPlugin,
        ].forEach(function (p) {
            RootApi.registerPlugin({
                type: 'input',
                plugin: p,
            });
        });
        [NumberMonitorPlugin, StringMonitorPlugin, BooleanMonitorPlugin].forEach(function (p) {
            RootApi.registerPlugin({
                type: 'monitor',
                plugin: p,
            });
        });
    }
    registerDefaultPlugins();

    function embedDefaultStyleIfNeeded(document) {
        var MARKER = 'tweakpane';
        if (document.querySelector("style[data-for=" + MARKER + "]")) {
            return;
        }
        var styleElem = document.createElement('style');
        styleElem.dataset.for = MARKER;
        styleElem.textContent = '.tp-fldv_t,.tp-rotv_t{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--folder-background-color);color:var(--folder-foreground-color);cursor:pointer;display:block;height:calc(var(--unit-size) + 4px);line-height:calc(var(--unit-size) + 4px);overflow:hidden;padding-left:28px;position:relative;text-align:left;text-overflow:ellipsis;white-space:nowrap;width:100%;transition:border-radius .2s ease-in-out .2s}.tp-fldv_t:hover,.tp-rotv_t:hover{background-color:var(--folder-background-color-hover)}.tp-fldv_t:focus,.tp-rotv_t:focus{background-color:var(--folder-background-color-focus)}.tp-fldv_t:active,.tp-rotv_t:active{background-color:var(--folder-background-color-active)}.tp-fldv_m,.tp-rotv_m{background:linear-gradient(to left, var(--folder-foreground-color), var(--folder-foreground-color) 2px, transparent 2px, transparent 4px, var(--folder-foreground-color) 4px);border-radius:2px;bottom:0;content:\'\';display:block;height:6px;left:13px;margin:auto;opacity:0.5;position:absolute;top:0;transform:rotate(90deg);transition:transform .2s ease-in-out;width:6px}.tp-fldv.tp-fldv-expanded>.tp-fldv_t>.tp-fldv_m,.tp-rotv.tp-rotv-expanded .tp-rotv_m{transform:none}.tp-fldv_c,.tp-rotv_c{box-sizing:border-box;height:0;opacity:0;overflow:hidden;padding-bottom:0;padding-top:0;position:relative;transition:height .2s ease-in-out,opacity .2s linear,padding .2s ease-in-out}.tp-fldv_c>.tp-fldv.tp-v-first,.tp-rotv_c>.tp-fldv.tp-v-first{margin-top:-4px}.tp-fldv_c>.tp-fldv.tp-v-last,.tp-rotv_c>.tp-fldv.tp-v-last{margin-bottom:-4px}.tp-fldv_c>*:not(.tp-v-first),.tp-rotv_c>*:not(.tp-v-first){margin-top:4px}.tp-fldv_c>.tp-fldv:not(.tp-v-hidden)+.tp-fldv,.tp-rotv_c>.tp-fldv:not(.tp-v-hidden)+.tp-fldv{margin-top:0}.tp-fldv_c>.tp-sptv:not(.tp-v-hidden)+.tp-sptv,.tp-rotv_c>.tp-sptv:not(.tp-v-hidden)+.tp-sptv{margin-top:0}.tp-fldv.tp-fldv-expanded>.tp-fldv_c,.tp-rotv.tp-rotv-expanded .tp-rotv_c{opacity:1;padding-bottom:4px;padding-top:4px;transform:none;overflow:visible;transition:height .2s ease-in-out,opacity .2s linear .2s,padding .2s ease-in-out}.tp-btnv{padding:0 4px}.tp-btnv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--button-background-color);border-radius:2px;color:var(--button-foreground-color);cursor:pointer;display:block;font-weight:bold;height:var(--unit-size);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.tp-btnv_b:hover{background-color:var(--button-background-color-hover)}.tp-btnv_b:focus{background-color:var(--button-background-color-focus)}.tp-btnv_b:active{background-color:var(--button-background-color-active)}.tp-dfwv{position:absolute;top:8px;right:8px;width:256px}.tp-fldv.tp-fldv-expanded .tp-fldv_t{transition:border-radius 0s}.tp-fldv_c{border-left:var(--folder-background-color) solid 4px}.tp-fldv_t:hover+.tp-fldv_c{border-left-color:var(--folder-background-color-hover)}.tp-fldv_t:focus+.tp-fldv_c{border-left-color:var(--folder-background-color-focus)}.tp-fldv_t:active+.tp-fldv_c{border-left-color:var(--folder-background-color-active)}.tp-fldv_c>.tp-fldv{margin-left:4px}.tp-fldv_c>.tp-fldv>.tp-fldv_t{border-top-left-radius:2px;border-bottom-left-radius:2px}.tp-fldv_c>.tp-fldv.tp-fldv-expanded>.tp-fldv_t{border-bottom-left-radius:0}.tp-fldv_c .tp-fldv>.tp-fldv_c{border-bottom-left-radius:2px}.tp-ckbiv_l{display:block;position:relative}.tp-ckbiv_i{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background:red;left:0;opacity:0;position:absolute;top:0}.tp-ckbiv_m{background-color:var(--input-background-color);border-radius:2px;cursor:pointer;display:block;height:var(--unit-size);position:relative;width:var(--unit-size)}.tp-ckbiv_m::before{background-color:var(--input-foreground-color);border-radius:2px;bottom:4px;content:\'\';display:block;left:4px;opacity:0;position:absolute;right:4px;top:4px}.tp-ckbiv_i:hover+.tp-ckbiv_m{background-color:var(--input-background-color-hover)}.tp-ckbiv_i:focus+.tp-ckbiv_m{background-color:var(--input-background-color-focus)}.tp-ckbiv_i:active+.tp-ckbiv_m{background-color:var(--input-background-color-active)}.tp-ckbiv_i:checked+.tp-ckbiv_m::before{opacity:1}.tp-cctxtsiv{display:flex;width:100%}.tp-cctxtsiv_m{margin-right:4px;position:relative}.tp-cctxtsiv_ms{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;border-radius:2px;color:var(--label-foreground-color);cursor:pointer;height:var(--unit-size);line-height:var(--unit-size);padding:0 18px 0 4px}.tp-cctxtsiv_ms:hover{background-color:var(--input-background-color-hover)}.tp-cctxtsiv_ms:focus{background-color:var(--input-background-color-focus)}.tp-cctxtsiv_ms:active{background-color:var(--input-background-color-active)}.tp-cctxtsiv_mm{border-color:var(--label-foreground-color) transparent transparent;border-style:solid;border-width:3px;box-sizing:border-box;height:6px;pointer-events:none;width:6px;bottom:0;margin:auto;position:absolute;right:6px;top:3px}.tp-cctxtsiv_w{display:flex;flex:1}.tp-cctxtsiv_i{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--input-background-color);border-radius:2px;box-sizing:border-box;color:var(--input-foreground-color);font-family:inherit;height:var(--unit-size);line-height:var(--unit-size);min-width:0;width:100%;border-radius:0;flex:1;padding:0 4px}.tp-cctxtsiv_i:hover{background-color:var(--input-background-color-hover)}.tp-cctxtsiv_i:focus{background-color:var(--input-background-color-focus)}.tp-cctxtsiv_i:active{background-color:var(--input-background-color-active)}.tp-cctxtsiv_i:first-child{border-bottom-left-radius:2px;border-top-left-radius:2px}.tp-cctxtsiv_i:last-child{border-bottom-right-radius:2px;border-top-right-radius:2px}.tp-cctxtsiv_i+.tp-cctxtsiv_i{margin-left:2px}.tp-clpiv{background-color:var(--base-background-color);border-radius:6px;box-shadow:0 2px 4px var(--base-shadow-color);display:none;padding:4px;position:relative;visibility:hidden;z-index:1000}.tp-clpiv.tp-clpiv-expanded{display:block;visibility:visible}.tp-clpiv_h,.tp-clpiv_ap{margin-left:6px;margin-right:6px}.tp-clpiv_h{margin-top:4px}.tp-clpiv_rgb{display:flex;margin-top:4px;width:100%}.tp-clpiv_a{display:flex;margin-top:4px;padding-top:8px;position:relative}.tp-clpiv_a:before{background-color:var(--separator-color);content:\'\';height:4px;left:-4px;position:absolute;right:-4px;top:0}.tp-clpiv_ap{align-items:center;display:flex;flex:3}.tp-clpiv_at{flex:1;margin-left:4px}.tp-svpiv{border-radius:2px;outline:none;overflow:hidden;position:relative}.tp-svpiv_c{cursor:crosshair;display:block;height:80px;width:100%}.tp-svpiv_m{border-radius:100%;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;filter:drop-shadow(0 0 1px rgba(0,0,0,0.3));height:12px;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;width:12px}.tp-svpiv:focus .tp-svpiv_m{border-color:#fff}.tp-hpliv{cursor:pointer;height:var(--unit-size);outline:none;position:relative}.tp-hpliv_c{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAAQ0lEQVQoU2P8z8Dwn0GCgQEDi2OK/RBgYHjBgIpfovFh8j8YBIgzFGQxuqEgPhaDOT5gOhPkdCxOZeBg+IDFZZiGAgCaSSMYtcRHLgAAAABJRU5ErkJggg==);background-position:left top;background-repeat:no-repeat;background-size:100% 100%;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;position:absolute;top:50%;width:100%}.tp-hpliv_m{border-radius:2px;border:rgba(255,255,255,0.75) solid 2px;box-shadow:0 0 2px rgba(0,0,0,0.1);box-sizing:border-box;height:12px;left:50%;margin-left:-6px;margin-top:-6px;pointer-events:none;position:absolute;top:50%;width:12px}.tp-hpliv:focus .tp-hpliv_m{border-color:#fff}.tp-apliv{cursor:pointer;height:var(--unit-size);outline:none;position:relative;width:100%}.tp-apliv_b{background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:4px 4px;background-position:0 0,2px 2px;background-color:#fff;border-radius:2px;display:block;height:4px;left:0;margin-top:-2px;overflow:hidden;position:absolute;top:50%;width:100%}.tp-apliv_c{bottom:0;left:0;position:absolute;right:0;top:0}.tp-apliv_m{background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:12px 12px;background-position:0 0,6px 6px;background-color:#fff;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,0.1);height:12px;left:50%;margin-left:-6px;margin-top:-6px;overflow:hidden;pointer-events:none;position:absolute;top:50%;width:12px}.tp-apliv_p{border-radius:2px;border:rgba(255,255,255,0.75) solid 2px;box-sizing:border-box;bottom:0;left:0;position:absolute;right:0;top:0}.tp-apliv:focus .tp-apliv_p{border-color:#fff}.tp-lstiv{display:block;padding:0;position:relative}.tp-lstiv_s{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--button-background-color);border-radius:2px;color:var(--button-foreground-color);cursor:pointer;display:block;height:var(--unit-size);line-height:var(--unit-size);padding:0 18px 0 4px;width:100%}.tp-lstiv_s:hover{background-color:var(--button-background-color-hover)}.tp-lstiv_s:focus{background-color:var(--button-background-color-focus)}.tp-lstiv_s:active{background-color:var(--button-background-color-active)}.tp-lstiv_m{border-color:var(--button-foreground-color) transparent transparent;border-style:solid;border-width:3px;box-sizing:border-box;height:6px;pointer-events:none;width:6px;bottom:0;margin:auto;position:absolute;right:6px;top:3px}.tp-p2dpadiv{background-color:var(--base-background-color);border-radius:6px;box-shadow:0 2px 4px var(--base-shadow-color);display:none;padding:4px 4px 4px calc(4px * 2 + var(--unit-size));position:relative;visibility:hidden;z-index:1000}.tp-p2dpadiv.tp-p2dpadiv-expanded{display:block;visibility:visible}.tp-p2dpadiv_p{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--input-background-color);border-radius:2px;box-sizing:border-box;color:var(--input-foreground-color);font-family:inherit;height:var(--unit-size);line-height:var(--unit-size);min-width:0;width:100%;cursor:crosshair;height:0;overflow:hidden;padding-bottom:100%;position:relative}.tp-p2dpadiv_p:hover{background-color:var(--input-background-color-hover)}.tp-p2dpadiv_p:focus{background-color:var(--input-background-color-focus)}.tp-p2dpadiv_p:active{background-color:var(--input-background-color-active)}.tp-p2dpadiv_g{display:block;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.tp-p2dpadiv_ax{stroke:var(--input-guide-color)}.tp-p2dpadiv_l{stroke:var(--input-foreground-color);stroke-linecap:round;stroke-dasharray:1px 3px}.tp-p2dpadiv_m{fill:var(--input-foreground-color)}.tp-p2dpadtxtiv{display:flex;position:relative}.tp-p2dpadtxtiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--button-background-color);border-radius:2px;color:var(--button-foreground-color);cursor:pointer;display:block;font-weight:bold;height:var(--unit-size);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:var(--unit-size);position:relative;width:var(--unit-size)}.tp-p2dpadtxtiv_b:hover{background-color:var(--button-background-color-hover)}.tp-p2dpadtxtiv_b:focus{background-color:var(--button-background-color-focus)}.tp-p2dpadtxtiv_b:active{background-color:var(--button-background-color-active)}.tp-p2dpadtxtiv_b svg{display:block;height:16px;left:50%;margin-left:-8px;margin-top:-8px;position:absolute;top:50%;width:16px}.tp-p2dpadtxtiv_p{left:-4px;position:absolute;right:-4px;top:var(--unit-size)}.tp-p2dpadtxtiv_t{margin-left:4px}.tp-p2dtxtiv{display:flex}.tp-p2dtxtiv_w{align-items:center;display:flex}.tp-p2dtxtiv_w+.tp-p2dtxtiv_w{margin-left:2px}.tp-p2dtxtiv_i{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--input-background-color);border-radius:2px;box-sizing:border-box;color:var(--input-foreground-color);font-family:inherit;height:var(--unit-size);line-height:var(--unit-size);min-width:0;width:100%;padding:0 4px;width:100%}.tp-p2dtxtiv_i:hover{background-color:var(--input-background-color-hover)}.tp-p2dtxtiv_i:focus{background-color:var(--input-background-color-focus)}.tp-p2dtxtiv_i:active{background-color:var(--input-background-color-active)}.tp-p2dtxtiv_w:nth-child(1) .tp-p2dtxtiv_i{border-top-right-radius:0;border-bottom-right-radius:0}.tp-p2dtxtiv_w:nth-child(2) .tp-p2dtxtiv_i{border-top-left-radius:0;border-bottom-left-radius:0}.tp-sldiv{display:block;padding:0}.tp-sldiv_o{box-sizing:border-box;cursor:pointer;height:var(--unit-size);margin:0 6px;outline:none;position:relative}.tp-sldiv_o::before{background-color:var(--input-background-color);border-radius:1px;bottom:0;content:\'\';display:block;height:2px;left:0;margin:auto;position:absolute;right:0;top:0}.tp-sldiv_i{height:100%;left:0;position:absolute;top:0}.tp-sldiv_i::before{background-color:var(--button-background-color);border-radius:2px;bottom:0;content:\'\';display:block;height:12px;margin:auto;position:absolute;right:-6px;top:0;width:12px}.tp-sldiv_o:hover .tp-sldiv_i::before{background-color:var(--button-background-color-hover)}.tp-sldiv_o:focus .tp-sldiv_i::before{background-color:var(--button-background-color-focus)}.tp-sldiv_o:active .tp-sldiv_i::before{background-color:var(--button-background-color-active)}.tp-txtiv{display:block;padding:0}.tp-txtiv_i{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--input-background-color);border-radius:2px;box-sizing:border-box;color:var(--input-foreground-color);font-family:inherit;height:var(--unit-size);line-height:var(--unit-size);min-width:0;width:100%;padding:0 4px}.tp-txtiv_i:hover{background-color:var(--input-background-color-hover)}.tp-txtiv_i:focus{background-color:var(--input-background-color-focus)}.tp-txtiv_i:active{background-color:var(--input-background-color-active)}.tp-cswiv{background-image:linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%),linear-gradient(to top right, #ddd 25%, transparent 25%, transparent 75%, #ddd 75%);background-size:10px 10px;background-position:0 0,5px 5px;background-color:#fff;border-radius:2px}.tp-cswiv_sw{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--input-background-color);border-radius:2px;box-sizing:border-box;color:var(--input-foreground-color);font-family:inherit;height:var(--unit-size);line-height:var(--unit-size);min-width:0;width:100%}.tp-cswiv_sw:hover{background-color:var(--input-background-color-hover)}.tp-cswiv_sw:focus{background-color:var(--input-background-color-focus)}.tp-cswiv_sw:active{background-color:var(--input-background-color-active)}.tp-cswiv_b{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;cursor:pointer;display:block;height:var(--unit-size);left:0;margin:0;outline:none;padding:0;position:absolute;top:0;width:var(--unit-size)}.tp-cswiv_b:focus::after{border:rgba(255,255,255,0.75) solid 2px;border-radius:2px;bottom:0;content:\'\';display:block;left:0;position:absolute;right:0;top:0}.tp-cswiv_p{left:-4px;position:absolute;right:-4px;top:var(--unit-size)}.tp-cswtxtiv{display:flex;position:relative}.tp-cswtxtiv_s{flex-grow:0;flex-shrink:0;width:var(--unit-size)}.tp-cswtxtiv_t{flex:1;margin-left:4px}.tp-sldtxtiv{display:flex}.tp-sldtxtiv_s{flex:2}.tp-sldtxtiv_t{flex:1;margin-left:4px}.tp-lblv{align-items:center;display:flex;line-height:1.3;padding-left:4px;padding-right:4px}.tp-lblv_l{color:var(--label-foreground-color);flex:1;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;overflow:hidden;padding-left:4px;padding-right:16px}.tp-lblv_v{align-self:flex-start;flex-grow:0;flex-shrink:0;width:160px}.tp-grpmv{display:block;padding:0;position:relative}.tp-grpmv_g{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--monitor-background-color);border-radius:2px;box-sizing:border-box;color:var(--monitor-foreground-color);height:var(--unit-size);width:100%;display:block;height:calc(var(--unit-size) * 3)}.tp-grpmv_g polyline{fill:none;stroke:var(--monitor-foreground-color);stroke-linejoin:round}.tp-grpmv_t{color:var(--monitor-foreground-color);font-size:0.9em;left:0;pointer-events:none;position:absolute;text-indent:4px;top:0;visibility:hidden}.tp-grpmv_t.tp-grpmv_t-valid{visibility:visible}.tp-grpmv_t::before{background-color:var(--monitor-foreground-color);border-radius:100%;content:\'\';display:block;height:4px;left:-2px;position:absolute;top:-2px;width:4px}.tp-sglmv_i{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--monitor-background-color);border-radius:2px;box-sizing:border-box;color:var(--monitor-foreground-color);height:var(--unit-size);width:100%;padding:0 4px}.tp-mllmv_i{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--monitor-background-color);border-radius:2px;box-sizing:border-box;color:var(--monitor-foreground-color);height:var(--unit-size);width:100%;display:block;height:calc(var(--unit-size) * 3);line-height:var(--unit-size);padding:0 4px;resize:none;white-space:pre}.tp-cswmv_sw{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border-width:0;font-family:inherit;font-size:inherit;font-weight:inherit;margin:0;outline:none;padding:0;background-color:var(--monitor-background-color);border-radius:2px;box-sizing:border-box;color:var(--monitor-foreground-color);height:var(--unit-size);width:100%}.tp-rotv{--font-family: var(--tp-font-family, Roboto Mono,Source Code Pro,Menlo,Courier,monospace);--unit-size: var(--tp-unit-size, 20px);--base-background-color: var(--tp-base-background-color, #2f3137);--base-shadow-color: var(--tp-base-shadow-color, rgba(0,0,0,0.2));--button-background-color: var(--tp-button-background-color, #adafb8);--button-background-color-active: var(--tp-button-background-color-active, #d6d7db);--button-background-color-focus: var(--tp-button-background-color-focus, #c8cad0);--button-background-color-hover: var(--tp-button-background-color-hover, #bbbcc4);--button-foreground-color: var(--tp-button-foreground-color, #2f3137);--folder-background-color: var(--tp-folder-background-color, rgba(200,202,208,0.1));--folder-background-color-active: var(--tp-folder-background-color-active, rgba(200,202,208,0.25));--folder-background-color-focus: var(--tp-folder-background-color-focus, rgba(200,202,208,0.2));--folder-background-color-hover: var(--tp-folder-background-color-hover, rgba(200,202,208,0.15));--folder-foreground-color: var(--tp-folder-foreground-color, #c8cad0);--input-background-color: var(--tp-input-background-color, rgba(200,202,208,0.1));--input-background-color-active: var(--tp-input-background-color-active, rgba(200,202,208,0.25));--input-background-color-focus: var(--tp-input-background-color-focus, rgba(200,202,208,0.2));--input-background-color-hover: var(--tp-input-background-color-hover, rgba(200,202,208,0.15));--input-foreground-color: var(--tp-input-foreground-color, #c8cad0);--input-guide-color: var(--tp-input-guide-color, rgba(47,49,55,0.5));--label-foreground-color: var(--tp-label-foreground-color, rgba(200,202,208,0.7));--monitor-background-color: var(--tp-monitor-background-color, #26272c);--monitor-foreground-color: var(--tp-monitor-foreground-color, rgba(200,202,208,0.7));--separator-color: var(--tp-separator-color, #26272c);background-color:var(--base-background-color);border-radius:6px;box-shadow:0 2px 4px var(--base-shadow-color);font-family:var(--font-family);font-size:11px;font-weight:500;line-height:1;text-align:left}.tp-rotv_t{border-bottom-left-radius:6px;border-bottom-right-radius:6px;border-top-left-radius:6px;border-top-right-radius:6px}.tp-rotv.tp-rotv-expanded .tp-rotv_t{border-bottom-left-radius:0;border-bottom-right-radius:0}.tp-rotv_m{transition:none}.tp-rotv_c>.tp-fldv:last-child>.tp-fldv_c{border-bottom-left-radius:6px;border-bottom-right-radius:6px}.tp-rotv_c>.tp-fldv:last-child:not(.tp-fldv-expanded)>.tp-fldv_t{border-bottom-left-radius:6px;border-bottom-right-radius:6px}.tp-rotv_c>.tp-fldv:first-child>.tp-fldv_t{border-top-left-radius:6px;border-top-right-radius:6px}.tp-sptv_r{background-color:var(--separator-color);border-width:0;display:block;height:4px;margin:0;width:100%}.tp-v.tp-v-hidden{display:none}';
        if (document.head) {
            document.head.appendChild(styleElem);
        }
    }
    // tslint:disable-next-line: no-default-export
    var Tweakpane = /** @class */ (function (_super) {
        __extends(Tweakpane, _super);
        function Tweakpane(opt_config) {
            var _this = _super.call(this, opt_config) || this;
            embedDefaultStyleIfNeeded(_this.document);
            return _this;
        }
        return Tweakpane;
    }(PlainTweakpane));

    return Tweakpane;

})));
