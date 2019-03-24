import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as THREE from 'three'

import FirstPersonControls from './FirstPersonControls'


class GenerateScene extends Component {
    constructor(props){
        super(props)

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
        this.createPainting = this.createPainting.bind(this)
    }


    static propTypes = {
        space: PropTypes.object.isRequired,
        artObjects: PropTypes.array.isRequired
    }

    createPainting(imgUrl, pos, height, width){
        let texture = new THREE.TextureLoader().load(imgUrl)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set( 1, 1 );
        let geometry = new THREE.BoxGeometry(width, height, 0.1)
        let material = new THREE.MeshBasicMaterial({color: '#fff', map:texture})
        let cube = new THREE.Mesh(geometry, material)
        cube.position.x = pos
        this.scene.add(cube)
      }

    componentDidMount(){

    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    let geometry = new THREE.BoxGeometry(20, 0.1, 20)
    let material = new THREE.MeshBasicMaterial({color: '#fff'})
    let floor = new THREE.Mesh(geometry, material)
    floor.position.y = -2
    scene.add(floor)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    let margin = -1.6
    this.props.artObjects.map(artObject => {
      this.createPainting(artObject.upload, margin, 2, 2)
      margin = margin + 3
      console.log(artObject)
    })

    camera.position.z = 3
    renderer.setClearColor('pink')
    renderer.setSize(width, height)


    const rig = new THREE.Object3D();
    rig.add(camera);
    scene.add(rig);

    const controls = new FirstPersonControls(camera, scene, rig);
    controls.strafing = true;
    const clock = new THREE.Clock()

    this.controls = controls
    this.clock = clock

    this.mount.appendChild(this.renderer.domElement)
    this.start()
    }
    
    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
      }
    
      start() {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }
    
      stop() {
        cancelAnimationFrame(this.frameId)
      }
    
      animate() {
        // this.controls.update()
        this.controls.update(this.clock.getDelta());
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
      }
    
      renderScene() {
    
        this.renderer.render(this.scene, this.camera)
      }
    
      render() {
        return (
          <div
            className="scene"
            ref={(mount) => { this.mount = mount }}
          />
        )
      }
}

const mapStateToProps = state => ({
    space: state.artspace.space,
    artObjects: state.artspace.artObjects,
})

export default connect(mapStateToProps)(GenerateScene)
