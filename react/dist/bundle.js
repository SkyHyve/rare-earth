(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.RareEarth = {}, global.React));
})(this, (function (exports, React) { 'use strict';

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
  					case 59 + offset:
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
  									// d m s
  									case 100: case 109: case 115:
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

  var isBrowser$3 = typeof document !== 'undefined';
  var getServerStylisCache = isBrowser$3 ? undefined : weakMemoize(function () {
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

    if (isBrowser$3 && key === 'css') {
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

    if (isBrowser$3) {
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

    if (isBrowser$3) {
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

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }

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
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p$1=b?Symbol.for("react.suspense"):60113,q=b?
  Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v$1=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
  function z$1(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p$1:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A$1(a){return z$1(a)===m}reactIs_production_min.AsyncMode=l;reactIs_production_min.ConcurrentMode=m;reactIs_production_min.ContextConsumer=k;reactIs_production_min.ContextProvider=h;reactIs_production_min.Element=c;reactIs_production_min.ForwardRef=n;reactIs_production_min.Fragment=e;reactIs_production_min.Lazy=t;reactIs_production_min.Memo=r;reactIs_production_min.Portal=d;
  reactIs_production_min.Profiler=g;reactIs_production_min.StrictMode=f;reactIs_production_min.Suspense=p$1;reactIs_production_min.isAsyncMode=function(a){return A$1(a)||z$1(a)===l};reactIs_production_min.isConcurrentMode=A$1;reactIs_production_min.isContextConsumer=function(a){return z$1(a)===k};reactIs_production_min.isContextProvider=function(a){return z$1(a)===h};reactIs_production_min.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};reactIs_production_min.isForwardRef=function(a){return z$1(a)===n};reactIs_production_min.isFragment=function(a){return z$1(a)===e};reactIs_production_min.isLazy=function(a){return z$1(a)===t};
  reactIs_production_min.isMemo=function(a){return z$1(a)===r};reactIs_production_min.isPortal=function(a){return z$1(a)===d};reactIs_production_min.isProfiler=function(a){return z$1(a)===g};reactIs_production_min.isStrictMode=function(a){return z$1(a)===f};reactIs_production_min.isSuspense=function(a){return z$1(a)===p$1};
  reactIs_production_min.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p$1||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v$1)};reactIs_production_min.typeOf=z$1;

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

  var isBrowser$2 = typeof document !== 'undefined';
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
    isBrowser$2 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
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

        if (!isBrowser$2 && maybeStyles !== undefined) {
          stylesForSSR += maybeStyles;
        }

        current = current.next;
      } while (current !== undefined);

      if (!isBrowser$2 && stylesForSSR.length !== 0) {
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

  var isBrowser$1 = typeof document !== 'undefined';

  var syncFallback = function syncFallback(create) {
    return create();
  };

  var useInsertionEffect$1 = React__namespace['useInsertion' + 'Effect'] ? React__namespace['useInsertion' + 'Effect'] : false;
  var useInsertionEffectAlwaysWithSyncFallback = !isBrowser$1 ? syncFallback : useInsertionEffect$1 || syncFallback;
  var useInsertionEffectWithLayoutFallback = useInsertionEffect$1 || React.useLayoutEffect;

  var isBrowser = typeof document !== 'undefined';
  var hasOwnProperty = {}.hasOwnProperty;

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

    return _extends({}, outerTheme, theme);
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

  var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
  var createEmotionProps = function createEmotionProps(type, props) {

    var newProps = {};

    for (var key in props) {
      if (hasOwnProperty.call(props, key)) {
        newProps[key] = props[key];
      }
    }

    newProps[typePropName] = type; // For performance, only call getLabelFromStackTrace in development and when

    return newProps;
  };

  var Insertion = function Insertion(_ref) {
    var cache = _ref.cache,
        serialized = _ref.serialized,
        isStringTag = _ref.isStringTag;
    registerStyles(cache, serialized, isStringTag);
    var rules = useInsertionEffectAlwaysWithSyncFallback(function () {
      return insertStyles(cache, serialized, isStringTag);
    });

    if (!isBrowser && rules !== undefined) {
      var _ref2;

      var serializedNames = serialized.name;
      var next = serialized.next;

      while (next !== undefined) {
        serializedNames += ' ' + next.name;
        next = next.next;
      }

      return /*#__PURE__*/React.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref2.nonce = cache.sheet.nonce, _ref2));
    }

    return null;
  };

  var Emotion = /* #__PURE__ */withEmotionCache(function (props, cache, ref) {
    var cssProp = props.css; // so that using `css` from `emotion` and passing the result to the css prop works
    // not passing the registered cache to serializeStyles because it would
    // make certain babel optimisations not possible

    if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
      cssProp = cache.registered[cssProp];
    }

    var WrappedComponent = props[typePropName];
    var registeredStyles = [cssProp];
    var className = '';

    if (typeof props.className === 'string') {
      className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
    } else if (props.className != null) {
      className = props.className + " ";
    }

    var serialized = serializeStyles(registeredStyles, undefined, React.useContext(ThemeContext));

    className += cache.key + "-" + serialized.name;
    var newProps = {};

    for (var key in props) {
      if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ("production" === 'production' )) {
        newProps[key] = props[key];
      }
    }

    newProps.ref = ref;
    newProps.className = className;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Insertion, {
      cache: cache,
      serialized: serialized,
      isStringTag: typeof WrappedComponent === 'string'
    }), /*#__PURE__*/React.createElement(WrappedComponent, newProps));
  });

  var jsx = function jsx(type, props) {
    var args = arguments;

    if (props == null || !hasOwnProperty.call(props, 'css')) {
      // $FlowFixMe
      return React.createElement.apply(undefined, args);
    }

    var argsLength = args.length;
    var createElementArgArray = new Array(argsLength);
    createElementArgArray[0] = Emotion;
    createElementArgArray[1] = createEmotionProps(type, props);

    for (var i = 2; i < argsLength; i++) {
      createElementArgArray[i] = args[i];
    } // $FlowFixMe


    return React.createElement.apply(null, createElementArgArray);
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

  var reactDomExports = {};
  var reactDom = {
    get exports(){ return reactDomExports; },
    set exports(v){ reactDomExports = v; },
  };

  var reactDom_production_min = {};

  var schedulerExports = {};
  var scheduler = {
    get exports(){ return schedulerExports; },
    set exports(v){ schedulerExports = v; },
  };

  var scheduler_production_min = {};

  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (exports) {
  function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
  	function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()};}else {var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q};}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
  	"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t);}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else {var b=h(t);null!==b&&K(H,b.startTime-a);}}
  	function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b);}else k(r);v=h(r);}if(null!==v)var w=!0;else {var m=h(t);null!==m&&K(H,m.startTime-b);w=!1;}return w}finally{v=null,y=c,z=!1;}}var N=!1,O=null,L=-1,P=5,Q=-1;
  	function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a);}finally{b?S():(N=!1,O=null);}}else N=!1;}var S;if("function"===typeof F)S=function(){F(R);};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null);};}else S=function(){D(R,0);};function I(a){O=a;N||(N=!0,S());}function K(a,b){L=D(function(){a(exports.unstable_now());},b);}
  	exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null;};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J));};
  	exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5;};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y;}var c=y;y=b;try{return a()}finally{y=c;}};exports.unstable_pauseExecution=function(){};
  	exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=y;y=a;try{return b()}finally{y=c;}};
  	exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3;}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
  	exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c;}}};
  } (scheduler_production_min));

  (function (module) {

  	{
  	  module.exports = scheduler_production_min;
  	}
  } (scheduler));

  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var aa=React,ca=schedulerExports;function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b);}
  function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a]);}
  var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
  {},ma={};function oa(a){if(ja.call(ma,a))return !0;if(ja.call(la,a))return !1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return !1}function pa(a,b,c,d){if(null!==c&&0===c.type)return !1;switch(typeof b){case "function":case "symbol":return !0;case "boolean":if(d)return !1;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return !1}}
  function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return !0;if(d)return !1;if(null!==c)switch(c.type){case 3:return !b;case 4:return !1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return !1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g;}var z={};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1);});
  ["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1);});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1);});
  ["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1);});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1);});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1);});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1);});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
  sa);z[b]=new v(b,1,!1,a,null,!1,!1);});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1);});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1);});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1);});
  z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0);});
  function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)));}
  var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");var Ia=Symbol.for("react.offscreen");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return "function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||"";}return "\n"+La+a}var Na=!1;
  function Oa(a,b){if(!a||Na)return "";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[]);}catch(l){var d=l;}Reflect.construct(a,[],b);}else {try{b.call();}catch(l){d=l;}a.call(b.prototype);}else {try{throw Error();}catch(l){d=l;}a();}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
  f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c;}return (a=a?a.displayName||a.name:"")?Ma(a):""}
  function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return ""}}
  function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return "Fragment";case wa:return "Portal";case Aa:return "Profiler";case za:return "StrictMode";case Ea:return "Suspense";case Fa:return "SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return (a.displayName||"Context")+".Consumer";case Ba:return (a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
  b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
  function Ra(a){var b=a.type;switch(a.tag){case 24:return "Cache";case 9:return (b.displayName||"Context")+".Consumer";case 10:return (b._context.displayName||"Context")+".Provider";case 18:return "DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return "Fragment";case 5:return b;case 4:return "Portal";case 3:return "Root";case 6:return "Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return "Offscreen";
  case 12:return "Profiler";case 21:return "Scope";case 13:return "Suspense";case 19:return "SuspenseList";case 25:return "TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return ""}}
  function Ta(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
  function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
  null;delete a[b];}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a));}function Wa(a){if(!a)return !1;var b=a._valueTracker;if(!b)return !0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
  function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1);}
  function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
  function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
  function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}var eb=Array.isArray;
  function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0);}else {c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=!0);}}
  function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0];}b=c;}null==b&&(b="");c=b;}a._wrapperState={initialValue:Sa(c)};}
  function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b);}function kb(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}
  function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
  var mb,nb=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else {mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
  function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
  var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
  zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a];});});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
  function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
  function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
  function vb(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
  function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b));}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a;}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a]);}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb();}}
  function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;if(c&&"function"!==
  typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0;}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb);}catch(a){Lb=!1;}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l);}catch(m){this.onError(m);}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a;}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments);}
  function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null;}else throw Error(p(198));Qb||(Qb=!0,Rb=l);}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else {a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
  function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling;}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else {for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===
  c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling;}return null}
  var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128));}catch(b){}}
  var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
  function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
  default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)));}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
  function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return -1;case 134217728:case 268435456:case 536870912:case 1073741824:return -1;default:return -1}}
  function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b);}else k<=b&&(a.expiredLanes|=h);f&=~h;}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
  function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c;}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f;}}
  function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e;}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId);}}
  function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
  function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return !0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return !1}
  function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c);});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null;}
  function Xc(a){if(null!==a.blockedOn)return !1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null;}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift();}return !0}function Zc(a,b,c){Xc(a)&&c.delete(b);}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc);}
  function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)));}
  function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null);}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift();}var cd=ua.ReactCurrentBatchConfig,dd=!0;
  function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d);}finally{C=e,cd.transition=f;}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d);}finally{C=e,cd.transition=f;}}
  function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f;}null!==e&&d.stopPropagation();}else hd(a,b,d,null,c);}}var id=null;
  function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null;}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null;}else b!==a&&(a=null);id=a;return null}
  function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
  case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
  function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return !0}function qd(){return !1}
  function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
  (a.returnValue=!1),this.isDefaultPrevented=pd);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd);},persist:function(){},isPersistent:pd});return b}
  var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
  a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return "movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
  Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
  119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
  var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return "keypress"===a.type?od(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===
  a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
  deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
  function ge(a,b){switch(a){case "keyup":return -1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return !0;default:return !1}}function he(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
  function ke(a,b){if(ie)return "compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
  var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}));}var pe=null,qe=null;function re(a){se(a,0);}function te(a){var b=ue(a);if(Wa(b))return a}
  function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput;}xe=ye;}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode);}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null);}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b);}}
  function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae();}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
  function Ie(a,b){if(He(a,b))return !0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return !1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return !1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return !1}return !0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
  function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Je(c);}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
  function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href;}catch(d){c=!1;}if(c)a=b.contentWindow;else break;b=Xa(a.document);}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
  function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
  d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)));}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top;}}
  var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
  function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)));}
  function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
  ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a,b){df.set(a,b);fa(b,[a]);}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf);}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
  ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null;}
  function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k;}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k;}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
  function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d));}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b);}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a));});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b));}}
  function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd;}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1);}
  function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return;}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode;}}d=d.return;}Jb(function(){var d=f,e=xb(c),g=[];
  a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
  Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td;}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
  w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return;}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}));}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
  n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null;}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
  vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x);}t=null;}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0);}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else {na=De;var xa=Ce;}else (k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
  xa.controlled&&"number"===h.type&&cb(h,"number",h.value);}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e);}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
  break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0;}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
  0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a);}se(g,b);});}function tf(a,b,c){return {instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return;}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
  function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return;}0!==g.length&&a.push({event:b,listeners:g});}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return ("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
  var Cf=null,Df=null;function Ef(a,b){return "textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
  var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;});}
  function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--;}else "$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e;}while(c);bd(b);}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
  function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--;}else "/$"===c&&b++;}a=a.previousSibling;}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
  function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a);}return b}a=c;c=a.parentNode;}return null}function Cb(a){a=a[Of]||a[uf];return !a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return {current:a}}
  function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--);}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b;}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
  function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H);}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c);}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
  function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return !0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c);}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a);}function ig(a){fg=!0;hg(a);}
  function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1;}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1;}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b;}
  function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a;}else rg=1<<f|c<<e|d,sg=a;}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0));}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null;}var xg=null,yg=null,I=!1,zg=null;
  function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c);}
  function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
  null,!0):!1;default:return !1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a);}}else {if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a;}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a;}
  function Gg(a){if(a!==xg)return !1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling);}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--;}else "$"!==c&&"$!"!==c&&"$?"!==c||b++;}a=a.nextSibling;}yg=
  null;}}else yg=xg?Lf(a.stateNode.nextSibling):null;return !0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling);}function Ig(){yg=xg=null;I=!1;}function Jg(a){null===zg?zg=[a]:zg.push(a);}var Kg=ua.ReactCurrentBatchConfig;function Lg(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var Mg=Uf(null),Ng=null,Og=null,Pg=null;function Qg(){Pg=Og=Ng=null;}function Rg(a){var b=Mg.current;E(Mg);a._currentValue=b;}
  function Sg(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return;}}function Tg(a,b){Ng=a;Pg=Og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(Ug=!0),a.firstContext=null);}
  function Vg(a){var b=a._currentValue;if(Pg!==a)if(a={context:a,memoizedValue:b,next:null},null===Og){if(null===Ng)throw Error(p(308));Og=a;Ng.dependencies={lanes:0,firstContext:a};}else Og=Og.next=a;return b}var Wg=null;function Xg(a){null===Wg?Wg=[a]:Wg.push(a);}function Yg(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,Xg(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Zg(a,d)}
  function Zg(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var $g=!1;function ah(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null};}
  function bh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects});}function ch(a,b){return {eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
  function dh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return Zg(a,c)}e=d.interleaved;null===e?(b.next=b,Xg(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Zg(a,c)}function eh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c);}}
  function fh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next;}while(null!==c);null===f?e=f=b:f=f.next=b;}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
  b;c.lastBaseUpdate=b;}
  function gh(a,b,c,d){var e=a.updateQueue;$g=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k));}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
  next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:$g=!0;}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h));}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
  h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null;}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);hh|=g;a.lanes=g;a.memoizedState=q;}}
  function ih(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d);}}}var jh=(new aa.Component).refs;function kh(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c);}
  var nh={isMounted:function(a){return (a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=L(),e=lh(a),f=ch(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=dh(a,f,e);null!==b&&(mh(b,a,e,d),eh(b,a,e));},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=L(),e=lh(a),f=ch(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=dh(a,f,e);null!==b&&(mh(b,a,e,d),eh(b,a,e));},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=L(),d=
  lh(a),e=ch(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=dh(a,e,d);null!==b&&(mh(b,a,d,c),eh(b,a,d));}};function oh(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
  function ph(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=Vg(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=nh;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
  function qh(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&nh.enqueueReplaceState(b,b.state,null);}
  function rh(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=jh;ah(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=Vg(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(kh(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
  "function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&nh.enqueueReplaceState(e,e.state,null),gh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308);}
  function sh(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode;}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;b===jh&&(b=e.refs={});null===a?delete b[f]:b[f]=a;};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
  function th(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function uh(a){var b=a._init;return b(a._payload)}
  function vh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c);}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=wh(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
  null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=xh(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&uh(f)===b.type))return d=e(b,c.props),d.ref=sh(a,b,c),d.return=a,d;d=yh(c.type,c.key,c.props,null,a.mode,d);d.ref=sh(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
  b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=zh(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Ah(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=xh(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=yh(b.type,b.key,b.props,null,a.mode,c),
  c.ref=sh(a,null,b),c.return=a,c;case wa:return b=zh(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Ah(b,a.mode,c,null),b.return=a,b;th(a,b);}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
  b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);th(a,c);}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);th(b,d);}return null}
  function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x;}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
  x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x;}if(n.done)return c(e,
  m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
  f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&uh(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=sh(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling;}f.type===ya?(d=Ah(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=yh(f.type,f.key,f.props,null,a.mode,h),h.ref=sh(a,d,f),h.return=a,a=h);}return g(a);case wa:a:{for(l=f.key;null!==
  d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=zh(f,a.mode,h);d.return=a;a=d;}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);th(a,f);}return "string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
  (c(a,d),d=xh(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Bh=vh(!0),Ch=vh(!1),Dh={},Eh=Uf(Dh),Fh=Uf(Dh),Gh=Uf(Dh);function Hh(a){if(a===Dh)throw Error(p(174));return a}function Ih(a,b){G(Gh,b);G(Fh,a);G(Eh,Dh);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a);}E(Eh);G(Eh,b);}function Jh(){E(Eh);E(Fh);E(Gh);}
  function Kh(a){Hh(Gh.current);var b=Hh(Eh.current);var c=lb(b,a.type);b!==c&&(G(Fh,a),G(Eh,c));}function Lh(a){Fh.current===a&&(E(Eh),E(Fh));}var M=Uf(0);
  function Mh(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}return null}var Nh=[];
  function Oh(){for(var a=0;a<Nh.length;a++)Nh[a]._workInProgressVersionPrimary=null;Nh.length=0;}var Ph=ua.ReactCurrentDispatcher,Qh=ua.ReactCurrentBatchConfig,Rh=0,N=null,O=null,P=null,Sh=!1,Th=!1,Uh=0,Vh=0;function Q(){throw Error(p(321));}function Wh(a,b){if(null===b)return !1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return !1;return !0}
  function Xh(a,b,c,d,e,f){Rh=f;N=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Ph.current=null===a||null===a.memoizedState?Yh:Zh;a=c(d,e);if(Th){f=0;do{Th=!1;Uh=0;if(25<=f)throw Error(p(301));f+=1;P=O=null;b.updateQueue=null;Ph.current=$h;a=c(d,e);}while(Th)}Ph.current=ai;b=null!==O&&null!==O.next;Rh=0;P=O=N=null;Sh=!1;if(b)throw Error(p(300));return a}function bi(){var a=0!==Uh;Uh=0;return a}
  function ci(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===P?N.memoizedState=P=a:P=P.next=a;return P}function di(){if(null===O){var a=N.alternate;a=null!==a?a.memoizedState:null;}else a=O.next;var b=null===P?N.memoizedState:P.next;if(null!==b)P=b,O=a;else {if(null===a)throw Error(p(310));O=a;a={memoizedState:O.memoizedState,baseState:O.baseState,baseQueue:O.baseQueue,queue:O.queue,next:null};null===P?N.memoizedState=P=a:P=P.next=a;}return P}
  function ei(a,b){return "function"===typeof b?b(a):b}
  function fi(a){var b=di(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=O,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g;}d.baseQueue=e=f;c.pending=null;}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Rh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else {var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
  eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;N.lanes|=m;hh|=m;}l=l.next;}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(Ug=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d;}a=c.interleaved;if(null!==a){e=a;do f=e.lane,N.lanes|=f,hh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return [b.memoizedState,c.dispatch]}
  function gi(a){var b=di(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(Ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f;}return [f,d]}function hi(){}
  function ii(a,b){var c=N,d=di(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,Ug=!0);d=d.queue;ji(ki.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==P&&P.memoizedState.tag&1){c.flags|=2048;li(9,mi.bind(null,c,d,e,b),void 0,null);if(null===R)throw Error(p(349));0!==(Rh&30)||ni(c,b,e);}return e}function ni(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=N.updateQueue;null===b?(b={lastEffect:null,stores:null},N.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a));}
  function mi(a,b,c,d){b.value=c;b.getSnapshot=d;oi(b)&&pi(a);}function ki(a,b,c){return c(function(){oi(b)&&pi(a);})}function oi(a){var b=a.getSnapshot;a=a.value;try{var c=b();return !He(a,c)}catch(d){return !0}}function pi(a){var b=Zg(a,1);null!==b&&mh(b,a,1,-1);}
  function qi(a){var b=ci();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ei,lastRenderedState:a};b.queue=a;a=a.dispatch=ri.bind(null,N,a);return [b.memoizedState,a]}
  function li(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=N.updateQueue;null===b?(b={lastEffect:null,stores:null},N.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function si(){return di().memoizedState}function ti(a,b,c,d){var e=ci();N.flags|=a;e.memoizedState=li(1|b,c,void 0,void 0===d?null:d);}
  function ui(a,b,c,d){var e=di();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&Wh(d,g.deps)){e.memoizedState=li(b,c,f,d);return}}N.flags|=a;e.memoizedState=li(1|b,c,f,d);}function vi(a,b){return ti(8390656,8,a,b)}function ji(a,b){return ui(2048,8,a,b)}function wi(a,b){return ui(4,2,a,b)}function xi(a,b){return ui(4,4,a,b)}
  function yi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}function zi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ui(4,4,yi.bind(null,b,a),c)}function Ai(){}function Bi(a,b){var c=di();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Wh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
  function Ci(a,b){var c=di();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Wh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Di(a,b,c){if(0===(Rh&21))return a.baseState&&(a.baseState=!1,Ug=!0),a.memoizedState=c;He(c,b)||(c=yc(),N.lanes|=c,hh|=c,a.baseState=!0);return b}function Ei(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Qh.transition;Qh.transition={};try{a(!1),b();}finally{C=c,Qh.transition=d;}}function Fi(){return di().memoizedState}
  function Gi(a,b,c){var d=lh(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Hi(a))Ii(b,c);else if(c=Yg(a,b,c,d),null!==c){var e=L();mh(c,a,d,e);Ji(c,b,d);}}
  function ri(a,b,c){var d=lh(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Hi(a))Ii(b,e);else {var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,Xg(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=Yg(a,b,e,d);null!==c&&(e=L(),mh(c,a,d,e),Ji(c,b,d));}}
  function Hi(a){var b=a.alternate;return a===N||null!==b&&b===N}function Ii(a,b){Th=Sh=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b;}function Ji(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c);}}
  var ai={readContext:Vg,useCallback:Q,useContext:Q,useEffect:Q,useImperativeHandle:Q,useInsertionEffect:Q,useLayoutEffect:Q,useMemo:Q,useReducer:Q,useRef:Q,useState:Q,useDebugValue:Q,useDeferredValue:Q,useTransition:Q,useMutableSource:Q,useSyncExternalStore:Q,useId:Q,unstable_isNewReconciler:!1},Yh={readContext:Vg,useCallback:function(a,b){ci().memoizedState=[a,void 0===b?null:b];return a},useContext:Vg,useEffect:vi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ti(4194308,
  4,yi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ti(4194308,4,a,b)},useInsertionEffect:function(a,b){return ti(4,2,a,b)},useMemo:function(a,b){var c=ci();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=ci();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=Gi.bind(null,N,a);return [d.memoizedState,a]},useRef:function(a){var b=
  ci();a={current:a};return b.memoizedState=a},useState:qi,useDebugValue:Ai,useDeferredValue:function(a){return ci().memoizedState=a},useTransition:function(){var a=qi(!1),b=a[0];a=Ei.bind(null,a[1]);ci().memoizedState=a;return [b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=N,e=ci();if(I){if(void 0===c)throw Error(p(407));c=c();}else {c=b();if(null===R)throw Error(p(349));0!==(Rh&30)||ni(d,b,c);}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;vi(ki.bind(null,d,
  f,a),[a]);d.flags|=2048;li(9,mi.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=ci(),b=R.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Uh++;0<c&&(b+="H"+c.toString(32));b+=":";}else c=Vh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Zh={readContext:Vg,useCallback:Bi,useContext:Vg,useEffect:ji,useImperativeHandle:zi,useInsertionEffect:wi,useLayoutEffect:xi,useMemo:Ci,useReducer:fi,useRef:si,useState:function(){return fi(ei)},
  useDebugValue:Ai,useDeferredValue:function(a){var b=di();return Di(b,O.memoizedState,a)},useTransition:function(){var a=fi(ei)[0],b=di().memoizedState;return [a,b]},useMutableSource:hi,useSyncExternalStore:ii,useId:Fi,unstable_isNewReconciler:!1},$h={readContext:Vg,useCallback:Bi,useContext:Vg,useEffect:ji,useImperativeHandle:zi,useInsertionEffect:wi,useLayoutEffect:xi,useMemo:Ci,useReducer:gi,useRef:si,useState:function(){return gi(ei)},useDebugValue:Ai,useDeferredValue:function(a){var b=di();return null===
  O?b.memoizedState=a:Di(b,O.memoizedState,a)},useTransition:function(){var a=gi(ei)[0],b=di().memoizedState;return [a,b]},useMutableSource:hi,useSyncExternalStore:ii,useId:Fi,unstable_isNewReconciler:!1};function Ki(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c;}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack;}return {value:a,source:b,stack:e,digest:null}}function Li(a,b,c){return {value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}
  function Mi(a,b){try{console.error(b.value);}catch(c){setTimeout(function(){throw c;});}}var Ni="function"===typeof WeakMap?WeakMap:Map;function Oi(a,b,c){c=ch(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Pi||(Pi=!0,Qi=d);Mi(a,b);};return c}
  function Ri(a,b,c){c=ch(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Mi(a,b);};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Mi(a,b);"function"!==typeof d&&(null===Si?Si=new Set([this]):Si.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""});});return c}
  function Ti(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Ni;var e=new Set;d.set(b,e);}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ui.bind(null,a,b,c),b.then(a,a));}function Vi(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return;}while(null!==a);return null}
  function Wi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=ch(-1,1),b.tag=2,dh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Xi=ua.ReactCurrentOwner,Ug=!1;function Yi(a,b,c,d){b.child=null===a?Ch(b,null,c,d):Bh(b,a.child,c,d);}
  function Zi(a,b,c,d,e){c=c.render;var f=b.ref;Tg(b,e);d=Xh(a,b,c,d,f,e);c=bi();if(null!==a&&!Ug)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,$i(a,b,e);I&&c&&vg(b);b.flags|=1;Yi(a,b,d,e);return b.child}
  function aj(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!bj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,cj(a,b,f,d,e);a=yh(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return $i(a,b,e)}b.flags|=1;a=wh(f,d);a.ref=b.ref;a.return=b;return b.child=a}
  function cj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(Ug=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(Ug=!0);else return b.lanes=a.lanes,$i(a,b,e)}return dj(a,b,c,d,e)}
  function ej(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(fj,gj),gj|=c;else {if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(fj,gj),gj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(fj,gj);gj|=d;}else null!==
  f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(fj,gj),gj|=d;Yi(a,b,e,c);return b.child}function hj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152;}function dj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);Tg(b,e);c=Xh(a,b,c,d,f,e);d=bi();if(null!==a&&!Ug)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,$i(a,b,e);I&&d&&vg(b);b.flags|=1;Yi(a,b,c,e);return b.child}
  function ij(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b);}else f=!1;Tg(b,e);if(null===b.stateNode)jj(a,b),ph(b,c,d),rh(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=Vg(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
  (h!==d||k!==l)&&qh(b,g,d,l);$g=!1;var r=b.memoizedState;g.state=r;gh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||$g?("function"===typeof m&&(kh(b,c,m,d),k=b.memoizedState),(h=$g||oh(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
  ("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1);}else {g=b.stateNode;bh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Lg(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=Vg(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
  "function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&qh(b,g,d,k);$g=!1;r=b.memoizedState;g.state=r;gh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||$g?("function"===typeof y&&(kh(b,c,y,d),n=b.memoizedState),(l=$g||oh(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
  g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
  a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1);}return kj(a,b,c,d,f,e)}
  function kj(a,b,c,d,e,f){hj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),$i(a,b,f);d=b.stateNode;Xi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Bh(b,a.child,null,f),b.child=Bh(b,null,h,f)):Yi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function lj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);Ih(a,b.containerInfo);}
  function mj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Yi(a,b,c,d);return b.child}var nj={dehydrated:null,treeContext:null,retryLane:0};function oj(a){return {baseLanes:a,cachePool:null,transitions:null}}
  function pj(a,b,c){var d=b.pendingProps,e=M.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(M,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
  g):f=qj(g,d,0,null),a=Ah(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=oj(c),b.memoizedState=nj,a):rj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return sj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=wh(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=wh(h,f):(f=Ah(f,g,c,null),f.flags|=2);f.return=
  b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?oj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=nj;return d}f=a.child;a=f.sibling;d=wh(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
  function rj(a,b){b=qj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function tj(a,b,c,d){null!==d&&Jg(d);Bh(b,a.child,null,c);a=rj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
  function sj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Li(Error(p(422))),tj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=qj({mode:"visible",children:d.children},e,0,null);f=Ah(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Bh(b,a.child,null,g);b.child.memoizedState=oj(g);b.memoizedState=nj;return f}if(0===(b.mode&1))return tj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
  if(d)var h=d.dgst;d=h;f=Error(p(419));d=Li(f,d,void 0);return tj(a,b,g,d)}h=0!==(g&a.childLanes);if(Ug||h){d=R;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0;}e=0!==(e&(d.suspendedLanes|g))?0:e;
  0!==e&&e!==f.retryLane&&(f.retryLane=e,Zg(a,e),mh(d,a,e,-1));}uj();d=Li(Error(p(421)));return tj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=rj(b,d.children);b.flags|=4096;return b}function wj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);Sg(a.return,b,c);}
  function xj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e);}
  function yj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Yi(a,b,d.children,c);d=M.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else {if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&wj(a,c,b);else if(19===a.tag)wj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return;}a.sibling.return=a.return;a=a.sibling;}d&=1;}G(M,d);if(0===(b.mode&1))b.memoizedState=
  null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Mh(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);xj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Mh(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a;}xj(b,!0,c,null,f);break;case "together":xj(b,!1,null,null,void 0);break;default:b.memoizedState=null;}return b.child}
  function jj(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2);}function $i(a,b,c){null!==a&&(b.dependencies=a.dependencies);hh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=wh(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=wh(a,a.pendingProps),c.return=b;c.sibling=null;}return b.child}
  function zj(a,b,c){switch(b.tag){case 3:lj(b);Ig();break;case 5:Kh(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:Ih(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Mg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(M,M.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return pj(a,b,c);G(M,M.current&1);a=$i(a,b,c);return null!==a?a.sibling:null}G(M,M.current&1);break;case 19:d=0!==(c&
  b.childLanes);if(0!==(a.flags&128)){if(d)return yj(a,b,c);b.flags|=128;}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(M,M.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,ej(a,b,c)}return $i(a,b,c)}var Aj,Bj,Cj,Dj;
  Aj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}};Bj=function(){};
  Cj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;Hh(Eh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf);}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
  (c||(c={}),c[g]="");}else "dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g]);}else c||(f||(f=[]),f.push(l,
  c)),c=k;else "dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k));}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4;}};Dj=function(a,b,c,d){c!==d&&(b.flags|=4);};
  function Ej(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null;}}
  function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
  function Fj(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;Jh();E(Wf);E(H);Oh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Gj(zg),zg=null));Bj(a,b);S(b);return null;case 5:Lh(b);var e=Hh(Gh.current);
  c=b.type;if(null!==a&&null!=b.stateNode)Cj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else {if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=Hh(Eh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
  d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d);}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
  h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d);}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf);}d=e;b.updateQueue=d;null!==d&&(b.flags|=4);}else {g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
  "string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;Aj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
  a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d;}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
  c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g));}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
  !0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf);}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1;}}d&&(b.flags|=4);}null!==b.ref&&(b.flags|=512,b.flags|=2097152);}S(b);return null;case 6:if(a&&null!=b.stateNode)Dj(a,b,a.memoizedProps,d);else {if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=Hh(Gh.current);Hh(Eh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
  xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1));}f&&(b.flags|=4);}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d;}S(b);return null;case 13:E(M);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
  a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b;}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1;}else null!==zg&&(Gj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(M.current&1)?0===T&&(T=3):uj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return Jh(),
  Bj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return Rg(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(M);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Ej(f,!1);else {if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Mh(a);if(null!==g){b.flags|=128;Ej(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
  g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(M,M.current&1|2);return b.child}a=
  a.sibling;}null!==f.tail&&B()>Hj&&(b.flags|=128,d=!0,Ej(f,!1),b.lanes=4194304);}else {if(!d)if(a=Mh(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Ej(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Hj&&1073741824!==c&&(b.flags|=128,d=!0,Ej(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g);}if(null!==f.tail)return b=f.tail,f.rendering=
  b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=M.current,G(M,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Ij(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(gj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
  function Jj(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Jh(),E(Wf),E(H),Oh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Lh(b),null;case 13:E(M);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig();}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(M),null;case 4:return Jh(),null;case 10:return Rg(b.type._context),null;case 22:case 23:return Ij(),
  null;case 24:return null;default:return null}}var Kj=!1,U=!1,Lj="function"===typeof WeakSet?WeakSet:Set,V=null;function Mj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null);}catch(d){W(a,b,d);}else c.current=null;}function Nj(a,b,c){try{c();}catch(d){W(a,b,d);}}var Oj=!1;
  function Pj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType;}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
  q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y;}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode;}q=y;}c=-1===h||-1===k?null:{start:h,end:k};}else c=null;}c=c||{start:0,end:0};}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
  case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Lg(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w;}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F);}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return;}n=Oj;Oj=!1;return n}
  function Qj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Nj(b,c,f);}e=e.next;}while(e!==d)}}function Rj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d();}c=c.next;}while(c!==b)}}function Sj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c;}"function"===typeof b?b(a):b.current=a;}}
  function Tj(a){var b=a.alternate;null!==b&&(a.alternate=null,Tj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null;}function Uj(a){return 5===a.tag||3===a.tag||4===a.tag}
  function Vj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Uj(a.return))return null;a=a.return;}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child;}if(!(a.flags&2))return a.stateNode}}
  function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling;}
  function Xj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Xj(a,b,c),a=a.sibling;null!==a;)Xj(a,b,c),a=a.sibling;}var X=null,Yj=!1;function Zj(a,b,c){for(c=c.child;null!==c;)ak(a,b,c),c=c.sibling;}
  function ak(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c);}catch(h){}switch(c.tag){case 5:U||Mj(c,b);case 6:var d=X,e=Yj;X=null;Zj(a,b,c);X=d;Yj=e;null!==X&&(Yj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Yj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Yj;X=c.stateNode.containerInfo;Yj=!0;
  Zj(a,b,c);X=d;Yj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Nj(c,b,g):0!==(f&4)&&Nj(c,b,g));e=e.next;}while(e!==d)}Zj(a,b,c);break;case 1:if(!U&&(Mj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount();}catch(h){W(c,b,h);}Zj(a,b,c);break;case 21:Zj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
  c.memoizedState,Zj(a,b,c),U=d):Zj(a,b,c);break;default:Zj(a,b,c);}}function bk(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Lj);b.forEach(function(b){var d=ck.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d));});}}
  function dk(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Yj=!1;break a;case 3:X=h.stateNode.containerInfo;Yj=!0;break a;case 4:X=h.stateNode.containerInfo;Yj=!0;break a}h=h.return;}if(null===X)throw Error(p(160));ak(f,g,e);X=null;Yj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null;}catch(l){W(e,b,l);}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)ek(b,a),b=b.sibling;}
  function ek(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:dk(b,a);fk(a);if(d&4){try{Qj(3,a,a.return),Rj(3,a);}catch(t){W(a,a.return,t);}try{Qj(5,a,a.return);}catch(t){W(a,a.return,t);}}break;case 1:dk(b,a);fk(a);d&512&&null!==c&&Mj(c,c.return);break;case 5:dk(b,a);fk(a);d&512&&null!==c&&Mj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"");}catch(t){W(a,a.return,t);}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
  a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l);}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
  f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1));}e[Pf]=f;}catch(t){W(a,a.return,t);}}break;case 6:dk(b,a);fk(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f;}catch(t){W(a,a.return,t);}}break;case 3:dk(b,a);fk(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo);}catch(t){W(a,a.return,t);}break;case 4:dk(b,a);fk(a);break;case 13:dk(b,a);fk(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
  null!==e.alternate&&null!==e.alternate.memoizedState||(gk=B()));d&4&&bk(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,dk(b,a),U=l):dk(b,a);fk(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Qj(4,r,r.return);break;case 1:Mj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
  b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount();}catch(t){W(d,c,t);}}break;case 5:Mj(r,r.return);break;case 22:if(null!==r.memoizedState){hk(q);continue}}null!==y?(y.return=r,V=y):hk(q);}m=m.sibling;}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
  rb("display",g));}catch(t){W(a,a.return,t);}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps;}catch(t){W(a,a.return,t);}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return;}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling;}}break;case 19:dk(b,a);fk(a);d&4&&bk(a);break;case 21:break;default:dk(b,
  a),fk(a);}}function fk(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Uj(c)){var d=c;break a}c=c.return;}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Vj(a);Xj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Vj(a);Wj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k);}a.flags&=-3;}b&4096&&(a.flags&=-4097);}function ik(a,b,c){V=a;jk(a);}
  function jk(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Kj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Kj;var l=U;Kj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?kk(e):null!==k?(k.return=g,V=k):kk(e);for(;null!==f;)V=f,jk(f),f=f.sibling;V=e;Kj=h;U=l;}lk(a);}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):lk(a);}}
  function lk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Rj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else {var e=b.elementType===b.type?c.memoizedProps:Lg(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate);}var f=b.updateQueue;null!==f&&ih(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
  b.child.stateNode;break;case 1:c=b.child.stateNode;}ih(b,g,c);}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src);}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q);}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
  default:throw Error(p(163));}U||b.flags&512&&Sj(b);}catch(r){W(b,b.return,r);}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return;}}function hk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return;}}
  function kk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Rj(4,b);}catch(k){W(b,c,k);}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount();}catch(k){W(b,e,k);}}var f=b.return;try{Sj(b);}catch(k){W(b,f,k);}break;case 5:var g=b.return;try{Sj(b);}catch(k){W(b,g,k);}}}catch(k){W(b,b.return,k);}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return;}}
  var mk=Math.ceil,nk=ua.ReactCurrentDispatcher,ok=ua.ReactCurrentOwner,pk=ua.ReactCurrentBatchConfig,K=0,R=null,Y=null,Z=0,gj=0,fj=Uf(0),T=0,qk=null,hh=0,rk=0,sk=0,tk=null,uk=null,gk=0,Hj=Infinity,vk=null,Pi=!1,Qi=null,Si=null,wk=!1,xk=null,yk=0,zk=0,Ak=null,Bk=-1,Ck=0;function L(){return 0!==(K&6)?B():-1!==Bk?Bk:Bk=B()}
  function lh(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Ck&&(Ck=yc()),Ck;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function mh(a,b,c,d){if(50<zk)throw zk=0,Ak=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==R)a===R&&(0===(K&2)&&(rk|=c),4===T&&Dk(a,Z)),Ek(a,d),1===c&&0===K&&0===(b.mode&1)&&(Hj=B()+500,fg&&jg());}
  function Ek(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===R?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Fk.bind(null,a)):hg(Fk.bind(null,a)),Jf(function(){0===(K&6)&&jg();}),c=null;else {switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc;}c=Gk(c,Hk.bind(null,a));}a.callbackPriority=b;a.callbackNode=c;}}
  function Hk(a,b){Bk=-1;Ck=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Ik()&&a.callbackNode!==c)return null;var d=uc(a,a===R?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Jk(a,d);else {b=d;var e=K;K|=2;var f=Kk();if(R!==a||Z!==b)vk=null,Hj=B()+500,Lk(a,b);do try{Mk();break}catch(h){Nk(a,h);}while(1);Qg();nk.current=f;K=e;null!==Y?b=0:(R=null,Z=0,b=T);}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Ok(a,e)));if(1===b)throw c=qk,Lk(a,0),Dk(a,d),Ek(a,B()),c;if(6===b)Dk(a,d);
  else {e=a.current.alternate;if(0===(d&30)&&!Pk(e)&&(b=Jk(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Ok(a,f))),1===b))throw c=qk,Lk(a,0),Dk(a,d),Ek(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Qk(a,uk,vk);break;case 3:Dk(a,d);if((d&130023424)===d&&(b=gk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){L();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Qk.bind(null,a,uk,vk),b);break}Qk(a,uk,vk);break;case 4:Dk(a,d);if((d&4194240)===
  d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f;}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*mk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Qk.bind(null,a,uk,vk),d);break}Qk(a,uk,vk);break;case 5:Qk(a,uk,vk);break;default:throw Error(p(329));}}}Ek(a,B());return a.callbackNode===c?Hk.bind(null,a):null}
  function Ok(a,b){var c=tk;a.current.memoizedState.isDehydrated&&(Lk(a,b).flags|=256);a=Jk(a,b);2!==a&&(b=uk,uk=c,null!==b&&Gj(b));return a}function Gj(a){null===uk?uk=a:uk.push.apply(uk,a);}
  function Pk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return !1}catch(g){return !1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else {if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return !0;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return !0}
  function Dk(a,b){b&=~sk;b&=~rk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d;}}function Fk(a){if(0!==(K&6))throw Error(p(327));Ik();var b=uc(a,0);if(0===(b&1))return Ek(a,B()),null;var c=Jk(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Ok(a,d));}if(1===c)throw c=qk,Lk(a,0),Dk(a,b),Ek(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Qk(a,uk,vk);Ek(a,B());return null}
  function Rk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Hj=B()+500,fg&&jg());}}function Sk(a){null!==xk&&0===xk.tag&&0===(K&6)&&Ik();var b=K;K|=1;var c=pk.transition,d=C;try{if(pk.transition=null,C=1,a)return a()}finally{C=d,pk.transition=c,K=b,0===(K&6)&&jg();}}function Ij(){gj=fj.current;E(fj);}
  function Lk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:Jh();E(Wf);E(H);Oh();break;case 5:Lh(d);break;case 4:Jh();break;case 13:E(M);break;case 19:E(M);break;case 10:Rg(d.type._context);break;case 22:case 23:Ij();}c=c.return;}R=a;Y=a=wh(a.current,null);Z=gj=b;T=0;qk=null;sk=rk=hh=0;uk=tk=null;if(null!==Wg){for(b=
  0;b<Wg.length;b++)if(c=Wg[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g;}c.pending=d;}Wg=null;}return a}
  function Nk(a,b){do{var c=Y;try{Qg();Ph.current=ai;if(Sh){for(var d=N.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next;}Sh=!1;}Rh=0;P=O=N=null;Th=!1;Uh=0;ok.current=null;if(null===c||null===c.return){T=1;qk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
  m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null);}var y=Vi(g);if(null!==y){y.flags&=-257;Wi(y,g,h,f,b);y.mode&1&&Ti(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t;}else n.add(k);break a}else {if(0===(b&1)){Ti(f,l,b);uj();break a}k=Error(p(426));}}else if(I&&h.mode&1){var J=Vi(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Wi(J,g,h,f,b);Jg(Ki(k,h));break a}}f=k=Ki(k,h);4!==T&&(T=2);null===tk?tk=[f]:tk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
  b&=-b;f.lanes|=b;var x=Oi(f,k,b);fh(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Si||!Si.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Ri(f,h,b);fh(f,F);break a}}f=f.return;}while(null!==f)}Tk(c);}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Kk(){var a=nk.current;nk.current=ai;return null===a?ai:a}
  function uj(){if(0===T||3===T||2===T)T=4;null===R||0===(hh&268435455)&&0===(rk&268435455)||Dk(R,Z);}function Jk(a,b){var c=K;K|=2;var d=Kk();if(R!==a||Z!==b)vk=null,Lk(a,b);do try{Uk();break}catch(e){Nk(a,e);}while(1);Qg();K=c;nk.current=d;if(null!==Y)throw Error(p(261));R=null;Z=0;return T}function Uk(){for(;null!==Y;)Vk(Y);}function Mk(){for(;null!==Y&&!cc();)Vk(Y);}function Vk(a){var b=Wk(a.alternate,a,gj);a.memoizedProps=a.pendingProps;null===b?Tk(a):Y=b;ok.current=null;}
  function Tk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Fj(c,b,gj),null!==c){Y=c;return}}else {c=Jj(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else {T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a;}while(null!==b);0===T&&(T=5);}function Qk(a,b,c){var d=C,e=pk.transition;try{pk.transition=null,C=1,Xk(a,b,c,d);}finally{pk.transition=e,C=d;}return null}
  function Xk(a,b,c,d){do Ik();while(null!==xk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===R&&(Y=R=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||wk||(wk=!0,Gk(hc,function(){Ik();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=pk.transition;pk.transition=null;
  var g=C;C=1;var h=K;K|=4;ok.current=null;Pj(a,c);ek(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;ik(c);dc();K=h;C=g;pk.transition=f;}else a.current=c;wk&&(wk=!1,xk=a,yk=e);f=a.pendingLanes;0===f&&(Si=null);mc(c.stateNode);Ek(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Pi)throw Pi=!1,a=Qi,Qi=null,a;0!==(yk&1)&&0!==a.tag&&Ik();f=a.pendingLanes;0!==(f&1)?a===Ak?zk++:(zk=0,Ak=a):zk=0;jg();return null}
  function Ik(){if(null!==xk){var a=Dc(yk),b=pk.transition,c=C;try{pk.transition=null;C=16>a?16:a;if(null===xk)var d=!1;else {a=xk;xk=null;yk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Qj(8,m,f);}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Tj(m);if(m===
  l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y;}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J;}while(null!==t)}}V=f;}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Qj(9,f,f.return);}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return;}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
  u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Rj(9,h);}}catch(na){W(h,h.return,na);}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return;}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a);}catch(na){}d=!0;}return d}finally{C=c,pk.transition=b;}}return !1}function Yk(a,b,c){b=Ki(c,b);b=Oi(a,b,1);a=dh(a,b,1);b=L();null!==a&&(Ac(a,1,b),Ek(a,b));}
  function W(a,b,c){if(3===a.tag)Yk(a,a,c);else for(;null!==b;){if(3===b.tag){Yk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Si||!Si.has(d))){a=Ki(c,a);a=Ri(b,a,1);b=dh(b,a,1);a=L();null!==b&&(Ac(b,1,a),Ek(b,a));break}}b=b.return;}}
  function Ui(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=L();a.pingedLanes|=a.suspendedLanes&c;R===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-gk?Lk(a,0):sk|=c);Ek(a,b);}function Zk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=L();a=Zg(a,b);null!==a&&(Ac(a,b,c),Ek(a,c));}function vj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Zk(a,c);}
  function ck(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Zk(a,c);}var Wk;
  Wk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)Ug=!0;else {if(0===(a.lanes&c)&&0===(b.flags&128))return Ug=!1,zj(a,b,c);Ug=0!==(a.flags&131072)?!0:!1;}else Ug=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;jj(a,b);a=b.pendingProps;var e=Yf(b,H.current);Tg(b,c);e=Xh(null,b,d,a,e,c);var f=bi();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
  null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ah(b),e.updater=nh,b.stateNode=e,e._reactInternals=b,rh(b,d,a,c),b=kj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Yi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{jj(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=$k(d);a=Lg(d,a);switch(e){case 0:b=dj(null,b,d,a,c);break a;case 1:b=ij(null,b,d,a,c);break a;case 11:b=Zi(null,b,d,a,c);break a;case 14:b=aj(null,b,d,Lg(d.type,a),c);break a}throw Error(p(306,
  d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),dj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),ij(a,b,d,e,c);case 3:a:{lj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;bh(a,b);gh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
  f,b.memoizedState=f,b.flags&256){e=Ki(Error(p(423)),b);b=mj(a,b,d,c,e);break a}else if(d!==e){e=Ki(Error(p(424)),b);b=mj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Ch(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else {Ig();if(d===e){b=$i(a,b,c);break a}Yi(a,b,d,c);}b=b.child;}return b;case 5:return Kh(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
  hj(a,b),Yi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return pj(a,b,c);case 4:return Ih(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Bh(b,null,d,c):Yi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),Zi(a,b,d,e,c);case 7:return Yi(a,b,b.pendingProps,c),b.child;case 8:return Yi(a,b,b.pendingProps.children,c),b.child;case 12:return Yi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
  g=e.value;G(Mg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=$i(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=ch(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k;}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);Sg(f.return,
  c,b);h.lanes|=c;break}k=k.next;}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);Sg(g,c,b);g=f.sibling;}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return;}f=g;}Yi(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,d=b.pendingProps.children,Tg(b,c),e=Vg(e),d=d(e),b.flags|=1,Yi(a,b,d,c),
  b.child;case 14:return d=b.type,e=Lg(d,b.pendingProps),e=Lg(d.type,e),aj(a,b,d,e,c);case 15:return cj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),jj(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,Tg(b,c),ph(b,d,e),rh(b,d,e,c),kj(null,b,d,!0,a,c);case 19:return yj(a,b,c);case 22:return ej(a,b,c)}throw Error(p(156,b.tag));};function Gk(a,b){return ac(a,b)}
  function al(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null;}function Bg(a,b,c,d){return new al(a,b,c,d)}function bj(a){a=a.prototype;return !(!a||!a.isReactComponent)}
  function $k(a){if("function"===typeof a)return bj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
  function wh(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
  c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
  function yh(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)bj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Ah(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return qj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
  break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Ah(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function qj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function xh(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
  function zh(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
  function bl(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
  null;}function cl(a,b,c,d,e,f,g,h,k){a=new bl(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};ah(f);return a}function dl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
  function el(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return;}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
  function fl(a,b,c,d,e,f,g,h,k){a=cl(c,d,!0,a,e,f,g,h,k);a.context=el(null);c=a.current;d=L();e=lh(c);f=ch(d,e);f.callback=void 0!==b&&null!==b?b:null;dh(c,f,e);a.current.lanes=e;Ac(a,e,d);Ek(a,d);return a}function gl(a,b,c,d){var e=b.current,f=L(),g=lh(e);c=el(c);null===b.context?b.context=c:b.pendingContext=c;b=ch(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=dh(e,b,g);null!==a&&(mh(a,e,g,f),eh(a,e,g));return g}
  function hl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function il(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b;}}function jl(a,b){il(a,b);(a=a.alternate)&&il(a,b);}function kl(){return null}var ll="function"===typeof reportError?reportError:function(a){console.error(a);};function ml(a){this._internalRoot=a;}
  nl.prototype.render=ml.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));gl(a,b,null,null);};nl.prototype.unmount=ml.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Sk(function(){gl(null,a,null,null);});b[uf]=null;}};function nl(a){this._internalRoot=a;}
  nl.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a);}};function ol(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function pl(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function ql(){}
  function rl(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=hl(g);f.call(a);};}var g=fl(b,d,a,0,null,!1,!1,"",ql);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Sk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=hl(k);h.call(a);};}var k=cl(a,0,!1,null,null,!1,!1,"",ql);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Sk(function(){gl(b,k,c,d);});return k}
  function sl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=hl(g);h.call(a);};}gl(b,g,a,e);}else g=rl(c,b,a,e,d);return hl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Ek(b,B()),0===(K&6)&&(Hj=B()+500,jg()));}break;case 13:Sk(function(){var b=Zg(a,1);if(null!==b){var c=L();mh(b,a,1,c);}}),jl(a,1);}};
  Fc=function(a){if(13===a.tag){var b=Zg(a,134217728);if(null!==b){var c=L();mh(b,a,134217728,c);}jl(a,134217728);}};Gc=function(a){if(13===a.tag){var b=lh(a),c=Zg(a,b);if(null!==c){var d=L();mh(c,a,b,d);}jl(a,b);}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c;}};
  yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e);}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1);}};Gb=Rk;Hb=Sk;
  var tl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Rk]},ul={findFiberByHostInstance:Wc,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"};
  var vl={bundleType:ul.bundleType,version:ul.version,rendererPackageName:ul.rendererPackageName,rendererConfig:ul.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:ul.findFiberByHostInstance||
  kl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var wl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wl.isDisabled&&wl.supportsFiber)try{kc=wl.inject(vl),lc=wl;}catch(a){}}reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tl;
  reactDom_production_min.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!ol(b))throw Error(p(200));return dl(a,b,null,c)};reactDom_production_min.createRoot=function(a,b){if(!ol(a))throw Error(p(299));var c=!1,d="",e=ll;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=cl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ml(b)};
  reactDom_production_min.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};reactDom_production_min.flushSync=function(a){return Sk(a)};reactDom_production_min.hydrate=function(a,b,c){if(!pl(b))throw Error(p(200));return sl(null,a,b,!0,c)};
  reactDom_production_min.hydrateRoot=function(a,b,c){if(!ol(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=ll;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=fl(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
  e);return new nl(b)};reactDom_production_min.render=function(a,b,c){if(!pl(b))throw Error(p(200));return sl(null,a,b,!1,c)};reactDom_production_min.unmountComponentAtNode=function(a){if(!pl(a))throw Error(p(40));return a._reactRootContainer?(Sk(function(){sl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null;});}),!0):!1};reactDom_production_min.unstable_batchedUpdates=Rk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!pl(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return sl(a,b,c,!1,d)};reactDom_production_min.version="18.2.0-next-9e3b772b8-20220608";

  (function (module) {

  	function checkDCE() {
  	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  	  if (
  	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
  	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  	  ) {
  	    return;
  	  }
  	  try {
  	    // Verify that the code above has been dead code eliminated (DCE'd).
  	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  	  } catch (err) {
  	    // DevTools shouldn't crash React, no matter what.
  	    // We should still report in case we break this code.
  	    console.error(err);
  	  }
  	}

  	{
  	  // DCE check should happen before ReactDOM bundle executes so that
  	  // DevTools can report bad minification during injection.
  	  checkDCE();
  	  module.exports = reactDom_production_min;
  	}
  } (reactDom));

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
    return reactDomExports.createPortal(/* @__PURE__ */ React.createElement("div", __spreadProps$n(__spreadValues$D({
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
          return /*#__PURE__*/ React.createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
              ref: forwardedRef
          }), /*#__PURE__*/ React.isValidElement(newElement) ? /*#__PURE__*/ React.cloneElement(newElement, undefined, newChildren) : null);
      }
      return /*#__PURE__*/ React.createElement($5e63c961fc1ce211$var$SlotClone, _extends({}, slotProps, {
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
          return /*#__PURE__*/ React.createElement(Comp, _extends({}, primitiveProps, {
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
                  reactDomExports.flushSync(()=>send('ANIMATION_END')
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
      }, /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
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
      }), /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
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
      return context.type === 'hover' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarHover, _extends({}, scrollbarProps, {
          ref: forwardedRef,
          forceMount: forceMount
      })) : context.type === 'scroll' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarScroll, _extends({}, scrollbarProps, {
          ref: forwardedRef,
          forceMount: forceMount
      })) : context.type === 'auto' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarAuto, _extends({}, scrollbarProps, {
          ref: forwardedRef,
          forceMount: forceMount
      })) : context.type === 'always' ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarVisible, _extends({}, scrollbarProps, {
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
      }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarAuto, _extends({
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
      }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarVisible, _extends({
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
      }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarVisible, _extends({
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
      if (orientation === 'horizontal') return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarX, _extends({}, commonProps, {
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
      if (orientation === 'vertical') return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarY, _extends({}, commonProps, {
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
      return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarImpl, _extends({
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
      return /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaScrollbarImpl, _extends({
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
      }, /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, scrollbarProps, {
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
      }, /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaThumbImpl, _extends({
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
      return /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
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
      return hasCorner ? /*#__PURE__*/ React.createElement($57acba87d6e25586$var$ScrollAreaCornerImpl, _extends({}, props, {
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
      return hasSize ? /*#__PURE__*/ React.createElement($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, cornerProps, {
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
          reactDomExports.flushSync(() => {
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
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFla0MiLCJmaWxlIjoiVGFibGUuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgY3NzLCBjeCwgQ2FjaGVQcm92aWRlciB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBjcmVhdGVDYWNoZSBmcm9tICdAZW1vdGlvbi9jYWNoZSc7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgRmxleCwgTW9kYWwsIFBvcG92ZXIsIFNlbGVjdCwgU3RhY2ssIFRleHRJbnB1dCwgVG9vbHRpcCB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuaW1wb3J0IHsgIGNyZWF0ZUVtb3Rpb25DYWNoZSwgTWFudGluZVByb3ZpZGVyIH0gZnJvbSAnQG1hbnRpbmUvY29yZSc7XG5cbmltcG9ydCB7IEJzU2VhcmNoLCBCc1RyaWFuZ2xlRmlsbCB9IGZyb20gJ3JlYWN0LWljb25zL2JzJztcbmltcG9ydCB7IEZpRmlsdGVyIH0gZnJvbSAncmVhY3QtaWNvbnMvZmknO1xuaW1wb3J0IHsgVGJUYWJsZUV4cG9ydCB9IGZyb20gJ3JlYWN0LWljb25zL3RiJztcblxuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICd0aHJvdHRsZS1kZWJvdW5jZSc7XG5cbmNvbnN0IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMgPSA1MDA7XG5cbmNvbnN0IGFzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuYDtcbmNvbnN0IGFzY2VuZGluZ1NlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogIzIxMjUyOTtcbmA7XG5jb25zdCBkZXNjZW5kaW5nRGVzZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICNhZGI1YmQ7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ1NlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogIzIxMjUyOTtcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbmA7XG5jb25zdCB0YWJsZUNzcyA9IGNzc2BcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgY29sb3I6ICNkZWUyZTY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTI1Mjk7XG5cbiAgdGgsIHRkIHtcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0aGVhZCB0aCB7XG4gICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5ICsgdGJvZHkge1xuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGJvZHkgdHI6bnRoLW9mLXR5cGUoZXZlbikge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzMwMzQ7XG4gIH1cbmA7XG5cbmNvbnN0IFRhYmxlQ29udHJvbCA9ICh7XG4gIGV4cG9ydFRhYmxlLFxuICBudW1SZWNvcmRzLFxuICBzb3J0RmllbGRzLFxuICBzZXRTb3J0RmllbGRzLFxuICBzZWFyY2gsXG4gIHNldFNlYXJjaCxcbiAgcGFnZSxcbiAgc2V0UGFnZSxcbiAgcGFnZUxlbmd0aCxcbiAgc2V0UGFnZUxlbmd0aCxcbiAgcGFnZUxlbmd0aENob2ljZXMsXG4gIHBhZ2VDb3VudCxcbiAgZGVib3VuY2VUaW1lLFxufSkgPT4ge1xuICBjb25zdCBbc2VhcmNoSW5wdXQsIHNldFNlYXJjaElucHV0XSA9IFJlYWN0LnVzZVN0YXRlKHNlYXJjaC5nbG9iYWwpO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG5cbiAgICBjb25zdCBkZWJvdW5jZUZ1bmMgPSBkZWJvdW5jZShkZWJvdW5jZVRpbWUgPz8gREVCT1VOQ0VfSU5QVVRfVElNRV9NUywgKCkgPT4ge1xuICAgICAgc2V0U2VhcmNoKHsuLi5zZWFyY2gsIGdsb2JhbDogc2VhcmNoSW5wdXR9KTtcbiAgICB9LCB7YXRCZWdpbjogZmFsc2V9KTtcblxuICAgIGRlYm91bmNlRnVuYygpO1xuICAgIHJldHVybigoKSA9PiB7XG4gICAgICBkZWJvdW5jZUZ1bmMuY2FuY2VsKCk7XG4gICAgfSk7XG4gIH0sIFtzZWFyY2hJbnB1dF0pO1xuXG4gIGZ1bmN0aW9uIF9zZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpe1xuICAgIGxldCBmaXJzdEVudHJ5ID0gKChwYWdlIC0gMSkgKiBwYWdlTGVuZ3RoKSArIDE7XG4gICAgbGV0IGZpcnN0RW50cnlQYWdlID0gTWF0aC5jZWlsKGZpcnN0RW50cnkgLyBwYWdlTGVuZ3RoKTtcblxuICAgIHNldFBhZ2UoZmlyc3RFbnRyeVBhZ2UpO1xuICAgIHNldFBhZ2VMZW5ndGgocGFnZUxlbmd0aCk7XG4gIH1cblxuICBsZXQgcGFnZUxlbmd0aE9wdGlvbnMgPSBbXTtcbiAgdmFyIGFkZE5leHRQYWdlT3B0aW9uID0gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlTGVuZ3RoQ2hvaWNlcy5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IHBhZ2VMZW5ndGggPSBwYWdlTGVuZ3RoQ2hvaWNlc1tpXTtcbiAgICBzd2l0Y2ggKHBhZ2VMZW5ndGggPCBudW1SZWNvcmRzKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgcGFnZUxlbmd0aE9wdGlvbnMucHVzaCh7IHZhbHVlOiBwYWdlTGVuZ3RoLnRvU3RyaW5nKCksIGxhYmVsOiBwYWdlTGVuZ3RoLnRvU3RyaW5nKCkgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnZUxlbmd0aE9wdGlvbnMucHVzaCh7IHZhbHVlOiBudW1SZWNvcmRzLnRvU3RyaW5nKCksIGxhYmVsOiAnQUxMJyB9KTtcbiAgICAgICAgYWRkTmV4dFBhZ2VPcHRpb24gPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICghYWRkTmV4dFBhZ2VPcHRpb24pe1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbGV0IHBhZ2luYXRpb25CdXR0b25zID0gW107XG4gIHN3aXRjaCAocGFnZSA8PSA0KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKDEpfVxuICAgICAgICA+XG4gICAgICAgICAgPGI+e1N0cmluZy5mcm9tQ2hhckNvZGUoNjApICsgU3RyaW5nLmZyb21DaGFyQ29kZSg2MCl9PC9iPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIHRydWU6XG4gICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAga2V5PVwiPDxcIlxuICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHt9fVxuICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICA+XG4gICAgICAgICAgPGI+e1N0cmluZy5mcm9tQ2hhckNvZGUoNjApICsgU3RyaW5nLmZyb21DaGFyQ29kZSg2MCl9PC9iPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgfVxuICBmb3IgKGxldCBpID0gcGFnZSAtIDM7IGkgPCBwYWdlOyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPCAxKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgIDxCdXR0b25cbiAgICAgIGtleT17cGFnZX1cbiAgICA+XG4gICAgICA8Yj57XCJQYWdlIFwiICsgcGFnZSArIFwiIG9mIFwiICsgcGFnZUNvdW50fTwvYj5cbiAgICA8L0J1dHRvbj5cbiAgKTtcbiAgZm9yIChsZXQgaSA9IHBhZ2UgKyAxOyBpIDwgcGFnZSArIDQ7IGkgKyspe1xuICAgIHN3aXRjaCAoaSA+IHBhZ2VDb3VudCl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgIH1cbiAgfVxuICBzd2l0Y2ggKChwYWdlICsgNCkgPiBwYWdlQ291bnQpe1xuICAgIGNhc2UgZmFsc2U6XG4gICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAga2V5PVwiPj5cIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UocGFnZUNvdW50KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjIpfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjIpfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4oXG4gICAgPEZsZXhcbiAgICAgIGFsaWduPVwidG9wXCJcbiAgICAgIGdhcD1cInhzXCJcbiAgICA+XG4gICAgICA8VG9vbHRpcFxuICAgICAgICBsYWJlbD1cIkV4cG9ydCBEYXRhIGFzIENTVlwiXG4gICAgICA+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBsZWZ0SWNvbj17PFRiVGFibGVFeHBvcnQgLz59XG4gICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBleHBvcnRUYWJsZSgpfVxuICAgICAgICA+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgPC9Ub29sdGlwPlxuICAgICAgPFNlbGVjdFxuICAgICAgICBsYWJlbD1cIlBhZ2UgTGVuZ3RoXCJcbiAgICAgICAgdmFsdWU9eyhwYWdlTGVuZ3RoT3B0aW9ucy5tYXAoKHgsIGkpID0+IHBhcnNlSW50KHgudmFsdWUpKS5pbmNsdWRlcyhwYXJzZUludChwYWdlTGVuZ3RoKSkgPyBwYWdlTGVuZ3RoLnRvU3RyaW5nKCkgOiBwYWdlTGVuZ3RoT3B0aW9uc1swXS52YWx1ZS50b1N0cmluZygpKX1cbiAgICAgICAgb25DaGFuZ2U9eyh2YWx1ZSkgPT4gX3NldFBhZ2VMZW5ndGgocGFyc2VJbnQodmFsdWUpKX1cbiAgICAgICAgZGF0YT17cGFnZUxlbmd0aE9wdGlvbnN9XG4gICAgICAvPlxuICAgICAgPEZsZXhcbiAgICAgICAgZ2FwPVwieHNcIlxuICAgICAgPlxuICAgICAgICB7cGFnaW5hdGlvbkJ1dHRvbnN9XG4gICAgICA8L0ZsZXg+XG4gICAgICA8RmxleFxuICAgICAgICBhbGlnbj1cImNlbnRlclwiXG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgICAgY3NzPXtjc3NgXG4gICAgICAgICAgbWluLXdpZHRoOiAxNTBweDtcbiAgICAgICAgYH1cbiAgICAgID5cbiAgICAgICAgPEJzU2VhcmNoLz5cbiAgICAgICAgPFRleHRJbnB1dFxuICAgICAgICAgIHZhbHVlPXtzZWFyY2hJbnB1dH1cbiAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAvPlxuICAgICAgPC9GbGV4PlxuICAgIDwvRmxleD5cbiAgKTtcbn1cblxuY29uc3QgVGFibGVIZWFkZXIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5zZWFyY2hbcHJvcHMuY29sdW1uX2tleV0pO1xuICBjb25zdCBbc2VhcmNoTW9kYWxPcGVuLCBzZXRTZWFyY2hNb2RhbE9wZW5dID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG5cbiAgICBjb25zdCBkZWJvdW5jZUZ1bmMgPSBkZWJvdW5jZShwcm9wcy5kZWJvdW5jZVRpbWUgPz8gREVCT1VOQ0VfSU5QVVRfVElNRV9NUywgKCkgPT4ge1xuICAgICAgcHJvcHMuc2V0U2VhcmNoKHsuLi5wcm9wcy5zZWFyY2gsIGZpZWxkczogey4uLnByb3BzLnNlYXJjaC5maWVsZHMsIFtwcm9wcy5jb2x1bW5fa2V5XTogc2VhcmNoSW5wdXR9fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBzb3J0RmllbGRDbGljayhldmVudCl7XG4gICAgdmFyIHRoaXNfZmllbGRfcmV2ZXJzZSA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICAgIGxldCBzb3J0RmllbGQgPSBwcm9wcy5zb3J0RmllbGRzW2ldO1xuICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgIHRoaXNfZmllbGRfcmV2ZXJzZSA9IHNvcnRGaWVsZFsncmV2ZXJzZSddO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBuZXdfc29ydF9maWVsZHMgPSBbXTtcbiAgICBzd2l0Y2goZXZlbnQuc2hpZnRLZXkpe1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgc3dpdGNoICh0aGlzX2ZpZWxkX3JldmVyc2Upe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogdHJ1ZX0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICB2YXIgY3VycmVudF9rZXlfaW5jbHVkZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICAgICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgICAgICBpZiAoc29ydEZpZWxkWydrZXknXSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgICAgICAgIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogdHJ1ZX0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgY2FzZSBudWxsOlxuICAgICAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goc29ydEZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjdXJyZW50X2tleV9pbmNsdWRlZCl7XG4gICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IGZhbHNlfSlcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc29sZS5sb2cobmV3X3NvcnRfZmllbGRzKTtcbiAgICBwcm9wcy5zZXRTb3J0RmllbGRzKG5ld19zb3J0X2ZpZWxkcyk7XG4gIH1cblxuICB2YXIgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ0Rlc2VsZWN0ZWRDc3N9Lz47XG4gIHZhciBkZXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2Rlc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgY29sdW1uX3NvcnRfbWV0YSA9IHtcbiAgICAnc3ltYm9sJzogbnVsbCxcbiAgICAnaW5kZXgnOiBudWxsLFxuICB9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLnNvcnRGaWVsZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgIGxldCBzb3J0RmllbGQgPSBwcm9wcy5zb3J0RmllbGRzW2ldO1xuICAgIGlmIChzb3J0RmllbGQua2V5ID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgc3dpdGNoIChzb3J0RmllbGQucmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBkZXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2Rlc2NlbmRpbmdTZWxlY3RlZENzc30vPjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhc2NlbmRpbmdJY29uID0gPEJzVHJpYW5nbGVGaWxsIGNzcz17YXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbHVtbl9zb3J0X21ldGEuaW5kZXggPSBpICsgMTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN3YXBDb2x1bW5zKGNvbHVtbkEsIGNvbHVtbkIsIGluZGV4QSwgYmVmb3JlKXtcblxuICAgIGlmIChjb2x1bW5BID09IGNvbHVtbkIpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAoKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSAmJiAocHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzW2NvbHVtbkFdID09IG51bGwpKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgcmV0dXJuO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgbGV0IG5ld0NvbHVtbk9yZGVyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgbGV0IG9yZGVyQ29sdW1uS2V5ID0gcHJvcHMuY29sdW1ucy5vcmRlcltpXTtcbiAgICAgICAgICBzd2l0Y2ggKChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKSB8fCAob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQikpe1xuICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChvcmRlckNvbHVtbktleSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBzd2l0Y2ggKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkEpe1xuICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgICBzd2l0Y2ggKE1hdGguc2lnbihNYXRoLmFicyhpIC0gaW5kZXhBKSAtIDEpKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGluZGV4QSA8IGkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYmVmb3JlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwcm9wcy5zZXRDb2x1bW5zKHtpbmRleDogcHJvcHMuY29sdW1ucy5pbmRleCwgb3JkZXI6IG5ld0NvbHVtbk9yZGVyLCBhdHRyaWJ1dGVzOiBwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXN9KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gb25EcmFnU3RhcnRIYW5kbGUoZXZlbnQsIGNvbHVtbl9rZXksIGNvbHVtbl9pbmRleCl7XG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2luaXRpYXRvcktleScsIGNvbHVtbl9rZXkpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JJbmRleCcsIGNvbHVtbl9pbmRleCk7XG4gIH1cbiAgZnVuY3Rpb24gb25Ecm9wSGFuZGxlKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBjb2x1bW5BID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvcktleScpO1xuICAgIGxldCBpbmRleEEgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnKTtcblxuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgdmFyIGNvbHVtbkI7XG4gICAgd2hpbGUgKCFjb2x1bW5CKXtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKCF0YXJnZXQpe1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb2x1bW5CID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXknKTtcbiAgICB9XG5cbiAgICBsZXQgYm91bmRpbmdCb3ggPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGJlZm9yZSA9IGV2ZW50LnggPD0gKChib3VuZGluZ0JveC5sZWZ0ICsgYm91bmRpbmdCb3gucmlnaHQpIC8gMik7XG5cbiAgICBzd2l0Y2ggKGNvbHVtbkIgPT0gbnVsbCl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3YXBDb2x1bW5zKGNvbHVtbkEsIGNvbHVtbkIsIGluZGV4QSwgYmVmb3JlKTtcbiAgICB9XG4gIH1cbiAgY29uc29sZS5sb2cocHJvcHMpO1xuICByZXR1cm4oXG4gICAgPHRoPlxuICAgICAgPFN0YWNrXG4gICAgICAgIHNwYWNpbmc9ezB9XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9eyhlbGVtZW50KSA9PiByZWYuY3VycmVudFtwcm9wcy5jb2x1bW5faW5kZXhdID0gZWxlbWVudH1cbiAgICAgICAgICBkYXRhLXJhcmUtZWFydGgtY29sdW1uLWtleT17cHJvcHMuY29sdW1uX2tleX1cbiAgICAgICAgICBkcmFnZ2FibGU9J3RydWUnXG4gICAgICAgICAgb25EcmFnU3RhcnQ9eyhldmVudCkgPT4gb25EcmFnU3RhcnRIYW5kbGUoZXZlbnQsIHByb3BzLmNvbHVtbl9rZXksIHByb3BzLmNvbHVtbl9pbmRleCl9XG4gICAgICAgICAgb25EcmFnT3Zlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJhZ0VudGVyPXsoZXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCl9XG4gICAgICAgICAgb25Ecm9wPXsoZXZlbnQpID0+IG9uRHJvcEhhbmRsZShldmVudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8RmxleCBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgbS0xXCJcbiAgICAgICAgICAgICAgc3R5bGVzPXt7cm9vdDoge2JhY2tncm91bmRDb2xvcjogXCIjNDk1MDU3XCIsIGNvbG9yOiBcIiMyMTI1MjlcIn19fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHNvcnRGaWVsZENsaWNrKGV2ZW50KX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIiBqdXN0aWZ5PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAge2NvbHVtbl9zb3J0X21ldGEuaW5kZXh9XG4gICAgICAgICAgICAgICAgPFN0YWNrIHNwYWNpbmc9ezR9IGNsYXNzTmFtZT1cIm0tMVwiPlxuICAgICAgICAgICAgICAgICAge2FzY2VuZGluZ0ljb259XG4gICAgICAgICAgICAgICAgICB7ZGVzY2VuZGluZ0ljb259XG4gICAgICAgICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgICAgICAgPC9GbGV4PlxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICB7cHJvcHMuY29sdW1uLmxhYmVsID8/IHByb3BzLmNvbHVtbl9rZXkudG9TdHJpbmcoKX1cbiAgICAgICAgICA8L0ZsZXg+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8RmxleCBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hJbnB1dCA/PyAnJ31cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHNldFNlYXJjaElucHV0KChldmVudC50YXJnZXQudmFsdWUgPT0gJycpID8gbnVsbCA6IGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICBjc3M9e2Nzc2B3aWR0aDogMTAwJTtgfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRmxleD5cbiAgICAgIDwvU3RhY2s+XG4gICAgPC90aD5cbiAgKTtcbn0pO1xuXG5jb25zdCBUYWJsZSA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcblxuICBjb25zdCBbY29sdW1ucywgc2V0Q29sdW1uc10gPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgX2luZGV4S2V5OiBjcnlwdG8ucmFuZG9tVVVJRCgpLFxuICAgIG9yZGVyOiAocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiB4LmtleSksXG4gICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgfSk7XG4gIGNvbnN0IFtyZWNvcmRzLCBzZXRSZWNvcmRzXSA9IFJlYWN0LnVzZVN0YXRlKHByb3BzLnJlY29yZHMgPz8gW10pO1xuXG4gIGNvbnN0IFtwYWdlTGVuZ3RoLCBzZXRQYWdlTGVuZ3RoXSA9IFJlYWN0LnVzZVN0YXRlKHByb3BzLmluaXRpYWxQYWdlTGVuZ3RoID8/IDEwKTtcbiAgY29uc3QgW3BhZ2VMZW5ndGhDaG9pY2VzLCBzZXRQYWdlTGVuZ3RoQ2hvaWNlc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5wYWdlTGVuZ3RoQ2hvaWNlcyA/PyBbMTAsIDIwLCA1MCwgMTAwLCBJbmZpbml0eV0pO1xuICBjb25zdCBbcGFnZSwgc2V0UGFnZV0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZSA/PyAxKTtcblxuICBjb25zdCBbc29ydEZpZWxkcywgc2V0U29ydEZpZWxkc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsU29ydEZpZWxkcyA/PyBbXSk7XG4gIGNvbnN0IFtzZWFyY2gsIHNldFNlYXJjaF0gPSBSZWFjdC51c2VTdGF0ZSh7XG4gICAgZ2xvYmFsOiBudWxsLFxuICAgIGZpZWxkczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgbnVsbF0pKSxcbiAgfSk7XG5cbiAgY29uc3QgaGVhZGVyUmVmcyA9IFJlYWN0LnVzZVJlZih7fSk7XG5cbiAgZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVGdW5jKGEsIGIpe1xuICAgIHN3aXRjaChhID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaChiID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgc3dpdGNoKGEgPT0gYil7XG4gICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICBzd2l0Y2goYSA8IGIpe1xuICAgICAgICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gY29tcGFyZVJlY29yZHMocmVjb3JkQSwgcmVjb3JkQil7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0RmllbGRzLmxlbmd0aDsgaSsrKXtcblxuICAgICAgbGV0IHNvcnRGaWVsZCA9IHNvcnRGaWVsZHNbaV1bJ2tleSddO1xuICAgICAgbGV0IHJldmVyc2UgPSBzb3J0RmllbGRzW2ldWydyZXZlcnNlJ107XG4gICAgICBsZXQgY29tcGFyZUZ1bmMgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS5jb21wYXJlRnVuYztcblxuICAgICAgdmFyIGFWYWw7XG4gICAgICB2YXIgYlZhbDtcbiAgICAgIHN3aXRjaCAoY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIGFWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQSk7XG4gICAgICAgICAgYlZhbCA9IGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyhyZWNvcmRCKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIGFWYWwgPSByZWNvcmRBW3NvcnRGaWVsZF07XG4gICAgICAgICAgYlZhbCA9IHJlY29yZEJbc29ydEZpZWxkXVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29tcGFyZVZhbDtcbiAgICAgIHN3aXRjaChyZXZlcnNlKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBzd2l0Y2ggKGNvbXBhcmVGdW5jID09IG51bGwpe1xuICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgY29tcGFyZVZhbCA9IGNvbXBhcmVGdW5jKGFWYWwsIGJWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgY29tcGFyZVZhbCA9IGRlZmF1bHRDb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhiVmFsLCBhVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH07XG4gICAgICBpZiAoY29tcGFyZVZhbCAhPSAwKXtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVWYWw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRDb2x1bW5zKHtcbiAgICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICAgIG9yZGVyOiAocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiB4LmtleSksXG4gICAgICBhdHRyaWJ1dGVzOiBPYmplY3QuZnJvbUVudHJpZXMoKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4gW3gua2V5LCB7Li4ueCwgdmFsdWVGdW5jOiB4Py52YWx1ZUZ1bmMgPz8gKChyZWNvcmQpID0+IHJlY29yZD8uW3gua2V5XSl9XSkpLFxuICAgIH0pO1xuICB9LCBbcHJvcHMuY29sdW1uc10pO1xuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFJlY29yZHMocHJvcHMucmVjb3JkcyA/PyBbXSk7XG4gIH0sIFtwcm9wcy5yZWNvcmRzXSk7XG5cbiAgY29uc3QgZmlsdGVyZWRSZWNvcmRzID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbigpe1xuXG4gICAgY29uc29sZS5kZWJ1ZygnRmlsdGVyaW5nIFJlY29yZHMnKTtcblxuICAgIHZhciBuZXdSZWNvcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWNvcmRzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCByZWNvcmQgPSByZWNvcmRzW2ldO1xuICAgICAgdmFyIGluY2x1ZGUgPSAhQm9vbGVhbihzZWFyY2guZ2xvYmFsKTtcbiAgICAgIGZvciAobGV0IGtleSBpbiBzZWFyY2guZmllbGRzKXtcbiAgICAgICAgbGV0IHJlY29yZENvbXBhcmVTdHIgPSAoY29sdW1ucz8uYXR0cmlidXRlcz8uW2tleV0/LnZhbHVlRnVuYz8uKHJlY29yZCkgPz8gJycpPy50b1N0cmluZz8uKCk/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG5cbiAgICAgICAgbGV0IGdsb2JhbFNlYXJjaCA9IHNlYXJjaC5nbG9iYWw/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSkgJiYgKHJlY29yZENvbXBhcmVTdHI/LmluY2x1ZGVzPy4oZ2xvYmFsU2VhcmNoKSkpe1xuICAgICAgICAgIGluY2x1ZGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGtleVNlYXJjaCA9IHNlYXJjaC5maWVsZHNba2V5XT8udHJpbT8uKCk/LnRvTG93ZXJDYXNlPy4oKTtcbiAgICAgICAgaWYgKCFrZXlTZWFyY2gpe1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGtleVNlYXJjaCkpe1xuICAgICAgICAgIGlmIChCb29sZWFuKHNlYXJjaC5nbG9iYWwpKXtcbiAgICAgICAgICAgIGluY2x1ZGUgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpbmNsdWRlKXtcbiAgICAgICAgbmV3UmVjb3Jkcy5wdXNoKHsuLi5yZWNvcmQsIFtjb2x1bW5zLl9pbmRleEtleV06IGl9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3UmVjb3JkcztcblxuICB9LCBbc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgY29uc3QgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzID0gUmVhY3QudXNlTWVtbyhmdW5jdGlvbigpe1xuXG4gICAgY29uc29sZS5kZWJ1ZygnU29ydGluZyBSZWNvcmRzJyk7XG4gICAgY29uc3Qgc29ydGVkUmVjb3JkcyA9IGZpbHRlcmVkUmVjb3Jkcy5zb3J0KGNvbXBhcmVSZWNvcmRzKTtcblxuICAgIHJldHVybiBzb3J0ZWRSZWNvcmRzO1xuXG4gIH0sIFtzb3J0RmllbGRzLCBzZWFyY2gsIHJlY29yZHNdKTtcblxuICBsZXQgY29sdW1uc19oZWFkZXJzID0gW107XG4gIGlmICgocHJvcHMuaW5kZXggPz8gZmFsc2UpKXtcbiAgICBjb2x1bW5zX2hlYWRlcnMucHVzaCg8dGg+SW5kZXg8L3RoPik7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltpXTtcbiAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPFRhYmxlSGVhZGVyIHJlZj17aGVhZGVyUmVmc30ga2V5PXtrZXl9IGNvbHVtbnM9e2NvbHVtbnN9IHNldENvbHVtbnM9e3NldENvbHVtbnN9IHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9IHNldFNvcnRGaWVsZHM9e3NldFNvcnRGaWVsZHN9IHNlYXJjaD17c2VhcmNofSBzZXRTZWFyY2g9e3NldFNlYXJjaH0gY29sdW1uX2luZGV4PXtpfSBjb2x1bW5fa2V5PXtrZXl9IGNvbHVtbj17Y29sdW1ufSAvPilcbiAgfVxuXG4gIGxldCBwYWdlQ291bnQgPSBNYXRoLmNlaWwoKGZpbHRlcmVkU29ydGVkUmVjb3Jkcz8ubGVuZ3RoID8/IDApIC8gcGFnZUxlbmd0aCk7XG4gIGxldCByb3dzID0gW107XG4gIGZvciAobGV0IGkgPSAocGFnZSAtIDEpICogcGFnZUxlbmd0aDsgaSA8IE1hdGgubWluKHBhZ2UgKiBwYWdlTGVuZ3RoLCBmaWx0ZXJlZFNvcnRlZFJlY29yZHMubGVuZ3RoKTsgaSsrKXtcbiAgICBsZXQgcmVjb3JkID0gZmlsdGVyZWRTb3J0ZWRSZWNvcmRzW2ldO1xuICAgIGxldCBjZWxscyA9IFtdO1xuICAgIGlmICgocHJvcHMuaW5kZXggPz8gZmFsc2UpKXtcbiAgICAgIGNlbGxzLnB1c2goPHRkPntyZWNvcmRbY29sdW1ucy5faW5kZXhLZXldfTwvdGQ+KTtcbiAgICB9XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaisrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuXG4gICAgICB2YXIgdmFsdWU7XG4gICAgICBzd2l0Y2ggKGNvbHVtbi52YWx1ZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgdmFsdWUgPSBjb2x1bW4udmFsdWVGdW5jKHJlY29yZCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICB2YWx1ZSA9IHJlY29yZFtrZXldO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKGNvbHVtbi5kaXNwbGF5RnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIGNlbGxzLnB1c2goPHRkIGtleT17a2V5fT57dmFsdWV9PC90ZD4pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIGxldCBjZWxsRGlzcGxheSA9IGNvbHVtbi5kaXNwbGF5RnVuYyhyZWNvcmQsIHZhbHVlKTtcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e2NlbGxEaXNwbGF5fTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcm93cy5wdXNoKDx0ciBrZXk9e2l9PntjZWxsc308L3RyPik7XG4gIH1cblxuICBmdW5jdGlvbiBleHBvcnRUYWJsZSgpe1xuICAgIGxldCBjc3ZDb250ZW50ID0gXCJkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsXCI7XG5cbiAgICBsZXQgZXhwb3J0Um93cyA9IFtdO1xuXG4gICAgbGV0IGV4cG9ydEhlYWRlcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICBleHBvcnRIZWFkZXJzLnB1c2goY29sdW1uLm5hbWUpO1xuICAgIH1cbiAgICBleHBvcnRSb3dzLnB1c2goZXhwb3J0SGVhZGVycy5qb2luKFwiLFwiKSk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbHRlcmVkU29ydGVkUmVjb3Jkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgZXhwb3J0UmVjb3JkID0gW107XG4gICAgICBsZXQgcmVjb3JkID0gZmlsdGVyZWRTb3J0ZWRSZWNvcmRzW2ldO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaisrKXtcbiAgICAgICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbal07XG4gICAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICBzd2l0Y2ggKGNvbHVtbi52YWx1ZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGV4cG9ydFJlY29yZC5wdXNoKCh2YWx1ZSA9PSBudWxsKSA/ICcnIDogU3RyaW5nKHZhbHVlKSk7XG4gICAgICB9XG4gICAgICBleHBvcnRSb3dzLnB1c2goZXhwb3J0UmVjb3JkLmpvaW4oXCIsXCIpKTtcbiAgICB9XG5cbiAgICBjc3ZDb250ZW50ICs9IGV4cG9ydFJvd3Muam9pbihcIlxcclxcblwiKTtcbiAgICB2YXIgZW5jb2RlZFVyaSA9IGVuY29kZVVSSShjc3ZDb250ZW50KTtcbiAgICB3aW5kb3cub3BlbihlbmNvZGVkVXJpKTtcbiAgfVxuXG4gIGNvbnN0IGNhY2hlID0gY3JlYXRlQ2FjaGUoe1xuICAgIGtleTogJ3JhcmUtZWFydGgnLFxuICAgIG5vbmNlOiBwcm9wcy5ub25jZSxcbiAgfSk7XG4gIGNhY2hlLmNvbXBhdCA9IHRydWU7XG5cbiAgY29uc29sZS5kZWJ1ZygnUmVuZGVyIFRhYmxlJyk7XG4gIHJldHVybihcbiAgICA8Q2FjaGVQcm92aWRlciB2YWx1ZT17Y2FjaGV9PlxuICAgICAgPE1hbnRpbmVQcm92aWRlclxuICAgICAgICB0aGVtZT17cHJvcHMudGhlbWV9XG4gICAgICAgIHdpdGhHbG9iYWxTdHlsZXNcbiAgICAgICAgd2l0aE5vcm1hbGl6ZUNTU1xuICAgICAgICBlbW90aW9uQ2FjaGU9e2NhY2hlfVxuICAgICAgPlxuICAgICAgICA8ZGl2IHJlZj17cmVmfSBpZD17cHJvcHMuaWR9PlxuICAgICAgICAgIDxUYWJsZUNvbnRyb2xcbiAgICAgICAgICAgIGV4cG9ydFRhYmxlPXtleHBvcnRUYWJsZX1cbiAgICAgICAgICAgIG51bVJlY29yZHM9e3JlY29yZHMubGVuZ3RofVxuICAgICAgICAgICAgc29ydEZpZWxkcz17c29ydEZpZWxkc31cbiAgICAgICAgICAgIHNldFNvcnRGaWVsZHM9e3NldFNvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZWFyY2g9e3NlYXJjaH1cbiAgICAgICAgICAgIHNldFNlYXJjaD17c2V0U2VhcmNofVxuICAgICAgICAgICAgcGFnZT17cGFnZX1cbiAgICAgICAgICAgIHNldFBhZ2U9e3NldFBhZ2V9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoPXtwYWdlTGVuZ3RofVxuICAgICAgICAgICAgc2V0UGFnZUxlbmd0aD17c2V0UGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHBhZ2VMZW5ndGhDaG9pY2VzPXtwYWdlTGVuZ3RoQ2hvaWNlc31cbiAgICAgICAgICAgIHBhZ2VDb3VudD17cGFnZUNvdW50fVxuICAgICAgICAgICAgZGVib3VuY2VUaW1lPXtwcm9wcy5kZWJvdW5jZVRpbWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8dGFibGUgY3NzPXt0YWJsZUNzc30+XG4gICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICB7Y29sdW1uc19oZWFkZXJzfVxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAge3Jvd3N9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9NYW50aW5lUHJvdmlkZXI+XG4gICAgPC9DYWNoZVByb3ZpZGVyPlxuICApO1xufSk7XG5cbmV4cG9ydCB7XG4gIFRhYmxlLFxufTtcbiJdfQ== */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  var ascendingSelectedCss = "production" === "production" ? {
    name: "8plhbe",
    styles: "color:#212529"
  } : {
    name: "bcuvqf-ascendingSelectedCss",
    styles: "color:#212529;label:ascendingSelectedCss;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQmdDIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNzcywgY3gsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBQb3BvdmVyLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSBSZWFjdC51c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSBSZWFjdC51c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3Byb3BzLnRoZW1lfVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  var descendingDeselectedCss = "production" === "production" ? {
    name: "158jpac",
    styles: "color:#adb5bd;transform:rotate(180deg)"
  } : {
    name: "6noqhr-descendingDeselectedCss",
    styles: "color:#adb5bd;transform:rotate(180deg);label:descendingDeselectedCss;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQm1DIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNzcywgY3gsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBQb3BvdmVyLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSBSZWFjdC51c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSBSZWFjdC51c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3Byb3BzLnRoZW1lfVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  var descendingSelectedCss = "production" === "production" ? {
    name: "kkbkm2",
    styles: "color:#212529;transform:rotate(180deg)"
  } : {
    name: "iapqj6-descendingSelectedCss",
    styles: "color:#212529;transform:rotate(180deg);label:descendingSelectedCss;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5QmlDIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNzcywgY3gsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBQb3BvdmVyLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSBSZWFjdC51c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSBSZWFjdC51c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3Byb3BzLnRoZW1lfVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  var tableCss = "production" === "production" ? {
    name: "1mt90qs",
    styles: "width:100%;max-width:100%;margin-bottom:1rem;color:#dee2e6;background-color:#212529;th,td{padding:0.75rem;vertical-align:top;border-top:1px solid #495057;}thead th{vertical-align:bottom;border-bottom:2px solid #495057;}tbody+tbody{border-top:2px solid #495057;}tbody tr:nth-of-type(even){background-color:#2c3034;}"
  } : {
    name: "ulanqb-tableCss",
    styles: "width:100%;max-width:100%;margin-bottom:1rem;color:#dee2e6;background-color:#212529;th,td{padding:0.75rem;vertical-align:top;border-top:1px solid #495057;}thead th{vertical-align:bottom;border-bottom:2px solid #495057;}tbody+tbody{border-top:2px solid #495057;}tbody tr:nth-of-type(even){background-color:#2c3034;};label:tableCss;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2Qm9CIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNzcywgY3gsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBQb3BvdmVyLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSBSZWFjdC51c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSBSZWFjdC51c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3Byb3BzLnRoZW1lfVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  var _ref2 = "production" === "production" ? {
    name: "1fmgkpl",
    styles: "min-width:150px"
  } : {
    name: "5mc5hw-TableControl",
    styles: "min-width:150px;label:TableControl;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxUGdCIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNzcywgY3gsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBQb3BvdmVyLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSBSZWFjdC51c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSBSZWFjdC51c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3Byb3BzLnRoZW1lfVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
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
    var _React$useState = React.useState(search.global),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      searchInput = _React$useState2[0],
      setSearchInput = _React$useState2[1];
    React.useEffect(function () {
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
        paginationButtons.push(jsx(Button, {
          key: "<<",
          onClick: function onClick() {
            return setPage(1);
          }
        }, jsx("b", null, String.fromCharCode(60) + String.fromCharCode(60))));
        break;
      case true:
        paginationButtons.push(jsx(Button, {
          key: "<<",
          disabled: true,
          onClick: function onClick() {},
          styles: {
            root: {
              visibility: 'hidden'
            }
          }
        }, jsx("b", null, String.fromCharCode(60) + String.fromCharCode(60))));
        break;
    }
    var _loop = function _loop(_i) {
      switch (_i < 1) {
        case true:
          paginationButtons.push(jsx(Button, {
            key: _i,
            onClick: function onClick() {
              return setPage(_i);
            },
            styles: {
              root: {
                visibility: 'hidden'
              }
            }
          }, jsx("b", null, _i)));
          break;
        case false:
          paginationButtons.push(jsx(Button, {
            key: _i,
            onClick: function onClick() {
              return setPage(_i);
            }
          }, jsx("b", null, _i)));
          break;
      }
    };
    for (var _i = page - 3; _i < page; _i++) {
      _loop(_i);
    }
    paginationButtons.push(jsx(Button, {
      key: page
    }, jsx("b", null, "Page " + page + " of " + pageCount)));
    var _loop2 = function _loop2(_i2) {
      switch (_i2 > pageCount) {
        case true:
          paginationButtons.push(jsx(Button, {
            key: _i2,
            onClick: function onClick() {
              return setPage(_i2);
            },
            styles: {
              root: {
                visibility: 'hidden'
              }
            }
          }, jsx("b", null, _i2)));
          break;
        case false:
          paginationButtons.push(jsx(Button, {
            key: _i2,
            onClick: function onClick() {
              return setPage(_i2);
            }
          }, jsx("b", null, _i2)));
      }
    };
    for (var _i2 = page + 1; _i2 < page + 4; _i2++) {
      _loop2(_i2);
    }
    switch (page + 4 > pageCount) {
      case false:
        paginationButtons.push(jsx(Button, {
          key: ">>",
          onClick: function onClick() {
            return setPage(pageCount);
          }
        }, jsx("b", null, String.fromCharCode(62) + String.fromCharCode(62))));
        break;
      case true:
        paginationButtons.push(jsx(Button, {
          key: ">>",
          disabled: true,
          onClick: function onClick() {},
          styles: {
            root: {
              visibility: 'hidden'
            }
          }
        }, jsx("b", null, String.fromCharCode(62) + String.fromCharCode(62))));
        break;
    }
    return jsx(Flex, {
      align: "top",
      gap: "xs"
    }, jsx(Tooltip, {
      label: "Export Data as CSV"
    }, jsx(Button, {
      leftIcon: jsx(TbTableExport, null),
      onClick: function onClick(event) {
        return exportTable();
      }
    })), jsx(Select, {
      label: "Page Length",
      value: pageLengthOptions.map(function (x, i) {
        return parseInt(x.value);
      }).includes(parseInt(pageLength)) ? pageLength.toString() : pageLengthOptions[0].value.toString(),
      onChange: function onChange(value) {
        return _setPageLength(parseInt(value));
      },
      data: pageLengthOptions
    }), jsx(Flex, {
      gap: "xs"
    }, paginationButtons), jsx(Flex, {
      align: "center",
      gap: "xs",
      css: _ref2
    }, jsx(BsSearch, null), jsx(TextInput, {
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
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5ZG9CIiwiZmlsZSI6IlRhYmxlLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGNzcywgY3gsIENhY2hlUHJvdmlkZXIgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgY3JlYXRlQ2FjaGUgZnJvbSAnQGVtb3Rpb24vY2FjaGUnO1xuaW1wb3J0IHsgQm94LCBCdXR0b24sIEZsZXgsIE1vZGFsLCBQb3BvdmVyLCBTZWxlY3QsIFN0YWNrLCBUZXh0SW5wdXQsIFRvb2x0aXAgfSBmcm9tICdAbWFudGluZS9jb3JlJztcbmltcG9ydCB7ICBjcmVhdGVFbW90aW9uQ2FjaGUsIE1hbnRpbmVQcm92aWRlciB9IGZyb20gJ0BtYW50aW5lL2NvcmUnO1xuXG5pbXBvcnQgeyBCc1NlYXJjaCwgQnNUcmlhbmdsZUZpbGwgfSBmcm9tICdyZWFjdC1pY29ucy9icyc7XG5pbXBvcnQgeyBGaUZpbHRlciB9IGZyb20gJ3JlYWN0LWljb25zL2ZpJztcbmltcG9ydCB7IFRiVGFibGVFeHBvcnQgfSBmcm9tICdyZWFjdC1pY29ucy90Yic7XG5cbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAndGhyb3R0bGUtZGVib3VuY2UnO1xuXG5jb25zdCBERUJPVU5DRV9JTlBVVF9USU1FX01TID0gNTAwO1xuXG5jb25zdCBhc2NlbmRpbmdEZXNlbGVjdGVkQ3NzID0gY3NzYFxuICBjb2xvcjogI2FkYjViZDtcbmA7XG5jb25zdCBhc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG5gO1xuY29uc3QgZGVzY2VuZGluZ0Rlc2VsZWN0ZWRDc3MgPSBjc3NgXG4gIGNvbG9yOiAjYWRiNWJkO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xuYDtcbmNvbnN0IGRlc2NlbmRpbmdTZWxlY3RlZENzcyA9IGNzc2BcbiAgY29sb3I6ICMyMTI1Mjk7XG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG5gO1xuY29uc3QgdGFibGVDc3MgPSBjc3NgXG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGNvbG9yOiAjZGVlMmU2O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5O1xuXG4gIHRoLCB0ZCB7XG4gICAgcGFkZGluZzogMC43NXJlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDk1MDU3O1xuICB9XG5cbiAgdGhlYWQgdGgge1xuICAgIHZlcnRpY2FsLWFsaWduOiBib3R0b207XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM0OTUwNTc7XG4gIH1cblxuICB0Ym9keSArIHRib2R5IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ5NTA1NztcbiAgfVxuXG4gIHRib2R5IHRyOm50aC1vZi10eXBlKGV2ZW4pIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmMzMDM0O1xuICB9XG5gO1xuXG5jb25zdCBUYWJsZUNvbnRyb2wgPSAoe1xuICBleHBvcnRUYWJsZSxcbiAgbnVtUmVjb3JkcyxcbiAgc29ydEZpZWxkcyxcbiAgc2V0U29ydEZpZWxkcyxcbiAgc2VhcmNoLFxuICBzZXRTZWFyY2gsXG4gIHBhZ2UsXG4gIHNldFBhZ2UsXG4gIHBhZ2VMZW5ndGgsXG4gIHNldFBhZ2VMZW5ndGgsXG4gIHBhZ2VMZW5ndGhDaG9pY2VzLFxuICBwYWdlQ291bnQsXG4gIGRlYm91bmNlVGltZSxcbn0pID0+IHtcbiAgY29uc3QgW3NlYXJjaElucHV0LCBzZXRTZWFyY2hJbnB1dF0gPSBSZWFjdC51c2VTdGF0ZShzZWFyY2guZ2xvYmFsKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UoZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHNldFNlYXJjaCh7Li4uc2VhcmNoLCBnbG9iYWw6IHNlYXJjaElucHV0fSk7XG4gICAgfSwge2F0QmVnaW46IGZhbHNlfSk7XG5cbiAgICBkZWJvdW5jZUZ1bmMoKTtcbiAgICByZXR1cm4oKCkgPT4ge1xuICAgICAgZGVib3VuY2VGdW5jLmNhbmNlbCgpO1xuICAgIH0pO1xuICB9LCBbc2VhcmNoSW5wdXRdKTtcblxuICBmdW5jdGlvbiBfc2V0UGFnZUxlbmd0aChwYWdlTGVuZ3RoKXtcbiAgICBsZXQgZmlyc3RFbnRyeSA9ICgocGFnZSAtIDEpICogcGFnZUxlbmd0aCkgKyAxO1xuICAgIGxldCBmaXJzdEVudHJ5UGFnZSA9IE1hdGguY2VpbChmaXJzdEVudHJ5IC8gcGFnZUxlbmd0aCk7XG5cbiAgICBzZXRQYWdlKGZpcnN0RW50cnlQYWdlKTtcbiAgICBzZXRQYWdlTGVuZ3RoKHBhZ2VMZW5ndGgpO1xuICB9XG5cbiAgbGV0IHBhZ2VMZW5ndGhPcHRpb25zID0gW107XG4gIHZhciBhZGROZXh0UGFnZU9wdGlvbiA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFnZUxlbmd0aENob2ljZXMubGVuZ3RoOyBpKyspe1xuICAgIGxldCBwYWdlTGVuZ3RoID0gcGFnZUxlbmd0aENob2ljZXNbaV07XG4gICAgc3dpdGNoIChwYWdlTGVuZ3RoIDwgbnVtUmVjb3Jkcyl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogcGFnZUxlbmd0aC50b1N0cmluZygpLCBsYWJlbDogcGFnZUxlbmd0aC50b1N0cmluZygpIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHBhZ2VMZW5ndGhPcHRpb25zLnB1c2goeyB2YWx1ZTogbnVtUmVjb3Jkcy50b1N0cmluZygpLCBsYWJlbDogJ0FMTCcgfSk7XG4gICAgICAgIGFkZE5leHRQYWdlT3B0aW9uID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWFkZE5leHRQYWdlT3B0aW9uKXtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYWdpbmF0aW9uQnV0dG9ucyA9IFtdO1xuICBzd2l0Y2ggKHBhZ2UgPD0gNCl7XG4gICAgY2FzZSBmYWxzZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI8PFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZSgxKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSB0cnVlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIjw8XCJcbiAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7fX1cbiAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxiPntTdHJpbmcuZnJvbUNoYXJDb2RlKDYwKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoNjApfTwvYj5cbiAgICAgICAgPC9CdXR0b24+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgZm9yIChsZXQgaSA9IHBhZ2UgLSAzOyBpIDwgcGFnZTsgaSArKyl7XG4gICAgc3dpdGNoIChpIDwgMSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UGFnZShpKX1cbiAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHt2aXNpYmlsaXR5OiAnaGlkZGVuJ319fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGI+e2l9PC9iPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICA8QnV0dG9uXG4gICAgICBrZXk9e3BhZ2V9XG4gICAgPlxuICAgICAgPGI+e1wiUGFnZSBcIiArIHBhZ2UgKyBcIiBvZiBcIiArIHBhZ2VDb3VudH08L2I+XG4gICAgPC9CdXR0b24+XG4gICk7XG4gIGZvciAobGV0IGkgPSBwYWdlICsgMTsgaSA8IHBhZ2UgKyA0OyBpICsrKXtcbiAgICBzd2l0Y2ggKGkgPiBwYWdlQ291bnQpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICBwYWdpbmF0aW9uQnV0dG9ucy5wdXNoKFxuICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgIGtleT17aX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFBhZ2UoaSl9XG4gICAgICAgICAgICBzdHlsZXM9e3tyb290OiB7dmlzaWJpbGl0eTogJ2hpZGRlbid9fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Yj57aX08L2I+XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKGkpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxiPntpfTwvYj5cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgKTtcbiAgICB9XG4gIH1cbiAgc3dpdGNoICgocGFnZSArIDQpID4gcGFnZUNvdW50KXtcbiAgICBjYXNlIGZhbHNlOlxuICAgICAgcGFnaW5hdGlvbkJ1dHRvbnMucHVzaChcbiAgICAgICAgPEJ1dHRvblxuICAgICAgICAgIGtleT1cIj4+XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRQYWdlKHBhZ2VDb3VudCl9XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgdHJ1ZTpcbiAgICAgIHBhZ2luYXRpb25CdXR0b25zLnB1c2goXG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBrZXk9XCI+PlwiXG4gICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge319XG4gICAgICAgICAgc3R5bGVzPXt7cm9vdDoge3Zpc2liaWxpdHk6ICdoaWRkZW4nfX19XG4gICAgICAgID5cbiAgICAgICAgICA8Yj57U3RyaW5nLmZyb21DaGFyQ29kZSg2MikgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKDYyKX08L2I+XG4gICAgICAgIDwvQnV0dG9uPlxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuKFxuICAgIDxGbGV4XG4gICAgICBhbGlnbj1cInRvcFwiXG4gICAgICBnYXA9XCJ4c1wiXG4gICAgPlxuICAgICAgPFRvb2x0aXBcbiAgICAgICAgbGFiZWw9XCJFeHBvcnQgRGF0YSBhcyBDU1ZcIlxuICAgICAgPlxuICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgbGVmdEljb249ezxUYlRhYmxlRXhwb3J0IC8+fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4gZXhwb3J0VGFibGUoKX1cbiAgICAgICAgPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcD5cbiAgICAgIDxTZWxlY3RcbiAgICAgICAgbGFiZWw9XCJQYWdlIExlbmd0aFwiXG4gICAgICAgIHZhbHVlPXsocGFnZUxlbmd0aE9wdGlvbnMubWFwKCh4LCBpKSA9PiBwYXJzZUludCh4LnZhbHVlKSkuaW5jbHVkZXMocGFyc2VJbnQocGFnZUxlbmd0aCkpID8gcGFnZUxlbmd0aC50b1N0cmluZygpIDogcGFnZUxlbmd0aE9wdGlvbnNbMF0udmFsdWUudG9TdHJpbmcoKSl9XG4gICAgICAgIG9uQ2hhbmdlPXsodmFsdWUpID0+IF9zZXRQYWdlTGVuZ3RoKHBhcnNlSW50KHZhbHVlKSl9XG4gICAgICAgIGRhdGE9e3BhZ2VMZW5ndGhPcHRpb25zfVxuICAgICAgLz5cbiAgICAgIDxGbGV4XG4gICAgICAgIGdhcD1cInhzXCJcbiAgICAgID5cbiAgICAgICAge3BhZ2luYXRpb25CdXR0b25zfVxuICAgICAgPC9GbGV4PlxuICAgICAgPEZsZXhcbiAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICBnYXA9XCJ4c1wiXG4gICAgICAgIGNzcz17Y3NzYFxuICAgICAgICAgIG1pbi13aWR0aDogMTUwcHg7XG4gICAgICAgIGB9XG4gICAgICA+XG4gICAgICAgIDxCc1NlYXJjaC8+XG4gICAgICAgIDxUZXh0SW5wdXRcbiAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXR9XG4gICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0U2VhcmNoSW5wdXQoKGV2ZW50LnRhcmdldC52YWx1ZSA9PSAnJykgPyBudWxsIDogZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRmxleD5cbiAgICA8L0ZsZXg+XG4gICk7XG59XG5cbmNvbnN0IFRhYmxlSGVhZGVyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuXG4gIGNvbnN0IFtzZWFyY2hJbnB1dCwgc2V0U2VhcmNoSW5wdXRdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuc2VhcmNoW3Byb3BzLmNvbHVtbl9rZXldKTtcbiAgY29uc3QgW3NlYXJjaE1vZGFsT3Blbiwgc2V0U2VhcmNoTW9kYWxPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuXG4gICAgY29uc3QgZGVib3VuY2VGdW5jID0gZGVib3VuY2UocHJvcHMuZGVib3VuY2VUaW1lID8/IERFQk9VTkNFX0lOUFVUX1RJTUVfTVMsICgpID0+IHtcbiAgICAgIHByb3BzLnNldFNlYXJjaCh7Li4ucHJvcHMuc2VhcmNoLCBmaWVsZHM6IHsuLi5wcm9wcy5zZWFyY2guZmllbGRzLCBbcHJvcHMuY29sdW1uX2tleV06IHNlYXJjaElucHV0fX0pO1xuICAgIH0sIHthdEJlZ2luOiBmYWxzZX0pO1xuXG4gICAgZGVib3VuY2VGdW5jKCk7XG4gICAgcmV0dXJuKCgpID0+IHtcbiAgICAgIGRlYm91bmNlRnVuYy5jYW5jZWwoKTtcbiAgICB9KTtcbiAgfSwgW3NlYXJjaElucHV0XSk7XG5cbiAgZnVuY3Rpb24gc29ydEZpZWxkQ2xpY2soZXZlbnQpe1xuICAgIHZhciB0aGlzX2ZpZWxkX3JldmVyc2UgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICAgIGlmIChzb3J0RmllbGRbJ2tleSddID09IHByb3BzLmNvbHVtbl9rZXkpe1xuICAgICAgICB0aGlzX2ZpZWxkX3JldmVyc2UgPSBzb3J0RmllbGRbJ3JldmVyc2UnXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbmV3X3NvcnRfZmllbGRzID0gW107XG4gICAgc3dpdGNoKGV2ZW50LnNoaWZ0S2V5KXtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIHN3aXRjaCAodGhpc19maWVsZF9yZXZlcnNlKXtcbiAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgdmFyIGN1cnJlbnRfa2V5X2luY2x1ZGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuc29ydEZpZWxkcz8ubGVuZ3RoID8/IDA7IGkrKyl7XG4gICAgICAgICAgbGV0IHNvcnRGaWVsZCA9IHByb3BzLnNvcnRGaWVsZHNbaV07XG4gICAgICAgICAgaWYgKHNvcnRGaWVsZFsna2V5J10gPT0gcHJvcHMuY29sdW1uX2tleSl7XG4gICAgICAgICAgICBjdXJyZW50X2tleV9pbmNsdWRlZCA9IHRydWU7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXNfZmllbGRfcmV2ZXJzZSl7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgbmV3X3NvcnRfZmllbGRzLnB1c2goeydrZXknOiBwcm9wcy5jb2x1bW5fa2V5LCAncmV2ZXJzZSc6IHRydWV9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNhc2UgbnVsbDpcbiAgICAgICAgICAgICAgICBuZXdfc29ydF9maWVsZHMucHVzaCh7J2tleSc6IHByb3BzLmNvbHVtbl9rZXksICdyZXZlcnNlJzogZmFsc2V9KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHNvcnRGaWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY3VycmVudF9rZXlfaW5jbHVkZWQpe1xuICAgICAgICAgIG5ld19zb3J0X2ZpZWxkcy5wdXNoKHsna2V5JzogcHJvcHMuY29sdW1uX2tleSwgJ3JldmVyc2UnOiBmYWxzZX0pXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG5ld19zb3J0X2ZpZWxkcyk7XG4gICAgcHJvcHMuc2V0U29ydEZpZWxkcyhuZXdfc29ydF9maWVsZHMpO1xuICB9XG5cbiAgdmFyIGFzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXthc2NlbmRpbmdEZXNlbGVjdGVkQ3NzfS8+O1xuICB2YXIgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nRGVzZWxlY3RlZENzc30vPjtcbiAgdmFyIGNvbHVtbl9zb3J0X21ldGEgPSB7XG4gICAgJ3N5bWJvbCc6IG51bGwsXG4gICAgJ2luZGV4JzogbnVsbCxcbiAgfTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5zb3J0RmllbGRzPy5sZW5ndGggPz8gMDsgaSsrKXtcbiAgICBsZXQgc29ydEZpZWxkID0gcHJvcHMuc29ydEZpZWxkc1tpXTtcbiAgICBpZiAoc29ydEZpZWxkLmtleSA9PSBwcm9wcy5jb2x1bW5fa2V5KXtcbiAgICAgIHN3aXRjaCAoc29ydEZpZWxkLnJldmVyc2Upe1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgZGVzY2VuZGluZ0ljb24gPSA8QnNUcmlhbmdsZUZpbGwgY3NzPXtkZXNjZW5kaW5nU2VsZWN0ZWRDc3N9Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgYXNjZW5kaW5nSWNvbiA9IDxCc1RyaWFuZ2xlRmlsbCBjc3M9e2FzY2VuZGluZ1NlbGVjdGVkQ3NzfS8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIG51bGw6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb2x1bW5fc29ydF9tZXRhLmluZGV4ID0gaSArIDE7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSl7XG5cbiAgICBpZiAoY29sdW1uQSA9PSBjb2x1bW5CKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKChwcm9wcy5jb2x1bW5zLmF0dHJpYnV0ZXNbY29sdW1uQV0gPT0gbnVsbCkgJiYgKHByb3BzLmNvbHVtbnMuYXR0cmlidXRlc1tjb2x1bW5BXSA9PSBudWxsKSl7XG4gICAgICBjYXNlIHRydWU6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgIGxldCBuZXdDb2x1bW5PcmRlciA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmNvbHVtbnMub3JkZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgIGxldCBvcmRlckNvbHVtbktleSA9IHByb3BzLmNvbHVtbnMub3JkZXJbaV07XG4gICAgICAgICAgc3dpdGNoICgob3JkZXJDb2x1bW5LZXkgPT0gY29sdW1uQSkgfHwgKG9yZGVyQ29sdW1uS2V5ID09IGNvbHVtbkIpKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2gob3JkZXJDb2x1bW5LZXkpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgc3dpdGNoIChvcmRlckNvbHVtbktleSA9PSBjb2x1bW5BKXtcbiAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgc3dpdGNoIChNYXRoLnNpZ24oTWF0aC5hYnMoaSAtIGluZGV4QSkgLSAxKSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleEEgPCBpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2x1bW5PcmRlci5wdXNoKGNvbHVtbkIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGJlZm9yZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbHVtbk9yZGVyLnB1c2goY29sdW1uQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Q29sdW1uT3JkZXIucHVzaChjb2x1bW5BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJvcHMuc2V0Q29sdW1ucyh7aW5kZXg6IHByb3BzLmNvbHVtbnMuaW5kZXgsIG9yZGVyOiBuZXdDb2x1bW5PcmRlciwgYXR0cmlidXRlczogcHJvcHMuY29sdW1ucy5hdHRyaWJ1dGVzfSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBjb2x1bW5fa2V5LCBjb2x1bW5faW5kZXgpe1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCdpbml0aWF0b3JLZXknLCBjb2x1bW5fa2V5KTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgnaW5pdGlhdG9ySW5kZXgnLCBjb2x1bW5faW5kZXgpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJvcEhhbmRsZShldmVudCl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY29sdW1uQSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdpbml0aWF0b3JLZXknKTtcbiAgICBsZXQgaW5kZXhBID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2luaXRpYXRvckluZGV4Jyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIHZhciBjb2x1bW5CO1xuICAgIHdoaWxlICghY29sdW1uQil7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmICghdGFyZ2V0KXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29sdW1uQiA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmFyZS1lYXJ0aC1jb2x1bW4ta2V5Jyk7XG4gICAgfVxuXG4gICAgbGV0IGJvdW5kaW5nQm94ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBiZWZvcmUgPSBldmVudC54IDw9ICgoYm91bmRpbmdCb3gubGVmdCArIGJvdW5kaW5nQm94LnJpZ2h0KSAvIDIpO1xuXG4gICAgc3dpdGNoIChjb2x1bW5CID09IG51bGwpe1xuICAgICAgY2FzZSB0cnVlOlxuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2FwQ29sdW1ucyhjb2x1bW5BLCBjb2x1bW5CLCBpbmRleEEsIGJlZm9yZSk7XG4gICAgfVxuICB9XG4gIGNvbnNvbGUubG9nKHByb3BzKTtcbiAgcmV0dXJuKFxuICAgIDx0aD5cbiAgICAgIDxTdGFja1xuICAgICAgICBzcGFjaW5nPXswfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXsoZWxlbWVudCkgPT4gcmVmLmN1cnJlbnRbcHJvcHMuY29sdW1uX2luZGV4XSA9IGVsZW1lbnR9XG4gICAgICAgICAgZGF0YS1yYXJlLWVhcnRoLWNvbHVtbi1rZXk9e3Byb3BzLmNvbHVtbl9rZXl9XG4gICAgICAgICAgZHJhZ2dhYmxlPSd0cnVlJ1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZXZlbnQpID0+IG9uRHJhZ1N0YXJ0SGFuZGxlKGV2ZW50LCBwcm9wcy5jb2x1bW5fa2V5LCBwcm9wcy5jb2x1bW5faW5kZXgpfVxuICAgICAgICAgIG9uRHJhZ092ZXI9eyhldmVudCkgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKX1cbiAgICAgICAgICBvbkRyYWdFbnRlcj17KGV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpfVxuICAgICAgICAgIG9uRHJvcD17KGV2ZW50KSA9PiBvbkRyb3BIYW5kbGUoZXZlbnQpfVxuICAgICAgICA+XG4gICAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIG0tMVwiXG4gICAgICAgICAgICAgIHN0eWxlcz17e3Jvb3Q6IHtiYWNrZ3JvdW5kQ29sb3I6IFwiIzQ5NTA1N1wiLCBjb2xvcjogXCIjMjEyNTI5XCJ9fX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiBzb3J0RmllbGRDbGljayhldmVudCl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGV4IGFsaWduPVwiY2VudGVyXCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgIHtjb2x1bW5fc29ydF9tZXRhLmluZGV4fVxuICAgICAgICAgICAgICAgIDxTdGFjayBzcGFjaW5nPXs0fSBjbGFzc05hbWU9XCJtLTFcIj5cbiAgICAgICAgICAgICAgICAgIHthc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgICAge2Rlc2NlbmRpbmdJY29ufVxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvRmxleD5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAge3Byb3BzLmNvbHVtbi5sYWJlbCA/PyBwcm9wcy5jb2x1bW5fa2V5LnRvU3RyaW5nKCl9XG4gICAgICAgICAgPC9GbGV4PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsZXggYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dElucHV0XG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoSW5wdXQgPz8gJyd9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRTZWFyY2hJbnB1dCgoZXZlbnQudGFyZ2V0LnZhbHVlID09ICcnKSA/IG51bGwgOiBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgY3NzPXtjc3Ngd2lkdGg6IDEwMCU7YH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0ZsZXg+XG4gICAgICA8L1N0YWNrPlxuICAgIDwvdGg+XG4gICk7XG59KTtcblxuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XG5cbiAgY29uc3QgW2NvbHVtbnMsIHNldENvbHVtbnNdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIF9pbmRleEtleTogY3J5cHRvLnJhbmRvbVVVSUQoKSxcbiAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgIGF0dHJpYnV0ZXM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIHsuLi54LCB2YWx1ZUZ1bmM6IHg/LnZhbHVlRnVuYyA/PyAoKHJlY29yZCkgPT4gcmVjb3JkPy5beC5rZXldKX1dKSksXG4gIH0pO1xuICBjb25zdCBbcmVjb3Jkcywgc2V0UmVjb3Jkc10gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5yZWNvcmRzID8/IFtdKTtcblxuICBjb25zdCBbcGFnZUxlbmd0aCwgc2V0UGFnZUxlbmd0aF0gPSBSZWFjdC51c2VTdGF0ZShwcm9wcy5pbml0aWFsUGFnZUxlbmd0aCA/PyAxMCk7XG4gIGNvbnN0IFtwYWdlTGVuZ3RoQ2hvaWNlcywgc2V0UGFnZUxlbmd0aENob2ljZXNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMucGFnZUxlbmd0aENob2ljZXMgPz8gWzEwLCAyMCwgNTAsIDEwMCwgSW5maW5pdHldKTtcbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFBhZ2UgPz8gMSk7XG5cbiAgY29uc3QgW3NvcnRGaWVsZHMsIHNldFNvcnRGaWVsZHNdID0gUmVhY3QudXNlU3RhdGUocHJvcHMuaW5pdGlhbFNvcnRGaWVsZHMgPz8gW10pO1xuICBjb25zdCBbc2VhcmNoLCBzZXRTZWFyY2hdID0gUmVhY3QudXNlU3RhdGUoe1xuICAgIGdsb2JhbDogbnVsbCxcbiAgICBmaWVsZHM6IE9iamVjdC5mcm9tRW50cmllcygocHJvcHMuY29sdW1ucyA/PyBbXSkubWFwKCh4LCBpKSA9PiBbeC5rZXksIG51bGxdKSksXG4gIH0pO1xuXG4gIGNvbnN0IGhlYWRlclJlZnMgPSBSZWFjdC51c2VSZWYoe30pO1xuXG4gIGZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlRnVuYyhhLCBiKXtcbiAgICBzd2l0Y2goYSA9PSBudWxsKXtcbiAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgc3dpdGNoKGIgPT0gbnVsbCl7XG4gICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICBjYXNlIGZhbHNlOlxuICAgICAgICBzd2l0Y2goYiA9PSBudWxsKXtcbiAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIHN3aXRjaChhID09IGIpe1xuICAgICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgICAgc3dpdGNoKGEgPCBiKXtcbiAgICAgICAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGNvbXBhcmVSZWNvcmRzKHJlY29yZEEsIHJlY29yZEIpe1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc29ydEZpZWxkcy5sZW5ndGg7IGkrKyl7XG5cbiAgICAgIGxldCBzb3J0RmllbGQgPSBzb3J0RmllbGRzW2ldWydrZXknXTtcbiAgICAgIGxldCByZXZlcnNlID0gc29ydEZpZWxkc1tpXVsncmV2ZXJzZSddO1xuICAgICAgbGV0IGNvbXBhcmVGdW5jID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0uY29tcGFyZUZ1bmM7XG5cbiAgICAgIHZhciBhVmFsO1xuICAgICAgdmFyIGJWYWw7XG4gICAgICBzd2l0Y2ggKGNvbHVtbnMuYXR0cmlidXRlc1tzb3J0RmllbGRdLnZhbHVlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBhVmFsID0gY29sdW1ucy5hdHRyaWJ1dGVzW3NvcnRGaWVsZF0udmFsdWVGdW5jKHJlY29yZEEpO1xuICAgICAgICAgIGJWYWwgPSBjb2x1bW5zLmF0dHJpYnV0ZXNbc29ydEZpZWxkXS52YWx1ZUZ1bmMocmVjb3JkQik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBhVmFsID0gcmVjb3JkQVtzb3J0RmllbGRdO1xuICAgICAgICAgIGJWYWwgPSByZWNvcmRCW3NvcnRGaWVsZF1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbXBhcmVWYWw7XG4gICAgICBzd2l0Y2gocmV2ZXJzZSl7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgc3dpdGNoIChjb21wYXJlRnVuYyA9PSBudWxsKXtcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBjb21wYXJlRnVuYyhhVmFsLCBiVmFsKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICAgIGNvbXBhcmVWYWwgPSBkZWZhdWx0Q29tcGFyZUZ1bmMoYVZhbCwgYlZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHN3aXRjaCAoY29tcGFyZUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gY29tcGFyZUZ1bmMoYlZhbCwgYVZhbCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgICBjb21wYXJlVmFsID0gZGVmYXVsdENvbXBhcmVGdW5jKGJWYWwsIGFWYWwpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9O1xuICAgICAgaWYgKGNvbXBhcmVWYWwgIT0gMCl7XG4gICAgICAgIHJldHVybiBjb21wYXJlVmFsO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29sdW1ucyh7XG4gICAgICBfaW5kZXhLZXk6IGNyeXB0by5yYW5kb21VVUlEKCksXG4gICAgICBvcmRlcjogKHByb3BzLmNvbHVtbnMgPz8gW10pLm1hcCgoeCwgaSkgPT4geC5rZXkpLFxuICAgICAgYXR0cmlidXRlczogT2JqZWN0LmZyb21FbnRyaWVzKChwcm9wcy5jb2x1bW5zID8/IFtdKS5tYXAoKHgsIGkpID0+IFt4LmtleSwgey4uLngsIHZhbHVlRnVuYzogeD8udmFsdWVGdW5jID8/ICgocmVjb3JkKSA9PiByZWNvcmQ/Llt4LmtleV0pfV0pKSxcbiAgICB9KTtcbiAgfSwgW3Byb3BzLmNvbHVtbnNdKTtcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZWNvcmRzKHByb3BzLnJlY29yZHMgPz8gW10pO1xuICB9LCBbcHJvcHMucmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ0ZpbHRlcmluZyBSZWNvcmRzJyk7XG5cbiAgICB2YXIgbmV3UmVjb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVjb3Jkcy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgcmVjb3JkID0gcmVjb3Jkc1tpXTtcbiAgICAgIHZhciBpbmNsdWRlID0gIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCk7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gc2VhcmNoLmZpZWxkcyl7XG4gICAgICAgIGxldCByZWNvcmRDb21wYXJlU3RyID0gKGNvbHVtbnM/LmF0dHJpYnV0ZXM/LltrZXldPy52YWx1ZUZ1bmM/LihyZWNvcmQpID8/ICcnKT8udG9TdHJpbmc/LigpPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuXG4gICAgICAgIGxldCBnbG9iYWxTZWFyY2ggPSBzZWFyY2guZ2xvYmFsPy50cmltPy4oKT8udG9Mb3dlckNhc2U/LigpO1xuICAgICAgICBpZiAoKEJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpICYmIChyZWNvcmRDb21wYXJlU3RyPy5pbmNsdWRlcz8uKGdsb2JhbFNlYXJjaCkpKXtcbiAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrZXlTZWFyY2ggPSBzZWFyY2guZmllbGRzW2tleV0/LnRyaW0/LigpPy50b0xvd2VyQ2FzZT8uKCk7XG4gICAgICAgIGlmICgha2V5U2VhcmNoKXtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVjb3JkQ29tcGFyZVN0cj8uaW5jbHVkZXM/LihrZXlTZWFyY2gpKXtcbiAgICAgICAgICBpZiAoQm9vbGVhbihzZWFyY2guZ2xvYmFsKSl7XG4gICAgICAgICAgICBpbmNsdWRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIUJvb2xlYW4oc2VhcmNoLmdsb2JhbCkpe1xuICAgICAgICAgICAgaW5jbHVkZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaW5jbHVkZSl7XG4gICAgICAgIG5ld1JlY29yZHMucHVzaCh7Li4ucmVjb3JkLCBbY29sdW1ucy5faW5kZXhLZXldOiBpfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1JlY29yZHM7XG5cbiAgfSwgW3NlYXJjaCwgcmVjb3Jkc10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkU29ydGVkUmVjb3JkcyA9IFJlYWN0LnVzZU1lbW8oZnVuY3Rpb24oKXtcblxuICAgIGNvbnNvbGUuZGVidWcoJ1NvcnRpbmcgUmVjb3JkcycpO1xuICAgIGNvbnN0IHNvcnRlZFJlY29yZHMgPSBmaWx0ZXJlZFJlY29yZHMuc29ydChjb21wYXJlUmVjb3Jkcyk7XG5cbiAgICByZXR1cm4gc29ydGVkUmVjb3JkcztcblxuICB9LCBbc29ydEZpZWxkcywgc2VhcmNoLCByZWNvcmRzXSk7XG5cbiAgbGV0IGNvbHVtbnNfaGVhZGVycyA9IFtdO1xuICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgY29sdW1uc19oZWFkZXJzLnB1c2goPHRoPkluZGV4PC90aD4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGkrKyl7XG4gICAgbGV0IGtleSA9IGNvbHVtbnMub3JkZXJbaV07XG4gICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgIGNvbHVtbnNfaGVhZGVycy5wdXNoKDxUYWJsZUhlYWRlciByZWY9e2hlYWRlclJlZnN9IGtleT17a2V5fSBjb2x1bW5zPXtjb2x1bW5zfSBzZXRDb2x1bW5zPXtzZXRDb2x1bW5zfSBzb3J0RmllbGRzPXtzb3J0RmllbGRzfSBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfSBzZWFyY2g9e3NlYXJjaH0gc2V0U2VhcmNoPXtzZXRTZWFyY2h9IGNvbHVtbl9pbmRleD17aX0gY29sdW1uX2tleT17a2V5fSBjb2x1bW49e2NvbHVtbn0gLz4pXG4gIH1cblxuICBsZXQgcGFnZUNvdW50ID0gTWF0aC5jZWlsKChmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwKSAvIHBhZ2VMZW5ndGgpO1xuICBsZXQgcm93cyA9IFtdO1xuICBmb3IgKGxldCBpID0gKHBhZ2UgLSAxKSAqIHBhZ2VMZW5ndGg7IGkgPCBNYXRoLm1pbihwYWdlICogcGFnZUxlbmd0aCwgZmlsdGVyZWRTb3J0ZWRSZWNvcmRzLmxlbmd0aCk7IGkrKyl7XG4gICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICBsZXQgY2VsbHMgPSBbXTtcbiAgICBpZiAoKHByb3BzLmluZGV4ID8/IGZhbHNlKSl7XG4gICAgICBjZWxscy5wdXNoKDx0ZD57cmVjb3JkW2NvbHVtbnMuX2luZGV4S2V5XX08L3RkPik7XG4gICAgfVxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICBsZXQga2V5ID0gY29sdW1ucy5vcmRlcltqXTtcbiAgICAgIGxldCBjb2x1bW4gPSBjb2x1bW5zLmF0dHJpYnV0ZXNba2V5XTtcblxuICAgICAgdmFyIHZhbHVlO1xuICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgIHZhbHVlID0gY29sdW1uLnZhbHVlRnVuYyhyZWNvcmQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjb2x1bW4uZGlzcGxheUZ1bmMgPT0gbnVsbCl7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICBjZWxscy5wdXNoKDx0ZCBrZXk9e2tleX0+e3ZhbHVlfTwvdGQ+KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICBsZXQgY2VsbERpc3BsYXkgPSBjb2x1bW4uZGlzcGxheUZ1bmMocmVjb3JkLCB2YWx1ZSk7XG4gICAgICAgICAgY2VsbHMucHVzaCg8dGQga2V5PXtrZXl9PntjZWxsRGlzcGxheX08L3RkPik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJvd3MucHVzaCg8dHIga2V5PXtpfT57Y2VsbHN9PC90cj4pO1xuICB9XG5cbiAgZnVuY3Rpb24gZXhwb3J0VGFibGUoKXtcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuXG4gICAgbGV0IGV4cG9ydFJvd3MgPSBbXTtcblxuICAgIGxldCBleHBvcnRIZWFkZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb2x1bW5zLm9yZGVyLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2ldO1xuICAgICAgbGV0IGNvbHVtbiA9IGNvbHVtbnMuYXR0cmlidXRlc1trZXldO1xuICAgICAgZXhwb3J0SGVhZGVycy5wdXNoKGNvbHVtbi5uYW1lKTtcbiAgICB9XG4gICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydEhlYWRlcnMuam9pbihcIixcIikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWx0ZXJlZFNvcnRlZFJlY29yZHM/Lmxlbmd0aCA/PyAwOyBpKyspe1xuICAgICAgbGV0IGV4cG9ydFJlY29yZCA9IFtdO1xuICAgICAgbGV0IHJlY29yZCA9IGZpbHRlcmVkU29ydGVkUmVjb3Jkc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29sdW1ucy5vcmRlci5sZW5ndGg7IGorKyl7XG4gICAgICAgIGxldCBrZXkgPSBjb2x1bW5zLm9yZGVyW2pdO1xuICAgICAgICBsZXQgY29sdW1uID0gY29sdW1ucy5hdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgc3dpdGNoIChjb2x1bW4udmFsdWVGdW5jID09IG51bGwpe1xuICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbHVtbi52YWx1ZUZ1bmMocmVjb3JkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBleHBvcnRSZWNvcmQucHVzaCgodmFsdWUgPT0gbnVsbCkgPyAnJyA6IFN0cmluZyh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgZXhwb3J0Um93cy5wdXNoKGV4cG9ydFJlY29yZC5qb2luKFwiLFwiKSk7XG4gICAgfVxuXG4gICAgY3N2Q29udGVudCArPSBleHBvcnRSb3dzLmpvaW4oXCJcXHJcXG5cIik7XG4gICAgdmFyIGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgd2luZG93Lm9wZW4oZW5jb2RlZFVyaSk7XG4gIH1cblxuICBjb25zdCBjYWNoZSA9IGNyZWF0ZUNhY2hlKHtcbiAgICBrZXk6ICdyYXJlLWVhcnRoJyxcbiAgICBub25jZTogcHJvcHMubm9uY2UsXG4gIH0pO1xuICBjYWNoZS5jb21wYXQgPSB0cnVlO1xuXG4gIGNvbnNvbGUuZGVidWcoJ1JlbmRlciBUYWJsZScpO1xuICByZXR1cm4oXG4gICAgPENhY2hlUHJvdmlkZXIgdmFsdWU9e2NhY2hlfT5cbiAgICAgIDxNYW50aW5lUHJvdmlkZXJcbiAgICAgICAgdGhlbWU9e3Byb3BzLnRoZW1lfVxuICAgICAgICB3aXRoR2xvYmFsU3R5bGVzXG4gICAgICAgIHdpdGhOb3JtYWxpemVDU1NcbiAgICAgICAgZW1vdGlvbkNhY2hlPXtjYWNoZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiByZWY9e3JlZn0gaWQ9e3Byb3BzLmlkfT5cbiAgICAgICAgICA8VGFibGVDb250cm9sXG4gICAgICAgICAgICBleHBvcnRUYWJsZT17ZXhwb3J0VGFibGV9XG4gICAgICAgICAgICBudW1SZWNvcmRzPXtyZWNvcmRzLmxlbmd0aH1cbiAgICAgICAgICAgIHNvcnRGaWVsZHM9e3NvcnRGaWVsZHN9XG4gICAgICAgICAgICBzZXRTb3J0RmllbGRzPXtzZXRTb3J0RmllbGRzfVxuICAgICAgICAgICAgc2VhcmNoPXtzZWFyY2h9XG4gICAgICAgICAgICBzZXRTZWFyY2g9e3NldFNlYXJjaH1cbiAgICAgICAgICAgIHBhZ2U9e3BhZ2V9XG4gICAgICAgICAgICBzZXRQYWdlPXtzZXRQYWdlfVxuICAgICAgICAgICAgcGFnZUxlbmd0aD17cGFnZUxlbmd0aH1cbiAgICAgICAgICAgIHNldFBhZ2VMZW5ndGg9e3NldFBhZ2VMZW5ndGh9XG4gICAgICAgICAgICBwYWdlTGVuZ3RoQ2hvaWNlcz17cGFnZUxlbmd0aENob2ljZXN9XG4gICAgICAgICAgICBwYWdlQ291bnQ9e3BhZ2VDb3VudH1cbiAgICAgICAgICAgIGRlYm91bmNlVGltZT17cHJvcHMuZGVib3VuY2VUaW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRhYmxlIGNzcz17dGFibGVDc3N9PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAge2NvbHVtbnNfaGVhZGVyc31cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIHtyb3dzfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTWFudGluZVByb3ZpZGVyPlxuICAgIDwvQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn0pO1xuXG5leHBvcnQge1xuICBUYWJsZSxcbn07XG4iXX0= */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  };
  var TableHeader = /*#__PURE__*/React.forwardRef(function (props, _ref7) {
    var _props$column$label;
    var _React$useState3 = React.useState(props.search[props.column_key]),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      searchInput = _React$useState4[0],
      setSearchInput = _React$useState4[1];
    var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2);
      _React$useState6[0];
      _React$useState6[1];
    React.useEffect(function () {
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
    var ascendingIcon = jsx(BsTriangleFill, {
      css: ascendingDeselectedCss
    });
    var descendingIcon = jsx(BsTriangleFill, {
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
            descendingIcon = jsx(BsTriangleFill, {
              css: descendingSelectedCss
            });
            break;
          case false:
            ascendingIcon = jsx(BsTriangleFill, {
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
    return jsx("th", null, jsx(Stack, {
      spacing: 0
    }, jsx("div", {
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
    }, jsx(Flex, {
      align: "center"
    }, jsx(Button, {
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
    }, jsx(Flex, {
      align: "center",
      justify: "center"
    }, column_sort_meta.index, jsx(Stack, {
      spacing: 4,
      className: "m-1"
    }, ascendingIcon, descendingIcon))), (_props$column$label = props.column.label) !== null && _props$column$label !== void 0 ? _props$column$label : props.column_key.toString())), jsx(Flex, {
      align: "center"
    }, jsx(TextInput, {
      value: searchInput !== null && searchInput !== void 0 ? searchInput : '',
      onChange: function onChange(event) {
        return setSearchInput(event.target.value == '' ? null : event.target.value);
      },
      css: _ref
    }))));
  });
  var Table = /*#__PURE__*/React.forwardRef(function (props, ref) {
    var _props$columns, _props$columns2, _props$records, _props$initialPageLen, _props$pageLengthChoi, _props$initialPage, _props$initialSortFie, _props$columns3, _props$index, _filteredSortedRecord;
    var _React$useState7 = React.useState({
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
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      columns = _React$useState8[0],
      setColumns = _React$useState8[1];
    var _React$useState9 = React.useState((_props$records = props.records) !== null && _props$records !== void 0 ? _props$records : []),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      records = _React$useState10[0],
      setRecords = _React$useState10[1];
    var _React$useState11 = React.useState((_props$initialPageLen = props.initialPageLength) !== null && _props$initialPageLen !== void 0 ? _props$initialPageLen : 10),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      pageLength = _React$useState12[0],
      setPageLength = _React$useState12[1];
    var _React$useState13 = React.useState((_props$pageLengthChoi = props.pageLengthChoices) !== null && _props$pageLengthChoi !== void 0 ? _props$pageLengthChoi : [10, 20, 50, 100, Infinity]),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      pageLengthChoices = _React$useState14[0];
      _React$useState14[1];
    var _React$useState15 = React.useState((_props$initialPage = props.initialPage) !== null && _props$initialPage !== void 0 ? _props$initialPage : 1),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      page = _React$useState16[0],
      setPage = _React$useState16[1];
    var _React$useState17 = React.useState((_props$initialSortFie = props.initialSortFields) !== null && _props$initialSortFie !== void 0 ? _props$initialSortFie : []),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      sortFields = _React$useState18[0],
      setSortFields = _React$useState18[1];
    var _React$useState19 = React.useState({
        global: null,
        fields: Object.fromEntries(((_props$columns3 = props.columns) !== null && _props$columns3 !== void 0 ? _props$columns3 : []).map(function (x, i) {
          return [x.key, null];
        }))
      }),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      search = _React$useState20[0],
      setSearch = _React$useState20[1];
    var headerRefs = React.useRef({});
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
    React.useEffect(function () {
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
    React.useEffect(function () {
      var _props$records2;
      setRecords((_props$records2 = props.records) !== null && _props$records2 !== void 0 ? _props$records2 : []);
    }, [props.records]);
    var filteredRecords = React.useMemo(function () {
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
    var filteredSortedRecords = React.useMemo(function () {
      console.debug('Sorting Records');
      var sortedRecords = filteredRecords.sort(compareRecords);
      return sortedRecords;
    }, [sortFields, search, records]);
    var columns_headers = [];
    if ((_props$index = props.index) !== null && _props$index !== void 0 ? _props$index : false) {
      columns_headers.push(jsx("th", null, "Index"));
    }
    for (var i = 0; i < columns.order.length; i++) {
      var key = columns.order[i];
      var column = columns.attributes[key];
      columns_headers.push(jsx(TableHeader, {
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
        cells.push(jsx("td", null, record[columns._indexKey]));
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
            cells.push(jsx("td", {
              key: _key
            }, value));
            break;
          case false:
            var cellDisplay = _column.displayFunc(record, value);
            cells.push(jsx("td", {
              key: _key
            }, cellDisplay));
            break;
        }
      }
      rows.push(jsx("tr", {
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
    return jsx(CacheProvider, {
      value: cache
    }, jsx(MantineProvider, {
      theme: props.theme,
      withGlobalStyles: true,
      withNormalizeCSS: true,
      emotionCache: cache
    }, jsx("div", {
      ref: ref,
      id: props.id
    }, jsx(TableControl, {
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
    }), jsx("table", {
      css: tableCss
    }, jsx("thead", null, jsx("tr", null, columns_headers)), jsx("tbody", null, rows)))));
  });

  exports.Table = Table;

}));
