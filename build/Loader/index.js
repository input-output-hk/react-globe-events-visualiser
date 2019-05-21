"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  @keyframes loading-ring {\n    0% {\n      transform: rotate(0deg);\n    }\n    100% {\n      transform: rotate(360deg);\n    }\n  }\n\n  display: inline-block;\n  width: 64px;\n  height: 64px;\n\n  &:after {\n    content: \" \";\n    display: block;\n    width: 46px;\n    height: 46px;\n    margin: 1px;\n    border-radius: 50%;\n    border: 5px solid ", ";\n    border-color: ", " transparent ", " transparent;\n    animation: loading-ring 1.2s linear infinite;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = _styledComponents["default"].div(_templateObject());

var LoadingRing = _styledComponents["default"].div(_templateObject2(), function (_ref) {
  var color = _ref.color;
  return color;
}, function (_ref2) {
  var color = _ref2.color;
  return color;
}, function (_ref3) {
  var color = _ref3.color;
  return color;
});

var Loader = function Loader(_ref4) {
  var color = _ref4.color,
      children = _ref4.children;
  return _react["default"].createElement(Container, null, children, !children && _react["default"].createElement(LoadingRing, {
    color: color
  }));
};

Loader.propTypes = {
  color: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node
};
var _default = Loader;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Mb2FkZXIvaW5kZXguanMiXSwibmFtZXMiOlsiQ29udGFpbmVyIiwic3R5bGVkIiwiZGl2IiwiTG9hZGluZ1JpbmciLCJjb2xvciIsIkxvYWRlciIsImNoaWxkcmVuIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUdDLDZCQUFPQyxHQUFWLG1CQUFmOztBQU9BLElBQU1DLFdBQVcsR0FBR0YsNkJBQU9DLEdBQVYscUJBcUJPO0FBQUEsTUFBR0UsS0FBSCxRQUFHQSxLQUFIO0FBQUEsU0FBZUEsS0FBZjtBQUFBLENBckJQLEVBc0JHO0FBQUEsTUFBR0EsS0FBSCxTQUFHQSxLQUFIO0FBQUEsU0FBZUEsS0FBZjtBQUFBLENBdEJILEVBc0J1QztBQUFBLE1BQUdBLEtBQUgsU0FBR0EsS0FBSDtBQUFBLFNBQWVBLEtBQWY7QUFBQSxDQXRCdkMsQ0FBakI7O0FBMkJBLElBQU1DLE1BQU0sR0FBRyxTQUFUQSxNQUFTO0FBQUEsTUFBR0QsS0FBSCxTQUFHQSxLQUFIO0FBQUEsTUFBVUUsUUFBVixTQUFVQSxRQUFWO0FBQUEsU0FDYixnQ0FBQyxTQUFELFFBQ0dBLFFBREgsRUFFRyxDQUFDQSxRQUFELElBQ0MsZ0NBQUMsV0FBRDtBQUFhLElBQUEsS0FBSyxFQUFFRjtBQUFwQixJQUhKLENBRGE7QUFBQSxDQUFmOztBQVNBQyxNQUFNLENBQUNFLFNBQVAsR0FBbUI7QUFDakJILEVBQUFBLEtBQUssRUFBRUksc0JBQVVDLE1BQVYsQ0FBaUJDLFVBRFA7QUFFakJKLEVBQUFBLFFBQVEsRUFBRUUsc0JBQVVHO0FBRkgsQ0FBbkI7ZUFLZU4sTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG5gXG5cbmNvbnN0IExvYWRpbmdSaW5nID0gc3R5bGVkLmRpdmBcbiAgQGtleWZyYW1lcyBsb2FkaW5nLXJpbmcge1xuICAgIDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgIH1cbiAgICAxMDAlIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA2NHB4O1xuXG4gICY6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiIFwiO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiA0NnB4O1xuICAgIGhlaWdodDogNDZweDtcbiAgICBtYXJnaW46IDFweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYm9yZGVyOiA1cHggc29saWQgJHsoeyBjb2xvciB9KSA9PiBjb2xvcn07XG4gICAgYm9yZGVyLWNvbG9yOiAkeyh7IGNvbG9yIH0pID0+IGNvbG9yfSB0cmFuc3BhcmVudCAkeyh7IGNvbG9yIH0pID0+IGNvbG9yfSB0cmFuc3BhcmVudDtcbiAgICBhbmltYXRpb246IGxvYWRpbmctcmluZyAxLjJzIGxpbmVhciBpbmZpbml0ZTtcbiAgfVxuYFxuXG5jb25zdCBMb2FkZXIgPSAoeyBjb2xvciwgY2hpbGRyZW4gfSkgPT4gKFxuICA8Q29udGFpbmVyPlxuICAgIHtjaGlsZHJlbn1cbiAgICB7IWNoaWxkcmVuICYmXG4gICAgICA8TG9hZGluZ1JpbmcgY29sb3I9e2NvbG9yfSAvPlxuICAgIH1cbiAgPC9Db250YWluZXI+XG4pXG5cbkxvYWRlci5wcm9wVHlwZXMgPSB7XG4gIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkZXJcbiJdfQ==