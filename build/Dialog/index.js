"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var Ionicons = _interopRequireWildcard(require("react-icons/io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  display: block;\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 600;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  padding: 8px 0;\n\n  &:first-of-type {\n    padding-top: 0;\n  }\n\n  &:last-of-type {\n    padding-bottom: 0;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  font-family: ", ";\n  color: ", ";\n  list-style: none;\n  margin: 0;\n  padding: 16px;\n  font-size: 1em;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  opacity: ", ";\n  color: ", ";\n  background: none;\n  border: none;\n  outline: none;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  background: none;\n  border: none;\n  outline: none;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-family: ", ";\n  color: ", ";\n  font-weight: ", ";\n  font-size: 1.2em;\n  margin: 0;\n  flex: 5;\n  text-align: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  padding: 16px 8px;\n\n  > div {\n    display: flex;\n    flex-direction: row;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  overflow: auto;\n  flex: 1;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: ", "px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: ", ";\n  box-shadow: 5px 5px 10px 2px ", ";\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents["default"].div(_templateObject(), function (_ref) {
  var width = _ref.width;
  return width;
}, function (_ref2) {
  var height = _ref2.height;
  return height;
}, function (_ref3) {
  var background = _ref3.background;
  return background;
}, function (_ref4) {
  var shadowColor = _ref4.shadowColor;
  return shadowColor;
});

var ScrollWrapper = _styledComponents["default"].div(_templateObject2());

var Header = _styledComponents["default"].div(_templateObject3(), function (_ref5) {
  var background = _ref5.background;
  return background;
});

var Title = _styledComponents["default"].h3(_templateObject4(), function (_ref6) {
  var fontFamily = _ref6.fontFamily;
  return fontFamily;
}, function (_ref7) {
  var color = _ref7.color;
  return color;
}, function (_ref8) {
  var fontWeight = _ref8.fontWeight;
  return fontWeight;
});

var CloseButton = _styledComponents["default"].button(_templateObject5(), function (_ref9) {
  var color = _ref9.color;
  return color;
});

var BackButton = _styledComponents["default"].button(_templateObject6(), function (_ref10) {
  var showBack = _ref10.showBack;
  return showBack ? 1 : 0;
}, function (_ref11) {
  var color = _ref11.color;
  return color;
});

var Body = _styledComponents["default"].ul(_templateObject7(), function (_ref12) {
  var fontFamily = _ref12.fontFamily;
  return fontFamily;
}, function (_ref13) {
  var color = _ref13.color;
  return color;
});

var Field = _styledComponents["default"].li(_templateObject8());

var Label = _styledComponents["default"].label(_templateObject9());

var Value = _styledComponents["default"].div(_templateObject10());

var EventLink = _styledComponents["default"].a(_templateObject11(), function (_ref14) {
  var color = _ref14.color;
  return color;
});

var Dialog =
/*#__PURE__*/
function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dialog).call(this, props));

    _this.onResize = function () {
      _this.setState({
        screenWidth: window.screen.availWidth,
        screenHeight: window.screen.availHeight
      });
    };

    _this.goBack = function () {
      _this.setState({
        selectedEvent: -1
      });
    };

    _this.selectEvent = function (index) {
      _this.setState({
        selectedEvent: index
      });
    };

    _this.state = {
      selectedEvent: -1,
      screenWidth: 0,
      screenHeight: 0
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height;
      var _this$state = this.state,
          screenWidth = _this$state.screenWidth,
          screenHeight = _this$state.screenHeight;
      if (width > screenWidth || height > screenHeight) return screenWidth;
      return width;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height;
      var _this$state2 = this.state,
          screenWidth = _this$state2.screenWidth,
          screenHeight = _this$state2.screenHeight;
      if (width > screenWidth || height > screenHeight) return screenHeight;
      return height;
    }
  }, {
    key: "renderIonicon",
    value: function renderIonicon(iconName, color) {
      var normalisedIconName = "".concat(iconName[0].toUpperCase()).concat(iconName.substring(1)).replace(/-(.)/g, function (m) {
        return m[1].toUpperCase();
      });
      var key = "Io".concat(normalisedIconName);
      var IconComponent = Ionicons[key];
      if (!IconComponent) throw new Error("Invalid icon ".concat(iconName));
      return _react["default"].createElement(IconComponent, {
        color: color,
        size: "1.5em"
      });
    }
  }, {
    key: "getBackButtonIcon",
    value: function getBackButtonIcon() {
      var theme = this.props.theme;
      if (typeof theme.backButton === 'string') return this.renderIonicon(theme.backButton, theme.buttonColor);
      return theme.backButton;
    }
  }, {
    key: "getCloseButtonIcon",
    value: function getCloseButtonIcon() {
      var theme = this.props.theme;
      if (typeof theme.closeButton === 'string') return this.renderIonicon(theme.closeButton, theme.buttonColor);
      return theme.closeButton;
    }
  }, {
    key: "getHeader",
    value: function getHeader(title, showBack, DialogTitleComponent, event) {
      var _this2 = this;

      var _this$props3 = this.props,
          closeDialog = _this$props3.closeDialog,
          theme = _this$props3.theme;
      return _react["default"].createElement(Header, {
        background: theme.headerBackground
      }, _react["default"].createElement("div", {
        className: "dialog-header"
      }, _react["default"].createElement(BackButton, {
        showBack: showBack,
        onClick: function onClick() {
          return showBack && _this2.goBack();
        },
        color: theme.buttonColor
      }, this.getBackButtonIcon()), _react["default"].createElement(Title, {
        color: theme.titleFontColor,
        fontFamily: theme.titleFontFamily,
        fontWeight: theme.titleFontWeight
      }, DialogTitleComponent && _react["default"].createElement(DialogTitleComponent, {
        event: event,
        multipleEvents: Array.isArray(event)
      }), !DialogTitleComponent && title), _react["default"].createElement(CloseButton, {
        onClick: closeDialog,
        color: theme.buttonColor
      }, this.getCloseButtonIcon())));
    }
  }, {
    key: "getSelectEventHandler",
    value: function getSelectEventHandler(index) {
      var _this3 = this;

      return function (e) {
        e.preventDefault();

        _this3.selectEvent(index);
      };
    }
  }, {
    key: "renderMultipleEvents",
    value: function renderMultipleEvents() {
      var _this4 = this;

      var _this$props4 = this.props,
          events = _this$props4.events,
          theme = _this$props4.theme,
          DialogTitleComponent = _this$props4.DialogTitleComponent;
      var width = this.getWidth();
      var height = this.getHeight();
      var title = "Events near ".concat(events[0].location);
      return _react["default"].createElement(Container, {
        className: "dialog",
        width: width,
        height: height,
        background: theme.containerBackground,
        shadowColor: theme.shadowColor
      }, this.getHeader(title, false, DialogTitleComponent, events), _react["default"].createElement(ScrollWrapper, null, _react["default"].createElement(Body, {
        background: theme.bodyBackground
      }, events.map(function (event, index) {
        return _react["default"].createElement(Field, {
          key: event.id
        }, _react["default"].createElement(EventLink, {
          href: "#",
          onClick: _this4.getSelectEventHandler(index),
          color: theme.linkColor
        }, event.name));
      }))));
    }
  }, {
    key: "renderSingleEvent",
    value: function renderSingleEvent(event) {
      var _this$props5 = this.props,
          theme = _this$props5.theme,
          DialogBodyComponent = _this$props5.DialogBodyComponent,
          DialogTitleComponent = _this$props5.DialogTitleComponent;
      var width = this.getWidth();
      var height = this.getHeight();
      return _react["default"].createElement(Container, {
        className: "dialog",
        width: width,
        height: height,
        background: theme.containerBackground,
        shadowColor: theme.shadowColor
      }, this.getHeader(event.name, this.props.events.length > 1, DialogTitleComponent, event), _react["default"].createElement(ScrollWrapper, null, _react["default"].createElement(Body, {
        className: "dialog-body",
        fontFamily: theme.bodyFontFamily,
        color: theme.bodyFontColor,
        background: theme.bodyBackground
      }, DialogBodyComponent && _react["default"].createElement(DialogBodyComponent, {
        event: event
      }), !DialogBodyComponent && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Field, null, _react["default"].createElement(Label, null, "Where?"), _react["default"].createElement(Value, null, event.location)), _react["default"].createElement(Field, null, _react["default"].createElement(Label, null, "When?"), _react["default"].createElement(Value, null, event.datetime)), _react["default"].createElement(Field, null, _react["default"].createElement(Label, null, "Event URL:"), _react["default"].createElement(EventLink, {
        href: event.url,
        target: "_blank",
        color: theme.linkColor
      }, event.url))))));
    }
  }, {
    key: "render",
    value: function render() {
      var events = this.props.events;
      var selectedEvent = this.state.selectedEvent;
      if (events.length > 1 && selectedEvent < 0) return this.renderMultipleEvents();
      var event = events.length > 1 ? events[selectedEvent] : events[0];
      return this.renderSingleEvent(event);
    }
  }]);

  return Dialog;
}(_react.Component);

exports["default"] = Dialog;
Dialog.propTypes = {
  events: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].string.isRequired,
    name: _propTypes["default"].string.isRequired,
    datetime: _propTypes["default"].string.isRequired,
    lat: _propTypes["default"].number.isRequired,
    lon: _propTypes["default"].number.isRequired,
    location: _propTypes["default"].string.isRequired,
    url: _propTypes["default"].string.isRequired
  })),
  closeDialog: _propTypes["default"].func.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  DialogTitleComponent: _propTypes["default"].func,
  DialogBodyComponent: _propTypes["default"].func,
  theme: _propTypes["default"].shape({
    titleFontFamily: _propTypes["default"].string.isRequired,
    titleFontColor: _propTypes["default"].string.isRequired,
    titleFontWeight: _propTypes["default"].string.isRequired,
    headerBackground: _propTypes["default"].string.isRequired,
    bodyBackground: _propTypes["default"].string.isRequired,
    containerBackground: _propTypes["default"].string.isRequired,
    shadowColor: _propTypes["default"].string.isRequired,
    buttonColor: _propTypes["default"].string.isRequired,
    bodyFontFamily: _propTypes["default"].string.isRequired,
    bodyFontColor: _propTypes["default"].string.isRequired,
    linkColor: _propTypes["default"].string.isRequired,
    backButton: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]).isRequired,
    closeButton: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]).isRequired
  }).isRequired
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9EaWFsb2cvaW5kZXguanMiXSwibmFtZXMiOlsiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2Iiwid2lkdGgiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kIiwic2hhZG93Q29sb3IiLCJTY3JvbGxXcmFwcGVyIiwiSGVhZGVyIiwiVGl0bGUiLCJoMyIsImZvbnRGYW1pbHkiLCJjb2xvciIsImZvbnRXZWlnaHQiLCJDbG9zZUJ1dHRvbiIsImJ1dHRvbiIsIkJhY2tCdXR0b24iLCJzaG93QmFjayIsIkJvZHkiLCJ1bCIsIkZpZWxkIiwibGkiLCJMYWJlbCIsImxhYmVsIiwiVmFsdWUiLCJFdmVudExpbmsiLCJhIiwiRGlhbG9nIiwicHJvcHMiLCJvblJlc2l6ZSIsInNldFN0YXRlIiwic2NyZWVuV2lkdGgiLCJ3aW5kb3ciLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwic2NyZWVuSGVpZ2h0IiwiYXZhaWxIZWlnaHQiLCJnb0JhY2siLCJzZWxlY3RlZEV2ZW50Iiwic2VsZWN0RXZlbnQiLCJpbmRleCIsInN0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpY29uTmFtZSIsIm5vcm1hbGlzZWRJY29uTmFtZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyaW5nIiwicmVwbGFjZSIsIm0iLCJrZXkiLCJJY29uQ29tcG9uZW50IiwiSW9uaWNvbnMiLCJFcnJvciIsInRoZW1lIiwiYmFja0J1dHRvbiIsInJlbmRlcklvbmljb24iLCJidXR0b25Db2xvciIsImNsb3NlQnV0dG9uIiwidGl0bGUiLCJEaWFsb2dUaXRsZUNvbXBvbmVudCIsImV2ZW50IiwiY2xvc2VEaWFsb2ciLCJoZWFkZXJCYWNrZ3JvdW5kIiwiZ2V0QmFja0J1dHRvbkljb24iLCJ0aXRsZUZvbnRDb2xvciIsInRpdGxlRm9udEZhbWlseSIsInRpdGxlRm9udFdlaWdodCIsIkFycmF5IiwiaXNBcnJheSIsImdldENsb3NlQnV0dG9uSWNvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50cyIsImdldFdpZHRoIiwiZ2V0SGVpZ2h0IiwibG9jYXRpb24iLCJjb250YWluZXJCYWNrZ3JvdW5kIiwiZ2V0SGVhZGVyIiwiYm9keUJhY2tncm91bmQiLCJtYXAiLCJpZCIsImdldFNlbGVjdEV2ZW50SGFuZGxlciIsImxpbmtDb2xvciIsIm5hbWUiLCJEaWFsb2dCb2R5Q29tcG9uZW50IiwibGVuZ3RoIiwiYm9keUZvbnRGYW1pbHkiLCJib2R5Rm9udENvbG9yIiwiZGF0ZXRpbWUiLCJ1cmwiLCJyZW5kZXJNdWx0aXBsZUV2ZW50cyIsInJlbmRlclNpbmdsZUV2ZW50IiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXlPZiIsInNoYXBlIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImxhdCIsIm51bWJlciIsImxvbiIsImZ1bmMiLCJvbmVPZlR5cGUiLCJub2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUNKO0FBQUEsTUFBR0MsS0FBSCxRQUFHQSxLQUFIO0FBQUEsU0FBZUEsS0FBZjtBQUFBLENBREksRUFFSDtBQUFBLE1BQUdDLE1BQUgsU0FBR0EsTUFBSDtBQUFBLFNBQWdCQSxNQUFoQjtBQUFBLENBRkcsRUFPQztBQUFBLE1BQUdDLFVBQUgsU0FBR0EsVUFBSDtBQUFBLFNBQW9CQSxVQUFwQjtBQUFBLENBUEQsRUFRa0I7QUFBQSxNQUFHQyxXQUFILFNBQUdBLFdBQUg7QUFBQSxTQUFxQkEsV0FBckI7QUFBQSxDQVJsQixDQUFmOztBQWNBLElBQU1DLGFBQWEsR0FBR04sNkJBQU9DLEdBQVYsb0JB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QW5DYyxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgRnJhZ21lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5pbXBvcnQgKiBhcyBJb25pY29ucyBmcm9tICdyZWFjdC1pY29ucy9pbydcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgd2lkdGg6ICR7KHsgd2lkdGggfSkgPT4gd2lkdGh9cHg7XG4gIGhlaWdodDogJHsoeyBoZWlnaHQgfSkgPT4gaGVpZ2h0fXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogNTAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICBiYWNrZ3JvdW5kOiAkeyh7IGJhY2tncm91bmQgfSkgPT4gYmFja2dyb3VuZH07XG4gIGJveC1zaGFkb3c6IDVweCA1cHggMTBweCAycHggJHsoeyBzaGFkb3dDb2xvciB9KSA9PiBzaGFkb3dDb2xvcn07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5gXG5cbmNvbnN0IFNjcm9sbFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGZsZXg6IDE7XG5gXG5cbmNvbnN0IEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQ6ICR7KHsgYmFja2dyb3VuZCB9KSA9PiBiYWNrZ3JvdW5kfTtcbiAgcGFkZGluZzogMTZweCA4cHg7XG5cbiAgPiBkaXYge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgfVxuYFxuXG5jb25zdCBUaXRsZSA9IHN0eWxlZC5oM2BcbiAgZm9udC1mYW1pbHk6ICR7KHsgZm9udEZhbWlseSB9KSA9PiBmb250RmFtaWx5fTtcbiAgY29sb3I6ICR7KHsgY29sb3IgfSkgPT4gY29sb3J9O1xuICBmb250LXdlaWdodDogJHsoeyBmb250V2VpZ2h0IH0pID0+IGZvbnRXZWlnaHR9O1xuICBmb250LXNpemU6IDEuMmVtO1xuICBtYXJnaW46IDA7XG4gIGZsZXg6IDU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbmBcblxuY29uc3QgQ2xvc2VCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICBjb2xvcjogJHsoeyBjb2xvciB9KSA9PiBjb2xvcn07XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbmBcblxuY29uc3QgQmFja0J1dHRvbiA9IHN0eWxlZC5idXR0b25gXG4gIG9wYWNpdHk6ICR7KHsgc2hvd0JhY2sgfSkgPT4gc2hvd0JhY2sgPyAxIDogMH07XG4gIGNvbG9yOiAkeyh7IGNvbG9yIH0pID0+IGNvbG9yfTtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuYFxuXG5jb25zdCBCb2R5ID0gc3R5bGVkLnVsYFxuICBmb250LWZhbWlseTogJHsoeyBmb250RmFtaWx5IH0pID0+IGZvbnRGYW1pbHl9O1xuICBjb2xvcjogJHsoeyBjb2xvciB9KSA9PiBjb2xvcn07XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMTZweDtcbiAgZm9udC1zaXplOiAxZW07XG5gXG5cbmNvbnN0IEZpZWxkID0gc3R5bGVkLmxpYFxuICBwYWRkaW5nOiA4cHggMDtcblxuICAmOmZpcnN0LW9mLXR5cGUge1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICB9XG5cbiAgJjpsYXN0LW9mLXR5cGUge1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICB9XG5gXG5cbmNvbnN0IExhYmVsID0gc3R5bGVkLmxhYmVsYFxuICBmb250LXdlaWdodDogNjAwO1xuYFxuXG5jb25zdCBWYWx1ZSA9IHN0eWxlZC5kaXZgXG5cbmBcblxuY29uc3QgRXZlbnRMaW5rID0gc3R5bGVkLmFgXG4gIGNvbG9yOiAkeyh7IGNvbG9yIH0pID0+IGNvbG9yfTtcbiAgZGlzcGxheTogYmxvY2s7XG5gXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpYWxvZyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZXZlbnRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGV0aW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBsYXQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGxvbjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgbG9jYXRpb246IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIHVybDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkXG4gICAgfSkpLFxuICAgIGNsb3NlRGlhbG9nOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgRGlhbG9nVGl0bGVDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIERpYWxvZ0JvZHlDb21wb25lbnQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIHRoZW1lOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgdGl0bGVGb250RmFtaWx5OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICB0aXRsZUZvbnRDb2xvcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgdGl0bGVGb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBoZWFkZXJCYWNrZ3JvdW5kOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBib2R5QmFja2dyb3VuZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgY29udGFpbmVyQmFja2dyb3VuZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgc2hhZG93Q29sb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgIGJ1dHRvbkNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBib2R5Rm9udEZhbWlseTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgYm9keUZvbnRDb2xvcjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbGlua0NvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBiYWNrQnV0dG9uOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm5vZGVcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBjbG9zZUJ1dHRvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5ub2RlXG4gICAgICBdKS5pc1JlcXVpcmVkXG4gICAgfSkuaXNSZXF1aXJlZFxuICB9XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHsgc2VsZWN0ZWRFdmVudDogLTEsIHNjcmVlbldpZHRoOiAwLCBzY3JlZW5IZWlnaHQ6IDAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKVxuICAgIHRoaXMub25SZXNpemUoKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLm9uUmVzaXplKVxuICB9XG5cbiAgb25SZXNpemUgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNjcmVlbldpZHRoOiB3aW5kb3cuc2NyZWVuLmF2YWlsV2lkdGgsIHNjcmVlbkhlaWdodDogd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCB9KVxuICB9XG5cbiAgZ29CYWNrID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWxlY3RlZEV2ZW50OiAtMSB9KVxuICB9XG5cbiAgc2VsZWN0RXZlbnQgPSAoaW5kZXgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRFdmVudDogaW5kZXggfSlcbiAgfVxuXG4gIGdldFdpZHRoICgpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAod2lkdGggPiBzY3JlZW5XaWR0aCB8fCBoZWlnaHQgPiBzY3JlZW5IZWlnaHQpIHJldHVybiBzY3JlZW5XaWR0aFxuICAgIHJldHVybiB3aWR0aFxuICB9XG5cbiAgZ2V0SGVpZ2h0ICgpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAod2lkdGggPiBzY3JlZW5XaWR0aCB8fCBoZWlnaHQgPiBzY3JlZW5IZWlnaHQpIHJldHVybiBzY3JlZW5IZWlnaHRcbiAgICByZXR1cm4gaGVpZ2h0XG4gIH1cblxuICByZW5kZXJJb25pY29uIChpY29uTmFtZSwgY29sb3IpIHtcbiAgICBjb25zdCBub3JtYWxpc2VkSWNvbk5hbWUgPSBgJHtpY29uTmFtZVswXS50b1VwcGVyQ2FzZSgpfSR7aWNvbk5hbWUuc3Vic3RyaW5nKDEpfWAucmVwbGFjZSgvLSguKS9nLCAobSkgPT4gbVsxXS50b1VwcGVyQ2FzZSgpKVxuICAgIGNvbnN0IGtleSA9IGBJbyR7bm9ybWFsaXNlZEljb25OYW1lfWBcbiAgICBjb25zdCBJY29uQ29tcG9uZW50ID0gSW9uaWNvbnNba2V5XVxuICAgIGlmICghSWNvbkNvbXBvbmVudCkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGljb24gJHtpY29uTmFtZX1gKVxuICAgIHJldHVybiA8SWNvbkNvbXBvbmVudCBjb2xvcj17Y29sb3J9IHNpemU9JzEuNWVtJyAvPlxuICB9XG5cbiAgZ2V0QmFja0J1dHRvbkljb24gKCkge1xuICAgIGNvbnN0IHsgdGhlbWUgfSA9IHRoaXMucHJvcHNcbiAgICBpZiAodHlwZW9mIHRoZW1lLmJhY2tCdXR0b24gPT09ICdzdHJpbmcnKSByZXR1cm4gdGhpcy5yZW5kZXJJb25pY29uKHRoZW1lLmJhY2tCdXR0b24sIHRoZW1lLmJ1dHRvbkNvbG9yKVxuICAgIHJldHVybiB0aGVtZS5iYWNrQnV0dG9uXG4gIH1cblxuICBnZXRDbG9zZUJ1dHRvbkljb24gKCkge1xuICAgIGNvbnN0IHsgdGhlbWUgfSA9IHRoaXMucHJvcHNcbiAgICBpZiAodHlwZW9mIHRoZW1lLmNsb3NlQnV0dG9uID09PSAnc3RyaW5nJykgcmV0dXJuIHRoaXMucmVuZGVySW9uaWNvbih0aGVtZS5jbG9zZUJ1dHRvbiwgdGhlbWUuYnV0dG9uQ29sb3IpXG4gICAgcmV0dXJuIHRoZW1lLmNsb3NlQnV0dG9uXG4gIH1cblxuICBnZXRIZWFkZXIgKHRpdGxlLCBzaG93QmFjaywgRGlhbG9nVGl0bGVDb21wb25lbnQsIGV2ZW50KSB7XG4gICAgY29uc3QgeyBjbG9zZURpYWxvZywgdGhlbWUgfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4gKFxuICAgICAgPEhlYWRlciBiYWNrZ3JvdW5kPXt0aGVtZS5oZWFkZXJCYWNrZ3JvdW5kfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2RpYWxvZy1oZWFkZXInPlxuICAgICAgICAgIDxCYWNrQnV0dG9uXG4gICAgICAgICAgICBzaG93QmFjaz17c2hvd0JhY2t9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93QmFjayAmJiB0aGlzLmdvQmFjaygpfVxuICAgICAgICAgICAgY29sb3I9e3RoZW1lLmJ1dHRvbkNvbG9yfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLmdldEJhY2tCdXR0b25JY29uKCl9XG4gICAgICAgICAgPC9CYWNrQnV0dG9uPlxuICAgICAgICAgIDxUaXRsZVxuICAgICAgICAgICAgY29sb3I9e3RoZW1lLnRpdGxlRm9udENvbG9yfVxuICAgICAgICAgICAgZm9udEZhbWlseT17dGhlbWUudGl0bGVGb250RmFtaWx5fVxuICAgICAgICAgICAgZm9udFdlaWdodD17dGhlbWUudGl0bGVGb250V2VpZ2h0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtEaWFsb2dUaXRsZUNvbXBvbmVudCAmJlxuICAgICAgICAgICAgICA8RGlhbG9nVGl0bGVDb21wb25lbnQgZXZlbnQ9e2V2ZW50fSBtdWx0aXBsZUV2ZW50cz17QXJyYXkuaXNBcnJheShldmVudCl9IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB7IURpYWxvZ1RpdGxlQ29tcG9uZW50ICYmIHRpdGxlfVxuICAgICAgICAgIDwvVGl0bGU+XG4gICAgICAgICAgPENsb3NlQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtjbG9zZURpYWxvZ31cbiAgICAgICAgICAgIGNvbG9yPXt0aGVtZS5idXR0b25Db2xvcn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRDbG9zZUJ1dHRvbkljb24oKX1cbiAgICAgICAgICA8L0Nsb3NlQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvSGVhZGVyPlxuICAgIClcbiAgfVxuXG4gIGdldFNlbGVjdEV2ZW50SGFuZGxlciAoaW5kZXgpIHtcbiAgICByZXR1cm4gKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgdGhpcy5zZWxlY3RFdmVudChpbmRleClcbiAgICB9XG4gIH1cblxuICByZW5kZXJNdWx0aXBsZUV2ZW50cyAoKSB7XG4gICAgY29uc3QgeyBldmVudHMsIHRoZW1lLCBEaWFsb2dUaXRsZUNvbXBvbmVudCB9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRXaWR0aCgpXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKVxuICAgIGNvbnN0IHRpdGxlID0gYEV2ZW50cyBuZWFyICR7ZXZlbnRzWzBdLmxvY2F0aW9ufWBcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9J2RpYWxvZycgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gYmFja2dyb3VuZD17dGhlbWUuY29udGFpbmVyQmFja2dyb3VuZH0gc2hhZG93Q29sb3I9e3RoZW1lLnNoYWRvd0NvbG9yfT5cbiAgICAgICAge3RoaXMuZ2V0SGVhZGVyKHRpdGxlLCBmYWxzZSwgRGlhbG9nVGl0bGVDb21wb25lbnQsIGV2ZW50cyl9XG4gICAgICAgIDxTY3JvbGxXcmFwcGVyPlxuICAgICAgICAgIDxCb2R5IGJhY2tncm91bmQ9e3RoZW1lLmJvZHlCYWNrZ3JvdW5kfT5cbiAgICAgICAgICAgIHtldmVudHMubWFwKChldmVudCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPEZpZWxkIGtleT17ZXZlbnQuaWR9PlxuICAgICAgICAgICAgICAgIDxFdmVudExpbmsgaHJlZj0nIycgb25DbGljaz17dGhpcy5nZXRTZWxlY3RFdmVudEhhbmRsZXIoaW5kZXgpfSBjb2xvcj17dGhlbWUubGlua0NvbG9yfT57ZXZlbnQubmFtZX08L0V2ZW50TGluaz5cbiAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvQm9keT5cbiAgICAgICAgPC9TY3JvbGxXcmFwcGVyPlxuICAgICAgPC9Db250YWluZXI+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyU2luZ2xlRXZlbnQgKGV2ZW50KSB7XG4gICAgY29uc3QgeyB0aGVtZSwgRGlhbG9nQm9keUNvbXBvbmVudCwgRGlhbG9nVGl0bGVDb21wb25lbnQgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKVxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KClcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9J2RpYWxvZycgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gYmFja2dyb3VuZD17dGhlbWUuY29udGFpbmVyQmFja2dyb3VuZH0gc2hhZG93Q29sb3I9e3RoZW1lLnNoYWRvd0NvbG9yfT5cbiAgICAgICAge3RoaXMuZ2V0SGVhZGVyKGV2ZW50Lm5hbWUsIHRoaXMucHJvcHMuZXZlbnRzLmxlbmd0aCA+IDEsIERpYWxvZ1RpdGxlQ29tcG9uZW50LCBldmVudCl9XG4gICAgICAgIDxTY3JvbGxXcmFwcGVyPlxuICAgICAgICAgIDxCb2R5IGNsYXNzTmFtZT0nZGlhbG9nLWJvZHknIGZvbnRGYW1pbHk9e3RoZW1lLmJvZHlGb250RmFtaWx5fSBjb2xvcj17dGhlbWUuYm9keUZvbnRDb2xvcn0gYmFja2dyb3VuZD17dGhlbWUuYm9keUJhY2tncm91bmR9PlxuICAgICAgICAgICAge0RpYWxvZ0JvZHlDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgPERpYWxvZ0JvZHlDb21wb25lbnQgZXZlbnQ9e2V2ZW50fSAvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeyFEaWFsb2dCb2R5Q29tcG9uZW50ICYmXG4gICAgICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgICAgICA8RmllbGQ+XG4gICAgICAgICAgICAgICAgICA8TGFiZWw+V2hlcmU/PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxWYWx1ZT57ZXZlbnQubG9jYXRpb259PC9WYWx1ZT5cbiAgICAgICAgICAgICAgICA8L0ZpZWxkPlxuICAgICAgICAgICAgICAgIDxGaWVsZD5cbiAgICAgICAgICAgICAgICAgIDxMYWJlbD5XaGVuPzwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8VmFsdWU+e2V2ZW50LmRhdGV0aW1lfTwvVmFsdWU+XG4gICAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgICA8RmllbGQ+XG4gICAgICAgICAgICAgICAgICA8TGFiZWw+RXZlbnQgVVJMOjwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICA8RXZlbnRMaW5rIGhyZWY9e2V2ZW50LnVybH0gdGFyZ2V0PSdfYmxhbmsnIGNvbG9yPXt0aGVtZS5saW5rQ29sb3J9PntldmVudC51cmx9PC9FdmVudExpbms+XG4gICAgICAgICAgICAgICAgPC9GaWVsZD5cbiAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICA8L0JvZHk+XG4gICAgICAgIDwvU2Nyb2xsV3JhcHBlcj5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgIClcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyBldmVudHMgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IHNlbGVjdGVkRXZlbnQgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAoZXZlbnRzLmxlbmd0aCA+IDEgJiYgc2VsZWN0ZWRFdmVudCA8IDApIHJldHVybiB0aGlzLnJlbmRlck11bHRpcGxlRXZlbnRzKClcbiAgICBjb25zdCBldmVudCA9IGV2ZW50cy5sZW5ndGggPiAxID8gZXZlbnRzW3NlbGVjdGVkRXZlbnRdIDogZXZlbnRzWzBdXG4gICAgcmV0dXJuIHRoaXMucmVuZGVyU2luZ2xlRXZlbnQoZXZlbnQpXG4gIH1cbn1cbiJdfQ==