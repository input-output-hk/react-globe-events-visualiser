"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var THREE = _interopRequireWildcard(require("three"));

var _threeOrbitcontrols = _interopRequireDefault(require("three-orbitcontrols"));

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

var CLICK_THRESHOLD = 130;
var MIN_DISTANCE = 35;
var MAX_DISTANCE = 90;

var Scene =
/*#__PURE__*/
function (_Component) {
  _inherits(Scene, _Component);

  function Scene(props) {
    var _this;

    _classCallCheck(this, Scene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scene).call(this, props));

    _this.mouseClickListener = function (e) {
      if (!_this._isMounted) return;

      _this.clickListener({
        x: e.offsetX,
        y: e.offsetY,
        width: e.target.width,
        height: e.target.height
      });
    };

    _this.touchStartListener = function (e) {
      if (!_this._isMounted) return;
      _this.touchStartTime = Date.now();
    };

    _this.touchEndListener = function (e) {
      if (!_this.touchStartTime || !_this._isMounted) return;

      var dt = Date.now() - _this.touchStartTime;

      if (dt <= CLICK_THRESHOLD) {
        var touch = e.changedTouches.item(0);
        if (!touch) return;
        e.preventDefault();
        var boundingRect = e.target.getBoundingClientRect();

        _this.clickListener({
          x: touch.clientX - boundingRect.x,
          y: touch.clientY - boundingRect.y,
          width: e.target.width,
          height: e.target.height
        });
      }
    };

    _this.clickListener = function (_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height;
      if (!_this.props.controlsEnabled) return;
      var mouse = new THREE.Vector2(x, y);
      mouse.x = x / width * 2 - 1;
      mouse.y = -(y / height) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, _this.camera);
      var intersects = raycaster.intersectObjects(_this.scene.children, true); // Only interested in the closest object, we don't want to click through objects

      if (intersects.length > 0) {
        var handler = _this.getClickHandlerForObj(intersects[0].object);

        handler && handler();
      }
    };

    _this.animate = function () {
      var now = Date.now();

      _this.updateControlSpeeds();

      _this.controls.update();

      _this.frameId = window.requestAnimationFrame(_this.animate);

      _this.sceneRefs.forEach(function (ref) {
        return ref.animate && ref.animate({
          scene: _this.scene,
          sceneObjects: _this.sceneRefs,
          camera: _this.camera,
          t: now
        });
      });

      _this.renderer.render(_this.scene, _this.camera);
    };

    _this.addRef = function (ref) {
      if (!_this.initialised) return _this.refQueue.push(ref);
      if (!ref) return;
      if (_this.sceneRefs.filter(function (sceneRef) {
        return sceneRef === ref;
      }).length > 0) return;

      _this.sceneRefs.push(ref);

      ref.initialise && ref.initialise({
        sceneObjects: _this.sceneRefs,
        camera: _this.camera,
        renderer: _this.renderer
      });

      _this.scene.add(ref.getObj());
    };

    _this.removeRef = function (ref) {
      if (!_this.initialised) return;
      if (!ref) return;
      if (_this.sceneRefs.filter(function (sceneRef) {
        return sceneRef === ref;
      }).length > 0) return;
      _this.sceneRefs = _this.sceneRefs.filter(function (sceneRef) {
        return sceneRef !== ref;
      });
      ref.destroy && ref.destroy({
        sceneObjects: _this.sceneRefs,
        camera: _this.camera
      });

      _this.scene.remove(ref.getObj());
    };

    _this.registerClickableObject = function (obj, handler) {
      if (!_this.getClickHandlerForObj(obj)) {
        _this.clickableObjects.push({
          obj: obj,
          handler: handler
        });
      }
    };

    _this.unregisterClickableObject = function (obj, handler) {
      _this.clickableObjects = _this.clickableObjects.filter(function (c) {
        return !(c.obj === obj && c.handler === handler);
      });
    };

    _this.canvasRef = (0, _react.createRef)();
    _this.sceneRefs = [];
    _this.initialised = false;
    _this.refQueue = [];
    return _this;
  }

  _createClass(Scene, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      var canvasRef = this.canvasRef;
      var width = canvasRef.current.clientWidth;
      var height = canvasRef.current.clientHeight;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true
      });
      this.renderer.gammaFactor = 2.2;
      this.renderer.gammaOutPut = true;
      this.controls = new _threeOrbitcontrols["default"](this.camera, this.renderer.domElement);
      this.initialiseOrbits();
      this.initialiseCamera();
      this.animate();
      this.initialised = true;
      this.refQueue.map(this.addRef);
      this.refQueue = [];
      this.setupClickListeners();
    }
  }, {
    key: "setupClickListeners",
    value: function setupClickListeners() {
      this.clickableObjects = [];
      this.renderer.domElement.addEventListener('click', this.mouseClickListener); // Orbit controls is preventing touch devices from using the `click` event

      this.renderer.domElement.addEventListener('touchstart', this.touchStartListener);
      this.renderer.domElement.addEventListener('touchend', this.touchEndListener);
    }
  }, {
    key: "tearDownClickListeners",
    value: function tearDownClickListeners() {
      this.renderer.domElement.removeEventListener('click', this.mouseClickListener);
      this.renderer.domElement.removeEventListener('touchstart', this.touchStartListener);
      this.renderer.domElement.removeEventListener('touchend', this.touchEndListener);
    }
  }, {
    key: "getClickHandlerForObj",
    value: function getClickHandlerForObj(obj) {
      return (this.clickableObjects.filter(function (c) {
        return c.obj.uuid === obj.uuid;
      }).shift() || {}).handler;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
      this.tearDownClickListeners();
      cancelAnimationFrame(this.frameId);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.controls.enabled = this.props.controlsEnabled;

      if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
        this.renderer.setSize(this.props.width, this.props.height);
        this.camera.aspect = this.props.width / this.props.height;
        this.camera.updateProjectionMatrix();
      }
    }
  }, {
    key: "initialiseOrbits",
    value: function initialiseOrbits() {
      this.controls.enabled = this.props.controlsEnabled;
      this.controls.enablePan = false;
      this.controls.enableZoom = this.props.enableZoom;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 1.6;
      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 0.5;
      this.controls.minDistance = MIN_DISTANCE;
      this.controls.maxDistance = MAX_DISTANCE;
      this.controls.maxPolarAngle = Math.PI - Math.PI / 180 * 5;
      this.controls.minPolarAngle = Math.PI / 180 * 5;
    }
  }, {
    key: "initialiseCamera",
    value: function initialiseCamera() {
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = MIN_DISTANCE + (MAX_DISTANCE - MIN_DISTANCE) * this.props.initZoomLevel;
    }
  }, {
    key: "updateControlSpeeds",
    value: function updateControlSpeeds() {
      var _this$props$controlsC = this.props.controlsConfig,
          minZoomSpeed = _this$props$controlsC.minZoomSpeed,
          maxZoomSpeed = _this$props$controlsC.maxZoomSpeed,
          minRotateSpeed = _this$props$controlsC.minRotateSpeed,
          maxRotateSpeed = _this$props$controlsC.maxRotateSpeed;
      var distance = this.camera.position.distanceTo(new THREE.Vector3());
      var multiplier = (distance - this.controls.minDistance) / (this.controls.maxDistance - this.controls.minDistance);
      var zoomSpeed = minZoomSpeed + multiplier * (maxZoomSpeed - minZoomSpeed);
      var rotateSpeed = minRotateSpeed + multiplier * (maxRotateSpeed - minRotateSpeed);
      this.controls.zoomSpeed = zoomSpeed;
      this.controls.rotateSpeed = rotateSpeed;
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      var _this2 = this;

      return _react.Children.map(this.props.children, function (child) {
        if (!child) return null;
        return (0, _react.cloneElement)(child, {
          ref: function ref(_ref2) {
            return _this2.addRef(_ref2);
          },
          removeRef: function removeRef(ref) {
            return _this2.removeRef(ref);
          },
          registerClickableObject: _this2.registerClickableObject,
          unregisterClickableObject: _this2.unregisterClickableObject
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height;
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("canvas", {
        width: width,
        height: height,
        ref: this.canvasRef
      }), this.getChildren());
    }
  }]);

  return Scene;
}(_react.Component);

exports["default"] = Scene;
Scene.propTypes = {
  initZoomLevel: function initZoomLevel(props, propName, componentName) {
    if (props[propName] < 0 || props[propName] > 1) return new Error("Invalid value ".concat(props[propName], " for ").concat(propName, " for ").concat(componentName, ". Value for ").concat(propName, " for component ").concat(componentName, " must be a floating point between 0 and 1 inclusive"));
  },
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  children: _propTypes["default"].any,
  controlsEnabled: _propTypes["default"].bool,
  enableZoom: _propTypes["default"].bool.isRequired,
  controlsConfig: _propTypes["default"].shape({
    minZoomSpeed: _propTypes["default"].number,
    maxZoomSpeed: _propTypes["default"].number,
    minRotateSpeed: _propTypes["default"].number,
    maxRotateSpeed: _propTypes["default"].number
  })
};
Scene.defaultProps = {
  initZoomLevel: 0.8,
  width: 600,
  height: 600,
  controlsEnabled: true,
  controlsConfig: {
    minZoomSpeed: 0.03,
    maxZoomSpeed: 0.5,
    minRotateSpeed: 0.2,
    maxRotateSpeed: 1.0
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9TY2VuZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJDTElDS19USFJFU0hPTEQiLCJNSU5fRElTVEFOQ0UiLCJNQVhfRElTVEFOQ0UiLCJTY2VuZSIsInByb3BzIiwibW91c2VDbGlja0xpc3RlbmVyIiwiZSIsIl9pc01vdW50ZWQiLCJjbGlja0xpc3RlbmVyIiwieCIsIm9mZnNldFgiLCJ5Iiwib2Zmc2V0WSIsIndpZHRoIiwidGFyZ2V0IiwiaGVpZ2h0IiwidG91Y2hTdGFydExpc3RlbmVyIiwidG91Y2hTdGFydFRpbWUiLCJEYXRlIiwibm93IiwidG91Y2hFbmRMaXN0ZW5lciIsImR0IiwidG91Y2giLCJjaGFuZ2VkVG91Y2hlcyIsIml0ZW0iLCJwcmV2ZW50RGVmYXVsdCIsImJvdW5kaW5nUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNsaWVudFgiLCJjbGllbnRZIiwiY29udHJvbHNFbmFibGVkIiwibW91c2UiLCJUSFJFRSIsIlZlY3RvcjIiLCJyYXljYXN0ZXIiLCJSYXljYXN0ZXIiLCJzZXRGcm9tQ2FtZXJhIiwiY2FtZXJhIiwiaW50ZXJzZWN0cyIsImludGVyc2VjdE9iamVjdHMiLCJzY2VuZSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiaGFuZGxlciIsImdldENsaWNrSGFuZGxlckZvck9iaiIsIm9iamVjdCIsImFuaW1hdGUiLCJ1cGRhdGVDb250cm9sU3BlZWRzIiwiY29udHJvbHMiLCJ1cGRhdGUiLCJmcmFtZUlkIiwid2luZG93IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2NlbmVSZWZzIiwiZm9yRWFjaCIsInJlZiIsInNjZW5lT2JqZWN0cyIsInQiLCJyZW5kZXJlciIsInJlbmRlciIsImFkZFJlZiIsImluaXRpYWxpc2VkIiwicmVmUXVldWUiLCJwdXNoIiwiZmlsdGVyIiwic2NlbmVSZWYiLCJpbml0aWFsaXNlIiwiYWRkIiwiZ2V0T2JqIiwicmVtb3ZlUmVmIiwiZGVzdHJveSIsInJlbW92ZSIsInJlZ2lzdGVyQ2xpY2thYmxlT2JqZWN0Iiwib2JqIiwiY2xpY2thYmxlT2JqZWN0cyIsInVucmVnaXN0ZXJDbGlja2FibGVPYmplY3QiLCJjIiwiY2FudmFzUmVmIiwiY3VycmVudCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJXZWJHTFJlbmRlcmVyIiwiY2FudmFzIiwiYW50aWFsaWFzIiwicG93ZXJQcmVmZXJlbmNlIiwiYWxwaGEiLCJnYW1tYUZhY3RvciIsImdhbW1hT3V0UHV0IiwiT3JiaXRDb250cm9scyIsImRvbUVsZW1lbnQiLCJpbml0aWFsaXNlT3JiaXRzIiwiaW5pdGlhbGlzZUNhbWVyYSIsIm1hcCIsInNldHVwQ2xpY2tMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInV1aWQiLCJzaGlmdCIsInRlYXJEb3duQ2xpY2tMaXN0ZW5lcnMiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInByZXZQcm9wcyIsImVuYWJsZWQiLCJzZXRTaXplIiwiYXNwZWN0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsImVuYWJsZVBhbiIsImVuYWJsZVpvb20iLCJlbmFibGVEYW1waW5nIiwiZGFtcGluZ0ZhY3RvciIsInJvdGF0ZVNwZWVkIiwiem9vbVNwZWVkIiwibWluRGlzdGFuY2UiLCJtYXhEaXN0YW5jZSIsIm1heFBvbGFyQW5nbGUiLCJNYXRoIiwiUEkiLCJtaW5Qb2xhckFuZ2xlIiwicG9zaXRpb24iLCJ6IiwiaW5pdFpvb21MZXZlbCIsImNvbnRyb2xzQ29uZmlnIiwibWluWm9vbVNwZWVkIiwibWF4Wm9vbVNwZWVkIiwibWluUm90YXRlU3BlZWQiLCJtYXhSb3RhdGVTcGVlZCIsImRpc3RhbmNlIiwiZGlzdGFuY2VUbyIsIlZlY3RvcjMiLCJtdWx0aXBsaWVyIiwiQ2hpbGRyZW4iLCJjaGlsZCIsImdldENoaWxkcmVuIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwicHJvcE5hbWUiLCJjb21wb25lbnROYW1lIiwiRXJyb3IiLCJQcm9wVHlwZXMiLCJudW1iZXIiLCJhbnkiLCJib29sIiwiaXNSZXF1aXJlZCIsInNoYXBlIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBRyxHQUF4QjtBQUVBLElBQU1DLFlBQVksR0FBRyxFQUFyQjtBQUNBLElBQU1DLFlBQVksR0FBRyxFQUFyQjs7SUFFcUJDLEs7Ozs7O0FBK0JuQixpQkFBYUMsS0FBYixFQUFvQjtBQUFBOztBQUFBOztBQUNsQiwrRUFBTUEsS0FBTjs7QUFEa0IsVUE2QnBCQyxrQkE3Qm9CLEdBNkJDLFVBQUNDLENBQUQsRUFBTztBQUMxQixVQUFJLENBQUMsTUFBS0MsVUFBVixFQUFzQjs7QUFDdEIsWUFBS0MsYUFBTCxDQUFtQjtBQUFFQyxRQUFBQSxDQUFDLEVBQUVILENBQUMsQ0FBQ0ksT0FBUDtBQUFnQkMsUUFBQUEsQ0FBQyxFQUFFTCxDQUFDLENBQUNNLE9BQXJCO0FBQThCQyxRQUFBQSxLQUFLLEVBQUVQLENBQUMsQ0FBQ1EsTUFBRixDQUFTRCxLQUE5QztBQUFxREUsUUFBQUEsTUFBTSxFQUFFVCxDQUFDLENBQUNRLE1BQUYsQ0FBU0M7QUFBdEUsT0FBbkI7QUFDRCxLQWhDbUI7O0FBQUEsVUFrQ3BCQyxrQkFsQ29CLEdBa0NDLFVBQUNWLENBQUQsRUFBTztBQUMxQixVQUFJLENBQUMsTUFBS0MsVUFBVixFQUFzQjtBQUN0QixZQUFLVSxjQUFMLEdBQXNCQyxJQUFJLENBQUNDLEdBQUwsRUFBdEI7QUFDRCxLQXJDbUI7O0FBQUEsVUF1Q3BCQyxnQkF2Q29CLEdBdUNELFVBQUNkLENBQUQsRUFBTztBQUN4QixVQUFJLENBQUMsTUFBS1csY0FBTixJQUF3QixDQUFDLE1BQUtWLFVBQWxDLEVBQThDOztBQUM5QyxVQUFNYyxFQUFFLEdBQUdILElBQUksQ0FBQ0MsR0FBTCxLQUFhLE1BQUtGLGNBQTdCOztBQUNBLFVB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O0FBSWpCM0gsRUFBQUEsS0FBSyxFQUFFNkgsc0JBQVVDLE1BSkE7QUFLakI1SCxFQUFBQSxNQUFNLEVBQUUySCxzQkFBVUMsTUFMRDtBQU1qQmxHLEVBQUFBLFFBQVEsRUFBRWlHLHNCQUFVRSxHQU5IO0FBT2pCOUcsRUFBQUEsZUFBZSxFQUFFNEcsc0JBQVVHLElBUFY7QUFRakJsQyxFQUFBQSxVQUFVLEVBQUUrQixzQkFBVUcsSUFBVixDQUFlQyxVQVJWO0FBU2pCckIsRUFBQUEsY0FBYyxFQUFFaUIsc0JBQVVLLEtBQVYsQ0FBZ0I7QUFDOUJyQixJQUFBQSxZQUFZLEVBQUVnQixzQkFBVUMsTUFETTtBQUU5QmhCLElBQUFBLFlBQVksRUFBRWUsc0JBQVVDLE1BRk07QUFHOUJmLElBQUFBLGNBQWMsRUFBRWMsc0JBQVVDLE1BSEk7QUFJOUJkLElBQUFBLGNBQWMsRUFBRWEsc0JBQVVDO0FBSkksR0FBaEI7QUFUQyxDO0FBREF4SSxLLENBa0JaNkksWSxHQUFlO0FBQ3BCeEIsRUFBQUEsYUFBYSxFQUFFLEdBREs7QUFFcEIzRyxFQUFBQSxLQUFLLEVBQUUsR0FGYTtBQUdwQkUsRUFBQUEsTUFBTSxFQUFFLEdBSFk7QUFJcEJlLEVBQUFBLGVBQWUsRUFBRSxJQUpHO0FBS3BCMkYsRUFBQUEsY0FBYyxFQUFFO0FBQ2RDLElBQUFBLFlBQVksRUFBRSxJQURBO0FBRWRDLElBQUFBLFlBQVksRUFBRSxHQUZBO0FBR2RDLElBQUFBLGNBQWMsRUFBRSxHQUhGO0FBSWRDLElBQUFBLGNBQWMsRUFBRTtBQUpGO0FBTEksQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIGNyZWF0ZVJlZiwgRnJhZ21lbnQsIENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuaW1wb3J0IE9yYml0Q29udHJvbHMgZnJvbSAndGhyZWUtb3JiaXRjb250cm9scydcblxuY29uc3QgQ0xJQ0tfVEhSRVNIT0xEID0gMTMwXG5cbmNvbnN0IE1JTl9ESVNUQU5DRSA9IDM1XG5jb25zdCBNQVhfRElTVEFOQ0UgPSA5MFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaW5pdFpvb21MZXZlbDogKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkgPT4ge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA8IDAgfHwgcHJvcHNbcHJvcE5hbWVdID4gMSkgcmV0dXJuIG5ldyBFcnJvcihgSW52YWxpZCB2YWx1ZSAke3Byb3BzW3Byb3BOYW1lXX0gZm9yICR7cHJvcE5hbWV9IGZvciAke2NvbXBvbmVudE5hbWV9LiBWYWx1ZSBmb3IgJHtwcm9wTmFtZX0gZm9yIGNvbXBvbmVudCAke2NvbXBvbmVudE5hbWV9IG11c3QgYmUgYSBmbG9hdGluZyBwb2ludCBiZXR3ZWVuIDAgYW5kIDEgaW5jbHVzaXZlYClcbiAgICB9LFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBjaGlsZHJlbjogUHJvcFR5cGVzLmFueSxcbiAgICBjb250cm9sc0VuYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGVuYWJsZVpvb206IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gICAgY29udHJvbHNDb25maWc6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBtaW5ab29tU3BlZWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBtYXhab29tU3BlZWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBtaW5Sb3RhdGVTcGVlZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIG1heFJvdGF0ZVNwZWVkOiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaW5pdFpvb21MZXZlbDogMC44LFxuICAgIHdpZHRoOiA2MDAsXG4gICAgaGVpZ2h0OiA2MDAsXG4gICAgY29udHJvbHNFbmFibGVkOiB0cnVlLFxuICAgIGNvbnRyb2xzQ29uZmlnOiB7XG4gICAgICBtaW5ab29tU3BlZWQ6IDAuMDMsXG4gICAgICBtYXhab29tU3BlZWQ6IDAuNSxcbiAgICAgIG1pblJvdGF0ZVNwZWVkOiAwLjIsXG4gICAgICBtYXhSb3RhdGVTcGVlZDogMS4wXG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5jYW52YXNSZWYgPSBjcmVhdGVSZWYoKVxuICAgIHRoaXMuc2NlbmVSZWZzID0gW11cbiAgICB0aGlzLmluaXRpYWxpc2VkID0gZmFsc2VcbiAgICB0aGlzLnJlZlF1ZXVlID0gW11cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcbiAgICB0aGlzLl9pc01vdW50ZWQgPSB0cnVlXG4gICAgY29uc3QgeyBjYW52YXNSZWYgfSA9IHRoaXNcbiAgICBjb25zdCB3aWR0aCA9IGNhbnZhc1JlZi5jdXJyZW50LmNsaWVudFdpZHRoXG4gICAgY29uc3QgaGVpZ2h0ID0gY2FudmFzUmVmLmN1cnJlbnQuY2xpZW50SGVpZ2h0XG5cbiAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKClcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2lkdGggLyBoZWlnaHQsIDAuMSwgMTAwMClcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBjYW52YXM6IGNhbnZhc1JlZi5jdXJyZW50LCBhbnRpYWxpYXM6IHRydWUsIHBvd2VyUHJlZmVyZW5jZTogJ2hpZ2gtcGVyZm9ybWFuY2UnLCBhbHBoYTogdHJ1ZSB9KVxuICAgIHRoaXMucmVuZGVyZXIuZ2FtbWFGYWN0b3IgPSAyLjJcbiAgICB0aGlzLnJlbmRlcmVyLmdhbW1hT3V0UHV0ID0gdHJ1ZVxuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50KVxuICAgIHRoaXMuaW5pdGlhbGlzZU9yYml0cygpXG4gICAgdGhpcy5pbml0aWFsaXNlQ2FtZXJhKClcbiAgICB0aGlzLmFuaW1hdGUoKVxuICAgIHRoaXMuaW5pdGlhbGlzZWQgPSB0cnVlXG4gICAgdGhpcy5yZWZRdWV1ZS5tYXAodGhpcy5hZGRSZWYpXG4gICAgdGhpcy5yZWZRdWV1ZSA9IFtdXG4gICAgdGhpcy5zZXR1cENsaWNrTGlzdGVuZXJzKClcbiAgfVxuXG4gIG1vdXNlQ2xpY2tMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLl9pc01vdW50ZWQpIHJldHVyblxuICAgIHRoaXMuY2xpY2tMaXN0ZW5lcih7IHg6IGUub2Zmc2V0WCwgeTogZS5vZmZzZXRZLCB3aWR0aDogZS50YXJnZXQud2lkdGgsIGhlaWdodDogZS50YXJnZXQuaGVpZ2h0IH0pXG4gIH1cblxuICB0b3VjaFN0YXJ0TGlzdGVuZXIgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5faXNNb3VudGVkKSByZXR1cm5cbiAgICB0aGlzLnRvdWNoU3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuICB9XG5cbiAgdG91Y2hFbmRMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnRvdWNoU3RhcnRUaW1lIHx8ICF0aGlzLl9pc01vdW50ZWQpIHJldHVyblxuICAgIGNvbnN0IGR0ID0gRGF0ZS5ub3coKSAtIHRoaXMudG91Y2hTdGFydFRpbWVcbiAgICBpZiAoZHQgPD0gQ0xJQ0tfVEhSRVNIT0xEKSB7XG4gICAgICBjb25zdCB0b3VjaCA9IGUuY2hhbmdlZFRvdWNoZXMuaXRlbSgwKVxuICAgICAgaWYgKCF0b3VjaCkgcmV0dXJuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IGJvdW5kaW5nUmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICB0aGlzLmNsaWNrTGlzdGVuZXIoeyB4OiB0b3VjaC5jbGllbnRYIC0gYm91bmRpbmdSZWN0LngsIHk6IHRvdWNoLmNsaWVudFkgLSBib3VuZGluZ1JlY3QueSwgd2lkdGg6IGUudGFyZ2V0LndpZHRoLCBoZWlnaHQ6IGUudGFyZ2V0LmhlaWdodCB9KVxuICAgIH1cbiAgfVxuXG4gIHNldHVwQ2xpY2tMaXN0ZW5lcnMgKCkge1xuICAgIHRoaXMuY2xpY2thYmxlT2JqZWN0cyA9IFtdXG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5tb3VzZUNsaWNrTGlzdGVuZXIpXG5cbiAgICAvLyBPcmJpdCBjb250cm9scyBpcyBwcmV2ZW50aW5nIHRvdWNoIGRldmljZXMgZnJvbSB1c2luZyB0aGUgYGNsaWNrYCBldmVudFxuICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0TGlzdGVuZXIpXG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZExpc3RlbmVyKVxuICB9XG5cbiAgdGVhckRvd25DbGlja0xpc3RlbmVycyAoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5tb3VzZUNsaWNrTGlzdGVuZXIpXG4gICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLnRvdWNoU3RhcnRMaXN0ZW5lcilcbiAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kTGlzdGVuZXIpXG4gIH1cblxuICBnZXRDbGlja0hhbmRsZXJGb3JPYmogKG9iaikge1xuICAgIHJldHVybiAodGhpcy5jbGlja2FibGVPYmplY3RzLmZpbHRlcihjID0+IGMub2JqLnV1aWQgPT09IG9iai51dWlkKS5zaGlmdCgpIHx8IHt9KS5oYW5kbGVyXG4gIH1cblxuICBjbGlja0xpc3RlbmVyID0gKHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9KSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmNvbnRyb2xzRW5hYmxlZCkgcmV0dXJuXG4gICAgY29uc3QgbW91c2UgPSBuZXcgVEhSRUUuVmVjdG9yMih4LCB5KVxuICAgIG1vdXNlLnggPSAoeCAvIHdpZHRoKSAqIDIgLSAxXG4gICAgbW91c2UueSA9IC0oeSAvIGhlaWdodCkgKiAyICsgMVxuICAgIGNvbnN0IHJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuICAgIHJheWNhc3Rlci5zZXRGcm9tQ2FtZXJhKG1vdXNlLCB0aGlzLmNhbWVyYSlcbiAgICBjb25zdCBpbnRlcnNlY3RzID0gcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHModGhpcy5zY2VuZS5jaGlsZHJlbiwgdHJ1ZSlcbiAgICAvLyBPbmx5IGludGVyZXN0ZWQgaW4gdGhlIGNsb3Nlc3Qgb2JqZWN0LCB3ZSBkb24ndCB3YW50IHRvIGNsaWNrIHRocm91Z2ggb2JqZWN0c1xuICAgIGlmIChpbnRlcnNlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLmdldENsaWNrSGFuZGxlckZvck9iaihpbnRlcnNlY3RzWzBdLm9iamVjdClcbiAgICAgIGhhbmRsZXIgJiYgaGFuZGxlcigpXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMuX2lzTW91bnRlZCA9IGZhbHNlXG4gICAgdGhpcy50ZWFyRG93bkNsaWNrTGlzdGVuZXJzKClcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lSWQpXG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUgKHByZXZQcm9wcykge1xuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlZCA9IHRoaXMucHJvcHMuY29udHJvbHNFbmFibGVkXG4gICAgaWYgKHRoaXMucHJvcHMud2lkdGggIT09IHByZXZQcm9wcy53aWR0aCB8fCB0aGlzLnByb3BzLmhlaWdodCAhPT0gcHJldlByb3BzLmhlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHRoaXMucHJvcHMud2lkdGgsIHRoaXMucHJvcHMuaGVpZ2h0KVxuICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy5wcm9wcy53aWR0aCAvIHRoaXMucHJvcHMuaGVpZ2h0XG4gICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXNlT3JiaXRzICgpIHtcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZWQgPSB0aGlzLnByb3BzLmNvbnRyb2xzRW5hYmxlZFxuICAgIHRoaXMuY29udHJvbHMuZW5hYmxlUGFuID0gZmFsc2VcbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZVpvb20gPSB0aGlzLnByb3BzLmVuYWJsZVpvb21cbiAgICB0aGlzLmNvbnRyb2xzLmVuYWJsZURhbXBpbmcgPSB0cnVlXG4gICAgdGhpcy5jb250cm9scy5kYW1waW5nRmFjdG9yID0gMS42XG4gICAgdGhpcy5jb250cm9scy5yb3RhdGVTcGVlZCA9IDEuMFxuICAgIHRoaXMuY29udHJvbHMuem9vbVNwZWVkID0gMC41XG4gICAgdGhpcy5jb250cm9scy5taW5EaXN0YW5jZSA9IE1JTl9ESVNUQU5DRVxuICAgIHRoaXMuY29udHJvbHMubWF4RGlzdGFuY2UgPSBNQVhfRElTVEFOQ0VcbiAgICB0aGlzLmNvbnRyb2xzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJIC0gKChNYXRoLlBJIC8gMTgwKSAqIDUpXG4gICAgdGhpcy5jb250cm9scy5taW5Qb2xhckFuZ2xlID0gKE1hdGguUEkgLyAxODApICogNVxuICB9XG5cbiAgaW5pdGlhbGlzZUNhbWVyYSAoKSB7XG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueCA9IDBcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gMFxuICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSBNSU5fRElTVEFOQ0UgKyAoKE1BWF9ESVNUQU5DRSAtIE1JTl9ESVNUQU5DRSkgKiB0aGlzLnByb3BzLmluaXRab29tTGV2ZWwpXG4gIH1cblxuICB1cGRhdGVDb250cm9sU3BlZWRzICgpIHtcbiAgICBjb25zdCB7IG1pblpvb21TcGVlZCwgbWF4Wm9vbVNwZWVkLCBtaW5Sb3RhdGVTcGVlZCwgbWF4Um90YXRlU3BlZWQgfSA9IHRoaXMucHJvcHMuY29udHJvbHNDb25maWdcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuY2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8obmV3IFRIUkVFLlZlY3RvcjMoKSlcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gKGRpc3RhbmNlIC0gdGhpcy5jb250cm9scy5taW5EaXN0YW5jZSkgLyAodGhpcy5jb250cm9scy5tYXhEaXN0YW5jZSAtIHRoaXMuY29udHJvbHMubWluRGlzdGFuY2UpXG4gICAgY29uc3Qgem9vbVNwZWVkID0gbWluWm9vbVNwZWVkICsgKG11bHRpcGxpZXIgKiAobWF4Wm9vbVNwZWVkIC0gbWluWm9vbVNwZWVkKSlcbiAgICBjb25zdCByb3RhdGVTcGVlZCA9IG1pblJvdGF0ZVNwZWVkICsgKG11bHRpcGxpZXIgKiAobWF4Um90YXRlU3BlZWQgLSBtaW5Sb3RhdGVTcGVlZCkpXG4gICAgdGhpcy5jb250cm9scy56b29tU3BlZWQgPSB6b29tU3BlZWRcbiAgICB0aGlzLmNvbnRyb2xzLnJvdGF0ZVNwZWVkID0gcm90YXRlU3BlZWRcbiAgfVxuXG4gIGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICAgIHRoaXMudXBkYXRlQ29udHJvbFNwZWVkcygpXG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKVxuICAgIHRoaXMuZnJhbWVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKVxuICAgIHRoaXMuc2NlbmVSZWZzLmZvckVhY2gocmVmID0+IHJlZi5hbmltYXRlICYmIHJlZi5hbmltYXRlKHsgc2NlbmU6IHRoaXMuc2NlbmUsIHNjZW5lT2JqZWN0czogdGhpcy5zY2VuZVJlZnMsIGNhbWVyYTogdGhpcy5jYW1lcmEsIHQ6IG5vdyB9KSlcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSlcbiAgfVxuXG4gIGFkZFJlZiA9IChyZWYpID0+IHtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbGlzZWQpIHJldHVybiB0aGlzLnJlZlF1ZXVlLnB1c2gocmVmKVxuICAgIGlmICghcmVmKSByZXR1cm5cbiAgICBpZiAodGhpcy5zY2VuZVJlZnMuZmlsdGVyKHNjZW5lUmVmID0+IHNjZW5lUmVmID09PSByZWYpLmxlbmd0aCA+IDApIHJldHVyblxuICAgIHRoaXMuc2NlbmVSZWZzLnB1c2gocmVmKVxuICAgIHJlZi5pbml0aWFsaXNlICYmIHJlZi5pbml0aWFsaXNlKHsgc2NlbmVPYmplY3RzOiB0aGlzLnNjZW5lUmVmcywgY2FtZXJhOiB0aGlzLmNhbWVyYSwgcmVuZGVyZXI6IHRoaXMucmVuZGVyZXIgfSlcbiAgICB0aGlzLnNjZW5lLmFkZChyZWYuZ2V0T2JqKCkpXG4gIH1cblxuICByZW1vdmVSZWYgPSAocmVmKSA9PiB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpc2VkKSByZXR1cm5cbiAgICBpZiAoIXJlZikgcmV0dXJuXG4gICAgaWYgKHRoaXMuc2NlbmVSZWZzLmZpbHRlcihzY2VuZVJlZiA9PiBzY2VuZVJlZiA9PT0gcmVmKS5sZW5ndGggPiAwKSByZXR1cm5cbiAgICB0aGlzLnNjZW5lUmVmcyA9IHRoaXMuc2NlbmVSZWZzLmZpbHRlcihzY2VuZVJlZiA9PiBzY2VuZVJlZiAhPT0gcmVmKVxuICAgIHJlZi5kZXN0cm95ICYmIHJlZi5kZXN0cm95KHsgc2NlbmVPYmplY3RzOiB0aGlzLnNjZW5lUmVmcywgY2FtZXJhOiB0aGlzLmNhbWVyYSB9KVxuICAgIHRoaXMuc2NlbmUucmVtb3ZlKHJlZi5nZXRPYmooKSlcbiAgfVxuXG4gIHJlZ2lzdGVyQ2xpY2thYmxlT2JqZWN0ID0gKG9iaiwgaGFuZGxlcikgPT4ge1xuICAgIGlmICghdGhpcy5nZXRDbGlja0hhbmRsZXJGb3JPYmoob2JqKSkge1xuICAgICAgdGhpcy5jbGlja2FibGVPYmplY3RzLnB1c2goeyBvYmosIGhhbmRsZXIgfSlcbiAgICB9XG4gIH1cblxuICB1bnJlZ2lzdGVyQ2xpY2thYmxlT2JqZWN0ID0gKG9iaiwgaGFuZGxlcikgPT4ge1xuICAgIHRoaXMuY2xpY2thYmxlT2JqZWN0cyA9IHRoaXMuY2xpY2thYmxlT2JqZWN0cy5maWx0ZXIoYyA9PiAhKGMub2JqID09PSBvYmogJiYgYy5oYW5kbGVyID09PSBoYW5kbGVyKSlcbiAgfVxuXG4gIGdldENoaWxkcmVuICgpIHtcbiAgICByZXR1cm4gQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIGNoaWxkID0+IHtcbiAgICAgIGlmICghY2hpbGQpIHJldHVybiBudWxsXG4gICAgICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgIHJlZjogcmVmID0+IHRoaXMuYWRkUmVmKHJlZiksXG4gICAgICAgIHJlbW92ZVJlZjogcmVmID0+IHRoaXMucmVtb3ZlUmVmKHJlZiksXG4gICAgICAgIHJlZ2lzdGVyQ2xpY2thYmxlT2JqZWN0OiB0aGlzLnJlZ2lzdGVyQ2xpY2thYmxlT2JqZWN0LFxuICAgICAgICB1bnJlZ2lzdGVyQ2xpY2thYmxlT2JqZWN0OiB0aGlzLnVucmVnaXN0ZXJDbGlja2FibGVPYmplY3RcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIChcbiAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgPGNhbnZhcyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSByZWY9e3RoaXMuY2FudmFzUmVmfSAvPlxuICAgICAgICB7dGhpcy5nZXRDaGlsZHJlbigpfVxuICAgICAgPC9GcmFnbWVudD5cbiAgICApXG4gIH1cbn1cbiJdfQ==