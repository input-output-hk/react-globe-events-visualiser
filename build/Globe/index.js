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

var Globe =
/*#__PURE__*/
function (_Component) {
  _inherits(Globe, _Component);

  function Globe() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Globe);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Globe)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.textureLoaded = function () {
      _this.texturesToLoad--;

      if (_this.texturesToLoad < 1 && _this.props.onTextured) {
        _this.props.onTextured();

        if (_this.props.initRotationPoints.length > 1) _this.startInitRotation();
      }
    };

    return _this;
  }

  _createClass(Globe, [{
    key: "initialise",
    value: function initialise(_ref) {
      var camera = _ref.camera;
      this.texturesToLoad = 1;
      if (this.props.bumpPath) this.texturesToLoad++;
      var geometry = new THREE.SphereBufferGeometry(this.props.radius, 64, 64);
      var material = this.getMaterial(this.props.imagePath, this.props.bumpPath, this.textureLoaded);
      this.obj = new THREE.Mesh(geometry, material);
      this.origin = new THREE.Vector3();

      if (this.props.initRotationPoints.length > 0) {
        this.cameraDistance = new THREE.Line3(this.origin, camera.position).distance();
        camera.position.copy(this.getPositionFromLatLon(this.props.initRotationPoints[0].lat, this.props.initRotationPoints[0].lon));
        var raycaster = new THREE.Raycaster(this.origin, camera.position.clone().normalize());
        var initPos = this.origin.clone();
        raycaster.ray.at(this.cameraDistance, initPos);
        camera.position.copy(initPos);
        this.nextPositionIndex = 1;
        this.cameraVerticalRaycaster = new THREE.Raycaster();
      }
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(imagePath, bumpPath) {
      var textureLoadedCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load(imagePath, textureLoadedCallback);
      var material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true
      });
      material.roughness = 1;

      if (bumpPath) {
        var bumpTextureLoader = new THREE.TextureLoader();
        var bumpTexture = bumpTextureLoader.load(bumpPath, textureLoadedCallback);
        material.bumpMap = bumpTexture;
        material.bumpScale = 0.8;
      }

      return material;
    }
  }, {
    key: "startInitRotation",
    value: function () {
      var _startInitRotation = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.props.onRotate();
                _context.next = 3;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 3000);
                });

              case 3:
                this.moveCamera = true;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function startInitRotation() {
        return _startInitRotation.apply(this, arguments);
      }

      return startInitRotation;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          imagePath = _this$props.imagePath,
          bumpPath = _this$props.bumpPath;
      var newImagePath, newBumpPath;
      if (imagePath !== prevProps.imagePath) newImagePath = imagePath;
      if (bumpPath !== prevProps.bumpPath) newBumpPath = bumpPath;

      if (newImagePath || newBumpPath) {
        var material = this.getMaterial(newImagePath, newBumpPath);
        this.obj.material = material;
        material.needsUpdate = true;
      }
    }
  }, {
    key: "getPositionFromLatLon",
    value: function getPositionFromLatLon(lat, lon) {
      var radius = this.props.radius;
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
    key: "getDistanceFromLatLonInKm",
    value: function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      var R = 6371; // Radius of the earth in km

      var dLat = this.deg2rad(lat2 - lat1); // deg2rad below

      var dLon = this.deg2rad(lon2 - lon1);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km

      return d;
    }
  }, {
    key: "deg2rad",
    value: function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
  }, {
    key: "getCameraAnimationTime",
    value: function getCameraAnimationTime() {
      var _this$props2 = this.props,
          initRotationPoints = _this$props2.initRotationPoints,
          initRotationAnimationDuration = _this$props2.initRotationAnimationDuration;
      var distance = this.getDistanceFromLatLonInKm(initRotationPoints[this.nextPositionIndex - 1].lat, initRotationPoints[this.nextPositionIndex - 1].lon, initRotationPoints[this.nextPositionIndex].lat, initRotationPoints[this.nextPositionIndex].lon);
      return distance / 1000 * initRotationAnimationDuration;
    }
  }, {
    key: "getCameraMoveDistance",
    value: function getCameraMoveDistance(dt) {
      dt /= this.cameraAnimationTime / 1000 / 2;
      if (dt < 1) return 1 / 2 * dt * dt;
      dt--;
      return -1 / 2 * (dt * (dt - 2) - 1);
    }
  }, {
    key: "animateCamera",
    value: function animateCamera(camera, t) {
      if (!this.moveCamera) return;
      if (!this.moveCameraTime) this.moveCameraTime = t;

      if (!this.cameraFinalPosition) {
        this.cameraAnimationTime = this.getCameraAnimationTime();
        var pos = this.getPositionFromLatLon(this.props.initRotationPoints[this.nextPositionIndex].lat, this.props.initRotationPoints[this.nextPositionIndex].lon);
        var raycaster = new THREE.Raycaster(this.origin, pos.normalize());

        var _finalPos = this.origin.clone();

        raycaster.ray.at(this.cameraDistance, _finalPos);
        this.cameraFinalPosition = _finalPos;
        this.cameraMoveLine = new THREE.Line3(camera.position.clone(), this.cameraFinalPosition.clone());
      }

      var dt = (t - this.moveCameraTime) / 1000;
      var moveDistance = this.getCameraMoveDistance(dt);
      var newPos = this.origin.clone();
      this.cameraMoveLine.at(moveDistance, newPos);
      this.cameraVerticalRaycaster.set(this.origin, newPos.clone().normalize());
      var finalPos = this.origin.clone();
      this.cameraVerticalRaycaster.ray.at(this.cameraDistance, finalPos);
      camera.position.set(finalPos.x, finalPos.y, finalPos.z);

      if (dt >= this.cameraAnimationTime / 1000) {
        this.cameraFinalPosition = null;
        this.cameraMoveLine = null;
        this.moveCameraTime = null;
        this.nextPositionIndex++;
        this.cameraAnimationTime = null;

        if (!this.props.initRotationPoints[this.nextPositionIndex]) {
          this.moveCamera = false;
          this.props.onRotateEnd();
        }
      }
    }
  }, {
    key: "animate",
    value: function animate(_ref2) {
      var scene = _ref2.scene,
          camera = _ref2.camera,
          t = _ref2.t;
      if (this.texturesToLoad > 0 && this.obj.parent) this.obj.parent.remove(this.obj);
      if (this.texturesToLoad < 1 && !this.obj.parent) scene.add(this.obj);
      this.animateCamera(camera, t);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.obj.parent && this.obj.parent.remove(this.obj);
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
    key: "getRadius",
    value: function getRadius() {
      return this.props.radius;
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return Globe;
}(_react.Component);

exports["default"] = Globe;
Globe.propTypes = {
  imagePath: _propTypes["default"].string.isRequired,
  bumpPath: _propTypes["default"].string,
  id: _propTypes["default"].string.isRequired,
  radius: _propTypes["default"].number.isRequired,
  onTextured: _propTypes["default"].func,
  onRotate: _propTypes["default"].func.isRequired,
  onRotateEnd: _propTypes["default"].func.isRequired,
  initRotationAnimationDuration: _propTypes["default"].number,
  initRotationPoints: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    lat: _propTypes["default"].number.isRequired,
    lon: _propTypes["default"].number.isRequired
  }))
};
Globe.defaultProps = {
  // Per 1000km
  initRotationAnimationDuration: 200,
  initRotationPoints: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9HbG9iZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJHbG9iZSIsInRleHR1cmVMb2FkZWQiLCJ0ZXh0dXJlc1RvTG9hZCIsInByb3BzIiwib25UZXh0dXJlZCIsImluaXRSb3RhdGlvblBvaW50cyIsImxlbmd0aCIsInN0YXJ0SW5pdFJvdGF0aW9uIiwiY2FtZXJhIiwiYnVtcFBhdGgiLCJnZW9tZXRyeSIsIlRIUkVFIiwiU3BoZXJlQnVmZmVyR2VvbWV0cnkiLCJyYWRpdXMiLCJtYXRlcmlhbCIsImdldE1hdGVyaWFsIiwiaW1hZ2VQYXRoIiwib2JqIiwiTWVzaCIsIm9yaWdpbiIsIlZlY3RvcjMiLCJjYW1lcmFEaXN0YW5jZSIsIkxpbmUzIiwicG9zaXRpb24iLCJkaXN0YW5jZSIsImNvcHkiLCJnZXRQb3NpdGlvbkZyb21MYXRMb24iLCJsYXQiLCJsb24iLCJyYXljYXN0ZXIiLCJSYXljYXN0ZXIiLCJjbG9uZSIsIm5vcm1hbGl6ZSIsImluaXRQb3MiLCJyYXkiLCJhdCIsIm5leHRQb3NpdGlvbkluZGV4IiwiY2FtZXJhVmVydGljYWxSYXljYXN0ZXIiLCJ0ZXh0dXJlTG9hZGVkQ2FsbGJhY2siLCJ0ZXh0dXJlTG9hZGVyIiwiVGV4dHVyZUxvYWRlciIsInRleHR1cmUiLCJsb2FkIiwiTWVzaFN0YW5kYXJkTWF0ZXJpYWwiLCJtYXAiLCJ0cmFuc3BhcmVudCIsInJvdWdobmVzcyIsImJ1bXBUZXh0dXJlTG9hZGVyIiwiYnVtcFRleHR1cmUiLCJidW1wTWFwIiwiYnVtcFNjYWxlIiwib25Sb3RhdGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJtb3ZlQ2FtZXJhIiwicHJldlByb3BzIiwibmV3SW1hZ2VQYXRoIiwibmV3QnVtcFBhdGgiLCJuZWVkc1VwZGF0ZSIsInBoaSIsIk1hdGgiLCJQSSIsInRoZXRhIiwieCIsInNpbiIsImNvcyIsInoiLCJ5IiwicG9zIiwic2V0IiwibGF0MSIsImxvbjEiLCJsYXQyIiwibG9uMiIsIlIiLCJkTGF0IiwiZGVnMnJhZCIsImRMb24iLCJhIiwiYyIsImF0YW4yIiwic3FydCIsImQiLCJkZWciLCJpbml0Um90YXRpb25BbmltYXRpb25EdXJhdGlvbiIsImdldERpc3RhbmNlRnJvbUxhdExvbkluS20iLCJkdCIsImNhbWVyYUFuaW1hdGlvblRpbWUiLCJ0IiwibW92ZUNhbWVyYVRpbWUiLCJjYW1lcmFGaW5hbFBvc2l0aW9uIiwiZ2V0Q2FtZXJhQW5pbWF0aW9uVGltZSIsImZpbmFsUG9zIiwiY2FtZXJhTW92ZUxpbmUiLCJtb3ZlRGlzdGFuY2UiLCJnZXRDYW1lcmFNb3ZlRGlzdGFuY2UiLCJuZXdQb3MiLCJvblJvdGF0ZUVuZCIsInNjZW5lIiwicGFyZW50IiwicmVtb3ZlIiwiYWRkIiwiYW5pbWF0ZUNhbWVyYSIsImlkIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm51bWJlciIsImZ1bmMiLCJhcnJheU9mIiwic2hhcGUiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBK0RuQkMsYSxHQUFnQixZQUFNO0FBQ3BCLFlBQUtDLGNBQUw7O0FBQ0EsVUFBSSxNQUFLQSxjQUFMLEdBQXNCLENBQXRCLElBQTJCLE1BQUtDLEtBQUwsQ0FBV0MsVUFBMUMsRUFBc0Q7QUFDcEQsY0FBS0QsS0FBTCxDQUFXQyxVQUFYOztBQUNBLFlBQUksTUFBS0QsS0FBTCxDQUFXRSxrQkFBWCxDQUE4QkMsTUFBOUIsR0FBdUMsQ0FBM0MsRUFBOEMsTUFBS0MsaUJBQUw7QUFDL0M7QUFDRixLOzs7Ozs7O3FDQS9DdUI7QUFBQSxVQUFWQyxNQUFVLFFBQVZBLE1BQVU7QUFDdEIsV0FBS04sY0FBTCxHQUFzQixDQUF0QjtBQUNBLFVBQUksS0FBS0MsS0FBTCxDQUFXTSxRQUFmLEVBQXlCLEtBQUtQLGNBQUw7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QkFBa0IsRUFBRXNHLHNCQUFVSyxPQUFWLENBQWtCTCxzQkFBVU0sS0FBVixDQUFnQjtBQUNwRHRGLElBQUFBLEdBQUcsRUFBRWdGLHNCQUFVRyxNQUFWLENBQWlCRCxVQUQ4QjtBQUVwRGpGLElBQUFBLEdBQUcsRUFBRStFLHNCQUFVRyxNQUFWLENBQWlCRDtBQUY4QixHQUFoQixDQUFsQjtBQVRILEM7QUFEQTdHLEssQ0FnQlprSCxZLEdBQWU7QUFDcEI7QUFDQTdCLEVBQUFBLDZCQUE2QixFQUFFLEdBRlg7QUFHcEJoRixFQUFBQSxrQkFBa0IsRUFBRTtBQUhBLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbG9iZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaW1hZ2VQYXRoOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYnVtcFBhdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICByYWRpdXM6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBvblRleHR1cmVkOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblJvdGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBvblJvdGF0ZUVuZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpbml0Um90YXRpb25BbmltYXRpb25EdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgICBpbml0Um90YXRpb25Qb2ludHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBsYXQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGxvbjogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4gICAgfSkpXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC8vIFBlciAxMDAwa21cbiAgICBpbml0Um90YXRpb25BbmltYXRpb25EdXJhdGlvbjogMjAwLFxuICAgIGluaXRSb3RhdGlvblBvaW50czogW11cbiAgfVxuXG4gIGluaXRpYWxpc2UgKHsgY2FtZXJhIH0pIHtcbiAgICB0aGlzLnRleHR1cmVzVG9Mb2FkID0gMVxuICAgIGlmICh0aGlzLnByb3BzLmJ1bXBQYXRoKSB0aGlzLnRleHR1cmVzVG9Mb2FkKytcbiAgICBjb25zdCBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVCdWZmZXJHZW9tZXRyeSh0aGlzLnByb3BzLnJhZGl1cywgNjQsIDY0KVxuICAgIGNvbnN0IG1hdGVyaWFsID0gdGhpcy5nZXRNYXRlcmlhbCh0aGlzLnByb3BzLmltYWdlUGF0aCwgdGhpcy5wcm9wcy5idW1wUGF0aCwgdGhpcy50ZXh0dXJlTG9hZGVkKVxuICAgIHRoaXMub2JqID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKVxuICAgIHRoaXMub3JpZ2luID0gbmV3IFRIUkVFLlZlY3RvcjMoKVxuICAgIGlmICh0aGlzLnByb3BzLmluaXRSb3RhdGlvblBvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNhbWVyYURpc3RhbmNlID0gbmV3IFRIUkVFLkxpbmUzKHRoaXMub3JpZ2luLCBjYW1lcmEucG9zaXRpb24pLmRpc3RhbmNlKClcbiAgICAgIGNhbWVyYS5wb3NpdGlvbi5jb3B5KHRoaXMuZ2V0UG9zaXRpb25Gcm9tTGF0TG9uKHRoaXMucHJvcHMuaW5pdFJvdGF0aW9uUG9pbnRzWzBdLmxhdCwgdGhpcy5wcm9wcy5pbml0Um90YXRpb25Qb2ludHNbMF0ubG9uKSlcbiAgICAgIGNvbnN0IHJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIodGhpcy5vcmlnaW4sIGNhbWVyYS5wb3NpdGlvbi5jbG9uZSgpLm5vcm1hbGl6ZSgpKVxuICAgICAgbGV0IGluaXRQb3MgPSB0aGlzLm9yaWdpbi5jbG9uZSgpXG4gICAgICByYXljYXN0ZXIucmF5LmF0KHRoaXMuY2FtZXJhRGlzdGFuY2UsIGluaXRQb3MpXG4gICAgICBjYW1lcmEucG9zaXRpb24uY29weShpbml0UG9zKVxuICAgICAgdGhpcy5uZXh0UG9zaXRpb25JbmRleCA9IDFcbiAgICAgIHRoaXMuY2FtZXJhVmVydGljYWxSYXljYXN0ZXIgPSBuZXcgVEhSRUUuUmF5Y2FzdGVyKClcbiAgICB9XG4gIH1cblxuICBnZXRNYXRlcmlhbCAoaW1hZ2VQYXRoLCBidW1wUGF0aCwgdGV4dHVyZUxvYWRlZENhbGxiYWNrID0gKCkgPT4ge30pIHtcbiAgICBjb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKVxuICAgIGNvbnN0IHRleHR1cmUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoaW1hZ2VQYXRoLCB0ZXh0dXJlTG9hZGVkQ2FsbGJhY2spXG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7IG1hcDogdGV4dHVyZSwgdHJhbnNwYXJlbnQ6IHRydWUgfSlcbiAgICBtYXRlcmlhbC5yb3VnaG5lc3MgPSAxXG4gICAgaWYgKGJ1bXBQYXRoKSB7XG4gICAgICBjb25zdCBidW1wVGV4dHVyZUxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKClcbiAgICAgIGNvbnN0IGJ1bXBUZXh0dXJlID0gYnVtcFRleHR1cmVMb2FkZXIubG9hZChidW1wUGF0aCwgdGV4dHVyZUxvYWRlZENhbGxiYWNrKVxuICAgICAgbWF0ZXJpYWwuYnVtcE1hcCA9IGJ1bXBUZXh0dXJlXG4gICAgICBtYXRlcmlhbC5idW1wU2NhbGUgPSAwLjhcbiAgICB9XG5cbiAgICByZXR1cm4gbWF0ZXJpYWxcbiAgfVxuXG4gIGFzeW5jIHN0YXJ0SW5pdFJvdGF0aW9uICgpIHtcbiAgICB0aGlzLnByb3BzLm9uUm90YXRlKClcbiAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCAzMDAwKSlcbiAgICB0aGlzLm1vdmVDYW1lcmEgPSB0cnVlXG4gIH1cblxuICB0ZXh0dXJlTG9hZGVkID0gKCkgPT4ge1xuICAgIHRoaXMudGV4dHVyZXNUb0xvYWQtLVxuICAgIGlmICh0aGlzLnRleHR1cmVzVG9Mb2FkIDwgMSAmJiB0aGlzLnByb3BzLm9uVGV4dHVyZWQpIHtcbiAgICAgIHRoaXMucHJvcHMub25UZXh0dXJlZCgpXG4gICAgICBpZiAodGhpcy5wcm9wcy5pbml0Um90YXRpb25Qb2ludHMubGVuZ3RoID4gMSkgdGhpcy5zdGFydEluaXRSb3RhdGlvbigpXG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IGltYWdlUGF0aCwgYnVtcFBhdGggfSA9IHRoaXMucHJvcHNcbiAgICBsZXQgbmV3SW1hZ2VQYXRoLCBuZXdCdW1wUGF0aFxuICAgIGlmIChpbWFnZVBhdGggIT09IHByZXZQcm9wcy5pbWFnZVBhdGgpIG5ld0ltYWdlUGF0aCA9IGltYWdlUGF0aFxuICAgIGlmIChidW1wUGF0aCAhPT0gcHJldlByb3BzLmJ1bXBQYXRoKSBuZXdCdW1wUGF0aCA9IGJ1bXBQYXRoXG4gICAgaWYgKG5ld0ltYWdlUGF0aCB8fCBuZXdCdW1wUGF0aCkge1xuICAgICAgY29uc3QgbWF0ZXJpYWwgPSB0aGlzLmdldE1hdGVyaWFsKG5ld0ltYWdlUGF0aCwgbmV3QnVtcFBhdGgpXG4gICAgICB0aGlzLm9iai5tYXRlcmlhbCA9IG1hdGVyaWFsXG4gICAgICBtYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWVcbiAgICB9XG4gIH1cblxuICBnZXRQb3NpdGlvbkZyb21MYXRMb24gKGxhdCwgbG9uKSB7XG4gICAgY29uc3QgcmFkaXVzID0gdGhpcy5wcm9wcy5yYWRpdXNcbiAgICBjb25zdCBwaGkgPSAoOTAgLSBsYXQpICogKE1hdGguUEkgLyAxODApXG4gICAgY29uc3QgdGhldGEgPSAobG9uICsgMTgwKSAqIChNYXRoLlBJIC8gMTgwKVxuICAgIGNvbnN0IHggPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5jb3ModGhldGEpICogLTFcbiAgICBjb25zdCB6ID0gcmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguc2luKHRoZXRhKVxuICAgIGNvbnN0IHkgPSByYWRpdXMgKiBNYXRoLmNvcyhwaGkpXG5cbiAgICBjb25zdCBwb3MgPSB0aGlzLm9yaWdpbi5jbG9uZSgpXG4gICAgcG9zLnNldCh4LCB5LCB6KVxuICAgIHJldHVybiBwb3NcbiAgfVxuXG4gIGdldERpc3RhbmNlRnJvbUxhdExvbkluS20gKGxhdDEsIGxvbjEsIGxhdDIsIGxvbjIpIHtcbiAgICB2YXIgUiA9IDYzNzEgLy8gUmFkaXVzIG9mIHRoZSBlYXJ0aCBpbiBrbVxuICAgIHZhciBkTGF0ID0gdGhpcy5kZWcycmFkKGxhdDIgLSBsYXQxKSAvLyBkZWcycmFkIGJlbG93XG4gICAgdmFyIGRMb24gPSB0aGlzLmRlZzJyYWQobG9uMiAtIGxvbjEpXG4gICAgdmFyIGEgPSBNYXRoLnNpbihkTGF0IC8gMikgKiBNYXRoLnNpbihkTGF0IC8gMikgKyBNYXRoLmNvcyh0aGlzLmRlZzJyYWQobGF0MSkpICogTWF0aC5jb3ModGhpcy5kZWcycmFkKGxhdDIpKSAqIE1hdGguc2luKGRMb24gLyAyKSAqIE1hdGguc2luKGRMb24gLyAyKVxuXG4gICAgdmFyIGMgPSAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpXG4gICAgdmFyIGQgPSBSICogYyAvLyBEaXN0YW5jZSBpbiBrbVxuICAgIHJldHVybiBkXG4gIH1cblxuICBkZWcycmFkIChkZWcpIHtcbiAgICByZXR1cm4gZGVnICogKE1hdGguUEkgLyAxODApXG4gIH1cblxuICBnZXRDYW1lcmFBbmltYXRpb25UaW1lICgpIHtcbiAgICBjb25zdCB7IGluaXRSb3RhdGlvblBvaW50cywgaW5pdFJvdGF0aW9uQW5pbWF0aW9uRHVyYXRpb24gfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2VGcm9tTGF0TG9uSW5LbShcbiAgICAgIGluaXRSb3RhdGlvblBvaW50c1t0aGlzLm5leHRQb3NpdGlvbkluZGV4IC0gMV0ubGF0LFxuICAgICAgaW5pdFJvdGF0aW9uUG9pbnRzW3RoaXMubmV4dFBvc2l0aW9uSW5kZXggLSAxXS5sb24sXG4gICAgICBpbml0Um90YXRpb25Qb2ludHNbdGhpcy5uZXh0UG9zaXRpb25JbmRleF0ubGF0LFxuICAgICAgaW5pdFJvdGF0aW9uUG9pbnRzW3RoaXMubmV4dFBvc2l0aW9uSW5kZXhdLmxvblxuICAgIClcblxuICAgIHJldHVybiAoZGlzdGFuY2UgLyAxMDAwKSAqIGluaXRSb3RhdGlvbkFuaW1hdGlvbkR1cmF0aW9uXG4gIH1cblxuICBnZXRDYW1lcmFNb3ZlRGlzdGFuY2UgKGR0KSB7XG4gICAgZHQgLz0gKHRoaXMuY2FtZXJhQW5pbWF0aW9uVGltZSAvIDEwMDApIC8gMlxuICAgIGlmIChkdCA8IDEpIHJldHVybiAxIC8gMiAqIGR0ICogZHRcbiAgICBkdC0tXG4gICAgcmV0dXJuIC0xIC8gMiAqIChkdCAqIChkdCAtIDIpIC0gMSlcbiAgfVxuXG4gIGFuaW1hdGVDYW1lcmEgKGNhbWVyYSwgdCkge1xuICAgIGlmICghdGhpcy5tb3ZlQ2FtZXJhKSByZXR1cm5cbiAgICBpZiAoIXRoaXMubW92ZUNhbWVyYVRpbWUpIHRoaXMubW92ZUNhbWVyYVRpbWUgPSB0XG4gICAgaWYgKCF0aGlzLmNhbWVyYUZpbmFsUG9zaXRpb24pIHtcbiAgICAgIHRoaXMuY2FtZXJhQW5pbWF0aW9uVGltZSA9IHRoaXMuZ2V0Q2FtZXJhQW5pbWF0aW9uVGltZSgpXG4gICAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvc2l0aW9uRnJvbUxhdExvbih0aGlzLnByb3BzLmluaXRSb3RhdGlvblBvaW50c1t0aGlzLm5leHRQb3NpdGlvbkluZGV4XS5sYXQsIHRoaXMucHJvcHMuaW5pdFJvdGF0aW9uUG9pbnRzW3RoaXMubmV4dFBvc2l0aW9uSW5kZXhdLmxvbilcbiAgICAgIGNvbnN0IHJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIodGhpcy5vcmlnaW4sIHBvcy5ub3JtYWxpemUoKSlcbiAgICAgIGxldCBmaW5hbFBvcyA9IHRoaXMub3JpZ2luLmNsb25lKClcbiAgICAgIHJheWNhc3Rlci5yYXkuYXQodGhpcy5jYW1lcmFEaXN0YW5jZSwgZmluYWxQb3MpXG4gICAgICB0aGlzLmNhbWVyYUZpbmFsUG9zaXRpb24gPSBmaW5hbFBvc1xuICAgICAgdGhpcy5jYW1lcmFNb3ZlTGluZSA9IG5ldyBUSFJFRS5MaW5lMyhjYW1lcmEucG9zaXRpb24uY2xvbmUoKSwgdGhpcy5jYW1lcmFGaW5hbFBvc2l0aW9uLmNsb25lKCkpXG4gICAgfVxuXG4gICAgY29uc3QgZHQgPSAodCAtIHRoaXMubW92ZUNhbWVyYVRpbWUpIC8gMTAwMFxuICAgIGNvbnN0IG1vdmVEaXN0YW5jZSA9IHRoaXMuZ2V0Q2FtZXJhTW92ZURpc3RhbmNlKGR0KVxuICAgIGxldCBuZXdQb3MgPSB0aGlzLm9yaWdpbi5jbG9uZSgpXG4gICAgdGhpcy5jYW1lcmFNb3ZlTGluZS5hdChtb3ZlRGlzdGFuY2UsIG5ld1BvcylcbiAgICB0aGlzLmNhbWVyYVZlcnRpY2FsUmF5Y2FzdGVyLnNldCh0aGlzLm9yaWdpbiwgbmV3UG9zLmNsb25lKCkubm9ybWFsaXplKCkpXG4gICAgbGV0IGZpbmFsUG9zID0gdGhpcy5vcmlnaW4uY2xvbmUoKVxuICAgIHRoaXMuY2FtZXJhVmVydGljYWxSYXljYXN0ZXIucmF5LmF0KHRoaXMuY2FtZXJhRGlzdGFuY2UsIGZpbmFsUG9zKVxuICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoZmluYWxQb3MueCwgZmluYWxQb3MueSwgZmluYWxQb3MueilcbiAgICBpZiAoZHQgPj0gdGhpcy5jYW1lcmFBbmltYXRpb25UaW1lIC8gMTAwMCkge1xuICAgICAgdGhpcy5jYW1lcmFGaW5hbFBvc2l0aW9uID0gbnVsbFxuICAgICAgdGhpcy5jYW1lcmFNb3ZlTGluZSA9IG51bGxcbiAgICAgIHRoaXMubW92ZUNhbWVyYVRpbWUgPSBudWxsXG4gICAgICB0aGlzLm5leHRQb3NpdGlvbkluZGV4KytcbiAgICAgIHRoaXMuY2FtZXJhQW5pbWF0aW9uVGltZSA9IG51bGxcbiAgICAgIGlmICghdGhpcy5wcm9wcy5pbml0Um90YXRpb25Qb2ludHNbdGhpcy5uZXh0UG9zaXRpb25JbmRleF0pIHtcbiAgICAgICAgdGhpcy5tb3ZlQ2FtZXJhID0gZmFsc2VcbiAgICAgICAgdGhpcy5wcm9wcy5vblJvdGF0ZUVuZCgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYW5pbWF0ZSAoeyBzY2VuZSwgY2FtZXJhLCB0IH0pIHtcbiAgICBpZiAodGhpcy50ZXh0dXJlc1RvTG9hZCA+IDAgJiYgdGhpcy5vYmoucGFyZW50KSB0aGlzLm9iai5wYXJlbnQucmVtb3ZlKHRoaXMub2JqKVxuICAgIGlmICh0aGlzLnRleHR1cmVzVG9Mb2FkIDwgMSAmJiAhdGhpcy5vYmoucGFyZW50KSBzY2VuZS5hZGQodGhpcy5vYmopXG4gICAgdGhpcy5hbmltYXRlQ2FtZXJhKGNhbWVyYSwgdClcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcbiAgICB0aGlzLm9iai5wYXJlbnQgJiYgdGhpcy5vYmoucGFyZW50LnJlbW92ZSh0aGlzLm9iailcbiAgfVxuXG4gIGdldE9iaiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub2JqXG4gIH1cblxuICBnZXRJZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuaWRcbiAgfVxuXG4gIGdldFJhZGl1cyAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMucmFkaXVzXG4gIH1cblxuICByZW5kZXIgKCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiJdfQ==