'use strict';

var preact = require('preact');
var hooks = require('preact/hooks');
var React = require('preact/compat');
var $fnFM9$babelruntimehelpersesmextends = require('@babel/runtime/helpers/esm/extends');
require('@babel/runtime/helpers/extends');

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

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  tag.setAttribute('data-s', '');
  return tag;
}

var StyleSheet = /*#__PURE__*/function () {
  // Using Node instead of HTMLElement since container may be a ShadowRoot
  function StyleSheet(options) {
    var _this = this;

    this._insertTag = function (tag) {
      var before;

      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }

      _this.container.insertBefore(tag, before);

      _this.tags.push(tag);
    };

    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

var MS = '-ms-';
var MOZ = '-moz-';
var WEBKIT = '-webkit-';

var COMMENT = 'comm';
var RULESET = 'rule';
var DECLARATION = 'decl';
var IMPORT = '@import';
var KEYFRAMES = '@keyframes';
var LAYER = '@layer';

/**
 * @param {number}
 * @return {number}
 */
var abs = Math.abs;

/**
 * @param {number}
 * @return {string}
 */
var from = String.fromCharCode;

/**
 * @param {object}
 * @return {object}
 */
var assign = Object.assign;

/**
 * @param {string} value
 * @param {number} length
 * @return {number}
 */
function hash (value, length) {
	return charat(value, 0) ^ 45 ? (((((((length << 2) ^ charat(value, 0)) << 2) ^ charat(value, 1)) << 2) ^ charat(value, 2)) << 2) ^ charat(value, 3) : 0
}

/**
 * @param {string} value
 * @return {string}
 */
function trim (value) {
	return value.trim()
}

/**
 * @param {string} value
 * @param {RegExp} pattern
 * @return {string?}
 */
function match (value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value
}

/**
 * @param {string} value
 * @param {(string|RegExp)} pattern
 * @param {string} replacement
 * @return {string}
 */
function replace (value, pattern, replacement) {
	return value.replace(pattern, replacement)
}

/**
 * @param {string} value
 * @param {string} search
 * @return {number}
 */
function indexof (value, search) {
	return value.indexOf(search)
}

/**
 * @param {string} value
 * @param {number} index
 * @return {number}
 */
function charat (value, index) {
	return value.charCodeAt(index) | 0
}

/**
 * @param {string} value
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function substr (value, begin, end) {
	return value.slice(begin, end)
}

/**
 * @param {string} value
 * @return {number}
 */
function strlen (value) {
	return value.length
}

/**
 * @param {any[]} value
 * @return {number}
 */
function sizeof (value) {
	return value.length
}

/**
 * @param {any} value
 * @param {any[]} array
 * @return {any}
 */
function append (value, array) {
	return array.push(value), value
}

/**
 * @param {string[]} array
 * @param {function} callback
 * @return {string}
 */
function combine (array, callback) {
	return array.map(callback).join('')
}

var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = '';

/**
 * @param {string} value
 * @param {object | null} root
 * @param {object | null} parent
 * @param {string} type
 * @param {string[] | string} props
 * @param {object[] | string} children
 * @param {number} length
 */
function node (value, root, parent, type, props, children, length) {
	return {value: value, root: root, parent: parent, type: type, props: props, children: children, line: line, column: column, length: length, return: ''}
}

/**
 * @param {object} root
 * @param {object} props
 * @return {object}
 */
function copy (root, props) {
	return assign(node('', null, null, '', null, null, 0), root, {length: -root.length}, props)
}

/**
 * @return {number}
 */
function char () {
	return character
}

/**
 * @return {number}
 */
function prev () {
	character = position > 0 ? charat(characters, --position) : 0;

	if (column--, character === 10)
		column = 1, line--;

	return character
}

/**
 * @return {number}
 */
function next () {
	character = position < length ? charat(characters, position++) : 0;

	if (column++, character === 10)
		column = 1, line++;

	return character
}

/**
 * @return {number}
 */
function peek () {
	return charat(characters, position)
}

/**
 * @return {number}
 */
function caret () {
	return position
}

/**
 * @param {number} begin
 * @param {number} end
 * @return {string}
 */
function slice (begin, end) {
	return substr(characters, begin, end)
}

/**
 * @param {number} type
 * @return {number}
 */
function token (type) {
	switch (type) {
		// \0 \t \n \r \s whitespace token
		case 0: case 9: case 10: case 13: case 32:
			return 5
		// ! + , / > @ ~ isolate token
		case 33: case 43: case 44: case 47: case 62: case 64: case 126:
		// ; { } breakpoint token
		case 59: case 123: case 125:
			return 4
		// : accompanied token
		case 58:
			return 3
		// " ' ( [ opening delimit token
		case 34: case 39: case 40: case 91:
			return 2
		// ) ] closing delimit token
		case 41: case 93:
			return 1
	}

	return 0
}

/**
 * @param {string} value
 * @return {any[]}
 */
function alloc (value) {
	return line = column = 1, length = strlen(characters = value), position = 0, []
}

/**
 * @param {any} value
 * @return {any}
 */
function dealloc (value) {
	return characters = '', value
}

/**
 * @param {number} type
 * @return {string}
 */
function delimit (type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)))
}

/**
 * @param {number} type
 * @return {string}
 */
function whitespace (type) {
	while (character = peek())
		if (character < 33)
			next();
		else
			break

	return token(type) > 2 || token(character) > 3 ? '' : ' '
}

/**
 * @param {number} index
 * @param {number} count
 * @return {string}
 */
function escaping (index, count) {
	while (--count && next())
		// not 0-9 A-F a-f
		if (character < 48 || character > 102 || (character > 57 && character < 65) || (character > 70 && character < 97))
			break

	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32))
}

/**
 * @param {number} type
 * @return {number}
 */
function delimiter (type) {
	while (next())
		switch (character) {
			// ] ) " '
			case type:
				return position
			// " '
			case 34: case 39:
				if (type !== 34 && type !== 39)
					delimiter(character);
				break
			// (
			case 40:
				if (type === 41)
					delimiter(type);
				break
			// \
			case 92:
				next();
				break
		}

	return position
}

/**
 * @param {number} type
 * @param {number} index
 * @return {number}
 */
function commenter (type, index) {
	while (next())
		// //
		if (type + character === 47 + 10)
			break
		// /*
		else if (type + character === 42 + 42 && peek() === 47)
			break

	return '/*' + slice(index, position - 1) + '*' + from(type === 47 ? type : next())
}

/**
 * @param {number} index
 * @return {string}
 */
function identifier (index) {
	while (!token(peek()))
		next();

	return slice(index, position)
}

/**
 * @param {string} value
 * @return {object[]}
 */
function compile (value) {
	return dealloc(parse('', null, null, null, [''], value = alloc(value), 0, [0], value))
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {string[]} rule
 * @param {string[]} rules
 * @param {string[]} rulesets
 * @param {number[]} pseudo
 * @param {number[]} points
 * @param {string[]} declarations
 * @return {object}
 */
function parse (value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = '';
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;

	while (scanning)
		switch (previous = character, character = next()) {
			// (
			case 40:
				if (previous != 108 && charat(characters, length - 1) == 58) {
					if (indexof(characters += replace(delimit(character), '&', '&\f'), '&\f') != -1)
						ampersand = -1;
					break
				}
			// " ' [
			case 34: case 39: case 91:
				characters += delimit(character);
				break
			// \t \n \r \s
			case 9: case 10: case 13: case 32:
				characters += whitespace(previous);
				break
			// \
			case 92:
				characters += escaping(caret() - 1, 7);
				continue
			// /
			case 47:
				switch (peek()) {
					case 42: case 47:
						append(comment(commenter(next(), caret()), root, parent), declarations);
						break
					default:
						characters += '/';
				}
				break
			// {
			case 123 * variable:
				points[index++] = strlen(characters) * ampersand;
			// } ; \0
			case 125 * variable: case 59: case 0:
				switch (character) {
					// \0 }
					case 0: case 125: scanning = 0;
					// ;
					case 59 + offset: if (ampersand == -1) characters = replace(characters, /\f/g, '');
						if (property > 0 && (strlen(characters) - length))
							append(property > 32 ? declaration(characters + ';', rule, parent, length - 1) : declaration(replace(characters, ' ', '') + ';', rule, parent, length - 2), declarations);
						break
					// @ ;
					case 59: characters += ';';
					// { rule/at-rule
					default:
						append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);

						if (character === 123)
							if (offset === 0)
								parse(characters, root, reference, reference, props, rulesets, length, points, children);
							else
								switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
									// d l m s
									case 100: case 108: case 109: case 115:
										parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
										break
									default:
										parse(characters, reference, reference, reference, [''], children, 0, points, children);
								}
				}

				index = offset = property = 0, variable = ampersand = 1, type = characters = '', length = pseudo;
				break
			// :
			case 58:
				length = 1 + strlen(characters), property = previous;
			default:
				if (variable < 1)
					if (character == 123)
						--variable;
					else if (character == 125 && variable++ == 0 && prev() == 125)
						continue

				switch (characters += from(character), character * variable) {
					// &
					case 38:
						ampersand = offset > 0 ? 1 : (characters += '\f', -1);
						break
					// ,
					case 44:
						points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
						break
					// @
					case 64:
						// -
						if (peek() === 45)
							characters += delimit(next());

						atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
						break
					// -
					case 45:
						if (previous === 45 && strlen(characters) == 2)
							variable = 0;
				}
		}

	return rulesets
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} index
 * @param {number} offset
 * @param {string[]} rules
 * @param {number[]} points
 * @param {string} type
 * @param {string[]} props
 * @param {string[]} children
 * @param {number} length
 * @return {object}
 */
function ruleset (value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [''];
	var size = sizeof(rule);

	for (var i = 0, j = 0, k = 0; i < index; ++i)
		for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
			if (z = trim(j > 0 ? rule[x] + ' ' + y : replace(y, /&\f/g, rule[x])))
				props[k++] = z;

	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length)
}

/**
 * @param {number} value
 * @param {object} root
 * @param {object?} parent
 * @return {object}
 */
function comment (value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0)
}

/**
 * @param {string} value
 * @param {object} root
 * @param {object?} parent
 * @param {number} length
 * @return {object}
 */
function declaration (value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length)
}

/**
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function serialize (children, callback) {
	var output = '';
	var length = sizeof(children);

	for (var i = 0; i < length; i++)
		output += callback(children[i], i, children, callback) || '';

	return output
}

/**
 * @param {object} element
 * @param {number} index
 * @param {object[]} children
 * @param {function} callback
 * @return {string}
 */
function stringify (element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break
		case IMPORT: case DECLARATION: return element.return = element.return || element.value
		case COMMENT: return ''
		case KEYFRAMES: return element.return = element.value + '{' + serialize(element.children, callback) + '}'
		case RULESET: element.value = element.props.join(',');
	}

	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + '{' + children + '}' : ''
}

/**
 * @param {function[]} collection
 * @return {function}
 */
function middleware (collection) {
	var length = sizeof(collection);

	return function (element, index, children, callback) {
		var output = '';

		for (var i = 0; i < length; i++)
			output += collection[i](element, index, children, callback) || '';

		return output
	}
}

/**
 * @param {function} callback
 * @return {function}
 */
function rulesheet (callback) {
	return function (element) {
		if (!element.root)
			if (element = element.return)
				callback(element);
	}
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
  var previous = 0;
  var character = 0;

  while (true) {
    previous = character;
    character = peek(); // &\f

    if (previous === 38 && character === 12) {
      points[index] = 1;
    }

    if (token(character)) {
      break;
    }

    next();
  }

  return slice(begin, position);
};

var toRules = function toRules(parsed, points) {
  // pretend we've started with a comma
  var index = -1;
  var character = 44;

  do {
    switch (token(character)) {
      case 0:
        // &\f
        if (character === 38 && peek() === 12) {
          // this is not 100% correct, we don't account for literal sequences here - like for example quoted strings
          // stylis inserts \f after & to know when & where it should replace this sequence with the context selector
          // and when it should just concatenate the outer and inner selectors
          // it's very unlikely for this sequence to actually appear in a different context, so we just leverage this fact here
          points[index] = 1;
        }

        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;

      case 2:
        parsed[index] += delimit(character);
        break;

      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : '';
          points[index] = parsed[index].length;
          break;
        }

      // fallthrough

      default:
        parsed[index] += from(character);
    }
  } while (character = next());

  return parsed;
};

var getRules = function getRules(value, points) {
  return dealloc(toRules(alloc(value), points));
}; // WeakSet would be more appropriate, but only WeakMap is supported in IE11


var fixedElements = /* #__PURE__ */new WeakMap();
var compat = function compat(element) {
  if (element.type !== 'rule' || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }

  var value = element.value,
      parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;

  while (parent.type !== 'rule') {
    parent = parent.parent;
    if (!parent) return;
  } // short-circuit for the simplest case


  if (element.props.length === 1 && value.charCodeAt(0) !== 58
  /* colon */
  && !fixedElements.get(parent)) {
    return;
  } // if this is an implicitly inserted rule (the one eagerly inserted at the each new nested level)
  // then the props has already been manipulated beforehand as they that array is shared between it and its "rule parent"


  if (isImplicitRule) {
    return;
  }

  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;

  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel(element) {
  if (element.type === 'decl') {
    var value = element.value;

    if ( // charcode for l
    value.charCodeAt(0) === 108 && // charcode for b
    value.charCodeAt(2) === 98) {
      // this ignores label
      element["return"] = '';
      element.value = '';
    }
  }
};

/* eslint-disable no-fallthrough */

function prefix(value, length) {
  switch (hash(value, length)) {
    // color-adjust
    case 5103:
      return WEBKIT + 'print-' + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)

    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921: // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break

    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005: // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,

    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855: // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)

    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust

    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction

    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order

    case 6165:
      return WEBKIT + value + MS + 'flex-' + value + value;
    // align-items

    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') + value;
    // align-self

    case 5443:
      return WEBKIT + value + MS + 'flex-item-' + replace(value, /flex-|-self/, '') + value;
    // align-content

    case 4675:
      return WEBKIT + value + MS + 'flex-line-pack' + replace(value, /align-content|flex-|-self/, '') + value;
    // flex-shrink

    case 5548:
      return WEBKIT + value + MS + replace(value, 'shrink', 'negative') + value;
    // flex-basis

    case 5292:
      return WEBKIT + value + MS + replace(value, 'basis', 'preferred-size') + value;
    // flex-grow

    case 6060:
      return WEBKIT + 'box-' + replace(value, '-grow', '') + WEBKIT + value + MS + replace(value, 'grow', 'positive') + value;
    // transition

    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + value;
    // cursor

    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + '$1'), /(image-set)/, WEBKIT + '$1'), value, '') + value;
    // background, background-image

    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + '$1' + '$`$1');
    // justify-content

    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'), /s.+-b[^;]+/, 'justify') + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)

    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + '$1$2') + value;
    // (min|max)?(width|height|inline-size|block-size)

    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      // stretch, max-content, min-content, fill-available
      if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          // -
          if (charat(value, length + 4) !== 45) break;
        // (f)ill-available, (f)it-content

        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, '$1' + WEBKIT + '$2-$3' + '$1' + MOZ + (charat(value, length + 3) == 108 ? '$3' : '$2-$3')) + value;
        // (s)tretch

        case 115:
          return ~indexof(value, 'stretch') ? prefix(replace(value, 'stretch', 'fill-available'), length) + value : value;
      }
      break;
    // position: sticky

    case 4949:
      // (s)ticky?
      if (charat(value, length + 1) !== 115) break;
    // display: (flex|inline-flex)

    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, '!important') && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ':', ':' + WEBKIT) + value;
        // (inline-)?fl(e)x

        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, '$1' + WEBKIT + (charat(value, 14) === 45 ? 'inline-' : '') + 'box$3' + '$1' + WEBKIT + '$2$3' + '$1' + MS + '$2box$3') + value;
      }

      break;
    // writing-mode

    case 5936:
      switch (charat(value, length + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb') + value;
        // vertical-r(l)

        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'tb-rl') + value;
        // horizontal(-)tb

        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, 'lr') + value;
      }

      return WEBKIT + value + MS + value + value;
  }

  return value;
}

var prefixer = function prefixer(element, index, children, callback) {
  if (element.length > -1) if (!element["return"]) switch (element.type) {
    case DECLARATION:
      element["return"] = prefix(element.value, element.length);
      break;

    case KEYFRAMES:
      return serialize([copy(element, {
        value: replace(element.value, '@', '@' + WEBKIT)
      })], callback);

    case RULESET:
      if (element.length) return combine(element.props, function (value) {
        switch (match(value, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ':read-only':
          case ':read-write':
            return serialize([copy(element, {
              props: [replace(value, /:(read-\w+)/, ':' + MOZ + '$1')]
            })], callback);
          // :placeholder

          case '::placeholder':
            return serialize([copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + WEBKIT + 'input-$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, ':' + MOZ + '$1')]
            }), copy(element, {
              props: [replace(value, /:(plac\w+)/, MS + 'input-$1')]
            })], callback);
        }

        return '';
      });
  }
};

var isBrowser$2 = typeof document !== 'undefined';
var getServerStylisCache = isBrowser$2 ? undefined : weakMemoize(function () {
  return memoize(function () {
    var cache = {};
    return function (name) {
      return cache[name];
    };
  });
});
var defaultStylisPlugins = [prefixer];

var createCache = function createCache(options) {
  var key = options.key;

  if (isBrowser$2 && key === 'css') {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])"); // get SSRed styles out of the way of React's hydration
    // document.head is a safe place to move them to(though note document.head is not necessarily the last place they will be)
    // note this very very intentionally targets all style elements regardless of the key to ensure
    // that creating a cache works inside of render of a React component

    Array.prototype.forEach.call(ssrStyles, function (node) {
      // we want to only move elements which have a space in the data-emotion attribute value
      // because that indicates that it is an Emotion 11 server-side rendered style elements
      // while we will already ignore Emotion 11 client-side inserted styles because of the :not([data-s]) part in the selector
      // Emotion 10 client-side inserted styles did not have data-s (but importantly did not have a space in their data-emotion attributes)
      // so checking for the space ensures that loading Emotion 11 after Emotion 10 has inserted some styles
      // will not result in the Emotion 10 styles being destroyed
      var dataEmotionAttribute = node.getAttribute('data-emotion');

      if (dataEmotionAttribute.indexOf(' ') === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute('data-s', '');
    });
  }

  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;

  var inserted = {};
  var container;
  var nodesToHydrate = [];

  if (isBrowser$2) {
    container = options.container || document.head;
    Array.prototype.forEach.call( // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function (node) {
      var attrib = node.getAttribute("data-emotion").split(' '); // $FlowFixMe

      for (var i = 1; i < attrib.length; i++) {
        inserted[attrib[i]] = true;
      }

      nodesToHydrate.push(node);
    });
  }

  var _insert;

  var omnipresentPlugins = [compat, removeLabel];

  if (isBrowser$2) {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function (rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));

    var stylis = function stylis(styles) {
      return serialize(compile(styles), serializer);
    };

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;

      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);

      if (shouldCache) {
        cache.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stringify];

    var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));

    var _stylis = function _stylis(styles) {
      return serialize(compile(styles), _serializer);
    }; // $FlowFixMe


    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  cache.sheet.hydrate(nodesToHydrate);
  return cache;
};

var reactIsExports = {};
var reactIs$1 = {
  get exports(){ return reactIsExports; },
  set exports(v){ reactIsExports = v; },
};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p;reactIs_production_min.isAsyncMode=function(a){return A(a)||z(a)===l};reactIs_production_min.isConcurrentMode=A;reactIs_production_min.isContextConsumer=function(a){return z(a)===k};reactIs_production_min.isContextProvider=function(a){return z(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z(a)===n};reactIs_production_min.isFragment=function(a){return z(a)===e};reactIs_production_min.isLazy=function(a){return z(a)===t};
reactIs_production_min.isMemo=function(a){return z(a)===r};reactIs_production_min.isPortal=function(a){return z(a)===d};reactIs_production_min.isProfiler=function(a){return z(a)===g};reactIs_production_min.isStrictMode=function(a){return z(a)===f};reactIs_production_min.isSuspense=function(a){return z(a)===p};
reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};reactIs_production_min.typeOf=z;

(function (module) {

	{
	  module.exports = reactIs_production_min;
	}
} (reactIs$1));

var reactIs = reactIsExports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  registerStyles(cache, serialized, isStringTag);
  var className = cache.key + "-" + serialized.name;

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert(serialized === current ? "." + className : '', current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var isProcessableValue = function isProcessableValue(value) {
  return value != null && typeof value !== 'boolean';
};

var processStyleName = /* #__PURE__ */memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

var noComponentSelectorMessage = 'Component selectors can only be used in conjunction with ' + '@emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware ' + 'compiler transform.';

function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles + ";";

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }

        break;
      }
  } // finalize string values (regular strings and functions interpolated into css calls)


  if (registered == null) {
    return interpolation;
  }

  var cached = registered[interpolation];
  return cached !== undefined ? cached : interpolation;
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error(noComponentSelectorMessage);
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {

                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {

    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);

    if (stringMode) {

      styles += strings[i];
    }
  }


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmur2(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

var useInsertionEffect$1 = React__namespace['useInsertion' + 'Effect'] ? React__namespace['useInsertion' + 'Effect'] : false;
var useInsertionEffectWithLayoutFallback = useInsertionEffect$1 || React__namespace.useLayoutEffect;

var isBrowser = typeof document !== 'undefined';

var EmotionCacheContext = /* #__PURE__ */React.createContext( // we're doing this to avoid preconstruct's dead code elimination in this one case
// because this module is primarily intended for the browser and node
// but it's also required in react native and similar environments sometimes
// and we could have a special build just for that
// but this is much easier and the native packages
// might use a different theme context in the future anyway
typeof HTMLElement !== 'undefined' ? /* #__PURE__ */createCache({
  key: 'css'
}) : null);

var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  // $FlowFixMe
  return /*#__PURE__*/React.forwardRef(function (props, ref) {
    // the cache will never be null in the browser
    var cache = React.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  });
};

if (!isBrowser) {
  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      var cache = React.useContext(EmotionCacheContext);

      if (cache === null) {
        // yes, we're potentially creating this on every render
        // it doesn't actually matter though since it's only on the server
        // so there will only every be a single render
        // that could change in the future because of suspense and etc. but for now,
        // this works and i don't want to optimise for a future thing that we aren't sure about
        cache = createCache({
          key: 'css'
        });
        return /*#__PURE__*/React.createElement(EmotionCacheContext.Provider, {
          value: cache
        }, func(props, cache));
      } else {
        return func(props, cache);
      }
    };
  };
}

var ThemeContext = /* #__PURE__ */React.createContext({});

var getTheme = function getTheme(outerTheme, theme) {
  if (typeof theme === 'function') {
    var mergedTheme = theme(outerTheme);

    return mergedTheme;
  }

  return $fnFM9$babelruntimehelpersesmextends({}, outerTheme, theme);
};

var createCacheWithTheme = /* #__PURE__ */weakMemoize(function (outerTheme) {
  return weakMemoize(function (theme) {
    return getTheme(outerTheme, theme);
  });
});
var ThemeProvider = function ThemeProvider(props) {
  var theme = React.useContext(ThemeContext);

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme);
  }

  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};

// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag

var Global = /* #__PURE__ */withEmotionCache(function (props, cache) {

  var styles = props.styles;
  var serialized = serializeStyles([styles], undefined, React.useContext(ThemeContext));

  if (!isBrowser) {
    var _ref;

    var serializedNames = serialized.name;
    var serializedStyles = serialized.styles;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      serializedStyles += next.styles;
      next = next.next;
    }

    var shouldCache = cache.compat === true;
    var rules = cache.insert("", {
      name: serializedNames,
      styles: serializedStyles
    }, cache.sheet, shouldCache);

    if (shouldCache) {
      return null;
    }

    return /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion"] = cache.key + "-global " + serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  } // yes, i know these hooks are used conditionally
  // but it is based on a constant that will never change at runtime
  // it's effectively like having two implementations and switching them out
  // so it's not actually breaking anything


  var sheetRef = React.useRef();
  useInsertionEffectWithLayoutFallback(function () {
    var key = cache.key + "-global"; // use case of https://github.com/emotion-js/emotion/issues/2675

    var sheet = new cache.sheet.constructor({
      key: key,
      nonce: cache.sheet.nonce,
      container: cache.sheet.container,
      speedy: cache.sheet.isSpeedy
    });
    var rehydrating = false; // $FlowFixMe

    var node = document.querySelector("style[data-emotion=\"" + key + " " + serialized.name + "\"]");

    if (cache.sheet.tags.length) {
      sheet.before = cache.sheet.tags[0];
    }

    if (node !== null) {
      rehydrating = true; // clear the hash so this node won't be recognizable as rehydratable by other <Global/>s

      node.setAttribute('data-emotion', key);
      sheet.hydrate([node]);
    }

    sheetRef.current = [sheet, rehydrating];
    return function () {
      sheet.flush();
    };
  }, [cache]);
  useInsertionEffectWithLayoutFallback(function () {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0],
        rehydrating = sheetRefCurrent[1];

    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }

    if (serialized.next !== undefined) {
      // insert keyframes
      insertStyles(cache, serialized.next, true);
    }

    if (sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }

    cache.insert("", serialized, sheet, false);
  }, [cache, serialized.name]);
  return null;
});

function createPolymorphicComponent(component) {
  return component;
}

function createSafeContext(errorMessage) {
  const Context = React.createContext(null);
  const useSafeContext = () => {
    const ctx = React.useContext(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };
  const Provider = ({ children, value }) => /* @__PURE__ */ React.createElement(Context.Provider, {
    value
  }, children);
  return [Provider, useSafeContext];
}

function packSx(sx) {
  return Array.isArray(sx) ? sx : [sx];
}

const noop = () => {
};

function closeOnEscape(callback, options = { active: true }) {
  if (typeof callback !== "function" || !options.active) {
    return options.onKeyDown || noop;
  }
  return (event) => {
    var _a;
    if (event.key === "Escape") {
      callback(event);
      (_a = options.onTrigger) == null ? void 0 : _a.call(options);
    }
  };
}

function groupOptions({ data }) {
  const sortedData = [];
  const unGroupedData = [];
  const groupedData = data.reduce((acc, item, index) => {
    if (item.group) {
      if (acc[item.group])
        acc[item.group].push(index);
      else
        acc[item.group] = [index];
    } else {
      unGroupedData.push(index);
    }
    return acc;
  }, {});
  Object.keys(groupedData).forEach((groupName) => {
    sortedData.push(...groupedData[groupName].map((index) => data[index]));
  });
  sortedData.push(...unGroupedData.map((itemIndex) => data[itemIndex]));
  return sortedData;
}

function isElement$2(value) {
  if (Array.isArray(value) || value === null) {
    return false;
  }
  if (typeof value === "object") {
    if (value.type === React.Fragment) {
      return false;
    }
    return true;
  }
  return false;
}

function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function clsx () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

const DEFAULT_COLORS = {
  dark: [
    "#C1C2C5",
    "#A6A7AB",
    "#909296",
    "#5c5f66",
    "#373A40",
    "#2C2E33",
    "#25262b",
    "#1A1B1E",
    "#141517",
    "#101113"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};

function fontStyles(theme) {
  return () => ({ fontFamily: theme.fontFamily || "sans-serif" });
}

var __defProp$V = Object.defineProperty;
var __getOwnPropSymbols$X = Object.getOwnPropertySymbols;
var __hasOwnProp$X = Object.prototype.hasOwnProperty;
var __propIsEnum$X = Object.prototype.propertyIsEnumerable;
var __defNormalProp$V = (obj, key, value) => key in obj ? __defProp$V(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$V = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$X.call(b, prop))
      __defNormalProp$V(a, prop, b[prop]);
  if (__getOwnPropSymbols$X)
    for (var prop of __getOwnPropSymbols$X(b)) {
      if (__propIsEnum$X.call(b, prop))
        __defNormalProp$V(a, prop, b[prop]);
    }
  return a;
};
function focusStyles(theme) {
  return (selector) => ({
    WebkitTapHighlightColor: "transparent",
    [selector || "&:focus"]: __spreadValues$V({}, theme.focusRing === "always" || theme.focusRing === "auto" ? theme.focusRingStyles.styles(theme) : theme.focusRingStyles.resetStyles(theme)),
    [selector ? selector.replace(":focus", ":focus:not(:focus-visible)") : "&:focus:not(:focus-visible)"]: __spreadValues$V({}, theme.focusRing === "auto" || theme.focusRing === "never" ? theme.focusRingStyles.resetStyles(theme) : null)
  });
}

function primaryShade(theme) {
  return (colorScheme) => {
    if (typeof theme.primaryShade === "number") {
      return theme.primaryShade;
    }
    return theme.primaryShade[colorScheme || theme.colorScheme];
  };
}

function themeColor(theme) {
  const getPrimaryShade = primaryShade(theme);
  return (color, shade, primaryFallback = true, useSplittedShade = true) => {
    if (typeof color === "string" && color.includes(".")) {
      const [splitterColor, _splittedShade] = color.split(".");
      const splittedShade = parseInt(_splittedShade, 10);
      if (splitterColor in theme.colors && splittedShade >= 0 && splittedShade < 10) {
        return theme.colors[splitterColor][typeof shade === "number" && !useSplittedShade ? shade : splittedShade];
      }
    }
    const _shade = typeof shade === "number" ? shade : getPrimaryShade();
    return color in theme.colors ? theme.colors[color][_shade] : primaryFallback ? theme.colors[theme.primaryColor][_shade] : color;
  };
}

function getGradientColorStops(colors) {
  let stops = "";
  for (let i = 1; i < colors.length - 1; i += 1) {
    stops += `${colors[i]} ${i / (colors.length - 1) * 100}%, `;
  }
  return `${colors[0]} 0%, ${stops}${colors[colors.length - 1]} 100%`;
}

function linearGradient(deg, ...colors) {
  return `linear-gradient(${deg}deg, ${getGradientColorStops(colors)})`;
}
function radialGradient(...colors) {
  return `radial-gradient(circle, ${getGradientColorStops(colors)})`;
}
function gradient(theme) {
  const getThemeColor = themeColor(theme);
  const getPrimaryShade = primaryShade(theme);
  return (payload) => {
    const merged = {
      from: (payload == null ? void 0 : payload.from) || theme.defaultGradient.from,
      to: (payload == null ? void 0 : payload.to) || theme.defaultGradient.to,
      deg: (payload == null ? void 0 : payload.deg) || theme.defaultGradient.deg
    };
    return `linear-gradient(${merged.deg}deg, ${getThemeColor(merged.from, getPrimaryShade(), false)} 0%, ${getThemeColor(merged.to, getPrimaryShade(), false)} 100%)`;
  };
}

function createConverter(units) {
  return (px) => {
    if (typeof px === "number") {
      return `${px / 16}${units}`;
    }
    if (typeof px === "string") {
      const replaced = px.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        return `${Number(replaced) / 16}${units}`;
      }
    }
    return px;
  };
}
const rem = createConverter("rem");
const em = createConverter("em");

function getSize({
  size,
  sizes,
  units
}) {
  if (size in sizes) {
    return sizes[size];
  }
  if (typeof size === "number") {
    return units === "em" ? em(size) : rem(size);
  }
  return size || sizes.md;
}

function getBreakpointValue(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string" && value.includes("rem")) {
    return Number(value.replace("rem", "")) * 16;
  }
  if (typeof value === "string" && value.includes("em")) {
    return Number(value.replace("em", "")) * 16;
  }
  return Number(value);
}
function largerThan(theme) {
  return (breakpoint) => `@media (min-width: ${em(getBreakpointValue(getSize({ size: breakpoint, sizes: theme.breakpoints })))})`;
}
function smallerThan(theme) {
  return (breakpoint) => `@media (max-width: ${em(getBreakpointValue(getSize({ size: breakpoint, sizes: theme.breakpoints })) - 1)})`;
}

function isHexColor(hex) {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}$/i;
  return HEX_REGEXP.test(hex);
}
function hexToRgba(color) {
  let hexString = color.replace("#", "");
  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2]
    ].join("");
  }
  const parsed = parseInt(hexString, 16);
  const r = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r,
    g,
    b,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r, g, b, a] = color.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r, g, b, a: a || 1 };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}

function rgba(color, alpha) {
  if (typeof color !== "string" || alpha > 1 || alpha < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  if (color.startsWith("var(--")) {
    return color;
  }
  const { r, g, b } = toRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function cover(offset = 0) {
  return {
    position: "absolute",
    top: rem(offset),
    right: rem(offset),
    left: rem(offset),
    bottom: rem(offset)
  };
}

function darken(color, alpha) {
  if (typeof color === "string" && color.startsWith("var(--")) {
    return color;
  }
  const { r, g, b, a } = toRgba(color);
  const f = 1 - alpha;
  const dark = (input) => Math.round(input * f);
  return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}

function lighten(color, alpha) {
  if (typeof color === "string" && color.startsWith("var(--")) {
    return color;
  }
  const { r, g, b, a } = toRgba(color);
  const light = (input) => Math.round(input + (255 - input) * alpha);
  return `rgba(${light(r)}, ${light(g)}, ${light(b)}, ${a})`;
}

function radius(theme) {
  return (size) => {
    if (typeof size === "number") {
      return rem(size);
    }
    const defaultRadius = typeof theme.defaultRadius === "number" ? theme.defaultRadius : theme.radius[theme.defaultRadius] || theme.defaultRadius;
    return theme.radius[size] || size || defaultRadius;
  };
}

function getColorIndexInfo(color, theme) {
  if (typeof color === "string" && color.includes(".")) {
    const [splittedColor, _splittedShade] = color.split(".");
    const splittedShade = parseInt(_splittedShade, 10);
    if (splittedColor in theme.colors && splittedShade >= 0 && splittedShade < 10) {
      return { isSplittedColor: true, key: splittedColor, shade: splittedShade };
    }
  }
  return { isSplittedColor: false };
}
function variant(theme) {
  const getThemeColor = themeColor(theme);
  const getPrimaryShade = primaryShade(theme);
  const getGradient = gradient(theme);
  return ({ variant: variant2, color, gradient: gradient2, primaryFallback }) => {
    const colorInfo = getColorIndexInfo(color, theme);
    switch (variant2) {
      case "light": {
        return {
          border: "transparent",
          background: rgba(getThemeColor(color, theme.colorScheme === "dark" ? 8 : 0, primaryFallback, false), theme.colorScheme === "dark" ? 0.2 : 1),
          color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : getThemeColor(color, theme.colorScheme === "dark" ? 2 : getPrimaryShade("light")),
          hover: rgba(getThemeColor(color, theme.colorScheme === "dark" ? 7 : 1, primaryFallback, false), theme.colorScheme === "dark" ? 0.25 : 0.65)
        };
      }
      case "subtle": {
        return {
          border: "transparent",
          background: "transparent",
          color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : getThemeColor(color, theme.colorScheme === "dark" ? 2 : getPrimaryShade("light")),
          hover: rgba(getThemeColor(color, theme.colorScheme === "dark" ? 8 : 0, primaryFallback, false), theme.colorScheme === "dark" ? 0.2 : 1)
        };
      }
      case "outline": {
        return {
          border: getThemeColor(color, theme.colorScheme === "dark" ? 5 : getPrimaryShade("light")),
          background: "transparent",
          color: getThemeColor(color, theme.colorScheme === "dark" ? 5 : getPrimaryShade("light")),
          hover: theme.colorScheme === "dark" ? rgba(getThemeColor(color, 5, primaryFallback, false), 0.05) : rgba(getThemeColor(color, 0, primaryFallback, false), 0.35)
        };
      }
      case "default": {
        return {
          border: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4],
          background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
          hover: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[0]
        };
      }
      case "white": {
        return {
          border: "transparent",
          background: theme.white,
          color: getThemeColor(color, getPrimaryShade()),
          hover: null
        };
      }
      case "transparent": {
        return {
          border: "transparent",
          color: color === "dark" ? theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.dark[9] : getThemeColor(color, theme.colorScheme === "dark" ? 2 : getPrimaryShade("light")),
          background: "transparent",
          hover: null
        };
      }
      case "gradient": {
        return {
          background: getGradient(gradient2),
          color: theme.white,
          border: "transparent",
          hover: null
        };
      }
      default: {
        const _primaryShade = getPrimaryShade();
        const _shade = colorInfo.isSplittedColor ? colorInfo.shade : _primaryShade;
        const _color = colorInfo.isSplittedColor ? colorInfo.key : color;
        return {
          border: "transparent",
          background: getThemeColor(_color, _shade, primaryFallback),
          color: theme.white,
          hover: getThemeColor(_color, _shade === 9 ? 8 : _shade + 1)
        };
      }
    }
  };
}

function primaryColor(theme) {
  return (colorScheme) => {
    const shade = primaryShade(theme)(colorScheme);
    return theme.colors[theme.primaryColor][shade];
  };
}

function hover(hoverStyle) {
  return {
    "@media (hover: hover)": {
      "&:hover": hoverStyle
    },
    "@media (hover: none)": {
      "&:active": hoverStyle
    }
  };
}

function placeholderStyles(theme) {
  return () => ({
    userSelect: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
  });
}

function dimmed(theme) {
  return () => theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
}

const fns = {
  fontStyles,
  themeColor,
  focusStyles,
  linearGradient,
  radialGradient,
  smallerThan,
  largerThan,
  rgba,
  cover,
  darken,
  lighten,
  radius,
  variant,
  primaryShade,
  hover,
  gradient,
  primaryColor,
  placeholderStyles,
  dimmed
};

var __defProp$U = Object.defineProperty;
var __defProps$t = Object.defineProperties;
var __getOwnPropDescs$t = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$W = Object.getOwnPropertySymbols;
var __hasOwnProp$W = Object.prototype.hasOwnProperty;
var __propIsEnum$W = Object.prototype.propertyIsEnumerable;
var __defNormalProp$U = (obj, key, value) => key in obj ? __defProp$U(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$U = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$W.call(b, prop))
      __defNormalProp$U(a, prop, b[prop]);
  if (__getOwnPropSymbols$W)
    for (var prop of __getOwnPropSymbols$W(b)) {
      if (__propIsEnum$W.call(b, prop))
        __defNormalProp$U(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$t = (a, b) => __defProps$t(a, __getOwnPropDescs$t(b));
function attachFunctions(themeBase) {
  return __spreadProps$t(__spreadValues$U({}, themeBase), {
    fn: {
      fontStyles: fns.fontStyles(themeBase),
      themeColor: fns.themeColor(themeBase),
      focusStyles: fns.focusStyles(themeBase),
      largerThan: fns.largerThan(themeBase),
      smallerThan: fns.smallerThan(themeBase),
      radialGradient: fns.radialGradient,
      linearGradient: fns.linearGradient,
      gradient: fns.gradient(themeBase),
      rgba: fns.rgba,
      cover: fns.cover,
      lighten: fns.lighten,
      darken: fns.darken,
      primaryShade: fns.primaryShade(themeBase),
      radius: fns.radius(themeBase),
      variant: fns.variant(themeBase),
      hover: fns.hover,
      primaryColor: fns.primaryColor(themeBase),
      placeholderStyles: fns.placeholderStyles(themeBase),
      dimmed: fns.dimmed(themeBase)
    }
  });
}

const _DEFAULT_THEME = {
  dir: "ltr",
  primaryShade: {
    light: 6,
    dark: 8
  },
  focusRing: "auto",
  loader: "oval",
  colorScheme: "light",
  white: "#fff",
  black: "#000",
  defaultRadius: "sm",
  transitionTimingFunction: "ease",
  colors: DEFAULT_COLORS,
  lineHeight: 1.55,
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  primaryColor: "blue",
  respectReducedMotion: true,
  cursorType: "default",
  defaultGradient: {
    from: "indigo",
    to: "cyan",
    deg: 45
  },
  shadows: {
    xs: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)",
    sm: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.4375rem 0.4375rem -0.3125rem",
    md: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.25rem 1.5625rem -0.3125rem, rgba(0, 0, 0, 0.04) 0 0.625rem 0.625rem -0.3125rem",
    lg: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 1.75rem 1.4375rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 0.75rem 0.75rem -0.4375rem",
    xl: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 2.25rem 1.75rem -0.4375rem, rgba(0, 0, 0, 0.04) 0 1.0625rem 1.0625rem -0.4375rem"
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem"
  },
  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "2rem"
  },
  spacing: {
    xs: "0.625rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem"
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  headings: {
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    fontWeight: 700,
    sizes: {
      h1: { fontSize: "2.125rem", lineHeight: 1.3, fontWeight: void 0 },
      h2: { fontSize: "1.625rem", lineHeight: 1.35, fontWeight: void 0 },
      h3: { fontSize: "1.375rem", lineHeight: 1.4, fontWeight: void 0 },
      h4: { fontSize: "1.125rem", lineHeight: 1.45, fontWeight: void 0 },
      h5: { fontSize: "1rem", lineHeight: 1.5, fontWeight: void 0 },
      h6: { fontSize: "0.875rem", lineHeight: 1.5, fontWeight: void 0 }
    }
  },
  other: {},
  components: {},
  activeStyles: { transform: "translateY(0.0625rem)" },
  datesLocale: "en",
  globalStyles: void 0,
  focusRingStyles: {
    styles: (theme) => ({
      outlineOffset: "0.125rem",
      outline: `0.125rem solid ${theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5]}`
    }),
    resetStyles: () => ({ outline: "none" }),
    inputStyles: (theme) => ({
      outline: "none",
      borderColor: theme.colors[theme.primaryColor][typeof theme.primaryShade === "object" ? theme.primaryShade[theme.colorScheme] : theme.primaryShade]
    })
  }
};
const DEFAULT_THEME = attachFunctions(_DEFAULT_THEME);

var __defProp$T = Object.defineProperty;
var __defProps$s = Object.defineProperties;
var __getOwnPropDescs$s = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$V = Object.getOwnPropertySymbols;
var __hasOwnProp$V = Object.prototype.hasOwnProperty;
var __propIsEnum$V = Object.prototype.propertyIsEnumerable;
var __defNormalProp$T = (obj, key, value) => key in obj ? __defProp$T(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$T = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$V.call(b, prop))
      __defNormalProp$T(a, prop, b[prop]);
  if (__getOwnPropSymbols$V)
    for (var prop of __getOwnPropSymbols$V(b)) {
      if (__propIsEnum$V.call(b, prop))
        __defNormalProp$T(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$s = (a, b) => __defProps$s(a, __getOwnPropDescs$s(b));
function GlobalStyles({ theme }) {
  return /* @__PURE__ */ React.createElement(Global, {
    styles: {
      "*, *::before, *::after": {
        boxSizing: "border-box"
      },
      html: {
        colorScheme: theme.colorScheme === "dark" ? "dark" : "light"
      },
      body: __spreadProps$s(__spreadValues$T({}, theme.fn.fontStyles()), {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        lineHeight: theme.lineHeight,
        fontSize: theme.fontSizes.md,
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale"
      })
    }
  });
}

function assignSizeVariables(variables, sizes, name, targetUnitConverter = rem) {
  Object.keys(sizes).forEach((size) => {
    variables[`--mantine-${name}-${size}`] = targetUnitConverter(sizes[size]);
  });
}
function MantineCssVariables({ theme }) {
  const variables = {
    "--mantine-color-white": theme.white,
    "--mantine-color-black": theme.black,
    "--mantine-transition-timing-function": theme.transitionTimingFunction,
    "--mantine-line-height": `${theme.lineHeight}`,
    "--mantine-font-family": theme.fontFamily,
    "--mantine-font-family-monospace": theme.fontFamilyMonospace,
    "--mantine-font-family-headings": theme.headings.fontFamily,
    "--mantine-heading-font-weight": `${theme.headings.fontWeight}`
  };
  assignSizeVariables(variables, theme.shadows, "shadow");
  assignSizeVariables(variables, theme.fontSizes, "font-size");
  assignSizeVariables(variables, theme.radius, "radius");
  assignSizeVariables(variables, theme.spacing, "spacing");
  assignSizeVariables(variables, theme.breakpoints, "breakpoints", em);
  Object.keys(theme.colors).forEach((color) => {
    theme.colors[color].forEach((shade, index) => {
      variables[`--mantine-color-${color}-${index}`] = shade;
    });
  });
  const headings = theme.headings.sizes;
  Object.keys(headings).forEach((heading) => {
    variables[`--mantine-${heading}-font-size`] = headings[heading].fontSize;
    variables[`--mantine-${heading}-line-height`] = `${headings[heading].lineHeight}`;
  });
  return /* @__PURE__ */ React.createElement(Global, {
    styles: {
      ":root": variables
    }
  });
}

var __defProp$S = Object.defineProperty;
var __defProps$r = Object.defineProperties;
var __getOwnPropDescs$r = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$U = Object.getOwnPropertySymbols;
var __hasOwnProp$U = Object.prototype.hasOwnProperty;
var __propIsEnum$U = Object.prototype.propertyIsEnumerable;
var __defNormalProp$S = (obj, key, value) => key in obj ? __defProp$S(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$S = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$U.call(b, prop))
      __defNormalProp$S(a, prop, b[prop]);
  if (__getOwnPropSymbols$U)
    for (var prop of __getOwnPropSymbols$U(b)) {
      if (__propIsEnum$U.call(b, prop))
        __defNormalProp$S(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$r = (a, b) => __defProps$r(a, __getOwnPropDescs$r(b));
function mergeTheme(currentTheme, themeOverride) {
  var _a;
  if (!themeOverride) {
    return currentTheme;
  }
  const result = Object.keys(currentTheme).reduce((acc, key) => {
    if (key === "headings" && themeOverride.headings) {
      const sizes = themeOverride.headings.sizes ? Object.keys(currentTheme.headings.sizes).reduce((headingsAcc, h) => {
        headingsAcc[h] = __spreadValues$S(__spreadValues$S({}, currentTheme.headings.sizes[h]), themeOverride.headings.sizes[h]);
        return headingsAcc;
      }, {}) : currentTheme.headings.sizes;
      return __spreadProps$r(__spreadValues$S({}, acc), {
        headings: __spreadProps$r(__spreadValues$S(__spreadValues$S({}, currentTheme.headings), themeOverride.headings), {
          sizes
        })
      });
    }
    acc[key] = typeof themeOverride[key] === "object" ? __spreadValues$S(__spreadValues$S({}, currentTheme[key]), themeOverride[key]) : typeof themeOverride[key] === "number" || typeof themeOverride[key] === "boolean" || typeof themeOverride[key] === "function" ? themeOverride[key] : themeOverride[key] || currentTheme[key];
    return acc;
  }, {});
  if ((themeOverride == null ? void 0 : themeOverride.fontFamily) && !((_a = themeOverride == null ? void 0 : themeOverride.headings) == null ? void 0 : _a.fontFamily)) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }
  if (!(result.primaryColor in result.colors)) {
    throw new Error("MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more \u2013 https://mantine.dev/theming/colors/#primary-color");
  }
  return result;
}
function mergeThemeWithFunctions(currentTheme, themeOverride) {
  return attachFunctions(mergeTheme(currentTheme, themeOverride));
}

function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}

const styles = {
  html: {
    fontFamily: "sans-serif",
    lineHeight: "1.15",
    textSizeAdjust: "100%"
  },
  body: {
    margin: 0
  },
  "article, aside, footer, header, nav, section, figcaption, figure, main": {
    display: "block"
  },
  h1: {
    fontSize: "2em"
  },
  hr: {
    boxSizing: "content-box",
    height: 0,
    overflow: "visible"
  },
  pre: {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  a: {
    background: "transparent",
    textDecorationSkip: "objects"
  },
  "a:active, a:hover": {
    outlineWidth: 0
  },
  "abbr[title]": {
    borderBottom: "none",
    textDecoration: "underline"
  },
  "b, strong": {
    fontWeight: "bolder"
  },
  "code, kbp, samp": {
    fontFamily: "monospace, monospace",
    fontSize: "1em"
  },
  dfn: {
    fontStyle: "italic"
  },
  mark: {
    backgroundColor: "#ff0",
    color: "#000"
  },
  small: {
    fontSize: "80%"
  },
  "sub, sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline"
  },
  sup: {
    top: "-0.5em"
  },
  sub: {
    bottom: "-0.25em"
  },
  "audio, video": {
    display: "inline-block"
  },
  "audio:not([controls])": {
    display: "none",
    height: 0
  },
  img: {
    borderStyle: "none",
    verticalAlign: "middle"
  },
  "svg:not(:root)": {
    overflow: "hidden"
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "sans-serif",
    fontSize: "100%",
    lineHeight: "1.15",
    margin: 0
  },
  "button, input": {
    overflow: "visible"
  },
  "button, select": {
    textTransform: "none"
  },
  "button, [type=reset], [type=submit]": {
    WebkitAppearance: "button"
  },
  "button::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner": {
    borderStyle: "none",
    padding: 0
  },
  "button:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring": {
    outline: `${rem(1)} dotted ButtonText`
  },
  legend: {
    boxSizing: "border-box",
    color: "inherit",
    display: "table",
    maxWidth: "100%",
    padding: 0,
    whiteSpace: "normal"
  },
  progress: {
    display: "inline-block",
    verticalAlign: "baseline"
  },
  textarea: {
    overflow: "auto"
  },
  "[type=checkbox], [type=radio]": {
    boxSizing: "border-box",
    padding: 0
  },
  "[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button": {
    height: "auto"
  },
  "[type=search]": {
    appearance: "none"
  },
  "[type=search]::-webkit-search-cancel-button, [type=search]::-webkit-search-decoration": {
    appearance: "none"
  },
  "::-webkit-file-upload-button": {
    appearance: "button",
    font: "inherit"
  },
  "details, menu": {
    display: "block"
  },
  summary: {
    display: "list-item"
  },
  canvas: {
    display: "inline-block"
  },
  template: {
    display: "none"
  }
};
function NormalizeCSS() {
  return /* @__PURE__ */ React.createElement(Global, {
    styles
  });
}

var __defProp$R = Object.defineProperty;
var __getOwnPropSymbols$T = Object.getOwnPropertySymbols;
var __hasOwnProp$T = Object.prototype.hasOwnProperty;
var __propIsEnum$T = Object.prototype.propertyIsEnumerable;
var __defNormalProp$R = (obj, key, value) => key in obj ? __defProp$R(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$R = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$T.call(b, prop))
      __defNormalProp$R(a, prop, b[prop]);
  if (__getOwnPropSymbols$T)
    for (var prop of __getOwnPropSymbols$T(b)) {
      if (__propIsEnum$T.call(b, prop))
        __defNormalProp$R(a, prop, b[prop]);
    }
  return a;
};
const MantineProviderContext = React.createContext({
  theme: DEFAULT_THEME
});
function useMantineTheme() {
  var _a;
  return ((_a = React.useContext(MantineProviderContext)) == null ? void 0 : _a.theme) || DEFAULT_THEME;
}
function useMantineProviderStyles(component) {
  const theme = useMantineTheme();
  const getStyles = (name) => {
    var _a, _b, _c, _d;
    return {
      styles: ((_a = theme.components[name]) == null ? void 0 : _a.styles) || {},
      classNames: ((_b = theme.components[name]) == null ? void 0 : _b.classNames) || {},
      variants: (_c = theme.components[name]) == null ? void 0 : _c.variants,
      sizes: (_d = theme.components[name]) == null ? void 0 : _d.sizes
    };
  };
  if (Array.isArray(component)) {
    return component.map(getStyles);
  }
  return [getStyles(component)];
}
function useMantineEmotionCache() {
  var _a;
  return (_a = React.useContext(MantineProviderContext)) == null ? void 0 : _a.emotionCache;
}
function useComponentDefaultProps(component, defaultProps, props) {
  var _a;
  const theme = useMantineTheme();
  const contextPropsPayload = (_a = theme.components[component]) == null ? void 0 : _a.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
  return __spreadValues$R(__spreadValues$R(__spreadValues$R({}, defaultProps), contextProps), filterProps(props));
}
function MantineProvider({
  theme,
  emotionCache,
  withNormalizeCSS = false,
  withGlobalStyles = false,
  withCSSVariables = false,
  inherit = false,
  children
}) {
  const ctx = React.useContext(MantineProviderContext);
  const mergedTheme = mergeThemeWithFunctions(DEFAULT_THEME, inherit ? __spreadValues$R(__spreadValues$R({}, ctx.theme), theme) : theme);
  return /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme: mergedTheme
  }, /* @__PURE__ */ React.createElement(MantineProviderContext.Provider, {
    value: { theme: mergedTheme, emotionCache }
  }, withNormalizeCSS && /* @__PURE__ */ React.createElement(NormalizeCSS, null), withGlobalStyles && /* @__PURE__ */ React.createElement(GlobalStyles, {
    theme: mergedTheme
  }), withCSSVariables && /* @__PURE__ */ React.createElement(MantineCssVariables, {
    theme: mergedTheme
  }), typeof mergedTheme.globalStyles === "function" && /* @__PURE__ */ React.createElement(Global, {
    styles: mergedTheme.globalStyles(mergedTheme)
  }), children));
}
MantineProvider.displayName = "@mantine/core/MantineProvider";

const elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function getDefaultZIndex(level) {
  return elevations[level];
}

function useGuaranteedMemo(fn, deps) {
  const ref = React.useRef();
  if (!ref.current || deps.length !== ref.current.prevDeps.length || ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0) {
    ref.current = {
      v: fn(),
      prevDeps: [...deps]
    };
  }
  return ref.current.v;
}

const defaultMantineEmotionCache = createCache({ key: "mantine", prepend: true });

function useEmotionCache() {
  const cache = useMantineEmotionCache();
  return cache || defaultMantineEmotionCache;
}

var __defProp$Q = Object.defineProperty;
var __getOwnPropSymbols$S = Object.getOwnPropertySymbols;
var __hasOwnProp$S = Object.prototype.hasOwnProperty;
var __propIsEnum$S = Object.prototype.propertyIsEnumerable;
var __defNormalProp$Q = (obj, key, value) => key in obj ? __defProp$Q(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$Q = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$S.call(b, prop))
      __defNormalProp$Q(a, prop, b[prop]);
  if (__getOwnPropSymbols$S)
    for (var prop of __getOwnPropSymbols$S(b)) {
      if (__propIsEnum$S.call(b, prop))
        __defNormalProp$Q(a, prop, b[prop]);
    }
  return a;
};
const refPropertyName = "ref";
function getRef(args) {
  let ref;
  if (args.length !== 1) {
    return { args, ref };
  }
  const [arg] = args;
  if (!(arg instanceof Object)) {
    return { args, ref };
  }
  if (!(refPropertyName in arg)) {
    return { args, ref };
  }
  ref = arg[refPropertyName];
  const argCopy = __spreadValues$Q({}, arg);
  delete argCopy[refPropertyName];
  return { args: [argCopy], ref };
}
const { cssFactory } = (() => {
  function merge(registered, css, className) {
    const registeredStyles = [];
    const rawClassName = getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css(registeredStyles);
  }
  function _cssFactory(params) {
    const { cache } = params;
    const css = (...styles) => {
      const { ref, args } = getRef(styles);
      const serialized = serializeStyles(args, cache.registered);
      insertStyles(cache, serialized, false);
      return `${cache.key}-${serialized.name}${ref === void 0 ? "" : ` ${ref}`}`;
    };
    const cx = (...args) => merge(cache.registered, css, clsx(args));
    return { css, cx };
  }
  return { cssFactory: _cssFactory };
})();
function useCss() {
  const cache = useEmotionCache();
  return useGuaranteedMemo(() => cssFactory({ cache }), [cache]);
}

function mergeClassNames({
  cx,
  classes,
  context,
  classNames,
  name,
  cache
}) {
  const contextClassNames = context.reduce((acc, item) => {
    Object.keys(item.classNames).forEach((key) => {
      if (typeof acc[key] !== "string") {
        acc[key] = `${item.classNames[key]}`;
      } else {
        acc[key] = `${acc[key]} ${item.classNames[key]}`;
      }
    });
    return acc;
  }, {});
  return Object.keys(classes).reduce((acc, className) => {
    acc[className] = cx(classes[className], contextClassNames[className], classNames != null && classNames[className], Array.isArray(name) ? name.filter(Boolean).map((part) => `${(cache == null ? void 0 : cache.key) || "mantine"}-${part}-${className}`).join(" ") : name ? `${(cache == null ? void 0 : cache.key) || "mantine"}-${name}-${className}` : null);
    return acc;
  }, {});
}

var __defProp$P = Object.defineProperty;
var __getOwnPropSymbols$R = Object.getOwnPropertySymbols;
var __hasOwnProp$R = Object.prototype.hasOwnProperty;
var __propIsEnum$R = Object.prototype.propertyIsEnumerable;
var __defNormalProp$P = (obj, key, value) => key in obj ? __defProp$P(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$P = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$R.call(b, prop))
      __defNormalProp$P(a, prop, b[prop]);
  if (__getOwnPropSymbols$R)
    for (var prop of __getOwnPropSymbols$R(b)) {
      if (__propIsEnum$R.call(b, prop))
        __defNormalProp$P(a, prop, b[prop]);
    }
  return a;
};
function assignAccStyles(acc, styles) {
  if (styles) {
    Object.keys(styles).forEach((key) => {
      if (!acc[key]) {
        acc[key] = __spreadValues$P({}, styles[key]);
      } else {
        acc[key] = __spreadValues$P(__spreadValues$P({}, acc[key]), styles[key]);
      }
    });
  }
  return acc;
}
function getStyles(styles, theme, params, contextParams) {
  const extractStyles = (stylesPartial) => typeof stylesPartial === "function" ? stylesPartial(theme, params || {}, contextParams) : stylesPartial || {};
  if (Array.isArray(styles)) {
    return styles.map((item) => extractStyles(item.styles)).reduce((acc, item) => assignAccStyles(acc, item), {});
  }
  return extractStyles(styles);
}
function getContextVariation({ ctx, theme, params, variant, size }) {
  return ctx.reduce((acc, item) => {
    if (item.variants && variant in item.variants) {
      assignAccStyles(acc, item.variants[variant](theme, params, { variant, size }));
    }
    if (item.sizes && size in item.sizes) {
      assignAccStyles(acc, item.sizes[size](theme, params, { variant, size }));
    }
    return acc;
  }, {});
}
function createStyles(input) {
  const getCssObject = typeof input === "function" ? input : () => input;
  function useStyles(params, options) {
    const theme = useMantineTheme();
    const context = useMantineProviderStyles(options == null ? void 0 : options.name);
    const cache = useMantineEmotionCache();
    const contextParams = { variant: options == null ? void 0 : options.variant, size: options == null ? void 0 : options.size };
    const { css, cx } = useCss();
    const cssObject = getCssObject(theme, params, contextParams);
    const componentStyles = getStyles(options == null ? void 0 : options.styles, theme, params, contextParams);
    const providerStyles = getStyles(context, theme, params, contextParams);
    const contextVariations = getContextVariation({
      ctx: context,
      theme,
      params,
      variant: options == null ? void 0 : options.variant,
      size: options == null ? void 0 : options.size
    });
    const classes = Object.fromEntries(Object.keys(cssObject).map((key) => {
      const mergedStyles = cx({ [css(cssObject[key])]: !(options == null ? void 0 : options.unstyled) }, css(contextVariations[key]), css(providerStyles[key]), css(componentStyles[key]));
      return [key, mergedStyles];
    }));
    return {
      classes: mergeClassNames({
        cx,
        classes,
        context,
        classNames: options == null ? void 0 : options.classNames,
        name: options == null ? void 0 : options.name,
        cache
      }),
      cx,
      theme
    };
  }
  return useStyles;
}

function getStylesRef(refName) {
  return `___ref-${refName || ""}`;
}

var __defProp$O = Object.defineProperty;
var __defProps$q = Object.defineProperties;
var __getOwnPropDescs$q = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$Q = Object.getOwnPropertySymbols;
var __hasOwnProp$Q = Object.prototype.hasOwnProperty;
var __propIsEnum$Q = Object.prototype.propertyIsEnumerable;
var __defNormalProp$O = (obj, key, value) => key in obj ? __defProp$O(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$O = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$Q.call(b, prop))
      __defNormalProp$O(a, prop, b[prop]);
  if (__getOwnPropSymbols$Q)
    for (var prop of __getOwnPropSymbols$Q(b)) {
      if (__propIsEnum$Q.call(b, prop))
        __defNormalProp$O(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$q = (a, b) => __defProps$q(a, __getOwnPropDescs$q(b));
const popIn = {
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${rem(10)})` },
  transitionProperty: "transform, opacity"
};
const transitions = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity"
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: `translateY(-${rem(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) rotate(-5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) rotate(5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity"
  },
  pop: __spreadProps$q(__spreadValues$O({}, popIn), {
    common: { transformOrigin: "center center" }
  }),
  "pop-bottom-left": __spreadProps$q(__spreadValues$O({}, popIn), {
    common: { transformOrigin: "bottom left" }
  }),
  "pop-bottom-right": __spreadProps$q(__spreadValues$O({}, popIn), {
    common: { transformOrigin: "bottom right" }
  }),
  "pop-top-left": __spreadProps$q(__spreadValues$O({}, popIn), {
    common: { transformOrigin: "top left" }
  }),
  "pop-top-right": __spreadProps$q(__spreadValues$O({}, popIn), {
    common: { transformOrigin: "top right" }
  })
};

const DEFAULT_EVENTS = ["mousedown", "touchstart"];
function useClickOutside(handler, events, nodes) {
  const ref = React.useRef();
  React.useEffect(() => {
    const listener = (event) => {
      const { target } = event != null ? event : {};
      if (Array.isArray(nodes)) {
        const shouldIgnore = (target == null ? void 0 : target.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(target) && target.tagName !== "HTML";
        const shouldTrigger = nodes.every((node) => !!node && !event.composedPath().includes(node));
        shouldTrigger && !shouldIgnore && handler();
      } else if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };
    (events || DEFAULT_EVENTS).forEach((fn) => document.addEventListener(fn, listener));
    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [ref, handler, nodes]);
  return ref;
}

function attachMediaListener(query, callback) {
  try {
    query.addEventListener("change", callback);
    return () => query.removeEventListener("change", callback);
  } catch (e) {
    query.addListener(callback);
    return () => query.removeListener(callback);
  }
}
function getInitialValue(query, initialValue) {
  if (typeof initialValue === "boolean") {
    return initialValue;
  }
  if (typeof window !== "undefined" && "matchMedia" in window) {
    return window.matchMedia(query).matches;
  }
  return false;
}
function useMediaQuery(query, initialValue, { getInitialValueInEffect } = {
  getInitialValueInEffect: true
}) {
  const [matches, setMatches] = React.useState(getInitialValueInEffect ? initialValue : getInitialValue(query, initialValue));
  const queryRef = React.useRef();
  React.useEffect(() => {
    if ("matchMedia" in window) {
      queryRef.current = window.matchMedia(query);
      setMatches(queryRef.current.matches);
      return attachMediaListener(queryRef.current, (event) => setMatches(event.matches));
    }
    return void 0;
  }, [query]);
  return matches;
}

const useIsomorphicEffect = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;

function useDidUpdate(fn, dependencies) {
  const mounted = React.useRef(false);
  React.useEffect(() => () => {
    mounted.current = false;
  }, []);
  React.useEffect(() => {
    if (mounted.current) {
      return fn();
    }
    mounted.current = true;
    return void 0;
  }, dependencies);
}

function useFocusReturn({ opened, shouldReturnFocus = true }) {
  const lastActiveElement = React.useRef();
  const returnFocus = () => {
    var _a;
    if (lastActiveElement.current && "focus" in lastActiveElement.current && typeof lastActiveElement.current.focus === "function") {
      (_a = lastActiveElement.current) == null ? void 0 : _a.focus({ preventScroll: true });
    }
  };
  useDidUpdate(() => {
    let timeout = -1;
    const clearFocusTimeout = (event) => {
      if (event.key === "Tab") {
        window.clearTimeout(timeout);
      }
    };
    document.addEventListener("keydown", clearFocusTimeout);
    if (opened) {
      lastActiveElement.current = document.activeElement;
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, 10);
    }
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", clearFocusTimeout);
    };
  }, [opened, shouldReturnFocus]);
  return returnFocus;
}

const TABBABLE_NODES = /input|select|textarea|button|object/;
const FOCUS_SELECTOR = "a, input, select, textarea, button, object, [tabindex]";
function hidden(element) {
  return element.style.display === "none";
}
function visible(element) {
  const isHidden = element.getAttribute("aria-hidden") || element.getAttribute("hidden") || element.getAttribute("type") === "hidden";
  if (isHidden) {
    return false;
  }
  let parentElement = element;
  while (parentElement) {
    if (parentElement === document.body || parentElement.nodeType === 11) {
      break;
    }
    if (hidden(parentElement)) {
      return false;
    }
    parentElement = parentElement.parentNode;
  }
  return true;
}
function getElementTabIndex(element) {
  let tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) {
    tabIndex = void 0;
  }
  return parseInt(tabIndex, 10);
}
function focusable(element) {
  const nodeName = element.nodeName.toLowerCase();
  const isTabIndexNotNaN = !Number.isNaN(getElementTabIndex(element));
  const res = TABBABLE_NODES.test(nodeName) && !element.disabled || (element instanceof HTMLAnchorElement ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}
function tabbable(element) {
  const tabIndex = getElementTabIndex(element);
  const isTabIndexNaN = Number.isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element);
}
function findTabbableDescendants(element) {
  return Array.from(element.querySelectorAll(FOCUS_SELECTOR)).filter(tabbable);
}

function scopeTab(node, event) {
  const tabbable = findTabbableDescendants(node);
  if (!tabbable.length) {
    event.preventDefault();
    return;
  }
  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  const root = node.getRootNode();
  const leavingFinalTabbable = finalTabbable === root.activeElement || node === root.activeElement;
  if (!leavingFinalTabbable) {
    return;
  }
  event.preventDefault();
  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
  if (target) {
    target.focus();
  }
}

function createAriaHider(containerNode, selector = "body > :not(script)") {
  const rootNodes = Array.from(document.querySelectorAll(selector)).map((node) => {
    var _a;
    if (((_a = node == null ? void 0 : node.shadowRoot) == null ? void 0 : _a.contains(containerNode)) || node.contains(containerNode)) {
      return void 0;
    }
    const ariaHidden = node.getAttribute("aria-hidden");
    if (ariaHidden === null || ariaHidden === "false") {
      node.setAttribute("aria-hidden", "true");
    }
    return { node, ariaHidden };
  });
  return () => {
    rootNodes.forEach((item) => {
      if (!item) {
        return;
      }
      if (item.ariaHidden === null) {
        item.node.removeAttribute("aria-hidden");
      } else {
        item.node.setAttribute("aria-hidden", item.ariaHidden);
      }
    });
  };
}

function useFocusTrap(active = true) {
  const ref = React.useRef();
  const restoreAria = React.useRef(null);
  const focusNode = (node) => {
    let focusElement = node.querySelector("[data-autofocus]");
    if (!focusElement) {
      const children = Array.from(node.querySelectorAll(FOCUS_SELECTOR));
      focusElement = children.find(tabbable) || children.find(focusable) || null;
      if (!focusElement && focusable(node))
        focusElement = node;
    }
    if (focusElement) {
      focusElement.focus({ preventScroll: true });
    }
  };
  const setRef = React.useCallback((node) => {
    if (!active) {
      return;
    }
    if (node === null) {
      if (restoreAria.current) {
        restoreAria.current();
        restoreAria.current = null;
      }
      return;
    }
    restoreAria.current = createAriaHider(node);
    if (ref.current === node) {
      return;
    }
    if (node) {
      setTimeout(() => {
        if (node.getRootNode()) {
          focusNode(node);
        }
      });
      ref.current = node;
    } else {
      ref.current = null;
    }
  }, [active]);
  React.useEffect(() => {
    if (!active) {
      return void 0;
    }
    ref.current && setTimeout(() => focusNode(ref.current));
    const handleKeyDown = (event) => {
      if (event.key === "Tab" && ref.current) {
        scopeTab(ref.current, event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (restoreAria.current) {
        restoreAria.current();
      }
    };
  }, [active]);
  return setRef;
}

const __useId = React["useId".toString()] || (() => void 0);
function useReactId$1() {
  const id = __useId();
  return id ? `mantine-${id.replace(/:/g, "")}` : "";
}

function randomId() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}

function useId$1(staticId) {
  const reactId = useReactId$1();
  const [uuid, setUuid] = React.useState(reactId);
  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);
  if (typeof staticId === "string") {
    return staticId;
  }
  if (typeof window === "undefined") {
    return reactId;
  }
  return uuid;
}

function useWindowEvent(type, listener, options) {
  React.useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, [type, listener]);
}

function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    ref.current = value;
  }
}

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}
function useMergedRef(...refs) {
  return React.useCallback(mergeRefs(...refs), refs);
}

function useUncontrolled({
  value,
  defaultValue,
  finalValue,
  onChange = () => {
  }
}) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue !== void 0 ? defaultValue : finalValue);
  const handleUncontrolledChange = (val) => {
    setUncontrolledValue(val);
    onChange == null ? void 0 : onChange(val);
  };
  if (value !== void 0) {
    return [value, onChange, true];
  }
  return [uncontrolledValue, handleUncontrolledChange, false];
}

function useReducedMotion(initialValue, options) {
  return useMediaQuery("(prefers-reduced-motion: reduce)", initialValue, options);
}

const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const getRelativePosition = ({
  axis,
  target,
  parent,
  alignment,
  offset,
  isList
}) => {
  if (!target || !parent && typeof document === "undefined") {
    return 0;
  }
  const isCustomParent = !!parent;
  const parentElement = parent || document.body;
  const parentPosition = parentElement.getBoundingClientRect();
  const targetPosition = target.getBoundingClientRect();
  const getDiff = (property) => targetPosition[property] - parentPosition[property];
  if (axis === "y") {
    const diff = getDiff("top");
    if (diff === 0)
      return 0;
    if (alignment === "start") {
      const distance = diff - offset;
      const shouldScroll = distance <= targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }
    const parentHeight = isCustomParent ? parentPosition.height : window.innerHeight;
    if (alignment === "end") {
      const distance = diff + offset - parentHeight + targetPosition.height;
      const shouldScroll = distance >= -targetPosition.height * (isList ? 0 : 1) || !isList;
      return shouldScroll ? distance : 0;
    }
    if (alignment === "center") {
      return diff - parentHeight / 2 + targetPosition.height / 2;
    }
    return 0;
  }
  if (axis === "x") {
    const diff = getDiff("left");
    if (diff === 0)
      return 0;
    if (alignment === "start") {
      const distance = diff - offset;
      const shouldScroll = distance <= targetPosition.width || !isList;
      return shouldScroll ? distance : 0;
    }
    const parentWidth = isCustomParent ? parentPosition.width : window.innerWidth;
    if (alignment === "end") {
      const distance = diff + offset - parentWidth + targetPosition.width;
      const shouldScroll = distance >= -targetPosition.width || !isList;
      return shouldScroll ? distance : 0;
    }
    if (alignment === "center") {
      return diff - parentWidth / 2 + targetPosition.width / 2;
    }
    return 0;
  }
  return 0;
};

const getScrollStart = ({ axis, parent }) => {
  if (!parent && typeof document === "undefined") {
    return 0;
  }
  const method = axis === "y" ? "scrollTop" : "scrollLeft";
  if (parent) {
    return parent[method];
  }
  const { body, documentElement } = document;
  return body[method] + documentElement[method];
};

const setScrollParam = ({ axis, parent, distance }) => {
  if (!parent && typeof document === "undefined") {
    return;
  }
  const method = axis === "y" ? "scrollTop" : "scrollLeft";
  if (parent) {
    parent[method] = distance;
  } else {
    const { body, documentElement } = document;
    body[method] = distance;
    documentElement[method] = distance;
  }
};

function useScrollIntoView({
  duration = 1250,
  axis = "y",
  onScrollFinish,
  easing = easeInOutQuad,
  offset = 0,
  cancelable = true,
  isList = false
} = {}) {
  const frameID = React.useRef(0);
  const startTime = React.useRef(0);
  const shouldStop = React.useRef(false);
  const scrollableRef = React.useRef(null);
  const targetRef = React.useRef(null);
  const reducedMotion = useReducedMotion();
  const cancel = () => {
    if (frameID.current) {
      cancelAnimationFrame(frameID.current);
    }
  };
  const scrollIntoView = React.useCallback(({ alignment = "start" } = {}) => {
    var _a;
    shouldStop.current = false;
    if (frameID.current) {
      cancel();
    }
    const start = (_a = getScrollStart({ parent: scrollableRef.current, axis })) != null ? _a : 0;
    const change = getRelativePosition({
      parent: scrollableRef.current,
      target: targetRef.current,
      axis,
      alignment,
      offset,
      isList
    }) - (scrollableRef.current ? 0 : start);
    function animateScroll() {
      if (startTime.current === 0) {
        startTime.current = performance.now();
      }
      const now = performance.now();
      const elapsed = now - startTime.current;
      const t = reducedMotion || duration === 0 ? 1 : elapsed / duration;
      const distance = start + change * easing(t);
      setScrollParam({
        parent: scrollableRef.current,
        axis,
        distance
      });
      if (!shouldStop.current && t < 1) {
        frameID.current = requestAnimationFrame(animateScroll);
      } else {
        typeof onScrollFinish === "function" && onScrollFinish();
        startTime.current = 0;
        frameID.current = 0;
        cancel();
      }
    }
    animateScroll();
  }, [axis, duration, easing, isList, offset, onScrollFinish, reducedMotion]);
  const handleStop = () => {
    if (cancelable) {
      shouldStop.current = true;
    }
  };
  useWindowEvent("wheel", handleStop, {
    passive: true
  });
  useWindowEvent("touchmove", handleStop, {
    passive: true
  });
  React.useEffect(() => cancel, []);
  return {
    scrollableRef,
    targetRef,
    scrollIntoView,
    cancel
  };
}

var __getOwnPropSymbols$P = Object.getOwnPropertySymbols;
var __hasOwnProp$P = Object.prototype.hasOwnProperty;
var __propIsEnum$P = Object.prototype.propertyIsEnumerable;
var __objRest$B = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$P.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$P)
    for (var prop of __getOwnPropSymbols$P(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$P.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function extractSystemStyles(others) {
  const _a = others, {
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display
  } = _a, rest = __objRest$B(_a, [
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "ml",
    "mr",
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr",
    "bg",
    "c",
    "opacity",
    "ff",
    "fz",
    "fw",
    "lts",
    "ta",
    "lh",
    "fs",
    "tt",
    "td",
    "w",
    "miw",
    "maw",
    "h",
    "mih",
    "mah",
    "bgsz",
    "bgp",
    "bgr",
    "bga",
    "pos",
    "top",
    "left",
    "bottom",
    "right",
    "inset",
    "display"
  ]);
  const systemStyles = filterProps({
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display
  });
  return { systemStyles, rest };
}

function getSortedKeys(value, theme) {
  const sorted = Object.keys(value).filter((breakpoint) => breakpoint !== "base").sort((a, b) => getBreakpointValue(getSize({ size: a, sizes: theme.breakpoints })) - getBreakpointValue(getSize({ size: b, sizes: theme.breakpoints })));
  return "base" in value ? ["base", ...sorted] : sorted;
}
function getResponsiveValue({ value, theme, getValue, property }) {
  if (value == null) {
    return void 0;
  }
  if (typeof value === "object") {
    const result = getSortedKeys(value, theme).reduce((acc, breakpointKey) => {
      if (breakpointKey === "base" && value.base !== void 0) {
        const baseValue = getValue(value.base, theme);
        if (Array.isArray(property)) {
          property.forEach((prop) => {
            acc[prop] = baseValue;
          });
          return acc;
        }
        acc[property] = baseValue;
        return acc;
      }
      const breakpointValue = getValue(value[breakpointKey], theme);
      if (Array.isArray(property)) {
        acc[theme.fn.largerThan(breakpointKey)] = {};
        property.forEach((prop) => {
          acc[theme.fn.largerThan(breakpointKey)][prop] = breakpointValue;
        });
        return acc;
      }
      acc[theme.fn.largerThan(breakpointKey)] = {
        [property]: breakpointValue
      };
      return acc;
    }, {});
    return result;
  }
  const cssValue = getValue(value, theme);
  if (Array.isArray(property)) {
    return property.reduce((acc, prop) => {
      acc[prop] = cssValue;
      return acc;
    }, {});
  }
  return { [property]: cssValue };
}

function getColorValue(color, theme) {
  if (color === "dimmed") {
    return theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6];
  }
  return theme.fn.variant({ variant: "filled", color, primaryFallback: false }).background;
}

function getSizeValue(value) {
  return rem(value);
}
function identity(value) {
  return value;
}

function getFontSizeValue(size, theme) {
  return getSize({ size, sizes: theme.fontSizes });
}

const NEGATIVE_VALUES = ["-xs", "-sm", "-md", "-lg", "-xl"];
function getSpacingValue(size, theme) {
  if (NEGATIVE_VALUES.includes(size)) {
    return `calc(${getSize({
      size: size.replace("-", ""),
      sizes: theme.spacing
    })} * -1)`;
  }
  return getSize({ size, sizes: theme.spacing });
}

const valueGetters = {
  identity,
  color: getColorValue,
  size: getSizeValue,
  fontSize: getFontSizeValue,
  spacing: getSpacingValue
};

const SYSTEM_PROPS = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  mx: { type: "spacing", property: ["marginRight", "marginLeft"] },
  my: { type: "spacing", property: ["marginTop", "marginBottom"] },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  px: { type: "spacing", property: ["paddingRight", "paddingLeft"] },
  py: { type: "spacing", property: ["paddingTop", "paddingBottom"] },
  bg: { type: "color", property: "background" },
  c: { type: "color", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "identity", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "identity", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "identity", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" }
};

var __defProp$N = Object.defineProperty;
var __getOwnPropSymbols$O = Object.getOwnPropertySymbols;
var __hasOwnProp$O = Object.prototype.hasOwnProperty;
var __propIsEnum$O = Object.prototype.propertyIsEnumerable;
var __defNormalProp$N = (obj, key, value) => key in obj ? __defProp$N(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$N = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$O.call(b, prop))
      __defNormalProp$N(a, prop, b[prop]);
  if (__getOwnPropSymbols$O)
    for (var prop of __getOwnPropSymbols$O(b)) {
      if (__propIsEnum$O.call(b, prop))
        __defNormalProp$N(a, prop, b[prop]);
    }
  return a;
};
function getSystemStyles(systemStyles, theme, systemProps = SYSTEM_PROPS) {
  const styles = Object.keys(systemProps).reduce((acc, systemProp) => {
    if (systemProp in systemStyles && systemStyles[systemProp] !== void 0) {
      acc.push(getResponsiveValue({
        value: systemStyles[systemProp],
        getValue: valueGetters[systemProps[systemProp].type],
        property: systemProps[systemProp].property,
        theme
      }));
    }
    return acc;
  }, []);
  return styles.reduce((acc, stylesPartial) => {
    Object.keys(stylesPartial).forEach((property) => {
      if (typeof stylesPartial[property] === "object" && stylesPartial[property] !== null) {
        if (!(property in acc)) {
          acc[property] = stylesPartial[property];
        } else {
          acc[property] = __spreadValues$N(__spreadValues$N({}, acc[property]), stylesPartial[property]);
        }
      } else {
        acc[property] = stylesPartial[property];
      }
    });
    return acc;
  }, {});
}

function extractSx(sx, theme) {
  return typeof sx === "function" ? sx(theme) : sx;
}
function useSx(sx, systemProps, className) {
  const theme = useMantineTheme();
  const { css, cx } = useCss();
  if (Array.isArray(sx)) {
    return cx(className, css(getSystemStyles(systemProps, theme)), sx.map((partial) => css(extractSx(partial, theme))));
  }
  return cx(className, css(extractSx(sx, theme)), css(getSystemStyles(systemProps, theme)));
}

var __defProp$M = Object.defineProperty;
var __getOwnPropSymbols$N = Object.getOwnPropertySymbols;
var __hasOwnProp$N = Object.prototype.hasOwnProperty;
var __propIsEnum$N = Object.prototype.propertyIsEnumerable;
var __defNormalProp$M = (obj, key, value) => key in obj ? __defProp$M(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$M = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$N.call(b, prop))
      __defNormalProp$M(a, prop, b[prop]);
  if (__getOwnPropSymbols$N)
    for (var prop of __getOwnPropSymbols$N(b)) {
      if (__propIsEnum$N.call(b, prop))
        __defNormalProp$M(a, prop, b[prop]);
    }
  return a;
};
var __objRest$A = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$N.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$N)
    for (var prop of __getOwnPropSymbols$N(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$N.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const _Box = React.forwardRef((_a, ref) => {
  var _b = _a, { className, component, style, sx } = _b, others = __objRest$A(_b, ["className", "component", "style", "sx"]);
  const { systemStyles, rest } = extractSystemStyles(others);
  const Element = component || "div";
  return /* @__PURE__ */ React.createElement(Element, __spreadValues$M({
    ref,
    className: useSx(sx, systemStyles, className),
    style
  }, rest));
});
_Box.displayName = "@mantine/core/Box";
const Box = createPolymorphicComponent(_Box);

var __defProp$L = Object.defineProperty;
var __defProps$p = Object.defineProperties;
var __getOwnPropDescs$p = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$M = Object.getOwnPropertySymbols;
var __hasOwnProp$M = Object.prototype.hasOwnProperty;
var __propIsEnum$M = Object.prototype.propertyIsEnumerable;
var __defNormalProp$L = (obj, key, value) => key in obj ? __defProp$L(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$L = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$M.call(b, prop))
      __defNormalProp$L(a, prop, b[prop]);
  if (__getOwnPropSymbols$M)
    for (var prop of __getOwnPropSymbols$M(b)) {
      if (__propIsEnum$M.call(b, prop))
        __defNormalProp$L(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$p = (a, b) => __defProps$p(a, __getOwnPropDescs$p(b));
var useStyles$y = createStyles((theme) => ({
  root: __spreadProps$p(__spreadValues$L(__spreadValues$L({}, theme.fn.focusStyles()), theme.fn.fontStyles()), {
    cursor: "pointer",
    border: 0,
    padding: 0,
    appearance: "none",
    fontSize: theme.fontSizes.md,
    backgroundColor: "transparent",
    textAlign: "left",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    textDecoration: "none",
    boxSizing: "border-box"
  })
}));

var useStyles$z = useStyles$y;

var __defProp$K = Object.defineProperty;
var __getOwnPropSymbols$L = Object.getOwnPropertySymbols;
var __hasOwnProp$L = Object.prototype.hasOwnProperty;
var __propIsEnum$L = Object.prototype.propertyIsEnumerable;
var __defNormalProp$K = (obj, key, value) => key in obj ? __defProp$K(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$K = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$L.call(b, prop))
      __defNormalProp$K(a, prop, b[prop]);
  if (__getOwnPropSymbols$L)
    for (var prop of __getOwnPropSymbols$L(b)) {
      if (__propIsEnum$L.call(b, prop))
        __defNormalProp$K(a, prop, b[prop]);
    }
  return a;
};
var __objRest$z = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$L.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$L)
    for (var prop of __getOwnPropSymbols$L(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$L.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const _UnstyledButton = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("UnstyledButton", {}, props), {
    className,
    component = "button",
    unstyled,
    variant
  } = _a, others = __objRest$z(_a, [
    "className",
    "component",
    "unstyled",
    "variant"
  ]);
  const { classes, cx } = useStyles$z(null, { name: "UnstyledButton", unstyled, variant });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$K({
    component,
    ref,
    className: cx(classes.root, className),
    type: component === "button" ? "button" : void 0
  }, others));
});
_UnstyledButton.displayName = "@mantine/core/UnstyledButton";
const UnstyledButton = createPolymorphicComponent(_UnstyledButton);

var __defProp$J = Object.defineProperty;
var __defProps$o = Object.defineProperties;
var __getOwnPropDescs$o = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$K = Object.getOwnPropertySymbols;
var __hasOwnProp$K = Object.prototype.hasOwnProperty;
var __propIsEnum$K = Object.prototype.propertyIsEnumerable;
var __defNormalProp$J = (obj, key, value) => key in obj ? __defProp$J(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$J = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$K.call(b, prop))
      __defNormalProp$J(a, prop, b[prop]);
  if (__getOwnPropSymbols$K)
    for (var prop of __getOwnPropSymbols$K(b)) {
      if (__propIsEnum$K.call(b, prop))
        __defNormalProp$J(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$o = (a, b) => __defProps$o(a, __getOwnPropDescs$o(b));
const ACTION_ICON_VARIANTS = [
  "subtle",
  "filled",
  "outline",
  "light",
  "default",
  "transparent",
  "gradient"
];
const sizes$4 = {
  xs: rem(18),
  sm: rem(22),
  md: rem(28),
  lg: rem(34),
  xl: rem(44)
};
function getVariantStyles$2({ variant, theme, color, gradient }) {
  const colors = theme.fn.variant({ color, variant, gradient });
  if (variant === "gradient") {
    return {
      border: 0,
      backgroundImage: colors.background,
      color: colors.color,
      "&:hover": theme.fn.hover({
        backgroundSize: "200%"
      })
    };
  }
  if (ACTION_ICON_VARIANTS.includes(variant)) {
    return __spreadValues$J({
      border: `${rem(1)} solid ${colors.border}`,
      backgroundColor: colors.background,
      color: colors.color
    }, theme.fn.hover({
      backgroundColor: colors.hover
    }));
  }
  return null;
}
var useStyles$w = createStyles((theme, { radius, color, gradient }, { variant, size }) => ({
  root: __spreadProps$o(__spreadValues$J({
    position: "relative",
    borderRadius: theme.fn.radius(radius),
    padding: 0,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: getSize({ size, sizes: sizes$4 }),
    minHeight: getSize({ size, sizes: sizes$4 }),
    width: getSize({ size, sizes: sizes$4 }),
    minWidth: getSize({ size, sizes: sizes$4 })
  }, getVariantStyles$2({ variant, theme, color, gradient })), {
    "&:active": theme.activeStyles,
    "& [data-action-icon-loader]": {
      maxWidth: "70%"
    },
    "&:disabled, &[data-disabled]": {
      color: theme.colors.gray[theme.colorScheme === "dark" ? 6 : 4],
      cursor: "not-allowed",
      backgroundColor: variant === "transparent" ? void 0 : theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1),
      borderColor: variant === "transparent" ? void 0 : theme.fn.themeColor("gray", theme.colorScheme === "dark" ? 8 : 1),
      backgroundImage: "none",
      pointerEvents: "none",
      "&:active": {
        transform: "none"
      }
    },
    "&[data-loading]": {
      pointerEvents: "none",
      "&::before": __spreadProps$o(__spreadValues$J({
        content: '""'
      }, theme.fn.cover(rem(-1))), {
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[7], 0.5) : "rgba(255, 255, 255, .5)",
        borderRadius: theme.fn.radius(radius),
        cursor: "not-allowed"
      })
    }
  })
}));

var useStyles$x = useStyles$w;

var __defProp$I = Object.defineProperty;
var __getOwnPropSymbols$J = Object.getOwnPropertySymbols;
var __hasOwnProp$J = Object.prototype.hasOwnProperty;
var __propIsEnum$J = Object.prototype.propertyIsEnumerable;
var __defNormalProp$I = (obj, key, value) => key in obj ? __defProp$I(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$I = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$J.call(b, prop))
      __defNormalProp$I(a, prop, b[prop]);
  if (__getOwnPropSymbols$J)
    for (var prop of __getOwnPropSymbols$J(b)) {
      if (__propIsEnum$J.call(b, prop))
        __defNormalProp$I(a, prop, b[prop]);
    }
  return a;
};
var __objRest$y = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$J.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$J)
    for (var prop of __getOwnPropSymbols$J(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$J.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Bars(_a) {
  var _b = _a, { size, color } = _b, others = __objRest$y(_b, ["size", "color"]);
  return /* @__PURE__ */ React.createElement("svg", __spreadValues$I({
    viewBox: "0 0 135 140",
    xmlns: "http://www.w3.org/2000/svg",
    fill: color,
    width: size
  }, others), /* @__PURE__ */ React.createElement("rect", {
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "height",
    begin: "0.5s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "y",
    begin: "0.5s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ React.createElement("rect", {
    x: "30",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "height",
    begin: "0.25s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "y",
    begin: "0.25s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ React.createElement("rect", {
    x: "60",
    width: "15",
    height: "140",
    rx: "6"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "height",
    begin: "0s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "y",
    begin: "0s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ React.createElement("rect", {
    x: "90",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "height",
    begin: "0.25s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "y",
    begin: "0.25s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ React.createElement("rect", {
    x: "120",
    y: "10",
    width: "15",
    height: "120",
    rx: "6"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "height",
    begin: "0.5s",
    dur: "1s",
    values: "120;110;100;90;80;70;60;50;40;140;120",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "y",
    begin: "0.5s",
    dur: "1s",
    values: "10;15;20;25;30;35;40;45;50;0;10",
    calcMode: "linear",
    repeatCount: "indefinite"
  })));
}

var __defProp$H = Object.defineProperty;
var __getOwnPropSymbols$I = Object.getOwnPropertySymbols;
var __hasOwnProp$I = Object.prototype.hasOwnProperty;
var __propIsEnum$I = Object.prototype.propertyIsEnumerable;
var __defNormalProp$H = (obj, key, value) => key in obj ? __defProp$H(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$H = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$I.call(b, prop))
      __defNormalProp$H(a, prop, b[prop]);
  if (__getOwnPropSymbols$I)
    for (var prop of __getOwnPropSymbols$I(b)) {
      if (__propIsEnum$I.call(b, prop))
        __defNormalProp$H(a, prop, b[prop]);
    }
  return a;
};
var __objRest$x = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$I.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$I)
    for (var prop of __getOwnPropSymbols$I(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$I.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Oval(_a) {
  var _b = _a, { size, color } = _b, others = __objRest$x(_b, ["size", "color"]);
  return /* @__PURE__ */ React.createElement("svg", __spreadValues$H({
    width: size,
    height: size,
    viewBox: "0 0 38 38",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: color
  }, others), /* @__PURE__ */ React.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ React.createElement("g", {
    transform: "translate(2.5 2.5)",
    strokeWidth: "5"
  }, /* @__PURE__ */ React.createElement("circle", {
    strokeOpacity: ".5",
    cx: "16",
    cy: "16",
    r: "16"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M32 16c0-9.94-8.06-16-16-16"
  }, /* @__PURE__ */ React.createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    from: "0 16 16",
    to: "360 16 16",
    dur: "1s",
    repeatCount: "indefinite"
  })))));
}

var __defProp$G = Object.defineProperty;
var __getOwnPropSymbols$H = Object.getOwnPropertySymbols;
var __hasOwnProp$H = Object.prototype.hasOwnProperty;
var __propIsEnum$H = Object.prototype.propertyIsEnumerable;
var __defNormalProp$G = (obj, key, value) => key in obj ? __defProp$G(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$G = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$H.call(b, prop))
      __defNormalProp$G(a, prop, b[prop]);
  if (__getOwnPropSymbols$H)
    for (var prop of __getOwnPropSymbols$H(b)) {
      if (__propIsEnum$H.call(b, prop))
        __defNormalProp$G(a, prop, b[prop]);
    }
  return a;
};
var __objRest$w = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$H.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$H)
    for (var prop of __getOwnPropSymbols$H(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$H.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Dots(_a) {
  var _b = _a, { size, color } = _b, others = __objRest$w(_b, ["size", "color"]);
  return /* @__PURE__ */ React.createElement("svg", __spreadValues$G({
    width: size,
    viewBox: "0 0 120 30",
    xmlns: "http://www.w3.org/2000/svg",
    fill: color
  }, others), /* @__PURE__ */ React.createElement("circle", {
    cx: "15",
    cy: "15",
    r: "15"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ React.createElement("circle", {
    cx: "60",
    cy: "15",
    r: "9",
    fillOpacity: "0.3"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "r",
    from: "9",
    to: "9",
    begin: "0s",
    dur: "0.8s",
    values: "9;15;9",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "fill-opacity",
    from: "0.5",
    to: "0.5",
    begin: "0s",
    dur: "0.8s",
    values: ".5;1;.5",
    calcMode: "linear",
    repeatCount: "indefinite"
  })), /* @__PURE__ */ React.createElement("circle", {
    cx: "105",
    cy: "15",
    r: "15"
  }, /* @__PURE__ */ React.createElement("animate", {
    attributeName: "r",
    from: "15",
    to: "15",
    begin: "0s",
    dur: "0.8s",
    values: "15;9;15",
    calcMode: "linear",
    repeatCount: "indefinite"
  }), /* @__PURE__ */ React.createElement("animate", {
    attributeName: "fill-opacity",
    from: "1",
    to: "1",
    begin: "0s",
    dur: "0.8s",
    values: "1;.5;1",
    calcMode: "linear",
    repeatCount: "indefinite"
  })));
}

var __defProp$F = Object.defineProperty;
var __getOwnPropSymbols$G = Object.getOwnPropertySymbols;
var __hasOwnProp$G = Object.prototype.hasOwnProperty;
var __propIsEnum$G = Object.prototype.propertyIsEnumerable;
var __defNormalProp$F = (obj, key, value) => key in obj ? __defProp$F(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$F = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$G.call(b, prop))
      __defNormalProp$F(a, prop, b[prop]);
  if (__getOwnPropSymbols$G)
    for (var prop of __getOwnPropSymbols$G(b)) {
      if (__propIsEnum$G.call(b, prop))
        __defNormalProp$F(a, prop, b[prop]);
    }
  return a;
};
var __objRest$v = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$G.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$G)
    for (var prop of __getOwnPropSymbols$G(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$G.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const LOADERS = {
  bars: Bars,
  oval: Oval,
  dots: Dots
};
const sizes$3 = {
  xs: rem(18),
  sm: rem(22),
  md: rem(36),
  lg: rem(44),
  xl: rem(58)
};
const defaultProps$m = {
  size: "md"
};
function Loader(props) {
  const _a = useComponentDefaultProps("Loader", defaultProps$m, props), { size, color, variant } = _a, others = __objRest$v(_a, ["size", "color", "variant"]);
  const theme = useMantineTheme();
  const defaultLoader = variant in LOADERS ? variant : theme.loader;
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$F({
    role: "presentation",
    component: LOADERS[defaultLoader] || LOADERS.bars,
    size: getSize({ size, sizes: sizes$3 }),
    color: theme.fn.variant({
      variant: "filled",
      primaryFallback: false,
      color: color || theme.primaryColor
    }).background
  }, others));
}
Loader.displayName = "@mantine/core/Loader";

var __defProp$E = Object.defineProperty;
var __getOwnPropSymbols$F = Object.getOwnPropertySymbols;
var __hasOwnProp$F = Object.prototype.hasOwnProperty;
var __propIsEnum$F = Object.prototype.propertyIsEnumerable;
var __defNormalProp$E = (obj, key, value) => key in obj ? __defProp$E(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$E = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$F.call(b, prop))
      __defNormalProp$E(a, prop, b[prop]);
  if (__getOwnPropSymbols$F)
    for (var prop of __getOwnPropSymbols$F(b)) {
      if (__propIsEnum$F.call(b, prop))
        __defNormalProp$E(a, prop, b[prop]);
    }
  return a;
};
var __objRest$u = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$F.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$F)
    for (var prop of __getOwnPropSymbols$F(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$F.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$l = {
  color: "gray",
  size: "md",
  variant: "subtle"
};
const _ActionIcon = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("ActionIcon", defaultProps$l, props), {
    className,
    color,
    children,
    radius,
    size,
    variant,
    gradient,
    disabled,
    loaderProps,
    loading,
    unstyled,
    __staticSelector
  } = _a, others = __objRest$u(_a, [
    "className",
    "color",
    "children",
    "radius",
    "size",
    "variant",
    "gradient",
    "disabled",
    "loaderProps",
    "loading",
    "unstyled",
    "__staticSelector"
  ]);
  const { classes, cx, theme } = useStyles$x({ radius, color, gradient }, { name: ["ActionIcon", __staticSelector], unstyled, size, variant });
  const loader = /* @__PURE__ */ React.createElement(Loader, __spreadValues$E({
    color: theme.fn.variant({ color, variant }).color,
    size: "100%",
    "data-action-icon-loader": true
  }, loaderProps));
  return /* @__PURE__ */ React.createElement(UnstyledButton, __spreadValues$E({
    className: cx(classes.root, className),
    ref,
    disabled,
    "data-disabled": disabled || void 0,
    "data-loading": loading || void 0,
    unstyled
  }, others), loading ? loader : children);
});
_ActionIcon.displayName = "@mantine/core/ActionIcon";
const ActionIcon = createPolymorphicComponent(_ActionIcon);

var __defProp$D = Object.defineProperty;
var __defProps$n = Object.defineProperties;
var __getOwnPropDescs$n = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$E = Object.getOwnPropertySymbols;
var __hasOwnProp$E = Object.prototype.hasOwnProperty;
var __propIsEnum$E = Object.prototype.propertyIsEnumerable;
var __defNormalProp$D = (obj, key, value) => key in obj ? __defProp$D(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$D = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$E.call(b, prop))
      __defNormalProp$D(a, prop, b[prop]);
  if (__getOwnPropSymbols$E)
    for (var prop of __getOwnPropSymbols$E(b)) {
      if (__propIsEnum$E.call(b, prop))
        __defNormalProp$D(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$n = (a, b) => __defProps$n(a, __getOwnPropDescs$n(b));
var __objRest$t = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$E.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$E)
    for (var prop of __getOwnPropSymbols$E(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$E.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function Portal(props) {
  const _a = useComponentDefaultProps("Portal", {}, props), { children, target, className, innerRef } = _a, others = __objRest$t(_a, ["children", "target", "className", "innerRef"]);
  const theme = useMantineTheme();
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef();
  useIsomorphicEffect(() => {
    setMounted(true);
    ref.current = !target ? document.createElement("div") : typeof target === "string" ? document.querySelector(target) : target;
    if (!target) {
      document.body.appendChild(ref.current);
    }
    return () => {
      !target && document.body.removeChild(ref.current);
    };
  }, [target]);
  if (!mounted) {
    return null;
  }
  return React.createPortal(/* @__PURE__ */ React.createElement("div", __spreadProps$n(__spreadValues$D({
    className,
    dir: theme.dir
  }, others), {
    ref: innerRef
  }), children), ref.current);
}
Portal.displayName = "@mantine/core/Portal";

var __defProp$C = Object.defineProperty;
var __getOwnPropSymbols$D = Object.getOwnPropertySymbols;
var __hasOwnProp$D = Object.prototype.hasOwnProperty;
var __propIsEnum$D = Object.prototype.propertyIsEnumerable;
var __defNormalProp$C = (obj, key, value) => key in obj ? __defProp$C(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$C = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$D.call(b, prop))
      __defNormalProp$C(a, prop, b[prop]);
  if (__getOwnPropSymbols$D)
    for (var prop of __getOwnPropSymbols$D(b)) {
      if (__propIsEnum$D.call(b, prop))
        __defNormalProp$C(a, prop, b[prop]);
    }
  return a;
};
var __objRest$s = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$D.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$D)
    for (var prop of __getOwnPropSymbols$D(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$D.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function OptionalPortal(_a) {
  var _b = _a, { withinPortal = true, children } = _b, others = __objRest$s(_b, ["withinPortal", "children"]);
  if (withinPortal) {
    return /* @__PURE__ */ React.createElement(Portal, __spreadValues$C({}, others), children);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
OptionalPortal.displayName = "@mantine/core/OptionalPortal";

var __defProp$B = Object.defineProperty;
var __getOwnPropSymbols$C = Object.getOwnPropertySymbols;
var __hasOwnProp$C = Object.prototype.hasOwnProperty;
var __propIsEnum$C = Object.prototype.propertyIsEnumerable;
var __defNormalProp$B = (obj, key, value) => key in obj ? __defProp$B(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$B = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$C.call(b, prop))
      __defNormalProp$B(a, prop, b[prop]);
  if (__getOwnPropSymbols$C)
    for (var prop of __getOwnPropSymbols$C(b)) {
      if (__propIsEnum$C.call(b, prop))
        __defNormalProp$B(a, prop, b[prop]);
    }
  return a;
};
function CloseIcon(props) {
  return /* @__PURE__ */ React.createElement("svg", __spreadValues$B({
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /* @__PURE__ */ React.createElement("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}
CloseIcon.displayName = "@mantine/core/CloseIcon";

var __defProp$A = Object.defineProperty;
var __getOwnPropSymbols$B = Object.getOwnPropertySymbols;
var __hasOwnProp$B = Object.prototype.hasOwnProperty;
var __propIsEnum$B = Object.prototype.propertyIsEnumerable;
var __defNormalProp$A = (obj, key, value) => key in obj ? __defProp$A(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$A = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$B.call(b, prop))
      __defNormalProp$A(a, prop, b[prop]);
  if (__getOwnPropSymbols$B)
    for (var prop of __getOwnPropSymbols$B(b)) {
      if (__propIsEnum$B.call(b, prop))
        __defNormalProp$A(a, prop, b[prop]);
    }
  return a;
};
var __objRest$r = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$B.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$B)
    for (var prop of __getOwnPropSymbols$B(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$B.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const iconSizes$1 = {
  xs: rem(12),
  sm: rem(16),
  md: rem(20),
  lg: rem(28),
  xl: rem(34)
};
const defaultProps$k = {
  size: "sm"
};
const _CloseButton = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("CloseButton", defaultProps$k, props), { iconSize, size, children } = _a, others = __objRest$r(_a, ["iconSize", "size", "children"]);
  const _iconSize = rem(iconSize || iconSizes$1[size]);
  return /* @__PURE__ */ React.createElement(ActionIcon, __spreadValues$A({
    ref,
    __staticSelector: "CloseButton",
    size
  }, others), children || /* @__PURE__ */ React.createElement(CloseIcon, {
    width: _iconSize,
    height: _iconSize
  }));
});
_CloseButton.displayName = "@mantine/core/CloseButton";
const CloseButton = createPolymorphicComponent(_CloseButton);

var __defProp$z = Object.defineProperty;
var __defProps$m = Object.defineProperties;
var __getOwnPropDescs$m = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$A = Object.getOwnPropertySymbols;
var __hasOwnProp$A = Object.prototype.hasOwnProperty;
var __propIsEnum$A = Object.prototype.propertyIsEnumerable;
var __defNormalProp$z = (obj, key, value) => key in obj ? __defProp$z(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$z = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$A.call(b, prop))
      __defNormalProp$z(a, prop, b[prop]);
  if (__getOwnPropSymbols$A)
    for (var prop of __getOwnPropSymbols$A(b)) {
      if (__propIsEnum$A.call(b, prop))
        __defNormalProp$z(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$m = (a, b) => __defProps$m(a, __getOwnPropDescs$m(b));
function getTextDecoration({
  underline,
  strikethrough
}) {
  const styles = [];
  if (underline) {
    styles.push("underline");
  }
  if (strikethrough) {
    styles.push("line-through");
  }
  return styles.length > 0 ? styles.join(" ") : "none";
}
function getTextColor({ theme, color }) {
  if (color === "dimmed") {
    return theme.fn.dimmed();
  }
  return typeof color === "string" && (color in theme.colors || color.split(".")[0] in theme.colors) ? theme.fn.variant({ variant: "filled", color }).background : color || "inherit";
}
function getLineClamp(lineClamp) {
  if (typeof lineClamp === "number") {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: lineClamp,
      WebkitBoxOrient: "vertical"
    };
  }
  return null;
}
function getTruncate({ theme, truncate }) {
  if (truncate === "start") {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      direction: theme.dir === "ltr" ? "rtl" : "ltr",
      textAlign: theme.dir === "ltr" ? "right" : "left"
    };
  }
  if (truncate) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    };
  }
  return null;
}
var useStyles$u = createStyles((theme, {
  color,
  lineClamp,
  truncate,
  inline,
  inherit,
  underline,
  gradient,
  weight,
  transform,
  align,
  strikethrough,
  italic
}, { size }) => {
  const colors = theme.fn.variant({ variant: "gradient", gradient });
  return {
    root: __spreadProps$m(__spreadValues$z(__spreadValues$z(__spreadValues$z(__spreadValues$z({}, theme.fn.fontStyles()), theme.fn.focusStyles()), getLineClamp(lineClamp)), getTruncate({ theme, truncate })), {
      color: getTextColor({ color, theme }),
      fontFamily: inherit ? "inherit" : theme.fontFamily,
      fontSize: inherit || size === void 0 ? "inherit" : getSize({ size, sizes: theme.fontSizes }),
      lineHeight: inherit ? "inherit" : inline ? 1 : theme.lineHeight,
      textDecoration: getTextDecoration({ underline, strikethrough }),
      WebkitTapHighlightColor: "transparent",
      fontWeight: inherit ? "inherit" : weight,
      textTransform: transform,
      textAlign: align,
      fontStyle: italic ? "italic" : void 0
    }),
    gradient: {
      backgroundImage: colors.background,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  };
});

var useStyles$v = useStyles$u;

var __defProp$y = Object.defineProperty;
var __getOwnPropSymbols$z = Object.getOwnPropertySymbols;
var __hasOwnProp$z = Object.prototype.hasOwnProperty;
var __propIsEnum$z = Object.prototype.propertyIsEnumerable;
var __defNormalProp$y = (obj, key, value) => key in obj ? __defProp$y(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$y = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$z.call(b, prop))
      __defNormalProp$y(a, prop, b[prop]);
  if (__getOwnPropSymbols$z)
    for (var prop of __getOwnPropSymbols$z(b)) {
      if (__propIsEnum$z.call(b, prop))
        __defNormalProp$y(a, prop, b[prop]);
    }
  return a;
};
var __objRest$q = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$z.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$z)
    for (var prop of __getOwnPropSymbols$z(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$z.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$j = {
  variant: "text"
};
const _Text = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Text", defaultProps$j, props), {
    className,
    size,
    weight,
    transform,
    color,
    align,
    variant,
    lineClamp,
    truncate,
    gradient,
    inline,
    inherit,
    underline,
    strikethrough,
    italic,
    classNames,
    styles,
    unstyled,
    span,
    __staticSelector
  } = _a, others = __objRest$q(_a, [
    "className",
    "size",
    "weight",
    "transform",
    "color",
    "align",
    "variant",
    "lineClamp",
    "truncate",
    "gradient",
    "inline",
    "inherit",
    "underline",
    "strikethrough",
    "italic",
    "classNames",
    "styles",
    "unstyled",
    "span",
    "__staticSelector"
  ]);
  const { classes, cx } = useStyles$v({
    color,
    lineClamp,
    truncate,
    inline,
    inherit,
    underline,
    strikethrough,
    italic,
    weight,
    transform,
    align,
    gradient
  }, { unstyled, name: __staticSelector || "Text", variant, size });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$y({
    ref,
    className: cx(classes.root, { [classes.gradient]: variant === "gradient" }, className),
    component: span ? "span" : "div"
  }, others));
});
_Text.displayName = "@mantine/core/Text";
const Text = createPolymorphicComponent(_Text);

const sizes$2 = {
  xs: rem(1),
  sm: rem(2),
  md: rem(3),
  lg: rem(4),
  xl: rem(5)
};
function getColor(theme, color) {
  const themeColor = theme.fn.variant({ variant: "outline", color }).border;
  return typeof color === "string" && (color in theme.colors || color.split(".")[0] in theme.colors) ? themeColor : color === void 0 ? theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4] : color;
}
var useStyles$s = createStyles((theme, { color }, { size, variant }) => ({
  root: {},
  withLabel: {
    borderTop: "0 !important"
  },
  left: {
    "&::before": {
      display: "none"
    }
  },
  right: {
    "&::after": {
      display: "none"
    }
  },
  label: {
    display: "flex",
    alignItems: "center",
    "&::before": {
      content: '""',
      flex: 1,
      height: rem(1),
      borderTop: `${getSize({ size, sizes: sizes$2 })} ${variant} ${getColor(theme, color)}`,
      marginRight: theme.spacing.xs
    },
    "&::after": {
      content: '""',
      flex: 1,
      borderTop: `${getSize({ size, sizes: sizes$2 })} ${variant} ${getColor(theme, color)}`,
      marginLeft: theme.spacing.xs
    }
  },
  labelDefaultStyles: {
    color: color === "dark" ? theme.colors.dark[1] : theme.fn.themeColor(color, theme.colorScheme === "dark" ? 5 : theme.fn.primaryShade(), false)
  },
  horizontal: {
    border: 0,
    borderTopWidth: rem(getSize({ size, sizes: sizes$2 })),
    borderTopColor: getColor(theme, color),
    borderTopStyle: variant,
    margin: 0
  },
  vertical: {
    border: 0,
    alignSelf: "stretch",
    height: "auto",
    borderLeftWidth: rem(getSize({ size, sizes: sizes$2 })),
    borderLeftColor: getColor(theme, color),
    borderLeftStyle: variant
  }
}));

var useStyles$t = useStyles$s;

var __defProp$x = Object.defineProperty;
var __defProps$l = Object.defineProperties;
var __getOwnPropDescs$l = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$y = Object.getOwnPropertySymbols;
var __hasOwnProp$y = Object.prototype.hasOwnProperty;
var __propIsEnum$y = Object.prototype.propertyIsEnumerable;
var __defNormalProp$x = (obj, key, value) => key in obj ? __defProp$x(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$x = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$y.call(b, prop))
      __defNormalProp$x(a, prop, b[prop]);
  if (__getOwnPropSymbols$y)
    for (var prop of __getOwnPropSymbols$y(b)) {
      if (__propIsEnum$y.call(b, prop))
        __defNormalProp$x(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$l = (a, b) => __defProps$l(a, __getOwnPropDescs$l(b));
var __objRest$p = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$y.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$y)
    for (var prop of __getOwnPropSymbols$y(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$y.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$i = {
  orientation: "horizontal",
  size: "xs",
  labelPosition: "left",
  variant: "solid"
};
const Divider = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Divider", defaultProps$i, props), {
    className,
    color,
    orientation,
    size,
    label,
    labelPosition,
    labelProps,
    variant,
    styles,
    classNames,
    unstyled
  } = _a, others = __objRest$p(_a, [
    "className",
    "color",
    "orientation",
    "size",
    "label",
    "labelPosition",
    "labelProps",
    "variant",
    "styles",
    "classNames",
    "unstyled"
  ]);
  const { classes, cx } = useStyles$t({ color }, { classNames, styles, unstyled, name: "Divider", variant, size });
  const vertical = orientation === "vertical";
  const horizontal = orientation === "horizontal";
  const withLabel = !!label && horizontal;
  const useLabelDefaultStyles = !(labelProps == null ? void 0 : labelProps.color);
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$x({
    ref,
    className: cx(classes.root, {
      [classes.vertical]: vertical,
      [classes.horizontal]: horizontal,
      [classes.withLabel]: withLabel
    }, className),
    role: "separator"
  }, others), withLabel && /* @__PURE__ */ React.createElement(Text, __spreadProps$l(__spreadValues$x({}, labelProps), {
    size: (labelProps == null ? void 0 : labelProps.size) || "xs",
    mt: rem(2),
    className: cx(classes.label, classes[labelPosition], {
      [classes.labelDefaultStyles]: useLabelDefaultStyles
    })
  }), label));
});
Divider.displayName = "@mantine/core/Divider";

var __defProp$w = Object.defineProperty;
var __defProps$k = Object.defineProperties;
var __getOwnPropDescs$k = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$x = Object.getOwnPropertySymbols;
var __hasOwnProp$x = Object.prototype.hasOwnProperty;
var __propIsEnum$x = Object.prototype.propertyIsEnumerable;
var __defNormalProp$w = (obj, key, value) => key in obj ? __defProp$w(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$w = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$x.call(b, prop))
      __defNormalProp$w(a, prop, b[prop]);
  if (__getOwnPropSymbols$x)
    for (var prop of __getOwnPropSymbols$x(b)) {
      if (__propIsEnum$x.call(b, prop))
        __defNormalProp$w(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$k = (a, b) => __defProps$k(a, __getOwnPropDescs$k(b));
var useStyles$q = createStyles((theme, _params, { size }) => ({
  item: __spreadProps$k(__spreadValues$w({}, theme.fn.fontStyles()), {
    boxSizing: "border-box",
    textAlign: "left",
    width: "100%",
    padding: `calc(${getSize({ size, sizes: theme.spacing })} / 1.5) ${getSize({
      size,
      sizes: theme.spacing
    })}`,
    cursor: "pointer",
    fontSize: getSize({ size, sizes: theme.fontSizes }),
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.fn.radius(),
    "&[data-hovered]": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    },
    "&[data-selected]": __spreadValues$w({
      backgroundColor: theme.fn.variant({ variant: "filled" }).background,
      color: theme.fn.variant({ variant: "filled" }).color
    }, theme.fn.hover({ backgroundColor: theme.fn.variant({ variant: "filled" }).hover })),
    "&[data-disabled]": {
      cursor: "default",
      color: theme.colors.dark[2]
    }
  }),
  nothingFound: {
    boxSizing: "border-box",
    color: theme.colors.gray[6],
    paddingTop: `calc(${getSize({ size, sizes: theme.spacing })} / 2)`,
    paddingBottom: `calc(${getSize({ size, sizes: theme.spacing })} / 2)`,
    textAlign: "center"
  },
  separator: {
    boxSizing: "border-box",
    textAlign: "left",
    width: "100%",
    padding: `calc(${getSize({ size, sizes: theme.spacing })} / 1.5) ${getSize({
      size,
      sizes: theme.spacing
    })}`
  },
  separatorLabel: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[5]
  }
}));

var useStyles$r = useStyles$q;

var __defProp$v = Object.defineProperty;
var __getOwnPropSymbols$w = Object.getOwnPropertySymbols;
var __hasOwnProp$w = Object.prototype.hasOwnProperty;
var __propIsEnum$w = Object.prototype.propertyIsEnumerable;
var __defNormalProp$v = (obj, key, value) => key in obj ? __defProp$v(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$v = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$w.call(b, prop))
      __defNormalProp$v(a, prop, b[prop]);
  if (__getOwnPropSymbols$w)
    for (var prop of __getOwnPropSymbols$w(b)) {
      if (__propIsEnum$w.call(b, prop))
        __defNormalProp$v(a, prop, b[prop]);
    }
  return a;
};
function SelectItems({
  data,
  hovered,
  classNames,
  styles,
  isItemSelected,
  uuid,
  __staticSelector,
  onItemHover,
  onItemSelect,
  itemsRefs,
  itemComponent: Item,
  size,
  nothingFound,
  creatable,
  createLabel,
  unstyled,
  variant
}) {
  const { classes } = useStyles$r(null, {
    classNames,
    styles,
    unstyled,
    name: __staticSelector,
    variant,
    size
  });
  const unGroupedItems = [];
  const groupedItems = [];
  let creatableDataIndex = null;
  const constructItemComponent = (item, index) => {
    const selected = typeof isItemSelected === "function" ? isItemSelected(item.value) : false;
    return /* @__PURE__ */ React.createElement(Item, __spreadValues$v({
      key: item.value,
      className: classes.item,
      "data-disabled": item.disabled || void 0,
      "data-hovered": !item.disabled && hovered === index || void 0,
      "data-selected": !item.disabled && selected || void 0,
      selected,
      onMouseEnter: () => onItemHover(index),
      id: `${uuid}-${index}`,
      role: "option",
      tabIndex: -1,
      "aria-selected": hovered === index,
      ref: (node) => {
        if (itemsRefs && itemsRefs.current) {
          itemsRefs.current[item.value] = node;
        }
      },
      onMouseDown: !item.disabled ? (event) => {
        event.preventDefault();
        onItemSelect(item);
      } : null,
      disabled: item.disabled,
      variant
    }, item));
  };
  let groupName = null;
  data.forEach((item, index) => {
    if (item.creatable) {
      creatableDataIndex = index;
    } else if (!item.group) {
      unGroupedItems.push(constructItemComponent(item, index));
    } else {
      if (groupName !== item.group) {
        groupName = item.group;
        groupedItems.push(/* @__PURE__ */ React.createElement("div", {
          className: classes.separator,
          key: `__mantine-divider-${index}`
        }, /* @__PURE__ */ React.createElement(Divider, {
          classNames: { label: classes.separatorLabel },
          label: item.group
        })));
      }
      groupedItems.push(constructItemComponent(item, index));
    }
  });
  if (creatable) {
    const creatableDataItem = data[creatableDataIndex];
    unGroupedItems.push(/* @__PURE__ */ React.createElement("div", {
      key: randomId(),
      className: classes.item,
      "data-hovered": hovered === creatableDataIndex || void 0,
      onMouseEnter: () => onItemHover(creatableDataIndex),
      onMouseDown: (event) => {
        event.preventDefault();
        onItemSelect(creatableDataItem);
      },
      tabIndex: -1,
      ref: (node) => {
        if (itemsRefs && itemsRefs.current) {
          itemsRefs.current[creatableDataItem.value] = node;
        }
      }
    }, createLabel));
  }
  if (groupedItems.length > 0 && unGroupedItems.length > 0) {
    unGroupedItems.unshift(/* @__PURE__ */ React.createElement("div", {
      className: classes.separator,
      key: "empty-group-separator"
    }, /* @__PURE__ */ React.createElement(Divider, null)));
  }
  return groupedItems.length > 0 || unGroupedItems.length > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, groupedItems, unGroupedItems) : /* @__PURE__ */ React.createElement(Text, {
    size,
    unstyled,
    className: classes.nothingFound
  }, nothingFound);
}
SelectItems.displayName = "@mantine/core/SelectItems";

var __defProp$u = Object.defineProperty;
var __getOwnPropSymbols$v = Object.getOwnPropertySymbols;
var __hasOwnProp$v = Object.prototype.hasOwnProperty;
var __propIsEnum$v = Object.prototype.propertyIsEnumerable;
var __defNormalProp$u = (obj, key, value) => key in obj ? __defProp$u(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$u = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$v.call(b, prop))
      __defNormalProp$u(a, prop, b[prop]);
  if (__getOwnPropSymbols$v)
    for (var prop of __getOwnPropSymbols$v(b)) {
      if (__propIsEnum$v.call(b, prop))
        __defNormalProp$u(a, prop, b[prop]);
    }
  return a;
};
var __objRest$o = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$v.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$v)
    for (var prop of __getOwnPropSymbols$v(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$v.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const DefaultItem = React.forwardRef((_a, ref) => {
  var _b = _a, { label, value } = _b, others = __objRest$o(_b, ["label", "value"]);
  return /* @__PURE__ */ React.createElement("div", __spreadValues$u({
    ref
  }, others), label || value);
});
DefaultItem.displayName = "@mantine/core/DefaultItem";

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$var$setRef(ref, value) {
    if (typeof ref === 'function') ref(value);
    else if (ref !== null && ref !== undefined) ref.current = value;
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$43e446d32b3d21af(...refs) {
    return (node)=>refs.forEach((ref)=>$6ed0406888f73fc4$var$setRef(ref, node)
        )
    ;
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ function $6ed0406888f73fc4$export$c7b2cbe3552a0d05(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useCallback($6ed0406888f73fc4$export$43e446d32b3d21af(...refs), refs);
}

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$8c6ed5c666ac1360 = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find($5e63c961fc1ce211$var$isSlottable);
    if (slottable) {
        // the new element to render is the one passed as a child of `Slottable`
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child)=>{
            if (child === slottable) {
                // because the new element will be the one rendered, we are only interested
                // in grabbing its children (`newElement.props.children`)
                if (React.Children.count(newElement) > 1) return React.Children.only(null);
                return /*#__PURE__*/ React.isValidElement(newElement) ? newElement.props.children : null;
            } else return child;
        });
        return /*#__PURE__*/ React.createElement($5e63c961fc1ce211$var$SlotClone, $fnFM9$babelruntimehelpersesmextends({}, slotProps, {
            ref: forwardedRef
        }), /*#__PURE__*/ React.isValidElement(newElement) ? /*#__PURE__*/ React.cloneElement(newElement, undefined, newChildren) : null);
    }
    return /*#__PURE__*/ React.createElement($5e63c961fc1ce211$var$SlotClone, $fnFM9$babelruntimehelpersesmextends({}, slotProps, {
        ref: forwardedRef
    }), children);
});
$5e63c961fc1ce211$export$8c6ed5c666ac1360.displayName = 'Slot';
/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$var$SlotClone = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { children: children , ...slotProps } = props;
    if (/*#__PURE__*/ React.isValidElement(children)) return /*#__PURE__*/ React.cloneElement(children, {
        ...$5e63c961fc1ce211$var$mergeProps(slotProps, children.props),
        ref: $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, children.ref)
    });
    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
$5e63c961fc1ce211$var$SlotClone.displayName = 'SlotClone';
/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/ const $5e63c961fc1ce211$export$d9f1ccf0bdb05d45 = ({ children: children  })=>{
    return /*#__PURE__*/ React.createElement(React.Fragment, null, children);
};
/* ---------------------------------------------------------------------------------------------- */ function $5e63c961fc1ce211$var$isSlottable(child) {
    return /*#__PURE__*/ React.isValidElement(child) && child.type === $5e63c961fc1ce211$export$d9f1ccf0bdb05d45;
}
function $5e63c961fc1ce211$var$mergeProps(slotProps, childProps) {
    // all child props should override
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            // if the handler exists on both, we compose them
            if (slotPropValue && childPropValue) overrideProps[propName] = (...args)=>{
                childPropValue(...args);
                slotPropValue(...args);
            };
            else if (slotPropValue) overrideProps[propName] = slotPropValue;
        } else if (propName === 'style') overrideProps[propName] = {
            ...slotPropValue,
            ...childPropValue
        };
        else if (propName === 'className') overrideProps[propName] = [
            slotPropValue,
            childPropValue
        ].filter(Boolean).join(' ');
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}

const $8927f6f2acc4f386$var$NODES = [
    'a',
    'button',
    'div',
    'h2',
    'h3',
    'img',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'span',
    'svg',
    'ul'
]; // Temporary while we await merge of this fix:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/55396
// prettier-ignore
/* -------------------------------------------------------------------------------------------------
 * Primitive
 * -----------------------------------------------------------------------------------------------*/ const $8927f6f2acc4f386$export$250ffa63cdc0d034 = $8927f6f2acc4f386$var$NODES.reduce((primitive, node)=>{
    const Node = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
        const { asChild: asChild , ...primitiveProps } = props;
        const Comp = asChild ? $5e63c961fc1ce211$export$8c6ed5c666ac1360 : node;
        React.useEffect(()=>{
            window[Symbol.for('radix-ui')] = true;
        }, []);
        return /*#__PURE__*/ React.createElement(Comp, $fnFM9$babelruntimehelpersesmextends({}, primitiveProps, {
            ref: forwardedRef
        }));
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});

/**
 * On the server, React emits a warning when calling `useLayoutEffect`.
 * This is because neither `useLayoutEffect` nor `useEffect` run on the server.
 * We use this safe version which suppresses the warning by replacing it with a noop on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */ const $9f79659886946c16$export$e5c5a5f917a5871c = Boolean(globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) ? React.useLayoutEffect : ()=>{};

function $fe963b355347cc68$export$3e6543de14f8614f(initialState, machine) {
    return React.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState !== null && nextState !== void 0 ? nextState : state;
    }, initialState);
}


const $921a889cee6df7e8$export$99c2b779aa4e8b8b = (props)=>{
    const { present: present , children: children  } = props;
    const presence = $921a889cee6df7e8$var$usePresence(present);
    const child = typeof children === 'function' ? children({
        present: presence.isPresent
    }) : React.Children.only(children);
    const ref = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(presence.ref, child.ref);
    const forceMount = typeof children === 'function';
    return forceMount || presence.isPresent ? /*#__PURE__*/ React.cloneElement(child, {
        ref: ref
    }) : null;
};
$921a889cee6df7e8$export$99c2b779aa4e8b8b.displayName = 'Presence';
/* -------------------------------------------------------------------------------------------------
 * usePresence
 * -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$usePresence(present) {
    const [node1, setNode] = React.useState();
    const stylesRef = React.useRef({});
    const prevPresentRef = React.useRef(present);
    const prevAnimationNameRef = React.useRef('none');
    const initialState = present ? 'mounted' : 'unmounted';
    const [state, send] = $fe963b355347cc68$export$3e6543de14f8614f(initialState, {
        mounted: {
            UNMOUNT: 'unmounted',
            ANIMATION_OUT: 'unmountSuspended'
        },
        unmountSuspended: {
            MOUNT: 'mounted',
            ANIMATION_END: 'unmounted'
        },
        unmounted: {
            MOUNT: 'mounted'
        }
    });
    React.useEffect(()=>{
        const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === 'mounted' ? currentAnimationName : 'none';
    }, [
        state
    ]);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(styles);
            if (present) send('MOUNT');
            else if (currentAnimationName === 'none' || (styles === null || styles === void 0 ? void 0 : styles.display) === 'none') // If there is no exit animation or the element is hidden, animations won't run
            // so we unmount instantly
            send('UNMOUNT');
            else {
                /**
         * When `present` changes to `false`, we check changes to animation-name to
         * determine whether an animation has started. We chose this approach (reading
         * computed styles) because there is no `animationrun` event and `animationstart`
         * fires after `animation-delay` has expired which would be too late.
         */ const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) send('ANIMATION_OUT');
                else send('UNMOUNT');
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        if (node1) {
            /**
       * Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
       * event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
       * make sure we only trigger ANIMATION_END for the currently active animation.
       */ const handleAnimationEnd = (event)=>{
                const currentAnimationName = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(event.animationName);
                if (event.target === node1 && isCurrentAnimation) // With React 18 concurrency this update is applied
                // a frame after the animation ends, creating a flash of visible content.
                // By manually flushing we ensure they sync within a frame, removing the flash.
                React.flushSync(()=>send('ANIMATION_END')
                );
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node1) // if animation occurred, store its name as the previous animation.
                prevAnimationNameRef.current = $921a889cee6df7e8$var$getAnimationName(stylesRef.current);
            };
            node1.addEventListener('animationstart', handleAnimationStart);
            node1.addEventListener('animationcancel', handleAnimationEnd);
            node1.addEventListener('animationend', handleAnimationEnd);
            return ()=>{
                node1.removeEventListener('animationstart', handleAnimationStart);
                node1.removeEventListener('animationcancel', handleAnimationEnd);
                node1.removeEventListener('animationend', handleAnimationEnd);
            };
        } else // Transition to the unmounted state if the node is removed prematurely.
        // We avoid doing so during cleanup as the node may change but still exist.
        send('ANIMATION_END');
    }, [
        node1,
        send
    ]);
    return {
        isPresent: [
            'mounted',
            'unmountSuspended'
        ].includes(state),
        ref: React.useCallback((node)=>{
            if (node) stylesRef.current = getComputedStyle(node);
            setNode(node);
        }, [])
    };
}
/* -----------------------------------------------------------------------------------------------*/ function $921a889cee6df7e8$var$getAnimationName(styles) {
    return (styles === null || styles === void 0 ? void 0 : styles.animationName) || 'none';
}

/* -------------------------------------------------------------------------------------------------
 * createContextScope
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$50c7b4e9d9f19c1(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    /* -----------------------------------------------------------------------------------------------
   * createContext
   * ---------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$export$fd42f52fd3ae1109(rootComponentName, defaultContext) {
        const BaseContext = /*#__PURE__*/ React.createContext(defaultContext);
        const index = defaultContexts.length;
        defaultContexts = [
            ...defaultContexts,
            defaultContext
        ];
        function Provider(props) {
            const { scope: scope , children: children , ...context } = props;
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext; // Only re-memoize when prop values change
            // eslint-disable-next-line react-hooks/exhaustive-deps
            const value = React.useMemo(()=>context
            , Object.values(context));
            return /*#__PURE__*/ React.createElement(Context.Provider, {
                value: value
            }, children);
        }
        function useContext(consumerName, scope) {
            const Context = (scope === null || scope === void 0 ? void 0 : scope[scopeName][index]) || BaseContext;
            const context = React.useContext(Context);
            if (context) return context;
            if (defaultContext !== undefined) return defaultContext; // if a defaultContext wasn't specified, it's a required context.
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        Provider.displayName = rootComponentName + 'Provider';
        return [
            Provider,
            useContext
        ];
    }
    /* -----------------------------------------------------------------------------------------------
   * createScope
   * ---------------------------------------------------------------------------------------------*/ const createScope = ()=>{
        const scopeContexts = defaultContexts.map((defaultContext)=>{
            return /*#__PURE__*/ React.createContext(defaultContext);
        });
        return function useScope(scope) {
            const contexts = (scope === null || scope === void 0 ? void 0 : scope[scopeName]) || scopeContexts;
            return React.useMemo(()=>({
                    [`__scope${scopeName}`]: {
                        ...scope,
                        [scopeName]: contexts
                    }
                })
            , [
                scope,
                contexts
            ]);
        };
    };
    createScope.scopeName = scopeName;
    return [
        $c512c27ab02ef895$export$fd42f52fd3ae1109,
        $c512c27ab02ef895$var$composeContextScopes(createScope, ...createContextScopeDeps)
    ];
}
/* -------------------------------------------------------------------------------------------------
 * composeContextScopes
 * -----------------------------------------------------------------------------------------------*/ function $c512c27ab02ef895$var$composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope1 = ()=>{
        const scopeHooks = scopes.map((createScope)=>({
                useScope: createScope(),
                scopeName: createScope.scopeName
            })
        );
        return function useComposedScopes(overrideScopes) {
            const nextScopes1 = scopeHooks.reduce((nextScopes, { useScope: useScope , scopeName: scopeName  })=>{
                // We are calling a hook inside a callback which React warns against to avoid inconsistent
                // renders, however, scoping doesn't have render side effects so we ignore the rule.
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return {
                    ...nextScopes,
                    ...currentScope
                };
            }, {});
            return React.useMemo(()=>({
                    [`__scope${baseScope.scopeName}`]: nextScopes1
                })
            , [
                nextScopes1
            ]);
        };
    };
    createScope1.scopeName = baseScope.scopeName;
    return createScope1;
}

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */ function $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback) {
    const callbackRef = React.useRef(callback);
    React.useEffect(()=>{
        callbackRef.current = callback;
    }); // https://github.com/facebook/react/issues/19240
    return React.useMemo(()=>(...args)=>{
            var _callbackRef$current;
            return (_callbackRef$current = callbackRef.current) === null || _callbackRef$current === void 0 ? void 0 : _callbackRef$current.call(callbackRef, ...args);
        }
    , []);
}

const $f631663db3294ace$var$DirectionContext = /*#__PURE__*/ React.createContext(undefined);
/* -----------------------------------------------------------------------------------------------*/ function $f631663db3294ace$export$b39126d51d94e6f3(localDir) {
    const globalDir = React.useContext($f631663db3294ace$var$DirectionContext);
    return localDir || globalDir || 'ltr';
}

function $ae6933e535247d3d$export$7d15b64cf5a3a4c4(value, [min, max]) {
    return Math.min(max, Math.max(min, value));
}

function $e42e1063c40fb3ef$export$b9ecd428b558ff10(originalEventHandler, ourEventHandler, { checkForDefaultPrevented: checkForDefaultPrevented = true  } = {}) {
    return function handleEvent(event) {
        originalEventHandler === null || originalEventHandler === void 0 || originalEventHandler(event);
        if (checkForDefaultPrevented === false || !event.defaultPrevented) return ourEventHandler === null || ourEventHandler === void 0 ? void 0 : ourEventHandler(event);
    };
}

function $6c2e24571c90391f$export$3e6543de14f8614f(initialState, machine) {
    return React.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState !== null && nextState !== void 0 ? nextState : state;
    }, initialState);
}


/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$SCROLL_AREA_NAME = 'ScrollArea';
const [$57acba87d6e25586$var$createScrollAreaContext, $57acba87d6e25586$export$488468afe3a6f2b1] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($57acba87d6e25586$var$SCROLL_AREA_NAME);
const [$57acba87d6e25586$var$ScrollAreaProvider, $57acba87d6e25586$var$useScrollAreaContext] = $57acba87d6e25586$var$createScrollAreaContext($57acba87d6e25586$var$SCROLL_AREA_NAME);
const $57acba87d6e25586$export$ccf8d8d7bbf3c2cc = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , type: type = 'hover' , dir: dir , scrollHideDelay: scrollHideDelay = 600 , ...scrollAreaProps } = props;
    const [scrollArea, setScrollArea] = React.useState(null);
    const [viewport, setViewport] = React.useState(null);
    const [content, setContent] = React.useState(null);
    const [scrollbarX, setScrollbarX] = React.useState(null);
    const [scrollbarY, setScrollbarY] = React.useState(null);
    const [cornerWidth, setCornerWidth] = React.useState(0);
    const [cornerHeight, setCornerHeight] = React.useState(0);
    const [scrollbarXEnabled, setScrollbarXEnabled] = React.useState(false);
    const [scrollbarYEnabled, setScrollbarYEnabled] = React.useState(false);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, (node)=>setScrollArea(node)
    );
    const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
    return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaProvider, {
        scope: __scopeScrollArea,
        type: type,
        dir: direction,
        scrollHideDelay: scrollHideDelay,
        scrollArea: scrollArea,
        viewport: viewport,
        onViewportChange: setViewport,
        content: content,
        onContentChange: setContent,
        scrollbarX: scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled: scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY: scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled: scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight
    }, /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, $fnFM9$babelruntimehelpersesmextends({
        dir: direction
    }, scrollAreaProps, {
        ref: composedRefs,
        style: {
            position: 'relative',
            // Pass corner sizes as CSS vars to reduce re-renders of context consumers
            ['--radix-scroll-area-corner-width']: cornerWidth + 'px',
            ['--radix-scroll-area-corner-height']: cornerHeight + 'px',
            ...props.style
        }
    })));
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaViewport
 * -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$VIEWPORT_NAME = 'ScrollAreaViewport';
const $57acba87d6e25586$export$a21cbf9f11fca853 = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , children: children , ...viewportProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$VIEWPORT_NAME, __scopeScrollArea);
    const ref = React.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref, context.onViewportChange);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("style", {
        dangerouslySetInnerHTML: {
            __html: `[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`
        }
    }), /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, $fnFM9$babelruntimehelpersesmextends({
        "data-radix-scroll-area-viewport": ""
    }, viewportProps, {
        ref: composedRefs,
        style: {
            /**
       * We don't support `visible` because the intention is to have at least one scrollbar
       * if this component is used and `visible` will behave like `auto` in that case
       * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
       *
       * We don't handle `auto` because the intention is for the native implementation
       * to be hidden if using this component. We just want to ensure the node is scrollable
       * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
       * the browser from having to work out whether to render native scrollbars or not,
       * we tell it to with the intention of hiding them in CSS.
       */ overflowX: context.scrollbarXEnabled ? 'scroll' : 'hidden',
            overflowY: context.scrollbarYEnabled ? 'scroll' : 'hidden',
            ...props.style
        }
    }), /*#__PURE__*/ React.createElement("div", {
        ref: context.onContentChange,
        style: {
            minWidth: '100%',
            display: 'table'
        }
    }, children)));
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaScrollbar
 * -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$SCROLLBAR_NAME = 'ScrollAreaScrollbar';
const $57acba87d6e25586$export$2fabd85d0eba3c57 = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const { onScrollbarXEnabledChange: onScrollbarXEnabledChange , onScrollbarYEnabledChange: onScrollbarYEnabledChange  } = context;
    const isHorizontal = props.orientation === 'horizontal';
    React.useEffect(()=>{
        isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
        return ()=>{
            isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
        };
    }, [
        isHorizontal,
        onScrollbarXEnabledChange,
        onScrollbarYEnabledChange
    ]);
    return context.type === 'hover' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarHover, $fnFM9$babelruntimehelpersesmextends({}, scrollbarProps, {
        ref: forwardedRef,
        forceMount: forceMount
    })) : context.type === 'scroll' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarScroll, $fnFM9$babelruntimehelpersesmextends({}, scrollbarProps, {
        ref: forwardedRef,
        forceMount: forceMount
    })) : context.type === 'auto' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarAuto, $fnFM9$babelruntimehelpersesmextends({}, scrollbarProps, {
        ref: forwardedRef,
        forceMount: forceMount
    })) : context.type === 'always' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarVisible, $fnFM9$babelruntimehelpersesmextends({}, scrollbarProps, {
        ref: forwardedRef
    })) : null;
});
/* -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$ScrollAreaScrollbarHover = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const [visible, setVisible] = React.useState(false);
    React.useEffect(()=>{
        const scrollArea = context.scrollArea;
        let hideTimer = 0;
        if (scrollArea) {
            const handlePointerEnter = ()=>{
                window.clearTimeout(hideTimer);
                setVisible(true);
            };
            const handlePointerLeave = ()=>{
                hideTimer = window.setTimeout(()=>setVisible(false)
                , context.scrollHideDelay);
            };
            scrollArea.addEventListener('pointerenter', handlePointerEnter);
            scrollArea.addEventListener('pointerleave', handlePointerLeave);
            return ()=>{
                window.clearTimeout(hideTimer);
                scrollArea.removeEventListener('pointerenter', handlePointerEnter);
                scrollArea.removeEventListener('pointerleave', handlePointerLeave);
            };
        }
    }, [
        context.scrollArea,
        context.scrollHideDelay
    ]);
    return /*#__PURE__*/ React.createElement($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || visible
    }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarAuto, $fnFM9$babelruntimehelpersesmextends({
        "data-state": visible ? 'visible' : 'hidden'
    }, scrollbarProps, {
        ref: forwardedRef
    })));
});
const $57acba87d6e25586$var$ScrollAreaScrollbarScroll = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const isHorizontal = props.orientation === 'horizontal';
    const debounceScrollEnd = $57acba87d6e25586$var$useDebounceCallback(()=>send('SCROLL_END')
    , 100);
    const [state, send] = $6c2e24571c90391f$export$3e6543de14f8614f('hidden', {
        hidden: {
            SCROLL: 'scrolling'
        },
        scrolling: {
            SCROLL_END: 'idle',
            POINTER_ENTER: 'interacting'
        },
        interacting: {
            SCROLL: 'interacting',
            POINTER_LEAVE: 'idle'
        },
        idle: {
            HIDE: 'hidden',
            SCROLL: 'scrolling',
            POINTER_ENTER: 'interacting'
        }
    });
    React.useEffect(()=>{
        if (state === 'idle') {
            const hideTimer = window.setTimeout(()=>send('HIDE')
            , context.scrollHideDelay);
            return ()=>window.clearTimeout(hideTimer)
            ;
        }
    }, [
        state,
        context.scrollHideDelay,
        send
    ]);
    React.useEffect(()=>{
        const viewport = context.viewport;
        const scrollDirection = isHorizontal ? 'scrollLeft' : 'scrollTop';
        if (viewport) {
            let prevScrollPos = viewport[scrollDirection];
            const handleScroll = ()=>{
                const scrollPos = viewport[scrollDirection];
                const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
                if (hasScrollInDirectionChanged) {
                    send('SCROLL');
                    debounceScrollEnd();
                }
                prevScrollPos = scrollPos;
            };
            viewport.addEventListener('scroll', handleScroll);
            return ()=>viewport.removeEventListener('scroll', handleScroll)
            ;
        }
    }, [
        context.viewport,
        isHorizontal,
        send,
        debounceScrollEnd
    ]);
    return /*#__PURE__*/ React.createElement($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || state !== 'hidden'
    }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarVisible, $fnFM9$babelruntimehelpersesmextends({
        "data-state": state === 'hidden' ? 'hidden' : 'visible'
    }, scrollbarProps, {
        ref: forwardedRef,
        onPointerEnter: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerEnter, ()=>send('POINTER_ENTER')
        ),
        onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerLeave, ()=>send('POINTER_LEAVE')
        )
    })));
});
const $57acba87d6e25586$var$ScrollAreaScrollbarAuto = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const { forceMount: forceMount , ...scrollbarProps } = props;
    const [visible, setVisible] = React.useState(false);
    const isHorizontal = props.orientation === 'horizontal';
    const handleResize = $57acba87d6e25586$var$useDebounceCallback(()=>{
        if (context.viewport) {
            const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
            const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
            setVisible(isHorizontal ? isOverflowX : isOverflowY);
        }
    }, 10);
    $57acba87d6e25586$var$useResizeObserver(context.viewport, handleResize);
    $57acba87d6e25586$var$useResizeObserver(context.content, handleResize);
    return /*#__PURE__*/ React.createElement($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || visible
    }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarVisible, $fnFM9$babelruntimehelpersesmextends({
        "data-state": visible ? 'visible' : 'hidden'
    }, scrollbarProps, {
        ref: forwardedRef
    })));
});
/* -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$ScrollAreaScrollbarVisible = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { orientation: orientation = 'vertical' , ...scrollbarProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const thumbRef = React.useRef(null);
    const pointerOffsetRef = React.useRef(0);
    const [sizes, setSizes] = React.useState({
        content: 0,
        viewport: 0,
        scrollbar: {
            size: 0,
            paddingStart: 0,
            paddingEnd: 0
        }
    });
    const thumbRatio = $57acba87d6e25586$var$getThumbRatio(sizes.viewport, sizes.content);
    const commonProps = {
        ...scrollbarProps,
        sizes: sizes,
        onSizesChange: setSizes,
        hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
        onThumbChange: (thumb)=>thumbRef.current = thumb
        ,
        onThumbPointerUp: ()=>pointerOffsetRef.current = 0
        ,
        onThumbPointerDown: (pointerPos)=>pointerOffsetRef.current = pointerPos
    };
    function getScrollPosition(pointerPos, dir) {
        return $57acba87d6e25586$var$getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes, dir);
    }
    if (orientation === 'horizontal') return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarX, $fnFM9$babelruntimehelpersesmextends({}, commonProps, {
        ref: forwardedRef,
        onThumbPositionChange: ()=>{
            if (context.viewport && thumbRef.current) {
                const scrollPos = context.viewport.scrollLeft;
                const offset = $57acba87d6e25586$var$getThumbOffsetFromScroll(scrollPos, sizes, context.dir);
                thumbRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
            }
        },
        onWheelScroll: (scrollPos)=>{
            if (context.viewport) context.viewport.scrollLeft = scrollPos;
        },
        onDragScroll: (pointerPos)=>{
            if (context.viewport) context.viewport.scrollLeft = getScrollPosition(pointerPos, context.dir);
        }
    }));
    if (orientation === 'vertical') return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarY, $fnFM9$babelruntimehelpersesmextends({}, commonProps, {
        ref: forwardedRef,
        onThumbPositionChange: ()=>{
            if (context.viewport && thumbRef.current) {
                const scrollPos = context.viewport.scrollTop;
                const offset = $57acba87d6e25586$var$getThumbOffsetFromScroll(scrollPos, sizes);
                thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        },
        onWheelScroll: (scrollPos)=>{
            if (context.viewport) context.viewport.scrollTop = scrollPos;
        },
        onDragScroll: (pointerPos)=>{
            if (context.viewport) context.viewport.scrollTop = getScrollPosition(pointerPos);
        }
    }));
    return null;
});
/* -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$ScrollAreaScrollbarX = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { sizes: sizes , onSizesChange: onSizesChange , ...scrollbarProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const [computedStyle, setComputedStyle] = React.useState();
    const ref = React.useRef(null);
    const composeRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref, context.onScrollbarXChange);
    React.useEffect(()=>{
        if (ref.current) setComputedStyle(getComputedStyle(ref.current));
    }, [
        ref
    ]);
    return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarImpl, $fnFM9$babelruntimehelpersesmextends({
        "data-orientation": "horizontal"
    }, scrollbarProps, {
        ref: composeRefs,
        sizes: sizes,
        style: {
            bottom: 0,
            left: context.dir === 'rtl' ? 'var(--radix-scroll-area-corner-width)' : 0,
            right: context.dir === 'ltr' ? 'var(--radix-scroll-area-corner-width)' : 0,
            ['--radix-scroll-area-thumb-width']: $57acba87d6e25586$var$getThumbSize(sizes) + 'px',
            ...props.style
        },
        onThumbPointerDown: (pointerPos)=>props.onThumbPointerDown(pointerPos.x)
        ,
        onDragScroll: (pointerPos)=>props.onDragScroll(pointerPos.x)
        ,
        onWheelScroll: (event, maxScrollPos)=>{
            if (context.viewport) {
                const scrollPos = context.viewport.scrollLeft + event.deltaX;
                props.onWheelScroll(scrollPos); // prevent window scroll when wheeling on scrollbar
                if ($57acba87d6e25586$var$isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
            }
        },
        onResize: ()=>{
            if (ref.current && context.viewport && computedStyle) onSizesChange({
                content: context.viewport.scrollWidth,
                viewport: context.viewport.offsetWidth,
                scrollbar: {
                    size: ref.current.clientWidth,
                    paddingStart: $57acba87d6e25586$var$toInt(computedStyle.paddingLeft),
                    paddingEnd: $57acba87d6e25586$var$toInt(computedStyle.paddingRight)
                }
            });
        }
    }));
});
const $57acba87d6e25586$var$ScrollAreaScrollbarY = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { sizes: sizes , onSizesChange: onSizesChange , ...scrollbarProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, props.__scopeScrollArea);
    const [computedStyle, setComputedStyle] = React.useState();
    const ref = React.useRef(null);
    const composeRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref, context.onScrollbarYChange);
    React.useEffect(()=>{
        if (ref.current) setComputedStyle(getComputedStyle(ref.current));
    }, [
        ref
    ]);
    return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarImpl, $fnFM9$babelruntimehelpersesmextends({
        "data-orientation": "vertical"
    }, scrollbarProps, {
        ref: composeRefs,
        sizes: sizes,
        style: {
            top: 0,
            right: context.dir === 'ltr' ? 0 : undefined,
            left: context.dir === 'rtl' ? 0 : undefined,
            bottom: 'var(--radix-scroll-area-corner-height)',
            ['--radix-scroll-area-thumb-height']: $57acba87d6e25586$var$getThumbSize(sizes) + 'px',
            ...props.style
        },
        onThumbPointerDown: (pointerPos)=>props.onThumbPointerDown(pointerPos.y)
        ,
        onDragScroll: (pointerPos)=>props.onDragScroll(pointerPos.y)
        ,
        onWheelScroll: (event, maxScrollPos)=>{
            if (context.viewport) {
                const scrollPos = context.viewport.scrollTop + event.deltaY;
                props.onWheelScroll(scrollPos); // prevent window scroll when wheeling on scrollbar
                if ($57acba87d6e25586$var$isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) event.preventDefault();
            }
        },
        onResize: ()=>{
            if (ref.current && context.viewport && computedStyle) onSizesChange({
                content: context.viewport.scrollHeight,
                viewport: context.viewport.offsetHeight,
                scrollbar: {
                    size: ref.current.clientHeight,
                    paddingStart: $57acba87d6e25586$var$toInt(computedStyle.paddingTop),
                    paddingEnd: $57acba87d6e25586$var$toInt(computedStyle.paddingBottom)
                }
            });
        }
    }));
});
/* -----------------------------------------------------------------------------------------------*/ const [$57acba87d6e25586$var$ScrollbarProvider, $57acba87d6e25586$var$useScrollbarContext] = $57acba87d6e25586$var$createScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME);
const $57acba87d6e25586$var$ScrollAreaScrollbarImpl = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , sizes: sizes , hasThumb: hasThumb , onThumbChange: onThumbChange , onThumbPointerUp: onThumbPointerUp , onThumbPointerDown: onThumbPointerDown , onThumbPositionChange: onThumbPositionChange , onDragScroll: onDragScroll , onWheelScroll: onWheelScroll , onResize: onResize , ...scrollbarProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$SCROLLBAR_NAME, __scopeScrollArea);
    const [scrollbar, setScrollbar] = React.useState(null);
    const composeRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, (node)=>setScrollbar(node)
    );
    const rectRef = React.useRef(null);
    const prevWebkitUserSelectRef = React.useRef('');
    const viewport = context.viewport;
    const maxScrollPos = sizes.content - sizes.viewport;
    const handleWheelScroll = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onWheelScroll);
    const handleThumbPositionChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onThumbPositionChange);
    const handleResize = $57acba87d6e25586$var$useDebounceCallback(onResize, 10);
    function handleDragScroll(event) {
        if (rectRef.current) {
            const x = event.clientX - rectRef.current.left;
            const y = event.clientY - rectRef.current.top;
            onDragScroll({
                x: x,
                y: y
            });
        }
    }
    /**
   * We bind wheel event imperatively so we can switch off passive
   * mode for document wheel event to allow it to be prevented
   */ React.useEffect(()=>{
        const handleWheel = (event)=>{
            const element = event.target;
            const isScrollbarWheel = scrollbar === null || scrollbar === void 0 ? void 0 : scrollbar.contains(element);
            if (isScrollbarWheel) handleWheelScroll(event, maxScrollPos);
        };
        document.addEventListener('wheel', handleWheel, {
            passive: false
        });
        return ()=>document.removeEventListener('wheel', handleWheel, {
                passive: false
            })
        ;
    }, [
        viewport,
        scrollbar,
        maxScrollPos,
        handleWheelScroll
    ]);
    /**
   * Update thumb position on sizes change
   */ React.useEffect(handleThumbPositionChange, [
        sizes,
        handleThumbPositionChange
    ]);
    $57acba87d6e25586$var$useResizeObserver(scrollbar, handleResize);
    $57acba87d6e25586$var$useResizeObserver(context.content, handleResize);
    return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollbarProvider, {
        scope: __scopeScrollArea,
        scrollbar: scrollbar,
        hasThumb: hasThumb,
        onThumbChange: $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onThumbChange),
        onThumbPointerUp: $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onThumbPointerUp),
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown: $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onThumbPointerDown)
    }, /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, $fnFM9$babelruntimehelpersesmextends({}, scrollbarProps, {
        ref: composeRefs,
        style: {
            position: 'absolute',
            ...scrollbarProps.style
        },
        onPointerDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerDown, (event)=>{
            const mainPointer = 0;
            if (event.button === mainPointer) {
                const element = event.target;
                element.setPointerCapture(event.pointerId);
                rectRef.current = scrollbar.getBoundingClientRect(); // pointer capture doesn't prevent text selection in Safari
                // so we remove text selection manually when scrolling
                prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
                document.body.style.webkitUserSelect = 'none';
                handleDragScroll(event);
            }
        }),
        onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerMove, handleDragScroll),
        onPointerUp: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerUp, (event)=>{
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            rectRef.current = null;
        })
    })));
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumb
 * -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$THUMB_NAME = 'ScrollAreaThumb';
const $57acba87d6e25586$export$9fba1154677d7cd2 = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { forceMount: forceMount , ...thumbProps } = props;
    const scrollbarContext = $57acba87d6e25586$var$useScrollbarContext($57acba87d6e25586$var$THUMB_NAME, props.__scopeScrollArea);
    return /*#__PURE__*/ React.createElement($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
        present: forceMount || scrollbarContext.hasThumb
    }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaThumbImpl, $fnFM9$babelruntimehelpersesmextends({
        ref: forwardedRef
    }, thumbProps)));
});
const $57acba87d6e25586$var$ScrollAreaThumbImpl = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , style: style , ...thumbProps } = props;
    const scrollAreaContext = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$THUMB_NAME, __scopeScrollArea);
    const scrollbarContext = $57acba87d6e25586$var$useScrollbarContext($57acba87d6e25586$var$THUMB_NAME, __scopeScrollArea);
    const { onThumbPositionChange: onThumbPositionChange  } = scrollbarContext;
    const composedRef = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, (node)=>scrollbarContext.onThumbChange(node)
    );
    const removeUnlinkedScrollListenerRef = React.useRef();
    const debounceScrollEnd = $57acba87d6e25586$var$useDebounceCallback(()=>{
        if (removeUnlinkedScrollListenerRef.current) {
            removeUnlinkedScrollListenerRef.current();
            removeUnlinkedScrollListenerRef.current = undefined;
        }
    }, 100);
    React.useEffect(()=>{
        const viewport = scrollAreaContext.viewport;
        if (viewport) {
            /**
       * We only bind to native scroll event so we know when scroll starts and ends.
       * When scroll starts we start a requestAnimationFrame loop that checks for
       * changes to scroll position. That rAF loop triggers our thumb position change
       * when relevant to avoid scroll-linked effects. We cancel the loop when scroll ends.
       * https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
       */ const handleScroll = ()=>{
                debounceScrollEnd();
                if (!removeUnlinkedScrollListenerRef.current) {
                    const listener = $57acba87d6e25586$var$addUnlinkedScrollListener(viewport, onThumbPositionChange);
                    removeUnlinkedScrollListenerRef.current = listener;
                    onThumbPositionChange();
                }
            };
            onThumbPositionChange();
            viewport.addEventListener('scroll', handleScroll);
            return ()=>viewport.removeEventListener('scroll', handleScroll)
            ;
        }
    }, [
        scrollAreaContext.viewport,
        debounceScrollEnd,
        onThumbPositionChange
    ]);
    return /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, $fnFM9$babelruntimehelpersesmextends({
        "data-state": scrollbarContext.hasThumb ? 'visible' : 'hidden'
    }, thumbProps, {
        ref: composedRef,
        style: {
            width: 'var(--radix-scroll-area-thumb-width)',
            height: 'var(--radix-scroll-area-thumb-height)',
            ...style
        },
        onPointerDownCapture: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerDownCapture, (event)=>{
            const thumb = event.target;
            const thumbRect = thumb.getBoundingClientRect();
            const x = event.clientX - thumbRect.left;
            const y = event.clientY - thumbRect.top;
            scrollbarContext.onThumbPointerDown({
                x: x,
                y: y
            });
        }),
        onPointerUp: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerUp, scrollbarContext.onThumbPointerUp)
    }));
});
/* -------------------------------------------------------------------------------------------------
 * ScrollAreaCorner
 * -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$CORNER_NAME = 'ScrollAreaCorner';
const $57acba87d6e25586$export$56969d565df7cc4b = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$CORNER_NAME, props.__scopeScrollArea);
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY);
    const hasCorner = context.type !== 'scroll' && hasBothScrollbarsVisible;
    return hasCorner ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaCornerImpl, $fnFM9$babelruntimehelpersesmextends({}, props, {
        ref: forwardedRef
    })) : null;
});
/* -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$var$ScrollAreaCornerImpl = /*#__PURE__*/ React.forwardRef((props, forwardedRef)=>{
    const { __scopeScrollArea: __scopeScrollArea , ...cornerProps } = props;
    const context = $57acba87d6e25586$var$useScrollAreaContext($57acba87d6e25586$var$CORNER_NAME, __scopeScrollArea);
    const [width1, setWidth] = React.useState(0);
    const [height1, setHeight] = React.useState(0);
    const hasSize = Boolean(width1 && height1);
    $57acba87d6e25586$var$useResizeObserver(context.scrollbarX, ()=>{
        var _context$scrollbarX;
        const height = ((_context$scrollbarX = context.scrollbarX) === null || _context$scrollbarX === void 0 ? void 0 : _context$scrollbarX.offsetHeight) || 0;
        context.onCornerHeightChange(height);
        setHeight(height);
    });
    $57acba87d6e25586$var$useResizeObserver(context.scrollbarY, ()=>{
        var _context$scrollbarY;
        const width = ((_context$scrollbarY = context.scrollbarY) === null || _context$scrollbarY === void 0 ? void 0 : _context$scrollbarY.offsetWidth) || 0;
        context.onCornerWidthChange(width);
        setWidth(width);
    });
    return hasSize ? /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, $fnFM9$babelruntimehelpersesmextends({}, cornerProps, {
        ref: forwardedRef,
        style: {
            width: width1,
            height: height1,
            position: 'absolute',
            right: context.dir === 'ltr' ? 0 : undefined,
            left: context.dir === 'rtl' ? 0 : undefined,
            bottom: 0,
            ...props.style
        }
    })) : null;
});
/* -----------------------------------------------------------------------------------------------*/ function $57acba87d6e25586$var$toInt(value) {
    return value ? parseInt(value, 10) : 0;
}
function $57acba87d6e25586$var$getThumbRatio(viewportSize, contentSize) {
    const ratio = viewportSize / contentSize;
    return isNaN(ratio) ? 0 : ratio;
}
function $57acba87d6e25586$var$getThumbSize(sizes) {
    const ratio = $57acba87d6e25586$var$getThumbRatio(sizes.viewport, sizes.content);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio; // minimum of 18 matches macOS minimum
    return Math.max(thumbSize, 18);
}
function $57acba87d6e25586$var$getScrollPositionFromPointer(pointerPos, pointerOffset, sizes, dir = 'ltr') {
    const thumbSizePx = $57acba87d6e25586$var$getThumbSize(sizes);
    const thumbCenter = thumbSizePx / 2;
    const offset = pointerOffset || thumbCenter;
    const thumbOffsetFromEnd = thumbSizePx - offset;
    const minPointerPos = sizes.scrollbar.paddingStart + offset;
    const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
    const maxScrollPos = sizes.content - sizes.viewport;
    const scrollRange = dir === 'ltr' ? [
        0,
        maxScrollPos
    ] : [
        maxScrollPos * -1,
        0
    ];
    const interpolate = $57acba87d6e25586$var$linearScale([
        minPointerPos,
        maxPointerPos
    ], scrollRange);
    return interpolate(pointerPos);
}
function $57acba87d6e25586$var$getThumbOffsetFromScroll(scrollPos, sizes, dir = 'ltr') {
    const thumbSizePx = $57acba87d6e25586$var$getThumbSize(sizes);
    const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
    const scrollbar = sizes.scrollbar.size - scrollbarPadding;
    const maxScrollPos = sizes.content - sizes.viewport;
    const maxThumbPos = scrollbar - thumbSizePx;
    const scrollClampRange = dir === 'ltr' ? [
        0,
        maxScrollPos
    ] : [
        maxScrollPos * -1,
        0
    ];
    const scrollWithoutMomentum = $ae6933e535247d3d$export$7d15b64cf5a3a4c4(scrollPos, scrollClampRange);
    const interpolate = $57acba87d6e25586$var$linearScale([
        0,
        maxScrollPos
    ], [
        0,
        maxThumbPos
    ]);
    return interpolate(scrollWithoutMomentum);
} // https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
function $57acba87d6e25586$var$linearScale(input, output) {
    return (value)=>{
        if (input[0] === input[1] || output[0] === output[1]) return output[0];
        const ratio = (output[1] - output[0]) / (input[1] - input[0]);
        return output[0] + ratio * (value - input[0]);
    };
}
function $57acba87d6e25586$var$isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
    return scrollPos > 0 && scrollPos < maxScrollPos;
} // Custom scroll handler to avoid scroll-linked effects
// https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
const $57acba87d6e25586$var$addUnlinkedScrollListener = (node, handler = ()=>{})=>{
    let prevPosition = {
        left: node.scrollLeft,
        top: node.scrollTop
    };
    let rAF = 0;
    (function loop() {
        const position = {
            left: node.scrollLeft,
            top: node.scrollTop
        };
        const isHorizontalScroll = prevPosition.left !== position.left;
        const isVerticalScroll = prevPosition.top !== position.top;
        if (isHorizontalScroll || isVerticalScroll) handler();
        prevPosition = position;
        rAF = window.requestAnimationFrame(loop);
    })();
    return ()=>window.cancelAnimationFrame(rAF)
    ;
};
function $57acba87d6e25586$var$useDebounceCallback(callback, delay) {
    const handleCallback = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(callback);
    const debounceTimerRef = React.useRef(0);
    React.useEffect(()=>()=>window.clearTimeout(debounceTimerRef.current)
    , []);
    return React.useCallback(()=>{
        window.clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = window.setTimeout(handleCallback, delay);
    }, [
        handleCallback,
        delay
    ]);
}
function $57acba87d6e25586$var$useResizeObserver(element, onResize) {
    const handleResize = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onResize);
    $9f79659886946c16$export$e5c5a5f917a5871c(()=>{
        let rAF = 0;
        if (element) {
            /**
       * Resize Observer will throw an often benign error that says `ResizeObserver loop
       * completed with undelivered notifications`. This means that ResizeObserver was not
       * able to deliver all observations within a single animation frame, so we use
       * `requestAnimationFrame` to ensure we don't deliver unnecessary observations.
       * Further reading: https://github.com/WICG/resize-observer/issues/38
       */ const resizeObserver = new ResizeObserver(()=>{
                cancelAnimationFrame(rAF);
                rAF = window.requestAnimationFrame(handleResize);
            });
            resizeObserver.observe(element);
            return ()=>{
                window.cancelAnimationFrame(rAF);
                resizeObserver.unobserve(element);
            };
        }
    }, [
        element,
        handleResize
    ]);
}
/* -----------------------------------------------------------------------------------------------*/ const $57acba87d6e25586$export$be92b6f5f03c0fe9 = $57acba87d6e25586$export$ccf8d8d7bbf3c2cc;
const $57acba87d6e25586$export$d5c6c08dc2d3ca7 = $57acba87d6e25586$export$a21cbf9f11fca853;
const $57acba87d6e25586$export$9a4e88b92edfce6b = $57acba87d6e25586$export$2fabd85d0eba3c57;
const $57acba87d6e25586$export$6521433ed15a34db = $57acba87d6e25586$export$9fba1154677d7cd2;
const $57acba87d6e25586$export$ac61190d9fc311a9 = $57acba87d6e25586$export$56969d565df7cc4b;

var useStyles$o = createStyles((theme, { scrollbarSize, offsetScrollbars, scrollbarHovered, hidden }) => ({
  root: {
    overflow: "hidden"
  },
  viewport: {
    width: "100%",
    height: "100%",
    paddingRight: offsetScrollbars ? rem(scrollbarSize) : void 0,
    paddingBottom: offsetScrollbars ? rem(scrollbarSize) : void 0
  },
  scrollbar: {
    display: hidden ? "none" : "flex",
    userSelect: "none",
    touchAction: "none",
    boxSizing: "border-box",
    padding: `calc(${rem(scrollbarSize)}  / 5)`,
    transition: "background-color 150ms ease, opacity 150ms ease",
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
      [`& .${getStylesRef("thumb")}`]: {
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.white, 0.5) : theme.fn.rgba(theme.black, 0.5)
      }
    },
    '&[data-orientation="vertical"]': {
      width: rem(scrollbarSize)
    },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: rem(scrollbarSize)
    },
    '&[data-state="hidden"]': {
      display: "none",
      opacity: 0
    }
  },
  thumb: {
    ref: getStylesRef("thumb"),
    flex: 1,
    backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.white, 0.4) : theme.fn.rgba(theme.black, 0.4),
    borderRadius: rem(scrollbarSize),
    position: "relative",
    transition: "background-color 150ms ease",
    display: hidden ? "none" : void 0,
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "100%",
      minWidth: rem(44),
      minHeight: rem(44)
    }
  },
  corner: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    transition: "opacity 150ms ease",
    opacity: scrollbarHovered ? 1 : 0,
    display: hidden ? "none" : void 0
  }
}));

var useStyles$p = useStyles$o;

var __defProp$t = Object.defineProperty;
var __defProps$j = Object.defineProperties;
var __getOwnPropDescs$j = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$u = Object.getOwnPropertySymbols;
var __hasOwnProp$u = Object.prototype.hasOwnProperty;
var __propIsEnum$u = Object.prototype.propertyIsEnumerable;
var __defNormalProp$t = (obj, key, value) => key in obj ? __defProp$t(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$t = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$u.call(b, prop))
      __defNormalProp$t(a, prop, b[prop]);
  if (__getOwnPropSymbols$u)
    for (var prop of __getOwnPropSymbols$u(b)) {
      if (__propIsEnum$u.call(b, prop))
        __defNormalProp$t(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$j = (a, b) => __defProps$j(a, __getOwnPropDescs$j(b));
var __objRest$n = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$u.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$u)
    for (var prop of __getOwnPropSymbols$u(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$u.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$h = {
  scrollbarSize: 12,
  scrollHideDelay: 1e3,
  type: "hover",
  offsetScrollbars: false
};
const _ScrollArea = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("ScrollArea", defaultProps$h, props), {
    children,
    className,
    classNames,
    styles,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    variant,
    viewportProps
  } = _a, others = __objRest$n(_a, [
    "children",
    "className",
    "classNames",
    "styles",
    "scrollbarSize",
    "scrollHideDelay",
    "type",
    "dir",
    "offsetScrollbars",
    "viewportRef",
    "onScrollPositionChange",
    "unstyled",
    "variant",
    "viewportProps"
  ]);
  const [scrollbarHovered, setScrollbarHovered] = React.useState(false);
  const theme = useMantineTheme();
  const { classes, cx } = useStyles$p({ scrollbarSize, offsetScrollbars, scrollbarHovered, hidden: type === "never" }, { name: "ScrollArea", classNames, styles, unstyled, variant });
  return /* @__PURE__ */ React.createElement($57acba87d6e25586$export$be92b6f5f03c0fe9, {
    type: type === "never" ? "always" : type,
    scrollHideDelay,
    dir: dir || theme.dir,
    ref,
    asChild: true
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues$t({
    className: cx(classes.root, className)
  }, others), /* @__PURE__ */ React.createElement($57acba87d6e25586$export$d5c6c08dc2d3ca7, __spreadProps$j(__spreadValues$t({}, viewportProps), {
    className: classes.viewport,
    ref: viewportRef,
    onScroll: typeof onScrollPositionChange === "function" ? ({ currentTarget }) => onScrollPositionChange({
      x: currentTarget.scrollLeft,
      y: currentTarget.scrollTop
    }) : void 0
  }), children), /* @__PURE__ */ React.createElement($57acba87d6e25586$export$9a4e88b92edfce6b, {
    orientation: "horizontal",
    className: classes.scrollbar,
    forceMount: true,
    onMouseEnter: () => setScrollbarHovered(true),
    onMouseLeave: () => setScrollbarHovered(false)
  }, /* @__PURE__ */ React.createElement($57acba87d6e25586$export$6521433ed15a34db, {
    className: classes.thumb
  })), /* @__PURE__ */ React.createElement($57acba87d6e25586$export$9a4e88b92edfce6b, {
    orientation: "vertical",
    className: classes.scrollbar,
    forceMount: true,
    onMouseEnter: () => setScrollbarHovered(true),
    onMouseLeave: () => setScrollbarHovered(false)
  }, /* @__PURE__ */ React.createElement($57acba87d6e25586$export$6521433ed15a34db, {
    className: classes.thumb
  })), /* @__PURE__ */ React.createElement($57acba87d6e25586$export$ac61190d9fc311a9, {
    className: classes.corner
  })));
});
const ScrollAreaAutosize = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("ScrollAreaAutosize", defaultProps$h, props), {
    children,
    classNames,
    styles,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    sx,
    variant,
    viewportProps
  } = _a, others = __objRest$n(_a, [
    "children",
    "classNames",
    "styles",
    "scrollbarSize",
    "scrollHideDelay",
    "type",
    "dir",
    "offsetScrollbars",
    "viewportRef",
    "onScrollPositionChange",
    "unstyled",
    "sx",
    "variant",
    "viewportProps"
  ]);
  return /* @__PURE__ */ React.createElement(Box, __spreadProps$j(__spreadValues$t({}, others), {
    ref,
    sx: [{ display: "flex" }, ...packSx(sx)]
  }), /* @__PURE__ */ React.createElement(Box, {
    sx: { display: "flex", flexDirection: "column", flex: 1 }
  }, /* @__PURE__ */ React.createElement(_ScrollArea, {
    classNames,
    styles,
    scrollHideDelay,
    scrollbarSize,
    type,
    dir,
    offsetScrollbars,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    variant,
    viewportProps
  }, children)));
});
ScrollAreaAutosize.displayName = "@mantine/core/ScrollAreaAutosize";
_ScrollArea.displayName = "@mantine/core/ScrollArea";
_ScrollArea.Autosize = ScrollAreaAutosize;
const ScrollArea = _ScrollArea;

var __defProp$s = Object.defineProperty;
var __defProps$i = Object.defineProperties;
var __getOwnPropDescs$i = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$t = Object.getOwnPropertySymbols;
var __hasOwnProp$t = Object.prototype.hasOwnProperty;
var __propIsEnum$t = Object.prototype.propertyIsEnumerable;
var __defNormalProp$s = (obj, key, value) => key in obj ? __defProp$s(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$s = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$t.call(b, prop))
      __defNormalProp$s(a, prop, b[prop]);
  if (__getOwnPropSymbols$t)
    for (var prop of __getOwnPropSymbols$t(b)) {
      if (__propIsEnum$t.call(b, prop))
        __defNormalProp$s(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$i = (a, b) => __defProps$i(a, __getOwnPropDescs$i(b));
var __objRest$m = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$t.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$t)
    for (var prop of __getOwnPropSymbols$t(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$t.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const SelectScrollArea = React.forwardRef((_a, ref) => {
  var _b = _a, { style } = _b, others = __objRest$m(_b, ["style"]);
  return /* @__PURE__ */ React.createElement(ScrollArea, __spreadProps$i(__spreadValues$s({}, others), {
    style: __spreadValues$s({ width: "100%" }, style),
    viewportProps: { tabIndex: -1 },
    viewportRef: ref
  }), others.children);
});
SelectScrollArea.displayName = "@mantine/core/SelectScrollArea";

var useStyles$m = createStyles(() => ({
  dropdown: {},
  itemsWrapper: {
    padding: rem(4),
    display: "flex",
    width: "100%",
    boxSizing: "border-box"
  }
}));

var useStyles$n = useStyles$m;

function getAlignment(placement) {
  return placement.split('-')[1];
}

function getLengthFromAxis(axis) {
  return axis === 'y' ? 'height' : 'width';
}

function getSide(placement) {
  return placement.split('-')[0];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'x' : 'y';
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  const commonAlign = reference[length] / 2 - floating[length] / 2;
  const side = getSide(placement);
  const isVertical = mainAxis === 'x';
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
      coords[mainAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[mainAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain positioning strategy.
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
      continue;
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

function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}

function getSideObjectFromPadding(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}

function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}

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
  } = options;
  const paddingObject = getSideObjectFromPadding(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    ...rects.floating,
    x,
    y
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

const min$1 = Math.min;
const max$1 = Math.max;

function within(min$1$1, value, max$1$1) {
  return max$1(min$1$1, min$1(value, max$1$1));
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = options || {};
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements
    } = state;
    if (element == null) {
      return {};
    }
    const paddingObject = getSideObjectFromPadding(padding);
    const coords = {
      x,
      y
    };
    const axis = getMainAxisFromPlacement(placement);
    const length = getLengthFromAxis(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min = paddingObject[minProp];
    const max = clientSize - arrowDimensions[length] - paddingObject[maxProp];
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = within(min, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. This stops `shift()` from taking action, but can
    // be worked around by calling it again after the `arrow()` if desired.
    const shouldAddOffset = getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min ? paddingObject[minProp] : paddingObject[maxProp]) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min ? min - center : max - center : 0;
    return {
      [axis]: coords[axis] - alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset
      }
    };
  }
});

const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}

function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const length = getLengthFromAxis(mainAxis);
  let mainAlignmentSide = mainAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return {
    main: mainAlignmentSide,
    cross: getOppositePlacement(mainAlignmentSide)
  };
}

const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}

function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}

function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
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

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$flip;
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
      } = options;
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
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
        const {
          main,
          cross
        } = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[main], overflow[cross]);
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

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
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

function getBoundingRect(rects) {
  const minX = min$1(...rects.map(rect => rect.left));
  const minY = min$1(...rects.map(rect => rect.top));
  const maxX = max$1(...rects.map(rect => rect.right));
  const maxY = max$1(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = options;
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getSideObjectFromPadding(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if (getMainAxisFromPlacement(placement) === 'x') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          const isLeftSide = getSide(placement) === 'left';
          const maxRight = max$1(...clientRects.map(rect => rect.right));
          const minLeft = min$1(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

async function convertValueToCoords(state, value) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getMainAxisFromPlacement(placement) === 'x';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = typeof value === 'function' ? value(state) : value;

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
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
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
const offset = function (value) {
  if (value === void 0) {
    value = 0;
  }
  return {
    name: 'offset',
    options: value,
    async fn(state) {
      const {
        x,
        y
      } = state;
      const diffCoords = await convertValueToCoords(state, value);
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: diffCoords
      };
    }
  };
};

function getCrossAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = function (options) {
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
      } = options;
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const mainAxis = getMainAxisFromPlacement(getSide(placement));
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = within(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = within(min, crossAxisCoord, max);
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
          y: limitedCoords.y - y
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = options;
      const coords = {
        x,
        y
      };
      const mainAxis = getMainAxisFromPlacement(placement);
      const crossAxis = getCrossAxis(mainAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = typeof offset === 'function' ? offset(state) : offset;
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = ['top', 'left'].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = options;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const axis = getMainAxisFromPlacement(placement);
      const isXAxis = axis === 'x';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isXAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min$1(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min$1(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max$1(overflow.left, 0);
        const xMax = max$1(overflow.right, 0);
        const yMin = max$1(overflow.top, 0);
        const yMax = max$1(overflow.bottom, 0);
        if (isXAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max$1(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max$1(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getWindow$1(node) {
  var _node$ownerDocument;
  return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}

function getComputedStyle$1(element) {
  return getWindow$1(element).getComputedStyle(element);
}

function isNode(value) {
  return value instanceof getWindow$1(value).Node;
}
function getNodeName(node) {
  return isNode(node) ? (node.nodeName || '').toLowerCase() : '';
}

let uaString;
function getUAString() {
  if (uaString) {
    return uaString;
  }
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    uaString = uaData.brands.map(item => item.brand + "/" + item.version).join(' ');
    return uaString;
  }
  return navigator.userAgent;
}

function isHTMLElement$1(value) {
  return value instanceof getWindow$1(value).HTMLElement;
}
function isElement$1(value) {
  return value instanceof getWindow$1(value).Element;
}
function isShadowRoot$1(node) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  const OwnElement = getWindow$1(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  // TODO: Try to use feature detection here instead.
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  const backdropFilter = css.backdropFilter || css.WebkitBackdropFilter;

  // This is non-exhaustive but covers the most common CSS properties that
  // create a containing block.
  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (backdropFilter ? backdropFilter !== 'none' : false) || isFirefox && css.willChange === 'filter' || isFirefox && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective'].some(value => css.willChange.includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => {
    // Add type check for old browsers.
    const contain = css.contain;
    return contain != null ? contain.includes(value) : false;
  });
}

/**
 * Determines whether or not `.getBoundingClientRect()` is affected by visual
 * viewport offsets. In Safari, the `x`/`y` offsets are values relative to the
 * visual viewport, while in other engines, they are values relative to the
 * layout viewport.
 */
function isClientRectVisualViewportBased() {
  // TODO: Try to use feature detection here instead. Feature detection for
  // this can fail in various ways, making the userAgent check the most
  // reliable:
  // • Always-visible scrollbar or not
  // • Width of <html>

  // Is Safari.
  return /^((?!chrome|android).)*safari/i.test(getUAString());
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}

const min = Math.min;
const max = Math.max;
const round = Math.round;

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width);
  let height = parseFloat(css.height);
  const hasOffset = isHTMLElement$1(element);
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
    fallback: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement$1(element) ? element.contextElement : element;
}

const FALLBACK_SCALE = {
  x: 1,
  y: 1
};
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement$1(domElement)) {
    return FALLBACK_SCALE;
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    fallback
  } = getCssDimensions(domElement);
  let x = (fallback ? round(rect.width) : rect.width) / width;
  let y = (fallback ? round(rect.height) : rect.height) / height;

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

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  var _win$visualViewport, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = FALLBACK_SCALE;
  if (includeScale) {
    if (offsetParent) {
      if (isElement$1(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const win = domElement ? getWindow$1(domElement) : window;
  const addVisualOffsets = isClientRectVisualViewportBased() && isFixedStrategy;
  let x = (clientRect.left + (addVisualOffsets ? ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0 : 0)) / scale.x;
  let y = (clientRect.top + (addVisualOffsets ? ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0 : 0)) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow$1(domElement);
    const offsetWin = offsetParent && isElement$1(offsetParent) ? getWindow$1(offsetParent) : offsetParent;
    let currentIFrame = win.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      iframeRect.x += (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      iframeRect.y += (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += iframeRect.x;
      y += iframeRect.y;
      currentIFrame = getWindow$1(currentIFrame).frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || window.document).documentElement;
}

function getNodeScroll(element) {
  if (isElement$1(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement$1(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = {
    x: 1,
    y: 1
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement$1(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
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
  isShadowRoot$1(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot$1(result) ? result.host : result;
}

function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    // `getParentNode` will never return a `Document` due to the fallback
    // check, so it's either the <html> or <body> element.
    return parentNode.ownerDocument.body;
  }
  if (isHTMLElement$1(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}

function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow$1(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}

function getViewportRect(element, strategy) {
  const win = getWindow$1(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isClientRectVisualViewportBased();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement$1(element) ? getScale(element) : {
    x: 1,
    y: 1
  };
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
  } else if (isElement$1(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const mutableRect = {
      ...clippingAncestor
    };
    if (isClientRectVisualViewportBased()) {
      var _win$visualViewport, _win$visualViewport2;
      const win = getWindow$1(element);
      mutableRect.x -= ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0;
      mutableRect.y -= ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0;
    }
    rect = mutableRect;
  }
  return rectToClientRect(rect);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter(el => isElement$1(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement$1(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const containingBlock = isContainingBlock(currentNode);
    if (computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !containingBlock && !currentContainingBlockComputedStyle : !containingBlock && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position);
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
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
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
  return getCssDimensions(element);
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement$1(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement$1(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow$1(element);
  if (!isHTMLElement$1(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement$1(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element, true, strategy === 'fixed', offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement$1(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

const platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement: isElement$1,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getScale,
  async getElementRects(_ref) {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
      floating: {
        x: 0,
        y: 0,
        ...(await getDimensionsFn(floating))
      }
    };
  },
  getClientRects: element => Array.from(element.getClientRects()),
  isRTL: element => getComputedStyle$1(element).direction === 'rtl'
};

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
    ancestorScroll: _ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false
  } = options;
  const ancestorScroll = _ancestorScroll && !animationFrame;
  const ancestors = ancestorScroll || ancestorResize ? [...(isElement$1(reference) ? getOverflowAncestors(reference) : reference.contextElement ? getOverflowAncestors(reference.contextElement) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  let observer = null;
  if (elementResize) {
    observer = new ResizeObserver(() => {
      update();
    });
    isElement$1(reference) && !animationFrame && observer.observe(reference);
    if (!isElement$1(reference) && reference.contextElement && !animationFrame) {
      observer.observe(reference.contextElement);
    }
    observer.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _observer;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    (_observer = observer) == null ? void 0 : _observer.disconnect();
    observer = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a reference element when it is given a certain CSS positioning
 * strategy.
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

/**
 * A data provider that provides data to position an inner element of the
 * floating element (usually a triangle or caret) so that it is centered to the
 * reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => {
  const {
    element,
    padding
  } = options;
  function isRef(value) {
    return Object.prototype.hasOwnProperty.call(value, 'current');
  }
  return {
    name: 'arrow',
    options,
    fn(args) {
      if (isRef(element)) {
        if (element.current != null) {
          return arrow$1({
            element: element.current,
            padding
          }).fn(args);
        }
        return {};
      } else if (element) {
        return arrow$1({
          element,
          padding
        }).fn(args);
      }
      return {};
    }
  };
};

var index$1 = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

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
  let length, i, keys;
  if (a && b && typeof a == 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
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
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
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

function useLatestRef$1(value) {
  const ref = React__namespace.useRef(value);
  index$1(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/react
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
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React__namespace.useState({
    x: null,
    y: null,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React__namespace.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const referenceRef = React__namespace.useRef(null);
  const floatingRef = React__namespace.useRef(null);
  const dataRef = React__namespace.useRef(data);
  const whileElementsMountedRef = useLatestRef$1(whileElementsMounted);
  const platformRef = useLatestRef$1(platform);
  const [reference, _setReference] = React__namespace.useState(null);
  const [floating, _setFloating] = React__namespace.useState(null);
  const setReference = React__namespace.useCallback(node => {
    if (referenceRef.current !== node) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React__namespace.useCallback(node => {
    if (floatingRef.current !== node) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
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
        isPositioned: true
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        React__namespace.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef]);
  index$1(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData(data => ({
        ...data,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React__namespace.useRef(false);
  index$1(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index$1(() => {
    if (reference && floating) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(reference, floating, update);
      } else {
        update();
      }
    }
  }, [reference, floating, update, whileElementsMountedRef]);
  const refs = React__namespace.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React__namespace.useMemo(() => ({
    reference,
    floating
  }), [reference, floating]);
  return React__namespace.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    reference: setReference,
    floating: setFloating
  }), [data, update, refs, elements, setReference, setFloating]);
}

var index = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;

let serverHandoffComplete = false;
let count = 0;
const genId = () => "floating-ui-" + count++;
function useFloatingId() {
  const [id, setId] = React__namespace.useState(() => serverHandoffComplete ? genId() : undefined);
  index(() => {
    if (id == null) {
      setId(genId());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React__namespace.useEffect(() => {
    if (!serverHandoffComplete) {
      serverHandoffComplete = true;
    }
  }, []);
  return id;
}

// `toString()` prevents bundlers from trying to `import { useId } from 'react'`
const useReactId = React__namespace[/*#__PURE__*/'useId'.toString()];

/**
 * Uses React 18's built-in `useId()` when available, or falls back to a
 * slightly less performant (requiring a double render) implementation for
 * earlier React versions.
 * @see https://floating-ui.com/docs/useId
 */
const useId = useReactId || useFloatingId;

function createPubSub() {
  const map = new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null ? void 0 : _map$get.forEach(handler => handler(data));
    },
    on(event, listener) {
      map.set(event, [...(map.get(event) || []), listener]);
    },
    off(event, listener) {
      map.set(event, (map.get(event) || []).filter(l => l !== listener));
    }
  };
}

const FloatingNodeContext = /*#__PURE__*/React__namespace.createContext(null);
const FloatingTreeContext = /*#__PURE__*/React__namespace.createContext(null);
const useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = React__namespace.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
const useFloatingTree = () => React__namespace.useContext(FloatingTreeContext);

function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
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

function getWindow(value) {
  return getDocument(value).defaultView || window;
}
function isElement(value) {
  return value ? value instanceof getWindow(value).Element : false;
}
function isHTMLElement(value) {
  return value ? value instanceof getWindow(value).HTMLElement : false;
}
function isShadowRoot(node) {
  // Browsers without `ShadowRoot` support
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// License: https://github.com/adobe/react-spectrum/blob/b35d5c02fe900badccd0cf1a8f23bb593419f238/packages/@react-aria/utils/src/isVirtualEvent.ts
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }
  const androidRe = /Android/i;
  if ((androidRe.test(getPlatform()) || androidRe.test(getUserAgent())) && event.pointerType) {
    return event.type === 'click' && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  return event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType !== 'mouse' ||
  // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0;
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

function useLatestRef(value) {
  const ref = React.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}

const safePolygonIdentifier = 'data-floating-ui-safe-polygon';
function getDelay(value, prop, pointerType) {
  if (pointerType && !isMouseLikePointerType(pointerType)) {
    return 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  return value == null ? void 0 : value[prop];
}
/**
 * Opens the floating element while hovering over the reference element, like
 * CSS `:hover`.
 * @see https://floating-ui.com/docs/useHover
 */
const useHover = function (context, _temp) {
  let {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true
  } = _temp === void 0 ? {} : _temp;
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements: {
      domReference,
      floating
    },
    refs
  } = context;
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const handleCloseRef = useLatestRef(handleClose);
  const delayRef = useLatestRef(delay);
  const pointerTypeRef = React__namespace.useRef();
  const timeoutRef = React__namespace.useRef();
  const handlerRef = React__namespace.useRef();
  const restTimeoutRef = React__namespace.useRef();
  const blockMouseMoveRef = React__namespace.useRef(true);
  const performedPointerEventsMutationRef = React__namespace.useRef(false);
  const unbindMouseMoveRef = React__namespace.useRef(() => {});
  const isHoverOpen = React__namespace.useCallback(() => {
    var _dataRef$current$open;
    const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
    return (type == null ? void 0 : type.includes('mouse')) && type !== 'mousedown';
  }, [dataRef]);

  // When dismissing before opening, clear the delay timeouts to cancel it
  // from showing.
  React__namespace.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onDismiss() {
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      blockMouseMoveRef.current = true;
    }
    events.on('dismiss', onDismiss);
    return () => {
      events.off('dismiss', onDismiss);
    };
  }, [enabled, events]);
  React__namespace.useEffect(() => {
    if (!enabled || !handleCloseRef.current || !open) {
      return;
    }
    function onLeave() {
      if (isHoverOpen()) {
        onOpenChange(false);
      }
    }
    const html = getDocument(floating).documentElement;
    html.addEventListener('mouseleave', onLeave);
    return () => {
      html.removeEventListener('mouseleave', onLeave);
    };
  }, [floating, open, onOpenChange, enabled, handleCloseRef, dataRef, isHoverOpen]);
  const closeWithDelay = React__namespace.useCallback(function (runElseBranch) {
    if (runElseBranch === void 0) {
      runElseBranch = true;
    }
    const closeDelay = getDelay(delayRef.current, 'close', pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => onOpenChange(false), closeDelay);
    } else if (runElseBranch) {
      clearTimeout(timeoutRef.current);
      onOpenChange(false);
    }
  }, [delayRef, onOpenChange]);
  const cleanupMouseMoveHandler = React__namespace.useCallback(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = undefined;
  }, []);
  const clearPointerEvents = React__namespace.useCallback(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = getDocument(refs.floating.current).body;
      body.style.pointerEvents = '';
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  }, [refs]);

  // Registering the mouse events on the reference directly to bypass React's
  // delegation system. If the cursor was on a disabled element and then entered
  // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
  React__namespace.useEffect(() => {
    if (!enabled) {
      return;
    }
    function isClickLikeOpenEvent() {
      return dataRef.current.openEvent ? ['click', 'mousedown'].includes(dataRef.current.openEvent.type) : false;
    }
    function onMouseEnter(event) {
      clearTimeout(timeoutRef.current);
      blockMouseMoveRef.current = false;
      if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || restMs > 0 && getDelay(delayRef.current, 'open') === 0) {
        return;
      }
      dataRef.current.openEvent = event;
      const openDelay = getDelay(delayRef.current, 'open', pointerTypeRef.current);
      if (openDelay) {
        timeoutRef.current = setTimeout(() => {
          onOpenChange(true);
        }, openDelay);
      } else {
        onOpenChange(true);
      }
    }
    function onMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        return;
      }
      unbindMouseMoveRef.current();
      const doc = getDocument(floating);
      clearTimeout(restTimeoutRef.current);
      if (handleCloseRef.current) {
        // Prevent clearing `onScrollMouseLeave` timeout.
        if (!open) {
          clearTimeout(timeoutRef.current);
        }
        handlerRef.current = handleCloseRef.current({
          ...context,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            closeWithDelay();
          }
        });
        const handler = handlerRef.current;
        doc.addEventListener('mousemove', handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener('mousemove', handler);
        };
        return;
      }
      closeWithDelay();
    }

    // Ensure the floating element closes after scrolling even if the pointer
    // did not move.
    // https://github.com/floating-ui/floating-ui/discussions/1692
    function onScrollMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        return;
      }
      handleCloseRef.current == null ? void 0 : handleCloseRef.current({
        ...context,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          closeWithDelay();
        }
      })(event);
    }
    if (isElement(domReference)) {
      const ref = domReference;
      open && ref.addEventListener('mouseleave', onScrollMouseLeave);
      floating == null ? void 0 : floating.addEventListener('mouseleave', onScrollMouseLeave);
      move && ref.addEventListener('mousemove', onMouseEnter, {
        once: true
      });
      ref.addEventListener('mouseenter', onMouseEnter);
      ref.addEventListener('mouseleave', onMouseLeave);
      return () => {
        open && ref.removeEventListener('mouseleave', onScrollMouseLeave);
        floating == null ? void 0 : floating.removeEventListener('mouseleave', onScrollMouseLeave);
        move && ref.removeEventListener('mousemove', onMouseEnter);
        ref.removeEventListener('mouseenter', onMouseEnter);
        ref.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [domReference, floating, enabled, context, mouseOnly, restMs, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, tree, delayRef, handleCloseRef, dataRef]);

  // Block pointer-events of every element other than the reference and floating
  // while the floating element is open and has a `handleClose` handler. Also
  // handles nested floating elements.
  // https://github.com/floating-ui/floating-ui/issues/1722
  index(() => {
    var _handleCloseRef$curre;
    if (!enabled) {
      return;
    }
    if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && _handleCloseRef$curre.__options.blockPointerEvents && isHoverOpen()) {
      const body = getDocument(floating).body;
      body.setAttribute(safePolygonIdentifier, '');
      body.style.pointerEvents = 'none';
      performedPointerEventsMutationRef.current = true;
      if (isElement(domReference) && floating) {
        var _tree$nodesRef$curren, _tree$nodesRef$curren2;
        const ref = domReference;
        const parentFloating = tree == null ? void 0 : (_tree$nodesRef$curren = tree.nodesRef.current.find(node => node.id === parentId)) == null ? void 0 : (_tree$nodesRef$curren2 = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren2.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = '';
        }
        ref.style.pointerEvents = 'auto';
        floating.style.pointerEvents = 'auto';
        return () => {
          ref.style.pointerEvents = '';
          floating.style.pointerEvents = '';
        };
      }
    }
  }, [enabled, open, parentId, floating, domReference, tree, handleCloseRef, dataRef, isHoverOpen]);
  index(() => {
    if (!open) {
      pointerTypeRef.current = undefined;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
  React__namespace.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      clearPointerEvents();
    };
  }, [enabled, cleanupMouseMoveHandler, clearPointerEvents]);
  return React__namespace.useMemo(() => {
    if (!enabled) {
      return {};
    }
    function setPointerRef(event) {
      pointerTypeRef.current = event.pointerType;
    }
    return {
      reference: {
        onPointerDown: setPointerRef,
        onPointerEnter: setPointerRef,
        onMouseMove() {
          if (open || restMs === 0) {
            return;
          }
          clearTimeout(restTimeoutRef.current);
          restTimeoutRef.current = setTimeout(() => {
            if (!blockMouseMoveRef.current) {
              onOpenChange(true);
            }
          }, restMs);
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(timeoutRef.current);
        },
        onMouseLeave() {
          events.emit('dismiss', {
            type: 'mouseLeave',
            data: {
              returnFocus: false
            }
          });
          closeWithDelay(false);
        }
      }
    };
  }, [events, enabled, restMs, open, onOpenChange, closeWithDelay]);
};

const FloatingDelayGroupContext = /*#__PURE__*/React__namespace.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {},
  setState: () => {},
  isInstantPhase: false
});
const useDelayGroupContext = () => React__namespace.useContext(FloatingDelayGroupContext);

/**
 * Provides context for a group of floating elements that should share a
 * `delay`.
 * @see https://floating-ui.com/docs/FloatingDelayGroup
 */
const FloatingDelayGroup = _ref => {
  let {
    children,
    delay,
    timeoutMs = 0
  } = _ref;
  const [state, setState] = React__namespace.useReducer((prev, next) => ({
    ...prev,
    ...next
  }), {
    delay,
    timeoutMs,
    initialDelay: delay,
    currentId: null,
    isInstantPhase: false
  });
  const initialCurrentIdRef = React__namespace.useRef(null);
  const setCurrentId = React__namespace.useCallback(currentId => {
    setState({
      currentId
    });
  }, []);
  index(() => {
    if (state.currentId) {
      if (initialCurrentIdRef.current === null) {
        initialCurrentIdRef.current = state.currentId;
      } else {
        setState({
          isInstantPhase: true
        });
      }
    } else {
      setState({
        isInstantPhase: false
      });
      initialCurrentIdRef.current = null;
    }
  }, [state.currentId]);
  return /*#__PURE__*/React__namespace.createElement(FloatingDelayGroupContext.Provider, {
    value: React__namespace.useMemo(() => ({
      ...state,
      setState,
      setCurrentId
    }), [state, setState, setCurrentId])
  }, children);
};
const useDelayGroup = (_ref2, _ref3) => {
  let {
    open,
    onOpenChange
  } = _ref2;
  let {
    id
  } = _ref3;
  const {
    currentId,
    setCurrentId,
    initialDelay,
    setState,
    timeoutMs
  } = useDelayGroupContext();
  React__namespace.useEffect(() => {
    if (currentId) {
      setState({
        delay: {
          open: 1,
          close: getDelay(initialDelay, 'close')
        }
      });
      if (currentId !== id) {
        onOpenChange(false);
      }
    }
  }, [id, onOpenChange, setState, currentId, initialDelay]);
  React__namespace.useEffect(() => {
    function unset() {
      onOpenChange(false);
      setState({
        delay: initialDelay,
        currentId: null
      });
    }
    if (!open && currentId === id) {
      if (timeoutMs) {
        const timeout = window.setTimeout(unset, timeoutMs);
        return () => {
          clearTimeout(timeout);
        };
      } else {
        unset();
      }
    }
  }, [open, setState, currentId, id, onOpenChange, initialDelay, timeoutMs]);
  React__namespace.useEffect(() => {
    if (open) {
      setCurrentId(id);
    }
  }, [open, setCurrentId, id]);
};

/**
 * Find the real active element. Traverses into shadowRoots.
 */
function activeElement$1(doc) {
  let activeElement = doc.activeElement;
  while (((_activeElement = activeElement) == null ? void 0 : (_activeElement$shadow = _activeElement.shadowRoot) == null ? void 0 : _activeElement$shadow.activeElement) != null) {
    var _activeElement, _activeElement$shadow;
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode && child.getRootNode();

  // First, attempt with faster native method
  if (parent.contains(child)) {
    return true;
  }
  // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    do {
      if (next && parent === next) {
        return true;
      }
      // @ts-ignore
      next = next.parentNode || next.host;
    } while (next);
  }

  // Give up, the result is false
  return false;
}

function getChildren(nodes, id) {
  let allChildren = nodes.filter(node => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  }) || [];
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = nodes.filter(node => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some(n => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    }) || [];
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}

function getTarget(event) {
  if ('composedPath' in event) {
    return event.composedPath()[0];
  }

  // TS thinks `event` is of type never as it assumes all browsers support
  // `composedPath()`, but browsers without shadow DOM don't.
  return event.target;
}

// `toString()` prevents bundlers from trying to `import { useInsertionEffect } from 'react'`
const useInsertionEffect = React__namespace[/*#__PURE__*/'useInsertionEffect'.toString()];
const useSafeInsertionEffect = useInsertionEffect || (fn => fn());
function useEvent(callback) {
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

/**
 * Check whether the event.target is within the provided node. Uses event.composedPath if available for custom element support.
 *
 * @param event The event whose target/composedPath to check
 * @param node The node to check against
 * @returns Whether the event.target/composedPath is within the node.
 */
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
const normalizeBubblesProp = function (bubbles) {
  var _bubbles$escapeKey, _bubbles$outsidePress;
  if (bubbles === void 0) {
    bubbles = true;
  }
  return {
    escapeKeyBubbles: typeof bubbles === 'boolean' ? bubbles : (_bubbles$escapeKey = bubbles.escapeKey) != null ? _bubbles$escapeKey : true,
    outsidePressBubbles: typeof bubbles === 'boolean' ? bubbles : (_bubbles$outsidePress = bubbles.outsidePress) != null ? _bubbles$outsidePress : true
  };
};
/**
 * Closes the floating element when a dismissal is requested — by default, when
 * the user presses the `escape` key or outside of the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */
const useDismiss = function (_ref, _temp) {
  let {
    open,
    onOpenChange,
    events,
    nodeId,
    elements: {
      reference,
      domReference,
      floating
    },
    dataRef
  } = _ref;
  let {
    enabled = true,
    escapeKey = true,
    outsidePress: unstable_outsidePress = true,
    outsidePressEvent = 'pointerdown',
    referencePress = false,
    referencePressEvent = 'pointerdown',
    ancestorScroll = false,
    bubbles = true
  } = _temp === void 0 ? {} : _temp;
  const tree = useFloatingTree();
  const nested = useFloatingParentNodeId() != null;
  const outsidePressFn = useEvent(typeof unstable_outsidePress === 'function' ? unstable_outsidePress : () => false);
  const outsidePress = typeof unstable_outsidePress === 'function' ? outsidePressFn : unstable_outsidePress;
  const insideReactTreeRef = React__namespace.useRef(false);
  const {
    escapeKeyBubbles,
    outsidePressBubbles
  } = normalizeBubblesProp(bubbles);
  React__namespace.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
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
        events.emit('dismiss', {
          type: 'escapeKey',
          data: {
            returnFocus: {
              preventScroll: false
            }
          }
        });
        onOpenChange(false);
      }
    }
    function onOutsidePress(event) {
      // Given developers can stop the propagation of the synthetic event,
      // we can only be confident with a positive value.
      const insideReactTree = insideReactTreeRef.current;
      insideReactTreeRef.current = false;
      if (insideReactTree) {
        return;
      }
      if (typeof outsidePress === 'function' && !outsidePress(event)) {
        return;
      }
      const target = getTarget(event);

      // Check if the click occurred on the scrollbar
      if (isHTMLElement(target) && floating) {
        const win = floating.ownerDocument.defaultView || window;
        const canScrollX = target.scrollWidth > target.clientWidth;
        const canScrollY = target.scrollHeight > target.clientHeight;
        let xCond = canScrollY && event.offsetX > target.clientWidth;

        // In some browsers it is possible to change the <body> (or window)
        // scrollbar to the left side, but is very rare and is difficult to
        // check for. Plus, for modal dialogs with backdrops, it is more
        // important that the backdrop is checked but not so much the window.
        if (canScrollY) {
          const isRTL = win.getComputedStyle(target).direction === 'rtl';
          if (isRTL) {
            xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
          }
        }
        if (xCond || canScrollX && event.offsetY > target.clientHeight) {
          return;
        }
      }
      const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some(node => {
        var _node$context;
        return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
      });
      if (isEventTargetWithin(event, floating) || isEventTargetWithin(event, domReference) || targetIsInsideChildren) {
        return;
      }
      const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
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
      events.emit('dismiss', {
        type: 'outsidePress',
        data: {
          returnFocus: nested ? {
            preventScroll: true
          } : isVirtualClick(event) || isVirtualPointerEvent(event)
        }
      });
      onOpenChange(false);
    }
    function onScroll() {
      onOpenChange(false);
    }
    const doc = getDocument(floating);
    escapeKey && doc.addEventListener('keydown', onKeyDown);
    outsidePress && doc.addEventListener(outsidePressEvent, onOutsidePress);
    let ancestors = [];
    if (ancestorScroll) {
      if (isElement(domReference)) {
        ancestors = getOverflowAncestors(domReference);
      }
      if (isElement(floating)) {
        ancestors = ancestors.concat(getOverflowAncestors(floating));
      }
      if (!isElement(reference) && reference && reference.contextElement) {
        ancestors = ancestors.concat(getOverflowAncestors(reference.contextElement));
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
      escapeKey && doc.removeEventListener('keydown', onKeyDown);
      outsidePress && doc.removeEventListener(outsidePressEvent, onOutsidePress);
      ancestors.forEach(ancestor => {
        ancestor.removeEventListener('scroll', onScroll);
      });
    };
  }, [dataRef, floating, domReference, reference, escapeKey, outsidePress, outsidePressEvent, events, tree, nodeId, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, nested]);
  React__namespace.useEffect(() => {
    insideReactTreeRef.current = false;
  }, [outsidePress, outsidePressEvent]);
  return React__namespace.useMemo(() => {
    if (!enabled) {
      return {};
    }
    return {
      reference: {
        [bubbleHandlerKeys[referencePressEvent]]: () => {
          if (referencePress) {
            events.emit('dismiss', {
              type: 'referencePress',
              data: {
                returnFocus: false
              }
            });
            onOpenChange(false);
          }
        }
      },
      floating: {
        [captureHandlerKeys[outsidePressEvent]]: () => {
          insideReactTreeRef.current = true;
        }
      }
    };
  }, [enabled, events, referencePress, outsidePressEvent, referencePressEvent, onOpenChange]);
};

/**
 * Opens the floating element while the reference element has focus, like CSS
 * `:focus`.
 * @see https://floating-ui.com/docs/useFocus
 */
const useFocus = function (_ref, _temp) {
  let {
    open,
    onOpenChange,
    dataRef,
    events,
    refs,
    elements: {
      floating,
      domReference
    }
  } = _ref;
  let {
    enabled = true,
    keyboardOnly = true
  } = _temp === void 0 ? {} : _temp;
  const pointerTypeRef = React__namespace.useRef('');
  const blockFocusRef = React__namespace.useRef(false);
  const timeoutRef = React__namespace.useRef();
  React__namespace.useEffect(() => {
    if (!enabled) {
      return;
    }
    const doc = getDocument(floating);
    const win = doc.defaultView || window;

    // If the reference was focused and the user left the tab/window, and the
    // floating element was not open, the focus should be blocked when they
    // return to the tab/window.
    function onBlur() {
      if (!open && isHTMLElement(domReference) && domReference === activeElement$1(getDocument(domReference))) {
        blockFocusRef.current = true;
      }
    }
    win.addEventListener('blur', onBlur);
    return () => {
      win.removeEventListener('blur', onBlur);
    };
  }, [floating, domReference, open, enabled]);
  React__namespace.useEffect(() => {
    if (!enabled) {
      return;
    }
    function onDismiss(payload) {
      if (payload.type === 'referencePress' || payload.type === 'escapeKey') {
        blockFocusRef.current = true;
      }
    }
    events.on('dismiss', onDismiss);
    return () => {
      events.off('dismiss', onDismiss);
    };
  }, [events, enabled]);
  React__namespace.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  return React__namespace.useMemo(() => {
    if (!enabled) {
      return {};
    }
    return {
      reference: {
        onPointerDown(_ref2) {
          let {
            pointerType
          } = _ref2;
          pointerTypeRef.current = pointerType;
          blockFocusRef.current = !!(pointerType && keyboardOnly);
        },
        onMouseLeave() {
          blockFocusRef.current = false;
        },
        onFocus(event) {
          var _dataRef$current$open;
          if (blockFocusRef.current) {
            return;
          }

          // Dismiss with click should ignore the subsequent `focus` trigger,
          // but only if the click originated inside the reference element.
          if (event.type === 'focus' && ((_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type) === 'mousedown' && dataRef.current.openEvent && isEventTargetWithin(dataRef.current.openEvent, domReference)) {
            return;
          }
          dataRef.current.openEvent = event.nativeEvent;
          onOpenChange(true);
        },
        onBlur(event) {
          blockFocusRef.current = false;
          const relatedTarget = event.relatedTarget;

          // Hit the non-modal focus management portal guard. Focus will be
          // moved into the floating element immediately after.
          const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute('data-floating-ui-focus-guard') && relatedTarget.getAttribute('data-type') === 'outside';

          // Wait for the window blur listener to fire.
          timeoutRef.current = setTimeout(() => {
            // When focusing the reference element (e.g. regular click), then
            // clicking into the floating element, prevent it from hiding.
            // Note: it must be focusable, e.g. `tabindex="-1"`.
            if (contains(refs.floating.current, relatedTarget) || contains(domReference, relatedTarget) || movedToFocusGuard) {
              return;
            }
            onOpenChange(false);
          });
        }
      }
    };
  }, [enabled, keyboardOnly, domReference, refs, dataRef, onOpenChange]);
};

/**
 * Adds base screen reader props to the reference and floating elements for a
 * given floating element `role`.
 * @see https://floating-ui.com/docs/useRole
 */
const useRole = function (_ref, _temp) {
  let {
    open
  } = _ref;
  let {
    enabled = true,
    role = 'dialog'
  } = _temp === void 0 ? {} : _temp;
  const rootId = useId();
  const referenceId = useId();
  return React__namespace.useMemo(() => {
    const floatingProps = {
      id: rootId,
      role
    };
    if (!enabled) {
      return {};
    }
    if (role === 'tooltip') {
      return {
        reference: {
          'aria-describedby': open ? rootId : undefined
        },
        floating: floatingProps
      };
    }
    return {
      reference: {
        'aria-expanded': open ? 'true' : 'false',
        'aria-haspopup': role === 'alertdialog' ? 'dialog' : role,
        'aria-controls': open ? rootId : undefined,
        ...(role === 'listbox' && {
          role: 'combobox'
        }),
        ...(role === 'menu' && {
          id: referenceId
        })
      },
      floating: {
        ...floatingProps,
        ...(role === 'menu' && {
          'aria-labelledby': referenceId
        })
      }
    };
  }, [enabled, role, open, rootId, referenceId]);
};

/**
 * Provides data to position a floating element and context to add interactions.
 * @see https://floating-ui.com/docs/react
 */
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    open = false,
    onOpenChange: unstable_onOpenChange,
    nodeId
  } = options;
  const position = useFloating$1(options);
  const tree = useFloatingTree();
  const domReferenceRef = React__namespace.useRef(null);
  const dataRef = React__namespace.useRef({});
  const events = React__namespace.useState(() => createPubSub())[0];
  const [domReference, setDomReference] = React__namespace.useState(null);
  const setPositionReference = React__namespace.useCallback(node => {
    const positionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    position.refs.setReference(positionReference);
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
  const onOpenChange = useEvent(unstable_onOpenChange);
  const context = React__namespace.useMemo(() => ({
    ...position,
    refs,
    elements,
    dataRef,
    nodeId,
    events,
    open,
    onOpenChange
  }), [position, nodeId, events, open, onOpenChange, refs, elements]);
  index(() => {
    const node = tree == null ? void 0 : tree.nodesRef.current.find(node => node.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return React__namespace.useMemo(() => ({
    ...position,
    context,
    refs,
    reference: setReference,
    positionReference: setPositionReference
  }), [position, refs, context, setReference, setPositionReference]);
}

function mergeProps(userProps, propsList, elementKey) {
  const map = new Map();
  return {
    ...(elementKey === 'floating' && {
      tabIndex: -1
    }),
    ...userProps,
    ...propsList.map(value => value ? value[elementKey] : null).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach(_ref => {
        let [key, value] = _ref;
        if (key.indexOf('on') === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === 'function') {
            var _map$get;
            (_map$get = map.get(key)) == null ? void 0 : _map$get.push(value);
            acc[key] = function () {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.forEach(fn => fn(...args));
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
const useInteractions = function (propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  // The dependencies are a dynamic array, so we can't use the linter's
  // suggestion to add it to the deps array.
  const deps = propsList;
  const getReferenceProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'reference'),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  deps);
  const getFloatingProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'floating'),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  deps);
  const getItemProps = React__namespace.useCallback(userProps => mergeProps(userProps, propsList, 'item'),
  // Granularly check for `item` changes, because the `getItemProps` getter
  // should be as referentially stable as possible since it may be passed as
  // a prop to many components. All `item` key values must therefore be
  // memoized.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  propsList.map(key => key == null ? void 0 : key.item));
  return React__namespace.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
};

function useFloatingAutoUpdate({
  opened,
  floating,
  position,
  positionDependencies
}) {
  const [delayedUpdate, setDelayedUpdate] = React.useState(0);
  React.useEffect(() => {
    if (floating.refs.reference.current && floating.refs.floating.current) {
      return autoUpdate(floating.refs.reference.current, floating.refs.floating.current, floating.update);
    }
    return void 0;
  }, [
    floating.refs.reference.current,
    floating.refs.floating.current,
    opened,
    delayedUpdate,
    position
  ]);
  useDidUpdate(() => {
    floating.update();
  }, positionDependencies);
  useDidUpdate(() => {
    setDelayedUpdate((c) => c + 1);
  }, [opened]);
}

function getPopoverMiddlewares(options) {
  const middlewares = [offset(options.offset)];
  if (options.middlewares.shift) {
    middlewares.push(shift({ limiter: limitShift() }));
  }
  if (options.middlewares.flip) {
    middlewares.push(flip());
  }
  if (options.middlewares.inline) {
    middlewares.push(inline());
  }
  middlewares.push(arrow({ element: options.arrowRef, padding: options.arrowOffset }));
  return middlewares;
}
function usePopover(options) {
  const [_opened, setOpened] = useUncontrolled({
    value: options.opened,
    defaultValue: options.defaultOpened,
    finalValue: false,
    onChange: options.onChange
  });
  const onClose = () => {
    var _a;
    (_a = options.onClose) == null ? void 0 : _a.call(options);
    setOpened(false);
  };
  const onToggle = () => {
    var _a, _b;
    if (_opened) {
      (_a = options.onClose) == null ? void 0 : _a.call(options);
      setOpened(false);
    } else {
      (_b = options.onOpen) == null ? void 0 : _b.call(options);
      setOpened(true);
    }
  };
  const floating = useFloating({
    placement: options.position,
    middleware: [
      ...getPopoverMiddlewares(options),
      ...options.width === "target" ? [
        size({
          apply({ rects }) {
            var _a, _b;
            Object.assign((_b = (_a = floating.refs.floating.current) == null ? void 0 : _a.style) != null ? _b : {}, {
              width: `${rects.reference.width}px`
            });
          }
        })
      ] : []
    ]
  });
  useFloatingAutoUpdate({
    opened: options.opened,
    position: options.position,
    positionDependencies: options.positionDependencies,
    floating
  });
  useDidUpdate(() => {
    var _a;
    (_a = options.onPositionChange) == null ? void 0 : _a.call(options, floating.placement);
  }, [floating.placement]);
  useDidUpdate(() => {
    var _a, _b;
    if (!options.opened) {
      (_a = options.onClose) == null ? void 0 : _a.call(options);
    } else {
      (_b = options.onOpen) == null ? void 0 : _b.call(options);
    }
  }, [options.opened]);
  return {
    floating,
    controlled: typeof options.opened === "boolean",
    opened: _opened,
    onClose,
    onToggle
  };
}

const POPOVER_ERRORS = {
  context: "Popover component was not found in the tree",
  children: "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
};

const [PopoverContextProvider, usePopoverContext] = createSafeContext(POPOVER_ERRORS.context);

var __defProp$r = Object.defineProperty;
var __defProps$h = Object.defineProperties;
var __getOwnPropDescs$h = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$s = Object.getOwnPropertySymbols;
var __hasOwnProp$s = Object.prototype.hasOwnProperty;
var __propIsEnum$s = Object.prototype.propertyIsEnumerable;
var __defNormalProp$r = (obj, key, value) => key in obj ? __defProp$r(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$r = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$s.call(b, prop))
      __defNormalProp$r(a, prop, b[prop]);
  if (__getOwnPropSymbols$s)
    for (var prop of __getOwnPropSymbols$s(b)) {
      if (__propIsEnum$s.call(b, prop))
        __defNormalProp$r(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$h = (a, b) => __defProps$h(a, __getOwnPropDescs$h(b));
var __objRest$l = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$s.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$s)
    for (var prop of __getOwnPropSymbols$s(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$s.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$g = {
  refProp: "ref",
  popupType: "dialog"
};
const PopoverTarget = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("PopoverTarget", defaultProps$g, props), { children, refProp, popupType } = _a, others = __objRest$l(_a, ["children", "refProp", "popupType"]);
  if (!isElement$2(children)) {
    throw new Error(POPOVER_ERRORS.children);
  }
  const forwardedProps = others;
  const ctx = usePopoverContext();
  const targetRef = useMergedRef(ctx.reference, children.ref, ref);
  const accessibleProps = ctx.withRoles ? {
    "aria-haspopup": popupType,
    "aria-expanded": ctx.opened,
    "aria-controls": ctx.getDropdownId(),
    id: ctx.getTargetId()
  } : {};
  return React.cloneElement(children, __spreadValues$r(__spreadProps$h(__spreadValues$r(__spreadValues$r(__spreadValues$r({}, forwardedProps), accessibleProps), ctx.targetProps), {
    className: clsx(ctx.targetProps.className, forwardedProps.className, children.props.className),
    [refProp]: targetRef
  }), !ctx.controlled ? { onClick: ctx.onToggle } : null));
});
PopoverTarget.displayName = "@mantine/core/PopoverTarget";

var useStyles$k = createStyles((theme, { radius, shadow }) => ({
  dropdown: {
    position: "absolute",
    backgroundColor: theme.white,
    background: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    boxShadow: theme.shadows[shadow] || shadow || "none",
    borderRadius: theme.fn.radius(radius),
    "&:focus": {
      outline: 0
    }
  },
  arrow: {
    backgroundColor: "inherit",
    border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    zIndex: 1
  }
}));

var useStyles$l = useStyles$k;

var __defProp$q = Object.defineProperty;
var __getOwnPropSymbols$r = Object.getOwnPropertySymbols;
var __hasOwnProp$r = Object.prototype.hasOwnProperty;
var __propIsEnum$r = Object.prototype.propertyIsEnumerable;
var __defNormalProp$q = (obj, key, value) => key in obj ? __defProp$q(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$q = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$r.call(b, prop))
      __defNormalProp$q(a, prop, b[prop]);
  if (__getOwnPropSymbols$r)
    for (var prop of __getOwnPropSymbols$r(b)) {
      if (__propIsEnum$r.call(b, prop))
        __defNormalProp$q(a, prop, b[prop]);
    }
  return a;
};
const transitionStatuses = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction
}) {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction
  };
  if (typeof transition === "string") {
    if (!(transition in transitions)) {
      return null;
    }
    return __spreadValues$q(__spreadValues$q(__spreadValues$q({
      transitionProperty: transitions[transition].transitionProperty
    }, shared), transitions[transition].common), transitions[transition][transitionStatuses[state]]);
  }
  return __spreadValues$q(__spreadValues$q(__spreadValues$q({
    transitionProperty: transition.transitionProperty
  }, shared), transition.common), transition[transitionStatuses[state]]);
}

function useTransition({
  duration,
  exitDuration,
  timingFunction,
  mounted,
  onEnter,
  onExit,
  onEntered,
  onExited
}) {
  const theme = useMantineTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const [transitionDuration, setTransitionDuration] = React.useState(reduceMotion ? 0 : duration);
  const [transitionStatus, setStatus] = React.useState(mounted ? "entered" : "exited");
  const timeoutRef = React.useRef(-1);
  const handleStateChange = (shouldMount) => {
    const preHandler = shouldMount ? onEnter : onExit;
    const handler = shouldMount ? onEntered : onExited;
    setStatus(shouldMount ? "pre-entering" : "pre-exiting");
    window.clearTimeout(timeoutRef.current);
    const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration;
    setTransitionDuration(newTransitionDuration);
    if (newTransitionDuration === 0) {
      typeof preHandler === "function" && preHandler();
      typeof handler === "function" && handler();
      setStatus(shouldMount ? "entered" : "exited");
    } else {
      const preStateTimeout = window.setTimeout(() => {
        typeof preHandler === "function" && preHandler();
        setStatus(shouldMount ? "entering" : "exiting");
      }, 10);
      timeoutRef.current = window.setTimeout(() => {
        window.clearTimeout(preStateTimeout);
        typeof handler === "function" && handler();
        setStatus(shouldMount ? "entered" : "exited");
      }, newTransitionDuration);
    }
  };
  useDidUpdate(() => {
    handleStateChange(mounted);
  }, [mounted]);
  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);
  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || theme.transitionTimingFunction
  };
}

function Transition({
  keepMounted,
  transition,
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited
}) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    exitDuration,
    duration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited
  });
  if (transitionDuration === 0) {
    return mounted ? /* @__PURE__ */ React.createElement(React.Fragment, null, children({})) : keepMounted ? children({ display: "none" }) : null;
  }
  return transitionStatus === "exited" ? keepMounted ? children({ display: "none" }) : null : /* @__PURE__ */ React.createElement(React.Fragment, null, children(getTransitionStyles({
    transition,
    duration: transitionDuration,
    state: transitionStatus,
    timingFunction: transitionTimingFunction
  })));
}
Transition.displayName = "@mantine/core/Transition";

function FocusTrap({
  children,
  active = true,
  refProp = "ref"
}) {
  const focusTrapRef = useFocusTrap(active);
  const ref = useMergedRef(focusTrapRef, children == null ? void 0 : children.ref);
  if (!isElement$2(children)) {
    return children;
  }
  return React.cloneElement(children, { [refProp]: ref });
}
FocusTrap.displayName = "@mantine/core/FocusTrap";

var __defProp$p = Object.defineProperty;
var __defProps$g = Object.defineProperties;
var __getOwnPropDescs$g = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$q = Object.getOwnPropertySymbols;
var __hasOwnProp$q = Object.prototype.hasOwnProperty;
var __propIsEnum$q = Object.prototype.propertyIsEnumerable;
var __defNormalProp$p = (obj, key, value) => key in obj ? __defProp$p(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$p = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$q.call(b, prop))
      __defNormalProp$p(a, prop, b[prop]);
  if (__getOwnPropSymbols$q)
    for (var prop of __getOwnPropSymbols$q(b)) {
      if (__propIsEnum$q.call(b, prop))
        __defNormalProp$p(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$g = (a, b) => __defProps$g(a, __getOwnPropDescs$g(b));
function horizontalSide(placement, arrowY, arrowOffset, arrowPosition) {
  if (placement === "center" || arrowPosition === "center") {
    return { top: arrowY };
  }
  if (placement === "end") {
    return { bottom: arrowOffset };
  }
  if (placement === "start") {
    return { top: arrowOffset };
  }
  return {};
}
function verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir) {
  if (placement === "center" || arrowPosition === "center") {
    return { left: arrowX };
  }
  if (placement === "end") {
    return { [dir === "ltr" ? "right" : "left"]: arrowOffset };
  }
  if (placement === "start") {
    return { [dir === "ltr" ? "left" : "right"]: arrowOffset };
  }
  return {};
}
const radiusByFloatingSide = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function getArrowPositionStyles({
  position,
  arrowSize,
  arrowOffset,
  arrowRadius,
  arrowPosition,
  arrowX,
  arrowY,
  dir
}) {
  const [side, placement = "center"] = position.split("-");
  const baseStyles = {
    width: rem(arrowSize),
    height: rem(arrowSize),
    transform: "rotate(45deg)",
    position: "absolute",
    [radiusByFloatingSide[side]]: rem(arrowRadius)
  };
  const arrowPlacement = rem(-arrowSize / 2);
  if (side === "left") {
    return __spreadProps$g(__spreadValues$p(__spreadValues$p({}, baseStyles), horizontalSide(placement, arrowY, arrowOffset, arrowPosition)), {
      right: arrowPlacement,
      borderLeftColor: "transparent",
      borderBottomColor: "transparent"
    });
  }
  if (side === "right") {
    return __spreadProps$g(__spreadValues$p(__spreadValues$p({}, baseStyles), horizontalSide(placement, arrowY, arrowOffset, arrowPosition)), {
      left: arrowPlacement,
      borderRightColor: "transparent",
      borderTopColor: "transparent"
    });
  }
  if (side === "top") {
    return __spreadProps$g(__spreadValues$p(__spreadValues$p({}, baseStyles), verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir)), {
      bottom: arrowPlacement,
      borderTopColor: "transparent",
      borderLeftColor: "transparent"
    });
  }
  if (side === "bottom") {
    return __spreadProps$g(__spreadValues$p(__spreadValues$p({}, baseStyles), verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir)), {
      top: arrowPlacement,
      borderBottomColor: "transparent",
      borderRightColor: "transparent"
    });
  }
  return {};
}

var __defProp$o = Object.defineProperty;
var __defProps$f = Object.defineProperties;
var __getOwnPropDescs$f = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$p = Object.getOwnPropertySymbols;
var __hasOwnProp$p = Object.prototype.hasOwnProperty;
var __propIsEnum$p = Object.prototype.propertyIsEnumerable;
var __defNormalProp$o = (obj, key, value) => key in obj ? __defProp$o(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$o = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$p.call(b, prop))
      __defNormalProp$o(a, prop, b[prop]);
  if (__getOwnPropSymbols$p)
    for (var prop of __getOwnPropSymbols$p(b)) {
      if (__propIsEnum$p.call(b, prop))
        __defNormalProp$o(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$f = (a, b) => __defProps$f(a, __getOwnPropDescs$f(b));
var __objRest$k = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$p.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$p)
    for (var prop of __getOwnPropSymbols$p(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$p.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const FloatingArrow = React.forwardRef((_a, ref) => {
  var _b = _a, {
    position,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    visible,
    arrowX,
    arrowY
  } = _b, others = __objRest$k(_b, [
    "position",
    "arrowSize",
    "arrowOffset",
    "arrowRadius",
    "arrowPosition",
    "visible",
    "arrowX",
    "arrowY"
  ]);
  const theme = useMantineTheme();
  if (!visible) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", __spreadProps$f(__spreadValues$o({}, others), {
    ref,
    style: getArrowPositionStyles({
      position,
      arrowSize,
      arrowOffset,
      arrowRadius,
      arrowPosition,
      dir: theme.dir,
      arrowX,
      arrowY
    })
  }));
});
FloatingArrow.displayName = "@mantine/core/FloatingArrow";

var __defProp$n = Object.defineProperty;
var __defProps$e = Object.defineProperties;
var __getOwnPropDescs$e = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$o = Object.getOwnPropertySymbols;
var __hasOwnProp$o = Object.prototype.hasOwnProperty;
var __propIsEnum$o = Object.prototype.propertyIsEnumerable;
var __defNormalProp$n = (obj, key, value) => key in obj ? __defProp$n(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$n = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$o.call(b, prop))
      __defNormalProp$n(a, prop, b[prop]);
  if (__getOwnPropSymbols$o)
    for (var prop of __getOwnPropSymbols$o(b)) {
      if (__propIsEnum$o.call(b, prop))
        __defNormalProp$n(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$e = (a, b) => __defProps$e(a, __getOwnPropDescs$e(b));
var __objRest$j = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$o.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$o)
    for (var prop of __getOwnPropSymbols$o(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$o.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$f = {};
function PopoverDropdown(props) {
  var _b;
  const _a = useComponentDefaultProps("PopoverDropdown", defaultProps$f, props), { style, className, children, onKeyDownCapture } = _a, others = __objRest$j(_a, ["style", "className", "children", "onKeyDownCapture"]);
  const ctx = usePopoverContext();
  const { classes, cx } = useStyles$l({ radius: ctx.radius, shadow: ctx.shadow }, {
    name: ctx.__staticSelector,
    classNames: ctx.classNames,
    styles: ctx.styles,
    unstyled: ctx.unstyled,
    variant: ctx.variant
  });
  const returnFocus = useFocusReturn({
    opened: ctx.opened,
    shouldReturnFocus: ctx.returnFocus
  });
  const accessibleProps = ctx.withRoles ? {
    "aria-labelledby": ctx.getTargetId(),
    id: ctx.getDropdownId(),
    role: "dialog"
  } : {};
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(OptionalPortal, __spreadProps$e(__spreadValues$n({}, ctx.portalProps), {
    withinPortal: ctx.withinPortal
  }), /* @__PURE__ */ React.createElement(Transition, __spreadProps$e(__spreadValues$n({
    mounted: ctx.opened
  }, ctx.transitionProps), {
    transition: ctx.transitionProps.transition || "fade",
    duration: (_b = ctx.transitionProps.duration) != null ? _b : 150,
    keepMounted: ctx.keepMounted,
    exitDuration: typeof ctx.transitionProps.exitDuration === "number" ? ctx.transitionProps.exitDuration : ctx.transitionProps.duration
  }), (transitionStyles) => {
    var _a2, _b2;
    return /* @__PURE__ */ React.createElement(FocusTrap, {
      active: ctx.trapFocus
    }, /* @__PURE__ */ React.createElement(Box, __spreadValues$n(__spreadProps$e(__spreadValues$n({}, accessibleProps), {
      tabIndex: -1,
      ref: ctx.floating,
      style: __spreadProps$e(__spreadValues$n(__spreadValues$n({}, style), transitionStyles), {
        zIndex: ctx.zIndex,
        top: (_a2 = ctx.y) != null ? _a2 : 0,
        left: (_b2 = ctx.x) != null ? _b2 : 0,
        width: ctx.width === "target" ? void 0 : rem(ctx.width)
      }),
      className: cx(classes.dropdown, className),
      onKeyDownCapture: closeOnEscape(ctx.onClose, {
        active: ctx.closeOnEscape,
        onTrigger: returnFocus,
        onKeyDown: onKeyDownCapture
      }),
      "data-position": ctx.placement
    }), others), children, /* @__PURE__ */ React.createElement(FloatingArrow, {
      ref: ctx.arrowRef,
      arrowX: ctx.arrowX,
      arrowY: ctx.arrowY,
      visible: ctx.withArrow,
      position: ctx.placement,
      arrowSize: ctx.arrowSize,
      arrowRadius: ctx.arrowRadius,
      arrowOffset: ctx.arrowOffset,
      arrowPosition: ctx.arrowPosition,
      className: classes.arrow
    })));
  }));
}
PopoverDropdown.displayName = "@mantine/core/PopoverDropdown";

function getFloatingPosition(dir, position) {
  if (dir === "rtl" && (position.includes("right") || position.includes("left"))) {
    const [side, placement] = position.split("-");
    const flippedPosition = side === "right" ? "left" : "right";
    return placement === void 0 ? flippedPosition : `${flippedPosition}-${placement}`;
  }
  return position;
}

var __getOwnPropSymbols$n = Object.getOwnPropertySymbols;
var __hasOwnProp$n = Object.prototype.hasOwnProperty;
var __propIsEnum$n = Object.prototype.propertyIsEnumerable;
var __objRest$i = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$n.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$n)
    for (var prop of __getOwnPropSymbols$n(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$n.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$e = {
  position: "bottom",
  offset: 8,
  positionDependencies: [],
  transitionProps: { transition: "fade", duration: 150 },
  middlewares: { flip: true, shift: true, inline: false },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  closeOnClickOutside: true,
  withinPortal: false,
  closeOnEscape: true,
  trapFocus: false,
  withRoles: true,
  returnFocus: false,
  clickOutsideEvents: ["mousedown", "touchstart"],
  zIndex: getDefaultZIndex("popover"),
  __staticSelector: "Popover",
  width: "max-content"
};
function Popover(props) {
  var _b, _c, _d, _e, _f, _g;
  const arrowRef = React.useRef(null);
  const _a = useComponentDefaultProps("Popover", defaultProps$e, props), {
    children,
    position,
    offset,
    onPositionChange,
    positionDependencies,
    opened,
    transitionProps,
    width,
    middlewares,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    unstyled,
    classNames,
    styles,
    closeOnClickOutside,
    withinPortal,
    portalProps,
    closeOnEscape,
    clickOutsideEvents,
    trapFocus,
    onClose,
    onOpen,
    onChange,
    zIndex,
    radius,
    shadow,
    id,
    defaultOpened,
    __staticSelector,
    withRoles,
    disabled,
    returnFocus,
    variant,
    keepMounted
  } = _a, others = __objRest$i(_a, [
    "children",
    "position",
    "offset",
    "onPositionChange",
    "positionDependencies",
    "opened",
    "transitionProps",
    "width",
    "middlewares",
    "withArrow",
    "arrowSize",
    "arrowOffset",
    "arrowRadius",
    "arrowPosition",
    "unstyled",
    "classNames",
    "styles",
    "closeOnClickOutside",
    "withinPortal",
    "portalProps",
    "closeOnEscape",
    "clickOutsideEvents",
    "trapFocus",
    "onClose",
    "onOpen",
    "onChange",
    "zIndex",
    "radius",
    "shadow",
    "id",
    "defaultOpened",
    "__staticSelector",
    "withRoles",
    "disabled",
    "returnFocus",
    "variant",
    "keepMounted"
  ]);
  const [targetNode, setTargetNode] = React.useState(null);
  const [dropdownNode, setDropdownNode] = React.useState(null);
  const uid = useId$1(id);
  const theme = useMantineTheme();
  const popover = usePopover({
    middlewares,
    width,
    position: getFloatingPosition(theme.dir, position),
    offset: typeof offset === "number" ? offset + (withArrow ? arrowSize / 2 : 0) : offset,
    arrowRef,
    arrowOffset,
    onPositionChange,
    positionDependencies,
    opened,
    defaultOpened,
    onChange,
    onOpen,
    onClose
  });
  useClickOutside(() => closeOnClickOutside && popover.onClose(), clickOutsideEvents, [
    targetNode,
    dropdownNode
  ]);
  const reference = React.useCallback((node) => {
    setTargetNode(node);
    popover.floating.reference(node);
  }, [popover.floating.reference]);
  const floating = React.useCallback((node) => {
    setDropdownNode(node);
    popover.floating.floating(node);
  }, [popover.floating.floating]);
  return /* @__PURE__ */ React.createElement(PopoverContextProvider, {
    value: {
      returnFocus,
      disabled,
      controlled: popover.controlled,
      reference,
      floating,
      x: popover.floating.x,
      y: popover.floating.y,
      arrowX: (_d = (_c = (_b = popover.floating) == null ? void 0 : _b.middlewareData) == null ? void 0 : _c.arrow) == null ? void 0 : _d.x,
      arrowY: (_g = (_f = (_e = popover.floating) == null ? void 0 : _e.middlewareData) == null ? void 0 : _f.arrow) == null ? void 0 : _g.y,
      opened: popover.opened,
      arrowRef,
      transitionProps,
      width,
      withArrow,
      arrowSize,
      arrowOffset,
      arrowRadius,
      arrowPosition,
      placement: popover.floating.placement,
      trapFocus,
      withinPortal,
      portalProps,
      zIndex,
      radius,
      shadow,
      closeOnEscape,
      onClose: popover.onClose,
      onToggle: popover.onToggle,
      getTargetId: () => `${uid}-target`,
      getDropdownId: () => `${uid}-dropdown`,
      withRoles,
      targetProps: others,
      __staticSelector,
      classNames,
      styles,
      unstyled,
      variant,
      keepMounted
    }
  }, children);
}
Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = "@mantine/core/Popover";

var __defProp$m = Object.defineProperty;
var __getOwnPropSymbols$m = Object.getOwnPropertySymbols;
var __hasOwnProp$m = Object.prototype.hasOwnProperty;
var __propIsEnum$m = Object.prototype.propertyIsEnumerable;
var __defNormalProp$m = (obj, key, value) => key in obj ? __defProp$m(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$m = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$m.call(b, prop))
      __defNormalProp$m(a, prop, b[prop]);
  if (__getOwnPropSymbols$m)
    for (var prop of __getOwnPropSymbols$m(b)) {
      if (__propIsEnum$m.call(b, prop))
        __defNormalProp$m(a, prop, b[prop]);
    }
  return a;
};
var __objRest$h = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$m.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$m)
    for (var prop of __getOwnPropSymbols$m(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$m.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function SelectPopoverDropdown(_a) {
  var _b = _a, {
    children,
    component = "div",
    maxHeight = 220,
    direction = "column",
    id,
    innerRef,
    __staticSelector,
    styles,
    classNames,
    unstyled
  } = _b, others = __objRest$h(_b, [
    "children",
    "component",
    "maxHeight",
    "direction",
    "id",
    "innerRef",
    "__staticSelector",
    "styles",
    "classNames",
    "unstyled"
  ]);
  const { classes } = useStyles$n(null, { name: __staticSelector, styles, classNames, unstyled });
  return /* @__PURE__ */ React.createElement(Popover.Dropdown, __spreadValues$m({
    p: 0,
    onMouseDown: (event) => event.preventDefault()
  }, others), /* @__PURE__ */ React.createElement("div", {
    style: { maxHeight: rem(maxHeight), display: "flex" }
  }, /* @__PURE__ */ React.createElement(Box, {
    component: component || "div",
    id: `${id}-items`,
    "aria-labelledby": `${id}-label`,
    role: "listbox",
    onMouseDown: (event) => event.preventDefault(),
    style: { flex: 1, overflowY: component !== SelectScrollArea ? "auto" : void 0 },
    "data-combobox-popover": true,
    tabIndex: -1,
    ref: innerRef
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.itemsWrapper,
    style: { flexDirection: direction }
  }, children))));
}
function SelectPopover({
  opened,
  transitionProps = { transition: "fade", duration: 0 },
  shadow,
  withinPortal,
  portalProps,
  children,
  __staticSelector,
  onDirectionChange,
  switchDirectionOnFlip,
  zIndex,
  dropdownPosition,
  positionDependencies = [],
  classNames,
  styles,
  unstyled,
  readOnly,
  variant
}) {
  return /* @__PURE__ */ React.createElement(Popover, {
    unstyled,
    classNames,
    styles,
    width: "target",
    withRoles: false,
    opened,
    middlewares: { flip: dropdownPosition === "flip", shift: false },
    position: dropdownPosition === "flip" ? "bottom" : dropdownPosition,
    positionDependencies,
    zIndex,
    __staticSelector,
    withinPortal,
    portalProps,
    transitionProps,
    shadow,
    disabled: readOnly,
    onPositionChange: (nextPosition) => switchDirectionOnFlip && (onDirectionChange == null ? void 0 : onDirectionChange(nextPosition === "top" ? "column-reverse" : "column")),
    variant
  }, children);
}
SelectPopover.Target = Popover.Target;
SelectPopover.Dropdown = SelectPopoverDropdown;

var __defProp$l = Object.defineProperty;
var __defProps$d = Object.defineProperties;
var __getOwnPropDescs$d = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$l = Object.getOwnPropertySymbols;
var __hasOwnProp$l = Object.prototype.hasOwnProperty;
var __propIsEnum$l = Object.prototype.propertyIsEnumerable;
var __defNormalProp$l = (obj, key, value) => key in obj ? __defProp$l(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$l = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$l.call(b, prop))
      __defNormalProp$l(a, prop, b[prop]);
  if (__getOwnPropSymbols$l)
    for (var prop of __getOwnPropSymbols$l(b)) {
      if (__propIsEnum$l.call(b, prop))
        __defNormalProp$l(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$d = (a, b) => __defProps$d(a, __getOwnPropDescs$d(b));
var __objRest$g = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$l.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$l)
    for (var prop of __getOwnPropSymbols$l(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$l.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useInputProps(component, defaultProps, props) {
  const _a = useComponentDefaultProps(component, defaultProps, props), {
    label,
    description,
    error,
    required,
    classNames,
    styles,
    className,
    unstyled,
    __staticSelector,
    sx,
    errorProps,
    labelProps,
    descriptionProps,
    wrapperProps: _wrapperProps,
    id,
    size,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant
  } = _a, others = __objRest$g(_a, [
    "label",
    "description",
    "error",
    "required",
    "classNames",
    "styles",
    "className",
    "unstyled",
    "__staticSelector",
    "sx",
    "errorProps",
    "labelProps",
    "descriptionProps",
    "wrapperProps",
    "id",
    "size",
    "style",
    "inputContainer",
    "inputWrapperOrder",
    "withAsterisk",
    "variant"
  ]);
  const uid = useId$1(id);
  const { systemStyles, rest } = extractSystemStyles(others);
  const wrapperProps = __spreadValues$l({
    label,
    description,
    error,
    required,
    classNames,
    className,
    __staticSelector,
    sx,
    errorProps,
    labelProps,
    descriptionProps,
    unstyled,
    styles,
    id: uid,
    size,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant
  }, _wrapperProps);
  return __spreadProps$d(__spreadValues$l({}, rest), {
    classNames,
    styles,
    unstyled,
    wrapperProps: __spreadValues$l(__spreadValues$l({}, wrapperProps), systemStyles),
    inputProps: {
      required,
      classNames,
      styles,
      unstyled,
      id: uid,
      size,
      __staticSelector,
      error,
      variant
    }
  });
}

var useStyles$i = createStyles((theme, _params, { size }) => ({
  label: {
    display: "inline-block",
    fontSize: getSize({ size, sizes: theme.fontSizes }),
    fontWeight: 500,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[9],
    wordBreak: "break-word",
    cursor: "default",
    WebkitTapHighlightColor: "transparent"
  },
  required: {
    color: theme.fn.variant({ variant: "filled", color: "red" }).background
  }
}));

var useStyles$j = useStyles$i;

var __defProp$k = Object.defineProperty;
var __getOwnPropSymbols$k = Object.getOwnPropertySymbols;
var __hasOwnProp$k = Object.prototype.hasOwnProperty;
var __propIsEnum$k = Object.prototype.propertyIsEnumerable;
var __defNormalProp$k = (obj, key, value) => key in obj ? __defProp$k(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$k = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$k.call(b, prop))
      __defNormalProp$k(a, prop, b[prop]);
  if (__getOwnPropSymbols$k)
    for (var prop of __getOwnPropSymbols$k(b)) {
      if (__propIsEnum$k.call(b, prop))
        __defNormalProp$k(a, prop, b[prop]);
    }
  return a;
};
var __objRest$f = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$k.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$k)
    for (var prop of __getOwnPropSymbols$k(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$k.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$d = {
  labelElement: "label",
  size: "sm"
};
const InputLabel = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("InputLabel", defaultProps$d, props), {
    labelElement,
    children,
    required,
    size,
    classNames,
    styles,
    unstyled,
    className,
    htmlFor,
    __staticSelector,
    variant,
    onMouseDown
  } = _a, others = __objRest$f(_a, [
    "labelElement",
    "children",
    "required",
    "size",
    "classNames",
    "styles",
    "unstyled",
    "className",
    "htmlFor",
    "__staticSelector",
    "variant",
    "onMouseDown"
  ]);
  const { classes, cx } = useStyles$j(null, {
    name: ["InputWrapper", __staticSelector],
    classNames,
    styles,
    unstyled,
    variant,
    size
  });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$k({
    component: labelElement,
    ref,
    className: cx(classes.label, className),
    htmlFor: labelElement === "label" ? htmlFor : void 0,
    onMouseDown: (event) => {
      onMouseDown == null ? void 0 : onMouseDown(event);
      if (!event.defaultPrevented && event.detail > 1) {
        event.preventDefault();
      }
    }
  }, others), children, required && /* @__PURE__ */ React.createElement("span", {
    className: classes.required,
    "aria-hidden": true
  }, " *"));
});
InputLabel.displayName = "@mantine/core/InputLabel";

var useStyles$g = createStyles((theme, _params, { size }) => ({
  error: {
    wordBreak: "break-word",
    color: theme.fn.variant({ variant: "filled", color: "red" }).background,
    fontSize: `calc(${getSize({ size, sizes: theme.fontSizes })} - ${rem(2)})`,
    lineHeight: 1.2,
    display: "block"
  }
}));

var useStyles$h = useStyles$g;

var __defProp$j = Object.defineProperty;
var __getOwnPropSymbols$j = Object.getOwnPropertySymbols;
var __hasOwnProp$j = Object.prototype.hasOwnProperty;
var __propIsEnum$j = Object.prototype.propertyIsEnumerable;
var __defNormalProp$j = (obj, key, value) => key in obj ? __defProp$j(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$j = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$j.call(b, prop))
      __defNormalProp$j(a, prop, b[prop]);
  if (__getOwnPropSymbols$j)
    for (var prop of __getOwnPropSymbols$j(b)) {
      if (__propIsEnum$j.call(b, prop))
        __defNormalProp$j(a, prop, b[prop]);
    }
  return a;
};
var __objRest$e = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$j.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$j)
    for (var prop of __getOwnPropSymbols$j(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$j.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$c = {
  size: "sm"
};
const InputError = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("InputError", defaultProps$c, props), {
    children,
    className,
    classNames,
    styles,
    unstyled,
    size,
    __staticSelector,
    variant
  } = _a, others = __objRest$e(_a, [
    "children",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "size",
    "__staticSelector",
    "variant"
  ]);
  const { classes, cx } = useStyles$h(null, {
    name: ["InputWrapper", __staticSelector],
    classNames,
    styles,
    unstyled,
    variant,
    size
  });
  return /* @__PURE__ */ React.createElement(Text, __spreadValues$j({
    className: cx(classes.error, className),
    ref
  }, others), children);
});
InputError.displayName = "@mantine/core/InputError";

var useStyles$e = createStyles((theme, _params, { size }) => ({
  description: {
    wordBreak: "break-word",
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    fontSize: `calc(${getSize({ size, sizes: theme.fontSizes })} - ${rem(2)})`,
    lineHeight: 1.2,
    display: "block"
  }
}));

var useStyles$f = useStyles$e;

var __defProp$i = Object.defineProperty;
var __getOwnPropSymbols$i = Object.getOwnPropertySymbols;
var __hasOwnProp$i = Object.prototype.hasOwnProperty;
var __propIsEnum$i = Object.prototype.propertyIsEnumerable;
var __defNormalProp$i = (obj, key, value) => key in obj ? __defProp$i(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$i = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$i.call(b, prop))
      __defNormalProp$i(a, prop, b[prop]);
  if (__getOwnPropSymbols$i)
    for (var prop of __getOwnPropSymbols$i(b)) {
      if (__propIsEnum$i.call(b, prop))
        __defNormalProp$i(a, prop, b[prop]);
    }
  return a;
};
var __objRest$d = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$i.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$i)
    for (var prop of __getOwnPropSymbols$i(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$i.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$b = {
  size: "sm"
};
const InputDescription = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("InputDescription", defaultProps$b, props), {
    children,
    className,
    classNames,
    styles,
    unstyled,
    size,
    __staticSelector,
    variant
  } = _a, others = __objRest$d(_a, [
    "children",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "size",
    "__staticSelector",
    "variant"
  ]);
  const { classes, cx } = useStyles$f(null, {
    name: ["InputWrapper", __staticSelector],
    classNames,
    styles,
    unstyled,
    variant,
    size
  });
  return /* @__PURE__ */ React.createElement(Text, __spreadValues$i({
    color: "dimmed",
    className: cx(classes.description, className),
    ref,
    unstyled
  }, others), children);
});
InputDescription.displayName = "@mantine/core/InputDescription";

const InputWrapperContext = React.createContext({
  offsetBottom: false,
  offsetTop: false,
  describedBy: void 0
});
const InputWrapperProvider = InputWrapperContext.Provider;
const useInputWrapperContext = () => React.useContext(InputWrapperContext);

function getInputOffsets(inputWrapperOrder, { hasDescription, hasError }) {
  const inputIndex = inputWrapperOrder.findIndex((part) => part === "input");
  const aboveInput = inputWrapperOrder[inputIndex - 1];
  const belowInput = inputWrapperOrder[inputIndex + 1];
  const offsetTop = hasDescription && aboveInput === "description" || hasError && aboveInput === "error";
  const offsetBottom = hasDescription && belowInput === "description" || hasError && belowInput === "error";
  return { offsetBottom, offsetTop };
}

var __defProp$h = Object.defineProperty;
var __defProps$c = Object.defineProperties;
var __getOwnPropDescs$c = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$h = Object.getOwnPropertySymbols;
var __hasOwnProp$h = Object.prototype.hasOwnProperty;
var __propIsEnum$h = Object.prototype.propertyIsEnumerable;
var __defNormalProp$h = (obj, key, value) => key in obj ? __defProp$h(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$h = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$h.call(b, prop))
      __defNormalProp$h(a, prop, b[prop]);
  if (__getOwnPropSymbols$h)
    for (var prop of __getOwnPropSymbols$h(b)) {
      if (__propIsEnum$h.call(b, prop))
        __defNormalProp$h(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$c = (a, b) => __defProps$c(a, __getOwnPropDescs$c(b));
var useStyles$c = createStyles((theme) => ({
  root: __spreadProps$c(__spreadValues$h({}, theme.fn.fontStyles()), {
    lineHeight: theme.lineHeight
  })
}));

var useStyles$d = useStyles$c;

var __defProp$g = Object.defineProperty;
var __defProps$b = Object.defineProperties;
var __getOwnPropDescs$b = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
var __hasOwnProp$g = Object.prototype.hasOwnProperty;
var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
var __defNormalProp$g = (obj, key, value) => key in obj ? __defProp$g(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$g = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$g.call(b, prop))
      __defNormalProp$g(a, prop, b[prop]);
  if (__getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(b)) {
      if (__propIsEnum$g.call(b, prop))
        __defNormalProp$g(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$b = (a, b) => __defProps$b(a, __getOwnPropDescs$b(b));
var __objRest$c = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$g.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$g.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$a = {
  labelElement: "label",
  size: "sm",
  inputContainer: (children) => children,
  inputWrapperOrder: ["label", "description", "input", "error"]
};
const InputWrapper = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("InputWrapper", defaultProps$a, props), {
    className,
    label,
    children,
    required,
    id,
    error,
    description,
    labelElement,
    labelProps,
    descriptionProps,
    errorProps,
    classNames,
    styles,
    size,
    inputContainer,
    __staticSelector,
    unstyled,
    inputWrapperOrder,
    withAsterisk,
    variant
  } = _a, others = __objRest$c(_a, [
    "className",
    "label",
    "children",
    "required",
    "id",
    "error",
    "description",
    "labelElement",
    "labelProps",
    "descriptionProps",
    "errorProps",
    "classNames",
    "styles",
    "size",
    "inputContainer",
    "__staticSelector",
    "unstyled",
    "inputWrapperOrder",
    "withAsterisk",
    "variant"
  ]);
  const { classes, cx } = useStyles$d(null, {
    classNames,
    styles,
    name: ["InputWrapper", __staticSelector],
    unstyled,
    variant,
    size
  });
  const sharedProps = {
    classNames,
    styles,
    unstyled,
    size,
    variant,
    __staticSelector
  };
  const isRequired = typeof withAsterisk === "boolean" ? withAsterisk : required;
  const errorId = id ? `${id}-error` : errorProps == null ? void 0 : errorProps.id;
  const descriptionId = id ? `${id}-description` : descriptionProps == null ? void 0 : descriptionProps.id;
  const hasError = !!error && typeof error !== "boolean";
  const _describedBy = `${hasError ? errorId : ""} ${description ? descriptionId : ""}`;
  const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : void 0;
  const _label = label && /* @__PURE__ */ React.createElement(InputLabel, __spreadValues$g(__spreadValues$g({
    key: "label",
    labelElement,
    id: id ? `${id}-label` : void 0,
    htmlFor: id,
    required: isRequired
  }, sharedProps), labelProps), label);
  const _description = description && /* @__PURE__ */ React.createElement(InputDescription, __spreadProps$b(__spreadValues$g(__spreadValues$g({
    key: "description"
  }, descriptionProps), sharedProps), {
    size: (descriptionProps == null ? void 0 : descriptionProps.size) || sharedProps.size,
    id: (descriptionProps == null ? void 0 : descriptionProps.id) || descriptionId
  }), description);
  const _input = /* @__PURE__ */ React.createElement(React.Fragment, {
    key: "input"
  }, inputContainer(children));
  const _error = typeof error !== "boolean" && error && /* @__PURE__ */ React.createElement(InputError, __spreadProps$b(__spreadValues$g(__spreadValues$g({}, errorProps), sharedProps), {
    size: (errorProps == null ? void 0 : errorProps.size) || sharedProps.size,
    key: "error",
    id: (errorProps == null ? void 0 : errorProps.id) || errorId
  }), error);
  const content = inputWrapperOrder.map((part) => {
    switch (part) {
      case "label":
        return _label;
      case "input":
        return _input;
      case "description":
        return _description;
      case "error":
        return _error;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ React.createElement(InputWrapperProvider, {
    value: __spreadValues$g({
      describedBy
    }, getInputOffsets(inputWrapperOrder, {
      hasDescription: !!_description,
      hasError: !!_error
    }))
  }, /* @__PURE__ */ React.createElement(Box, __spreadValues$g({
    className: cx(classes.root, className),
    ref
  }, others), content));
});
InputWrapper.displayName = "@mantine/core/InputWrapper";

var __defProp$f = Object.defineProperty;
var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
var __hasOwnProp$f = Object.prototype.hasOwnProperty;
var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
var __defNormalProp$f = (obj, key, value) => key in obj ? __defProp$f(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$f = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$f.call(b, prop))
      __defNormalProp$f(a, prop, b[prop]);
  if (__getOwnPropSymbols$f)
    for (var prop of __getOwnPropSymbols$f(b)) {
      if (__propIsEnum$f.call(b, prop))
        __defNormalProp$f(a, prop, b[prop]);
    }
  return a;
};
var __objRest$b = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$f.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$f)
    for (var prop of __getOwnPropSymbols$f(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$f.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$9 = {};
const InputPlaceholder = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("InputPlaceholder", defaultProps$9, props), { sx } = _a, others = __objRest$b(_a, ["sx"]);
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$f({
    component: "span",
    sx: [(theme) => theme.fn.placeholderStyles(), ...packSx(sx)],
    ref
  }, others));
});
InputPlaceholder.displayName = "@mantine/core/InputPlaceholder";

var __defProp$e = Object.defineProperty;
var __defProps$a = Object.defineProperties;
var __getOwnPropDescs$a = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$e = Object.getOwnPropertySymbols;
var __hasOwnProp$e = Object.prototype.hasOwnProperty;
var __propIsEnum$e = Object.prototype.propertyIsEnumerable;
var __defNormalProp$e = (obj, key, value) => key in obj ? __defProp$e(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$e = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$e.call(b, prop))
      __defNormalProp$e(a, prop, b[prop]);
  if (__getOwnPropSymbols$e)
    for (var prop of __getOwnPropSymbols$e(b)) {
      if (__propIsEnum$e.call(b, prop))
        __defNormalProp$e(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$a = (a, b) => __defProps$a(a, __getOwnPropDescs$a(b));
const sizes$1 = {
  xs: rem(30),
  sm: rem(36),
  md: rem(42),
  lg: rem(50),
  xl: rem(60)
};
const INPUT_VARIANTS = ["default", "filled", "unstyled"];
function getVariantStyles$1({ theme, variant }) {
  if (!INPUT_VARIANTS.includes(variant)) {
    return null;
  }
  if (variant === "default") {
    return {
      border: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      transition: "border-color 100ms ease",
      "&:focus, &:focus-within": theme.focusRingStyles.inputStyles(theme)
    };
  }
  if (variant === "filled") {
    return {
      border: `${rem(1)} solid transparent`,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],
      "&:focus, &:focus-within": theme.focusRingStyles.inputStyles(theme)
    };
  }
  return {
    borderWidth: 0,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    backgroundColor: "transparent",
    minHeight: rem(28),
    outline: 0,
    "&:focus, &:focus-within": {
      outline: "none",
      borderColor: "transparent"
    },
    "&:disabled": {
      backgroundColor: "transparent",
      "&:focus, &:focus-within": {
        outline: "none",
        borderColor: "transparent"
      }
    }
  };
}
var useStyles$a = createStyles((theme, {
  multiline,
  radius,
  invalid,
  rightSectionWidth,
  withRightSection,
  iconWidth,
  offsetBottom,
  offsetTop,
  pointer
}, { variant, size }) => {
  const invalidColor = theme.fn.variant({ variant: "filled", color: "red" }).background;
  const sizeStyles = variant === "default" || variant === "filled" ? {
    minHeight: getSize({ size, sizes: sizes$1 }),
    paddingLeft: `calc(${getSize({ size, sizes: sizes$1 })}  / 3)`,
    paddingRight: withRightSection ? rightSectionWidth || getSize({ size, sizes: sizes$1 }) : `calc(${getSize({ size, sizes: sizes$1 })}  / 3)`,
    borderRadius: theme.fn.radius(radius)
  } : null;
  return {
    wrapper: {
      position: "relative",
      marginTop: offsetTop ? `calc(${theme.spacing.xs} / 2)` : void 0,
      marginBottom: offsetBottom ? `calc(${theme.spacing.xs} / 2)` : void 0
    },
    input: __spreadProps$a(__spreadValues$e(__spreadValues$e(__spreadProps$a(__spreadValues$e({}, theme.fn.fontStyles()), {
      height: multiline ? variant === "unstyled" ? void 0 : "auto" : getSize({ size, sizes: sizes$1 }),
      WebkitTapHighlightColor: "transparent",
      lineHeight: multiline ? theme.lineHeight : `calc(${getSize({ size, sizes: sizes$1 })} - ${rem(2)})`,
      appearance: "none",
      resize: "none",
      boxSizing: "border-box",
      fontSize: getSize({ size, sizes: theme.fontSizes }),
      width: "100%",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
      display: "block",
      textAlign: "left",
      cursor: pointer ? "pointer" : void 0
    }), getVariantStyles$1({ theme, variant })), sizeStyles), {
      "&:disabled, &[data-disabled]": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
        color: theme.colors.dark[2],
        opacity: 0.6,
        cursor: "not-allowed",
        "&::placeholder": {
          color: theme.colors.dark[2]
        }
      },
      "&[data-invalid]": {
        color: invalidColor,
        borderColor: invalidColor,
        "&::placeholder": {
          opacity: 1,
          color: invalidColor
        }
      },
      "&[data-with-icon]": {
        paddingLeft: typeof iconWidth === "number" ? rem(iconWidth) : getSize({ size, sizes: sizes$1 })
      },
      "&::placeholder": __spreadProps$a(__spreadValues$e({}, theme.fn.placeholderStyles()), {
        opacity: 1
      }),
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
        appearance: "none"
      },
      "&[type=number]": {
        MozAppearance: "textfield"
      }
    }),
    icon: {
      pointerEvents: "none",
      position: "absolute",
      zIndex: 1,
      left: 0,
      top: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: iconWidth ? rem(iconWidth) : getSize({ size, sizes: sizes$1 }),
      color: invalid ? theme.colors.red[theme.colorScheme === "dark" ? 6 : 7] : theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[5]
    },
    rightSection: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: rightSectionWidth || getSize({ size, sizes: sizes$1 })
    }
  };
});

var useStyles$b = useStyles$a;

var __defProp$d = Object.defineProperty;
var __defProps$9 = Object.defineProperties;
var __getOwnPropDescs$9 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$d = Object.getOwnPropertySymbols;
var __hasOwnProp$d = Object.prototype.hasOwnProperty;
var __propIsEnum$d = Object.prototype.propertyIsEnumerable;
var __defNormalProp$d = (obj, key, value) => key in obj ? __defProp$d(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$d = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$d.call(b, prop))
      __defNormalProp$d(a, prop, b[prop]);
  if (__getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(b)) {
      if (__propIsEnum$d.call(b, prop))
        __defNormalProp$d(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$9 = (a, b) => __defProps$9(a, __getOwnPropDescs$9(b));
var __objRest$a = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$d.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$d)
    for (var prop of __getOwnPropSymbols$d(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$d.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$8 = {
  size: "sm",
  variant: "default"
};
const _Input = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Input", defaultProps$8, props), {
    className,
    error,
    required,
    disabled,
    variant,
    icon,
    style,
    rightSectionWidth,
    iconWidth,
    rightSection,
    rightSectionProps,
    radius,
    size,
    wrapperProps,
    classNames,
    styles,
    __staticSelector,
    multiline,
    sx,
    unstyled,
    pointer
  } = _a, others = __objRest$a(_a, [
    "className",
    "error",
    "required",
    "disabled",
    "variant",
    "icon",
    "style",
    "rightSectionWidth",
    "iconWidth",
    "rightSection",
    "rightSectionProps",
    "radius",
    "size",
    "wrapperProps",
    "classNames",
    "styles",
    "__staticSelector",
    "multiline",
    "sx",
    "unstyled",
    "pointer"
  ]);
  const { offsetBottom, offsetTop, describedBy } = useInputWrapperContext();
  const { classes, cx } = useStyles$b({
    radius,
    multiline,
    invalid: !!error,
    rightSectionWidth: rightSectionWidth ? rem(rightSectionWidth) : void 0,
    iconWidth,
    withRightSection: !!rightSection,
    offsetBottom,
    offsetTop,
    pointer
  }, { classNames, styles, name: ["Input", __staticSelector], unstyled, variant, size });
  const { systemStyles, rest } = extractSystemStyles(others);
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$d(__spreadValues$d({
    className: cx(classes.wrapper, className),
    sx,
    style
  }, systemStyles), wrapperProps), icon && /* @__PURE__ */ React.createElement("div", {
    className: classes.icon
  }, icon), /* @__PURE__ */ React.createElement(Box, __spreadProps$9(__spreadValues$d({
    component: "input"
  }, rest), {
    ref,
    required,
    "aria-invalid": !!error,
    "aria-describedby": describedBy,
    disabled,
    "data-disabled": disabled || void 0,
    "data-with-icon": !!icon || void 0,
    "data-invalid": !!error || void 0,
    className: classes.input
  })), rightSection && /* @__PURE__ */ React.createElement("div", __spreadProps$9(__spreadValues$d({}, rightSectionProps), {
    className: classes.rightSection
  }), rightSection));
});
_Input.displayName = "@mantine/core/Input";
_Input.Wrapper = InputWrapper;
_Input.Label = InputLabel;
_Input.Description = InputDescription;
_Input.Error = InputError;
_Input.Placeholder = InputPlaceholder;
const Input = createPolymorphicComponent(_Input);

var useStyles$8 = createStyles((_theme, { orientation, buttonBorderWidth }) => ({
  root: {
    display: "flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    "& [data-button]": {
      "&:first-of-type:not(:last-of-type)": {
        borderBottomRightRadius: 0,
        [orientation === "vertical" ? "borderBottomLeftRadius" : "borderTopRightRadius"]: 0,
        [orientation === "vertical" ? "borderBottomWidth" : "borderRightWidth"]: `calc(${rem(buttonBorderWidth)} / 2)`
      },
      "&:last-of-type:not(:first-of-type)": {
        borderTopLeftRadius: 0,
        [orientation === "vertical" ? "borderTopRightRadius" : "borderBottomLeftRadius"]: 0,
        [orientation === "vertical" ? "borderTopWidth" : "borderLeftWidth"]: `calc(${rem(buttonBorderWidth)} / 2)`
      },
      "&:not(:first-of-type):not(:last-of-type)": {
        borderRadius: 0,
        [orientation === "vertical" ? "borderTopWidth" : "borderLeftWidth"]: `calc(${rem(buttonBorderWidth)} / 2)`,
        [orientation === "vertical" ? "borderBottomWidth" : "borderRightWidth"]: `calc(${rem(buttonBorderWidth)} / 2)`
      },
      "& + [data-button]": {
        [orientation === "vertical" ? "marginTop" : "marginLeft"]: `calc(${buttonBorderWidth} * -1)`,
        "@media (min-resolution: 192dpi)": {
          [orientation === "vertical" ? "marginTop" : "marginLeft"]: 0
        }
      }
    }
  }
}));

var useStyles$9 = useStyles$8;

var __defProp$c = Object.defineProperty;
var __getOwnPropSymbols$c = Object.getOwnPropertySymbols;
var __hasOwnProp$c = Object.prototype.hasOwnProperty;
var __propIsEnum$c = Object.prototype.propertyIsEnumerable;
var __defNormalProp$c = (obj, key, value) => key in obj ? __defProp$c(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$c = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$c.call(b, prop))
      __defNormalProp$c(a, prop, b[prop]);
  if (__getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(b)) {
      if (__propIsEnum$c.call(b, prop))
        __defNormalProp$c(a, prop, b[prop]);
    }
  return a;
};
var __objRest$9 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$c.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$c)
    for (var prop of __getOwnPropSymbols$c(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$c.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$7 = {
  orientation: "horizontal",
  buttonBorderWidth: 1
};
const ButtonGroup = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("ButtonGroup", defaultProps$7, props), { className, orientation, buttonBorderWidth, unstyled } = _a, others = __objRest$9(_a, ["className", "orientation", "buttonBorderWidth", "unstyled"]);
  const { classes, cx } = useStyles$9({ orientation, buttonBorderWidth }, { name: "ButtonGroup", unstyled });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues$c({
    className: cx(classes.root, className),
    ref
  }, others));
});
ButtonGroup.displayName = "@mantine/core/ButtonGroup";

var __defProp$b = Object.defineProperty;
var __defProps$8 = Object.defineProperties;
var __getOwnPropDescs$8 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$b = Object.getOwnPropertySymbols;
var __hasOwnProp$b = Object.prototype.hasOwnProperty;
var __propIsEnum$b = Object.prototype.propertyIsEnumerable;
var __defNormalProp$b = (obj, key, value) => key in obj ? __defProp$b(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$b = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$b.call(b, prop))
      __defNormalProp$b(a, prop, b[prop]);
  if (__getOwnPropSymbols$b)
    for (var prop of __getOwnPropSymbols$b(b)) {
      if (__propIsEnum$b.call(b, prop))
        __defNormalProp$b(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$8 = (a, b) => __defProps$8(a, __getOwnPropDescs$8(b));
const BUTTON_VARIANTS = [
  "filled",
  "outline",
  "light",
  "white",
  "default",
  "subtle",
  "gradient"
];
const sizes = {
  xs: { height: sizes$1.xs, paddingLeft: rem(14), paddingRight: rem(14) },
  sm: { height: sizes$1.sm, paddingLeft: rem(18), paddingRight: rem(18) },
  md: { height: sizes$1.md, paddingLeft: rem(22), paddingRight: rem(22) },
  lg: { height: sizes$1.lg, paddingLeft: rem(26), paddingRight: rem(26) },
  xl: { height: sizes$1.xl, paddingLeft: rem(32), paddingRight: rem(32) },
  "compact-xs": { height: rem(22), paddingLeft: rem(7), paddingRight: rem(7) },
  "compact-sm": { height: rem(26), paddingLeft: rem(8), paddingRight: rem(8) },
  "compact-md": { height: rem(30), paddingLeft: rem(10), paddingRight: rem(10) },
  "compact-lg": { height: rem(34), paddingLeft: rem(12), paddingRight: rem(12) },
  "compact-xl": { height: rem(40), paddingLeft: rem(14), paddingRight: rem(14) }
};
function getSizeStyles({ compact, size, withLeftIcon, withRightIcon }) {
  if (compact) {
    return sizes[`compact-${size}`];
  }
  const _sizes = sizes[size];
  if (!_sizes) {
    return {};
  }
  return __spreadProps$8(__spreadValues$b({}, _sizes), {
    paddingLeft: withLeftIcon ? `calc(${_sizes.paddingLeft}  / 1.5)` : _sizes.paddingLeft,
    paddingRight: withRightIcon ? `calc(${_sizes.paddingRight}  / 1.5)` : _sizes.paddingRight
  });
}
const getWidthStyles = (fullWidth) => ({
  display: fullWidth ? "block" : "inline-block",
  width: fullWidth ? "100%" : "auto"
});
function getVariantStyles({ variant, theme, color, gradient }) {
  if (!BUTTON_VARIANTS.includes(variant)) {
    return null;
  }
  const colors = theme.fn.variant({ color, variant, gradient });
  if (variant === "gradient") {
    return __spreadValues$b({
      border: 0,
      backgroundImage: colors.background,
      color: colors.color
    }, theme.fn.hover({ backgroundSize: "200%" }));
  }
  return __spreadValues$b({
    border: `${rem(1)} solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.color
  }, theme.fn.hover({ backgroundColor: colors.hover }));
}
var useStyles$6 = createStyles((theme, {
  radius,
  fullWidth,
  compact,
  withLeftIcon,
  withRightIcon,
  color,
  gradient
}, { variant, size }) => ({
  root: __spreadProps$8(__spreadValues$b(__spreadProps$8(__spreadValues$b(__spreadValues$b(__spreadValues$b(__spreadValues$b({}, getSizeStyles({ compact, size, withLeftIcon, withRightIcon })), theme.fn.fontStyles()), theme.fn.focusStyles()), getWidthStyles(fullWidth)), {
    borderRadius: theme.fn.radius(radius),
    fontWeight: 600,
    position: "relative",
    lineHeight: 1,
    fontSize: getSize({ size, sizes: theme.fontSizes }),
    userSelect: "none",
    cursor: "pointer"
  }), getVariantStyles({ variant, theme, color, gradient })), {
    "&:active": theme.activeStyles,
    "&:disabled, &[data-disabled]": {
      borderColor: "transparent",
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],
      color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[5],
      cursor: "not-allowed",
      backgroundImage: "none",
      pointerEvents: "none",
      "&:active": {
        transform: "none"
      }
    },
    "&[data-loading]": {
      pointerEvents: "none",
      "&::before": __spreadProps$8(__spreadValues$b({
        content: '""'
      }, theme.fn.cover(rem(-1))), {
        backgroundColor: theme.colorScheme === "dark" ? theme.fn.rgba(theme.colors.dark[7], 0.5) : "rgba(255, 255, 255, .5)",
        borderRadius: theme.fn.radius(radius),
        cursor: "not-allowed"
      })
    }
  }),
  icon: {
    display: "flex",
    alignItems: "center"
  },
  leftIcon: {
    marginRight: theme.spacing.xs
  },
  rightIcon: {
    marginLeft: theme.spacing.xs
  },
  centerLoader: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: 0.5
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    overflow: "visible"
  },
  label: {
    whiteSpace: "nowrap",
    height: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center"
  }
}));

var useStyles$7 = useStyles$6;

var __defProp$a = Object.defineProperty;
var __getOwnPropSymbols$a = Object.getOwnPropertySymbols;
var __hasOwnProp$a = Object.prototype.hasOwnProperty;
var __propIsEnum$a = Object.prototype.propertyIsEnumerable;
var __defNormalProp$a = (obj, key, value) => key in obj ? __defProp$a(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$a = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$a.call(b, prop))
      __defNormalProp$a(a, prop, b[prop]);
  if (__getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(b)) {
      if (__propIsEnum$a.call(b, prop))
        __defNormalProp$a(a, prop, b[prop]);
    }
  return a;
};
var __objRest$8 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$a.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$a)
    for (var prop of __getOwnPropSymbols$a(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$a.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$6 = {
  size: "sm",
  type: "button",
  variant: "filled",
  loaderPosition: "left"
};
const _Button = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Button", defaultProps$6, props), {
    className,
    size,
    color,
    type,
    disabled,
    children,
    leftIcon,
    rightIcon,
    fullWidth,
    variant,
    radius,
    uppercase,
    compact,
    loading,
    loaderPosition,
    loaderProps,
    gradient,
    classNames,
    styles,
    unstyled
  } = _a, others = __objRest$8(_a, [
    "className",
    "size",
    "color",
    "type",
    "disabled",
    "children",
    "leftIcon",
    "rightIcon",
    "fullWidth",
    "variant",
    "radius",
    "uppercase",
    "compact",
    "loading",
    "loaderPosition",
    "loaderProps",
    "gradient",
    "classNames",
    "styles",
    "unstyled"
  ]);
  const { classes, cx, theme } = useStyles$7({
    radius,
    color,
    fullWidth,
    compact,
    gradient,
    withLeftIcon: !!leftIcon,
    withRightIcon: !!rightIcon
  }, { name: "Button", unstyled, classNames, styles, variant, size });
  const colors = theme.fn.variant({ color, variant });
  const loader = /* @__PURE__ */ React.createElement(Loader, __spreadValues$a({
    color: colors.color,
    size: `calc(${getSize({ size, sizes }).height} / 2)`
  }, loaderProps));
  return /* @__PURE__ */ React.createElement(UnstyledButton, __spreadValues$a({
    className: cx(classes.root, className),
    type,
    disabled,
    "data-button": true,
    "data-disabled": disabled || void 0,
    "data-loading": loading || void 0,
    ref,
    unstyled
  }, others), /* @__PURE__ */ React.createElement("div", {
    className: classes.inner
  }, (leftIcon || loading && loaderPosition === "left") && /* @__PURE__ */ React.createElement("span", {
    className: cx(classes.icon, classes.leftIcon)
  }, loading && loaderPosition === "left" ? loader : leftIcon), loading && loaderPosition === "center" && /* @__PURE__ */ React.createElement("span", {
    className: classes.centerLoader
  }, loader), /* @__PURE__ */ React.createElement("span", {
    className: classes.label,
    style: { textTransform: uppercase ? "uppercase" : void 0 }
  }, children), (rightIcon || loading && loaderPosition === "right") && /* @__PURE__ */ React.createElement("span", {
    className: cx(classes.icon, classes.rightIcon)
  }, loading && loaderPosition === "right" ? loader : rightIcon)));
});
_Button.displayName = "@mantine/core/Button";
_Button.Group = ButtonGroup;
const Button = createPolymorphicComponent(_Button);

const FLEX_SYSTEM_PROPS = {
  gap: { type: "spacing", property: "gap" },
  rowGap: { type: "spacing", property: "rowGap" },
  columnGap: { type: "spacing", property: "columnGap" },
  align: { type: "identity", property: "alignItems" },
  justify: { type: "identity", property: "justifyContent" },
  wrap: { type: "identity", property: "flexWrap" },
  direction: { type: "identity", property: "flexDirection" }
};

var __defProp$9 = Object.defineProperty;
var __defProps$7 = Object.defineProperties;
var __getOwnPropDescs$7 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$9 = Object.getOwnPropertySymbols;
var __hasOwnProp$9 = Object.prototype.hasOwnProperty;
var __propIsEnum$9 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$9 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$9.call(b, prop))
      __defNormalProp$9(a, prop, b[prop]);
  if (__getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(b)) {
      if (__propIsEnum$9.call(b, prop))
        __defNormalProp$9(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$7 = (a, b) => __defProps$7(a, __getOwnPropDescs$7(b));
var __objRest$7 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$9.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$9)
    for (var prop of __getOwnPropSymbols$9(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$9.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$5 = {};
const Flex = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Flex", defaultProps$5, props), { gap, rowGap, columnGap, align, justify, wrap, direction, sx } = _a, others = __objRest$7(_a, ["gap", "rowGap", "columnGap", "align", "justify", "wrap", "direction", "sx"]);
  return /* @__PURE__ */ React.createElement(Box, __spreadProps$7(__spreadValues$9({}, others), {
    sx: [
      { display: "flex" },
      (theme) => getSystemStyles({ gap, rowGap, columnGap, align, justify, wrap, direction }, theme, FLEX_SYSTEM_PROPS),
      ...packSx(sx)
    ],
    ref
  }));
});
Flex.displayName = "@mantine/core/Flex";

var __defProp$8 = Object.defineProperty;
var __getOwnPropSymbols$8 = Object.getOwnPropertySymbols;
var __hasOwnProp$8 = Object.prototype.hasOwnProperty;
var __propIsEnum$8 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$8 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$8.call(b, prop))
      __defNormalProp$8(a, prop, b[prop]);
  if (__getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(b)) {
      if (__propIsEnum$8.call(b, prop))
        __defNormalProp$8(a, prop, b[prop]);
    }
  return a;
};
var __objRest$6 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$8.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$8)
    for (var prop of __getOwnPropSymbols$8(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$8.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const iconSizes = {
  xs: rem(14),
  sm: rem(18),
  md: rem(20),
  lg: rem(24),
  xl: rem(28)
};
function ChevronIcon(_a) {
  var _b = _a, { size, error, style } = _b, others = __objRest$6(_b, ["size", "error", "style"]);
  const theme = useMantineTheme();
  const _size = getSize({ size, sizes: iconSizes });
  return /* @__PURE__ */ React.createElement("svg", __spreadValues$8({
    width: _size,
    height: _size,
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: __spreadValues$8({ color: error ? theme.colors.red[6] : theme.colors.gray[6] }, style),
    "data-chevron": true
  }, others), /* @__PURE__ */ React.createElement("path", {
    d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}

var __defProp$7 = Object.defineProperty;
var __defProps$6 = Object.defineProperties;
var __getOwnPropDescs$6 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$7 = Object.getOwnPropertySymbols;
var __hasOwnProp$7 = Object.prototype.hasOwnProperty;
var __propIsEnum$7 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$7 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$7.call(b, prop))
      __defNormalProp$7(a, prop, b[prop]);
  if (__getOwnPropSymbols$7)
    for (var prop of __getOwnPropSymbols$7(b)) {
      if (__propIsEnum$7.call(b, prop))
        __defNormalProp$7(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$6 = (a, b) => __defProps$6(a, __getOwnPropDescs$6(b));
function SelectRightSection({
  shouldClear,
  clearButtonProps,
  onClear,
  size,
  error
}) {
  return shouldClear ? /* @__PURE__ */ React.createElement(CloseButton, __spreadProps$6(__spreadValues$7({}, clearButtonProps), {
    variant: "transparent",
    onClick: onClear,
    size,
    onMouseDown: (event) => event.preventDefault()
  })) : /* @__PURE__ */ React.createElement(ChevronIcon, {
    error,
    size
  });
}
SelectRightSection.displayName = "@mantine/core/SelectRightSection";

var __defProp$6 = Object.defineProperty;
var __defProps$5 = Object.defineProperties;
var __getOwnPropDescs$5 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$6 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$6.call(b, prop))
      __defNormalProp$6(a, prop, b[prop]);
  if (__getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(b)) {
      if (__propIsEnum$6.call(b, prop))
        __defNormalProp$6(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$5 = (a, b) => __defProps$5(a, __getOwnPropDescs$5(b));
var __objRest$5 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$6)
    for (var prop of __getOwnPropSymbols$6(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function getSelectRightSectionProps(_a) {
  var _b = _a, {
    styles,
    rightSection,
    rightSectionWidth,
    theme
  } = _b, props = __objRest$5(_b, [
    "styles",
    "rightSection",
    "rightSectionWidth",
    "theme"
  ]);
  if (rightSection) {
    return { rightSection, rightSectionWidth, styles };
  }
  const _styles = typeof styles === "function" ? styles(theme) : styles;
  return {
    rightSection: !props.readOnly && !(props.disabled && props.shouldClear) && /* @__PURE__ */ React.createElement(SelectRightSection, __spreadValues$6({}, props)),
    styles: __spreadProps$5(__spreadValues$6({}, _styles), {
      rightSection: __spreadProps$5(__spreadValues$6({}, _styles == null ? void 0 : _styles.rightSection), {
        pointerEvents: props.shouldClear ? void 0 : "none"
      })
    })
  };
}

var __defProp$5 = Object.defineProperty;
var __defProps$4 = Object.defineProperties;
var __getOwnPropDescs$4 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$5 = Object.getOwnPropertySymbols;
var __hasOwnProp$5 = Object.prototype.hasOwnProperty;
var __propIsEnum$5 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$5 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$5.call(b, prop))
      __defNormalProp$5(a, prop, b[prop]);
  if (__getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(b)) {
      if (__propIsEnum$5.call(b, prop))
        __defNormalProp$5(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$4 = (a, b) => __defProps$4(a, __getOwnPropDescs$4(b));
var __objRest$4 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$5.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$5)
    for (var prop of __getOwnPropSymbols$5(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$5.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$4 = {
  type: "text",
  size: "sm",
  __staticSelector: "TextInput"
};
const TextInput = React.forwardRef((props, ref) => {
  const _a = useInputProps("TextInput", defaultProps$4, props), { inputProps, wrapperProps } = _a, others = __objRest$4(_a, ["inputProps", "wrapperProps"]);
  return /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadValues$5({}, wrapperProps), /* @__PURE__ */ React.createElement(Input, __spreadProps$4(__spreadValues$5(__spreadValues$5({}, inputProps), others), {
    ref
  })));
});
TextInput.displayName = "@mantine/core/TextInput";

const TooltipGroupContext = React.createContext(false);
const TooltipGroupProvider = TooltipGroupContext.Provider;
const useTooltipGroupContext = () => React.useContext(TooltipGroupContext);

function TooltipGroup({ children, openDelay = 0, closeDelay = 0 }) {
  return /* @__PURE__ */ React.createElement(TooltipGroupProvider, {
    value: true
  }, /* @__PURE__ */ React.createElement(FloatingDelayGroup, {
    delay: { open: openDelay, close: closeDelay }
  }, children));
}
TooltipGroup.displayName = "@mantine/core/TooltipGroup";

var __defProp$4 = Object.defineProperty;
var __defProps$3 = Object.defineProperties;
var __getOwnPropDescs$3 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$4 = Object.getOwnPropertySymbols;
var __hasOwnProp$4 = Object.prototype.hasOwnProperty;
var __propIsEnum$4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$4.call(b, prop))
      __defNormalProp$4(a, prop, b[prop]);
  if (__getOwnPropSymbols$4)
    for (var prop of __getOwnPropSymbols$4(b)) {
      if (__propIsEnum$4.call(b, prop))
        __defNormalProp$4(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$3 = (a, b) => __defProps$3(a, __getOwnPropDescs$3(b));
function getColors(theme, color) {
  if (!color) {
    return {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[2] : theme.colors.gray[9],
      color: theme.colorScheme === "dark" ? theme.black : theme.white
    };
  }
  const colors = theme.fn.variant({ variant: "filled", color, primaryFallback: false });
  return {
    backgroundColor: colors.background,
    color: colors.color
  };
}
var useStyles$4 = createStyles((theme, { color, radius, width, multiline }) => ({
  tooltip: __spreadProps$3(__spreadValues$4(__spreadValues$4({}, theme.fn.fontStyles()), getColors(theme, color)), {
    lineHeight: theme.lineHeight,
    fontSize: theme.fontSizes.sm,
    borderRadius: theme.fn.radius(radius),
    padding: `calc(${theme.spacing.xs} / 2) ${theme.spacing.xs}`,
    position: "absolute",
    whiteSpace: multiline ? "unset" : "nowrap",
    pointerEvents: "none",
    width
  }),
  arrow: {
    backgroundColor: "inherit",
    border: 0,
    zIndex: 1
  }
}));

var useStyles$5 = useStyles$4;

const TOOLTIP_ERRORS = {
  children: "Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
};

function useFloatingTooltip({
  offset,
  position
}) {
  const [opened, setOpened] = React.useState(false);
  const boundaryRef = React.useRef();
  const { x, y, reference, floating, refs, update, placement } = useFloating({
    placement: position,
    middleware: [
      shift({
        crossAxis: true,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  });
  const horizontalOffset = placement.includes("right") ? offset : position.includes("left") ? offset * -1 : 0;
  const verticalOffset = placement.includes("bottom") ? offset : position.includes("top") ? offset * -1 : 0;
  const handleMouseMove = React.useCallback(({ clientX, clientY }) => {
    reference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          left: clientX + horizontalOffset,
          top: clientY + verticalOffset,
          right: clientX,
          bottom: clientY
        };
      }
    });
  }, [reference]);
  React.useEffect(() => {
    if (refs.floating.current) {
      const boundary = boundaryRef.current;
      boundary.addEventListener("mousemove", handleMouseMove);
      const parents = getOverflowAncestors(refs.floating.current);
      parents.forEach((parent) => {
        parent.addEventListener("scroll", update);
      });
      return () => {
        boundary.removeEventListener("mousemove", handleMouseMove);
        parents.forEach((parent) => {
          parent.removeEventListener("scroll", update);
        });
      };
    }
    return void 0;
  }, [reference, refs.floating.current, update, handleMouseMove, opened]);
  return { handleMouseMove, x, y, opened, setOpened, boundaryRef, floating };
}

var __defProp$3 = Object.defineProperty;
var __defProps$2 = Object.defineProperties;
var __getOwnPropDescs$2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$3 = Object.getOwnPropertySymbols;
var __hasOwnProp$3 = Object.prototype.hasOwnProperty;
var __propIsEnum$3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$3.call(b, prop))
      __defNormalProp$3(a, prop, b[prop]);
  if (__getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(b)) {
      if (__propIsEnum$3.call(b, prop))
        __defNormalProp$3(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$2 = (a, b) => __defProps$2(a, __getOwnPropDescs$2(b));
var __objRest$3 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$3.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$3)
    for (var prop of __getOwnPropSymbols$3(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$3.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$3 = {
  refProp: "ref",
  withinPortal: true,
  offset: 10,
  position: "right",
  zIndex: getDefaultZIndex("popover")
};
function TooltipFloating(props) {
  var _b;
  const _a = useComponentDefaultProps("TooltipFloating", defaultProps$3, props), {
    children,
    refProp,
    withinPortal,
    portalProps,
    style,
    className,
    classNames,
    styles,
    unstyled,
    radius,
    color,
    label,
    offset,
    position,
    multiline,
    width,
    zIndex,
    disabled,
    variant
  } = _a, others = __objRest$3(_a, [
    "children",
    "refProp",
    "withinPortal",
    "portalProps",
    "style",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "radius",
    "color",
    "label",
    "offset",
    "position",
    "multiline",
    "width",
    "zIndex",
    "disabled",
    "variant"
  ]);
  const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip({
    offset,
    position
  });
  const { classes, cx } = useStyles$5({ radius, color, multiline, width }, { name: "TooltipFloating", classNames, styles, unstyled, variant });
  if (!isElement$2(children)) {
    throw new Error(TOOLTIP_ERRORS.children);
  }
  const targetRef = useMergedRef(boundaryRef, children.ref);
  const onMouseEnter = (event) => {
    var _a2, _b2;
    (_b2 = (_a2 = children.props).onMouseEnter) == null ? void 0 : _b2.call(_a2, event);
    handleMouseMove(event);
    setOpened(true);
  };
  const onMouseLeave = (event) => {
    var _a2, _b2;
    (_b2 = (_a2 = children.props).onMouseLeave) == null ? void 0 : _b2.call(_a2, event);
    setOpened(false);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OptionalPortal, __spreadProps$2(__spreadValues$3({}, portalProps), {
    withinPortal
  }), /* @__PURE__ */ React.createElement(Box, __spreadProps$2(__spreadValues$3({}, others), {
    ref: floating,
    className: cx(classes.tooltip, className),
    style: __spreadProps$2(__spreadValues$3({}, style), {
      zIndex,
      display: !disabled && opened ? "block" : "none",
      top: y != null ? y : "",
      left: (_b = Math.round(x)) != null ? _b : ""
    })
  }), label)), React.cloneElement(children, __spreadProps$2(__spreadValues$3({}, children.props), {
    [refProp]: targetRef,
    onMouseEnter,
    onMouseLeave
  })));
}
TooltipFloating.displayName = "@mantine/core/TooltipFloating";

function useTooltip(settings) {
  const [uncontrolledOpened, setUncontrolledOpened] = React.useState(false);
  const controlled = typeof settings.opened === "boolean";
  const opened = controlled ? settings.opened : uncontrolledOpened;
  const withinGroup = useTooltipGroupContext();
  const uid = useId$1();
  const { delay: groupDelay, currentId, setCurrentId } = useDelayGroupContext();
  const onChange = React.useCallback((_opened) => {
    setUncontrolledOpened(_opened);
    if (_opened) {
      setCurrentId(uid);
    }
  }, [setCurrentId, uid]);
  const {
    x,
    y,
    reference,
    floating,
    context,
    refs,
    update,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = useFloating({
    placement: settings.position,
    open: opened,
    onOpenChange: onChange,
    middleware: [
      offset(settings.offset),
      shift({ padding: 8 }),
      flip(),
      arrow({ element: settings.arrowRef, padding: settings.arrowOffset }),
      ...settings.inline ? [inline()] : []
    ]
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: settings.events.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !settings.events.touch
    }),
    useFocus(context, { enabled: settings.events.focus, keyboardOnly: true }),
    useRole(context, { role: "tooltip" }),
    useDismiss(context, { enabled: typeof settings.opened === void 0 }),
    useDelayGroup(context, { id: uid })
  ]);
  useFloatingAutoUpdate({
    opened,
    position: settings.position,
    positionDependencies: settings.positionDependencies,
    floating: { refs, update }
  });
  useDidUpdate(() => {
    var _a;
    (_a = settings.onPositionChange) == null ? void 0 : _a.call(settings, placement);
  }, [placement]);
  const isGroupPhase = opened && currentId && currentId !== uid;
  return {
    x,
    y,
    arrowX,
    arrowY,
    reference,
    floating,
    getFloatingProps,
    getReferenceProps,
    isGroupPhase,
    opened,
    placement
  };
}

var __defProp$2 = Object.defineProperty;
var __defProps$1 = Object.defineProperties;
var __getOwnPropDescs$1 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$2 = Object.getOwnPropertySymbols;
var __hasOwnProp$2 = Object.prototype.hasOwnProperty;
var __propIsEnum$2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$2.call(b, prop))
      __defNormalProp$2(a, prop, b[prop]);
  if (__getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(b)) {
      if (__propIsEnum$2.call(b, prop))
        __defNormalProp$2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps$1 = (a, b) => __defProps$1(a, __getOwnPropDescs$1(b));
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$2.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$2)
    for (var prop of __getOwnPropSymbols$2(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$2.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps$2 = {
  position: "top",
  refProp: "ref",
  withinPortal: false,
  inline: false,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  width: "auto",
  events: { hover: true, focus: false, touch: false },
  zIndex: getDefaultZIndex("popover"),
  positionDependencies: []
};
const _Tooltip = React.forwardRef((props, ref) => {
  var _b;
  const arrowRef = React.useRef(null);
  const _a = useComponentDefaultProps("Tooltip", defaultProps$2, props), {
    children,
    position,
    refProp,
    label,
    openDelay,
    closeDelay,
    onPositionChange,
    opened,
    withinPortal,
    portalProps,
    radius,
    color,
    classNames,
    styles,
    unstyled,
    style,
    className,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    offset,
    transitionProps,
    multiline,
    width,
    events,
    zIndex,
    disabled,
    positionDependencies,
    onClick,
    onMouseEnter,
    onMouseLeave,
    inline,
    variant,
    keepMounted
  } = _a, others = __objRest$2(_a, [
    "children",
    "position",
    "refProp",
    "label",
    "openDelay",
    "closeDelay",
    "onPositionChange",
    "opened",
    "withinPortal",
    "portalProps",
    "radius",
    "color",
    "classNames",
    "styles",
    "unstyled",
    "style",
    "className",
    "withArrow",
    "arrowSize",
    "arrowOffset",
    "arrowRadius",
    "arrowPosition",
    "offset",
    "transitionProps",
    "multiline",
    "width",
    "events",
    "zIndex",
    "disabled",
    "positionDependencies",
    "onClick",
    "onMouseEnter",
    "onMouseLeave",
    "inline",
    "variant",
    "keepMounted"
  ]);
  const { classes, cx, theme } = useStyles$5({ radius, color, width, multiline }, { name: "Tooltip", classNames, styles, unstyled, variant });
  const tooltip = useTooltip({
    position: getFloatingPosition(theme.dir, position),
    closeDelay,
    openDelay,
    onPositionChange,
    opened,
    events,
    arrowRef,
    arrowOffset,
    offset: offset + (withArrow ? arrowSize / 2 : 0),
    positionDependencies: [...positionDependencies, children],
    inline
  });
  if (!isElement$2(children)) {
    throw new Error(TOOLTIP_ERRORS.children);
  }
  const targetRef = useMergedRef(tooltip.reference, children.ref, ref);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(OptionalPortal, __spreadProps$1(__spreadValues$2({}, portalProps), {
    withinPortal
  }), /* @__PURE__ */ React.createElement(Transition, __spreadProps$1(__spreadValues$2({
    keepMounted,
    mounted: !disabled && tooltip.opened
  }, transitionProps), {
    transition: transitionProps.transition || "fade",
    duration: tooltip.isGroupPhase ? 10 : (_b = transitionProps.duration) != null ? _b : 100
  }), (transitionStyles) => {
    var _a2, _b2;
    return /* @__PURE__ */ React.createElement(Box, __spreadValues$2(__spreadValues$2({}, others), tooltip.getFloatingProps({
      ref: tooltip.floating,
      className: classes.tooltip,
      style: __spreadProps$1(__spreadValues$2(__spreadValues$2({}, style), transitionStyles), {
        zIndex,
        top: (_a2 = tooltip.y) != null ? _a2 : 0,
        left: (_b2 = tooltip.x) != null ? _b2 : 0
      })
    })), label, /* @__PURE__ */ React.createElement(FloatingArrow, {
      ref: arrowRef,
      arrowX: tooltip.arrowX,
      arrowY: tooltip.arrowY,
      visible: withArrow,
      position: tooltip.placement,
      arrowSize,
      arrowOffset,
      arrowRadius,
      arrowPosition,
      className: classes.arrow
    }));
  })), React.cloneElement(children, tooltip.getReferenceProps(__spreadValues$2({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onMouseMove: props.onMouseMove,
    onPointerDown: props.onPointerDown,
    onPointerEnter: props.onPointerEnter,
    [refProp]: targetRef,
    className: cx(className, children.props.className)
  }, children.props))));
});
_Tooltip.Group = TooltipGroup;
_Tooltip.Floating = TooltipFloating;
_Tooltip.displayName = "@mantine/core/Tooltip";
const Tooltip = _Tooltip;

function filterData({
  data,
  searchable,
  limit,
  searchValue,
  filter,
  value,
  filterDataOnExactSearchMatch
}) {
  if (!searchable) {
    return data;
  }
  const selected = value != null ? data.find((item) => item.value === value) || null : null;
  if (selected && !filterDataOnExactSearchMatch && (selected == null ? void 0 : selected.label) === searchValue) {
    if (limit) {
      if (limit >= data.length) {
        return data;
      }
      const firstIndex = data.indexOf(selected);
      const lastIndex = firstIndex + limit;
      const firstIndexOffset = lastIndex - data.length;
      if (firstIndexOffset > 0) {
        return data.slice(firstIndex - firstIndexOffset);
      }
      return data.slice(firstIndex, lastIndex);
    }
    return data;
  }
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    if (filter(searchValue, data[i])) {
      result.push(data[i]);
    }
    if (result.length >= limit) {
      break;
    }
  }
  return result;
}

var useStyles$2 = createStyles(() => ({
  input: {
    "&:not(:disabled)": {
      cursor: "pointer",
      "&::selection": {
        backgroundColor: "transparent"
      }
    }
  }
}));

var useStyles$3 = useStyles$2;

var __defProp$1 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues$1 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp$1.call(b, prop))
      __defNormalProp$1(a, prop, b[prop]);
  if (__getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(b)) {
      if (__propIsEnum$1.call(b, prop))
        __defNormalProp$1(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest$1 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$1.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$1)
    for (var prop of __getOwnPropSymbols$1(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$1.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function defaultFilter(value, item) {
  return item.label.toLowerCase().trim().includes(value.toLowerCase().trim());
}
function defaultShouldCreate(query, data) {
  return !!query && !data.some((item) => item.label.toLowerCase() === query.toLowerCase());
}
const defaultProps$1 = {
  required: false,
  size: "sm",
  shadow: "sm",
  itemComponent: DefaultItem,
  transitionProps: { transition: "fade", duration: 0 },
  initiallyOpened: false,
  filter: defaultFilter,
  maxDropdownHeight: 220,
  searchable: false,
  clearable: false,
  limit: Infinity,
  disabled: false,
  creatable: false,
  shouldCreate: defaultShouldCreate,
  selectOnBlur: false,
  switchDirectionOnFlip: false,
  filterDataOnExactSearchMatch: false,
  zIndex: getDefaultZIndex("popover"),
  positionDependencies: [],
  dropdownPosition: "flip"
};
const Select = React.forwardRef((props, ref) => {
  const _a = useInputProps("Select", defaultProps$1, props), {
    inputProps,
    wrapperProps,
    shadow,
    data,
    value,
    defaultValue,
    onChange,
    itemComponent,
    onKeyDown,
    onBlur,
    onFocus,
    transitionProps,
    initiallyOpened,
    unstyled,
    classNames,
    styles,
    filter,
    maxDropdownHeight,
    searchable,
    clearable,
    nothingFound,
    limit,
    disabled,
    onSearchChange,
    searchValue,
    rightSection,
    rightSectionWidth,
    creatable,
    getCreateLabel,
    shouldCreate,
    selectOnBlur,
    onCreate,
    dropdownComponent,
    onDropdownClose,
    onDropdownOpen,
    withinPortal,
    portalProps,
    switchDirectionOnFlip,
    zIndex,
    name,
    dropdownPosition,
    allowDeselect,
    placeholder,
    filterDataOnExactSearchMatch,
    form,
    positionDependencies,
    readOnly,
    clearButtonProps,
    hoverOnSearchChange
  } = _a, others = __objRest$1(_a, [
    "inputProps",
    "wrapperProps",
    "shadow",
    "data",
    "value",
    "defaultValue",
    "onChange",
    "itemComponent",
    "onKeyDown",
    "onBlur",
    "onFocus",
    "transitionProps",
    "initiallyOpened",
    "unstyled",
    "classNames",
    "styles",
    "filter",
    "maxDropdownHeight",
    "searchable",
    "clearable",
    "nothingFound",
    "limit",
    "disabled",
    "onSearchChange",
    "searchValue",
    "rightSection",
    "rightSectionWidth",
    "creatable",
    "getCreateLabel",
    "shouldCreate",
    "selectOnBlur",
    "onCreate",
    "dropdownComponent",
    "onDropdownClose",
    "onDropdownOpen",
    "withinPortal",
    "portalProps",
    "switchDirectionOnFlip",
    "zIndex",
    "name",
    "dropdownPosition",
    "allowDeselect",
    "placeholder",
    "filterDataOnExactSearchMatch",
    "form",
    "positionDependencies",
    "readOnly",
    "clearButtonProps",
    "hoverOnSearchChange"
  ]);
  const { classes, cx, theme } = useStyles$3();
  const [dropdownOpened, _setDropdownOpened] = React.useState(initiallyOpened);
  const [hovered, setHovered] = React.useState(-1);
  const inputRef = React.useRef();
  const itemsRefs = React.useRef({});
  const [direction, setDirection] = React.useState("column");
  const isColumn = direction === "column";
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
    duration: 0,
    offset: 5,
    cancelable: false,
    isList: true
  });
  const isDeselectable = allowDeselect === void 0 ? clearable : allowDeselect;
  const setDropdownOpened = (opened) => {
    if (dropdownOpened !== opened) {
      _setDropdownOpened(opened);
      const handler = opened ? onDropdownOpen : onDropdownClose;
      typeof handler === "function" && handler();
    }
  };
  const isCreatable = creatable && typeof getCreateLabel === "function";
  let createLabel = null;
  const formattedData = data.map((item) => typeof item === "string" ? { label: item, value: item } : item);
  const sortedData = groupOptions({ data: formattedData });
  const [_value, handleChange, controlled] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const selectedValue = sortedData.find((item) => item.value === _value);
  const [inputValue, setInputValue] = useUncontrolled({
    value: searchValue,
    defaultValue: (selectedValue == null ? void 0 : selectedValue.label) || "",
    finalValue: void 0,
    onChange: onSearchChange
  });
  const handleSearchChange = (val) => {
    setInputValue(val);
    if (searchable && typeof onSearchChange === "function") {
      onSearchChange(val);
    }
  };
  const handleClear = () => {
    var _a2;
    if (!readOnly) {
      handleChange(null);
      if (!controlled) {
        handleSearchChange("");
      }
      (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
    }
  };
  React.useEffect(() => {
    const newSelectedValue = sortedData.find((item) => item.value === _value);
    if (newSelectedValue) {
      handleSearchChange(newSelectedValue.label);
    } else if (!isCreatable || !_value) {
      handleSearchChange("");
    }
  }, [_value]);
  React.useEffect(() => {
    if (selectedValue && (!searchable || !dropdownOpened)) {
      handleSearchChange(selectedValue.label);
    }
  }, [selectedValue == null ? void 0 : selectedValue.label]);
  const handleItemSelect = (item) => {
    if (!readOnly) {
      if (isDeselectable && (selectedValue == null ? void 0 : selectedValue.value) === item.value) {
        handleChange(null);
        setDropdownOpened(false);
      } else {
        if (item.creatable && typeof onCreate === "function") {
          const createdItem = onCreate(item.value);
          if (typeof createdItem !== "undefined" && createdItem !== null) {
            if (typeof createdItem === "string") {
              handleChange(createdItem);
            } else {
              handleChange(createdItem.value);
            }
          }
        } else {
          handleChange(item.value);
        }
        if (!controlled) {
          handleSearchChange(item.label);
        }
        setHovered(-1);
        setDropdownOpened(false);
        inputRef.current.focus();
      }
    }
  };
  const filteredData = filterData({
    data: sortedData,
    searchable,
    limit,
    searchValue: inputValue,
    filter,
    filterDataOnExactSearchMatch,
    value: _value
  });
  if (isCreatable && shouldCreate(inputValue, filteredData)) {
    createLabel = getCreateLabel(inputValue);
    filteredData.push({ label: inputValue, value: inputValue, creatable: true });
  }
  const getNextIndex = (index, nextItem, compareFn) => {
    let i = index;
    while (compareFn(i)) {
      i = nextItem(i);
      if (!filteredData[i].disabled)
        return i;
    }
    return index;
  };
  useDidUpdate(() => {
    if (hoverOnSearchChange && inputValue) {
      setHovered(0);
    } else {
      setHovered(-1);
    }
  }, [inputValue, hoverOnSearchChange]);
  const selectedItemIndex = _value ? filteredData.findIndex((el) => el.value === _value) : 0;
  const shouldShowDropdown = !readOnly && (filteredData.length > 0 ? dropdownOpened : dropdownOpened && !!nothingFound);
  const handlePrevious = () => {
    setHovered((current) => {
      var _a2;
      const nextIndex = getNextIndex(current, (index) => index - 1, (index) => index > 0);
      targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
      shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "start" : "end" });
      return nextIndex;
    });
  };
  const handleNext = () => {
    setHovered((current) => {
      var _a2;
      const nextIndex = getNextIndex(current, (index) => index + 1, (index) => index < filteredData.length - 1);
      targetRef.current = itemsRefs.current[(_a2 = filteredData[nextIndex]) == null ? void 0 : _a2.value];
      shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "end" : "start" });
      return nextIndex;
    });
  };
  const scrollSelectedItemIntoView = () => window.setTimeout(() => {
    var _a2;
    targetRef.current = itemsRefs.current[(_a2 = filteredData[selectedItemIndex]) == null ? void 0 : _a2.value];
    scrollIntoView({ alignment: isColumn ? "end" : "start" });
  }, 0);
  useDidUpdate(() => {
    if (shouldShowDropdown)
      scrollSelectedItemIntoView();
  }, [shouldShowDropdown]);
  const handleInputKeydown = (event) => {
    typeof onKeyDown === "function" && onKeyDown(event);
    switch (event.key) {
      case "ArrowUp": {
        event.preventDefault();
        if (!dropdownOpened) {
          setHovered(selectedItemIndex);
          setDropdownOpened(true);
          scrollSelectedItemIntoView();
        } else {
          isColumn ? handlePrevious() : handleNext();
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (!dropdownOpened) {
          setHovered(selectedItemIndex);
          setDropdownOpened(true);
          scrollSelectedItemIntoView();
        } else {
          isColumn ? handleNext() : handlePrevious();
        }
        break;
      }
      case "Home": {
        if (!searchable) {
          event.preventDefault();
          if (!dropdownOpened) {
            setDropdownOpened(true);
          }
          const firstItemIndex = filteredData.findIndex((item) => !item.disabled);
          setHovered(firstItemIndex);
          shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "end" : "start" });
        }
        break;
      }
      case "End": {
        if (!searchable) {
          event.preventDefault();
          if (!dropdownOpened) {
            setDropdownOpened(true);
          }
          const lastItemIndex = filteredData.map((item) => !!item.disabled).lastIndexOf(false);
          setHovered(lastItemIndex);
          shouldShowDropdown && scrollIntoView({ alignment: isColumn ? "end" : "start" });
        }
        break;
      }
      case "Escape": {
        event.preventDefault();
        setDropdownOpened(false);
        setHovered(-1);
        break;
      }
      case " ": {
        if (!searchable) {
          event.preventDefault();
          if (filteredData[hovered] && dropdownOpened) {
            handleItemSelect(filteredData[hovered]);
          } else {
            setDropdownOpened(true);
            setHovered(selectedItemIndex);
            scrollSelectedItemIntoView();
          }
        }
        break;
      }
      case "Enter": {
        if (!searchable) {
          event.preventDefault();
        }
        if (filteredData[hovered] && dropdownOpened) {
          event.preventDefault();
          handleItemSelect(filteredData[hovered]);
        }
      }
    }
  };
  const handleInputBlur = (event) => {
    typeof onBlur === "function" && onBlur(event);
    const selected = sortedData.find((item) => item.value === _value);
    if (selectOnBlur && filteredData[hovered] && dropdownOpened) {
      handleItemSelect(filteredData[hovered]);
    }
    handleSearchChange((selected == null ? void 0 : selected.label) || "");
    setDropdownOpened(false);
  };
  const handleInputFocus = (event) => {
    typeof onFocus === "function" && onFocus(event);
    if (searchable) {
      setDropdownOpened(true);
    }
  };
  const handleInputChange = (event) => {
    if (!readOnly) {
      handleSearchChange(event.currentTarget.value);
      if (clearable && event.currentTarget.value === "") {
        handleChange(null);
      }
      setHovered(-1);
      setDropdownOpened(true);
    }
  };
  const handleInputClick = () => {
    if (!readOnly) {
      setDropdownOpened(!dropdownOpened);
      if (_value && !dropdownOpened) {
        setHovered(selectedItemIndex);
      }
    }
  };
  return /* @__PURE__ */ React.createElement(Input.Wrapper, __spreadProps(__spreadValues$1({}, wrapperProps), {
    __staticSelector: "Select"
  }), /* @__PURE__ */ React.createElement(SelectPopover, {
    opened: shouldShowDropdown,
    transitionProps,
    shadow,
    withinPortal,
    portalProps,
    __staticSelector: "Select",
    onDirectionChange: setDirection,
    switchDirectionOnFlip,
    zIndex,
    dropdownPosition,
    positionDependencies: [...positionDependencies, inputValue],
    classNames,
    styles,
    unstyled,
    variant: inputProps.variant
  }, /* @__PURE__ */ React.createElement(SelectPopover.Target, null, /* @__PURE__ */ React.createElement("div", {
    role: "combobox",
    "aria-haspopup": "listbox",
    "aria-owns": shouldShowDropdown ? `${inputProps.id}-items` : null,
    "aria-controls": inputProps.id,
    "aria-expanded": shouldShowDropdown,
    onMouseLeave: () => setHovered(-1),
    tabIndex: -1
  }, /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    name,
    value: _value || "",
    form,
    disabled
  }), /* @__PURE__ */ React.createElement(Input, __spreadValues$1(__spreadProps(__spreadValues$1(__spreadValues$1({
    autoComplete: "off",
    type: "search"
  }, inputProps), others), {
    ref: useMergedRef(ref, inputRef),
    onKeyDown: handleInputKeydown,
    __staticSelector: "Select",
    value: inputValue,
    placeholder,
    onChange: handleInputChange,
    "aria-autocomplete": "list",
    "aria-controls": shouldShowDropdown ? `${inputProps.id}-items` : null,
    "aria-activedescendant": hovered >= 0 ? `${inputProps.id}-${hovered}` : null,
    onMouseDown: handleInputClick,
    onBlur: handleInputBlur,
    onFocus: handleInputFocus,
    readOnly: !searchable || readOnly,
    disabled,
    "data-mantine-stop-propagation": shouldShowDropdown,
    name: null,
    classNames: __spreadProps(__spreadValues$1({}, classNames), {
      input: cx({ [classes.input]: !searchable }, classNames == null ? void 0 : classNames.input)
    })
  }), getSelectRightSectionProps({
    theme,
    rightSection,
    rightSectionWidth,
    styles,
    size: inputProps.size,
    shouldClear: clearable && !!selectedValue,
    onClear: handleClear,
    error: wrapperProps.error,
    clearButtonProps,
    disabled,
    readOnly
  }))))), /* @__PURE__ */ React.createElement(SelectPopover.Dropdown, {
    component: dropdownComponent || SelectScrollArea,
    maxHeight: maxDropdownHeight,
    direction,
    id: inputProps.id,
    innerRef: scrollableRef,
    __staticSelector: "Select",
    classNames,
    styles
  }, /* @__PURE__ */ React.createElement(SelectItems, {
    data: filteredData,
    hovered,
    classNames,
    styles,
    isItemSelected: (val) => val === _value,
    uuid: inputProps.id,
    __staticSelector: "Select",
    onItemHover: setHovered,
    onItemSelect: handleItemSelect,
    itemsRefs,
    itemComponent,
    size: inputProps.size,
    nothingFound,
    creatable: isCreatable && !!createLabel,
    createLabel,
    "aria-label": wrapperProps.label,
    unstyled,
    variant: inputProps.variant
  }))));
});
Select.displayName = "@mantine/core/Select";

var useStyles = createStyles((theme, { spacing, align, justify }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: align,
    justifyContent: justify,
    gap: getSize({ size: spacing, sizes: theme.spacing })
  }
}));

var useStyles$1 = useStyles;

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const defaultProps = {
  spacing: "md",
  align: "stretch",
  justify: "flex-start"
};
const Stack = React.forwardRef((props, ref) => {
  const _a = useComponentDefaultProps("Stack", defaultProps, props), { spacing, className, align, justify, unstyled, variant } = _a, others = __objRest(_a, ["spacing", "className", "align", "justify", "unstyled", "variant"]);
  const { classes, cx } = useStyles$1({ spacing, align, justify }, { name: "Stack", unstyled, variant });
  return /* @__PURE__ */ React.createElement(Box, __spreadValues({
    className: cx(classes.root, className),
    ref
  }, others));
});
Stack.displayName = "@mantine/core/Stack";

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React.createContext && React.createContext(DefaultContext);

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return React.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  // eslint-disable-next-line react/display-name
  return function (props) {
    return React.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function (conf) {
    var attr = props.attr,
      size = props.size,
      title = props.title,
      svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? React.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function BsSearch (props) {
  return GenIcon({"tag":"svg","attr":{"fill":"currentColor","viewBox":"0 0 16 16"},"child":[{"tag":"path","attr":{"d":"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"}}]})(props);
}function BsTriangleFill (props) {
  return GenIcon({"tag":"svg","attr":{"fill":"currentColor","viewBox":"0 0 16 16"},"child":[{"tag":"path","attr":{"fillRule":"evenodd","d":"M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"}}]})(props);
}

// THIS FILE IS AUTO GENERATED
function TbTableExport (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24","strokeWidth":"2","stroke":"currentColor","fill":"none","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"path","attr":{"stroke":"none","d":"M0 0h24v24H0z","fill":"none"}},{"tag":"path","attr":{"d":"M11.5 20h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v7.5m-16 -3.5h16m-10 -6v16m4 -1h7m-3 -3l3 3l-3 3"}}]})(props);
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
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


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
    } // Execute `callback` and update the `lastExec` timestamp.


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

  wrapper.cancel = cancel; // Return the wrapper function.

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

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var DEBOUNCE_INPUT_TIME_MS = 500;
var ascendingDeselectedCss = "production" === "production" ? {
  name: "78bnu",
  styles: "color:#adb5bd"
} : {
  name: "4v8zjr-ascendingDeselectedCss",
  styles: "color:#adb5bd;label:ascendingDeselectedCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQmtDIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAgJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ3ByZWFjdC9jb21wYXQnO1xuXG5pbXBvcnQgeyBjc3MsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSB1c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSB1c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gdXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3tjb2xvcnM6IHsnc2t5aHl2ZSc6IFsnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZiddfSwgcHJpbWFyeUNvbG9yOiAnc2t5aHl2ZSd9fVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var ascendingSelectedCss = "production" === "production" ? {
  name: "8plhbe",
  styles: "color:#212529"
} : {
  name: "bcuvqf-ascendingSelectedCss",
  styles: "color:#212529;label:ascendingSelectedCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQmdDIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAgJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ3ByZWFjdC9jb21wYXQnO1xuXG5pbXBvcnQgeyBjc3MsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSB1c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSB1c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gdXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3tjb2xvcnM6IHsnc2t5aHl2ZSc6IFsnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZiddfSwgcHJpbWFyeUNvbG9yOiAnc2t5aHl2ZSd9fVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var descendingDeselectedCss = "production" === "production" ? {
  name: "158jpac",
  styles: "color:#adb5bd;transform:rotate(180deg)"
} : {
  name: "6noqhr-descendingDeselectedCss",
  styles: "color:#adb5bd;transform:rotate(180deg);label:descendingDeselectedCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1Qm1DIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAgJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ3ByZWFjdC9jb21wYXQnO1xuXG5pbXBvcnQgeyBjc3MsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSB1c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSB1c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gdXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3tjb2xvcnM6IHsnc2t5aHl2ZSc6IFsnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZiddfSwgcHJpbWFyeUNvbG9yOiAnc2t5aHl2ZSd9fVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var descendingSelectedCss = "production" === "production" ? {
  name: "kkbkm2",
  styles: "color:#212529;transform:rotate(180deg)"
} : {
  name: "iapqj6-descendingSelectedCss",
  styles: "color:#212529;transform:rotate(180deg);label:descendingSelectedCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQmlDIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAgJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ3ByZWFjdC9jb21wYXQnO1xuXG5pbXBvcnQgeyBjc3MsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSB1c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSB1c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gdXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3tjb2xvcnM6IHsnc2t5aHl2ZSc6IFsnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZiddfSwgcHJpbWFyeUNvbG9yOiAnc2t5aHl2ZSd9fVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var tableCss = "production" === "production" ? {
  name: "1mt90qs",
  styles: "width:100%;max-width:100%;margin-bottom:1rem;color:#dee2e6;background-color:#212529;th,td{padding:0.75rem;vertical-align:top;border-top:1px solid #495057;}thead th{vertical-align:bottom;border-bottom:2px solid #495057;}tbody+tbody{border-top:2px solid #495057;}tbody tr:nth-of-type(even){background-color:#2c3034;}"
} : {
  name: "ulanqb-tableCss",
  styles: "width:100%;max-width:100%;margin-bottom:1rem;color:#dee2e6;background-color:#212529;th,td{padding:0.75rem;vertical-align:top;border-top:1px solid #495057;}thead th{vertical-align:bottom;border-bottom:2px solid #495057;}tbody+tbody{border-top:2px solid #495057;}tbody tr:nth-of-type(even){background-color:#2c3034;};label:tableCss;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQm9CIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAgJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ3ByZWFjdC9jb21wYXQnO1xuXG5pbXBvcnQgeyBjc3MsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSB1c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSB1c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gdXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3tjb2xvcnM6IHsnc2t5aHl2ZSc6IFsnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZiddfSwgcHJpbWFyeUNvbG9yOiAnc2t5aHl2ZSd9fVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var _ref2 = "production" === "production" ? {
  name: "1fmgkpl",
  styles: "min-width:150px"
} : {
  name: "5mc5hw-TableControl",
  styles: "min-width:150px;label:TableControl;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1UGdCIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAgJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ3ByZWFjdC9jb21wYXQnO1xuXG5pbXBvcnQgeyBjc3MsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSB1c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSB1c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gdXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3tjb2xvcnM6IHsnc2t5aHl2ZSc6IFsnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZiddfSwgcHJpbWFyeUNvbG9yOiAnc2t5aHl2ZSd9fVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var TableControl = function TableControl(_ref3) {
  var exportTable = _ref3.exportTable,
    numRecords = _ref3.numRecords;
    _ref3.sortFields;
    _ref3.setSortFields;
    var search = _ref3.search,
    setSearch = _ref3.setSearch,
    page = _ref3.page,
    setPage = _ref3.setPage,
    pageLength = _ref3.pageLength,
    setPageLength = _ref3.setPageLength,
    pageLengthChoices = _ref3.pageLengthChoices,
    pageCount = _ref3.pageCount,
    debounceTime = _ref3.debounceTime;
  var _useState = hooks.useState(search.global),
    _useState2 = _slicedToArray(_useState, 2),
    searchInput = _useState2[0],
    setSearchInput = _useState2[1];
  hooks.useEffect(function () {
    var debounceFunc = debounce(debounceTime !== null && debounceTime !== void 0 ? debounceTime : DEBOUNCE_INPUT_TIME_MS, function () {
      setSearch(_objectSpread2(_objectSpread2({}, search), {}, {
        global: searchInput
      }));
    }, {
      atBegin: false
    });
    debounceFunc();
    return function () {
      debounceFunc.cancel();
    };
  }, [searchInput]);
  function _setPageLength(pageLength) {
    var firstEntry = (page - 1) * pageLength + 1;
    var firstEntryPage = Math.ceil(firstEntry / pageLength);
    setPage(firstEntryPage);
    setPageLength(pageLength);
  }
  var pageLengthOptions = [];
  var addNextPageOption = true;
  for (var i = 0; i < pageLengthChoices.length; i++) {
    var _pageLength = pageLengthChoices[i];
    switch (_pageLength < numRecords) {
      case true:
        pageLengthOptions.push({
          value: _pageLength.toString(),
          label: _pageLength.toString()
        });
        break;
      case false:
        pageLengthOptions.push({
          value: numRecords.toString(),
          label: 'ALL'
        });
        addNextPageOption = false;
        break;
    }
    if (!addNextPageOption) {
      break;
    }
  }
  var paginationButtons = [];
  switch (page <= 4) {
    case false:
      paginationButtons.push(preact.h(Button, {
        key: "<<",
        onClick: function onClick() {
          return setPage(1);
        }
      }, preact.h("b", null, String.fromCharCode(60) + String.fromCharCode(60))));
      break;
    case true:
      paginationButtons.push(preact.h(Button, {
        key: "<<",
        disabled: true,
        onClick: function onClick() {},
        styles: {
          root: {
            visibility: 'hidden'
          }
        }
      }, preact.h("b", null, String.fromCharCode(60) + String.fromCharCode(60))));
      break;
  }
  var _loop = function _loop(_i) {
    switch (_i < 1) {
      case true:
        paginationButtons.push(preact.h(Button, {
          key: _i,
          onClick: function onClick() {
            return setPage(_i);
          },
          styles: {
            root: {
              visibility: 'hidden'
            }
          }
        }, preact.h("b", null, _i)));
        break;
      case false:
        paginationButtons.push(preact.h(Button, {
          key: _i,
          onClick: function onClick() {
            return setPage(_i);
          }
        }, preact.h("b", null, _i)));
        break;
    }
  };
  for (var _i = page - 3; _i < page; _i++) {
    _loop(_i);
  }
  paginationButtons.push(preact.h(Button, {
    key: page
  }, preact.h("b", null, "Page " + page + " of " + pageCount)));
  var _loop2 = function _loop2(_i2) {
    switch (_i2 > pageCount) {
      case true:
        paginationButtons.push(preact.h(Button, {
          key: _i2,
          onClick: function onClick() {
            return setPage(_i2);
          },
          styles: {
            root: {
              visibility: 'hidden'
            }
          }
        }, preact.h("b", null, _i2)));
        break;
      case false:
        paginationButtons.push(preact.h(Button, {
          key: _i2,
          onClick: function onClick() {
            return setPage(_i2);
          }
        }, preact.h("b", null, _i2)));
    }
  };
  for (var _i2 = page + 1; _i2 < page + 4; _i2++) {
    _loop2(_i2);
  }
  switch (page + 4 > pageCount) {
    case false:
      paginationButtons.push(preact.h(Button, {
        key: ">>",
        onClick: function onClick() {
          return setPage(pageCount);
        }
      }, preact.h("b", null, String.fromCharCode(62) + String.fromCharCode(62))));
      break;
    case true:
      paginationButtons.push(preact.h(Button, {
        key: ">>",
        disabled: true,
        onClick: function onClick() {},
        styles: {
          root: {
            visibility: 'hidden'
          }
        }
      }, preact.h("b", null, String.fromCharCode(62) + String.fromCharCode(62))));
      break;
  }
  return preact.h(Flex, {
    align: "top",
    gap: "xs"
  }, preact.h(Tooltip, {
    label: "Export Data as CSV"
  }, preact.h(Button, {
    leftIcon: preact.h(TbTableExport, null),
    onClick: function onClick(event) {
      return exportTable();
    }
  })), preact.h(Select, {
    label: "Page Length",
    value: pageLengthOptions.map(function (x, i) {
      return parseInt(x.value);
    }).includes(parseInt(pageLength)) ? pageLength.toString() : pageLengthOptions[0].value.toString(),
    onChange: function onChange(value) {
      return _setPageLength(parseInt(value));
    },
    data: pageLengthOptions
  }), preact.h(Flex, {
    gap: "xs"
  }, paginationButtons), preact.h(Flex, {
    align: "center",
    gap: "xs",
    css: _ref2
  }, preact.h(BsSearch, null), preact.h(TextInput, {
    value: searchInput,
    onChange: function onChange(event) {
      return setSearchInput(event.target.value == '' ? null : event.target.value);
    }
  })));
};
var _ref = "production" === "production" ? {
  name: "1d3w5wq",
  styles: "width:100%"
} : {
  name: "wnh8mb-TableHeader",
  styles: "width:100%;label:TableHeader;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyZG9CIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAgJ3ByZWFjdCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlLCB1c2VSZWYgfSBmcm9tICdwcmVhY3QvaG9va3MnO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiB9IGZyb20gJ3ByZWFjdC9jb21wYXQnO1xuXG5pbXBvcnQgeyBjc3MsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSB1c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gdXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gdXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSB1c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSB1c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gdXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gdXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gdXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSB1c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IHVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3tjb2xvcnM6IHsnc2t5aHl2ZSc6IFsnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZicsICcjMDBiZmZmJywgJyMwMGJmZmYnLCAnIzAwYmZmZiddfSwgcHJpbWFyeUNvbG9yOiAnc2t5aHl2ZSd9fVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var TableHeader = React.forwardRef(function (props, _ref7) {
  var _props$column$label;
  var _useState3 = hooks.useState(props.search[props.column_key]),
    _useState4 = _slicedToArray(_useState3, 2),
    searchInput = _useState4[0],
    setSearchInput = _useState4[1];
  var _useState5 = hooks.useState(false),
    _useState6 = _slicedToArray(_useState5, 2);
    _useState6[0];
    _useState6[1];
  hooks.useEffect(function () {
    var _props$debounceTime;
    var debounceFunc = debounce((_props$debounceTime = props.debounceTime) !== null && _props$debounceTime !== void 0 ? _props$debounceTime : DEBOUNCE_INPUT_TIME_MS, function () {
      props.setSearch(_objectSpread2(_objectSpread2({}, props.search), {}, {
        fields: _objectSpread2(_objectSpread2({}, props.search.fields), {}, _defineProperty({}, props.column_key, searchInput))
      }));
    }, {
      atBegin: false
    });
    debounceFunc();
    return function () {
      debounceFunc.cancel();
    };
  }, [searchInput]);
  function sortFieldClick(event) {
    var this_field_reverse = null;
    for (var i = 0; (_ref4 = i < ((_props$sortFields = props.sortFields) === null || _props$sortFields === void 0 ? void 0 : _props$sortFields.length)) !== null && _ref4 !== void 0 ? _ref4 : 0; i++) {
      var _ref4, _props$sortFields;
      var sortField = props.sortFields[i];
      if (sortField['key'] == props.column_key) {
        this_field_reverse = sortField['reverse'];
      }
    }
    var new_sort_fields = [];
    switch (event.shiftKey) {
      case false:
        switch (this_field_reverse) {
          case false:
            new_sort_fields.push({
              'key': props.column_key,
              'reverse': true
            });
            break;
          case true:
          case null:
            new_sort_fields.push({
              'key': props.column_key,
              'reverse': false
            });
            break;
        }
        break;
      case true:
        var current_key_included = false;
        for (var _i3 = 0; (_ref5 = _i3 < ((_props$sortFields2 = props.sortFields) === null || _props$sortFields2 === void 0 ? void 0 : _props$sortFields2.length)) !== null && _ref5 !== void 0 ? _ref5 : 0; _i3++) {
          var _ref5, _props$sortFields2;
          var _sortField = props.sortFields[_i3];
          if (_sortField['key'] == props.column_key) {
            current_key_included = true;
            switch (this_field_reverse) {
              case false:
                new_sort_fields.push({
                  'key': props.column_key,
                  'reverse': true
                });
                break;
              case true:
              case null:
                new_sort_fields.push({
                  'key': props.column_key,
                  'reverse': false
                });
                break;
            }
          } else {
            new_sort_fields.push(_sortField);
          }
        }
        if (!current_key_included) {
          new_sort_fields.push({
            'key': props.column_key,
            'reverse': false
          });
        }
        break;
    }
    console.log(new_sort_fields);
    props.setSortFields(new_sort_fields);
  }
  var ascendingIcon = preact.h(BsTriangleFill, {
    css: ascendingDeselectedCss
  });
  var descendingIcon = preact.h(BsTriangleFill, {
    css: descendingDeselectedCss
  });
  var column_sort_meta = {
    'symbol': null,
    'index': null
  };
  for (var i = 0; (_ref6 = i < ((_props$sortFields3 = props.sortFields) === null || _props$sortFields3 === void 0 ? void 0 : _props$sortFields3.length)) !== null && _ref6 !== void 0 ? _ref6 : 0; i++) {
    var _ref6, _props$sortFields3;
    var sortField = props.sortFields[i];
    if (sortField.key == props.column_key) {
      switch (sortField.reverse) {
        case true:
          descendingIcon = preact.h(BsTriangleFill, {
            css: descendingSelectedCss
          });
          break;
        case false:
          ascendingIcon = preact.h(BsTriangleFill, {
            css: ascendingSelectedCss
          });
          break;
      }
      column_sort_meta.index = i + 1;
    }
  }
  function swapColumns(columnA, columnB, indexA, before) {
    if (columnA == columnB) {
      return;
    }
    switch (props.columns.attributes[columnA] == null && props.columns.attributes[columnA] == null) {
      case true:
        return;
      case false:
        var newColumnOrder = [];
        for (var _i4 = 0; _i4 < props.columns.order.length; _i4++) {
          var orderColumnKey = props.columns.order[_i4];
          switch (orderColumnKey == columnA || orderColumnKey == columnB) {
            case false:
              newColumnOrder.push(orderColumnKey);
              break;
            case true:
              switch (orderColumnKey == columnA) {
                case true:
                  break;
                case false:
                  switch (Math.sign(Math.abs(_i4 - indexA) - 1)) {
                    case -1:
                      return;
                    case 0:
                      switch (indexA < _i4) {
                        case true:
                          newColumnOrder.push(columnB);
                          newColumnOrder.push(columnA);
                          break;
                        case false:
                          newColumnOrder.push(columnA);
                          newColumnOrder.push(columnB);
                          break;
                      }
                      break;
                    case 1:
                      switch (before) {
                        case true:
                          newColumnOrder.push(columnA);
                          newColumnOrder.push(columnB);
                          break;
                        case false:
                          newColumnOrder.push(columnB);
                          newColumnOrder.push(columnA);
                          break;
                      }
                      break;
                  }
                  break;
              }
              break;
          }
        }
        props.setColumns({
          index: props.columns.index,
          order: newColumnOrder,
          attributes: props.columns.attributes
        });
    }
  }
  function onDragStartHandle(event, column_key, column_index) {
    event.dataTransfer.setData('initiatorKey', column_key);
    event.dataTransfer.setData('initiatorIndex', column_index);
  }
  function onDropHandle(event) {
    event.preventDefault();
    var columnA = event.dataTransfer.getData('initiatorKey');
    var indexA = event.dataTransfer.getData('initiatorIndex');
    var target = event.target;
    var columnB;
    while (!columnB) {
      target = target.parentElement;
      if (!target) {
        return;
      }
      columnB = target.getAttribute('data-rare-earth-column-key');
    }
    var boundingBox = target.getBoundingClientRect();
    var before = event.x <= (boundingBox.left + boundingBox.right) / 2;
    switch (columnB == null) {
      case true:
        return;
      case false:
        swapColumns(columnA, columnB, indexA, before);
    }
  }
  console.log(props);
  return preact.h("th", null, preact.h(Stack, {
    spacing: 0
  }, preact.h("div", {
    ref: function ref(element) {
      return _ref7.current[props.column_index] = element;
    },
    "data-rare-earth-column-key": props.column_key,
    draggable: "true",
    onDragStart: function onDragStart(event) {
      return onDragStartHandle(event, props.column_key, props.column_index);
    },
    onDragOver: function onDragOver(event) {
      return event.preventDefault();
    },
    onDragEnter: function onDragEnter(event) {
      return event.preventDefault();
    },
    onDrop: function onDrop(event) {
      return onDropHandle(event);
    }
  }, preact.h(Flex, {
    align: "center"
  }, preact.h(Button, {
    className: "p-1 m-1",
    styles: {
      root: {
        backgroundColor: "#495057",
        color: "#212529"
      }
    },
    onClick: function onClick(event) {
      return sortFieldClick(event);
    }
  }, preact.h(Flex, {
    align: "center",
    justify: "center"
  }, column_sort_meta.index, preact.h(Stack, {
    spacing: 4,
    className: "m-1"
  }, ascendingIcon, descendingIcon))), (_props$column$label = props.column.label) !== null && _props$column$label !== void 0 ? _props$column$label : props.column_key.toString())), preact.h(Flex, {
    align: "center"
  }, preact.h(TextInput, {
    value: searchInput !== null && searchInput !== void 0 ? searchInput : '',
    onChange: function onChange(event) {
      return setSearchInput(event.target.value == '' ? null : event.target.value);
    },
    css: _ref
  }))));
});
var Table = React.forwardRef(function (props, ref) {
  var _props$columns, _props$columns2, _props$records, _props$initialPageLen, _props$pageLengthChoi, _props$initialPage, _props$initialSortFie, _props$columns3, _props$index, _filteredSortedRecord;
  var _useState7 = hooks.useState({
      _indexKey: crypto.randomUUID(),
      order: ((_props$columns = props.columns) !== null && _props$columns !== void 0 ? _props$columns : []).map(function (x, i) {
        return x.key;
      }),
      attributes: Object.fromEntries(((_props$columns2 = props.columns) !== null && _props$columns2 !== void 0 ? _props$columns2 : []).map(function (x, i) {
        var _x$valueFunc;
        return [x.key, _objectSpread2(_objectSpread2({}, x), {}, {
          valueFunc: (_x$valueFunc = x === null || x === void 0 ? void 0 : x.valueFunc) !== null && _x$valueFunc !== void 0 ? _x$valueFunc : function (record) {
            return record === null || record === void 0 ? void 0 : record[x.key];
          }
        })];
      }))
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    columns = _useState8[0],
    setColumns = _useState8[1];
  var _useState9 = hooks.useState((_props$records = props.records) !== null && _props$records !== void 0 ? _props$records : []),
    _useState10 = _slicedToArray(_useState9, 2),
    records = _useState10[0],
    setRecords = _useState10[1];
  var _useState11 = hooks.useState((_props$initialPageLen = props.initialPageLength) !== null && _props$initialPageLen !== void 0 ? _props$initialPageLen : 10),
    _useState12 = _slicedToArray(_useState11, 2),
    pageLength = _useState12[0],
    setPageLength = _useState12[1];
  var _useState13 = hooks.useState((_props$pageLengthChoi = props.pageLengthChoices) !== null && _props$pageLengthChoi !== void 0 ? _props$pageLengthChoi : [10, 20, 50, 100, Infinity]),
    _useState14 = _slicedToArray(_useState13, 2),
    pageLengthChoices = _useState14[0];
    _useState14[1];
  var _useState15 = hooks.useState((_props$initialPage = props.initialPage) !== null && _props$initialPage !== void 0 ? _props$initialPage : 1),
    _useState16 = _slicedToArray(_useState15, 2),
    page = _useState16[0],
    setPage = _useState16[1];
  var _useState17 = hooks.useState((_props$initialSortFie = props.initialSortFields) !== null && _props$initialSortFie !== void 0 ? _props$initialSortFie : []),
    _useState18 = _slicedToArray(_useState17, 2),
    sortFields = _useState18[0],
    setSortFields = _useState18[1];
  var _useState19 = hooks.useState({
      global: null,
      fields: Object.fromEntries(((_props$columns3 = props.columns) !== null && _props$columns3 !== void 0 ? _props$columns3 : []).map(function (x, i) {
        return [x.key, null];
      }))
    }),
    _useState20 = _slicedToArray(_useState19, 2),
    search = _useState20[0],
    setSearch = _useState20[1];
  var headerRefs = hooks.useRef({});
  function defaultCompareFunc(a, b) {
    switch (a == null) {
      case true:
        switch (b == null) {
          case true:
            return 0;
          case false:
            return 1;
        }
      case false:
        switch (b == null) {
          case true:
            return -1;
          case false:
            switch (a == b) {
              case true:
                return 0;
              case false:
                switch (a < b) {
                  case true:
                    return -1;
                  case false:
                    return 1;
                }
            }
        }
    }
  }
  function compareRecords(recordA, recordB) {
    for (var i = 0; i < sortFields.length; i++) {
      var sortField = sortFields[i]['key'];
      var reverse = sortFields[i]['reverse'];
      var compareFunc = columns.attributes[sortField].compareFunc;
      var aVal;
      var bVal;
      switch (columns.attributes[sortField].valueFunc == null) {
        case false:
          aVal = columns.attributes[sortField].valueFunc(recordA);
          bVal = columns.attributes[sortField].valueFunc(recordB);
          break;
        case true:
          aVal = recordA[sortField];
          bVal = recordB[sortField];
          break;
      }
      var compareVal;
      switch (reverse) {
        case false:
          switch (compareFunc == null) {
            case false:
              compareVal = compareFunc(aVal, bVal);
              break;
            case true:
              compareVal = defaultCompareFunc(aVal, bVal);
              break;
          }
          break;
        case true:
          switch (compareFunc == null) {
            case false:
              compareVal = compareFunc(bVal, aVal);
              break;
            case true:
              compareVal = defaultCompareFunc(bVal, aVal);
              break;
          }
          break;
      }
      if (compareVal != 0) {
        return compareVal;
      }
    }
    return 0;
  }
  hooks.useEffect(function () {
    var _props$columns4, _props$columns5;
    setColumns({
      _indexKey: crypto.randomUUID(),
      order: ((_props$columns4 = props.columns) !== null && _props$columns4 !== void 0 ? _props$columns4 : []).map(function (x, i) {
        return x.key;
      }),
      attributes: Object.fromEntries(((_props$columns5 = props.columns) !== null && _props$columns5 !== void 0 ? _props$columns5 : []).map(function (x, i) {
        var _x$valueFunc2;
        return [x.key, _objectSpread2(_objectSpread2({}, x), {}, {
          valueFunc: (_x$valueFunc2 = x === null || x === void 0 ? void 0 : x.valueFunc) !== null && _x$valueFunc2 !== void 0 ? _x$valueFunc2 : function (record) {
            return record === null || record === void 0 ? void 0 : record[x.key];
          }
        })];
      }))
    });
  }, [props.columns]);
  hooks.useEffect(function () {
    var _props$records2;
    setRecords((_props$records2 = props.records) !== null && _props$records2 !== void 0 ? _props$records2 : []);
  }, [props.records]);
  var filteredRecords = hooks.useMemo(function () {
    console.debug('Filtering Records');
    var newRecords = [];
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      var include = !Boolean(search.global);
      for (var key in search.fields) {
        var _ref8, _ref8$toString, _ref9, _ref8$toString$call, _ref8$toString$call$t, _ref8$toString$call2, _ref8$toString$call$t2, _ref8$toString$call$t3, _ref8$toString$call$t4, _columns$attributes$k, _columns$attributes, _columns$attributes$k2, _columns$attributes$k3, _columns$attributes$k4, _search$global, _search$global$trim, _search$global2, _search$global$trim$c, _search$global$trim$c2, _search$global$trim$c3, _recordCompareStr$inc, _search$fields$key, _search$fields$key$tr, _search$fields$key2, _search$fields$key$tr2, _search$fields$key$tr3, _search$fields$key$tr4, _recordCompareStr$inc2;
        var recordCompareStr = (_ref8 = (_columns$attributes$k = columns === null || columns === void 0 ? void 0 : (_columns$attributes = columns.attributes) === null || _columns$attributes === void 0 ? void 0 : (_columns$attributes$k2 = _columns$attributes[key]) === null || _columns$attributes$k2 === void 0 ? void 0 : (_columns$attributes$k3 = (_columns$attributes$k4 = _columns$attributes$k2).valueFunc) === null || _columns$attributes$k3 === void 0 ? void 0 : _columns$attributes$k3.call(_columns$attributes$k4, record)) !== null && _columns$attributes$k !== void 0 ? _columns$attributes$k : '') === null || _ref8 === void 0 ? void 0 : (_ref8$toString = (_ref9 = _ref8).toString) === null || _ref8$toString === void 0 ? void 0 : (_ref8$toString$call = _ref8$toString.call(_ref9)) === null || _ref8$toString$call === void 0 ? void 0 : (_ref8$toString$call$t = (_ref8$toString$call2 = _ref8$toString$call).trim) === null || _ref8$toString$call$t === void 0 ? void 0 : (_ref8$toString$call$t2 = _ref8$toString$call$t.call(_ref8$toString$call2)) === null || _ref8$toString$call$t2 === void 0 ? void 0 : (_ref8$toString$call$t3 = (_ref8$toString$call$t4 = _ref8$toString$call$t2).toLowerCase) === null || _ref8$toString$call$t3 === void 0 ? void 0 : _ref8$toString$call$t3.call(_ref8$toString$call$t4);
        var globalSearch = (_search$global = search.global) === null || _search$global === void 0 ? void 0 : (_search$global$trim = (_search$global2 = _search$global).trim) === null || _search$global$trim === void 0 ? void 0 : (_search$global$trim$c = _search$global$trim.call(_search$global2)) === null || _search$global$trim$c === void 0 ? void 0 : (_search$global$trim$c2 = (_search$global$trim$c3 = _search$global$trim$c).toLowerCase) === null || _search$global$trim$c2 === void 0 ? void 0 : _search$global$trim$c2.call(_search$global$trim$c3);
        if (Boolean(search.global) && recordCompareStr !== null && recordCompareStr !== void 0 && (_recordCompareStr$inc = recordCompareStr.includes) !== null && _recordCompareStr$inc !== void 0 && _recordCompareStr$inc.call(recordCompareStr, globalSearch)) {
          include = true;
          break;
        }
        var keySearch = (_search$fields$key = search.fields[key]) === null || _search$fields$key === void 0 ? void 0 : (_search$fields$key$tr = (_search$fields$key2 = _search$fields$key).trim) === null || _search$fields$key$tr === void 0 ? void 0 : (_search$fields$key$tr2 = _search$fields$key$tr.call(_search$fields$key2)) === null || _search$fields$key$tr2 === void 0 ? void 0 : (_search$fields$key$tr3 = (_search$fields$key$tr4 = _search$fields$key$tr2).toLowerCase) === null || _search$fields$key$tr3 === void 0 ? void 0 : _search$fields$key$tr3.call(_search$fields$key$tr4);
        if (!keySearch) {
          continue;
        }
        if (recordCompareStr !== null && recordCompareStr !== void 0 && (_recordCompareStr$inc2 = recordCompareStr.includes) !== null && _recordCompareStr$inc2 !== void 0 && _recordCompareStr$inc2.call(recordCompareStr, keySearch)) {
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
        newRecords.push(_objectSpread2(_objectSpread2({}, record), {}, _defineProperty({}, columns._indexKey, i)));
      }
    }
    return newRecords;
  }, [search, records]);
  var filteredSortedRecords = hooks.useMemo(function () {
    console.debug('Sorting Records');
    var sortedRecords = filteredRecords.sort(compareRecords);
    return sortedRecords;
  }, [sortFields, search, records]);
  var columns_headers = [];
  if ((_props$index = props.index) !== null && _props$index !== void 0 ? _props$index : false) {
    columns_headers.push(preact.h("th", null, "Index"));
  }
  for (var i = 0; i < columns.order.length; i++) {
    var key = columns.order[i];
    var column = columns.attributes[key];
    columns_headers.push(preact.h(TableHeader, {
      ref: headerRefs,
      key: key,
      columns: columns,
      setColumns: setColumns,
      sortFields: sortFields,
      setSortFields: setSortFields,
      search: search,
      setSearch: setSearch,
      column_index: i,
      column_key: key,
      column: column
    }));
  }
  var pageCount = Math.ceil(((_filteredSortedRecord = filteredSortedRecords === null || filteredSortedRecords === void 0 ? void 0 : filteredSortedRecords.length) !== null && _filteredSortedRecord !== void 0 ? _filteredSortedRecord : 0) / pageLength);
  var rows = [];
  for (var _i5 = (page - 1) * pageLength; _i5 < Math.min(page * pageLength, filteredSortedRecords.length); _i5++) {
    var _props$index2;
    var record = filteredSortedRecords[_i5];
    var cells = [];
    if ((_props$index2 = props.index) !== null && _props$index2 !== void 0 ? _props$index2 : false) {
      cells.push(preact.h("td", null, record[columns._indexKey]));
    }
    for (var j = 0; j < columns.order.length; j++) {
      var _key = columns.order[j];
      var _column = columns.attributes[_key];
      var value;
      switch (_column.valueFunc == null) {
        case false:
          value = _column.valueFunc(record);
          break;
        case true:
          value = record[_key];
          break;
      }
      switch (_column.displayFunc == null) {
        case true:
          cells.push(preact.h("td", {
            key: _key
          }, value));
          break;
        case false:
          var cellDisplay = _column.displayFunc(record, value);
          cells.push(preact.h("td", {
            key: _key
          }, cellDisplay));
          break;
      }
    }
    rows.push(preact.h("tr", {
      key: _i5
    }, cells));
  }
  function exportTable() {
    var csvContent = "data:text/csv;charset=utf-8,";
    var exportRows = [];
    var exportHeaders = [];
    for (var _i6 = 0; _i6 < columns.order.length; _i6++) {
      var _key2 = columns.order[_i6];
      var _column2 = columns.attributes[_key2];
      exportHeaders.push(_column2.name);
    }
    exportRows.push(exportHeaders.join(","));
    for (var i = 0; (_ref10 = i < (filteredSortedRecords === null || filteredSortedRecords === void 0 ? void 0 : filteredSortedRecords.length)) !== null && _ref10 !== void 0 ? _ref10 : 0; i++) {
      var _ref10;
      var exportRecord = [];
      var _record = filteredSortedRecords[i];
      for (var _j = 0; _j < columns.order.length; _j++) {
        var _key3 = columns.order[_j];
        var _column3 = columns.attributes[_key3];
        var value;
        switch (_column3.valueFunc == null) {
          case false:
            value = _column3.valueFunc(_record);
            break;
          case true:
            value = _record[_key3];
            break;
        }
        exportRecord.push(value == null ? '' : String(value));
      }
      exportRows.push(exportRecord.join(","));
    }
    csvContent += exportRows.join("\r\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }
  var cache = createCache({
    key: 'rare-earth',
    nonce: props.nonce
  });
  cache.compat = true;
  console.debug('Render Table');
  return preact.h(CacheProvider, {
    value: cache
  }, preact.h(MantineProvider, {
    theme: {
      colors: {
        'skyhyve': ['#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff', '#00bfff']
      },
      primaryColor: 'skyhyve'
    },
    withGlobalStyles: true,
    withNormalizeCSS: true,
    emotionCache: cache
  }, preact.h("div", {
    ref: ref,
    id: props.id
  }, preact.h(TableControl, {
    exportTable: exportTable,
    numRecords: records.length,
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
    debounceTime: props.debounceTime
  }), preact.h("table", {
    css: tableCss
  }, preact.h("thead", null, preact.h("tr", null, columns_headers)), preact.h("tbody", null, rows)))));
});

exports.Table = Table;
