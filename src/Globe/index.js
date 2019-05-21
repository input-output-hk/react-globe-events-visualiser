import { Component } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

export default class Globe extends Component {
  static propTypes = {
    imagePath: PropTypes.string.isRequired,
    bumpPath: PropTypes.string,
    id: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    onTextured: PropTypes.func,
    onRotate: PropTypes.func.isRequired,
    onRotateEnd: PropTypes.func.isRequired,
    initRotationAnimationDuration: PropTypes.number,
    initRotationPoints: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired
    }))
  }

  static defaultProps = {
    // Per 1000km
    initRotationAnimationDuration: 200,
    initRotationPoints: []
  }

  initialise ({ camera }) {
    this.texturesToLoad = 1
    if (this.props.bumpPath) this.texturesToLoad++
    const geometry = new THREE.SphereBufferGeometry(this.props.radius, 64, 64)
    const material = this.getMaterial(this.props.imagePath, this.props.bumpPath, this.textureLoaded)
    this.obj = new THREE.Mesh(geometry, material)
    this.origin = new THREE.Vector3()
    if (this.props.initRotationPoints.length > 0) {
      this.cameraDistance = new THREE.Line3(this.origin, camera.position).distance()
      camera.position.copy(this.getPositionFromLatLon(this.props.initRotationPoints[0].lat, this.props.initRotationPoints[0].lon))
      const raycaster = new THREE.Raycaster(this.origin, camera.position.clone().normalize())
      let initPos = this.origin.clone()
      raycaster.ray.at(this.cameraDistance, initPos)
      camera.position.copy(initPos)
      this.nextPositionIndex = 1
      this.cameraVerticalRaycaster = new THREE.Raycaster()
    }
  }

  getMaterial (imagePath, bumpPath, textureLoadedCallback = () => {}) {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(imagePath, textureLoadedCallback)

    const material = new THREE.MeshStandardMaterial({ map: texture, transparent: true })
    material.roughness = 1
    if (bumpPath) {
      const bumpTextureLoader = new THREE.TextureLoader()
      const bumpTexture = bumpTextureLoader.load(bumpPath, textureLoadedCallback)
      material.bumpMap = bumpTexture
      material.bumpScale = 0.8
    }

    return material
  }

  async startInitRotation () {
    this.props.onRotate()
    await new Promise((resolve) => setTimeout(resolve, 3000))
    this.moveCamera = true
  }

  textureLoaded = () => {
    this.texturesToLoad--
    if (this.texturesToLoad < 1 && this.props.onTextured) {
      this.props.onTextured()
      if (this.props.initRotationPoints.length > 1) this.startInitRotation()
    }
  }

  componentDidUpdate (prevProps) {
    const { imagePath, bumpPath } = this.props
    let newImagePath, newBumpPath
    if (imagePath !== prevProps.imagePath) newImagePath = imagePath
    if (bumpPath !== prevProps.bumpPath) newBumpPath = bumpPath
    if (newImagePath || newBumpPath) {
      const material = this.getMaterial(newImagePath, newBumpPath)
      this.obj.material = material
      material.needsUpdate = true
    }
  }

  getPositionFromLatLon (lat, lon) {
    const radius = this.props.radius
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    const x = radius * Math.sin(phi) * Math.cos(theta) * -1
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)

    const pos = this.origin.clone()
    pos.set(x, y, z)
    return pos
  }

  getDistanceFromLatLonInKm (lat1, lon1, lat2, lon2) {
    var R = 6371 // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1) // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    return d
  }

  deg2rad (deg) {
    return deg * (Math.PI / 180)
  }

  getCameraAnimationTime () {
    const { initRotationPoints, initRotationAnimationDuration } = this.props
    const distance = this.getDistanceFromLatLonInKm(
      initRotationPoints[this.nextPositionIndex - 1].lat,
      initRotationPoints[this.nextPositionIndex - 1].lon,
      initRotationPoints[this.nextPositionIndex].lat,
      initRotationPoints[this.nextPositionIndex].lon
    )

    return (distance / 1000) * initRotationAnimationDuration
  }

  getCameraMoveDistance (dt) {
    dt /= (this.cameraAnimationTime / 1000) / 2
    if (dt < 1) return 1 / 2 * dt * dt
    dt--
    return -1 / 2 * (dt * (dt - 2) - 1)
  }

  animateCamera (camera, t) {
    if (!this.moveCamera) return
    if (!this.moveCameraTime) this.moveCameraTime = t
    if (!this.cameraFinalPosition) {
      this.cameraAnimationTime = this.getCameraAnimationTime()
      const pos = this.getPositionFromLatLon(this.props.initRotationPoints[this.nextPositionIndex].lat, this.props.initRotationPoints[this.nextPositionIndex].lon)
      const raycaster = new THREE.Raycaster(this.origin, pos.normalize())
      let finalPos = this.origin.clone()
      raycaster.ray.at(this.cameraDistance, finalPos)
      this.cameraFinalPosition = finalPos
      this.cameraMoveLine = new THREE.Line3(camera.position.clone(), this.cameraFinalPosition.clone())
    }

    const dt = (t - this.moveCameraTime) / 1000
    const moveDistance = this.getCameraMoveDistance(dt)
    let newPos = this.origin.clone()
    this.cameraMoveLine.at(moveDistance, newPos)
    this.cameraVerticalRaycaster.set(this.origin, newPos.clone().normalize())
    let finalPos = this.origin.clone()
    this.cameraVerticalRaycaster.ray.at(this.cameraDistance, finalPos)
    camera.position.set(finalPos.x, finalPos.y, finalPos.z)
    if (dt >= this.cameraAnimationTime / 1000) {
      this.cameraFinalPosition = null
      this.cameraMoveLine = null
      this.moveCameraTime = null
      this.nextPositionIndex++
      this.cameraAnimationTime = null
      if (!this.props.initRotationPoints[this.nextPositionIndex]) {
        this.moveCamera = false
        this.props.onRotateEnd()
      }
    }
  }

  animate ({ scene, camera, t }) {
    if (this.texturesToLoad > 0 && this.obj.parent) this.obj.parent.remove(this.obj)
    if (this.texturesToLoad < 1 && !this.obj.parent) scene.add(this.obj)
    this.animateCamera(camera, t)
  }

  componentWillUnmount () {
    this.obj.parent && this.obj.parent.remove(this.obj)
  }

  getObj () {
    return this.obj
  }

  getId () {
    return this.props.id
  }

  getRadius () {
    return this.props.radius
  }

  render () {
    return null
  }
}
