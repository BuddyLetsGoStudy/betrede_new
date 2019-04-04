import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as THREE from 'three'

import FirstPersonControls from './FirstPersonControls'
// import FirstPersonControls from 'first-person-controls'

// import FirstPersonControls from '@fabienmotte/three-first-person-controls'


class GenerateScene extends Component {
    constructor(props){
        super(props)

        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
        this.createPainting = this.createPainting.bind(this)
        this.genWall = this.genWall.bind(this)
        this.managePaintingCreation = this.managePaintingCreation.bind(this)
    }


    static propTypes = {
        space: PropTypes.object.isRequired,
        artObjects: PropTypes.array.isRequired,
        artObjectsShadows: PropTypes.array.isRequired,
    }

    managePaintingCreation(wall_type, pos, height, width, imgUrl){
      let texture = new THREE.TextureLoader().load(imgUrl)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set( 1, 1 );
      let incr = 1.5
      let geometry = null
      if(wall_type === 1){
        geometry = new THREE.BoxGeometry(0.01, height * incr, width * incr)
      } else {
        geometry = new THREE.BoxGeometry(width * incr, height * incr, 0.01)
      }
      let material = new THREE.MeshBasicMaterial({color: '#fff', map:texture})
      let cube = new THREE.Mesh(geometry, material)
      cube.position.x = pos.x
      cube.position.y = pos.y
      cube.position.z = pos.z
      this.scene.add(cube)
    }

    createPainting(imgUrl, pos, height, width){
        let texture = new THREE.TextureLoader().load(imgUrl)
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set( 1, 1 );
        let geometry, material, cube, paint_pos = null
        let incr = 1.5
        switch(pos){
          case 1:
            paint_pos = {"x": 9.5, "y": 0, "z": -6}
            this.managePaintingCreation(1, paint_pos, height, width, imgUrl)
            break;
          case 2:
            paint_pos = {"x": 9.5, "y": 0, "z": 0}
            this.managePaintingCreation(1, paint_pos, height, width, imgUrl)
            break;
          case 3:
            paint_pos = {"x": 9.5, "y": 0, "z": 6}
            this.managePaintingCreation(1, paint_pos, height, width, imgUrl)
            break;
          case 4:
            paint_pos = {"x": 6, "y": 0, "z": 9.5}
            this.managePaintingCreation(2, paint_pos, height, width, imgUrl)
            break;
          case 5:
            paint_pos = {"x": 0, "y": 0, "z": 9.5}
            this.managePaintingCreation(2, paint_pos, height, width, imgUrl)
            break;
          case 6:
            paint_pos = {"x": -6, "y": 0, "z": 9.5}
            this.managePaintingCreation(2, paint_pos, height, width, imgUrl)
            break;
          case 7:
            paint_pos = {"x": -9.5, "y": 0, "z": 6}
            this.managePaintingCreation(1, paint_pos, height, width, imgUrl)
            break;
          case 8:
            paint_pos = {"x": -9.5, "y": 0, "z": 0}
            this.managePaintingCreation(1, paint_pos, height, width, imgUrl)
            break;
          case 9:
            paint_pos = {"x": -9.5, "y": 0, "z": -6}
            this.managePaintingCreation(1, paint_pos, height, width, imgUrl)
            break;
          case 10:
            paint_pos = {"x": -6, "y": 0, "z": -9.5}
            this.managePaintingCreation(2, paint_pos, height, width, imgUrl)
            break;
          case 11:
            paint_pos = {"x": 0, "y": 0, "z": -9.5}
            this.managePaintingCreation(2, paint_pos, height, width, imgUrl)
            break;
          case 12:
            paint_pos = {"x": 6, "y": 0, "z": -9.5}
            this.managePaintingCreation(2, paint_pos, height, width, imgUrl)
            break;
        }
      }

    genWall(boxGeom, meshPos){
      let geometry = new THREE.BoxGeometry(boxGeom[0], boxGeom[1], boxGeom[2]);
      let material = new THREE.MeshBasicMaterial( { color: '#aaa'} );
  
      let mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = meshPos[0];
      mesh.position.y = meshPos[1];
      mesh.position.z = meshPos[2];
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add( mesh );
    }

    componentDidMount(){
      const width = this.mount.clientWidth
      const height = this.mount.clientHeight

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
      const renderer = new THREE.WebGLRenderer({ antialias: true })

      let geometry = new THREE.BoxGeometry(20, 0.1, 20)
      let material = new THREE.MeshBasicMaterial({color: '#ccc'})
      let floor = new THREE.Mesh(geometry, material)
      floor.position.y = -2
      scene.add(floor)
      
      this.scene = scene
      this.camera = camera
      this.renderer = renderer

      camera.position.z = 3
      renderer.setClearColor('white')
      renderer.setSize(width, height)


      const rig = new THREE.Object3D();
      rig.add(camera);
      scene.add(rig);

      const controls = new FirstPersonControls(camera)
      controls.lookSpeed = 0.1
      controls.movementSpeed = 4
      controls.enabled = false
      
      const clock = new THREE.Clock(true)

      this.controls = controls
      this.clock = clock

      // GENERATORS
      this.genWall([1, 5, 20], [10, 0.5, 0])
      this.genWall([20, 5, 1], [0, 0.5, 10])
      this.genWall([1, 5, 20], [-10, 0.5, 0])
      this.genWall([20, 5, 1], [0, 0.5, -10])

      setTimeout(() => {
        this.props.artObjectsShadows.map(artObjectShadow => {
            const artObject = this.props.artObjects.find(artObject => artObject.id === artObjectShadow.artobject)
            console.log(artObjectShadow.position)
            this.createPainting(artObject.upload, artObjectShadow.position, artObject.height, artObject.width)
            this.controls.enabled = true
        })
      }, 1000)
      // 

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
    artObjectsShadows: state.artspace.artObjectsShadows
})

export default connect(mapStateToProps)(GenerateScene)
