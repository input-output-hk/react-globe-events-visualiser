"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var THREE = _interopRequireWildcard(require("three"));

var _droid_sans_regularTypeface = _interopRequireDefault(require("three/examples/fonts/droid/droid_sans_regular.typeface.json"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PULSE_SCALE = 0.15;
var PULSE_RIPPLE_SCALE = 6;
var PULSE_DURATION = 2600;
var PULSE_COUNT = 3;
var PULSE_INTERVAL = 400;
var PULSE_OPACITY = 1;
var HEIGHT_SCALE = 4;
var LOCAL_ROTATION_AXIS = new THREE.Vector3(1, 0, 0);
var LOCAL_ROTATION_ANGLE = Math.PI / 2;
var LAYER_HEIGHT = 0.02;
var CAMERA_ANIMATION_DURATION = 1000;

var GlobeMarker =
/*#__PURE__*/
function (_Component) {
  _inherits(GlobeMarker, _Component);

  function GlobeMarker() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GlobeMarker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GlobeMarker)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.clickComplete = function () {
      _this.resetMarkerColor();
    };

    _this.onClick = function () {
      _this.highlightMarker();

      _this.cameraDistance = _this.origin.distanceTo(_this.camera.position);
      _this.cameraEndPosition = _this.getPosition(_this.cameraDistance);
      _this.cameraMoveLine = new THREE.Line3(_this.camera.position.clone(), _this.cameraEndPosition.clone());
      _this.moveCamera = true;
      _this.cameraMoved = 0;
      _this.cameraVerticalRaycaster = new THREE.Raycaster();

      var distanceToEnd = _this.cameraMoveLine.distance();

      var animationTime = CAMERA_ANIMATION_DURATION;
      if (distanceToEnd < 10) animationTime /= 2;
      if (distanceToEnd < 1) animationTime = 0;

      _this.props.onClick(animationTime, _this.clickComplete);
    };

    return _this;
  }

  _createClass(GlobeMarker, [{
    key: "getPositionFromLatLon",
    value: function getPositionFromLatLon(lat, lon) {
      var radius = this.globe.getRadius();
      var phi = (90 - lat) * (Math.PI / 180);
      var theta = (lon + 180) * (Math.PI / 180);
      var x = radius * Math.sin(phi) * Math.cos(theta) * -1;
      var z = radius * Math.sin(phi) * Math.sin(theta);
      var y = radius * Math.cos(phi);
      var pos = this.origin.clone();
      pos.set(x, y, z);
      return pos;
    }
  }, {
    key: "getFinalPosition",
    value: function getFinalPosition() {
      var _this$props = this.props,
          lat = _this$props.lat,
          lon = _this$props.lon;
      var pos = this.getPositionFromLatLon(lat, lon);
      this.positionRaycaster.set(this.origin, pos.normalize());
      var finalPosition = this.origin.clone();
      this.positionRaycaster.ray.at(this.globe.getRadius() + this.props.radius * HEIGHT_SCALE / 2 + this.props.zIndex * LAYER_HEIGHT, finalPosition);
      return finalPosition;
    }
  }, {
    key: "getPulseRingGeometry",
    value: function getPulseRingGeometry(radius) {
      return new THREE.RingBufferGeometry(radius, radius + radius * PULSE_SCALE, 24, 1);
    }
  }, {
    key: "setupPulseRing",
    value: function setupPulseRing() {
      this.pulseRingGeometry = this.getPulseRingGeometry(this.props.radius);
      var pulseRingMaterial = new THREE.MeshBasicMaterial({
        color: this.markerColor,
        transparent: true
      });
      pulseRingMaterial.color.convertSRGBToLinear();
      pulseRingMaterial.opacity = PULSE_OPACITY;
      pulseRingMaterial.side = THREE.BackSide;
      this.pulseRing = new THREE.Mesh(this.pulseRingGeometry, pulseRingMaterial);
    }
  }, {
    key: "initialise",
    value: function initialise(_ref) {
      var _this2 = this;

      var sceneObjects = _ref.sceneObjects,
          camera = _ref.camera;
      this.camera = camera;
      this.pulse = false;
      this.pulseRings = [];
      this.globe = sceneObjects.filter(function (obj) {
        return obj.getId() === _this2.props.globe;
      }).shift();
      if (!this.globe) throw new Error("Globe ".concat(this.props.globe, " does not exist within the scene"));
      this.distance = this.globe.getRadius() + this.props.dropDistance + this.props.radius * HEIGHT_SCALE / 2;
      this.positionRaycaster = new THREE.Raycaster();
      this.origin = new THREE.Vector3();
      this.finalPosition = this.getFinalPosition();
      var pointGeometry = new THREE.ConeBufferGeometry(this.props.radius, this.props.radius * HEIGHT_SCALE, 16, 1);
      var material = new THREE.MeshBasicMaterial({
        color: this.markerColor
      });
      this.obj = new THREE.Mesh(pointGeometry, material);
      var position = this.getPosition(this.distance);
      this.obj.position.copy(position);
      this.obj.lookAt(this.origin);
      this.obj.rotateOnAxis(LOCAL_ROTATION_AXIS, LOCAL_ROTATION_ANGLE);
      this.setupPulseRing();
    }
  }, {
    key: "resetMarkerColor",
    value: function resetMarkerColor() {
      this.highlighted = false;
      this.obj.material.color = this.markerColor;
      this.pulseRing.material.color = this.markerColor;
      this.fontMesh && (this.fontMesh.material.color = this.fontColor);
    }
  }, {
    key: "highlightMarker",
    value: function highlightMarker() {
      this.highlighted = true;
      this.obj.material.color = this.markerHighlightColor;
      this.pulseRing.material.color = this.markerHighlightColor;
      this.fontMesh && (this.fontMesh.material.color = this.fontHighlightColor);
    }
  }, {
    key: "getCameraMoveDistance",
    value: function getCameraMoveDistance(dt) {
      dt /= CAMERA_ANIMATION_DURATION / 1000 / 2;
      if (dt < 1) return 1 / 2 * dt * dt;
      dt--;
      return -1 / 2 * (dt * (dt - 2) - 1);
    }
  }, {
    key: "animateCamera",
    value: function animateCamera(t) {
      if (!this.moveCameraTime) this.moveCameraTime = t;
      var dt = (t - this.moveCameraTime) / 1000;
      this.cameraMoved = this.getCameraMoveDistance(dt);
      var newPos = this.origin.clone();
      this.cameraMoveLine.at(this.cameraMoved, newPos);
      this.cameraVerticalRaycaster.set(this.origin, newPos.clone().normalize());
      var finalPos = this.origin.clone();
      this.cameraVerticalRaycaster.ray.at(this.cameraDistance, finalPos);
      this.camera.position.set(finalPos.x, finalPos.y, finalPos.z);
      this.cameraMoveDistance = this.camera.position.distanceTo(this.cameraEndPosition);

      if (dt >= CAMERA_ANIMATION_DURATION / 1000) {
        this.moveCamera = false;
        this.moveCameraTime = null;
      }
    }
  }, {
    key: "setupClickListener",
    value: function setupClickListener() {
      if (this.clickListenerSetup) return;
      if (!this.props.onClick) return;
      var size = this.props.radius * PULSE_RIPPLE_SCALE;
      var clickableGeometry = new THREE.BoxBufferGeometry(size, size, size);
      this.clickableMesh = new THREE.Mesh(clickableGeometry);
      this.clickableMesh.position.copy(this.obj.position);
      this.clickableMesh.lookAt(this.origin);
      this.clickableMesh.material.visible = false;
      this.obj.parent.add(this.clickableMesh);
      this.props.registerClickableObject(this.clickableMesh, this.onClick);
      this.clickListenerSetup = true;
    }
  }, {
    key: "setupText",
    value: function setupText() {
      var _this$props2 = this.props,
          locationName = _this$props2.locationName,
          eventCount = _this$props2.eventCount,
          lat = _this$props2.lat,
          lon = _this$props2.lon;
      var font = new THREE.Font(_droid_sans_regularTypeface["default"]);
      var fontGeometry = new THREE.TextBufferGeometry(eventCount > 1 ? "".concat(locationName, " (").concat(eventCount, ")") : locationName, {
        font: font,
        size: this.props.fontSize,
        height: 0.04
      });
      var center = this.origin.clone();
      var material = new THREE.MeshBasicMaterial({
        color: this.fontColor
      });
      this.fontMesh = new THREE.Mesh(fontGeometry, material);
      this.fontMesh.geometry.computeBoundingBox();
      this.fontMesh.geometry.boundingBox.getCenter(center);
      this.fontMesh.geometry.center();
      this.fontMesh.position.copy(center);
      this.obj.parent.add(this.fontMesh);
      var fontLat = lat + 1;
      if (lat > 60) fontLat = lat - 1;
      var position = this.getPositionFromLatLon(fontLat, lon);
      var raycaster = new THREE.Raycaster(this.origin.clone(), position.clone().normalize());
      var pos = this.origin.clone();
      raycaster.ray.at(this.globe.getRadius() + this.props.radius * HEIGHT_SCALE, pos);
      this.fontMesh.position.copy(pos);
      this.fontMesh.lookAt(this.origin);
      this.fontAdded = true;
      this.fontMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
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
    key: "getPosition",
    value: function getPosition(distance) {
      var pos = this.origin.clone();
      this.positionRaycaster.ray.at(distance, pos);
      return pos;
    }
  }, {
    key: "createPulseRing",
    value: function () {
      var _createPulseRing = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(delay) {
        var pulseRing;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!delay) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return new Promise(function (resolve) {
                  return setTimeout(function () {
                    return resolve();
                  }, delay);
                });

              case 3:
                if (this._isMounted) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                pulseRing = this.pulseRing.clone();
                this.obj.parent.add(pulseRing);
                pulseRing.position.copy(this.obj.position);
                pulseRing.lookAt(this.origin);
                pulseRing.parameters = {
                  startTime: null
                };
                this.pulseRings.push(pulseRing);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createPulseRing(_x) {
        return _createPulseRing.apply(this, arguments);
      }

      return createPulseRing;
    }()
  }, {
    key: "getNewPulseRadius",
    value: function getNewPulseRadius(dt, index) {
      var radius = this.props.radius;
      var duration = PULSE_DURATION / 1000;
      var ratio = -1 * ((dt = dt / duration - 1) * dt * dt * dt - 1);
      var maxRadius = radius * PULSE_RIPPLE_SCALE - index * (radius * PULSE_SCALE * 4);
      return (maxRadius - radius) * ratio + radius;
    }
  }, {
    key: "getNewPulseOpacity",
    value: function getNewPulseOpacity(dt) {
      var duration = PULSE_DURATION / 1000;
      var ratio = -1 * ((dt = dt / duration - 1) * dt * dt * dt - 1);
      if (ratio > 1) ratio = 1;
      return PULSE_OPACITY * (1 - ratio);
    }
  }, {
    key: "animatePulse",
    value: function animatePulse(t) {
      var _this3 = this;

      if (this.pulseRings.length < 1) return;
      this.pulseRings.forEach(function (pulseRing, index) {
        if (!pulseRing.parameters.startTime) pulseRing.parameters.startTime = t;
        var dt = t - pulseRing.parameters.startTime;

        var newRadius = _this3.getNewPulseRadius(dt / 1000, index);

        var newOpacity = _this3.getNewPulseOpacity(dt / 1000);

        var geometry = _this3.getPulseRingGeometry(newRadius);

        if (_this3.pulseRingGeometry !== pulseRing.geometry) pulseRing.geometry.dispose();
        pulseRing.geometry = geometry;
        pulseRing.material.opacity = newOpacity;

        if (dt >= PULSE_DURATION) {
          _this3.obj.parent.remove(pulseRing);

          _this3.pulseRings.splice(index, 1);
        }
      });
    }
  }, {
    key: "animateDrop",
    value: function animateDrop(t) {
      if (!this.dropStartTime) this.dropStartTime = t;
      this.distance -= 0.5 * 0.08 * Math.pow((t - this.dropStartTime) / 1000, 2);
      var newPosition = this.getPosition(this.distance);
      var tipPosition = this.getPosition(this.distance - (this.props.radius * HEIGHT_SCALE / 2 + this.props.zIndex * LAYER_HEIGHT));
      this.obj.position.copy(newPosition);

      if (this.globe.getObj().geometry.boundingSphere.containsPoint(tipPosition)) {
        this.distance = this.globe.getRadius();
        this.dropped = true;
        this.pulse = true;
        this.obj.position.copy(this.finalPosition);
        delete this.dropStartTime;
      }
    }
  }, {
    key: "animatePulseRings",
    value: function animatePulseRings(t) {
      if (this.pulseRings.length < 1 && this.pulse) {
        for (var i = 0; i < PULSE_COUNT; i++) {
          this.createPulseRing(i * PULSE_INTERVAL);
        }
      } else {
        this.animatePulse(t);
      }
    }
  }, {
    key: "animate",
    value: function animate(_ref2) {
      var t = _ref2.t;
      if (!this.fontAdded) this.setupText();
      if (!this.dropped) this.animateDrop(t);

      if (this.dropped) {
        this.setupClickListener();
        this.animatePulseRings(t);
      }

      if (this.moveCamera) this.animateCamera(t);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.markerColor = new THREE.Color(this.props.markerColor);
      this.markerHighlightColor = new THREE.Color(this.props.markerHighlightColor);
      this.fontColor = new THREE.Color(this.props.fontColor);
      this.fontHighlightColor = new THREE.Color(this.props.fontHighlightColor);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          markerColor = _this$props3.markerColor,
          markerHighlightColor = _this$props3.markerHighlightColor,
          fontColor = _this$props3.fontColor,
          fontHighlightColor = _this$props3.fontHighlightColor;

      if (prevProps.markerColor !== markerColor) {
        this.markerColor.set(markerColor);
        if (!this.highlighted) this.resetMarkerColor();
      }

      if (prevProps.markerHighlightColor !== markerHighlightColor) {
        this.markerHighlightColor.set(markerHighlightColor);
        if (this.highlighted) this.highlightMarker();
      }

      if (prevProps.fontColor !== fontColor) {
        this.fontColor.set(fontColor);
        if (!this.highlighted) this.resetMarkerColor();
      }

      if (prevProps.fontHighlightColor !== fontHighlightColor) {
        this.fontHighlightColor.set(fontHighlightColor);
        if (this.highlighted) this.highlightMarker();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this4 = this;

      this._isMounted = false;
      this.clickableMesh && this.clickableMesh.parent && this.clickableMesh.parent.remove(this.clickableMesh);
      this.fontMesh && this.fontMesh.parent && this.fontMesh.parent.remove(this.fontMesh);
      this.pulseRings.forEach(function (pulseRing) {
        _this4.obj.parent.remove(pulseRing);
      });
      this.obj && this.obj.parent && this.obj.parent.remove(this.obj);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return GlobeMarker;
}(_react.Component);

exports["default"] = GlobeMarker;
GlobeMarker.propTypes = {
  id: _propTypes["default"].string.isRequired,
  lat: _propTypes["default"].number.isRequired,
  lon: _propTypes["default"].number.isRequired,
  globe: _propTypes["default"].string.isRequired,
  radius: _propTypes["default"].number.isRequired,
  dropDistance: _propTypes["default"].number.isRequired,
  zIndex: _propTypes["default"].number.isRequired,
  onClick: _propTypes["default"].func,
  registerClickableObject: _propTypes["default"].func,
  locationName: _propTypes["default"].string.isRequired,
  eventCount: _propTypes["default"].number.isRequired,
  fontColor: _propTypes["default"].number,
  fontHighlightColor: _propTypes["default"].number,
  markerColor: _propTypes["default"].number,
  markerHighlightColor: _propTypes["default"].number,
  fontSize: _propTypes["default"].number
};
GlobeMarker.defaultProps = {
  fontColor: 0x000000,
  fontHighlightColor: 0x000000,
  markerColor: 0x000000,
  markerHighlightColor: 0x000000,
  fontSize: 0.3
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iZU1hcmtlci9pbmRleC5qcyJdLCJuYW1lcyI6WyJQVUxTRV9TQ0FMRSIsIlBVTFNFX1JJUFBMRV9TQ0FMRSIsIlBVTFNFX0RVUkFUSU9OIiwiUFVMU0VfQ09VTlQiLCJQVUxTRV9JTlRFUlZBTCIsIlBVTFNFX09QQUNJVFkiLCJIRUlHSFRfU0NBTEUiLCJMT0NBTF9ST1RBVElPTl9BWElTIiwiVEhSRUUiLCJWZWN0b3IzIiwiTE9DQUxfUk9UQVRJT05fQU5HTEUiLCJNYXRoIiwiUEkiLCJMQVlFUl9IRUlHSFQiLCJDQU1FUkFfQU5JTUFUSU9OX0RVUkFUSU9OIiwiR2xvYmVNYXJrZXIiLCJjbGlja0NvbXBsZXRlIiwicmVzZXRNYXJrZXJDb2xvciIsIm9uQ2xpY2siLCJoaWdobGlnaHRNYXJrZXIiLCJjYW1lcmFEaXN0YW5jZSIsIm9yaWdpbiIsImRpc3RhbmNlVG8iLCJjYW1lcmEiLCJwb3NpdGlvbiIsImNhbWVyYUVuZFBvc2l0aW9uIiwiZ2V0UG9zaXRpb24iLCJjYW1lcmFNb3ZlTGluZSIsIkxpbmUzIiwiY2xvbmUiLCJtb3ZlQ2FtZXJhIiwiY2FtZXJhTW92ZWQiLCJjYW1lcmFWZXJ0aWNhbFJheWNhc3RlciIsIlJheWNhc3RlciIsImRpc3RhbmNlVG9FbmQiLCJkaXN0YW5jZSIsImFuaW1hdGlvblRpbWUiLCJwcm9wcyIsImxhdCIsImxvbiIsInJhZGl1cyIsImdsb2JlIiwiZ2V0UmFkaXVzIiwicGhpIiwidGhldGEiLCJ4Iiwic2luIiwiY29zIiwieiIsInkiLCJwb3MiLCJzZXQiLCJnZXRQb3NpdGlvbkZyb21MYXRMb24iLCJwb3NpdGlvblJheWNhc3RlciIsIm5vcm1hbGl6ZSIsImZpbmFsUG9zaXRpb24iLCJyYXkiLCJhdCIsInpJbmRleCIsIlJpbmdCdWZmZXJHZW9tZXRyeSIsInB1bHNlUmluZ0dlb21ldHJ5IiwiZ2V0UHVsc2VSaW5nR2VvbWV0cnkiLCJwdWxzZVJpbmdNYXRlcmlhbCIsIk1lc2hCYXNpY01hdGVyaWFsIiwiY29sb3IiLCJtYXJrZXJDb2xvciIsInRyYW5zcGFyZW50IiwiY29udmVydFNSR0JUb0xpbmVhciIsIm9wYWNpdHkiLCJzaWRlIiwiQmFja1NpZGUiLCJwdWxzZVJpbmciLCJNZXNoIiwic2NlbmVPYmplY3RzIiwicHVsc2UiLCJwdWxzZVJpbmdzIiwiZmlsdGVyIiwib2JqIiwiZ2V0SWQiLCJzaGlmdCIsIkVycm9yIiwiZHJvcERpc3RhbmNlIiwiZ2V0RmluYWxQb3NpdGlvbiIsInBvaW50R2VvbWV0cnkiLCJDb25lQnVmZmVyR2VvbWV0cnkiLCJtYXRlcmlhbCIsImNvcHkiLCJsb29rQXQiLCJyb3RhdGVPbkF4aXMiLCJzZXR1cFB1bHNlUmluZyIsImhpZ2hsaWdodGVkIiwiZm9udE1lc2giLCJmb250Q29sb3IiLCJtYXJrZXJIaWdobGlnaHRDb2xvciIsImZvbnRIaWdobGlnaHRDb2xvciIsImR0IiwidCIsIm1vdmVDYW1lcmFUaW1lIiwiZ2V0Q2FtZXJhTW92ZURpc3RhbmNlIiwibmV3UG9zIiwiZmluYWxQb3MiLCJjYW1lcmFNb3ZlRGlzdGFuY2UiLCJjbGlja0xpc3RlbmVyU2V0dXAiLCJzaXplIiwiY2xpY2thYmxlR2VvbWV0cnkiLCJCb3hCdWZmZXJHZW9tZXRyeSIsImNsaWNrYWJsZU1lc2giLCJ2aXNpYmxlIiwicGFyZW50IiwiYWRkIiwicmVnaXN0ZXJDbGlja2FibGVPYmplY3QiLCJsb2NhdGlvbk5hbWUiLCJldmVudENvdW50IiwiZm9udCIsIkZvbnQiLCJkcm9pZFNhbnMiLCJmb250R2VvbWV0cnkiLCJUZXh0QnVmZmVyR2VvbWV0cnkiLCJmb250U2l6ZSIsImhlaWdodCIsImNlbnRlciIsImdlb21ldHJ5IiwiY29tcHV0ZUJvdW5kaW5nQm94IiwiYm91bmRpbmdCb3giLCJnZXRDZW50ZXIiLCJmb250TGF0IiwicmF5Y2FzdGVyIiwiZm9udEFkZGVkIiwiaWQiLCJkZWxheSIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIl9pc01vdW50ZWQiLCJwYXJhbWV0ZXJzIiwic3RhcnRUaW1lIiwicHVzaCIsImluZGV4IiwiZHVyYXRpb24iLCJyYXRpbyIsIm1heFJhZGl1cyIsImxlbmd0aCIsImZvckVhY2giLCJuZXdSYWRpdXMiLCJnZXROZXdQdWxzZVJhZGl1cyIsIm5ld09wYWNpdHkiLCJnZXROZXdQdWxzZU9wYWNpdHkiLCJkaXNwb3NlIiwicmVtb3ZlIiwic3BsaWNlIiwiZHJvcFN0YXJ0VGltZSIsInBvdyIsIm5ld1Bvc2l0aW9uIiwidGlwUG9zaXRpb24iLCJnZXRPYmoiLCJib3VuZGluZ1NwaGVyZSIsImNvbnRhaW5zUG9pbnQiLCJkcm9wcGVkIiwiaSIsImNyZWF0ZVB1bHNlUmluZyIsImFuaW1hdGVQdWxzZSIsInNldHVwVGV4dCIsImFuaW1hdGVEcm9wIiwic2V0dXBDbGlja0xpc3RlbmVyIiwiYW5pbWF0ZVB1bHNlUmluZ3MiLCJhbmltYXRlQ2FtZXJhIiwiQ29sb3IiLCJwcmV2UHJvcHMiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwibnVtYmVyIiwiZnVuYyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxHQUFHLElBQXBCO0FBQ0EsSUFBTUMsa0JBQWtCLEdBQUcsQ0FBM0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsSUFBdkI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsQ0FBcEI7QUFDQSxJQUFNQyxjQUFjLEdBQUcsR0FBdkI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsQ0FBdEI7QUFFQSxJQUFNQyxZQUFZLEdBQUcsQ0FBckI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxJQUFJQyxLQUFLLENBQUNDLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsQ0FBNUI7QUFDQSxJQUFNQyxvQkFBb0IsR0FBR0MsSUFBSSxDQUFDQyxFQUFMLEdBQVUs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MUosRUFBQUEsT0FBTyxFQUFFd0osc0JBQVVJLElBUkY7QUFTakJoRSxFQUFBQSx1QkFBdUIsRUFBRTRELHNCQUFVSSxJQVRsQjtBQVVqQi9ELEVBQUFBLFlBQVksRUFBRTJELHNCQUFVQyxNQUFWLENBQWlCQyxVQVZkO0FBV2pCNUQsRUFBQUEsVUFBVSxFQUFFMEQsc0JBQVVHLE1BQVYsQ0FBaUJELFVBWFo7QUFZakJoRixFQUFBQSxTQUFTLEVBQUU4RSxzQkFBVUcsTUFaSjtBQWFqQi9FLEVBQUFBLGtCQUFrQixFQUFFNEUsc0JBQVVHLE1BYmI7QUFjakI1RyxFQUFBQSxXQUFXLEVBQUV5RyxzQkFBVUcsTUFkTjtBQWVqQmhGLEVBQUFBLG9CQUFvQixFQUFFNkUsc0JBQVVHLE1BZmY7QUFnQmpCdkQsRUFBQUEsUUFBUSxFQUFFb0Qsc0JBQVVHO0FBaEJILEM7QUFEQTlKLFcsQ0FvQlpnSyxZLEdBQWU7QUFDcEJuRixFQUFBQSxTQUFTLEVBQUUsUUFEUztBQUVwQkUsRUFBQUEsa0JBQWtCLEVBQUUsUUFGQTtBQUdwQjdCLEVBQUFBLFdBQVcsRUFBRSxRQUhPO0FBSXBCNEIsRUFBQUEsb0JBQW9CLEVBQUUsUUFKRjtBQUtwQnlCLEVBQUFBLFFBQVEsRUFBRTtBQUxVLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IGRyb2lkU2FucyBmcm9tICd0aHJlZS9leGFtcGxlcy9mb250cy9kcm9pZC9kcm9pZF9zYW5zX3JlZ3VsYXIudHlwZWZhY2UuanNvbidcblxuY29uc3QgUFVMU0VfU0NBTEUgPSAwLjE1XG5jb25zdCBQVUxTRV9SSVBQTEVfU0NBTEUgPSA2XG5jb25zdCBQVUxTRV9EVVJBVElPTiA9IDI2MDBcbmNvbnN0IFBVTFNFX0NPVU5UID0gM1xuY29uc3QgUFVMU0VfSU5URVJWQUwgPSA0MDBcbmNvbnN0IFBVTFNFX09QQUNJVFkgPSAxXG5cbmNvbnN0IEhFSUdIVF9TQ0FMRSA9IDRcbmNvbnN0IExPQ0FMX1JPVEFUSU9OX0FYSVMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAwLCAwKVxuY29uc3QgTE9DQUxfUk9UQVRJT05fQU5HTEUgPSBNYXRoLlBJIC8gMlxuXG5jb25zdCBMQVlFUl9IRUlHSFQgPSAwLjAyXG5cbmNvbnN0IENBTUVSQV9BTklNQVRJT05fRFVSQVRJT04gPSAxMDAwXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsb2JlTWFya2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGxhdDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxvbjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGdsb2JlOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgcmFkaXVzOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZHJvcERpc3RhbmNlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgekluZGV4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG4gICAgcmVnaXN0ZXJDbGlja2FibGVPYmplY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGxvY2F0aW9uTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGV2ZW50Q291bnQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBmb250Q29sb3I6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZm9udEhpZ2hsaWdodENvbG9yOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1hcmtlckNvbG9yOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIG1hcmtlckhpZ2hsaWdodENvbG9yOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMubnVtYmVyXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGZvbnRDb2xvcjogMHgwMDAwMDAsXG4gICAgZm9udEhpZ2hsaWdodENvbG9yOiAweDAwMDAwMCxcbiAgICBtYXJrZXJDb2xvcjogMHgwMDAwMDAsXG4gICAgbWFya2VySGlnaGxpZ2h0Q29sb3I6IDB4MDAwMDAwLFxuICAgIGZvbnRTaXplOiAwLjNcbiAgfVxuXG4gIGdldFBvc2l0aW9uRnJvbUxhdExvbiAobGF0LCBsb24pIHtcbiAgICBjb25zdCByYWRpdXMgPSB0aGlzLmdsb2JlLmdldFJhZGl1cygpXG4gICAgY29uc3QgcGhpID0gKDkwIC0gbGF0KSAqIChNYXRoLlBJIC8gMTgwKVxuICAgIGNvbnN0IHRoZXRhID0gKGxvbiArIDE4MCkgKiAoTWF0aC5QSSAvIDE4MClcbiAgICBjb25zdCB4ID0gcmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguY29zKHRoZXRhKSAqIC0xXG4gICAgY29uc3QgeiA9IHJhZGl1cyAqIE1hdGguc2luKHBoaSkgKiBNYXRoLnNpbih0aGV0YSlcbiAgICBjb25zdCB5ID0gcmFkaXVzICogTWF0aC5jb3MocGhpKVxuXG4gICAgY29uc3QgcG9zID0gdGhpcy5vcmlnaW4uY2xvbmUoKVxuICAgIHBvcy5zZXQoeCwgeSwgeilcbiAgICByZXR1cm4gcG9zXG4gIH1cblxuICBnZXRGaW5hbFBvc2l0aW9uICgpIHtcbiAgICBjb25zdCB7IGxhdCwgbG9uIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3NpdGlvbkZyb21MYXRMb24obGF0LCBsb24pXG5cbiAgICB0aGlzLnBvc2l0aW9uUmF5Y2FzdGVyLnNldCh0aGlzLm9yaWdpbiwgcG9zLm5vcm1hbGl6ZSgpKVxuICAgIGxldCBmaW5hbFBvc2l0aW9uID0gdGhpcy5vcmlnaW4uY2xvbmUoKVxuICAgIHRoaXMucG9zaXRpb25SYXljYXN0ZXIucmF5LmF0KHRoaXMuZ2xvYmUuZ2V0UmFkaXVzKCkgKyB0aGlzLnByb3BzLnJhZGl1cyAqIEhFSUdIVF9TQ0FMRSAvIDIgKyAodGhpcy5wcm9wcy56SW5kZXggKiBMQVlFUl9IRUlHSFQpLCBmaW5hbFBvc2l0aW9uKVxuICAgIHJldHVybiBmaW5hbFBvc2l0aW9uXG4gIH1cblxuICBnZXRQdWxzZVJpbmdHZW9tZXRyeSAocmFkaXVzKSB7XG4gICAgcmV0dXJuIG5ldyBUSFJFRS5SaW5nQnVmZmVyR2VvbWV0cnkocmFkaXVzLCByYWRpdXMgKyAocmFkaXVzICogUFVMU0VfU0NBTEUpLCAyNCwgMSlcbiAgfVxuXG4gIHNldHVwUHVsc2VSaW5nICgpIHtcbiAgICB0aGlzLnB1bHNlUmluZ0dlb21ldHJ5ID0gdGhpcy5nZXRQdWxzZVJpbmdHZW9tZXRyeSh0aGlzLnByb3BzLnJhZGl1cylcbiAgICBjb25zdCBwdWxzZVJpbmdNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiB0aGlzLm1hcmtlckNvbG9yLCB0cmFuc3BhcmVudDogdHJ1ZSB9KVxuICAgIHB1bHNlUmluZ01hdGVyaWFsLmNvbG9yLmNvbnZlcnRTUkdCVG9MaW5lYXIoKVxuICAgIHB1bHNlUmluZ01hdGVyaWFsLm9wYWNpdHkgPSBQVUxTRV9PUEFDSVRZXG4gICAgcHVsc2VSaW5nTWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkJhY2tTaWRlXG4gICAgdGhpcy5wdWxzZVJpbmcgPSBuZXcgVEhSRUUuTWVzaCh0aGlzLnB1bHNlUmluZ0dlb21ldHJ5LCBwdWxzZVJpbmdNYXRlcmlhbClcbiAgfVxuXG4gIGluaXRpYWxpc2UgKHsgc2NlbmVPYmplY3RzLCBjYW1lcmEgfSkge1xuICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhXG4gICAgdGhpcy5wdWxzZSA9IGZhbHNlXG4gICAgdGhpcy5wdWxzZVJpbmdzID0gW11cbiAgICB0aGlzLmdsb2JlID0gc2NlbmVPYmplY3RzLmZpbHRlcihvYmogPT4gb2JqLmdldElkKCkgPT09IHRoaXMucHJvcHMuZ2xvYmUpLnNoaWZ0KClcbiAgICBpZiAoIXRoaXMuZ2xvYmUpIHRocm93IG5ldyBFcnJvcihgR2xvYmUgJHt0aGlzLnByb3BzLmdsb2JlfSBkb2VzIG5vdCBleGlzdCB3aXRoaW4gdGhlIHNjZW5lYClcblxuICAgIHRoaXMuZGlzdGFuY2UgPSB0aGlzLmdsb2JlLmdldFJhZGl1cygpICsgdGhpcy5wcm9wcy5kcm9wRGlzdGFuY2UgKyAodGhpcy5wcm9wcy5yYWRpdXMgKiBIRUlHSFRfU0NBTEUgLyAyKVxuICAgIHRoaXMucG9zaXRpb25SYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICB0aGlzLm9yaWdpbiA9IG5ldyBUSFJFRS5WZWN0b3IzKClcbiAgICB0aGlzLmZpbmFsUG9zaXRpb24gPSB0aGlzLmdldEZpbmFsUG9zaXRpb24oKVxuICAgIGNvbnN0IHBvaW50R2VvbWV0cnkgPSBuZXcgVEhSRUUuQ29uZUJ1ZmZlckdlb21ldHJ5KHRoaXMucHJvcHMucmFkaXVzLCB0aGlzLnByb3BzLnJhZGl1cyAqIEhFSUdIVF9TQ0FMRSwgMTYsIDEpXG4gICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogdGhpcy5tYXJrZXJDb2xvciB9KVxuICAgIHRoaXMub2JqID0gbmV3IFRIUkVFLk1lc2gocG9pbnRHZW9tZXRyeSwgbWF0ZXJpYWwpXG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy5kaXN0YW5jZSlcbiAgICB0aGlzLm9iai5wb3NpdGlvbi5jb3B5KHBvc2l0aW9uKVxuICAgIHRoaXMub2JqLmxvb2tBdCh0aGlzLm9yaWdpbilcbiAgICB0aGlzLm9iai5yb3RhdGVPbkF4aXMoTE9DQUxfUk9UQVRJT05fQVhJUywgTE9DQUxfUk9UQVRJT05fQU5HTEUpXG5cbiAgICB0aGlzLnNldHVwUHVsc2VSaW5nKClcbiAgfVxuXG4gIGNsaWNrQ29tcGxldGUgPSAoKSA9PiB7XG4gICAgdGhpcy5yZXNldE1hcmtlckNvbG9yKClcbiAgfVxuXG4gIHJlc2V0TWFya2VyQ29sb3IgKCkge1xuICAgIHRoaXMuaGlnaGxpZ2h0ZWQgPSBmYWxzZVxuICAgIHRoaXMub2JqLm1hdGVyaWFsLmNvbG9yID0gdGhpcy5tYXJrZXJDb2xvclxuICAgIHRoaXMucHVsc2VSaW5nLm1hdGVyaWFsLmNvbG9yID0gdGhpcy5tYXJrZXJDb2xvclxuICAgIHRoaXMuZm9udE1lc2ggJiYgKHRoaXMuZm9udE1lc2gubWF0ZXJpYWwuY29sb3IgPSB0aGlzLmZvbnRDb2xvcilcbiAgfVxuXG4gIGhpZ2hsaWdodE1hcmtlciAoKSB7XG4gICAgdGhpcy5oaWdobGlnaHRlZCA9IHRydWVcbiAgICB0aGlzLm9iai5tYXRlcmlhbC5jb2xvciA9IHRoaXMubWFya2VySGlnaGxpZ2h0Q29sb3JcbiAgICB0aGlzLnB1bHNlUmluZy5tYXRlcmlhbC5jb2xvciA9IHRoaXMubWFya2VySGlnaGxpZ2h0Q29sb3JcbiAgICB0aGlzLmZvbnRNZXNoICYmICh0aGlzLmZvbnRNZXNoLm1hdGVyaWFsLmNvbG9yID0gdGhpcy5mb250SGlnaGxpZ2h0Q29sb3IpXG4gIH1cblxuICBvbkNsaWNrID0gKCkgPT4ge1xuICAgIHRoaXMuaGlnaGxpZ2h0TWFya2VyKClcbiAgICB0aGlzLmNhbWVyYURpc3RhbmNlID0gdGhpcy5vcmlnaW4uZGlzdGFuY2VUbyh0aGlzLmNhbWVyYS5wb3NpdGlvbilcbiAgICB0aGlzLmNhbWVyYUVuZFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLmNhbWVyYURpc3RhbmNlKVxuICAgIHRoaXMuY2FtZXJhTW92ZUxpbmUgPSBuZXcgVEhSRUUuTGluZTModGhpcy5jYW1lcmEucG9zaXRpb24uY2xvbmUoKSwgdGhpcy5jYW1lcmFFbmRQb3NpdGlvbi5jbG9uZSgpKVxuICAgIHRoaXMubW92ZUNhbWVyYSA9IHRydWVcbiAgICB0aGlzLmNhbWVyYU1vdmVkID0gMFxuICAgIHRoaXMuY2FtZXJhVmVydGljYWxSYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICBjb25zdCBkaXN0YW5jZVRvRW5kID0gdGhpcy5jYW1lcmFNb3ZlTGluZS5kaXN0YW5jZSgpXG4gICAgbGV0IGFuaW1hdGlvblRpbWUgPSBDQU1FUkFfQU5JTUFUSU9OX0RVUkFUSU9OXG4gICAgaWYgKGRpc3RhbmNlVG9FbmQgPCAxMCkgYW5pbWF0aW9uVGltZSAvPSAyXG4gICAgaWYgKGRpc3RhbmNlVG9FbmQgPCAxKSBhbmltYXRpb25UaW1lID0gMFxuICAgIHRoaXMucHJvcHMub25DbGljayhhbmltYXRpb25UaW1lLCB0aGlzLmNsaWNrQ29tcGxldGUpXG4gIH1cblxuICBnZXRDYW1lcmFNb3ZlRGlzdGFuY2UgKGR0KSB7XG4gICAgZHQgLz0gKENBTUVSQV9BTklNQVRJT05fRFVSQVRJT04gLyAxMDAwKSAvIDJcbiAgICBpZiAoZHQgPCAxKSByZXR1cm4gMSAvIDIgKiBkdCAqIGR0XG4gICAgZHQtLVxuICAgIHJldHVybiAtMSAvIDIgKiAoZHQgKiAoZHQgLSAyKSAtIDEpXG4gIH1cblxuICBhbmltYXRlQ2FtZXJhICh0KSB7XG4gICAgaWYgKCF0aGlzLm1vdmVDYW1lcmFUaW1lKSB0aGlzLm1vdmVDYW1lcmFUaW1lID0gdFxuXG4gICAgY29uc3QgZHQgPSAodCAtIHRoaXMubW92ZUNhbWVyYVRpbWUpIC8gMTAwMFxuICAgIHRoaXMuY2FtZXJhTW92ZWQgPSB0aGlzLmdldENhbWVyYU1vdmVEaXN0YW5jZShkdClcbiAgICBsZXQgbmV3UG9zID0gdGhpcy5vcmlnaW4uY2xvbmUoKVxuICAgIHRoaXMuY2FtZXJhTW92ZUxpbmUuYXQodGhpcy5jYW1lcmFNb3ZlZCwgbmV3UG9zKVxuICAgIHRoaXMuY2FtZXJhVmVydGljYWxSYXljYXN0ZXIuc2V0KHRoaXMub3JpZ2luLCBuZXdQb3MuY2xvbmUoKS5ub3JtYWxpemUoKSlcbiAgICBsZXQgZmluYWxQb3MgPSB0aGlzLm9yaWdpbi5jbG9uZSgpXG4gICAgdGhpcy5jYW1lcmFWZXJ0aWNhbFJheWNhc3Rlci5yYXkuYXQodGhpcy5jYW1lcmFEaXN0YW5jZSwgZmluYWxQb3MpXG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0KGZpbmFsUG9zLngsIGZpbmFsUG9zLnksIGZpbmFsUG9zLnopXG4gICAgdGhpcy5jYW1lcmFNb3ZlRGlzdGFuY2UgPSB0aGlzLmNhbWVyYS5wb3NpdGlvbi5kaXN0YW5jZVRvKHRoaXMuY2FtZXJhRW5kUG9zaXRpb24pXG4gICAgaWYgKGR0ID49IENBTUVSQV9BTklNQVRJT05fRFVSQVRJT04gLyAxMDAwKSB7XG4gICAgICB0aGlzLm1vdmVDYW1lcmEgPSBmYWxzZVxuICAgICAgdGhpcy5tb3ZlQ2FtZXJhVGltZSA9IG51bGxcbiAgICB9XG4gIH1cblxuICBzZXR1cENsaWNrTGlzdGVuZXIgKCkge1xuICAgIGlmICh0aGlzLmNsaWNrTGlzdGVuZXJTZXR1cCkgcmV0dXJuXG4gICAgaWYgKCF0aGlzLnByb3BzLm9uQ2xpY2spIHJldHVyblxuICAgIGNvbnN0IHNpemUgPSB0aGlzLnByb3BzLnJhZGl1cyAqIFBVTFNFX1JJUFBMRV9TQ0FMRVxuICAgIGNvbnN0IGNsaWNrYWJsZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEJ1ZmZlckdlb21ldHJ5KHNpemUsIHNpemUsIHNpemUpXG4gICAgdGhpcy5jbGlja2FibGVNZXNoID0gbmV3IFRIUkVFLk1lc2goY2xpY2thYmxlR2VvbWV0cnkpXG4gICAgdGhpcy5jbGlja2FibGVNZXNoLnBvc2l0aW9uLmNvcHkodGhpcy5vYmoucG9zaXRpb24pXG4gICAgdGhpcy5jbGlja2FibGVNZXNoLmxvb2tBdCh0aGlzLm9yaWdpbilcbiAgICB0aGlzLmNsaWNrYWJsZU1lc2gubWF0ZXJpYWwudmlzaWJsZSA9IGZhbHNlXG4gICAgdGhpcy5vYmoucGFyZW50LmFkZCh0aGlzLmNsaWNrYWJsZU1lc2gpXG4gICAgdGhpcy5wcm9wcy5yZWdpc3RlckNsaWNrYWJsZU9iamVjdCh0aGlzLmNsaWNrYWJsZU1lc2gsIHRoaXMub25DbGljaylcbiAgICB0aGlzLmNsaWNrTGlzdGVuZXJTZXR1cCA9IHRydWVcbiAgfVxuXG4gIHNldHVwVGV4dCAoKSB7XG4gICAgY29uc3QgeyBsb2NhdGlvbk5hbWUsIGV2ZW50Q291bnQsIGxhdCwgbG9uIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgZm9udCA9IG5ldyBUSFJFRS5Gb250KGRyb2lkU2FucylcbiAgICBjb25zdCBmb250R2VvbWV0cnkgPSBuZXcgVEhSRUUuVGV4dEJ1ZmZlckdlb21ldHJ5KGV2ZW50Q291bnQgPiAxID8gYCR7bG9jYXRpb25OYW1lfSAoJHtldmVudENvdW50fSlgIDogbG9jYXRpb25OYW1lLCB7XG4gICAgICBmb250LFxuICAgICAgc2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSxcbiAgICAgIGhlaWdodDogMC4wNFxuICAgIH0pXG4gICAgY29uc3QgY2VudGVyID0gdGhpcy5vcmlnaW4uY2xvbmUoKVxuICAgIGNvbnN0IG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IHRoaXMuZm9udENvbG9yIH0pXG4gICAgdGhpcy5mb250TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGZvbnRHZW9tZXRyeSwgbWF0ZXJpYWwpXG4gICAgdGhpcy5mb250TWVzaC5nZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKVxuICAgIHRoaXMuZm9udE1lc2guZ2VvbWV0cnkuYm91bmRpbmdCb3guZ2V0Q2VudGVyKGNlbnRlcilcbiAgICB0aGlzLmZvbnRNZXNoLmdlb21ldHJ5LmNlbnRlcigpXG4gICAgdGhpcy5mb250TWVzaC5wb3NpdGlvbi5jb3B5KGNlbnRlcilcbiAgICB0aGlzLm9iai5wYXJlbnQuYWRkKHRoaXMuZm9udE1lc2gpXG4gICAgbGV0IGZvbnRMYXQgPSBsYXQgKyAxXG4gICAgaWYgKGxhdCA+IDYwKSBmb250TGF0ID0gbGF0IC0gMVxuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkZyb21MYXRMb24oZm9udExhdCwgbG9uKVxuICAgIGNvbnN0IHJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIodGhpcy5vcmlnaW4uY2xvbmUoKSwgcG9zaXRpb24uY2xvbmUoKS5ub3JtYWxpemUoKSlcbiAgICBsZXQgcG9zID0gdGhpcy5vcmlnaW4uY2xvbmUoKVxuICAgIHJheWNhc3Rlci5yYXkuYXQodGhpcy5nbG9iZS5nZXRSYWRpdXMoKSArICh0aGlzLnByb3BzLnJhZGl1cyAqIEhFSUdIVF9TQ0FMRSksIHBvcylcbiAgICB0aGlzLmZvbnRNZXNoLnBvc2l0aW9uLmNvcHkocG9zKVxuICAgIHRoaXMuZm9udE1lc2gubG9va0F0KHRoaXMub3JpZ2luKVxuICAgIHRoaXMuZm9udEFkZGVkID0gdHJ1ZVxuICAgIHRoaXMuZm9udE1lc2gucm90YXRlT25BeGlzKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLCBNYXRoLlBJKVxuICB9XG5cbiAgZ2V0T2JqICgpIHtcbiAgICByZXR1cm4gdGhpcy5vYmpcbiAgfVxuXG4gIGdldElkICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pZFxuICB9XG5cbiAgZ2V0UG9zaXRpb24gKGRpc3RhbmNlKSB7XG4gICAgbGV0IHBvcyA9IHRoaXMub3JpZ2luLmNsb25lKClcbiAgICB0aGlzLnBvc2l0aW9uUmF5Y2FzdGVyLnJheS5hdChkaXN0YW5jZSwgcG9zKVxuICAgIHJldHVybiBwb3NcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVB1bHNlUmluZyAoZGVsYXkpIHtcbiAgICBpZiAoZGVsYXkpIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgZGVsYXkpKVxuICAgIGlmICghdGhpcy5faXNNb3VudGVkKSByZXR1cm5cbiAgICBjb25zdCBwdWxzZVJpbmcgPSB0aGlzLnB1bHNlUmluZy5jbG9uZSgpXG4gICAgdGhpcy5vYmoucGFyZW50LmFkZChwdWxzZVJpbmcpXG4gICAgcHVsc2VSaW5nLnBvc2l0aW9uLmNvcHkodGhpcy5vYmoucG9zaXRpb24pXG4gICAgcHVsc2VSaW5nLmxvb2tBdCh0aGlzLm9yaWdpbilcbiAgICBwdWxzZVJpbmcucGFyYW1ldGVycyA9IHsgc3RhcnRUaW1lOiBudWxsIH1cbiAgICB0aGlzLnB1bHNlUmluZ3MucHVzaChwdWxzZVJpbmcpXG4gIH1cblxuICBnZXROZXdQdWxzZVJhZGl1cyAoZHQsIGluZGV4KSB7XG4gICAgY29uc3QgeyByYWRpdXMgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBkdXJhdGlvbiA9IFBVTFNFX0RVUkFUSU9OIC8gMTAwMFxuICAgIGxldCByYXRpbyA9IC0xICogKChkdCA9IGR0IC8gZHVyYXRpb24gLSAxKSAqIGR0ICogZHQgKiBkdCAtIDEpXG4gICAgY29uc3QgbWF4UmFkaXVzID0gKHJhZGl1cyAqIFBVTFNFX1JJUFBMRV9TQ0FMRSkgLSAoaW5kZXggKiAocmFkaXVzICogUFVMU0VfU0NBTEUgKiA0KSlcbiAgICByZXR1cm4gKChtYXhSYWRpdXMgLSByYWRpdXMpICogcmF0aW8pICsgcmFkaXVzXG4gIH1cblxuICBnZXROZXdQdWxzZU9wYWNpdHkgKGR0KSB7XG4gICAgY29uc3QgZHVyYXRpb24gPSBQVUxTRV9EVVJBVElPTiAvIDEwMDBcbiAgICBsZXQgcmF0aW8gPSAtMSAqICgoZHQgPSBkdCAvIGR1cmF0aW9uIC0gMSkgKiBkdCAqIGR0ICogZHQgLSAxKVxuICAgIGlmIChyYXRpbyA+IDEpIHJhdGlvID0gMVxuICAgIHJldHVybiBQVUxTRV9PUEFDSVRZICogKDEgLSByYXRpbylcbiAgfVxuXG4gIGFuaW1hdGVQdWxzZSAodCkge1xuICAgIGlmICh0aGlzLnB1bHNlUmluZ3MubGVuZ3RoIDwgMSkgcmV0dXJuXG4gICAgdGhpcy5wdWxzZVJpbmdzLmZvckVhY2goKHB1bHNlUmluZywgaW5kZXgpID0+IHtcbiAgICAgIGlmICghcHVsc2VSaW5nLnBhcmFtZXRlcnMuc3RhcnRUaW1lKSBwdWxzZVJpbmcucGFyYW1ldGVycy5zdGFydFRpbWUgPSB0XG4gICAgICBjb25zdCBkdCA9IHQgLSBwdWxzZVJpbmcucGFyYW1ldGVycy5zdGFydFRpbWVcbiAgICAgIGNvbnN0IG5ld1JhZGl1cyA9IHRoaXMuZ2V0TmV3UHVsc2VSYWRpdXMoZHQgLyAxMDAwLCBpbmRleClcbiAgICAgIGNvbnN0IG5ld09wYWNpdHkgPSB0aGlzLmdldE5ld1B1bHNlT3BhY2l0eShkdCAvIDEwMDApXG4gICAgICBjb25zdCBnZW9tZXRyeSA9IHRoaXMuZ2V0UHVsc2VSaW5nR2VvbWV0cnkobmV3UmFkaXVzKVxuICAgICAgaWYgKHRoaXMucHVsc2VSaW5nR2VvbWV0cnkgIT09IHB1bHNlUmluZy5nZW9tZXRyeSkgcHVsc2VSaW5nLmdlb21ldHJ5LmRpc3Bvc2UoKVxuICAgICAgcHVsc2VSaW5nLmdlb21ldHJ5ID0gZ2VvbWV0cnlcbiAgICAgIHB1bHNlUmluZy5tYXRlcmlhbC5vcGFjaXR5ID0gbmV3T3BhY2l0eVxuICAgICAgaWYgKGR0ID49IFBVTFNFX0RVUkFUSU9OKSB7XG4gICAgICAgIHRoaXMub2JqLnBhcmVudC5yZW1vdmUocHVsc2VSaW5nKVxuICAgICAgICB0aGlzLnB1bHNlUmluZ3Muc3BsaWNlKGluZGV4LCAxKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhbmltYXRlRHJvcCAodCkge1xuICAgIGlmICghdGhpcy5kcm9wU3RhcnRUaW1lKSB0aGlzLmRyb3BTdGFydFRpbWUgPSB0XG4gICAgdGhpcy5kaXN0YW5jZSAtPSAwLjUgKiAwLjA4ICogTWF0aC5wb3coKHQgLSB0aGlzLmRyb3BTdGFydFRpbWUpIC8gMTAwMCwgMilcbiAgICBjb25zdCBuZXdQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy5kaXN0YW5jZSlcbiAgICBjb25zdCB0aXBQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24odGhpcy5kaXN0YW5jZSAtICh0aGlzLnByb3BzLnJhZGl1cyAqIEhFSUdIVF9TQ0FMRSAvIDIgKyAodGhpcy5wcm9wcy56SW5kZXggKiBMQVlFUl9IRUlHSFQpKSlcbiAgICB0aGlzLm9iai5wb3NpdGlvbi5jb3B5KG5ld1Bvc2l0aW9uKVxuICAgIGlmICh0aGlzLmdsb2JlLmdldE9iaigpLmdlb21ldHJ5LmJvdW5kaW5nU3BoZXJlLmNvbnRhaW5zUG9pbnQodGlwUG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmRpc3RhbmNlID0gdGhpcy5nbG9iZS5nZXRSYWRpdXMoKVxuICAgICAgdGhpcy5kcm9wcGVkID0gdHJ1ZVxuICAgICAgdGhpcy5wdWxzZSA9IHRydWVcbiAgICAgIHRoaXMub2JqLnBvc2l0aW9uLmNvcHkodGhpcy5maW5hbFBvc2l0aW9uKVxuICAgICAgZGVsZXRlIHRoaXMuZHJvcFN0YXJ0VGltZVxuICAgIH1cbiAgfVxuXG4gIGFuaW1hdGVQdWxzZVJpbmdzICh0KSB7XG4gICAgaWYgKHRoaXMucHVsc2VSaW5ncy5sZW5ndGggPCAxICYmIHRoaXMucHVsc2UpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUFVMU0VfQ09VTlQ7IGkrKykge1xuICAgICAgICB0aGlzLmNyZWF0ZVB1bHNlUmluZyhpICogUFVMU0VfSU5URVJWQUwpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYW5pbWF0ZVB1bHNlKHQpXG4gICAgfVxuICB9XG5cbiAgYW5pbWF0ZSAoeyB0IH0pIHtcbiAgICBpZiAoIXRoaXMuZm9udEFkZGVkKSB0aGlzLnNldHVwVGV4dCgpXG4gICAgaWYgKCF0aGlzLmRyb3BwZWQpIHRoaXMuYW5pbWF0ZURyb3AodClcbiAgICBpZiAodGhpcy5kcm9wcGVkKSB7XG4gICAgICB0aGlzLnNldHVwQ2xpY2tMaXN0ZW5lcigpXG4gICAgICB0aGlzLmFuaW1hdGVQdWxzZVJpbmdzKHQpXG4gICAgfVxuICAgIGlmICh0aGlzLm1vdmVDYW1lcmEpIHRoaXMuYW5pbWF0ZUNhbWVyYSh0KVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMuX2lzTW91bnRlZCA9IHRydWVcbiAgICB0aGlzLm1hcmtlckNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKHRoaXMucHJvcHMubWFya2VyQ29sb3IpXG4gICAgdGhpcy5tYXJrZXJIaWdobGlnaHRDb2xvciA9IG5ldyBUSFJFRS5Db2xvcih0aGlzLnByb3BzLm1hcmtlckhpZ2hsaWdodENvbG9yKVxuICAgIHRoaXMuZm9udENvbG9yID0gbmV3IFRIUkVFLkNvbG9yKHRoaXMucHJvcHMuZm9udENvbG9yKVxuICAgIHRoaXMuZm9udEhpZ2hsaWdodENvbG9yID0gbmV3IFRIUkVFLkNvbG9yKHRoaXMucHJvcHMuZm9udEhpZ2hsaWdodENvbG9yKVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IG1hcmtlckNvbG9yLCBtYXJrZXJIaWdobGlnaHRDb2xvciwgZm9udENvbG9yLCBmb250SGlnaGxpZ2h0Q29sb3IgfSA9IHRoaXMucHJvcHNcbiAgICBpZiAocHJldlByb3BzLm1hcmtlckNvbG9yICE9PSBtYXJrZXJDb2xvcikge1xuICAgICAgdGhpcy5tYXJrZXJDb2xvci5zZXQobWFya2VyQ29sb3IpXG4gICAgICBpZiAoIXRoaXMuaGlnaGxpZ2h0ZWQpIHRoaXMucmVzZXRNYXJrZXJDb2xvcigpXG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMubWFya2VySGlnaGxpZ2h0Q29sb3IgIT09IG1hcmtlckhpZ2hsaWdodENvbG9yKSB7XG4gICAgICB0aGlzLm1hcmtlckhpZ2hsaWdodENvbG9yLnNldChtYXJrZXJIaWdobGlnaHRDb2xvcilcbiAgICAgIGlmICh0aGlzLmhpZ2hsaWdodGVkKSB0aGlzLmhpZ2hsaWdodE1hcmtlcigpXG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMuZm9udENvbG9yICE9PSBmb250Q29sb3IpIHtcbiAgICAgIHRoaXMuZm9udENvbG9yLnNldChmb250Q29sb3IpXG4gICAgICBpZiAoIXRoaXMuaGlnaGxpZ2h0ZWQpIHRoaXMucmVzZXRNYXJrZXJDb2xvcigpXG4gICAgfVxuICAgIGlmIChwcmV2UHJvcHMuZm9udEhpZ2hsaWdodENvbG9yICE9PSBmb250SGlnaGxpZ2h0Q29sb3IpIHtcbiAgICAgIHRoaXMuZm9udEhpZ2hsaWdodENvbG9yLnNldChmb250SGlnaGxpZ2h0Q29sb3IpXG4gICAgICBpZiAodGhpcy5oaWdobGlnaHRlZCkgdGhpcy5oaWdobGlnaHRNYXJrZXIoKVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLl9pc01vdW50ZWQgPSBmYWxzZVxuICAgIHRoaXMuY2xpY2thYmxlTWVzaCAmJiB0aGlzLmNsaWNrYWJsZU1lc2gucGFyZW50ICYmIHRoaXMuY2xpY2thYmxlTWVzaC5wYXJlbnQucmVtb3ZlKHRoaXMuY2xpY2thYmxlTWVzaClcbiAgICB0aGlzLmZvbnRNZXNoICYmIHRoaXMuZm9udE1lc2gucGFyZW50ICYmIHRoaXMuZm9udE1lc2gucGFyZW50LnJlbW92ZSh0aGlzLmZvbnRNZXNoKVxuICAgIHRoaXMucHVsc2VSaW5ncy5mb3JFYWNoKChwdWxzZVJpbmcpID0+IHtcbiAgICAgIHRoaXMub2JqLnBhcmVudC5yZW1vdmUocHVsc2VSaW5nKVxuICAgIH0pXG4gICAgdGhpcy5vYmogJiYgdGhpcy5vYmoucGFyZW50ICYmIHRoaXMub2JqLnBhcmVudC5yZW1vdmUodGhpcy5vYmopXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiJdfQ==