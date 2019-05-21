"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var THREE = _interopRequireWildcard(require("three"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AmbientLight =
/*#__PURE__*/
function (_Component) {
  _inherits(AmbientLight, _Component);

  function AmbientLight() {
    _classCallCheck(this, AmbientLight);

    return _possibleConstructorReturn(this, _getPrototypeOf(AmbientLight).apply(this, arguments));
  }

  _createClass(AmbientLight, [{
    key: "initialise",
    value: function initialise() {
      this.obj = new THREE.AmbientLight(this.props.color, this.props.intensity);
      this.obj.position.x = this.props.position.x;
      this.obj.position.y = this.props.position.y;
      this.obj.position.z = this.props.position.z;
    }
  }, {
    key: "getObj",
    value: function getObj() {
      return this.obj;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id;
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return AmbientLight;
}(_react.Component);

exports["default"] = AmbientLight;
AmbientLight.propTypes = {
  id: _propTypes["default"].string.isRequired,
  intensity: _propTypes["default"].number,
  color: _propTypes["default"].number,
  position: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired,
    z: _propTypes["default"].number.isRequired
  })
};
AmbientLight.defaultProps = {
  intensity: 1,
  color: 0x404040,
  position: {
    x: 0,
    y: 0,
    z: 0
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BbWJpZW50TGlnaHQvaW5kZXguanMiXSwibmFtZXMiOlsiQW1iaWVudExpZ2h0Iiwib2JqIiwiVEhSRUUiLCJwcm9wcyIsImNvbG9yIiwiaW50ZW5zaXR5IiwicG9zaXRpb24iLCJ4IiwieSIsInoiLCJpZCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJudW1iZXIiLCJzaGFwZSIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7aUNBa0JMO0FBQ1osV0FBS0MsR0FBTCxHQUFXLElBQUlDLEtBQUssQ0FBQ0YsWUFBVixDQUF1QixLQUFLRyxLQUFMLENBQVdDLEtBQWxDLEVBQXlDLEtBQUtELEtBQUwsQ0FBV0UsU0FBcEQsQ0FBWDtBQUNBLFdBQUtKLEdBQUwsQ0FBU0ssUUFBVCxDQUFrQkMsQ0FBbEIsR0FBc0IsS0FBS0osS0FBTCxDQUFXRyxRQUFYLENBQW9CQyxDQUExQztBQUNBLFdBQUtOLEdBQUwsQ0FBU0ssUUFBVCxDQUFrQkUsQ0FBbEIsR0FBc0IsS0FBS0wsS0FBTCxDQUFXRyxRQUFYLENBQW9CRSxDQUExQztBQUNBLFdBQUtQLEdBQUwsQ0FBU0ssUUFBVCxDQUFrQkcsQ0FBbEIsR0FBc0IsS0FBS04sS0FBTCxDQUFXRyxRQUFYLENBQW9CRyxDQUExQztBQUNEOzs7NkJBRVM7QUFDUixhQUFPLEtBQUtSLEdBQVo7QUFDRDs7OzRCQUVRO0FBQ1AsYUFBTyxLQUFLRSxLQUFMLENBQVdPLEVBQWxCO0FBQ0Q7Ozs2QkFFUztBQUNSLGFBQU8sSUFBUDtBQUNEOzs7O0VBbkN1Q0MsZ0I7OztBQUFyQlgsWSxDQUNaWSxTLEdBQVk7QUFDakJGLEVBQUFBLEVBQUUsRUFBRUcsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBREo7QUFFakJWLEVBQUFBLFNBQVMsRUFBRVEsc0JBQVVHLE1BRko7QUFHakJaLEVBQUFBLEtBQUssRUFBRVMsc0JBQVVHLE1BSEE7QUFJakJWLEVBQUFBLFFBQVEsRUFBRU8sc0JBQVVJLEtBQVYsQ0FBZ0I7QUFDeEJWLElBQUFBLENBQUMsRUFBRU0sc0JBQVVHLE1BQVYsQ0FBaUJELFVBREk7QUFFeEJQLElBQUFBLENBQUMsRUFBRUssc0JBQVVHLE1BQVYsQ0FBaUJELFVBRkk7QUFHeEJOLElBQUFBLENBQUMsRUFBRUksc0JBQVVHLE1BQVYsQ0FBaUJEO0FBSEksR0FBaEI7QUFKTyxDO0FBREFmLFksQ0FZWmtCLFksR0FBZTtBQUNwQmIsRUFBQUEsU0FBUyxFQUFFLENBRFM7QUFFcEJELEVBQUFBLEtBQUssRUFBRSxRQUZhO0FBR3BCRSxFQUFBQSxRQUFRLEVBQUU7QUFBRUMsSUFBQUEsQ0FBQyxFQUFFLENBQUw7QUFBUUMsSUFBQUEsQ0FBQyxFQUFFLENBQVg7QUFBY0MsSUFBQUEsQ0FBQyxFQUFFO0FBQWpCO0FBSFUsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFtYmllbnRMaWdodCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBpbnRlbnNpdHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgY29sb3I6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICB5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICB6OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgY29sb3I6IDB4NDA0MDQwLFxuICAgIHBvc2l0aW9uOiB7IHg6IDAsIHk6IDAsIHo6IDAgfVxuICB9XG5cbiAgaW5pdGlhbGlzZSAoKSB7XG4gICAgdGhpcy5vYmogPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KHRoaXMucHJvcHMuY29sb3IsIHRoaXMucHJvcHMuaW50ZW5zaXR5KVxuICAgIHRoaXMub2JqLnBvc2l0aW9uLnggPSB0aGlzLnByb3BzLnBvc2l0aW9uLnhcbiAgICB0aGlzLm9iai5wb3NpdGlvbi55ID0gdGhpcy5wcm9wcy5wb3NpdGlvbi55XG4gICAgdGhpcy5vYmoucG9zaXRpb24ueiA9IHRoaXMucHJvcHMucG9zaXRpb24uelxuICB9XG5cbiAgZ2V0T2JqICgpIHtcbiAgICByZXR1cm4gdGhpcy5vYmpcbiAgfVxuXG4gIGdldElkICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pZFxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iXX0=