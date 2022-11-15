(function (exports) {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
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

  {
    module.exports = require('./cjs/react.production.min.js');
  }

  var RareEarthValueValidationError = /*#__PURE__*/function (_Error) {
    _inherits(RareEarthValueValidationError, _Error);
    var _super = _createSuper(RareEarthValueValidationError);
    function RareEarthValueValidationError(record, column, value) {
      var _this;
      _classCallCheck(this, RareEarthValueValidationError);
      for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        params[_key - 3] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(params));
      _this.record = record;
      _this.column = column;
      _this.value = value;
      return _this;
    }
    return _createClass(RareEarthValueValidationError);
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  var RareEarthPropValidationError = /*#__PURE__*/function (_Error2) {
    _inherits(RareEarthPropValidationError, _Error2);
    var _super2 = _createSuper(RareEarthPropValidationError);
    function RareEarthPropValidationError(propName, propValue) {
      var _this2;
      _classCallCheck(this, RareEarthPropValidationError);
      for (var _len2 = arguments.length, params = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        params[_key2 - 2] = arguments[_key2];
      }
      _this2 = _super2.call.apply(_super2, [this].concat(params));
      _this2.propName = propName;
      _this2.propValue = propValue;
      return _this2;
    }
    return _createClass(RareEarthPropValidationError);
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  var RareEarth = {
    version: "0.0.8",
    ValueValidationError: RareEarthValueValidationError,
    PropValidationError: RareEarthPropValidationError,
    defaultProps: {
      pageLengthChoices: [10, 15, 25, 50, 100],
      userFields: {
        pageLength: 10,
        page: 1
      }
    },
    validateProps: function validateProps(props) {
      // Validate columns prop
      if (props.columns == null) {
        throw new RareEarth.PropValidationError('columns', props.columns, "The prop 'columns' is a required prop");
      }
      if (!Array.isArray(props.columns.order)) {
        throw new RareEarth.PropValidationError('columns', props.columns, "The prop 'columns.order' must be an array");
      }

      // Validate pageLengthChoices prop
      if (props.pageLengthChoices != null) {
        if (Array.isArray(props.pageLengthChoices) != true) {
          throw new RareEarth.PropValidationError('pageLengthChoices', props.pageLengthChoices, "The prop 'pageLengthChoices' must be an Array of positive integers. Not Array");
        }
        if (!props.pageLengthChoices.every(function (x) {
          return Number.isInteger(parseFloat(x));
        })) {
          throw new RareEarth.PropValidationError('pageLengthChoices', props.pageLengthChoices, "The prop 'pageLengthChoices' must be an array of positive integers. Not Integers");
        }
        if (!props.pageLengthChoices.every(function (x) {
          return parseFloat(x) > 0;
        })) {
          throw new RareEarth.PropValidationError('pageLengthChoices', props.pageLengthChoices, "The prop 'pageLengthChoices' must be an array of positive integers. Not Positive");
        }
      }

      // Validate userFields prop
      if (props.userFields != null) {
        // Validate userFields.pageLength
        if (props.userFields.pageLength != null) {
          var _props$userFields$pag, _props$userFields;
          if (!Number.isInteger(parseFloat(props.userFields.pageLength))) {
            throw new RareEarth.PropValidationError('userFields.pageLength', props.userFields.pageLength, "The prop 'userFields.pageLength' must be a positive integer in the pageLengthChoices. Not Integer");
          }
          if (parseFloat(props.userFields.pageLength) <= 0) {
            throw new RareEarth.PropValidationError('userFields.pageLength', props.userFields.pageLength, "The prop 'userFields.pageLength' must be a positive integer in the pageLengthChoices. Not Positive");
          }
          if (!((_props$userFields$pag = (_props$userFields = props.userFields) === null || _props$userFields === void 0 ? void 0 : _props$userFields.pageLengthChoices) !== null && _props$userFields$pag !== void 0 ? _props$userFields$pag : RareEarth.defaultProps.pageLengthChoices).map(parseFloat).includes(props.userFields.pageLength)) {
            throw new RareEarth.PropValidationError('userFields.pageLength', props.userFields.pageLength, "The prop 'userFields.pageLength' must be a positive integer in the pageLengthChoices. Not in pageLengthChoices");
          }
        }

        // Validate userFields.page
        if (props.userFields.page != null) {
          if (!Number.isInteger(parseFloat(props.userFields.page))) {
            throw new RareEarth.PropValidationError('userFields.page', props.userFields.page, "The prop 'userFields.page' must be a positive integer. Not Integer");
          }
          if (parseFloat(props.userFields.page) <= 0) {
            throw new RareEarth.PropValidationError('userFields.page', props.userFields.page, "The prop 'userFields.page' must be a positive integer in the pageLengthChoices. Not Positive");
          }
        }

        // Validate userFields.sortFields
        if (props.userFields.sortFields != null) {
          if (!Array.isArray(props.userFields.sortFields)) {
            throw new RareEarth.PropValidationError('userFields.sortFields', props.userFields.sortFields, "The prop 'userFields.sortField' must be an Array of objects of the form {'key': column_key, 'reverse': bool}. Not Array");
          }
          for (var i = 0; i < props.userFields.sortFields.length; i++) {}
        }
      }
    },
    TablePagination: function TablePagination(props) {
      function setPageLength(pageLength) {
        var firstEntry = (props.userFields.page - 1) * props.userFields.pageLength + 1;
        var firstEntryPage = Math.ceil(firstEntry / pageLength);
        props.setUserFields({
          pageLength: pageLength,
          page: firstEntryPage,
          sortFields: props.userFields.sortFields,
          searchText: props.userFields.searchText,
          useSearchRegex: props.userFields.searchText,
          nullOrder: props.userFields.nullOrder
        });
      }
      var pageLengthOptions = [];
      var addNextPageOption = true;
      for (var i = 0; i < props.pageLengthChoices.length; i++) {
        var pageLength = props.pageLengthChoices[i];
        switch (pageLength < props.numRecords) {
          case true:
            pageLengthOptions.push( /*#__PURE__*/undefined("option", {
              key: pageLength,
              value: pageLength
            }, pageLength));
            break;
          case false:
            pageLengthOptions.push( /*#__PURE__*/undefined("option", {
              key: props.numRecords,
              value: props.numRecords
            }, props.numRecords, " (All)"));
            addNextPageOption = false;
            break;
        }
        if (!addNextPageOption) {
          break;
        }
      }
      var paginationButtonStyles = {
        border: '1px solid black',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        margin: '0.25rem 0.25rem'
      };
      function setPage(page) {
        props.setUserFields({
          pageLength: props.userFields.pageLength,
          page: page,
          sortFields: props.userFields.sortFields,
          searchText: props.userFields.searchText,
          useSearchRegex: props.userFields.searchText,
          nullOrder: props.userFields.nullOrder
        });
      }
      var paginationButtons = [];
      switch (props.userFields.page == 1) {
        case false:
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: "<<",
            style: paginationButtonStyles,
            onClick: function onClick() {
              return setPage(1);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(60) + String.fromCharCode(60))));
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: "<",
            style: paginationButtonStyles,
            onClick: function onClick() {
              return setPage(props.userFields.page - 1);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(60))));
          break;
        case true:
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: "<<",
            style: Object.assign({}, paginationButtonStyles, {
              visibility: 'hidden'
            }),
            onClick: function onClick() {
              return setPage(1);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(60) + String.fromCharCode(60))));
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: "<",
            style: Object.assign({}, paginationButtonStyles, {
              visibility: 'hidden'
            }),
            onClick: function onClick() {
              return setPage(props.userFields.page - 1);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(60))));
          break;
      }
      var _loop = function _loop(_i) {
        switch (_i < 1) {
          case true:
            paginationButtons.push( /*#__PURE__*/undefined("button", {
              key: _i,
              style: Object.assign({}, paginationButtonStyles, {
                visibility: 'hidden'
              }),
              onClick: function onClick() {
                return setPage(_i);
              }
            }, /*#__PURE__*/undefined("b", null, _i)));
            break;
          case false:
            paginationButtons.push( /*#__PURE__*/undefined("button", {
              key: _i,
              style: paginationButtonStyles,
              onClick: function onClick() {
                return setPage(_i);
              }
            }, /*#__PURE__*/undefined("b", null, _i)));
            break;
        }
      };
      for (var _i = props.userFields.page - 3; _i < props.userFields.page; _i++) {
        _loop(_i);
      }
      paginationButtons.push( /*#__PURE__*/undefined("button", {
        key: props.userFields.page
      }, /*#__PURE__*/undefined("b", null, "Page " + props.userFields.page + " of " + props.pageCount)));
      var _loop2 = function _loop2(_i2) {
        switch (_i2 > props.pageCount) {
          case true:
            paginationButtons.push( /*#__PURE__*/undefined("button", {
              key: _i2,
              style: Object.assign({}, paginationButtonStyles, {
                visibility: 'hidden'
              }),
              onClick: function onClick() {
                return setPage(_i2);
              }
            }, /*#__PURE__*/undefined("b", null, _i2)));
            break;
          case false:
            paginationButtons.push( /*#__PURE__*/undefined("button", {
              key: _i2,
              style: paginationButtonStyles,
              onClick: function onClick() {
                return setPage(_i2);
              }
            }, /*#__PURE__*/undefined("b", null, _i2)));
        }
      };
      for (var _i2 = props.userFields.page + 1; _i2 < props.userFields.page + 4; _i2++) {
        _loop2(_i2);
      }
      switch (props.userFields.page == props.pageCount) {
        case false:
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: ">",
            style: paginationButtonStyles,
            onClick: function onClick() {
              return setPage(props.userFields.page + 1);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(62))));
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: ">>",
            style: paginationButtonStyles,
            onClick: function onClick() {
              return setPage(props.pageCount);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(62) + String.fromCharCode(62))));
          break;
        case true:
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: ">",
            style: Object.assign({}, paginationButtonStyles, {
              visibility: 'hidden'
            }),
            onClick: function onClick() {
              return setPage(props.userFields.page + 1);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(62))));
          paginationButtons.push( /*#__PURE__*/undefined("button", {
            key: ">>",
            style: Object.assign({}, paginationButtonStyles, {
              visibility: 'hidden'
            }),
            onClick: function onClick() {
              return setPage(props.pageCount);
            }
          }, /*#__PURE__*/undefined("b", null, String.fromCharCode(62) + String.fromCharCode(62))));
          break;
      }
      return /*#__PURE__*/undefined("div", {
        style: {
          display: 'flex',
          alignItems: "center",
          backgroundColor: '#212529'
        }
      }, /*#__PURE__*/undefined("label", {
        htmlFor: props.tableId + "-pageLengthSelect",
        style: {
          color: "#FFFFFF",
          padding: "0.25rem"
        }
      }, "Page Length"), /*#__PURE__*/undefined("select", {
        id: props.tableId + "-pageLengthSelect",
        autoComplete: "off",
        style: {
          padding: "0.25rem"
        },
        value: props.userFields.pageLength,
        onChange: function onChange(event) {
          return setPageLength(event.target.value);
        }
      }, pageLengthOptions), paginationButtons);
    },
    TableHeader: function TableHeader(props) {
      function setSortFields(sortFields) {
        props.setUserFields({
          pageLength: props.userFields.pageLength,
          page: props.userFields.page,
          sortFields: sortFields,
          searchText: props.userFields.searchText,
          useSearchRegex: props.userFields.searchText,
          nullOrder: props.userFields.nullOrder
        });
      }
      function sortFieldClick(event) {
        var this_field_reverse = null;
        for (var i = 0; i < props.userFields.sortFields.length; i++) {
          var sortField = props.userFields.sortFields[i];
          if (sortField['key'] == props.column_key) {
            this_field_reverse = sortField['reverse'];
          }
        }
        var new_sort_fields = [];
        switch (event.shiftKey) {
          case false:
            switch (props.userFields.sortFields.length < 2) {
              case true:
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
              case false:
                new_sort_fields.push({
                  'key': props.column_key,
                  'reverse': false
                });
                break;
            }
            break;
          case true:
            var current_key_included = false;
            for (var _i3 = 0; _i3 < props.userFields.sortFields.length; _i3++) {
              var _sortField = props.userFields.sortFields[_i3];
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
        setSortFields(new_sort_fields);
      }
      var sortButtonStyle = {
        backgroundColor: '#FFFFFF',
        border: '1px solid black',
        borderRadius: '.25rem',
        cursor: 'pointer',
        display: 'flex',
        flex: '1',
        height: '100%',
        padding: '.125rem .0625rem',
        position: 'relative'
      };
      var sortArrowStyles = {
        up: {
          color: "#adb5bd"
        },
        down: {
          color: "#adb5bd"
        }
      };
      var column_sort_meta = {
        'symbol': null,
        'index': null
      };
      for (var i = 0; i < props.userFields.sortFields.length; i++) {
        var sortField = props.userFields.sortFields[i];
        if (sortField.key == props.column_key) {
          switch (sortField.reverse) {
            case true:
              sortArrowStyles.up.color = "#adb5bd";
              sortArrowStyles.down.color = "#212529";
              break;
            case false:
              sortArrowStyles.up.color = "#212529";
              sortArrowStyles.down.color = "#adb5bd";
              break;
            case null:
              sortArrowStyles.up.color = "#adb5bd";
              sortArrowStyles.down.color = "#adb5bd";
              break;
          }
          column_sort_meta.index = i + 1;
        }
      }
      function swapColumns(columnA, columnB) {
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
                      newColumnOrder.push(columnB);
                      break;
                    case false:
                      newColumnOrder.push(columnA);
                      break;
                  }
              }
            }
            props.setColumns({
              index: props.columns.index,
              order: newColumnOrder,
              attributes: props.columns.attributes
            });
        }
      }
      function onDragStartHandle(event) {
        event.dataTransfer.setData('initiator', event.target.getAttribute('data-rare-earth-column-key'));
      }
      function onDropHandle(event) {
        event.preventDefault();
        var columnA = event.dataTransfer.getData('initiator');
        var columnB = event.target.getAttribute('data-rare-earth-column-key');
        switch (columnB == null) {
          case true:
            return;
          case false:
            swapColumns(columnA, columnB);
        }
      }
      return /*#__PURE__*/undefined("th", {
        "data-rare-earth-column-key": props.column_key,
        draggable: "true",
        onDragStart: onDragStartHandle,
        onDragOver: function onDragOver(event) {
          return event.preventDefault();
        },
        onDragEnter: function onDragEnter(event) {
          return event.preventDefault();
        },
        onDrop: onDropHandle
      }, /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: {
          alignItems: 'center',
          display: 'flex'
        }
      }, /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: {
          padding: '0px 8px 0px 8px',
          flex: '0 0',
          position: 'relative'
        }
      }, /*#__PURE__*/undefined("button", {
        "data-rare-earth-column-key": props.column_key,
        style: sortButtonStyle,
        onClick: sortFieldClick
      }, /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: {
          minWidth: '18px',
          height: '100%',
          minHeight: '3rem'
        }
      }, /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: sortArrowStyles.up
      }, "\u25B2"), /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: sortArrowStyles.down
      }, "\u25BC")), /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minWidth: '18px',
          height: '100%',
          minHeight: '3rem'
        }
      }, /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: {}
      }, column_sort_meta.index)))), /*#__PURE__*/undefined("div", {
        "data-rare-earth-column-key": props.column_key,
        style: {
          flex: '1'
        }
      }, props.column.name)));
    },
    ExportWidget: function ExportWidget(props) {
      return /*#__PURE__*/undefined("button", {
        className: "btn btn-dark m-1",
        onClick: props.exportTable
      }, "Export");
    },
    Table: /*#__PURE__*/undefined(function (props, ref) {
      var _props$display, _props$columns, _props$records, _props$pageLengthChoi, _props$userFields$pag2, _props$userFields2, _props$userFields$pag3, _props$userFields3, _props$userFields$sor, _props$userFields4, _props$userFields$sea, _props$userFields5, _props$userFields$sea2, _props$userFields6, _props$userFields$nul, _props$userFields7, _props$tableClasses$j, _props$tableClasses;
      RareEarth.validateProps(props);
      var rareEarthRef = ref !== null && ref !== void 0 ? ref : undefined(null);
      var _React$useState = undefined((_props$display = props.display) !== null && _props$display !== void 0 ? _props$display : {}),
        _React$useState2 = _slicedToArray(_React$useState, 2);
        _React$useState2[0];
        _React$useState2[1];
      var _React$useState3 = undefined((_props$columns = props.columns) !== null && _props$columns !== void 0 ? _props$columns : {}),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        columns = _React$useState4[0],
        setColumns = _React$useState4[1];
      var _React$useState5 = undefined((_props$records = props.records) !== null && _props$records !== void 0 ? _props$records : []),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        records = _React$useState6[0],
        setRecords = _React$useState6[1];
      var _React$useState7 = undefined((_props$pageLengthChoi = props.pageLengthChoices) !== null && _props$pageLengthChoi !== void 0 ? _props$pageLengthChoi : RareEarth.defaultProps.pageLengthChoices),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        pageLengthChoices = _React$useState8[0];
        _React$useState8[1];
      var _React$useState9 = undefined({
          pageLength: (_props$userFields$pag2 = props === null || props === void 0 ? void 0 : (_props$userFields2 = props.userFields) === null || _props$userFields2 === void 0 ? void 0 : _props$userFields2.pageLength) !== null && _props$userFields$pag2 !== void 0 ? _props$userFields$pag2 : RareEarth.defaultProps.userFields.pageLength,
          page: (_props$userFields$pag3 = props === null || props === void 0 ? void 0 : (_props$userFields3 = props.userFields) === null || _props$userFields3 === void 0 ? void 0 : _props$userFields3.page) !== null && _props$userFields$pag3 !== void 0 ? _props$userFields$pag3 : RareEarth.defaultProps.userFields.page,
          sortFields: (_props$userFields$sor = props === null || props === void 0 ? void 0 : (_props$userFields4 = props.userFields) === null || _props$userFields4 === void 0 ? void 0 : _props$userFields4.sortFields) !== null && _props$userFields$sor !== void 0 ? _props$userFields$sor : [],
          searchText: (_props$userFields$sea = props === null || props === void 0 ? void 0 : (_props$userFields5 = props.userFields) === null || _props$userFields5 === void 0 ? void 0 : _props$userFields5.searchText) !== null && _props$userFields$sea !== void 0 ? _props$userFields$sea : {},
          useSearchRegex: (_props$userFields$sea2 = props === null || props === void 0 ? void 0 : (_props$userFields6 = props.userFields) === null || _props$userFields6 === void 0 ? void 0 : _props$userFields6.searchText) !== null && _props$userFields$sea2 !== void 0 ? _props$userFields$sea2 : {},
          nullOrder: (_props$userFields$nul = props === null || props === void 0 ? void 0 : (_props$userFields7 = props.userFields) === null || _props$userFields7 === void 0 ? void 0 : _props$userFields7.nullOrder) !== null && _props$userFields$nul !== void 0 ? _props$userFields$nul : {}
        }),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        userFields = _React$useState10[0],
        setUserFields = _React$useState10[1];
      undefined(function () {
        return setColumns(props.columns);
      }, [props.records]);
      undefined(function () {
        return setRecords(props.records);
      }, [props.records]);

      // Getters and Setters on Ref
      undefined(function () {
        rareEarthRef.current.getUserFields = function () {
          return userFields;
        };
      }, [userFields]);
      undefined(function () {
        rareEarthRef.current.setUserFields = function (newUserFields) {
          var _newUserFields$pageLe, _newUserFields$page, _newUserFields$sortFi, _newUserFields$search, _newUserFields$useSea, _newUserFields$nullOr;
          setUserFields({
            pageLength: (_newUserFields$pageLe = newUserFields === null || newUserFields === void 0 ? void 0 : newUserFields.pageLength) !== null && _newUserFields$pageLe !== void 0 ? _newUserFields$pageLe : userFields.pageLength,
            page: (_newUserFields$page = newUserFields === null || newUserFields === void 0 ? void 0 : newUserFields.page) !== null && _newUserFields$page !== void 0 ? _newUserFields$page : userFields.page,
            sortFields: (_newUserFields$sortFi = newUserFields === null || newUserFields === void 0 ? void 0 : newUserFields.sortFields) !== null && _newUserFields$sortFi !== void 0 ? _newUserFields$sortFi : userFields.sortFields,
            searchText: (_newUserFields$search = newUserFields === null || newUserFields === void 0 ? void 0 : newUserFields.searchText) !== null && _newUserFields$search !== void 0 ? _newUserFields$search : userFields.searchText,
            useSearchRegex: (_newUserFields$useSea = newUserFields === null || newUserFields === void 0 ? void 0 : newUserFields.useSearchRegex) !== null && _newUserFields$useSea !== void 0 ? _newUserFields$useSea : userFields.useSearchRegex,
            nullOrder: (_newUserFields$nullOr = newUserFields === null || newUserFields === void 0 ? void 0 : newUserFields.nullOrder) !== null && _newUserFields$nullOr !== void 0 ? _newUserFields$nullOr : userFields.nullOrder
          });
        };
      }, []);
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
        for (var i = 0; i < userFields.sortFields.length; i++) {
          var sortField = userFields.sortFields[i]['key'];
          var reverse = userFields.sortFields[i]['reverse'];
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
      var sortedRecords = undefined(function () {
        console.debug('Sorting Records');
        return records.sort(compareRecords);
      }, [userFields.sortFields, userFields.searchText, userFields.useSearchRegex, userFields.nullOrder, records]);
      var columns_headers = [];
      for (var i = 0; i < columns.order.length; i++) {
        var key = columns.order[i];
        var column = columns.attributes[key];
        columns_headers.push( /*#__PURE__*/undefined(RareEarth.TableHeader, {
          key: key,
          columns: columns,
          setColumns: setColumns,
          column_key: key,
          column: column,
          userFields: userFields,
          setUserFields: setUserFields
        }));
      }
      var pageCount = Math.ceil(sortedRecords.length / userFields.pageLength);
      var rows = [];
      for (var _i5 = (userFields.page - 1) * userFields.pageLength; _i5 < Math.min(userFields.page * userFields.pageLength, sortedRecords.length); _i5++) {
        var record = sortedRecords[_i5];
        var cells = [];
        for (var j = 0; j < columns.order.length; j++) {
          var _key3 = columns.order[j];
          var _column = columns.attributes[_key3];
          var value;
          switch (_column.valueFunc == null) {
            case false:
              value = _column.valueFunc(record);
              break;
            case true:
              value = record[_key3];
              break;
          }
          if (value == null && !_column.allow_null) {
            throw new RareEarth.ValueValidationError(record, _column, value, "RareEarth.ValueValidationError: null values not allowed in the column '".concat(_key3, "'. Error occurs in record ").concat(JSON.stringify(record)));
          }
          if (_typeof(value) != _column.type && value != null) {
            throw new RareEarth.ValueValidationError(record, _column, value, "RareEarth.ValueValidationError: Received type '".concat(_typeof(value), "' in the column '").concat(_key3, ", expected type '").concat(_column.type, "'. Error occurs in record ").concat(JSON.stringify(record), " with value ").concat(value));
          }
          switch (_column.displayFunc == null) {
            case true:
              cells.push( /*#__PURE__*/undefined("td", {
                key: _key3
              }, value));
              break;
            case false:
              var cellDisplay = _column.displayFunc(record, value);
              cells.push( /*#__PURE__*/undefined("td", {
                key: _key3
              }, cellDisplay));
              break;
          }
        }
        rows.push( /*#__PURE__*/undefined("tr", {
          key: _i5
        }, cells));
      }
      function exportTable() {
        var csvContent = "data:text/csv;charset=utf-8,";
        var exportRows = [];
        var exportHeaders = [];
        for (var _i6 = 0; _i6 < columns.order.length; _i6++) {
          var _key4 = columns.order[_i6];
          var _column2 = columns.attributes[_key4];
          exportHeaders.push(_column2.name);
        }
        exportRows.push(exportHeaders.join(","));
        for (var i = 0; i < sortedRecords.length; i++) {
          var exportRecord = [];
          var _record = sortedRecords[i];
          for (var _j = 0; _j < columns.order.length; _j++) {
            var _key5 = columns.order[_j];
            var _column3 = columns.attributes[_key5];
            var value;
            switch (_column3.valueFunc == null) {
              case false:
                value = _column3.valueFunc(_record);
                break;
              case true:
                value = _record[_key5];
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
      console.debug('Render Table');
      return /*#__PURE__*/undefined("div", {
        ref: rareEarthRef,
        id: props.id
      }, /*#__PURE__*/undefined(RareEarth.TablePagination, {
        tableId: 1,
        numRecords: records.length,
        pageLengthChoices: pageLengthChoices.sort(function (a, b) {
          return a > b;
        }),
        userFields: userFields,
        setUserFields: setUserFields,
        pageCount: pageCount
      }), /*#__PURE__*/undefined(RareEarth.ExportWidget, {
        exportTable: exportTable
      }), /*#__PURE__*/undefined("table", {
        className: (_props$tableClasses$j = (_props$tableClasses = props.tableClasses) === null || _props$tableClasses === void 0 ? void 0 : _props$tableClasses.join(' ')) !== null && _props$tableClasses$j !== void 0 ? _props$tableClasses$j : ''
      }, /*#__PURE__*/undefined("thead", null, /*#__PURE__*/undefined("tr", null, columns_headers)), /*#__PURE__*/undefined("tbody", null, rows)));
    }),
    Examples: {
      display: {
        'title': 'This is an Example Table',
        'pagination_options': [10, 15, 25, 50]
      },
      columns: {
        index: false,
        order: ['example_column_key_1', 'example_column_key_2', 'example_column_key_3'],
        attributes: {
          'example_column_key_1': {
            name: 'Example Column Name 1',
            type: 'string',
            allow_null: true
          },
          'example_column_key_2': {
            name: 'Example Column Name 2',
            type: 'number',
            allow_null: true
          },
          'example_column_key_3': {
            name: 'Functional Example Concat',
            type: 'string',
            allow_null: true,
            valueFunc: function valueFunc(record) {
              return record['example_column_key_1'] == null || record['example_column_key_2'] == null ? null : record['example_column_key_1'] + record['example_column_key_2'];
            },
            displayFunc: function displayFunc(record, value) {
              return /*#__PURE__*/undefined("button", {
                onClick: function onClick(event) {
                  return console.log("The value is: " + value);
                }
              }, record['example_column_key_1'] == null || record['example_column_key_2'] == null ? null : record['example_column_key_1'] + record['example_column_key_2']);
            }
          }
        }
      },
      records: [{
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'abc',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 123
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': 456
      }, {
        'example_column_key_1': 'def',
        'example_column_key_2': null
      }, {
        'example_column_key_1': null,
        'example_column_key_2': 456
      }]
    }
  };

  exports.RareEarth = RareEarth;

  return exports;

})({});
