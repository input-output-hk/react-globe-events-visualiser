import { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'
import droidSans from 'three/examples/fonts/droid/droid_sans_regular.typeface.json'

const PULSE_SCALE = 0.15
const PULSE_RIPPLE_SCALE = 6
const PULSE_DURATION = 2600
const PULSE_COUNT = 3
const PULSE_INTERVAL = 400
const PULSE_OPACITY = 1

const HEIGHT_SCALE = 4
const LOCAL_ROTATION_AXIS = new THREE.Vector3(1, 0, 0)
const LOCAL_ROTATION_ANGLE = Math.PI / 2

const LAYER_HEIGHT = 0.02

const CAMERA_ANIMATION_DURATION = 1000

export default class GlobeMarker extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    globe: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    dropDistance: PropTypes.number.isRequired,
    zIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    registerClickableObject: PropTypes.func,
    locationName: PropTypes.string.isRequired,
    eventCount: PropTypes.number.isRequired,
    fontColor: PropTypes.number,
    fontHighlightColor: PropTypes.number,
    markerColor: PropTypes.number,
    markerHighlightColor: PropTypes.number,
    fontSize: PropTypes.number
  }

  static defaultProps = {
    fontColor: 0x000000,
    fontHighlightColor: 0x000000,
    markerColor: 0x000000,
    markerHighlightColor: 0x000000,
    fontSize: 0.3
  }

  getPositionFromLatLon (lat, lon) {
    const radius = this.globe.getRadius()
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const x = radius * Math.sin(phi) * Math.cos(theta) * -1
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)

    const pos = this.origin.clone()
    pos.set(x, y, z)
    return pos
  }

  getFinalPosition () {
    const { lat, lon } = this.props
    const pos = this.getPositionFromLatLon(lat, lon)

    this.positionRaycaster.set(this.origin, pos.normalize())
    let finalPosition = this.origin.clone()
    this.positionRaycaster.ray.at(this.globe.getRadius() + this.props.radius * HEIGHT_SCALE / 2 + (this.props.zIndex * LAYER_HEIGHT), finalPosition)
    return finalPosition
  }

  getPulseRingGeometry (radius) {
    return new THREE.RingBufferGeometry(radius, radius + (radius * PULSE_SCALE), 24, 1)
  }

  setupPulseRing () {
    this.pulseRingGeometry = this.getPulseRingGeometry(this.props.radius)
    const pulseRingMaterial = new THREE.MeshBasicMaterial({ color: this.markerColor, transparent: true })
    pulseRingMaterial.color.convertSRGBToLinear()
    pulseRingMaterial.opacity = PULSE_OPACITY
    pulseRingMaterial.side = THREE.BackSide
    this.pulseRing = new THREE.Mesh(this.pulseRingGeometry, pulseRingMaterial)
  }

  initialise ({ sceneObjects, camera }) {
    this.camera = camera
    this.pulse = false
    this.pulseRings = []
    this.globe = sceneObjects.filter(obj => obj.getId() === this.props.globe).shift()
    if (!this.globe) throw new Error(`Globe ${this.props.globe} does not exist within the scene`)

    this.distance = this.globe.getRadius() + this.props.dropDistance + (this.props.radius * HEIGHT_SCALE / 2)
    this.positionRaycaster = new THREE.Raycaster()
    this.origin = new THREE.Vector3()
    this.finalPosition = this.getFinalPosition()
    const pointGeometry = new THREE.ConeBufferGeometry(this.props.radius, this.props.radius * HEIGHT_SCALE, 16, 1)
    const material = new THREE.MeshBasicMaterial({ color: this.markerColor })
    this.obj = new THREE.Mesh(pointGeometry, material)

    const position = this.getPosition(this.distance)
    this.obj.position.copy(position)
    this.obj.lookAt(this.origin)
    this.obj.rotateOnAxis(LOCAL_ROTATION_AXIS, LOCAL_ROTATION_ANGLE)

    this.setupPulseRing()
  }

  clickComplete = () => {
    this.resetMarkerColor()
  }

  resetMarkerColor () {
    this.highlighted = false
    this.obj.material.color = this.markerColor
    this.pulseRing.material.color = this.markerColor
    this.fontMesh && (this.fontMesh.material.color = this.fontColor)
  }

  highlightMarker () {
    this.highlighted = true
    this.obj.material.color = this.markerHighlightColor
    this.pulseRing.material.color = this.markerHighlightColor
    this.fontMesh && (this.fontMesh.material.color = this.fontHighlightColor)
  }

  onClick = () => {
    this.highlightMarker()
    this.cameraDistance = this.origin.distanceTo(this.camera.position)
    this.cameraEndPosition = this.getPosition(this.cameraDistance)
    this.cameraMoveLine = new THREE.Line3(this.camera.position.clone(), this.cameraEndPosition.clone())
    this.moveCamera = true
    this.cameraMoved = 0
    this.cameraVerticalRaycaster = new THREE.Raycaster()
    const distanceToEnd = this.cameraMoveLine.distance()
    let animationTime = CAMERA_ANIMATION_DURATION
    if (distanceToEnd < 10) animationTime /= 2
    if (distanceToEnd < 1) animationTime = 0
    this.props.onClick(animationTime, this.clickComplete)
  }

  getCameraMoveDistance (dt) {
    dt /= (CAMERA_ANIMATION_DURATION / 1000) / 2
    if (dt < 1) return 1 / 2 * dt * dt
    dt--
    return -1 / 2 * (dt * (dt - 2) - 1)
  }

  animateCamera (t) {
    if (!this.moveCameraTime) this.moveCameraTime = t

    const dt = (t - this.moveCameraTime) / 1000
    this.cameraMoved = this.getCameraMoveDistance(dt)
    let newPos = this.origin.clone()
    this.cameraMoveLine.at(this.cameraMoved, newPos)
    this.cameraVerticalRaycaster.set(this.origin, newPos.clone().normalize())
    let finalPos = this.origin.clone()
    this.cameraVerticalRaycaster.ray.at(this.cameraDistance, finalPos)
    this.camera.position.set(finalPos.x, finalPos.y, finalPos.z)
    this.cameraMoveDistance = this.camera.position.distanceTo(this.cameraEndPosition)
    if (dt >= CAMERA_ANIMATION_DURATION / 1000) {
      this.moveCamera = false
      this.moveCameraTime = null
    }
  }

  setupClickListener () {
    if (this.clickListenerSetup) return
    if (!this.props.onClick) return
    const size = this.props.radius * PULSE_RIPPLE_SCALE
    const clickableGeometry = new THREE.BoxBufferGeometry(size, size, size)
    this.clickableMesh = new THREE.Mesh(clickableGeometry)
    this.clickableMesh.position.copy(this.obj.position)
    this.clickableMesh.lookAt(this.origin)
    this.clickableMesh.material.visible = false
    this.obj.parent.add(this.clickableMesh)
    this.props.registerClickableObject(this.clickableMesh, this.onClick)
    this.clickListenerSetup = true
  }

  setupText () {
    const { locationName, eventCount, lat, lon } = this.props
    const font = new THREE.Font(droidSans)
    const fontGeometry = new THREE.TextBufferGeometry(eventCount > 1 ? `${locationName} (${eventCount})` : locationName, {
      font,
      size: this.props.fontSize,
      height: 0.04
    })
    const center = this.origin.clone()
    const material = new THREE.MeshBasicMaterial({ color: this.fontColor })
    this.fontMesh = new THREE.Mesh(fontGeometry, material)
    this.fontMesh.geometry.computeBoundingBox()
    this.fontMesh.geometry.boundingBox.getCenter(center)
    this.fontMesh.geometry.center()
    this.fontMesh.position.copy(center)
    this.obj.parent.add(this.fontMesh)
    let fontLat = lat + 1
    if (lat > 60) fontLat = lat - 1
    const position = this.getPositionFromLatLon(fontLat, lon)
    const raycaster = new THREE.Raycaster(this.origin.clone(), position.clone().normalize())
    let pos = this.origin.clone()
    raycaster.ray.at(this.globe.getRadius() + (this.props.radius * HEIGHT_SCALE), pos)
    this.fontMesh.position.copy(pos)
    this.fontMesh.lookAt(this.origin)
    this.fontAdded = true
    this.fontMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI)
  }

  getObj () {
    return this.obj
  }

  getId () {
    return this.props.id
  }

  getPosition (distance) {
    let pos = this.origin.clone()
    this.positionRaycaster.ray.at(distance, pos)
    return pos
  }

  async createPulseRing (delay) {
    if (delay) await new Promise((resolve) => setTimeout(() => resolve(), delay))
    if (!this._isMounted) return
    const pulseRing = this.pulseRing.clone()
    this.obj.parent.add(pulseRing)
    pulseRing.position.copy(this.obj.position)
    pulseRing.lookAt(this.origin)
    pulseRing.parameters = { startTime: null }
    this.pulseRings.push(pulseRing)
  }

  getNewPulseRadius (dt, index) {
    const { radius } = this.props
    const duration = PULSE_DURATION / 1000
    let ratio = -1 * ((dt = dt / duration - 1) * dt * dt * dt - 1)
    const maxRadius = (radius * PULSE_RIPPLE_SCALE) - (index * (radius * PULSE_SCALE * 4))
    return ((maxRadius - radius) * ratio) + radius
  }

  getNewPulseOpacity (dt) {
    const duration = PULSE_DURATION / 1000
    let ratio = -1 * ((dt = dt / duration - 1) * dt * dt * dt - 1)
    if (ratio > 1) ratio = 1
    return PULSE_OPACITY * (1 - ratio)
  }

  animatePulse (t) {
    if (this.pulseRings.length < 1) return
    this.pulseRings.forEach((pulseRing, index) => {
      if (!pulseRing.parameters.startTime) pulseRing.parameters.startTime = t
      const dt = t - pulseRing.parameters.startTime
      const newRadius = this.getNewPulseRadius(dt / 1000, index)
      const newOpacity = this.getNewPulseOpacity(dt / 1000)
      const geometry = this.getPulseRingGeometry(newRadius)
      if (this.pulseRingGeometry !== pulseRing.geometry) pulseRing.geometry.dispose()
      pulseRing.geometry = geometry
      pulseRing.material.opacity = newOpacity
      if (dt >= PULSE_DURATION) {
        this.obj.parent.remove(pulseRing)
        this.pulseRings.splice(index, 1)
      }
    })
  }

  animateDrop (t) {
    if (!this.dropStartTime) this.dropStartTime = t
    this.distance -= 0.5 * 0.08 * Math.pow((t - this.dropStartTime) / 1000, 2)
    const newPosition = this.getPosition(this.distance)
    const tipPosition = this.getPosition(this.distance - (this.props.radius * HEIGHT_SCALE / 2 + (this.props.zIndex * LAYER_HEIGHT)))
    this.obj.position.copy(newPosition)
    if (this.globe.getObj().geometry.boundingSphere.containsPoint(tipPosition)) {
      this.distance = this.globe.getRadius()
      this.dropped = true
      this.pulse = true
      this.obj.position.copy(this.finalPosition)
      delete this.dropStartTime
    }
  }

  animatePulseRings (t) {
    if (this.pulseRings.length < 1 && this.pulse) {
      for (let i = 0; i < PULSE_COUNT; i++) {
        this.createPulseRing(i * PULSE_INTERVAL)
      }
    } else {
      this.animatePulse(t)
    }
  }

  animate ({ t }) {
    if (!this.fontAdded) this.setupText()
    if (!this.dropped) this.animateDrop(t)
    if (this.dropped) {
      this.setupClickListener()
      this.animatePulseRings(t)
    }
    if (this.moveCamera) this.animateCamera(t)
  }

  componentDidMount () {
    this._isMounted = true
    this.markerColor = new THREE.Color(this.props.markerColor)
    this.markerHighlightColor = new THREE.Color(this.props.markerHighlightColor)
    this.fontColor = new THREE.Color(this.props.fontColor)
    this.fontHighlightColor = new THREE.Color(this.props.fontHighlightColor)
  }

  componentDidUpdate (prevProps) {
    const { markerColor, markerHighlightColor, fontColor, fontHighlightColor } = this.props
    if (prevProps.markerColor !== markerColor) {
      this.markerColor.set(markerColor)
      if (!this.highlighted) this.resetMarkerColor()
    }
    if (prevProps.markerHighlightColor !== markerHighlightColor) {
      this.markerHighlightColor.set(markerHighlightColor)
      if (this.highlighted) this.highlightMarker()
    }
    if (prevProps.fontColor !== fontColor) {
      this.fontColor.set(fontColor)
      if (!this.highlighted) this.resetMarkerColor()
    }
    if (prevProps.fontHighlightColor !== fontHighlightColor) {
      this.fontHighlightColor.set(fontHighlightColor)
      if (this.highlighted) this.highlightMarker()
    }
  }

  componentWillUnmount () {
    this._isMounted = false
    this.clickableMesh && this.clickableMesh.parent && this.clickableMesh.parent.remove(this.clickableMesh)
    this.fontMesh && this.fontMesh.parent && this.fontMesh.parent.remove(this.fontMesh)
    this.pulseRings.forEach((pulseRing) => {
      this.obj.parent.remove(pulseRing)
    })
    this.obj && this.obj.parent && this.obj.parent.remove(this.obj)
  }

  render () {
    return null
  }
}
