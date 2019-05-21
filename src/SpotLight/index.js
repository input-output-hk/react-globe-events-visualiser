import { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

const AHEAD_ANGLE = Math.PI / 6
const MAX_HEIGHT = 4

export default class SpotLight extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    intensity: PropTypes.number,
    lightDistance: PropTypes.number,
    angle: PropTypes.number,
    penumbra: PropTypes.number,
    decay: PropTypes.number,
    color: PropTypes.number,
    distance: PropTypes.number
  }

  static defaultProps = {
    intensity: 1,
    lightDistance: 0,
    angle: Math.PI / 6,
    penumbra: 0,
    decay: 1,
    color: 0x404040,
    distance: 45
  }

  componentDidUpdate (prevProps) {
    const { props } = this
    const diffs = []
    Object.keys(props).forEach(key => {
      if (props[key] !== prevProps[key]) diffs.push(key)
    })

    diffs.forEach(key => {
      if (key === 'distance') return
      this.obj[key] = props[key]
    })
  }

  initialise () {
    const { color, intensity, lightDistance, angle, penumbra, decay, distance } = this.props
    this.obj = new THREE.SpotLight(color, intensity, lightDistance, angle, penumbra, decay)
    this.obj.position.x = 0
    this.obj.position.y = 0
    this.obj.position.z = distance
    this.raycaster = new THREE.Raycaster()
    this.origin = new THREE.Vector3()
    this.yAxis = new THREE.Vector3(0, 1, 0)
  }

  animate ({ camera }) {
    // Raycast to camera.x, 0, camera.z
    // ray.at distance
    // rotate 30 degrees
    let y = camera.position.y
    if (y > MAX_HEIGHT) y = MAX_HEIGHT
    if (y < -MAX_HEIGHT) y = -MAX_HEIGHT
    this.raycaster.set(this.origin, new THREE.Vector3(camera.position.x, y, camera.position.z).normalize())
    let castPos = new THREE.Vector3()
    this.raycaster.ray.at(this.props.distance, castPos)
    this.obj.position.copy(castPos)

    // Move light rotation ahead of camera by 30 degress
    this.obj.position.sub(this.origin)
    this.obj.position.applyAxisAngle(this.yAxis, AHEAD_ANGLE)
    this.obj.position.add(this.origin)
  }

  componentWillUnmount () {
    this.obj && this.obj.parent && this.obj.parent.remove(this.obj)
  }

  getObj () {
    return this.obj
  }

  getId () {
    return this.props.id
  }

  render () {
    return null
  }
}
