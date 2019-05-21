import React, { Component, createRef, Fragment, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

const CLICK_THRESHOLD = 130

const MIN_DISTANCE = 35
const MAX_DISTANCE = 90

export default class Scene extends Component {
  static propTypes = {
    initZoomLevel: (props, propName, componentName) => {
      if (props[propName] < 0 || props[propName] > 1) return new Error(`Invalid value ${props[propName]} for ${propName} for ${componentName}. Value for ${propName} for component ${componentName} must be a floating point between 0 and 1 inclusive`)
    },
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.any,
    controlsEnabled: PropTypes.bool,
    enableZoom: PropTypes.bool.isRequired,
    controlsConfig: PropTypes.shape({
      minZoomSpeed: PropTypes.number,
      maxZoomSpeed: PropTypes.number,
      minRotateSpeed: PropTypes.number,
      maxRotateSpeed: PropTypes.number
    })
  }

  static defaultProps = {
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
  }

  constructor (props) {
    super(props)
    this.canvasRef = createRef()
    this.sceneRefs = []
    this.initialised = false
    this.refQueue = []
  }

  componentDidMount () {
    this._isMounted = true
    const { canvasRef } = this
    const width = canvasRef.current.clientWidth
    const height = canvasRef.current.clientHeight

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, powerPreference: 'high-performance', alpha: true })
    this.renderer.gammaFactor = 2.2
    this.renderer.gammaOutPut = true
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.initialiseOrbits()
    this.initialiseCamera()
    this.animate()
    this.initialised = true
    this.refQueue.map(this.addRef)
    this.refQueue = []
    this.setupClickListeners()
  }

  mouseClickListener = (e) => {
    if (!this._isMounted) return
    this.clickListener({ x: e.offsetX, y: e.offsetY, width: e.target.width, height: e.target.height })
  }

  touchStartListener = (e) => {
    if (!this._isMounted) return
    this.touchStartTime = Date.now()
  }

  touchEndListener = (e) => {
    if (!this.touchStartTime || !this._isMounted) return
    const dt = Date.now() - this.touchStartTime
    if (dt <= CLICK_THRESHOLD) {
      const touch = e.changedTouches.item(0)
      if (!touch) return
      e.preventDefault()
      const boundingRect = e.target.getBoundingClientRect()
      this.clickListener({ x: touch.clientX - boundingRect.x, y: touch.clientY - boundingRect.y, width: e.target.width, height: e.target.height })
    }
  }

  setupClickListeners () {
    this.clickableObjects = []
    this.renderer.domElement.addEventListener('click', this.mouseClickListener)

    // Orbit controls is preventing touch devices from using the `click` event
    this.renderer.domElement.addEventListener('touchstart', this.touchStartListener)
    this.renderer.domElement.addEventListener('touchend', this.touchEndListener)
  }

  tearDownClickListeners () {
    this.renderer.domElement.removeEventListener('click', this.mouseClickListener)
    this.renderer.domElement.removeEventListener('touchstart', this.touchStartListener)
    this.renderer.domElement.removeEventListener('touchend', this.touchEndListener)
  }

  getClickHandlerForObj (obj) {
    return (this.clickableObjects.filter(c => c.obj.uuid === obj.uuid).shift() || {}).handler
  }

  clickListener = ({ x, y, width, height }) => {
    if (!this.props.controlsEnabled) return
    const mouse = new THREE.Vector2(x, y)
    mouse.x = (x / width) * 2 - 1
    mouse.y = -(y / height) * 2 + 1
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, this.camera)
    const intersects = raycaster.intersectObjects(this.scene.children, true)
    // Only interested in the closest object, we don't want to click through objects
    if (intersects.length > 0) {
      const handler = this.getClickHandlerForObj(intersects[0].object)
      handler && handler()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this.tearDownClickListeners()
    cancelAnimationFrame(this.frameId)
  }

  componentDidUpdate (prevProps) {
    this.controls.enabled = this.props.controlsEnabled
    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      this.renderer.setSize(this.props.width, this.props.height)
      this.camera.aspect = this.props.width / this.props.height
      this.camera.updateProjectionMatrix()
    }
  }

  initialiseOrbits () {
    this.controls.enabled = this.props.controlsEnabled
    this.controls.enablePan = false
    this.controls.enableZoom = this.props.enableZoom
    this.controls.enableDamping = true
    this.controls.dampingFactor = 1.6
    this.controls.rotateSpeed = 1.0
    this.controls.zoomSpeed = 0.5
    this.controls.minDistance = MIN_DISTANCE
    this.controls.maxDistance = MAX_DISTANCE
    this.controls.maxPolarAngle = Math.PI - ((Math.PI / 180) * 5)
    this.controls.minPolarAngle = (Math.PI / 180) * 5
  }

  initialiseCamera () {
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = MIN_DISTANCE + ((MAX_DISTANCE - MIN_DISTANCE) * this.props.initZoomLevel)
  }

  updateControlSpeeds () {
    const { minZoomSpeed, maxZoomSpeed, minRotateSpeed, maxRotateSpeed } = this.props.controlsConfig
    const distance = this.camera.position.distanceTo(new THREE.Vector3())
    const multiplier = (distance - this.controls.minDistance) / (this.controls.maxDistance - this.controls.minDistance)
    const zoomSpeed = minZoomSpeed + (multiplier * (maxZoomSpeed - minZoomSpeed))
    const rotateSpeed = minRotateSpeed + (multiplier * (maxRotateSpeed - minRotateSpeed))
    this.controls.zoomSpeed = zoomSpeed
    this.controls.rotateSpeed = rotateSpeed
  }

  animate = () => {
    const now = Date.now()
    this.updateControlSpeeds()
    this.controls.update()
    this.frameId = window.requestAnimationFrame(this.animate)
    this.sceneRefs.forEach(ref => ref.animate && ref.animate({ scene: this.scene, sceneObjects: this.sceneRefs, camera: this.camera, t: now }))
    this.renderer.render(this.scene, this.camera)
  }

  addRef = (ref) => {
    if (!this.initialised) return this.refQueue.push(ref)
    if (!ref) return
    if (this.sceneRefs.filter(sceneRef => sceneRef === ref).length > 0) return
    this.sceneRefs.push(ref)
    ref.initialise && ref.initialise({ sceneObjects: this.sceneRefs, camera: this.camera, renderer: this.renderer })
    this.scene.add(ref.getObj())
  }

  removeRef = (ref) => {
    if (!this.initialised) return
    if (!ref) return
    if (this.sceneRefs.filter(sceneRef => sceneRef === ref).length > 0) return
    this.sceneRefs = this.sceneRefs.filter(sceneRef => sceneRef !== ref)
    ref.destroy && ref.destroy({ sceneObjects: this.sceneRefs, camera: this.camera })
    this.scene.remove(ref.getObj())
  }

  registerClickableObject = (obj, handler) => {
    if (!this.getClickHandlerForObj(obj)) {
      this.clickableObjects.push({ obj, handler })
    }
  }

  unregisterClickableObject = (obj, handler) => {
    this.clickableObjects = this.clickableObjects.filter(c => !(c.obj === obj && c.handler === handler))
  }

  getChildren () {
    return Children.map(this.props.children, child => {
      if (!child) return null
      return cloneElement(child, {
        ref: ref => this.addRef(ref),
        removeRef: ref => this.removeRef(ref),
        registerClickableObject: this.registerClickableObject,
        unregisterClickableObject: this.unregisterClickableObject
      })
    })
  }

  render () {
    const { width, height } = this.props
    return (
      <Fragment>
        <canvas width={width} height={height} ref={this.canvasRef} />
        {this.getChildren()}
      </Fragment>
    )
  }
}
