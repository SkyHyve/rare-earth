(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.RareEarth = {}, global.React, global.ReactDOM));
})(this, (function (exports, React, ReactDOM) { 'use strict';

  function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n.default = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);
  var ReactDOM__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactDOM);

  function _defineProperty$1(e, r, t) {
    return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function ownKeys$1(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) {
        _defineProperty$1(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive$1(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey$1(t) {
    var i = _toPrimitive$1(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React.createContext && /*#__PURE__*/React.createContext(DefaultContext);

  var _excluded = ["attr", "size", "title"];
  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function Tree2Element(tree) {
    return tree && tree.map((node, i) => /*#__PURE__*/React.createElement(node.tag, _objectSpread({
      key: i
    }, node.attr), Tree2Element(node.child)));
  }
  function GenIcon(data) {
    return props => /*#__PURE__*/React.createElement(IconBase, _extends({
      attr: _objectSpread({}, data.attr)
    }, props), Tree2Element(data.child));
  }
  function IconBase(props) {
    var elem = conf => {
      var {
          attr,
          size,
          title
        } = props,
        svgProps = _objectWithoutProperties(props, _excluded);
      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + " " : "") + props.className;
      return /*#__PURE__*/React.createElement("svg", _extends({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: _objectSpread(_objectSpread({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && /*#__PURE__*/React.createElement("title", null, title), props.children);
    };
    return IconContext !== undefined ? /*#__PURE__*/React.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function FaSearchPlus (props) {
    return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"},"child":[]}]})(props);
  }function FaSearch (props) {
    return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"},"child":[]}]})(props);
  }

  // THIS FILE IS AUTO GENERATED
  function TbTableExport (props) {
    return GenIcon({"attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5"},"child":[]},{"tag":"path","attr":{"d":"M3 10h18"},"child":[]},{"tag":"path","attr":{"d":"M10 3v18"},"child":[]},{"tag":"path","attr":{"d":"M16 19h6"},"child":[]},{"tag":"path","attr":{"d":"M19 16l3 3l-3 3"},"child":[]}]})(props);
  }function TbZoomReset (props) {
    return GenIcon({"attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"d":"M21 21l-6 -6"},"child":[]},{"tag":"path","attr":{"d":"M3.268 12.043a7.017 7.017 0 0 0 6.634 4.957a7.012 7.012 0 0 0 7.043 -6.131a7 7 0 0 0 -5.314 -7.672a7.021 7.021 0 0 0 -8.241 4.403"},"child":[]},{"tag":"path","attr":{"d":"M3 4v4h4"},"child":[]}]})(props);
  }

  /* eslint-disable no-undefined,no-param-reassign,no-shadow */

  /**
   * Throttle execution of a function. Especially useful for rate limiting
   * execution of handlers on events like resize and scroll.
   *
   * @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
   *                                            are most useful.
   * @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
   *                                            as-is, to `callback` when the throttled-function is executed.
   * @param {object} [options] -              An object to configure options.
   * @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
   *                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
   *                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
   *                                            `delay` milliseconds, the internal counter is reset).
   * @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
   *                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
   *                                            callback will never executed if both noLeading = true and noTrailing = true.
   * @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
   *                                            false (at end), schedule `callback` to execute after `delay` ms.
   *
   * @returns {Function} A new, throttled, function.
   */
  function throttle (delay, callback, options) {
    var _ref = options || {},
      _ref$noTrailing = _ref.noTrailing,
      noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing,
      _ref$noLeading = _ref.noLeading,
      noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading,
      _ref$debounceMode = _ref.debounceMode,
      debounceMode = _ref$debounceMode === void 0 ? undefined : _ref$debounceMode;
    /*
     * After wrapper has stopped being called, this timeout ensures that
     * `callback` is executed at the proper times in `throttle` and `end`
     * debounce modes.
     */
    var timeoutID;
    var cancelled = false;

    // Keep track of the last time `callback` was executed.
    var lastExec = 0;

    // Function to clear existing timeout
    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    }

    // Function to cancel next exec
    function cancel(options) {
      var _ref2 = options || {},
        _ref2$upcomingOnly = _ref2.upcomingOnly,
        upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;
      clearExistingTimeout();
      cancelled = !upcomingOnly;
    }

    /*
     * The `wrapper` function encapsulates all of the throttling / debouncing
     * functionality and when executed will limit the rate at which `callback`
     * is executed.
     */
    function wrapper() {
      for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
        arguments_[_key] = arguments[_key];
      }
      var self = this;
      var elapsed = Date.now() - lastExec;
      if (cancelled) {
        return;
      }

      // Execute `callback` and update the `lastExec` timestamp.
      function exec() {
        lastExec = Date.now();
        callback.apply(self, arguments_);
      }

      /*
       * If `debounceMode` is true (at begin) this is used to clear the flag
       * to allow future `callback` executions.
       */
      function clear() {
        timeoutID = undefined;
      }
      if (!noLeading && debounceMode && !timeoutID) {
        /*
         * Since `wrapper` is being called for the first time and
         * `debounceMode` is true (at begin), execute `callback`
         * and noLeading != true.
         */
        exec();
      }
      clearExistingTimeout();
      if (debounceMode === undefined && elapsed > delay) {
        if (noLeading) {
          /*
           * In throttle mode with noLeading, if `delay` time has
           * been exceeded, update `lastExec` and schedule `callback`
           * to execute after `delay` ms.
           */
          lastExec = Date.now();
          if (!noTrailing) {
            timeoutID = setTimeout(debounceMode ? clear : exec, delay);
          }
        } else {
          /*
           * In throttle mode without noLeading, if `delay` time has been exceeded, execute
           * `callback`.
           */
          exec();
        }
      } else if (noTrailing !== true) {
        /*
         * In trailing throttle mode, since `delay` time has not been
         * exceeded, schedule `callback` to execute `delay` ms after most
         * recent execution.
         *
         * If `debounceMode` is true (at begin), schedule `clear` to execute
         * after `delay` ms.
         *
         * If `debounceMode` is false (at end), schedule `callback` to
         * execute after `delay` ms.
         */
        timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
      }
    }
    wrapper.cancel = cancel;

    // Return the wrapper function.
    return wrapper;
  }

  /* eslint-disable no-undefined */

  /**
   * Debounce execution of a function. Debouncing, unlike throttling,
   * guarantees that a function is only executed a single time, either at the
   * very beginning of a series of calls, or at the very end.
   *
   * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                        to `callback` when the debounced-function is executed.
   * @param {object} [options] -           An object to configure options.
   * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
   *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
   *                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
   *
   * @returns {Function} A new, debounced function.
   */
  function debounce (delay, callback, options) {
    var _ref = options || {},
      _ref$atBegin = _ref.atBegin,
      atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;
    return throttle(delay, callback, {
      debounceMode: atBegin !== false
    });
  }

  function hasWindow() {
    return typeof window !== 'undefined';
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || '').toLowerCase();
    }
    // Mocked nodes in testing environments may not be instances of Node. By
    // returning `#document` an infinite loop won't occur.
    // https://github.com/floating-ui/floating-ui/issues/2317
    return '#document';
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === 'undefined') {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  const invalidOverflowDisplayValues = /*#__PURE__*/new Set(['inline', 'contents']);
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle$1(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
  }
  const tableElements = /*#__PURE__*/new Set(['table', 'td', 'th']);
  function isTableElement(element) {
    return tableElements.has(getNodeName(element));
  }
  const topLayerSelectors = [':popover-open', ':modal'];
  function isTopLayer(element) {
    return topLayerSelectors.some(selector => {
      try {
        return element.matches(selector);
      } catch (_e) {
        return false;
      }
    });
  }
  const transformProperties = ['transform', 'translate', 'scale', 'rotate', 'perspective'];
  const willChangeValues = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'];
  const containValues = ['paint', 'layout', 'strict', 'content'];
  function isContainingBlock(elementOrCss) {
    const webkit = isWebKit();
    const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    // https://drafts.csswg.org/css-transforms-2/#individual-transforms
    return transformProperties.some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || willChangeValues.some(value => (css.willChange || '').includes(value)) || containValues.some(value => (css.contain || '').includes(value));
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (typeof CSS === 'undefined' || !CSS.supports) return false;
    return CSS.supports('-webkit-backdrop-filter', 'none');
  }
  const lastTraversableNodeNames = /*#__PURE__*/new Set(['html', 'body', '#document']);
  function isLastTraversableNode(node) {
    return lastTraversableNodeNames.has(getNodeName(node));
  }
  function getComputedStyle$1(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === 'html') {
      return node;
    }
    const result =
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    isShadowRoot(node) && node.host ||
    // Fallback.
    getDocumentElement(node);
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  /**
   * Custom positioning reference element.
   * @see https://floating-ui.com/docs/virtual-elements
   */

  const min = Math.min;
  const max = Math.max;
  const round = Math.round;
  const floor = Math.floor;
  const createCoords = v => ({
    x: v,
    y: v
  });
  const oppositeSideMap = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  const oppositeAlignmentMap = {
    start: 'end',
    end: 'start'
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === 'function' ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split('-')[0];
  }
  function getAlignment(placement) {
    return placement.split('-')[1];
  }
  function getOppositeAxis(axis) {
    return axis === 'x' ? 'y' : 'x';
  }
  function getAxisLength(axis) {
    return axis === 'y' ? 'height' : 'width';
  }
  const yAxisSides = /*#__PURE__*/new Set(['top', 'bottom']);
  function getSideAxis(placement) {
    return yAxisSides.has(getSide(placement)) ? 'y' : 'x';
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
  }
  const lrPlacement = ['left', 'right'];
  const rlPlacement = ['right', 'left'];
  const tbPlacement = ['top', 'bottom'];
  const btPlacement = ['bottom', 'top'];
  function getSideList(side, isStart, rtl) {
    switch (side) {
      case 'top':
      case 'bottom':
        if (rtl) return isStart ? rlPlacement : lrPlacement;
        return isStart ? lrPlacement : rlPlacement;
      case 'left':
      case 'right':
        return isStart ? tbPlacement : btPlacement;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === 'start', rtl);
    if (alignment) {
      list = list.map(side => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
  }
  function expandPaddingObject(padding) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      ...padding
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== 'number' ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }

  // Avoid Chrome DevTools blue warning.
  function getPlatform() {
    const uaData = navigator.userAgentData;
    if (uaData != null && uaData.platform) {
      return uaData.platform;
    }
    return navigator.platform;
  }
  function getUserAgent() {
    const uaData = navigator.userAgentData;
    if (uaData && Array.isArray(uaData.brands)) {
      return uaData.brands.map(_ref => {
        let {
          brand,
          version
        } = _ref;
        return brand + "/" + version;
      }).join(' ');
    }
    return navigator.userAgent;
  }
  function isSafari() {
    // Chrome DevTools does not complain about navigator.vendor
    return /apple/i.test(navigator.vendor);
  }
  function isMac() {
    return getPlatform().toLowerCase().startsWith('mac') && !navigator.maxTouchPoints;
  }
  function isJSDOM() {
    return getUserAgent().includes('jsdom/');
  }

  const FOCUSABLE_ATTRIBUTE$1 = 'data-floating-ui-focusable';
  const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled])," + "[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";

  function activeElement(doc) {
    let activeElement = doc.activeElement;
    while (((_activeElement = activeElement) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
      var _activeElement;
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  }
  function contains(parent, child) {
    if (!parent || !child) {
      return false;
    }
    const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();

    // First, attempt with faster native method
    if (parent.contains(child)) {
      return true;
    }

    // then fallback to custom implementation with Shadow DOM support
    if (rootNode && isShadowRoot(rootNode)) {
      let next = child;
      while (next) {
        if (parent === next) {
          return true;
        }
        // @ts-ignore
        next = next.parentNode || next.host;
      }
    }

    // Give up, the result is false
    return false;
  }
  function getTarget(event) {
    if ('composedPath' in event) {
      return event.composedPath()[0];
    }

    // TS thinks `event` is of type never as it assumes all browsers support
    // `composedPath()`, but browsers without shadow DOM don't.
    return event.target;
  }
  function isEventTargetWithin(event, node) {
    if (node == null) {
      return false;
    }
    if ('composedPath' in event) {
      return event.composedPath().includes(node);
    }

    // TS thinks `event` is of type never as it assumes all browsers support composedPath, but browsers without shadow dom don't
    const e = event;
    return e.target != null && node.contains(e.target);
  }
  function isRootElement(element) {
    return element.matches('html,body');
  }
  function getDocument(node) {
    return (node == null ? void 0 : node.ownerDocument) || document;
  }
  function isTypeableElement(element) {
    return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
  }
  function matchesFocusVisible(element) {
    // We don't want to block focus from working with `visibleOnly`
    // (JSDOM doesn't match `:focus-visible` when the element has `:focus`)
    if (!element || isJSDOM()) return true;
    try {
      return element.matches(':focus-visible');
    } catch (_e) {
      return true;
    }
  }
  function getFloatingFocusElement(floatingElement) {
    if (!floatingElement) {
      return null;
    }
    // Try to find the element that has `{...getFloatingProps()}` spread on it.
    // This indicates the floating element is acting as a positioning wrapper, and
    // so focus should be managed on the child element with the event handlers and
    // aria props.
    return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE$1) ? floatingElement : floatingElement.querySelector("[" + FOCUSABLE_ATTRIBUTE$1 + "]") || floatingElement;
  }

  function getNodeChildren(nodes, id, onlyOpenChildren) {
    if (onlyOpenChildren === void 0) {
      onlyOpenChildren = true;
    }
    const directChildren = nodes.filter(node => {
      var _node$context;
      return node.parentId === id && (!onlyOpenChildren || ((_node$context = node.context) == null ? void 0 : _node$context.open));
    });
    return directChildren.flatMap(child => [child, ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
  }
  function isReactEvent(event) {
    return 'nativeEvent' in event;
  }
  function isMouseLikePointerType(pointerType, strict) {
    // On some Linux machines with Chromium, mouse inputs return a `pointerType`
    // of "pen": https://github.com/floating-ui/floating-ui/issues/2015
    const values = ['mouse', 'pen'];
    if (!strict) {
      values.push('', undefined);
    }
    return values.includes(pointerType);
  }

  var isClient$1 = typeof document !== 'undefined';

  var noop$1 = function noop() {};
  var index$1 = isClient$1 ? React.useLayoutEffect : noop$1;

  // https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
  const SafeReact$1 = {
    ...React__namespace
  };

  function useLatestRef$1(value) {
    const ref = React__namespace.useRef(value);
    index$1(() => {
      ref.current = value;
    });
    return ref;
  }
  const useInsertionEffect = SafeReact$1.useInsertionEffect;
  const useSafeInsertionEffect = useInsertionEffect || (fn => fn());
  function useEffectEvent(callback) {
    const ref = React__namespace.useRef(() => {
    });
    useSafeInsertionEffect(() => {
      ref.current = callback;
    });
    return React__namespace.useCallback(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return ref.current == null ? void 0 : ref.current(...args);
    }, []);
  }

  var jsxRuntime = {exports: {}};

  var reactJsxRuntime_production = {};

  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var hasRequiredReactJsxRuntime_production;

  function requireReactJsxRuntime_production () {
  	if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  	hasRequiredReactJsxRuntime_production = 1;
  	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
  	  REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  	function jsxProd(type, config, maybeKey) {
  	  var key = null;
  	  void 0 !== maybeKey && (key = "" + maybeKey);
  	  void 0 !== config.key && (key = "" + config.key);
  	  if ("key" in config) {
  	    maybeKey = {};
  	    for (var propName in config)
  	      "key" !== propName && (maybeKey[propName] = config[propName]);
  	  } else maybeKey = config;
  	  config = maybeKey.ref;
  	  return {
  	    $$typeof: REACT_ELEMENT_TYPE,
  	    type: type,
  	    key: key,
  	    ref: void 0 !== config ? config : null,
  	    props: maybeKey
  	  };
  	}
  	reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  	reactJsxRuntime_production.jsx = jsxProd;
  	reactJsxRuntime_production.jsxs = jsxProd;
  	return reactJsxRuntime_production;
  }

  var hasRequiredJsxRuntime;

  function requireJsxRuntime () {
  	if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  	hasRequiredJsxRuntime = 1;

  	{
  	  jsxRuntime.exports = requireReactJsxRuntime_production();
  	}
  	return jsxRuntime.exports;
  }

  requireJsxRuntime();

  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === 'y';
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case 'top':
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case 'bottom':
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case 'right':
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case 'left':
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    switch (getAlignment(placement)) {
      case 'start':
        coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
        break;
      case 'end':
        coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
        break;
    }
    return coords;
  }

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   *
   * This export does not have any `platform` interface logic. You will need to
   * write one for the platform you are using Floating UI with.
   */
  const computePosition$1 = async (reference, floating, config) => {
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
    let rects = await platform.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
      const {
        name,
        fn
      } = validMiddleware[i];
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData = {
        ...middlewareData,
        [name]: {
          ...middlewareData[name],
          ...data
        }
      };
      if (reset && resetCount <= 50) {
        resetCount++;
        if (typeof reset === 'object') {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };

  /**
   * Resolves with an object of overflow side offsets that determine how much the
   * element is overflowing a given clipping boundary on each side.
   * - positive = overflowing the boundary by that number of pixels
   * - negative = how many pixels left before it will overflow
   * - 0 = lies flush with the boundary
   * @see https://floating-ui.com/docs/detectOverflow
   */
  async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform,
      rects,
      elements,
      strategy
    } = state;
    const {
      boundary = 'clippingAncestors',
      rootBoundary = 'viewport',
      elementContext = 'floating',
      altBoundary = false,
      padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === 'floating' ? 'reference' : 'floating';
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform.getClippingRect({
      element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === 'floating' ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
    const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
      x: 1,
      y: 1
    } : {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip$2 = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'flip',
      options,
      async fn(state) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform,
          elements
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state);

        // If a reset by the arrow was caused due to an alignment offset being
        // added, we should skip any logic now since `flip()` has already done its
        // work.
        // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements = [initialPlacement, ...fallbackPlacements];
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides[0]], overflow[sides[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];

        // One or more sides is overflowing.
        if (!overflows.every(side => side <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements[nextIndex];
          if (nextPlacement) {
            const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false;
            if (!ignoreCrossAxisOverflow ||
            // We leave the current main axis only if every placement on that axis
            // overflows the main axis.
            overflowsData.every(d => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
              // Try next placement and re-run the lifecycle.
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
          }

          // First, find the candidates that fit on the mainAxis side of overflow,
          // then find the placement that fits the best on the main crossAxis side.
          let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

          // Otherwise fallback.
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case 'bestFit':
                {
                  var _overflowsData$filter2;
                  const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                    if (hasFallbackAxisSideDirection) {
                      const currentSideAxis = getSideAxis(d.placement);
                      return currentSideAxis === initialSideAxis ||
                      // Create a bias to the `y` side axis due to horizontal
                      // reading directions favoring greater width.
                      currentSideAxis === 'y';
                    }
                    return true;
                  }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                  if (placement) {
                    resetPlacement = placement;
                  }
                  break;
                }
              case 'initialPlacement':
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };

  const originSides = /*#__PURE__*/new Set(['left', 'top']);

  // For type backwards-compatibility, the `OffsetOptions` type was also
  // Derivable.

  async function convertValueToCoords(state, options) {
    const {
      placement,
      platform,
      elements
    } = state;
    const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === 'y';
    const mainAxisMulti = originSides.has(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);

    // eslint-disable-next-line prefer-const
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === 'number' ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === 'number') {
      crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset$2 = function (options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: 'offset',
      options,
      async fn(state) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state;
        const diffCoords = await convertValueToCoords(state, options);

        // If the placement is the same and the arrow caused an alignment offset
        // then we don't need to change the positioning coordinates.
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift$2 = function (options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: 'shift',
      options,
      async fn(state) {
        const {
          x,
          y,
          placement
        } = state;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state);
        const coords = {
          x,
          y
        };
        const overflow = await detectOverflow(state, detectOverflowOptions);
        const crossAxis = getSideAxis(getSide(placement));
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        if (checkMainAxis) {
          const minSide = mainAxis === 'y' ? 'top' : 'left';
          const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
          const min = mainAxisCoord + overflow[minSide];
          const max = mainAxisCoord - overflow[maxSide];
          mainAxisCoord = clamp(min, mainAxisCoord, max);
        }
        if (checkCrossAxis) {
          const minSide = crossAxis === 'y' ? 'top' : 'left';
          const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
          const min = crossAxisCoord + overflow[minSide];
          const max = crossAxisCoord - overflow[maxSide];
          crossAxisCoord = clamp(min, crossAxisCoord, max);
        }
        const limitedCoords = limiter.fn({
          ...state,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };

  function getCssDimensions(element) {
    const css = getComputedStyle$1(element);
    // In testing environments, the `width` and `height` properties are empty
    // strings for SVG elements, returning NaN. Fallback to `0` in this case.
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }

  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }

  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;

    // 0, NaN, or Infinity should always fallback to 1.

    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }

  const noOffsets = /*#__PURE__*/createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
      return false;
    }
    return isFixed;
  }

  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
      const win = getWindow(domElement);
      const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetParent && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle$1(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }

  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }

  function getHTMLOffset(documentElement, scroll) {
    const htmlRect = documentElement.getBoundingClientRect();
    const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
    const y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }

  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === 'fixed';
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isHTMLElement(offsetParent)) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }

  function getClientRects(element) {
    return Array.from(element.getClientRects());
  }

  // Gets the entire size of the scrollable document area, even extending outside
  // of the `<html>` and `<body>` rect bounds if horizontally scrollable.
  function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle$1(body).direction === 'rtl') {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  // Safety check: ensure the scrollbar space is reasonable in case this
  // calculation is affected by unusual styles.
  // Most scrollbars leave 15-18px of space.
  const SCROLLBAR_MAX = 25;
  function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      width = visualViewport.width;
      height = visualViewport.height;
      const visualViewportBased = isWebKit();
      if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
        x = visualViewport.offsetLeft;
        y = visualViewport.offsetTop;
      }
    }
    const windowScrollbarX = getWindowScrollBarX(html);
    // <html> `overflow: hidden` + `scrollbar-gutter: stable` reduces the
    // visual width of the <html> but this is not considered in the size
    // of `html.clientWidth`.
    if (windowScrollbarX <= 0) {
      const doc = html.ownerDocument;
      const body = doc.body;
      const bodyStyles = getComputedStyle(body);
      const bodyMarginInline = doc.compatMode === 'CSS1Compat' ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
      const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
      if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
        width -= clippingStableScrollbarWidth;
      }
    } else if (windowScrollbarX <= SCROLLBAR_MAX) {
      // If the <body> scrollbar is on the left, the width needs to be extended
      // by the scrollbar amount so there isn't extra space on the right.
      width += windowScrollbarX;
    }
    return {
      width,
      height,
      x,
      y
    };
  }

  const absoluteOrFixed = /*#__PURE__*/new Set(['absolute', 'fixed']);
  // Returns the inner client rect, subtracting scrollbars if present.
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === 'viewport') {
      rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === 'document') {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
      return false;
    }
    return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
  }

  // A "clipping ancestor" is an `overflow` element with the characteristic of
  // clipping (or hiding) child elements. This returns all clipping ancestors
  // of the given element up the tree.
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
    let currentNode = elementIsFixed ? getParentNode(element) : element;

    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle$1(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
        currentContainingBlockComputedStyle = null;
      }
      const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
      if (shouldDropCurrentNode) {
        // Drop non-containing blocks.
        result = result.filter(ancestor => ancestor !== currentNode);
      } else {
        // Record last containing block for next iteration.
        currentContainingBlockComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }

  // Gets the maximum area that the element is visible in due to any number of
  // clipping ancestors.
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
      accRect.top = max(rect.top, accRect.top);
      accRect.right = min(rect.right, accRect.right);
      accRect.bottom = min(rect.bottom, accRect.bottom);
      accRect.left = max(rect.left, accRect.left);
      return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
      width: clippingRect.right - clippingRect.left,
      height: clippingRect.bottom - clippingRect.top,
      x: clippingRect.left,
      y: clippingRect.top
    };
  }

  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }

  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === 'fixed';
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);

    // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
    // Firefox with layout.scrollbar.side = 3 in about:config to test this.
    function setLeftRTLScrollbarOffset() {
      offsets.x = getWindowScrollBarX(documentElement);
    }
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
      if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      } else if (documentElement) {
        setLeftRTLScrollbarOffset();
      }
    }
    if (isFixed && !isOffsetParentAnElement && documentElement) {
      setLeftRTLScrollbarOffset();
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }

  function isStaticPositioned(element) {
    return getComputedStyle$1(element).position === 'static';
  }

  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;

    // Firefox returns the <html> element as the offsetParent if it's non-static,
    // while Chrome and Safari return the <body> element. The <body> element must
    // be used to perform the correct calculations even if the <html> element is
    // non-static.
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }

  // Gets the closest ancestor positioned element. Handles some edge cases,
  // such as table ancestors and cross browser bugs.
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }

  const getElementRects = async function (data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };

  function isRTL(element) {
    return getComputedStyle$1(element).direction === 'rtl';
  }

  const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };

  function rectsAreEqual(a, b) {
    return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
  }

  // https://samthor.au/2021/observing-dom/
  function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);
    function cleanup() {
      var _io;
      clearTimeout(timeoutId);
      (_io = io) == null || _io.disconnect();
      io = null;
    }
    function refresh(skip, threshold) {
      if (skip === void 0) {
        skip = false;
      }
      if (threshold === void 0) {
        threshold = 1;
      }
      cleanup();
      const elementRectForRootMargin = element.getBoundingClientRect();
      const {
        left,
        top,
        width,
        height
      } = elementRectForRootMargin;
      if (!skip) {
        onMove();
      }
      if (!width || !height) {
        return;
      }
      const insetTop = floor(top);
      const insetRight = floor(root.clientWidth - (left + width));
      const insetBottom = floor(root.clientHeight - (top + height));
      const insetLeft = floor(left);
      const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
      const options = {
        rootMargin,
        threshold: max(0, min(1, threshold)) || 1
      };
      let isFirstUpdate = true;
      function handleObserve(entries) {
        const ratio = entries[0].intersectionRatio;
        if (ratio !== threshold) {
          if (!isFirstUpdate) {
            return refresh();
          }
          if (!ratio) {
            // If the reference is clipped, the ratio is 0. Throttle the refresh
            // to prevent an infinite loop of updates.
            timeoutId = setTimeout(() => {
              refresh(false, 1e-7);
            }, 1000);
          } else {
            refresh(false, ratio);
          }
        }
        if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
          // It's possible that even though the ratio is reported as 1, the
          // element is not actually fully within the IntersectionObserver's root
          // area anymore. This can happen under performance constraints. This may
          // be a bug in the browser's IntersectionObserver implementation. To
          // work around this, we compare the element's bounding rect now with
          // what it was at the time we created the IntersectionObserver. If they
          // are not equal then the element moved, so we refresh.
          refresh();
        }
        isFirstUpdate = false;
      }

      // Older browsers don't support a `document` as the root and will throw an
      // error.
      try {
        io = new IntersectionObserver(handleObserve, {
          ...options,
          // Handle <iframe>s
          root: root.ownerDocument
        });
      } catch (_e) {
        io = new IntersectionObserver(handleObserve, options);
      }
      io.observe(element);
    }
    refresh(true);
    return cleanup;
  }

  /**
   * Automatically updates the position of the floating element when necessary.
   * Should only be called when the floating element is mounted on the DOM or
   * visible on the screen.
   * @returns cleanup function that should be invoked when the floating element is
   * removed from the DOM or hidden from the screen.
   * @see https://floating-ui.com/docs/autoUpdate
   */
  function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
      options = {};
    }
    const {
      ancestorScroll = true,
      ancestorResize = true,
      elementResize = typeof ResizeObserver === 'function',
      layoutShift = typeof IntersectionObserver === 'function',
      animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.addEventListener('scroll', update, {
        passive: true
      });
      ancestorResize && ancestor.addEventListener('resize', update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
      resizeObserver = new ResizeObserver(_ref => {
        let [firstEntry] = _ref;
        if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
          // Prevent update loops when using the `size` middleware.
          // https://github.com/floating-ui/floating-ui/issues/1740
          resizeObserver.unobserve(floating);
          cancelAnimationFrame(reobserveFrame);
          reobserveFrame = requestAnimationFrame(() => {
            var _resizeObserver;
            (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
          });
        }
        update();
      });
      if (referenceEl && !animationFrame) {
        resizeObserver.observe(referenceEl);
      }
      resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
      frameLoop();
    }
    function frameLoop() {
      const nextRefRect = getBoundingClientRect(reference);
      if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
        update();
      }
      prevRefRect = nextRefRect;
      frameId = requestAnimationFrame(frameLoop);
    }
    update();
    return () => {
      var _resizeObserver2;
      ancestors.forEach(ancestor => {
        ancestorScroll && ancestor.removeEventListener('scroll', update);
        ancestorResize && ancestor.removeEventListener('resize', update);
      });
      cleanupIo == null || cleanupIo();
      (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
      resizeObserver = null;
      if (animationFrame) {
        cancelAnimationFrame(frameId);
      }
    };
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset$1 = offset$2;

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift$1 = shift$2;

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip$1 = flip$2;

  /**
   * Computes the `x` and `y` coordinates that will place the floating element
   * next to a given reference element.
   */
  const computePosition = (reference, floating, options) => {
    // This caches the expensive `getClippingElementAncestors` function so that
    // multiple lifecycle resets re-use the same result. It only lives for a
    // single call. If other functions become expensive, we can add them as well.
    const cache = new Map();
    const mergedOptions = {
      platform,
      ...options
    };
    const platformWithCache = {
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition$1(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  var isClient = typeof document !== 'undefined';

  var noop = function noop() {};
  var index = isClient ? React.useLayoutEffect : noop;

  // Fork of `fast-deep-equal` that only does the comparisons we need and compares
  // functions
  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (typeof a === 'function' && a.toString() === b.toString()) {
      return true;
    }
    let length;
    let i;
    let keys;
    if (a && b && typeof a === 'object') {
      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) return false;
        for (i = length; i-- !== 0;) {
          if (!deepEqual(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) {
        return false;
      }
      for (i = length; i-- !== 0;) {
        if (!{}.hasOwnProperty.call(b, keys[i])) {
          return false;
        }
      }
      for (i = length; i-- !== 0;) {
        const key = keys[i];
        if (key === '_owner' && a.$$typeof) {
          continue;
        }
        if (!deepEqual(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }
    return a !== a && b !== b;
  }

  function getDPR(element) {
    if (typeof window === 'undefined') {
      return 1;
    }
    const win = element.ownerDocument.defaultView || window;
    return win.devicePixelRatio || 1;
  }

  function roundByDPR(element, value) {
    const dpr = getDPR(element);
    return Math.round(value * dpr) / dpr;
  }

  function useLatestRef(value) {
    const ref = React__namespace.useRef(value);
    index(() => {
      ref.current = value;
    });
    return ref;
  }

  /**
   * Provides data to position a floating element.
   * @see https://floating-ui.com/docs/useFloating
   */
  function useFloating$1(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      placement = 'bottom',
      strategy = 'absolute',
      middleware = [],
      platform,
      elements: {
        reference: externalReference,
        floating: externalFloating
      } = {},
      transform = true,
      whileElementsMounted,
      open
    } = options;
    const [data, setData] = React__namespace.useState({
      x: 0,
      y: 0,
      strategy,
      placement,
      middlewareData: {},
      isPositioned: false
    });
    const [latestMiddleware, setLatestMiddleware] = React__namespace.useState(middleware);
    if (!deepEqual(latestMiddleware, middleware)) {
      setLatestMiddleware(middleware);
    }
    const [_reference, _setReference] = React__namespace.useState(null);
    const [_floating, _setFloating] = React__namespace.useState(null);
    const setReference = React__namespace.useCallback(node => {
      if (node !== referenceRef.current) {
        referenceRef.current = node;
        _setReference(node);
      }
    }, []);
    const setFloating = React__namespace.useCallback(node => {
      if (node !== floatingRef.current) {
        floatingRef.current = node;
        _setFloating(node);
      }
    }, []);
    const referenceEl = externalReference || _reference;
    const floatingEl = externalFloating || _floating;
    const referenceRef = React__namespace.useRef(null);
    const floatingRef = React__namespace.useRef(null);
    const dataRef = React__namespace.useRef(data);
    const hasWhileElementsMounted = whileElementsMounted != null;
    const whileElementsMountedRef = useLatestRef(whileElementsMounted);
    const platformRef = useLatestRef(platform);
    const openRef = useLatestRef(open);
    const update = React__namespace.useCallback(() => {
      if (!referenceRef.current || !floatingRef.current) {
        return;
      }
      const config = {
        placement,
        strategy,
        middleware: latestMiddleware
      };
      if (platformRef.current) {
        config.platform = platformRef.current;
      }
      computePosition(referenceRef.current, floatingRef.current, config).then(data => {
        const fullData = {
          ...data,
          // The floating element's position may be recomputed while it's closed
          // but still mounted (such as when transitioning out). To ensure
          // `isPositioned` will be `false` initially on the next open, avoid
          // setting it to `true` when `open === false` (must be specified).
          isPositioned: openRef.current !== false
        };
        if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
          dataRef.current = fullData;
          ReactDOM__namespace.flushSync(() => {
            setData(fullData);
          });
        }
      });
    }, [latestMiddleware, placement, strategy, platformRef, openRef]);
    index(() => {
      if (open === false && dataRef.current.isPositioned) {
        dataRef.current.isPositioned = false;
        setData(data => ({
          ...data,
          isPositioned: false
        }));
      }
    }, [open]);
    const isMountedRef = React__namespace.useRef(false);
    index(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
    index(() => {
      if (referenceEl) referenceRef.current = referenceEl;
      if (floatingEl) floatingRef.current = floatingEl;
      if (referenceEl && floatingEl) {
        if (whileElementsMountedRef.current) {
          return whileElementsMountedRef.current(referenceEl, floatingEl, update);
        }
        update();
      }
    }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
    const refs = React__namespace.useMemo(() => ({
      reference: referenceRef,
      floating: floatingRef,
      setReference,
      setFloating
    }), [setReference, setFloating]);
    const elements = React__namespace.useMemo(() => ({
      reference: referenceEl,
      floating: floatingEl
    }), [referenceEl, floatingEl]);
    const floatingStyles = React__namespace.useMemo(() => {
      const initialStyles = {
        position: strategy,
        left: 0,
        top: 0
      };
      if (!elements.floating) {
        return initialStyles;
      }
      const x = roundByDPR(elements.floating, data.x);
      const y = roundByDPR(elements.floating, data.y);
      if (transform) {
        return {
          ...initialStyles,
          transform: "translate(" + x + "px, " + y + "px)",
          ...(getDPR(elements.floating) >= 1.5 && {
            willChange: 'transform'
          })
        };
      }
      return {
        position: strategy,
        left: x,
        top: y
      };
    }, [strategy, transform, elements.floating, data.x, data.y]);
    return React__namespace.useMemo(() => ({
      ...data,
      update,
      refs,
      elements,
      floatingStyles
    }), [data, update, refs, elements, floatingStyles]);
  }

  /**
   * Modifies the placement by translating the floating element along the
   * specified axes.
   * A number (shorthand for `mainAxis` or distance), or an axes configuration
   * object may be passed.
   * @see https://floating-ui.com/docs/offset
   */
  const offset = (options, deps) => ({
    ...offset$1(options),
    options: [options, deps]
  });

  /**
   * Optimizes the visibility of the floating element by shifting it in order to
   * keep it in view when it will overflow the clipping boundary.
   * @see https://floating-ui.com/docs/shift
   */
  const shift = (options, deps) => ({
    ...shift$1(options),
    options: [options, deps]
  });

  /**
   * Optimizes the visibility of the floating element by flipping the `placement`
   * in order to keep it in view when the preferred placement(s) will overflow the
   * clipping boundary. Alternative to `autoPlacement`.
   * @see https://floating-ui.com/docs/flip
   */
  const flip = (options, deps) => ({
    ...flip$1(options),
    options: [options, deps]
  });

  const FOCUSABLE_ATTRIBUTE = 'data-floating-ui-focusable';
  const ACTIVE_KEY = 'active';
  const SELECTED_KEY = 'selected';

  // https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
  const SafeReact = {
    ...React__namespace
  };

  let serverHandoffComplete = false;
  let count = 0;
  const genId = () => // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++;
  function useFloatingId() {
    const [id, setId] = React__namespace.useState(() => serverHandoffComplete ? genId() : undefined);
    index$1(() => {
      if (id == null) {
        setId(genId());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React__namespace.useEffect(() => {
      serverHandoffComplete = true;
    }, []);
    return id;
  }
  const useReactId = SafeReact.useId;

  /**
   * Uses React 18's built-in `useId()` when available, or falls back to a
   * slightly less performant (requiring a double render) implementation for
   * earlier React versions.
   * @see https://floating-ui.com/docs/react-utils#useid
   */
  const useId = useReactId || useFloatingId;

  function createEventEmitter() {
    const map = new Map();
    return {
      emit(event, data) {
        var _map$get;
        (_map$get = map.get(event)) == null || _map$get.forEach(listener => listener(data));
      },
      on(event, listener) {
        if (!map.has(event)) {
          map.set(event, new Set());
        }
        map.get(event).add(listener);
      },
      off(event, listener) {
        var _map$get2;
        (_map$get2 = map.get(event)) == null || _map$get2.delete(listener);
      }
    };
  }

  const FloatingNodeContext = /*#__PURE__*/React__namespace.createContext(null);
  const FloatingTreeContext = /*#__PURE__*/React__namespace.createContext(null);

  /**
   * Returns the parent node id for nested floating elements, if available.
   * Returns `null` for top-level floating elements.
   */
  const useFloatingParentNodeId = () => {
    var _React$useContext;
    return ((_React$useContext = React__namespace.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
  };

  /**
   * Returns the nearest floating tree context, if available.
   */
  const useFloatingTree = () => React__namespace.useContext(FloatingTreeContext);

  function createAttribute(name) {
    return "data-floating-ui-" + name;
  }

  function clearTimeoutIfSet(timeoutRef) {
    if (timeoutRef.current !== -1) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = -1;
    }
  }

  const safePolygonIdentifier = /*#__PURE__*/createAttribute('safe-polygon');
  function getDelay(value, prop, pointerType) {
    if (pointerType && !isMouseLikePointerType(pointerType)) {
      return 0;
    }
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'function') {
      const result = value();
      if (typeof result === 'number') {
        return result;
      }
      return result == null ? void 0 : result[prop];
    }
    return value == null ? void 0 : value[prop];
  }
  function getRestMs(value) {
    if (typeof value === 'function') {
      return value();
    }
    return value;
  }
  /**
   * Opens the floating element while hovering over the reference element, like
   * CSS `:hover`.
   * @see https://floating-ui.com/docs/useHover
   */
  function useHover(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      dataRef,
      events,
      elements
    } = context;
    const {
      enabled = true,
      delay = 0,
      handleClose = null,
      mouseOnly = false,
      restMs = 0,
      move = true
    } = props;
    const tree = useFloatingTree();
    const parentId = useFloatingParentNodeId();
    const handleCloseRef = useLatestRef$1(handleClose);
    const delayRef = useLatestRef$1(delay);
    const openRef = useLatestRef$1(open);
    const restMsRef = useLatestRef$1(restMs);
    const pointerTypeRef = React__namespace.useRef();
    const timeoutRef = React__namespace.useRef(-1);
    const handlerRef = React__namespace.useRef();
    const restTimeoutRef = React__namespace.useRef(-1);
    const blockMouseMoveRef = React__namespace.useRef(true);
    const performedPointerEventsMutationRef = React__namespace.useRef(false);
    const unbindMouseMoveRef = React__namespace.useRef(() => {});
    const restTimeoutPendingRef = React__namespace.useRef(false);
    const isHoverOpen = useEffectEvent(() => {
      var _dataRef$current$open;
      const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
      return (type == null ? void 0 : type.includes('mouse')) && type !== 'mousedown';
    });

    // When closing before opening, clear the delay timeouts to cancel it
    // from showing.
    React__namespace.useEffect(() => {
      if (!enabled) return;
      function onOpenChange(_ref) {
        let {
          open
        } = _ref;
        if (!open) {
          clearTimeoutIfSet(timeoutRef);
          clearTimeoutIfSet(restTimeoutRef);
          blockMouseMoveRef.current = true;
          restTimeoutPendingRef.current = false;
        }
      }
      events.on('openchange', onOpenChange);
      return () => {
        events.off('openchange', onOpenChange);
      };
    }, [enabled, events]);
    React__namespace.useEffect(() => {
      if (!enabled) return;
      if (!handleCloseRef.current) return;
      if (!open) return;
      function onLeave(event) {
        if (isHoverOpen()) {
          onOpenChange(false, event, 'hover');
        }
      }
      const html = getDocument(elements.floating).documentElement;
      html.addEventListener('mouseleave', onLeave);
      return () => {
        html.removeEventListener('mouseleave', onLeave);
      };
    }, [elements.floating, open, onOpenChange, enabled, handleCloseRef, isHoverOpen]);
    const closeWithDelay = React__namespace.useCallback(function (event, runElseBranch, reason) {
      if (runElseBranch === void 0) {
        runElseBranch = true;
      }
      if (reason === void 0) {
        reason = 'hover';
      }
      const closeDelay = getDelay(delayRef.current, 'close', pointerTypeRef.current);
      if (closeDelay && !handlerRef.current) {
        clearTimeoutIfSet(timeoutRef);
        timeoutRef.current = window.setTimeout(() => onOpenChange(false, event, reason), closeDelay);
      } else if (runElseBranch) {
        clearTimeoutIfSet(timeoutRef);
        onOpenChange(false, event, reason);
      }
    }, [delayRef, onOpenChange]);
    const cleanupMouseMoveHandler = useEffectEvent(() => {
      unbindMouseMoveRef.current();
      handlerRef.current = undefined;
    });
    const clearPointerEvents = useEffectEvent(() => {
      if (performedPointerEventsMutationRef.current) {
        const body = getDocument(elements.floating).body;
        body.style.pointerEvents = '';
        body.removeAttribute(safePolygonIdentifier);
        performedPointerEventsMutationRef.current = false;
      }
    });
    const isClickLikeOpenEvent = useEffectEvent(() => {
      return dataRef.current.openEvent ? ['click', 'mousedown'].includes(dataRef.current.openEvent.type) : false;
    });

    // Registering the mouse events on the reference directly to bypass React's
    // delegation system. If the cursor was on a disabled element and then entered
    // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
    React__namespace.useEffect(() => {
      if (!enabled) return;
      function onReferenceMouseEnter(event) {
        clearTimeoutIfSet(timeoutRef);
        blockMouseMoveRef.current = false;
        if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || getRestMs(restMsRef.current) > 0 && !getDelay(delayRef.current, 'open')) {
          return;
        }
        const openDelay = getDelay(delayRef.current, 'open', pointerTypeRef.current);
        if (openDelay) {
          timeoutRef.current = window.setTimeout(() => {
            if (!openRef.current) {
              onOpenChange(true, event, 'hover');
            }
          }, openDelay);
        } else if (!open) {
          onOpenChange(true, event, 'hover');
        }
      }
      function onReferenceMouseLeave(event) {
        if (isClickLikeOpenEvent()) {
          clearPointerEvents();
          return;
        }
        unbindMouseMoveRef.current();
        const doc = getDocument(elements.floating);
        clearTimeoutIfSet(restTimeoutRef);
        restTimeoutPendingRef.current = false;
        if (handleCloseRef.current && dataRef.current.floatingContext) {
          // Prevent clearing `onScrollMouseLeave` timeout.
          if (!open) {
            clearTimeoutIfSet(timeoutRef);
          }
          handlerRef.current = handleCloseRef.current({
            ...dataRef.current.floatingContext,
            tree,
            x: event.clientX,
            y: event.clientY,
            onClose() {
              clearPointerEvents();
              cleanupMouseMoveHandler();
              if (!isClickLikeOpenEvent()) {
                closeWithDelay(event, true, 'safe-polygon');
              }
            }
          });
          const handler = handlerRef.current;
          doc.addEventListener('mousemove', handler);
          unbindMouseMoveRef.current = () => {
            doc.removeEventListener('mousemove', handler);
          };
          return;
        }

        // Allow interactivity without `safePolygon` on touch devices. With a
        // pointer, a short close delay is an alternative, so it should work
        // consistently.
        const shouldClose = pointerTypeRef.current === 'touch' ? !contains(elements.floating, event.relatedTarget) : true;
        if (shouldClose) {
          closeWithDelay(event);
        }
      }

      // Ensure the floating element closes after scrolling even if the pointer
      // did not move.
      // https://github.com/floating-ui/floating-ui/discussions/1692
      function onScrollMouseLeave(event) {
        if (isClickLikeOpenEvent()) return;
        if (!dataRef.current.floatingContext) return;
        handleCloseRef.current == null || handleCloseRef.current({
          ...dataRef.current.floatingContext,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            if (!isClickLikeOpenEvent()) {
              closeWithDelay(event);
            }
          }
        })(event);
      }
      function onFloatingMouseEnter() {
        clearTimeoutIfSet(timeoutRef);
      }
      function onFloatingMouseLeave(event) {
        if (!isClickLikeOpenEvent()) {
          closeWithDelay(event, false);
        }
      }
      if (isElement(elements.domReference)) {
        const reference = elements.domReference;
        const floating = elements.floating;
        if (open) {
          reference.addEventListener('mouseleave', onScrollMouseLeave);
        }
        if (move) {
          reference.addEventListener('mousemove', onReferenceMouseEnter, {
            once: true
          });
        }
        reference.addEventListener('mouseenter', onReferenceMouseEnter);
        reference.addEventListener('mouseleave', onReferenceMouseLeave);
        if (floating) {
          floating.addEventListener('mouseleave', onScrollMouseLeave);
          floating.addEventListener('mouseenter', onFloatingMouseEnter);
          floating.addEventListener('mouseleave', onFloatingMouseLeave);
        }
        return () => {
          if (open) {
            reference.removeEventListener('mouseleave', onScrollMouseLeave);
          }
          if (move) {
            reference.removeEventListener('mousemove', onReferenceMouseEnter);
          }
          reference.removeEventListener('mouseenter', onReferenceMouseEnter);
          reference.removeEventListener('mouseleave', onReferenceMouseLeave);
          if (floating) {
            floating.removeEventListener('mouseleave', onScrollMouseLeave);
            floating.removeEventListener('mouseenter', onFloatingMouseEnter);
            floating.removeEventListener('mouseleave', onFloatingMouseLeave);
          }
        };
      }
    }, [elements, enabled, context, mouseOnly, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, openRef, tree, delayRef, handleCloseRef, dataRef, isClickLikeOpenEvent, restMsRef]);

    // Block pointer-events of every element other than the reference and floating
    // while the floating element is open and has a `handleClose` handler. Also
    // handles nested floating elements.
    // https://github.com/floating-ui/floating-ui/issues/1722
    index$1(() => {
      var _handleCloseRef$curre;
      if (!enabled) return;
      if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && (_handleCloseRef$curre = _handleCloseRef$curre.__options) != null && _handleCloseRef$curre.blockPointerEvents && isHoverOpen()) {
        performedPointerEventsMutationRef.current = true;
        const floatingEl = elements.floating;
        if (isElement(elements.domReference) && floatingEl) {
          var _tree$nodesRef$curren;
          const body = getDocument(elements.floating).body;
          body.setAttribute(safePolygonIdentifier, '');
          const ref = elements.domReference;
          const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find(node => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
          if (parentFloating) {
            parentFloating.style.pointerEvents = '';
          }
          body.style.pointerEvents = 'none';
          ref.style.pointerEvents = 'auto';
          floatingEl.style.pointerEvents = 'auto';
          return () => {
            body.style.pointerEvents = '';
            ref.style.pointerEvents = '';
            floatingEl.style.pointerEvents = '';
          };
        }
      }
    }, [enabled, open, parentId, elements, tree, handleCloseRef, isHoverOpen]);
    index$1(() => {
      if (!open) {
        pointerTypeRef.current = undefined;
        restTimeoutPendingRef.current = false;
        cleanupMouseMoveHandler();
        clearPointerEvents();
      }
    }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
    React__namespace.useEffect(() => {
      return () => {
        cleanupMouseMoveHandler();
        clearTimeoutIfSet(timeoutRef);
        clearTimeoutIfSet(restTimeoutRef);
        clearPointerEvents();
      };
    }, [enabled, elements.domReference, cleanupMouseMoveHandler, clearPointerEvents]);
    const reference = React__namespace.useMemo(() => {
      function setPointerRef(event) {
        pointerTypeRef.current = event.pointerType;
      }
      return {
        onPointerDown: setPointerRef,
        onPointerEnter: setPointerRef,
        onMouseMove(event) {
          const {
            nativeEvent
          } = event;
          function handleMouseMove() {
            if (!blockMouseMoveRef.current && !openRef.current) {
              onOpenChange(true, nativeEvent, 'hover');
            }
          }
          if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) {
            return;
          }
          if (open || getRestMs(restMsRef.current) === 0) {
            return;
          }

          // Ignore insignificant movements to account for tremors.
          if (restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
            return;
          }
          clearTimeoutIfSet(restTimeoutRef);
          if (pointerTypeRef.current === 'touch') {
            handleMouseMove();
          } else {
            restTimeoutPendingRef.current = true;
            restTimeoutRef.current = window.setTimeout(handleMouseMove, getRestMs(restMsRef.current));
          }
        }
      };
    }, [mouseOnly, onOpenChange, open, openRef, restMsRef]);
    return React__namespace.useMemo(() => enabled ? {
      reference
    } : {}, [enabled, reference]);
  }

  function isButtonTarget(event) {
    return isHTMLElement(event.target) && event.target.tagName === 'BUTTON';
  }
  function isAnchorTarget(event) {
    return isHTMLElement(event.target) && event.target.tagName === 'A';
  }
  function isSpaceIgnored(element) {
    return isTypeableElement(element);
  }
  /**
   * Opens or closes the floating element when clicking the reference element.
   * @see https://floating-ui.com/docs/useClick
   */
  function useClick(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      dataRef,
      elements: {
        domReference
      }
    } = context;
    const {
      enabled = true,
      event: eventOption = 'click',
      toggle = true,
      ignoreMouse = false,
      keyboardHandlers = true,
      stickIfOpen = true
    } = props;
    const pointerTypeRef = React__namespace.useRef();
    const didKeyDownRef = React__namespace.useRef(false);
    const reference = React__namespace.useMemo(() => ({
      onPointerDown(event) {
        pointerTypeRef.current = event.pointerType;
      },
      onMouseDown(event) {
        const pointerType = pointerTypeRef.current;

        // Ignore all buttons except for the "main" button.
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
        if (event.button !== 0) return;
        if (eventOption === 'click') return;
        if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
        if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === 'mousedown' : true)) {
          onOpenChange(false, event.nativeEvent, 'click');
        } else {
          // Prevent stealing focus from the floating element
          event.preventDefault();
          onOpenChange(true, event.nativeEvent, 'click');
        }
      },
      onClick(event) {
        const pointerType = pointerTypeRef.current;
        if (eventOption === 'mousedown' && pointerTypeRef.current) {
          pointerTypeRef.current = undefined;
          return;
        }
        if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
        if (open && toggle && (dataRef.current.openEvent && stickIfOpen ? dataRef.current.openEvent.type === 'click' : true)) {
          onOpenChange(false, event.nativeEvent, 'click');
        } else {
          onOpenChange(true, event.nativeEvent, 'click');
        }
      },
      onKeyDown(event) {
        pointerTypeRef.current = undefined;
        if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
          return;
        }
        if (event.key === ' ' && !isSpaceIgnored(domReference)) {
          // Prevent scrolling
          event.preventDefault();
          didKeyDownRef.current = true;
        }
        if (isAnchorTarget(event)) {
          return;
        }
        if (event.key === 'Enter') {
          if (open && toggle) {
            onOpenChange(false, event.nativeEvent, 'click');
          } else {
            onOpenChange(true, event.nativeEvent, 'click');
          }
        }
      },
      onKeyUp(event) {
        if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
          return;
        }
        if (event.key === ' ' && didKeyDownRef.current) {
          didKeyDownRef.current = false;
          if (open && toggle) {
            onOpenChange(false, event.nativeEvent, 'click');
          } else {
            onOpenChange(true, event.nativeEvent, 'click');
          }
        }
      }
    }), [dataRef, domReference, eventOption, ignoreMouse, keyboardHandlers, onOpenChange, open, stickIfOpen, toggle]);
    return React__namespace.useMemo(() => enabled ? {
      reference
    } : {}, [enabled, reference]);
  }

  const bubbleHandlerKeys = {
    pointerdown: 'onPointerDown',
    mousedown: 'onMouseDown',
    click: 'onClick'
  };
  const captureHandlerKeys = {
    pointerdown: 'onPointerDownCapture',
    mousedown: 'onMouseDownCapture',
    click: 'onClickCapture'
  };
  const normalizeProp = normalizable => {
    var _normalizable$escapeK, _normalizable$outside;
    return {
      escapeKey: typeof normalizable === 'boolean' ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
      outsidePress: typeof normalizable === 'boolean' ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
    };
  };
  /**
   * Closes the floating element when a dismissal is requested — by default, when
   * the user presses the `escape` key or outside of the floating element.
   * @see https://floating-ui.com/docs/useDismiss
   */
  function useDismiss(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      elements,
      dataRef
    } = context;
    const {
      enabled = true,
      escapeKey = true,
      outsidePress: unstable_outsidePress = true,
      outsidePressEvent = 'pointerdown',
      referencePress = false,
      referencePressEvent = 'pointerdown',
      ancestorScroll = false,
      bubbles,
      capture
    } = props;
    const tree = useFloatingTree();
    const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === 'function' ? unstable_outsidePress : () => false);
    const outsidePress = typeof unstable_outsidePress === 'function' ? outsidePressFn : unstable_outsidePress;
    const endedOrStartedInsideRef = React__namespace.useRef(false);
    const {
      escapeKey: escapeKeyBubbles,
      outsidePress: outsidePressBubbles
    } = normalizeProp(bubbles);
    const {
      escapeKey: escapeKeyCapture,
      outsidePress: outsidePressCapture
    } = normalizeProp(capture);
    const isComposingRef = React__namespace.useRef(false);
    const closeOnEscapeKeyDown = useEffectEvent(event => {
      var _dataRef$current$floa;
      if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
        return;
      }

      // Wait until IME is settled. Pressing `Escape` while composing should
      // close the compose menu, but not the floating element.
      if (isComposingRef.current) {
        return;
      }
      const nodeId = (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
      const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
      if (!escapeKeyBubbles) {
        event.stopPropagation();
        if (children.length > 0) {
          let shouldDismiss = true;
          children.forEach(child => {
            var _child$context;
            if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
              shouldDismiss = false;
              return;
            }
          });
          if (!shouldDismiss) {
            return;
          }
        }
      }
      onOpenChange(false, isReactEvent(event) ? event.nativeEvent : event, 'escape-key');
    });
    const closeOnEscapeKeyDownCapture = useEffectEvent(event => {
      var _getTarget2;
      const callback = () => {
        var _getTarget;
        closeOnEscapeKeyDown(event);
        (_getTarget = getTarget(event)) == null || _getTarget.removeEventListener('keydown', callback);
      };
      (_getTarget2 = getTarget(event)) == null || _getTarget2.addEventListener('keydown', callback);
    });
    const closeOnPressOutside = useEffectEvent(event => {
      var _dataRef$current$floa2;
      // Given developers can stop the propagation of the synthetic event,
      // we can only be confident with a positive value.
      const insideReactTree = dataRef.current.insideReactTree;
      dataRef.current.insideReactTree = false;

      // When click outside is lazy (`click` event), handle dragging.
      // Don't close if:
      // - The click started inside the floating element.
      // - The click ended inside the floating element.
      const endedOrStartedInside = endedOrStartedInsideRef.current;
      endedOrStartedInsideRef.current = false;
      if (outsidePressEvent === 'click' && endedOrStartedInside) {
        return;
      }
      if (insideReactTree) {
        return;
      }
      if (typeof outsidePress === 'function' && !outsidePress(event)) {
        return;
      }
      const target = getTarget(event);
      const inertSelector = "[" + createAttribute('inert') + "]";
      const markers = getDocument(elements.floating).querySelectorAll(inertSelector);
      let targetRootAncestor = isElement(target) ? target : null;
      while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
        const nextParent = getParentNode(targetRootAncestor);
        if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
          break;
        }
        targetRootAncestor = nextParent;
      }

      // Check if the click occurred on a third-party element injected after the
      // floating element rendered.
      if (markers.length && isElement(target) && !isRootElement(target) &&
      // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !contains(target, elements.floating) &&
      // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      Array.from(markers).every(marker => !contains(targetRootAncestor, marker))) {
        return;
      }

      // Check if the click occurred on the scrollbar
      if (isHTMLElement(target) && floating) {
        const lastTraversableNode = isLastTraversableNode(target);
        const style = getComputedStyle$1(target);
        const scrollRe = /auto|scroll/;
        const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
        const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
        const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
        const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
        const isRTL = style.direction === 'rtl';

        // Check click position relative to scrollbar.
        // In some browsers it is possible to change the <body> (or window)
        // scrollbar to the left side, but is very rare and is difficult to
        // check for. Plus, for modal dialogs with backdrops, it is more
        // important that the backdrop is checked but not so much the window.
        const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
        const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
        if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
          return;
        }
      }
      const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
      const targetIsInsideChildren = tree && getNodeChildren(tree.nodesRef.current, nodeId).some(node => {
        var _node$context;
        return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
      });
      if (isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference) || targetIsInsideChildren) {
        return;
      }
      const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach(child => {
          var _child$context2;
          if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
      onOpenChange(false, event, 'outside-press');
    });
    const closeOnPressOutsideCapture = useEffectEvent(event => {
      var _getTarget4;
      const callback = () => {
        var _getTarget3;
        closeOnPressOutside(event);
        (_getTarget3 = getTarget(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
      };
      (_getTarget4 = getTarget(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
    });
    React__namespace.useEffect(() => {
      if (!open || !enabled) {
        return;
      }
      dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
      dataRef.current.__outsidePressBubbles = outsidePressBubbles;
      let compositionTimeout = -1;
      function onScroll(event) {
        onOpenChange(false, event, 'ancestor-scroll');
      }
      function handleCompositionStart() {
        window.clearTimeout(compositionTimeout);
        isComposingRef.current = true;
      }
      function handleCompositionEnd() {
        // Safari fires `compositionend` before `keydown`, so we need to wait
        // until the next tick to set `isComposing` to `false`.
        // https://bugs.webkit.org/show_bug.cgi?id=165004
        compositionTimeout = window.setTimeout(() => {
          isComposingRef.current = false;
        },
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        isWebKit() ? 5 : 0);
      }
      const doc = getDocument(elements.floating);
      if (escapeKey) {
        doc.addEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
        doc.addEventListener('compositionstart', handleCompositionStart);
        doc.addEventListener('compositionend', handleCompositionEnd);
      }
      outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      let ancestors = [];
      if (ancestorScroll) {
        if (isElement(elements.domReference)) {
          ancestors = getOverflowAncestors(elements.domReference);
        }
        if (isElement(elements.floating)) {
          ancestors = ancestors.concat(getOverflowAncestors(elements.floating));
        }
        if (!isElement(elements.reference) && elements.reference && elements.reference.contextElement) {
          ancestors = ancestors.concat(getOverflowAncestors(elements.reference.contextElement));
        }
      }

      // Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
      ancestors = ancestors.filter(ancestor => {
        var _doc$defaultView;
        return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
      });
      ancestors.forEach(ancestor => {
        ancestor.addEventListener('scroll', onScroll, {
          passive: true
        });
      });
      return () => {
        if (escapeKey) {
          doc.removeEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
          doc.removeEventListener('compositionstart', handleCompositionStart);
          doc.removeEventListener('compositionend', handleCompositionEnd);
        }
        outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
        ancestors.forEach(ancestor => {
          ancestor.removeEventListener('scroll', onScroll);
        });
        window.clearTimeout(compositionTimeout);
      };
    }, [dataRef, elements, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture]);
    React__namespace.useEffect(() => {
      dataRef.current.insideReactTree = false;
    }, [dataRef, outsidePress, outsidePressEvent]);
    const reference = React__namespace.useMemo(() => ({
      onKeyDown: closeOnEscapeKeyDown,
      ...(referencePress && {
        [bubbleHandlerKeys[referencePressEvent]]: event => {
          onOpenChange(false, event.nativeEvent, 'reference-press');
        },
        ...(referencePressEvent !== 'click' && {
          onClick(event) {
            onOpenChange(false, event.nativeEvent, 'reference-press');
          }
        })
      })
    }), [closeOnEscapeKeyDown, onOpenChange, referencePress, referencePressEvent]);
    const floating = React__namespace.useMemo(() => ({
      onKeyDown: closeOnEscapeKeyDown,
      onMouseDown() {
        endedOrStartedInsideRef.current = true;
      },
      onMouseUp() {
        endedOrStartedInsideRef.current = true;
      },
      [captureHandlerKeys[outsidePressEvent]]: () => {
        dataRef.current.insideReactTree = true;
      }
    }), [closeOnEscapeKeyDown, outsidePressEvent, dataRef]);
    return React__namespace.useMemo(() => enabled ? {
      reference,
      floating
    } : {}, [enabled, reference, floating]);
  }

  function useFloatingRootContext(options) {
    const {
      open = false,
      onOpenChange: onOpenChangeProp,
      elements: elementsProp
    } = options;
    const floatingId = useId();
    const dataRef = React__namespace.useRef({});
    const [events] = React__namespace.useState(() => createEventEmitter());
    const nested = useFloatingParentNodeId() != null;
    const [positionReference, setPositionReference] = React__namespace.useState(elementsProp.reference);
    const onOpenChange = useEffectEvent((open, event, reason) => {
      dataRef.current.openEvent = open ? event : undefined;
      events.emit('openchange', {
        open,
        event,
        reason,
        nested
      });
      onOpenChangeProp == null || onOpenChangeProp(open, event, reason);
    });
    const refs = React__namespace.useMemo(() => ({
      setPositionReference
    }), []);
    const elements = React__namespace.useMemo(() => ({
      reference: positionReference || elementsProp.reference || null,
      floating: elementsProp.floating || null,
      domReference: elementsProp.reference
    }), [positionReference, elementsProp.reference, elementsProp.floating]);
    return React__namespace.useMemo(() => ({
      dataRef,
      open,
      onOpenChange,
      elements,
      events,
      floatingId,
      refs
    }), [open, onOpenChange, elements, events, floatingId, refs]);
  }

  /**
   * Provides data to position a floating element and context to add interactions.
   * @see https://floating-ui.com/docs/useFloating
   */
  function useFloating(options) {
    if (options === void 0) {
      options = {};
    }
    const {
      nodeId
    } = options;
    const internalRootContext = useFloatingRootContext({
      ...options,
      elements: {
        reference: null,
        floating: null,
        ...options.elements
      }
    });
    const rootContext = options.rootContext || internalRootContext;
    const computedElements = rootContext.elements;
    const [_domReference, setDomReference] = React__namespace.useState(null);
    const [positionReference, _setPositionReference] = React__namespace.useState(null);
    const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
    const domReference = optionDomReference || _domReference;
    const domReferenceRef = React__namespace.useRef(null);
    const tree = useFloatingTree();
    index$1(() => {
      if (domReference) {
        domReferenceRef.current = domReference;
      }
    }, [domReference]);
    const position = useFloating$1({
      ...options,
      elements: {
        ...computedElements,
        ...(positionReference && {
          reference: positionReference
        })
      }
    });
    const setPositionReference = React__namespace.useCallback(node => {
      const computedPositionReference = isElement(node) ? {
        getBoundingClientRect: () => node.getBoundingClientRect(),
        getClientRects: () => node.getClientRects(),
        contextElement: node
      } : node;
      // Store the positionReference in state if the DOM reference is specified externally via the
      // `elements.reference` option. This ensures that it won't be overridden on future renders.
      _setPositionReference(computedPositionReference);
      position.refs.setReference(computedPositionReference);
    }, [position.refs]);
    const setReference = React__namespace.useCallback(node => {
      if (isElement(node) || node === null) {
        domReferenceRef.current = node;
        setDomReference(node);
      }

      // Backwards-compatibility for passing a virtual element to `reference`
      // after it has set the DOM reference.
      if (isElement(position.refs.reference.current) || position.refs.reference.current === null ||
      // Don't allow setting virtual elements using the old technique back to
      // `null` to support `positionReference` + an unstable `reference`
      // callback ref.
      node !== null && !isElement(node)) {
        position.refs.setReference(node);
      }
    }, [position.refs]);
    const refs = React__namespace.useMemo(() => ({
      ...position.refs,
      setReference,
      setPositionReference,
      domReference: domReferenceRef
    }), [position.refs, setReference, setPositionReference]);
    const elements = React__namespace.useMemo(() => ({
      ...position.elements,
      domReference: domReference
    }), [position.elements, domReference]);
    const context = React__namespace.useMemo(() => ({
      ...position,
      ...rootContext,
      refs,
      elements,
      nodeId
    }), [position, refs, elements, nodeId, rootContext]);
    index$1(() => {
      rootContext.dataRef.current.floatingContext = context;
      const node = tree == null ? void 0 : tree.nodesRef.current.find(node => node.id === nodeId);
      if (node) {
        node.context = context;
      }
    });
    return React__namespace.useMemo(() => ({
      ...position,
      context,
      refs,
      elements
    }), [position, refs, elements, context]);
  }

  function isMacSafari() {
    return isMac() && isSafari();
  }
  /**
   * Opens the floating element while the reference element has focus, like CSS
   * `:focus`.
   * @see https://floating-ui.com/docs/useFocus
   */
  function useFocus(context, props) {
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      onOpenChange,
      events,
      dataRef,
      elements
    } = context;
    const {
      enabled = true,
      visibleOnly = true
    } = props;
    const blockFocusRef = React__namespace.useRef(false);
    const timeoutRef = React__namespace.useRef(-1);
    const keyboardModalityRef = React__namespace.useRef(true);
    React__namespace.useEffect(() => {
      if (!enabled) return;
      const win = getWindow(elements.domReference);

      // If the reference was focused and the user left the tab/window, and the
      // floating element was not open, the focus should be blocked when they
      // return to the tab/window.
      function onBlur() {
        if (!open && isHTMLElement(elements.domReference) && elements.domReference === activeElement(getDocument(elements.domReference))) {
          blockFocusRef.current = true;
        }
      }
      function onKeyDown() {
        keyboardModalityRef.current = true;
      }
      function onPointerDown() {
        keyboardModalityRef.current = false;
      }
      win.addEventListener('blur', onBlur);
      if (isMacSafari()) {
        win.addEventListener('keydown', onKeyDown, true);
        win.addEventListener('pointerdown', onPointerDown, true);
      }
      return () => {
        win.removeEventListener('blur', onBlur);
        if (isMacSafari()) {
          win.removeEventListener('keydown', onKeyDown, true);
          win.removeEventListener('pointerdown', onPointerDown, true);
        }
      };
    }, [elements.domReference, open, enabled]);
    React__namespace.useEffect(() => {
      if (!enabled) return;
      function onOpenChange(_ref) {
        let {
          reason
        } = _ref;
        if (reason === 'reference-press' || reason === 'escape-key') {
          blockFocusRef.current = true;
        }
      }
      events.on('openchange', onOpenChange);
      return () => {
        events.off('openchange', onOpenChange);
      };
    }, [events, enabled]);
    React__namespace.useEffect(() => {
      return () => {
        clearTimeoutIfSet(timeoutRef);
      };
    }, []);
    const reference = React__namespace.useMemo(() => ({
      onMouseLeave() {
        blockFocusRef.current = false;
      },
      onFocus(event) {
        if (blockFocusRef.current) return;
        const target = getTarget(event.nativeEvent);
        if (visibleOnly && isElement(target)) {
          // Safari fails to match `:focus-visible` if focus was initially
          // outside the document.
          if (isMacSafari() && !event.relatedTarget) {
            if (!keyboardModalityRef.current && !isTypeableElement(target)) {
              return;
            }
          } else if (!matchesFocusVisible(target)) {
            return;
          }
        }
        onOpenChange(true, event.nativeEvent, 'focus');
      },
      onBlur(event) {
        blockFocusRef.current = false;
        const relatedTarget = event.relatedTarget;
        const nativeEvent = event.nativeEvent;

        // Hit the non-modal focus management portal guard. Focus will be
        // moved into the floating element immediately after.
        const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute('focus-guard')) && relatedTarget.getAttribute('data-type') === 'outside';

        // Wait for the window blur listener to fire.
        timeoutRef.current = window.setTimeout(() => {
          var _dataRef$current$floa;
          const activeEl = activeElement(elements.domReference ? elements.domReference.ownerDocument : document);

          // Focus left the page, keep it open.
          if (!relatedTarget && activeEl === elements.domReference) return;

          // When focusing the reference element (e.g. regular click), then
          // clicking into the floating element, prevent it from hiding.
          // Note: it must be focusable, e.g. `tabindex="-1"`.
          // We can not rely on relatedTarget to point to the correct element
          // as it will only point to the shadow host of the newly focused element
          // and not the element that actually has received focus if it is located
          // inside a shadow root.
          if (contains((_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.refs.floating.current, activeEl) || contains(elements.domReference, activeEl) || movedToFocusGuard) {
            return;
          }
          onOpenChange(false, nativeEvent, 'focus');
        });
      }
    }), [dataRef, elements.domReference, onOpenChange, visibleOnly]);
    return React__namespace.useMemo(() => enabled ? {
      reference
    } : {}, [enabled, reference]);
  }

  function mergeProps(userProps, propsList, elementKey) {
    const map = new Map();
    const isItem = elementKey === 'item';
    let domUserProps = userProps;
    if (isItem && userProps) {
      const {
        [ACTIVE_KEY]: _,
        [SELECTED_KEY]: __,
        ...validProps
      } = userProps;
      domUserProps = validProps;
    }
    return {
      ...(elementKey === 'floating' && {
        tabIndex: -1,
        [FOCUSABLE_ATTRIBUTE]: ''
      }),
      ...domUserProps,
      ...propsList.map(value => {
        const propsOrGetProps = value ? value[elementKey] : null;
        if (typeof propsOrGetProps === 'function') {
          return userProps ? propsOrGetProps(userProps) : null;
        }
        return propsOrGetProps;
      }).concat(userProps).reduce((acc, props) => {
        if (!props) {
          return acc;
        }
        Object.entries(props).forEach(_ref => {
          let [key, value] = _ref;
          if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
            return;
          }
          if (key.indexOf('on') === 0) {
            if (!map.has(key)) {
              map.set(key, []);
            }
            if (typeof value === 'function') {
              var _map$get;
              (_map$get = map.get(key)) == null || _map$get.push(value);
              acc[key] = function () {
                var _map$get2;
                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }
                return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map(fn => fn(...args)).find(val => val !== undefined);
              };
            }
          } else {
            acc[key] = value;
          }
        });
        return acc;
      }, {})
    };
  }
  /**
   * Merges an array of interaction hooks' props into prop getters, allowing
   * event handler functions to be composed together without overwriting one
   * another.
   * @see https://floating-ui.com/docs/useInteractions
   */
  function useInteractions(propsList) {
    if (propsList === void 0) {
      propsList = [];
    }
    const referenceDeps = propsList.map(key => key == null ? void 0 : key.reference);
    const floatingDeps = propsList.map(key => key == null ? void 0 : key.floating);
    const itemDeps = propsList.map(key => key == null ? void 0 : key.item);
    const getReferenceProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'reference'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps);
    const getFloatingProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'floating'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps);
    const getItemProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'item'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps);
    return React__namespace.useMemo(() => ({
      getReferenceProps,
      getFloatingProps,
      getItemProps
    }), [getReferenceProps, getFloatingProps, getItemProps]);
  }

  const componentRoleToAriaRoleMap = /*#__PURE__*/new Map([['select', 'listbox'], ['combobox', 'listbox'], ['label', false]]);

  /**
   * Adds base screen reader props to the reference and floating elements for a
   * given floating element `role`.
   * @see https://floating-ui.com/docs/useRole
   */
  function useRole(context, props) {
    var _elements$domReferenc, _componentRoleToAriaR;
    if (props === void 0) {
      props = {};
    }
    const {
      open,
      elements,
      floatingId: defaultFloatingId
    } = context;
    const {
      enabled = true,
      role = 'dialog'
    } = props;
    const defaultReferenceId = useId();
    const referenceId = ((_elements$domReferenc = elements.domReference) == null ? void 0 : _elements$domReferenc.id) || defaultReferenceId;
    const floatingId = React__namespace.useMemo(() => {
      var _getFloatingFocusElem;
      return ((_getFloatingFocusElem = getFloatingFocusElement(elements.floating)) == null ? void 0 : _getFloatingFocusElem.id) || defaultFloatingId;
    }, [elements.floating, defaultFloatingId]);
    const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
    const parentId = useFloatingParentNodeId();
    const isNested = parentId != null;
    const reference = React__namespace.useMemo(() => {
      if (ariaRole === 'tooltip' || role === 'label') {
        return {
          ["aria-" + (role === 'label' ? 'labelledby' : 'describedby')]: open ? floatingId : undefined
        };
      }
      return {
        'aria-expanded': open ? 'true' : 'false',
        'aria-haspopup': ariaRole === 'alertdialog' ? 'dialog' : ariaRole,
        'aria-controls': open ? floatingId : undefined,
        ...(ariaRole === 'listbox' && {
          role: 'combobox'
        }),
        ...(ariaRole === 'menu' && {
          id: referenceId
        }),
        ...(ariaRole === 'menu' && isNested && {
          role: 'menuitem'
        }),
        ...(role === 'select' && {
          'aria-autocomplete': 'none'
        }),
        ...(role === 'combobox' && {
          'aria-autocomplete': 'list'
        })
      };
    }, [ariaRole, floatingId, isNested, open, referenceId, role]);
    const floating = React__namespace.useMemo(() => {
      const floatingProps = {
        id: floatingId,
        ...(ariaRole && {
          role: ariaRole
        })
      };
      if (ariaRole === 'tooltip' || role === 'label') {
        return floatingProps;
      }
      return {
        ...floatingProps,
        ...(ariaRole === 'menu' && {
          'aria-labelledby': referenceId
        })
      };
    }, [ariaRole, floatingId, referenceId, role]);
    const item = React__namespace.useCallback(_ref => {
      let {
        active,
        selected
      } = _ref;
      const commonProps = {
        role: 'option',
        ...(active && {
          id: floatingId + "-fui-option"
        })
      };

      // For `menu`, we are unable to tell if the item is a `menuitemradio`
      // or `menuitemcheckbox`. For backwards-compatibility reasons, also
      // avoid defaulting to `menuitem` as it may overwrite custom role props.
      switch (role) {
        case 'select':
        case 'combobox':
          return {
            ...commonProps,
            'aria-selected': selected
          };
      }
      return {};
    }, [floatingId, role]);
    return React__namespace.useMemo(() => enabled ? {
      reference,
      floating,
      item
    } : {}, [enabled, reference, floating, item]);
  }

  const FloatingTooltip = _ref => {
    let {
      children,
      content
    } = _ref;
    const [isOpen, setIsOpen] = React.useState(false);
    const {
      refs,
      floatingStyles,
      context
    } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      middleware: [offset(10), flip(), shift({
        padding: 5
      })],
      whileElementsMounted: autoUpdate,
      placement: 'top'
    });
    const hover = useHover(context);
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, {
      role: 'tooltip'
    });
    const {
      getReferenceProps,
      getFloatingProps
    } = useInteractions([hover, focus, dismiss, role]);
    // Apply styles directly to the DOM element to avoid inline styles
    React.useEffect(() => {
      if (isOpen && refs.floating.current) {
        var _floatingStyles$top, _floatingStyles$left;
        const element = refs.floating.current;
        element.style.position = floatingStyles.position;
        element.style.top = "".concat((_floatingStyles$top = floatingStyles.top) !== null && _floatingStyles$top !== void 0 ? _floatingStyles$top : 0, "px");
        element.style.left = "".concat((_floatingStyles$left = floatingStyles.left) !== null && _floatingStyles$left !== void 0 ? _floatingStyles$left : 0, "px");
        element.style.transform = floatingStyles.transform;
      }
    }, [isOpen, floatingStyles, refs.floating]);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", _objectSpread2({
      ref: refs.setReference,
      className: "rare-earth-floating-tooltip-wrapper"
    }, getReferenceProps()), children), isOpen && (/*#__PURE__*/React.createElement("div", _objectSpread2({
      ref: refs.setFloating,
      className: "rare-earth-floating-tooltip"
    }, getFloatingProps()), content)));
  };

  const Pagination = /*#__PURE__*/React.memo(_ref => {
    let {
      tableId,
      value,
      onChange,
      total
    } = _ref;
    const renderPageNumbers = () => {
      const pages = [];
      // If only 1 page, just show it
      if (total === 1) {
        pages.push(/*#__PURE__*/React.createElement("button", {
          key: 1,
          className: "rare-earth-page-button active",
          onClick: () => onChange(1),
          "aria-label": "Go to page 1",
          "aria-setsize": total,
          "aria-posinset": 1,
          type: "button",
          "data-testid": "pagination-page-1-".concat(tableId)
        }, "1"));
        return pages;
      }
      // For 7 or fewer pages, show all of them
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(/*#__PURE__*/React.createElement("button", {
            key: i,
            className: "rare-earth-page-button ".concat(i === value ? 'active' : ''),
            onClick: () => onChange(i),
            "aria-label": "Go to page ".concat(i),
            "aria-current": i === value ? 'page' : undefined,
            "aria-setsize": total,
            "aria-posinset": i,
            type: "button",
            "data-testid": "pagination-page-".concat(i, "-").concat(tableId)
          }, i));
        }
        return pages;
      }
      // For more than 7 pages, we always show exactly 7 slots
      // Pattern: [1] [2 or ...] [x] [current] [y] [... or n-1] [n]
      // Always slot 1: first page
      pages.push(/*#__PURE__*/React.createElement("button", {
        key: 1,
        className: "rare-earth-page-button ".concat(1 === value ? 'active' : ''),
        onClick: () => onChange(1),
        "aria-label": "Go to page 1",
        "aria-setsize": total,
        "aria-posinset": 1,
        type: "button",
        "data-testid": "pagination-page-1-".concat(tableId)
      }, "1"));
      // Determine what goes in slots 2-6
      if (value <= 4) {
        // Near start: [1] [2] [3] [4] [5] [...] [n]
        for (let i = 2; i <= 5; i++) {
          pages.push(/*#__PURE__*/React.createElement("button", {
            key: i,
            className: "rare-earth-page-button ".concat(i === value ? 'active' : ''),
            onClick: () => onChange(i),
            "aria-label": "Go to page ".concat(i),
            "aria-current": i === value ? 'page' : undefined,
            "aria-setsize": total,
            "aria-posinset": i,
            type: "button",
            "data-testid": "pagination-page-".concat(i, "-").concat(tableId)
          }, i));
        }
        pages.push(/*#__PURE__*/React.createElement("span", {
          key: "dots2",
          className: "rare-earth-pagination-dots"
        }, "..."));
      } else if (value >= total - 3) {
        // Near end: [1] [...] [n-4] [n-3] [n-2] [n-1] [n]
        pages.push(/*#__PURE__*/React.createElement("span", {
          key: "dots1",
          className: "rare-earth-pagination-dots"
        }, "..."));
        for (let i = total - 4; i <= total - 1; i++) {
          pages.push(/*#__PURE__*/React.createElement("button", {
            key: i,
            className: "rare-earth-page-button ".concat(i === value ? 'active' : ''),
            onClick: () => onChange(i),
            "aria-label": "Go to page ".concat(i),
            "aria-current": i === value ? 'page' : undefined,
            "aria-setsize": total,
            "aria-posinset": i,
            type: "button",
            "data-testid": "pagination-page-".concat(i, "-").concat(tableId)
          }, i));
        }
      } else {
        // In middle: [1] [...] [current-1] [current] [current+1] [...] [n]
        pages.push(/*#__PURE__*/React.createElement("span", {
          key: "dots1",
          className: "rare-earth-pagination-dots"
        }, "..."));
        for (let i = value - 1; i <= value + 1; i++) {
          pages.push(/*#__PURE__*/React.createElement("button", {
            key: i,
            className: "rare-earth-page-button ".concat(i === value ? 'active' : ''),
            onClick: () => onChange(i),
            "aria-label": "Go to page ".concat(i),
            "aria-current": i === value ? 'page' : undefined,
            "aria-setsize": total,
            "aria-posinset": i,
            type: "button",
            "data-testid": "pagination-page-".concat(i, "-").concat(tableId)
          }, i));
        }
        pages.push(/*#__PURE__*/React.createElement("span", {
          key: "dots2",
          className: "rare-earth-pagination-dots"
        }, "..."));
      }
      // Always slot 7: last page
      pages.push(/*#__PURE__*/React.createElement("button", {
        key: total,
        className: "rare-earth-page-button ".concat(total === value ? 'active' : ''),
        onClick: () => onChange(total),
        "aria-label": "Go to page ".concat(total),
        "aria-setsize": total,
        "aria-posinset": total,
        type: "button",
        "data-testid": "pagination-page-".concat(total, "-").concat(tableId)
      }, total));
      return pages;
    };
    return /*#__PURE__*/React.createElement("nav", {
      className: "rare-earth-pagination",
      role: "navigation",
      "aria-label": "Table pagination"
    }, /*#__PURE__*/React.createElement("button", {
      className: "rare-earth-page-button",
      disabled: value === 1,
      onClick: () => onChange(Math.max(1, value - 1)),
      "aria-label": "Go to previous page",
      type: "button",
      "data-testid": "pagination-previous-".concat(tableId),
      "data-action": "previous",
      title: "Go to previous page"
    }, "\u2039"), renderPageNumbers(), /*#__PURE__*/React.createElement("button", {
      className: "rare-earth-page-button",
      disabled: value === total,
      onClick: () => onChange(Math.min(total, value + 1)),
      "aria-label": "Go to next page",
      type: "button",
      "data-testid": "pagination-next-".concat(tableId),
      "data-action": "next",
      title: "Go to next page"
    }, "\u203A"));
  });

  const DEBOUNCE_INPUT_TIME_MS = 500;

  const TableControl = _ref => {
    let {
      tableId,
      columns,
      exportTable,
      numRecords,
      numFilteredRecords,
      sortFields,
      setSortFields,
      search,
      setSearch,
      page,
      setPage,
      pageLength,
      setPageLength,
      pageLengthChoices,
      pageCount,
      debounceTime,
      resetColumns,
      initiaDefaultSearch
    } = _ref;
    const [searchInput, setSearchInput] = React.useState(search.global);
    React.useEffect(() => {
      const debounceFunc = debounce(debounceTime !== null && debounceTime !== void 0 ? debounceTime : DEBOUNCE_INPUT_TIME_MS, () => {
        setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
          global: searchInput
        }));
      }, {
        atBegin: false
      });
      debounceFunc();
      return () => {
        debounceFunc.cancel();
      };
    }, [searchInput]);
    function _setPageLength(newPageLength) {
      let firstEntryPage;
      if (newPageLength === Infinity) {
        firstEntryPage = 1;
      } else {
        let firstEntry = (page - 1) * pageLength + 1;
        firstEntryPage = Math.ceil(firstEntry / newPageLength);
      }
      setPage(firstEntryPage);
      setPageLength(newPageLength);
    }
    let pageLengthOptions = [];
    let addedOneAbove = false;
    for (let i = 0; i < pageLengthChoices.length; i++) {
      let pageLen = pageLengthChoices[i];
      // Add all options up to the filtered count, plus one option above it
      if (pageLen <= numFilteredRecords || !addedOneAbove) {
        pageLengthOptions.push({
          value: pageLen.toString(),
          label: pageLen.toString()
        });
        if (pageLen > numFilteredRecords) {
          addedOneAbove = true;
        }
      }
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-control",
      role: "group",
      "aria-label": "Table controls"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-control-row"
    }, /*#__PURE__*/React.createElement(FloatingTooltip, {
      content: "Export Filtered Data as CSV"
    }, /*#__PURE__*/React.createElement("button", {
      className: "rare-earth-button",
      onClick: () => exportTable(),
      "aria-label": "Export filtered data as CSV",
      type: "button"
    }, /*#__PURE__*/React.createElement(TbTableExport, {
      size: "1.25rem"
    }), "Export")), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-stack"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rare-earth-text"
    }, numFilteredRecords, " filtered"), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-divider"
    }), /*#__PURE__*/React.createElement("span", {
      className: "rare-earth-text"
    }, numRecords, " total")), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-search-container"
    }, /*#__PURE__*/React.createElement(FaSearch, {
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("input", {
      className: "rare-earth-input",
      placeholder: "Table Search",
      "aria-label": "Search table",
      value: searchInput !== null && searchInput !== void 0 ? searchInput : '',
      onChange: event => {
        var _event$target$value;
        return setSearchInput(((_event$target$value = event.target.value) === null || _event$target$value === void 0 ? void 0 : _event$target$value.trim()) == '' ? null : event.target.value);
      },
      type: "search",
      name: "table-search",
      autoComplete: "off",
      "data-testid": "global-search-input-".concat(tableId)
    }), /*#__PURE__*/React.createElement(FloatingTooltip, {
      content: "Reset Table"
    }, /*#__PURE__*/React.createElement("button", {
      className: "rare-earth-avatar danger",
      onClick: () => {
        setPage(1);
        setSearchInput(null);
        setSortFields([]);
        setSearch(initiaDefaultSearch(columns));
        resetColumns();
      },
      "aria-label": "Reset table to initial state",
      type: "button"
    }, /*#__PURE__*/React.createElement(TbZoomReset, null))))), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-control-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-label"
    }, /*#__PURE__*/React.createElement("label", {
      id: "page-length-label-".concat(tableId),
      htmlFor: "page-length-select-".concat(tableId)
    }, "Page Length"), /*#__PURE__*/React.createElement("select", {
      id: "page-length-select-".concat(tableId),
      className: "rare-earth-select",
      value: pageLength.toString(),
      onChange: e => _setPageLength(parseFloat(e.target.value)),
      "aria-labelledby": "page-length-label-".concat(tableId),
      "data-testid": "page-length-select-".concat(tableId)
    }, pageLengthOptions.map(opt => (/*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label))))), /*#__PURE__*/React.createElement(Pagination, {
      tableId: tableId,
      value: page,
      onChange: setPage,
      total: pageCount
    })));
  };

  const TableHeader = function (props) {
    var _props$search, _props$search$fields$, _props$search2, _props$search$fields$2, _props$search3, _props$search4, _props$search5, _props$search6, _props$search7, _props$search8, _props$search9, _props$search17, _props$column$label, _props$column$label2, _props$column$label3, _props$column$label4, _props$column$label5, _props$column$label6, _props$search23, _props$search24, _props$search25;
    const {
      tableId,
      ref
    } = props;
    const [searchInput, setSearchInput] = React.useState({
      string: (_props$search = props.search) === null || _props$search === void 0 || (_props$search = _props$search.fields) === null || _props$search === void 0 || (_props$search = _props$search[props.column_key]) === null || _props$search === void 0 || (_props$search = _props$search.string) === null || _props$search === void 0 ? void 0 : _props$search.text,
      number: {
        gt: (_props$search$fields$ = (_props$search2 = props.search) === null || _props$search2 === void 0 || (_props$search2 = _props$search2.fields) === null || _props$search2 === void 0 || (_props$search2 = _props$search2[props.column_key]) === null || _props$search2 === void 0 || (_props$search2 = _props$search2.number) === null || _props$search2 === void 0 || (_props$search2 = _props$search2.gt) === null || _props$search2 === void 0 ? void 0 : _props$search2.value) !== null && _props$search$fields$ !== void 0 ? _props$search$fields$ : null,
        lt: (_props$search$fields$2 = (_props$search3 = props.search) === null || _props$search3 === void 0 || (_props$search3 = _props$search3.fields) === null || _props$search3 === void 0 || (_props$search3 = _props$search3[props.column_key]) === null || _props$search3 === void 0 || (_props$search3 = _props$search3.number) === null || _props$search3 === void 0 || (_props$search3 = _props$search3.lt) === null || _props$search3 === void 0 ? void 0 : _props$search3.value) !== null && _props$search$fields$2 !== void 0 ? _props$search$fields$2 : null,
        gtRaw: ((_props$search4 = props.search) === null || _props$search4 === void 0 || (_props$search4 = _props$search4.fields) === null || _props$search4 === void 0 || (_props$search4 = _props$search4[props.column_key]) === null || _props$search4 === void 0 || (_props$search4 = _props$search4.number) === null || _props$search4 === void 0 || (_props$search4 = _props$search4.gt) === null || _props$search4 === void 0 ? void 0 : _props$search4.value) !== null && ((_props$search5 = props.search) === null || _props$search5 === void 0 || (_props$search5 = _props$search5.fields) === null || _props$search5 === void 0 || (_props$search5 = _props$search5[props.column_key]) === null || _props$search5 === void 0 || (_props$search5 = _props$search5.number) === null || _props$search5 === void 0 || (_props$search5 = _props$search5.gt) === null || _props$search5 === void 0 ? void 0 : _props$search5.value) !== undefined ? (_props$search6 = props.search) === null || _props$search6 === void 0 || (_props$search6 = _props$search6.fields) === null || _props$search6 === void 0 || (_props$search6 = _props$search6[props.column_key]) === null || _props$search6 === void 0 || (_props$search6 = _props$search6.number) === null || _props$search6 === void 0 || (_props$search6 = _props$search6.gt) === null || _props$search6 === void 0 ? void 0 : _props$search6.value.toString() : '',
        ltRaw: ((_props$search7 = props.search) === null || _props$search7 === void 0 || (_props$search7 = _props$search7.fields) === null || _props$search7 === void 0 || (_props$search7 = _props$search7[props.column_key]) === null || _props$search7 === void 0 || (_props$search7 = _props$search7.number) === null || _props$search7 === void 0 || (_props$search7 = _props$search7.lt) === null || _props$search7 === void 0 ? void 0 : _props$search7.value) !== null && ((_props$search8 = props.search) === null || _props$search8 === void 0 || (_props$search8 = _props$search8.fields) === null || _props$search8 === void 0 || (_props$search8 = _props$search8[props.column_key]) === null || _props$search8 === void 0 || (_props$search8 = _props$search8.number) === null || _props$search8 === void 0 || (_props$search8 = _props$search8.lt) === null || _props$search8 === void 0 ? void 0 : _props$search8.value) !== undefined ? (_props$search9 = props.search) === null || _props$search9 === void 0 || (_props$search9 = _props$search9.fields) === null || _props$search9 === void 0 || (_props$search9 = _props$search9[props.column_key]) === null || _props$search9 === void 0 || (_props$search9 = _props$search9.number) === null || _props$search9 === void 0 || (_props$search9 = _props$search9.lt) === null || _props$search9 === void 0 ? void 0 : _props$search9.value.toString() : ''
      }
    });
    const [searchOptionsOpen, setSearchOptionsOpen] = React.useState(false);
    // Memoized event handlers for inputs
    const handleStringFilterChange = React.useCallback(value => {
      setSearchInput(prev => _objectSpread2(_objectSpread2({}, prev), {}, {
        string: (value === null || value === void 0 ? void 0 : value.trim()) === '' ? null : value
      }));
    }, []);
    const handleNumberGtChange = React.useCallback(value => {
      setSearchInput(prev => _objectSpread2(_objectSpread2({}, prev), {}, {
        number: _objectSpread2(_objectSpread2({}, prev.number), {}, {
          gtRaw: value
        })
      }));
    }, []);
    const handleNumberLtChange = React.useCallback(value => {
      setSearchInput(prev => _objectSpread2(_objectSpread2({}, prev), {}, {
        number: _objectSpread2(_objectSpread2({}, prev.number), {}, {
          ltRaw: value
        })
      }));
    }, []);
    // Validate raw numeric inputs and update actual values
    React.useEffect(() => {
      setSearchInput(_searchInput => {
        const newNumber = _objectSpread2({}, _searchInput.number);
        // Validate gt (greater than) value
        if (_searchInput.number.gtRaw === '') {
          newNumber.gt = null;
        } else {
          const isValidPattern = /^-?\d*\.?\d*$/.test(_searchInput.number.gtRaw);
          if (isValidPattern) {
            const isIntermediateState = _searchInput.number.gtRaw === '-' || _searchInput.number.gtRaw === '.' || _searchInput.number.gtRaw === '-.' || _searchInput.number.gtRaw.endsWith('.');
            if (!isIntermediateState) {
              const numValue = parseFloat(_searchInput.number.gtRaw);
              newNumber.gt = isNaN(numValue) ? null : numValue;
            } else {
              newNumber.gt = null;
            }
          } else {
            newNumber.gt = null;
          }
        }
        // Validate lt (less than) value
        if (_searchInput.number.ltRaw === '') {
          newNumber.lt = null;
        } else {
          const isValidPattern = /^-?\d*\.?\d*$/.test(_searchInput.number.ltRaw);
          if (isValidPattern) {
            const isIntermediateState = _searchInput.number.ltRaw === '-' || _searchInput.number.ltRaw === '.' || _searchInput.number.ltRaw === '-.' || _searchInput.number.ltRaw.endsWith('.');
            if (!isIntermediateState) {
              const numValue = parseFloat(_searchInput.number.ltRaw);
              newNumber.lt = isNaN(numValue) ? null : numValue;
            } else {
              newNumber.lt = null;
            }
          } else {
            newNumber.lt = null;
          }
        }
        return _objectSpread2(_objectSpread2({}, _searchInput), {}, {
          number: newNumber
        });
      });
    }, [searchInput.number.gtRaw, searchInput.number.ltRaw]);
    const {
      refs,
      floatingStyles,
      context
    } = useFloating({
      open: searchOptionsOpen,
      onOpenChange: setSearchOptionsOpen,
      middleware: [offset(5), flip({
        fallbackPlacements: ['top-start', 'bottom-end', 'top-end']
      }), shift({
        padding: 10
      })],
      whileElementsMounted: autoUpdate,
      placement: 'bottom-start',
      strategy: 'fixed'
    });
    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);
    const {
      getReferenceProps,
      getFloatingProps
    } = useInteractions([click, dismiss, role]);
    // Apply styles directly to the DOM element to avoid inline styles
    React.useEffect(() => {
      if (searchOptionsOpen && refs.floating.current) {
        var _floatingStyles$top, _floatingStyles$left;
        const element = refs.floating.current;
        element.style.position = floatingStyles.position;
        element.style.top = "".concat((_floatingStyles$top = floatingStyles.top) !== null && _floatingStyles$top !== void 0 ? _floatingStyles$top : 0, "px");
        element.style.left = "".concat((_floatingStyles$left = floatingStyles.left) !== null && _floatingStyles$left !== void 0 ? _floatingStyles$left : 0, "px");
        element.style.transform = floatingStyles.transform;
      }
    }, [searchOptionsOpen, floatingStyles, refs.floating]);
    React.useEffect(() => {
      setSearchInput(_searchInput => {
        var _props$search0, _props$search$fields$3, _props$search1, _props$search$fields$4, _props$search10, _searchInput$number$g, _searchInput$number, _props$search11, _props$search12, _props$search13, _searchInput$number$l, _searchInput$number2, _props$search14, _props$search15, _props$search16;
        return {
          string: (_props$search0 = props.search) === null || _props$search0 === void 0 || (_props$search0 = _props$search0.fields) === null || _props$search0 === void 0 || (_props$search0 = _props$search0[props.column_key]) === null || _props$search0 === void 0 || (_props$search0 = _props$search0.string) === null || _props$search0 === void 0 ? void 0 : _props$search0.text,
          number: {
            gt: (_props$search$fields$3 = (_props$search1 = props.search) === null || _props$search1 === void 0 || (_props$search1 = _props$search1.fields) === null || _props$search1 === void 0 || (_props$search1 = _props$search1[props.column_key]) === null || _props$search1 === void 0 || (_props$search1 = _props$search1.number) === null || _props$search1 === void 0 || (_props$search1 = _props$search1.gt) === null || _props$search1 === void 0 ? void 0 : _props$search1.value) !== null && _props$search$fields$3 !== void 0 ? _props$search$fields$3 : null,
            lt: (_props$search$fields$4 = (_props$search10 = props.search) === null || _props$search10 === void 0 || (_props$search10 = _props$search10.fields) === null || _props$search10 === void 0 || (_props$search10 = _props$search10[props.column_key]) === null || _props$search10 === void 0 || (_props$search10 = _props$search10.number) === null || _props$search10 === void 0 || (_props$search10 = _props$search10.lt) === null || _props$search10 === void 0 ? void 0 : _props$search10.value) !== null && _props$search$fields$4 !== void 0 ? _props$search$fields$4 : null,
            // Preserve existing raw values or initialize from actual values if they don't exist
            gtRaw: (_searchInput$number$g = (_searchInput$number = _searchInput.number) === null || _searchInput$number === void 0 ? void 0 : _searchInput$number.gtRaw) !== null && _searchInput$number$g !== void 0 ? _searchInput$number$g : ((_props$search11 = props.search) === null || _props$search11 === void 0 || (_props$search11 = _props$search11.fields) === null || _props$search11 === void 0 || (_props$search11 = _props$search11[props.column_key]) === null || _props$search11 === void 0 || (_props$search11 = _props$search11.number) === null || _props$search11 === void 0 || (_props$search11 = _props$search11.gt) === null || _props$search11 === void 0 ? void 0 : _props$search11.value) !== null && ((_props$search12 = props.search) === null || _props$search12 === void 0 || (_props$search12 = _props$search12.fields) === null || _props$search12 === void 0 || (_props$search12 = _props$search12[props.column_key]) === null || _props$search12 === void 0 || (_props$search12 = _props$search12.number) === null || _props$search12 === void 0 || (_props$search12 = _props$search12.gt) === null || _props$search12 === void 0 ? void 0 : _props$search12.value) !== undefined ? (_props$search13 = props.search) === null || _props$search13 === void 0 || (_props$search13 = _props$search13.fields) === null || _props$search13 === void 0 || (_props$search13 = _props$search13[props.column_key]) === null || _props$search13 === void 0 || (_props$search13 = _props$search13.number) === null || _props$search13 === void 0 || (_props$search13 = _props$search13.gt) === null || _props$search13 === void 0 ? void 0 : _props$search13.value.toString() : '',
            ltRaw: (_searchInput$number$l = (_searchInput$number2 = _searchInput.number) === null || _searchInput$number2 === void 0 ? void 0 : _searchInput$number2.ltRaw) !== null && _searchInput$number$l !== void 0 ? _searchInput$number$l : ((_props$search14 = props.search) === null || _props$search14 === void 0 || (_props$search14 = _props$search14.fields) === null || _props$search14 === void 0 || (_props$search14 = _props$search14[props.column_key]) === null || _props$search14 === void 0 || (_props$search14 = _props$search14.number) === null || _props$search14 === void 0 || (_props$search14 = _props$search14.lt) === null || _props$search14 === void 0 ? void 0 : _props$search14.value) !== null && ((_props$search15 = props.search) === null || _props$search15 === void 0 || (_props$search15 = _props$search15.fields) === null || _props$search15 === void 0 || (_props$search15 = _props$search15[props.column_key]) === null || _props$search15 === void 0 || (_props$search15 = _props$search15.number) === null || _props$search15 === void 0 || (_props$search15 = _props$search15.lt) === null || _props$search15 === void 0 ? void 0 : _props$search15.value) !== undefined ? (_props$search16 = props.search) === null || _props$search16 === void 0 || (_props$search16 = _props$search16.fields) === null || _props$search16 === void 0 || (_props$search16 = _props$search16[props.column_key]) === null || _props$search16 === void 0 || (_props$search16 = _props$search16.number) === null || _props$search16 === void 0 || (_props$search16 = _props$search16.lt) === null || _props$search16 === void 0 ? void 0 : _props$search16.value.toString() : ''
          }
        };
      });
    }, [JSON.stringify(props === null || props === void 0 || (_props$search17 = props.search) === null || _props$search17 === void 0 || (_props$search17 = _props$search17.fields) === null || _props$search17 === void 0 ? void 0 : _props$search17[props === null || props === void 0 ? void 0 : props.column_key])]);
    // Create a stable debounced function
    const debouncedSetSearch = React.useMemo(() => {
      var _props$debounceTime;
      return debounce((_props$debounceTime = props.debounceTime) !== null && _props$debounceTime !== void 0 ? _props$debounceTime : DEBOUNCE_INPUT_TIME_MS, newSearchInput => {
        props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
          fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
            [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
              string: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].string), {}, {
                text: newSearchInput.string
              }),
              number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                gt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.gt), {}, {
                  value: newSearchInput.number.gt
                }),
                lt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.lt), {}, {
                  value: newSearchInput.number.lt
                })
              })
            })
          })
        }));
      }, {
        atBegin: false
      });
    }, [props.debounceTime, props.column_key, props.setSearch]);
    // Use the debounced function when searchInput changes
    React.useEffect(() => {
      debouncedSetSearch(searchInput);
    }, [searchInput, debouncedSetSearch]);
    // Cleanup on unmount
    React.useEffect(() => {
      return () => {
        debouncedSetSearch.cancel();
      };
    }, [debouncedSetSearch]);
    const sortFieldClick = React.useCallback(event => {
      let thisFieldReverse = null;
      for (let i = 0; (_ref = i < ((_props$sortFields = props.sortFields) === null || _props$sortFields === void 0 ? void 0 : _props$sortFields.length)) !== null && _ref !== void 0 ? _ref : 0; i++) {
        var _ref, _props$sortFields;
        let sortField = props.sortFields[i];
        if (sortField['key'] == props.column_key) {
          thisFieldReverse = sortField['reverse'];
        }
      }
      const newSortFields = [];
      switch (event.shiftKey) {
        case false:
          switch (thisFieldReverse) {
            case false:
              newSortFields.push({
                'key': props.column_key,
                'reverse': true
              });
              break;
            case true:
            case null:
              newSortFields.push({
                'key': props.column_key,
                'reverse': false
              });
              break;
          }
          break;
        case true:
          let currentKeyIncluded = false;
          for (let i = 0; (_ref2 = i < ((_props$sortFields2 = props.sortFields) === null || _props$sortFields2 === void 0 ? void 0 : _props$sortFields2.length)) !== null && _ref2 !== void 0 ? _ref2 : 0; i++) {
            var _ref2, _props$sortFields2;
            let sortField = props.sortFields[i];
            if (sortField['key'] == props.column_key) {
              currentKeyIncluded = true;
              switch (thisFieldReverse) {
                case false:
                  newSortFields.push({
                    'key': props.column_key,
                    'reverse': true
                  });
                  break;
                case true:
                case null:
                  newSortFields.push({
                    'key': props.column_key,
                    'reverse': false
                  });
                  break;
              }
            } else {
              newSortFields.push(sortField);
            }
          }
          if (!currentKeyIncluded) {
            newSortFields.push({
              'key': props.column_key,
              'reverse': false
            });
          }
          break;
      }
      props.setSortFields(newSortFields);
    }, [props.sortFields, props.column_key, props.setSortFields]);
    let ascendingActive = false;
    let descendingActive = false;
    let sortIndex = null;
    for (let i = 0; (_ref3 = i < ((_props$sortFields3 = props.sortFields) === null || _props$sortFields3 === void 0 ? void 0 : _props$sortFields3.length)) !== null && _ref3 !== void 0 ? _ref3 : 0; i++) {
      var _ref3, _props$sortFields3;
      let sortField = props.sortFields[i];
      if (sortField.key == props.column_key) {
        if (sortField.reverse) {
          descendingActive = true;
        } else {
          ascendingActive = true;
        }
        sortIndex = i + 1;
      }
    }
    function renderSearchInput() {
      var _props$search18, _searchInput$string, _searchInput$number3, _searchInput$number4, _searchInput$number5, _searchInput$number6, _searchInput$number7, _searchInput$number8, _searchInput$number9, _searchInput$number0, _searchInput$number1, _searchInput$number10, _searchInput$number11, _searchInput$number12, _searchInput$number13, _searchInput$number14, _searchInput$number$g2, _searchInput$number15, _props$search$fields$5, _props$search19, _searchInput$number$l2, _searchInput$number16, _props$search$fields$6, _props$search20;
      switch (props === null || props === void 0 || (_props$search18 = props.search) === null || _props$search18 === void 0 || (_props$search18 = _props$search18.fields) === null || _props$search18 === void 0 || (_props$search18 = _props$search18[props === null || props === void 0 ? void 0 : props.column_key]) === null || _props$search18 === void 0 ? void 0 : _props$search18._type) {
        case 'string':
          return /*#__PURE__*/React.createElement("input", {
            className: "rare-earth-input rare-earth-input-sm",
            placeholder: "Filter",
            value: (_searchInput$string = searchInput === null || searchInput === void 0 ? void 0 : searchInput.string) !== null && _searchInput$string !== void 0 ? _searchInput$string : '',
            onChange: event => handleStringFilterChange(event.target.value),
            type: "text",
            name: "filter-".concat(tableId, "-").concat(props.column_key),
            autoComplete: "off",
            "data-testid": "filter-input-".concat(tableId, "-").concat(props.column_key),
            "data-filter-type": "string"
          });
        case 'number':
          // Check if the input contains only valid characters but is still invalid as a number
          const isValidGtPattern = ((_searchInput$number3 = searchInput.number) === null || _searchInput$number3 === void 0 ? void 0 : _searchInput$number3.gtRaw) && /^-?\d*\.?\d*$/.test(searchInput.number.gtRaw);
          const isValidLtPattern = ((_searchInput$number4 = searchInput.number) === null || _searchInput$number4 === void 0 ? void 0 : _searchInput$number4.ltRaw) && /^-?\d*\.?\d*$/.test(searchInput.number.ltRaw);
          // These are intermediate states that are invalid as final values
          const gtIsIntermediateState = ((_searchInput$number5 = searchInput.number) === null || _searchInput$number5 === void 0 ? void 0 : _searchInput$number5.gtRaw) === '-' || ((_searchInput$number6 = searchInput.number) === null || _searchInput$number6 === void 0 ? void 0 : _searchInput$number6.gtRaw) === '.' || ((_searchInput$number7 = searchInput.number) === null || _searchInput$number7 === void 0 ? void 0 : _searchInput$number7.gtRaw) === '-.' || ((_searchInput$number8 = searchInput.number) === null || _searchInput$number8 === void 0 ? void 0 : _searchInput$number8.gtRaw) && searchInput.number.gtRaw.endsWith('.');
          const ltIsIntermediateState = ((_searchInput$number9 = searchInput.number) === null || _searchInput$number9 === void 0 ? void 0 : _searchInput$number9.ltRaw) === '-' || ((_searchInput$number0 = searchInput.number) === null || _searchInput$number0 === void 0 ? void 0 : _searchInput$number0.ltRaw) === '.' || ((_searchInput$number1 = searchInput.number) === null || _searchInput$number1 === void 0 ? void 0 : _searchInput$number1.ltRaw) === '-.' || ((_searchInput$number10 = searchInput.number) === null || _searchInput$number10 === void 0 ? void 0 : _searchInput$number10.ltRaw) && searchInput.number.ltRaw.endsWith('.');
          // Check for min/max validation
          const gtValue = (_searchInput$number11 = searchInput.number) === null || _searchInput$number11 === void 0 ? void 0 : _searchInput$number11.gt;
          const ltValue = (_searchInput$number12 = searchInput.number) === null || _searchInput$number12 === void 0 ? void 0 : _searchInput$number12.lt;
          const hasMinMaxMismatch = gtValue !== null && ltValue !== null && gtValue > ltValue;
          // Show error if: contains invalid characters OR is an incomplete number OR min > max
          const gtHasError = ((_searchInput$number13 = searchInput.number) === null || _searchInput$number13 === void 0 ? void 0 : _searchInput$number13.gtRaw) && (!isValidGtPattern || gtIsIntermediateState) || hasMinMaxMismatch;
          const ltHasError = ((_searchInput$number14 = searchInput.number) === null || _searchInput$number14 === void 0 ? void 0 : _searchInput$number14.ltRaw) && (!isValidLtPattern || ltIsIntermediateState) || hasMinMaxMismatch;
          return /*#__PURE__*/React.createElement("div", {
            className: "rare-earth-numeric-filter-container"
          }, /*#__PURE__*/React.createElement("div", {
            className: "rare-earth-stack-sm"
          }, /*#__PURE__*/React.createElement("div", {
            className: "rare-earth-numeric-filter-row"
          }, /*#__PURE__*/React.createElement("input", {
            className: "rare-earth-number-input rare-earth-numeric-filter-input ".concat(gtHasError ? 'error' : ''),
            type: "text",
            placeholder: "Min",
            value: (_searchInput$number$g2 = (_searchInput$number15 = searchInput.number) === null || _searchInput$number15 === void 0 ? void 0 : _searchInput$number15.gtRaw) !== null && _searchInput$number$g2 !== void 0 ? _searchInput$number$g2 : '',
            "aria-invalid": gtHasError,
            "aria-describedby": gtHasError ? "gt-error-".concat(tableId, "-").concat(props.column_key) : undefined,
            name: "filter-".concat(tableId, "-").concat(props.column_key, "-min"),
            autoComplete: "off",
            "data-testid": "filter-min-".concat(tableId, "-").concat(props.column_key),
            "data-filter-type": "number",
            onChange: event => handleNumberGtChange(event.target.value)
          }), /*#__PURE__*/React.createElement("label", {
            className: "rare-earth-checkbox-sm"
          }, /*#__PURE__*/React.createElement("input", {
            type: "checkbox",
            checked: (_props$search$fields$5 = (_props$search19 = props.search) === null || _props$search19 === void 0 || (_props$search19 = _props$search19.fields) === null || _props$search19 === void 0 || (_props$search19 = _props$search19[props.column_key]) === null || _props$search19 === void 0 || (_props$search19 = _props$search19.number) === null || _props$search19 === void 0 || (_props$search19 = _props$search19.gt) === null || _props$search19 === void 0 ? void 0 : _props$search19.equals) !== null && _props$search$fields$5 !== void 0 ? _props$search$fields$5 : false,
            onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
              fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
                [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                  number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                    gt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.gt), {}, {
                      equals: event.currentTarget.checked
                    })
                  })
                })
              })
            }))
          }), "Inclusive")), gtHasError && /*#__PURE__*/React.createElement("div", {
            id: "gt-error-".concat(tableId, "-").concat(props.column_key),
            className: "rare-earth-error-text",
            role: "alert"
          }, hasMinMaxMismatch ? 'Min cannot be greater than max' : gtIsIntermediateState ? 'Incomplete number' : 'Invalid number format')), /*#__PURE__*/React.createElement("div", {
            className: "rare-earth-stack-sm"
          }, /*#__PURE__*/React.createElement("div", {
            className: "rare-earth-numeric-filter-row"
          }, /*#__PURE__*/React.createElement("input", {
            className: "rare-earth-number-input rare-earth-numeric-filter-input ".concat(ltHasError ? 'error' : ''),
            type: "text",
            placeholder: "Max",
            value: (_searchInput$number$l2 = (_searchInput$number16 = searchInput.number) === null || _searchInput$number16 === void 0 ? void 0 : _searchInput$number16.ltRaw) !== null && _searchInput$number$l2 !== void 0 ? _searchInput$number$l2 : '',
            "aria-invalid": ltHasError,
            "aria-describedby": ltHasError ? "lt-error-".concat(tableId, "-").concat(props.column_key) : undefined,
            name: "filter-".concat(tableId, "-").concat(props.column_key, "-max"),
            autoComplete: "off",
            "data-testid": "filter-max-".concat(tableId, "-").concat(props.column_key),
            "data-filter-type": "number",
            onChange: event => handleNumberLtChange(event.target.value)
          }), /*#__PURE__*/React.createElement("label", {
            className: "rare-earth-checkbox-sm"
          }, /*#__PURE__*/React.createElement("input", {
            type: "checkbox",
            checked: (_props$search$fields$6 = (_props$search20 = props.search) === null || _props$search20 === void 0 || (_props$search20 = _props$search20.fields) === null || _props$search20 === void 0 || (_props$search20 = _props$search20[props.column_key]) === null || _props$search20 === void 0 || (_props$search20 = _props$search20.number) === null || _props$search20 === void 0 || (_props$search20 = _props$search20.lt) === null || _props$search20 === void 0 ? void 0 : _props$search20.equals) !== null && _props$search$fields$6 !== void 0 ? _props$search$fields$6 : false,
            onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
              fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
                [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                  number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                    lt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.lt), {}, {
                      equals: event.currentTarget.checked
                    })
                  })
                })
              })
            }))
          }), "Inclusive")), ltHasError && /*#__PURE__*/React.createElement("div", {
            id: "lt-error-".concat(tableId, "-").concat(props.column_key),
            className: "rare-earth-error-text",
            role: "alert"
          }, hasMinMaxMismatch ? 'Max cannot be less than min' : ltIsIntermediateState ? 'Incomplete number' : 'Invalid number format')));
        default:
          return null;
      }
    }
    function renderPopup() {
      var _props$search21, _props$search22;
      if ((props === null || props === void 0 || (_props$search21 = props.search) === null || _props$search21 === void 0 || (_props$search21 = _props$search21.fields) === null || _props$search21 === void 0 || (_props$search21 = _props$search21[props === null || props === void 0 ? void 0 : props.column_key]) === null || _props$search21 === void 0 ? void 0 : _props$search21._type) == 'string') {
        return /*#__PURE__*/React.createElement("div", {
          className: "rare-earth-stack"
        }, /*#__PURE__*/React.createElement("label", {
          className: "rare-earth-checkbox"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: props.search.fields[props.column_key].string.trim,
          onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
            fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
              [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                string: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].string), {}, {
                  trim: event.currentTarget.checked
                })
              })
            })
          }))
        }), "Trim"), /*#__PURE__*/React.createElement("label", {
          className: "rare-earth-checkbox"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: props.search.fields[props.column_key].string.caseSensitive,
          onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
            fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
              [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                string: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].string), {}, {
                  caseSensitive: event.currentTarget.checked
                })
              })
            })
          }))
        }), "Case Sensitive"), /*#__PURE__*/React.createElement("label", {
          className: "rare-earth-checkbox"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: props.search.fields[props.column_key].string.isRegex,
          onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
            fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
              [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                string: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].string), {}, {
                  isRegex: event.currentTarget.checked
                })
              })
            })
          }))
        }), "Regex"));
      } else if ((props === null || props === void 0 || (_props$search22 = props.search) === null || _props$search22 === void 0 || (_props$search22 = _props$search22.fields) === null || _props$search22 === void 0 || (_props$search22 = _props$search22[props === null || props === void 0 ? void 0 : props.column_key]) === null || _props$search22 === void 0 ? void 0 : _props$search22._type) == 'number') {
        var _props$search$fields$7, _props$search$fields$8;
        return /*#__PURE__*/React.createElement("div", {
          className: "rare-earth-stack"
        }, /*#__PURE__*/React.createElement("label", {
          className: "rare-earth-checkbox"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: props.search.fields[props.column_key].number.omitNonNumeric,
          onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
            fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
              [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                  omitNonNumeric: event.currentTarget.checked
                })
              })
            })
          }))
        }), "Omit Non Numeric"), /*#__PURE__*/React.createElement("label", {
          className: "rare-earth-checkbox"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: (_props$search$fields$7 = props.search.fields[props.column_key].number.gt) === null || _props$search$fields$7 === void 0 ? void 0 : _props$search$fields$7.equals,
          onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
            fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
              [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                  gt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.gt), {}, {
                    equals: event.currentTarget.checked
                  })
                })
              })
            })
          }))
        }), "Inclusive Greater Than"), /*#__PURE__*/React.createElement("label", {
          className: "rare-earth-checkbox"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: (_props$search$fields$8 = props.search.fields[props.column_key].number.lt) === null || _props$search$fields$8 === void 0 ? void 0 : _props$search$fields$8.equals,
          onChange: event => props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
            fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
              [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
                number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                  lt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.lt), {}, {
                    equals: event.currentTarget.checked
                  })
                })
              })
            })
          }))
        }), "Inclusive Less Than"));
      }
      return null;
    }
    const onDragStartHandle = React.useCallback((event, column_key, column_index) => {
      event.dataTransfer.setData('initiatorKey', column_key);
      event.dataTransfer.setData('initiatorIndex', column_index.toString());
    }, []);
    const swapColumns = React.useCallback((columnA, columnB, indexA, before) => {
      if (columnA == columnB) {
        return;
      }
      if (props.columns.attributes[columnA] == null || props.columns.attributes[columnB] == null) {
        return;
      }
      let newColumnOrder = [];
      for (let i = 0; i < props.columns.order.length; i++) {
        let orderColumnKey = props.columns.order[i];
        if (orderColumnKey != columnA && orderColumnKey != columnB) {
          newColumnOrder.push(orderColumnKey);
        } else if (orderColumnKey == columnB) {
          if (Math.abs(i - indexA) <= 1) {
            if (indexA < i) {
              newColumnOrder.push(columnB);
              newColumnOrder.push(columnA);
            } else {
              newColumnOrder.push(columnA);
              newColumnOrder.push(columnB);
            }
          } else {
            if (before) {
              newColumnOrder.push(columnA);
              newColumnOrder.push(columnB);
            } else {
              newColumnOrder.push(columnB);
              newColumnOrder.push(columnA);
            }
          }
        }
      }
      props.setColumns(_objectSpread2(_objectSpread2({}, props.columns), {}, {
        order: newColumnOrder
      }));
    }, [props.columns, props.setColumns]);
    const onDropHandle = React.useCallback(event => {
      event.preventDefault();
      let columnA = event.dataTransfer.getData('initiatorKey');
      let indexA = parseInt(event.dataTransfer.getData('initiatorIndex'));
      let target = event.target;
      let columnB;
      while (!columnB) {
        target = target.parentElement;
        if (!target) {
          return;
        }
        columnB = target.getAttribute('data-rare-earth-column-key');
      }
      let boundingBox = target.getBoundingClientRect();
      let before = event.clientX <= (boundingBox.left + boundingBox.right) / 2;
      if (columnB != null) {
        swapColumns(columnA, columnB, indexA, before);
      }
    }, [swapColumns]);
    return /*#__PURE__*/React.createElement("th", {
      className: "rare-earth-header-cell",
      rowSpan: props.rowSpan || 1
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-stack"
    }, /*#__PURE__*/React.createElement("div", {
      ref: element => {
        if (element && ref && ref.current) {
          ref.current[props.column_index] = element;
        }
      },
      "data-rare-earth-column-key": props.column_key,
      className: "rare-earth-draggable",
      draggable: true,
      role: "button",
      tabIndex: 0,
      "aria-label": "Drag to reorder column ".concat((_props$column$label = props.column.label) !== null && _props$column$label !== void 0 ? _props$column$label : props.column_key),
      title: "Drag to reorder column ".concat((_props$column$label2 = props.column.label) !== null && _props$column$label2 !== void 0 ? _props$column$label2 : props.column_key),
      "data-testid": "column-header-".concat(tableId, "-").concat(props.column_key),
      "data-column": props.column_key,
      "data-draggable": "true",
      onDragStart: event => onDragStartHandle(event, props.column_key, props.column_index),
      onDragOver: event => event.preventDefault(),
      onDragEnter: event => event.preventDefault(),
      onDrop: event => onDropHandle(event)
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-flex-xs"
    }, /*#__PURE__*/React.createElement(FloatingTooltip, {
      content: /*#__PURE__*/React.createElement("div", {
        className: "rare-earth-stack"
      }, /*#__PURE__*/React.createElement("span", null, "Click to sort by ", (_props$column$label3 = props.column.label) !== null && _props$column$label3 !== void 0 ? _props$column$label3 : props.column_key.toString()), /*#__PURE__*/React.createElement("span", null, "Hold ", /*#__PURE__*/React.createElement("strong", null, "Shift"), " and click to add to multi-sort or change sort direction."))
    }, /*#__PURE__*/React.createElement("button", {
      className: "rare-earth-sort-button",
      onClick: event => sortFieldClick(event),
      "aria-label": "Sort by ".concat((_props$column$label4 = props.column.label) !== null && _props$column$label4 !== void 0 ? _props$column$label4 : props.column_key, ". Currently ").concat(ascendingActive ? 'ascending' : descendingActive ? 'descending' : 'not sorted'),
      "aria-pressed": ascendingActive || descendingActive,
      "aria-sort": ascendingActive ? 'ascending' : descendingActive ? 'descending' : 'none',
      type: "button",
      "data-testid": "sort-button-".concat(tableId, "-").concat(props.column_key),
      "data-column": props.column_key,
      "data-sort-state": ascendingActive ? 'ascending' : descendingActive ? 'descending' : 'none',
      title: "Sort by ".concat((_props$column$label5 = props.column.label) !== null && _props$column$label5 !== void 0 ? _props$column$label5 : props.column_key)
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-flex-xs"
    }, sortIndex, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-stack"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-triangle ".concat(ascendingActive ? 'active' : ''),
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-triangle descending ".concat(descendingActive ? 'active' : ''),
      "aria-hidden": "true"
    }))))), (_props$column$label6 = props.column.label) !== null && _props$column$label6 !== void 0 ? _props$column$label6 : props.column_key.toString())), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-popover"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-flex-xs"
    }, /*#__PURE__*/React.createElement(FloatingTooltip, {
      content: "Click to open filter options and change filter type"
    }, /*#__PURE__*/React.createElement("div", _objectSpread2(_objectSpread2({
      ref: refs.setReference,
      className: "rare-earth-search-icon ".concat(searchOptionsOpen ? 'active' : '')
    }, getReferenceProps()), {}, {
      role: "button",
      tabIndex: 0,
      "aria-haspopup": "dialog",
      "aria-expanded": searchOptionsOpen,
      "aria-controls": "filter-popup-".concat(tableId, "-").concat(props.column_key),
      "aria-label": "Open filter options"
    }), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-stack"
    }, /*#__PURE__*/React.createElement(FaSearchPlus, null), /*#__PURE__*/React.createElement("span", {
      className: "rare-earth-filter-type-indicator"
    }, (props === null || props === void 0 || (_props$search23 = props.search) === null || _props$search23 === void 0 || (_props$search23 = _props$search23.fields) === null || _props$search23 === void 0 || (_props$search23 = _props$search23[props === null || props === void 0 ? void 0 : props.column_key]) === null || _props$search23 === void 0 ? void 0 : _props$search23._type) != 'string' ? "123" : "ABC")))), renderSearchInput()), searchOptionsOpen && (/*#__PURE__*/React.createElement("div", _objectSpread2({
      ref: refs.setFloating,
      id: "filter-popup-".concat(tableId, "-").concat(props.column_key),
      className: "rare-earth-popover-content",
      role: "dialog",
      "aria-label": "Filter options"
    }, getFloatingProps()), /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-stack"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rare-earth-chip-group"
    }, /*#__PURE__*/React.createElement("button", {
      className: "rare-earth-chip ".concat((props === null || props === void 0 || (_props$search24 = props.search) === null || _props$search24 === void 0 || (_props$search24 = _props$search24.fields) === null || _props$search24 === void 0 || (_props$search24 = _props$search24[props === null || props === void 0 ? void 0 : props.column_key]) === null || _props$search24 === void 0 ? void 0 : _props$search24._type) === 'string' ? 'active' : ''),
      onClick: () => {
        props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
          fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
            [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
              _type: 'string',
              string: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].string), {}, {
                text: null
              }),
              number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                gt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.gt), {}, {
                  value: null
                }),
                lt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.lt), {}, {
                  value: null
                })
              })
            })
          })
        }));
        setSearchInput({
          string: null,
          number: {
            gt: null,
            lt: null,
            gtRaw: '',
            ltRaw: ''
          }
        });
      }
    }, "Text"), /*#__PURE__*/React.createElement("button", {
      className: "rare-earth-chip ".concat((props === null || props === void 0 || (_props$search25 = props.search) === null || _props$search25 === void 0 || (_props$search25 = _props$search25.fields) === null || _props$search25 === void 0 || (_props$search25 = _props$search25[props === null || props === void 0 ? void 0 : props.column_key]) === null || _props$search25 === void 0 ? void 0 : _props$search25._type) === 'number' ? 'active' : ''),
      onClick: () => {
        props.setSearch(_search => _objectSpread2(_objectSpread2({}, _search), {}, {
          fields: _objectSpread2(_objectSpread2({}, _search.fields), {}, {
            [props.column_key]: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key]), {}, {
              _type: 'number',
              string: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].string), {}, {
                text: null
              }),
              number: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number), {}, {
                gt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.gt), {}, {
                  value: null
                }),
                lt: _objectSpread2(_objectSpread2({}, _search.fields[props.column_key].number.lt), {}, {
                  value: null
                })
              })
            })
          })
        }));
        setSearchInput({
          string: null,
          number: {
            gt: null,
            lt: null,
            gtRaw: '',
            ltRaw: ''
          }
        });
      }
    }, "Numeric")), renderPopup()))))));
  };

  const initiaDefaultSearch = function (columns) {
    return {
      global: null,
      fields: Object.fromEntries((columns !== null && columns !== void 0 ? columns : []).map((x, i) => [x.key, {
        _type: x.type == 'number' ? 'number' : 'string',
        string: {
          text: null,
          trim: true,
          caseSensitive: false,
          isRegex: false
        },
        number: {
          omitNonNumeric: false,
          value: null,
          gt: {
            value: null,
            equals: false
          },
          lt: {
            value: null,
            equals: false
          }
        }
      }]))
    };
  };
  const DataTable = /*#__PURE__*/React.forwardRef((props, ref) => {
    var _props$columns, _props$columns2, _props$records, _props$initialPageLen, _props$pageLengthChoi, _props$initialPage, _props$initialSortFie, _props$columns3, _filteredSortedRecord, _props$columns8;
    const tableId = props.id || "rare-earth-table-".concat(React.useId());
    const tableDescriptionId = "".concat(tableId, "-description");
    const tableStatsId = "".concat(tableId, "-stats");
    // Use a stable key that doesn't change unless necessary
    const indexKeyRef = React.useRef("__index_".concat(Date.now()));
    const [columns, setColumns] = React.useState({
      _indexKey: indexKeyRef.current,
      order: ((_props$columns = props.columns) !== null && _props$columns !== void 0 ? _props$columns : []).map((x, i) => x.key),
      attributes: Object.fromEntries(((_props$columns2 = props.columns) !== null && _props$columns2 !== void 0 ? _props$columns2 : []).map((x, i) => {
        var _x$valueFunc;
        return [x.key, _objectSpread2(_objectSpread2({}, x), {}, {
          valueFunc: (_x$valueFunc = x === null || x === void 0 ? void 0 : x.valueFunc) !== null && _x$valueFunc !== void 0 ? _x$valueFunc : record => {
            switch (x.type == 'number') {
              case true:
                return parseFloat(record === null || record === void 0 ? void 0 : record[x.key]);
              case false:
                return record === null || record === void 0 ? void 0 : record[x.key];
            }
          }
        })];
      }))
    });
    const [records, setRecords] = React.useState((_props$records = props.records) !== null && _props$records !== void 0 ? _props$records : []);
    const [pageLength, setPageLength] = React.useState((_props$initialPageLen = props.initialPageLength) !== null && _props$initialPageLen !== void 0 ? _props$initialPageLen : 20);
    const [pageLengthChoices, setPageLengthChoices] = React.useState((_props$pageLengthChoi = props.pageLengthChoices) !== null && _props$pageLengthChoi !== void 0 ? _props$pageLengthChoi : [10, 20, 50, 100, Infinity]);
    const [page, setPage] = React.useState((_props$initialPage = props.initialPage) !== null && _props$initialPage !== void 0 ? _props$initialPage : 1);
    const [sortFields, setSortFields] = React.useState((_props$initialSortFie = props.initialSortFields) !== null && _props$initialSortFie !== void 0 ? _props$initialSortFie : []);
    const [search, setSearch] = React.useState(initiaDefaultSearch((_props$columns3 = props === null || props === void 0 ? void 0 : props.columns) !== null && _props$columns3 !== void 0 ? _props$columns3 : []));
    const resetColumns = React.useCallback(() => {
      var _props$columns4, _props$columns5;
      setColumns({
        _indexKey: indexKeyRef.current,
        order: ((_props$columns4 = props.columns) !== null && _props$columns4 !== void 0 ? _props$columns4 : []).map(x => x.key),
        attributes: Object.fromEntries(((_props$columns5 = props.columns) !== null && _props$columns5 !== void 0 ? _props$columns5 : []).map(x => {
          var _x$valueFunc2;
          return [x.key, _objectSpread2(_objectSpread2({}, x), {}, {
            valueFunc: (_x$valueFunc2 = x === null || x === void 0 ? void 0 : x.valueFunc) !== null && _x$valueFunc2 !== void 0 ? _x$valueFunc2 : record => {
              switch (x.type == 'number') {
                case true:
                  const numValue = parseFloat(record === null || record === void 0 ? void 0 : record[x.key]);
                  return isNaN(numValue) ? null : numValue;
                case false:
                  return record === null || record === void 0 ? void 0 : record[x.key];
              }
            }
          })];
        }))
      });
    }, [props.columns]);
    const headerRefs = React.useRef({});
    const defaultCompareFunc = React.useCallback((a, b) => {
      if (a == null) {
        return b == null ? 0 : -1;
      }
      if (b == null) {
        return 1;
      }
      if (a == b) {
        return 0;
      }
      return a < b ? -1 : 1;
    }, []);
    const compareRecords = React.useCallback((recordA, recordB) => {
      for (let i = 0; i < sortFields.length; i++) {
        let sortField = sortFields[i]['key'];
        let reverse = sortFields[i]['reverse'];
        let compareFunc = columns.attributes[sortField].compareFunc;
        let aVal;
        let bVal;
        if (columns.attributes[sortField].valueFunc != null) {
          aVal = columns.attributes[sortField].valueFunc(recordA);
          bVal = columns.attributes[sortField].valueFunc(recordB);
        } else {
          aVal = recordA[sortField];
          bVal = recordB[sortField];
        }
        if (columns.attributes[sortField].type == 'number') {
          if (aVal != null) {
            aVal = parseFloat(aVal);
          }
          if (bVal != null) {
            bVal = parseFloat(bVal);
          }
        }
        let compareVal;
        if (reverse) {
          compareVal = compareFunc ? compareFunc(bVal, aVal) : defaultCompareFunc(bVal, aVal);
        } else {
          compareVal = compareFunc ? compareFunc(aVal, bVal) : defaultCompareFunc(aVal, bVal);
        }
        if (compareVal != 0) {
          return compareVal;
        }
      }
      return 0;
    }, [sortFields, columns.attributes, defaultCompareFunc]);
    React.useEffect(() => {
      var _props$columns6, _props$columns7;
      setColumns({
        _indexKey: indexKeyRef.current,
        order: ((_props$columns6 = props.columns) !== null && _props$columns6 !== void 0 ? _props$columns6 : []).map((x, i) => x.key),
        attributes: Object.fromEntries(((_props$columns7 = props.columns) !== null && _props$columns7 !== void 0 ? _props$columns7 : []).map((x, i) => {
          var _x$valueFunc3;
          return [x.key, _objectSpread2(_objectSpread2({}, x), {}, {
            valueFunc: (_x$valueFunc3 = x === null || x === void 0 ? void 0 : x.valueFunc) !== null && _x$valueFunc3 !== void 0 ? _x$valueFunc3 : record => record === null || record === void 0 ? void 0 : record[x.key]
          })];
        }))
      });
    }, [props.columns]);
    React.useEffect(() => {
      var _props$records2;
      setRecords((_props$records2 = props.records) !== null && _props$records2 !== void 0 ? _props$records2 : []);
    }, [props.records]);
    function stringDoesMatch(_ref) {
      let {
        recordCompareStr,
        keySearch,
        trim,
        caseSensitive,
        isRegex
      } = _ref;
      if (keySearch == null) {
        return true;
      }
      let _recordCompareStr = trim ? recordCompareStr.trim() : recordCompareStr;
      let _keySearch = trim ? keySearch.trim() : keySearch;
      if (!caseSensitive && !isRegex) {
        _recordCompareStr = _recordCompareStr.toLowerCase();
        _keySearch = _keySearch.toLowerCase();
      }
      if (isRegex) {
        let _regex = new RegExp(_keySearch, caseSensitive ? "g" : "gi");
        return _regex.test(_recordCompareStr);
      } else {
        return _recordCompareStr.includes(_keySearch);
      }
    }
    function numberDoesMatch(_ref2) {
      let {
        recordNumber,
        omitNonNumeric,
        gtNum,
        gtEquals,
        ltNum,
        ltEquals
      } = _ref2;
      if (isNaN(recordNumber)) {
        return !omitNonNumeric;
      }
      if (gtNum != null) {
        if (gtEquals) {
          if (recordNumber < gtNum) return false;
        } else {
          if (recordNumber <= gtNum) return false;
        }
      }
      if (ltNum != null) {
        if (ltEquals) {
          if (recordNumber > ltNum) return false;
        } else {
          if (recordNumber >= ltNum) return false;
        }
      }
      return true;
    }
    function doesMatch(_ref3) {
      let {
        recordCompareStr,
        keySearch
      } = _ref3;
      if (keySearch._type === 'string') {
        return stringDoesMatch({
          recordCompareStr: recordCompareStr,
          keySearch: keySearch.string.text,
          trim: keySearch.string.trim,
          caseSensitive: keySearch.string.caseSensitive,
          isRegex: keySearch.string.isRegex
        });
      } else if (keySearch._type === 'number') {
        var _ref4, _ref4$trim, _keySearch$number$gt, _keySearch$number$gt2, _keySearch$number$lt, _keySearch$number$lt2;
        return numberDoesMatch({
          recordNumber: new Number((_ref4 = recordCompareStr !== null && recordCompareStr !== void 0 ? recordCompareStr : '') === null || _ref4 === void 0 || (_ref4$trim = _ref4.trim) === null || _ref4$trim === void 0 ? void 0 : _ref4$trim.call(_ref4)),
          omitNonNumeric: keySearch.number.omitNonNumeric,
          gtNum: (_keySearch$number$gt = keySearch.number.gt) === null || _keySearch$number$gt === void 0 ? void 0 : _keySearch$number$gt.value,
          gtEquals: (_keySearch$number$gt2 = keySearch.number.gt) === null || _keySearch$number$gt2 === void 0 ? void 0 : _keySearch$number$gt2.equals,
          ltNum: (_keySearch$number$lt = keySearch.number.lt) === null || _keySearch$number$lt === void 0 ? void 0 : _keySearch$number$lt.value,
          ltEquals: (_keySearch$number$lt2 = keySearch.number.lt) === null || _keySearch$number$lt2 === void 0 ? void 0 : _keySearch$number$lt2.equals
        });
      }
    }
    const filteredRecords = React.useMemo(function () {
      const newRecords = [];
      for (let i = 0; i < records.length; i++) {
        let record = records[i];
        let include = !Boolean(search.global);
        for (let key in search.fields) {
          var _ref5, _ref5$toString, _columns$attributes$k, _columns$attributes, _columns$attributes$v;
          let recordCompareStr = (_ref5 = (_columns$attributes$k = columns === null || columns === void 0 || (_columns$attributes = columns.attributes) === null || _columns$attributes === void 0 || (_columns$attributes = _columns$attributes[key]) === null || _columns$attributes === void 0 || (_columns$attributes$v = _columns$attributes.valueFunc) === null || _columns$attributes$v === void 0 ? void 0 : _columns$attributes$v.call(_columns$attributes, record)) !== null && _columns$attributes$k !== void 0 ? _columns$attributes$k : '') === null || _ref5 === void 0 || (_ref5$toString = _ref5.toString) === null || _ref5$toString === void 0 ? void 0 : _ref5$toString.call(_ref5);
          if (Boolean(search.global) && stringDoesMatch({
            recordCompareStr: recordCompareStr,
            keySearch: search.global,
            trim: true,
            caseSensitive: false,
            isRegex: false
          })) {
            include = true;
            break;
          }
          let keySearch = search.fields[key];
          if (keySearch._type == 'string') {
            if (keySearch.string.text == null) {
              continue;
            }
          } else if (keySearch._type == 'number') {
            var _keySearch$number$gt3, _keySearch$number$lt3;
            if (((_keySearch$number$gt3 = keySearch.number.gt) === null || _keySearch$number$gt3 === void 0 ? void 0 : _keySearch$number$gt3.value) == null && ((_keySearch$number$lt3 = keySearch.number.lt) === null || _keySearch$number$lt3 === void 0 ? void 0 : _keySearch$number$lt3.value) == null) {
              var _ref6, _ref6$trim;
              if (keySearch.number.omitNonNumeric && isNaN(new Number((_ref6 = recordCompareStr !== null && recordCompareStr !== void 0 ? recordCompareStr : '') === null || _ref6 === void 0 || (_ref6$trim = _ref6.trim) === null || _ref6$trim === void 0 ? void 0 : _ref6$trim.call(_ref6)))) {
                include = false;
              }
              continue;
            }
          }
          if (doesMatch({
            recordCompareStr: recordCompareStr,
            keySearch: keySearch
          })) {
            if (Boolean(search.global)) {
              include = true;
              break;
            }
          } else {
            if (!Boolean(search.global)) {
              include = false;
              break;
            }
          }
        }
        if (include) {
          newRecords.push(_objectSpread2(_objectSpread2({}, record), {}, {
            [columns._indexKey]: i
          }));
        }
      }
      return newRecords;
    }, [search, records, columns._indexKey]);
    const filteredSortedRecords = React.useMemo(function () {
      const sortedRecords = [...filteredRecords].sort(compareRecords);
      return sortedRecords;
    }, [sortFields, filteredRecords, compareRecords]);
    // Create two-row header structure
    let main_headers = [];
    let sub_headers = [];
    if (props.index !== false) {
      main_headers.push(/*#__PURE__*/React.createElement("th", {
        key: "index-main",
        className: "index-main-header",
        colSpan: 2
      }, "Row No."));
      sub_headers.push(/*#__PURE__*/React.createElement("th", {
        key: "index-source",
        className: "index-sub-header"
      }, /*#__PURE__*/React.createElement(FloatingTooltip, {
        content: "Original row number from the source dataset"
      }, /*#__PURE__*/React.createElement("span", null, "Source"))));
      sub_headers.push(/*#__PURE__*/React.createElement("th", {
        key: "index-current",
        className: "index-sub-header"
      }, /*#__PURE__*/React.createElement(FloatingTooltip, {
        content: "Current position in the filtered and sorted dataset"
      }, /*#__PURE__*/React.createElement("span", null, "Current"))));
    }
    for (let i = 0; i < columns.order.length; i++) {
      let key = columns.order[i];
      let column = columns.attributes[key];
      main_headers.push(/*#__PURE__*/React.createElement(TableHeader, {
        ref: headerRefs,
        key: key,
        tableId: tableId,
        columns: columns,
        setColumns: setColumns,
        sortFields: sortFields,
        setSortFields: setSortFields,
        search: search,
        setSearch: setSearch,
        column_index: i,
        column_key: key,
        column: column,
        debounceTime: props.debounceTime,
        rowSpan: 2
      }));
    }
    let pageCount = Math.max(Math.ceil(((_filteredSortedRecord = filteredSortedRecords === null || filteredSortedRecords === void 0 ? void 0 : filteredSortedRecords.length) !== null && _filteredSortedRecord !== void 0 ? _filteredSortedRecord : 0) / pageLength), 1);
    let rows = [];
    let lb = pageLength === Infinity ? 0 : (page - 1) * pageLength;
    let ub = pageLength === Infinity ? filteredSortedRecords.length : Math.min(page * pageLength, filteredSortedRecords.length);
    for (let i = lb; i < ub; i++) {
      let record = filteredSortedRecords[i];
      let cells = [];
      let colIndex = 1;
      if (props.index !== false) {
        cells.push(/*#__PURE__*/React.createElement("td", {
          key: "index-source",
          className: "index-column",
          "aria-colindex": colIndex++
        }, record[columns._indexKey] + 1));
        cells.push(/*#__PURE__*/React.createElement("td", {
          key: "index-current",
          className: "index-column",
          "aria-colindex": colIndex++
        }, i + 1));
      }
      for (let j = 0; j < columns.order.length; j++) {
        let key = columns.order[j];
        let column = columns.attributes[key];
        let value;
        if (column.valueFunc != null) {
          value = column.valueFunc(record);
        } else {
          value = record[key];
        }
        if (column.displayFunc != null) {
          let cellDisplay = column.displayFunc(record, value);
          cells.push(/*#__PURE__*/React.createElement("td", {
            key: key,
            "aria-colindex": colIndex++
          }, cellDisplay));
        } else {
          cells.push(/*#__PURE__*/React.createElement("td", {
            key: key,
            "aria-colindex": colIndex++
          }, value));
        }
      }
      rows.push(/*#__PURE__*/React.createElement("tr", {
        key: i,
        role: "row",
        "aria-rowindex": i + 1,
        "data-testid": "table-row-".concat(tableId, "-").concat(i),
        "data-row-index": i
      }, cells));
    }
    if (page > 1 && (filteredSortedRecords.length < (page - 1) * pageLength + 1 || pageLength === Infinity)) {
      setPage(1);
    }
    const exportTable = React.useCallback(() => {
      let csvContent = "data:text/csv;charset=utf-8,";
      let exportRows = [];
      let exportHeaders = [];
      for (let i = 0; i < columns.order.length; i++) {
        var _column$label;
        let key = columns.order[i];
        let column = columns.attributes[key];
        exportHeaders.push((_column$label = column.label) !== null && _column$label !== void 0 ? _column$label : column.key);
      }
      exportRows.push(exportHeaders.join(","));
      for (let i = 0; i < filteredSortedRecords.length; i++) {
        let exportRecord = [];
        let record = filteredSortedRecords[i];
        for (let j = 0; j < columns.order.length; j++) {
          let key = columns.order[j];
          let column = columns.attributes[key];
          let value;
          if (column.valueFunc != null) {
            value = column.valueFunc(record);
          } else {
            value = record[key];
          }
          exportRecord.push(value == null ? '' : String(value));
        }
        exportRows.push(exportRecord.join(","));
      }
      csvContent += exportRows.join("\r\n");
      const encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }, [columns, filteredSortedRecords]);
    return /*#__PURE__*/React.createElement("div", {
      ref: ref,
      id: props.id,
      className: "rare-earth-container".concat(props.className ? " ".concat(props.className) : ''),
      style: props.style,
      role: "region",
      "aria-label": "Data table with sorting and filtering",
      "aria-describedby": "".concat(tableDescriptionId, " ").concat(tableStatsId),
      "data-testid": "data-table-".concat(tableId),
      "data-component": "rare-earth-table"
    }, /*#__PURE__*/React.createElement("div", {
      id: tableDescriptionId,
      className: "sr-only",
      translate: "yes"
    }, "Interactive data table with sorting, filtering, and pagination capabilities. Use column headers to sort data and filter controls to narrow results."), /*#__PURE__*/React.createElement("div", {
      id: tableStatsId,
      className: "sr-only",
      "aria-live": "polite",
      "aria-atomic": "true"
    }, "Showing ", lb + 1, " to ", ub, " of ", filteredSortedRecords.length, " filtered results (from ", records.length, " total records)"), /*#__PURE__*/React.createElement(TableControl, {
      tableId: tableId,
      columns: (_props$columns8 = props === null || props === void 0 ? void 0 : props.columns) !== null && _props$columns8 !== void 0 ? _props$columns8 : [],
      exportTable: exportTable,
      numRecords: records.length,
      numFilteredRecords: filteredRecords.length,
      sortFields: sortFields,
      setSortFields: setSortFields,
      search: search,
      setSearch: setSearch,
      page: page,
      setPage: setPage,
      pageLength: pageLength,
      setPageLength: setPageLength,
      pageLengthChoices: pageLengthChoices,
      pageCount: pageCount,
      debounceTime: props.debounceTime,
      resetColumns: resetColumns,
      initiaDefaultSearch: initiaDefaultSearch
    }), /*#__PURE__*/React.createElement("table", {
      className: "rare-earth-table",
      role: "table",
      "aria-label": "Data table",
      "aria-rowcount": filteredSortedRecords.length,
      "aria-colcount": columns.order.length + (props.index !== false ? 2 : 0),
      "aria-describedby": tableDescriptionId
    }, /*#__PURE__*/React.createElement("thead", {
      role: "rowgroup"
    }, /*#__PURE__*/React.createElement("tr", null, main_headers), props.index !== false && (/*#__PURE__*/React.createElement("tr", null, sub_headers))), /*#__PURE__*/React.createElement("tbody", {
      role: "rowgroup"
    }, rows)), rows.length === 0 && (/*#__PURE__*/React.createElement("div", {
      className: "rare-earth-no-results",
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
      translate: "yes"
    }, "No Results Found After Filtering")));
  });

  exports.DEBOUNCE_INPUT_TIME_MS = DEBOUNCE_INPUT_TIME_MS;
  exports.DataTable = DataTable;
  exports.FloatingTooltip = FloatingTooltip;
  exports.Pagination = Pagination;
  exports.TableControl = TableControl;
  exports.TableHeader = TableHeader;

}));
