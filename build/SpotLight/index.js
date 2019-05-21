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

var AHEAD_ANGLE = Math.PI / 6;
var MAX_HEIGHT = 4;

var SpotLight =
/*#__PURE__*/
function (_Component) {
  _inherits(SpotLight, _Component);

  function SpotLight() {
    _classCallCheck(this, SpotLight);

    return _possibleConstructorReturn(this, _getPrototypeOf(SpotLight).apply(this, arguments));
  }

  _createClass(SpotLight, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this = this;

      var props = this.props;
      var diffs = [];
      Object.keys(props).forEach(function (key) {
        if (props[key] !== prevProps[key]) diffs.push(key);
      });
      diffs.forEach(function (key) {
        if (key === 'distance') return;
        _this.obj[key] = props[key];
      });
    }
  }, {
    key: "initialise",
    value: function initialise() {
      var _this$props = this.props,
          color = _this$props.color,
          intensity = _this$props.intensity,
          lightDistance = _this$props.lightDistance,
          angle = _this$props.angle,
          penumbra = _this$props.penumbra,
          decay = _this$props.decay,
          distance = _this$props.distance;
      this.obj = new THREE.SpotLight(color, intensity, lightDistance, angle, penumbra, decay);
      this.obj.position.x = 0;
      this.obj.position.y = 0;
      this.obj.position.z = distance;
      this.raycaster = new THREE.Raycaster();
      this.origin = new THREE.Vector3();
      this.yAxis = new THREE.Vector3(0, 1, 0);
    }
  }, {
    key: "animate",
    value: function animate(_ref) {
      var camera = _ref.camera;
      // Raycast to camera.x, 0, camera.z
      // ray.at distance
      // rotate 30 degrees
      var y = camera.position.y;
      if (y > MAX_HEIGHT) y = MAX_HEIGHT;
      if (y < -MAX_HEIGHT) y = -MAX_HEIGHT;
      this.raycaster.set(this.origin, new THREE.Vector3(camera.position.x, y, camera.position.z).normalize());
      var castPos = new THREE.Vector3();
      this.raycaster.ray.at(this.props.distance, castPos);
      this.obj.position.copy(castPos); // Move light rotation ahead of camera by 30 degress

      this.obj.position.sub(this.origin);
      this.obj.position.applyAxisAngle(this.yAxis, AHEAD_ANGLE);
      this.obj.position.add(this.origin);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.obj && this.obj.parent && this.obj.parent.remove(this.obj);
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

  return SpotLight;
}(_react.Component);

exports["default"] = SpotLight;
SpotLight.propTypes = {
  id: _propTypes["default"].string.isRequired,
  intensity: _propTypes["default"].number,
  lightDistance: _propTypes["default"].number,
  angle: _propTypes["default"].number,
  penumbra: _propTypes["default"].number,
  decay: _propTypes["default"].number,
  color: _propTypes["default"].number,
  distance: _propTypes["default"].number
};
SpotLight.defaultProps = {
  intensity: 1,
  lightDistance: 0,
  angle: Math.PI / 6,
  penumbra: 0,
  decay: 1,
  color: 0x404040,
  distance: 45
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TcG90TGlnaHQvaW5kZXguanMiXSwibmFtZXMiOlsiQUhFQURfQU5HTEUiLCJNYXRoIiwiUEkiLCJNQVhfSEVJR0hUIiwiU3BvdExpZ2h0IiwicHJldlByb3BzIiwicHJvcHMiLCJkaWZmcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwicHVzaCIsIm9iaiIsImNvbG9yIiwiaW50ZW5zaXR5IiwibGlnaHREaXN0YW5jZSIsImFuZ2xlIiwicGVudW1icmEiLCJkZWNheSIsImRpc3RhbmNlIiwiVEhSRUUiLCJwb3NpdGlvbiIsIngiLCJ5IiwieiIsInJheWNhc3RlciIsIlJheWNhc3RlciIsIm9yaWdpbiIsIlZlY3RvcjMiLCJ5QXhpcyIsImNhbWVyYSIsInNldCIsIm5vcm1hbGl6ZSIsImNhc3RQb3MiLCJyYXkiLCJhdCIsImNvcHkiLCJzdWIiLCJhcHBseUF4aXNBbmdsZSIsImFkZCIsInBhcmVudCIsInJlbW92ZSIsImlkIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm51bWJlciIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFXLEdBQUdDLElBQUksQ0FBQ0MsRUFBTCxHQUFVLENBQTlCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLENBQW5COztJQUVxQkMsUzs7Ozs7Ozs7Ozs7Ozt1Q0FzQkNDLFMsRUFBVztBQUFBOztBQUFBLFVBQ3JCQyxLQURxQixHQUNYLElBRFcsQ0FDckJBLEtBRHFCO0FBRTdCLFVBQU1DLEtBQUssR0FBRyxFQUFkO0FBQ0FDLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxLQUFaLEVBQW1CSSxPQUFuQixDQUEyQixVQUFBQyxHQUFHLEVBQUk7QUFDaEMsWUFBSUwsS0FBSyxDQUFDSyxHQUFELENBQUwsS0FBZU4sU0FBUyxD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LENBQVM0QixNQUFULENBQWdCQyxNQUFoQixDQUF1QixLQUFLN0IsR0FBNUIsQ0FBL0I7QUFDRDs7OzZCQUVTO0FBQ1IsYUFBTyxLQUFLQSxHQUFaO0FBQ0Q7Ozs0QkFFUTtBQUNQLGFBQU8sS0FBS1AsS0FBTCxDQUFXcUMsRUFBbEI7QUFDRDs7OzZCQUVTO0FBQ1IsYUFBTyxJQUFQO0FBQ0Q7Ozs7RUE5RW9DQyxnQjs7O0FBQWxCeEMsUyxDQUNaeUMsUyxHQUFZO0FBQ2pCRixFQUFBQSxFQUFFLEVBQUVHLHNCQUFVQyxNQUFWLENBQWlCQyxVQURKO0FBRWpCakMsRUFBQUEsU0FBUyxFQUFFK0Isc0JBQVVHLE1BRko7QUFHakJqQyxFQUFBQSxhQUFhLEVBQUU4QixzQkFBVUcsTUFIUjtBQUlqQmhDLEVBQUFBLEtBQUssRUFBRTZCLHNCQUFVRyxNQUpBO0FBS2pCL0IsRUFBQUEsUUFBUSxFQUFFNEIsc0JBQVVHLE1BTEg7QUFNakI5QixFQUFBQSxLQUFLLEVBQUUyQixzQkFBVUcsTUFOQTtBQU9qQm5DLEVBQUFBLEtBQUssRUFBRWdDLHNCQUFVRyxNQVBBO0FBUWpCN0IsRUFBQUEsUUFBUSxFQUFFMEIsc0JBQVVHO0FBUkgsQztBQURBN0MsUyxDQVlaOEMsWSxHQUFlO0FBQ3BCbkMsRUFBQUEsU0FBUyxFQUFFLENBRFM7QUFFcEJDLEVBQUFBLGFBQWEsRUFBRSxDQUZLO0FBR3BCQyxFQUFBQSxLQUFLLEVBQUVoQixJQUFJLENBQUNDLEVBQUwsR0FBVSxDQUhHO0FBSXBCZ0IsRUFBQUEsUUFBUSxFQUFFLENBSlU7QUFLcEJDLEVBQUFBLEtBQUssRUFBRSxDQUxhO0FBTXBCTCxFQUFBQSxLQUFLLEVBQUUsUUFOYTtBQU9wQk0sRUFBQUEsUUFBUSxFQUFFO0FBUFUsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnXG5cbmNvbnN0IEFIRUFEX0FOR0xFID0gTWF0aC5QSSAvIDZcbmNvbnN0IE1BWF9IRUlHSFQgPSA0XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwb3RMaWdodCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBpbnRlbnNpdHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbGlnaHREaXN0YW5jZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBhbmdsZTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBwZW51bWJyYTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBkZWNheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBjb2xvcjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBkaXN0YW5jZTogUHJvcFR5cGVzLm51bWJlclxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpbnRlbnNpdHk6IDEsXG4gICAgbGlnaHREaXN0YW5jZTogMCxcbiAgICBhbmdsZTogTWF0aC5QSSAvIDYsXG4gICAgcGVudW1icmE6IDAsXG4gICAgZGVjYXk6IDEsXG4gICAgY29sb3I6IDB4NDA0MDQwLFxuICAgIGRpc3RhbmNlOiA0NVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSB0aGlzXG4gICAgY29uc3QgZGlmZnMgPSBbXVxuICAgIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAocHJvcHNba2V5XSAhPT0gcHJldlByb3BzW2tleV0pIGRpZmZzLnB1c2goa2V5KVxuICAgIH0pXG5cbiAgICBkaWZmcy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSAnZGlzdGFuY2UnKSByZXR1cm5cbiAgICAgIHRoaXMub2JqW2tleV0gPSBwcm9wc1trZXldXG4gICAgfSlcbiAgfVxuXG4gIGluaXRpYWxpc2UgKCkge1xuICAgIGNvbnN0IHsgY29sb3IsIGludGVuc2l0eSwgbGlnaHREaXN0YW5jZSwgYW5nbGUsIHBlbnVtYnJhLCBkZWNheSwgZGlzdGFuY2UgfSA9IHRoaXMucHJvcHNcbiAgICB0aGlzLm9iaiA9IG5ldyBUSFJFRS5TcG90TGlnaHQoY29sb3IsIGludGVuc2l0eSwgbGlnaHREaXN0YW5jZSwgYW5nbGUsIHBlbnVtYnJhLCBkZWNheSlcbiAgICB0aGlzLm9iai5wb3NpdGlvbi54ID0gMFxuICAgIHRoaXMub2JqLnBvc2l0aW9uLnkgPSAwXG4gICAgdGhpcy5vYmoucG9zaXRpb24ueiA9IGRpc3RhbmNlXG4gICAgdGhpcy5yYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICB0aGlzLm9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKClcbiAgICB0aGlzLnlBeGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMClcbiAgfVxuXG4gIGFuaW1hdGUgKHsgY2FtZXJhIH0pIHtcbiAgICAvLyBSYXljYXN0IHRvIGNhbWVyYS54LCAwLCBjYW1lcmEuelxuICAgIC8vIHJheS5hdCBkaXN0YW5jZVxuICAgIC8vIHJvdGF0ZSAzMCBkZWdyZWVzXG4gICAgbGV0IHkgPSBjYW1lcmEucG9zaXRpb24ueVxuICAgIGlmICh5ID4gTUFYX0hFSUdIVCkgeSA9IE1BWF9IRUlHSFRcbiAgICBpZiAoeSA8IC1NQVhfSEVJR0hUKSB5ID0gLU1BWF9IRUlHSFRcbiAgICB0aGlzLnJheWNhc3Rlci5zZXQodGhpcy5vcmlnaW4sIG5ldyBUSFJFRS5WZWN0b3IzKGNhbWVyYS5wb3NpdGlvbi54LCB5LCBjYW1lcmEucG9zaXRpb24ueikubm9ybWFsaXplKCkpXG4gICAgbGV0IGNhc3RQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpXG4gICAgdGhpcy5yYXljYXN0ZXIucmF5LmF0KHRoaXMucHJvcHMuZGlzdGFuY2UsIGNhc3RQb3MpXG4gICAgdGhpcy5vYmoucG9zaXRpb24uY29weShjYXN0UG9zKVxuXG4gICAgLy8gTW92ZSBsaWdodCByb3RhdGlvbiBhaGVhZCBvZiBjYW1lcmEgYnkgMzAgZGVncmVzc1xuICAgIHRoaXMub2JqLnBvc2l0aW9uLnN1Yih0aGlzLm9yaWdpbilcbiAgICB0aGlzLm9iai5wb3NpdGlvbi5hcHBseUF4aXNBbmdsZSh0aGlzLnlBeGlzLCBBSEVBRF9BTkdMRSlcbiAgICB0aGlzLm9iai5wb3NpdGlvbi5hZGQodGhpcy5vcmlnaW4pXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgdGhpcy5vYmogJiYgdGhpcy5vYmoucGFyZW50ICYmIHRoaXMub2JqLnBhcmVudC5yZW1vdmUodGhpcy5vYmopXG4gIH1cblxuICBnZXRPYmogKCkge1xuICAgIHJldHVybiB0aGlzLm9ialxuICB9XG5cbiAgZ2V0SWQgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLmlkXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiJdfQ==