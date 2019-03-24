import React, { Component, Fragment } from 'react'
import * as THREE from 'three'
import axios from 'axios'
import { connect } from 'react-redux'
import { getScene } from '../../actions/artspace'
import PropTypes from 'prop-types'
import GenerateScene from './GenerateScene'


import FirstPersonControls from './FirstPersonControls'



class Scene extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//         space: [],
//         loaded: false,
//         artobjects: []
//     }

    // this.start = this.start.bind(this)
    // this.stop = this.stop.bind(this)
    // this.animate = this.animate.bind(this)
    // this.createPainting = this.createPainting.bind(this)
    // this.fetchArtObj = this.fetchArtObj.bind(this)
//   }

  // createPainting(imgUrl, pos, height, width){
  //   let texture = new THREE.TextureLoader().load(imgUrl)
  //   texture.wrapS = THREE.RepeatWrapping
  //   texture.wrapT = THREE.RepeatWrapping
  //   texture.repeat.set( 1, 1 );
  //   let geometry = new THREE.BoxGeometry(width, height, 0.1)
  //   let material = new THREE.MeshBasicMaterial({color: '#fff', map:texture})
  //   let cube = new THREE.Mesh(geometry, material)
  //   cube.position.x = pos
  //   this.scene.add(cube)
  // }

//   pushArray(a, e){
//     a.push(e)
//     return a
//   }

//   fetchArtObj(){
//     let margin = -1.6
//     this.state.space.artobjects.map(id =>
//       axios.get(`https://betredeapi.logachev.top/api/artobject/${id}/`)
//           .then(res => {
//             this.createPainting(res.data.upload, margin, res.data.height, res.data.width)
//             margin += 1 + res.data.width
//             this.setState({
//               loaded: true
//             })
//         })
//     )
//   }



  componentDidMount() {
    const spaceID = this.props.match.params.spaceID
    this.props.getScene(spaceID)

    // const width = this.mount.clientWidth
    // const height = this.mount.clientHeight

    // const scene = new THREE.Scene()
    // const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)
    // const renderer = new THREE.WebGLRenderer({ antialias: true })

    // let geometry = new THREE.BoxGeometry(20, 0.1, 20)
    // let material = new THREE.MeshBasicMaterial({color: '#fff'})
    // let floor = new THREE.Mesh(geometry, material)
    // floor.position.y = -2
    // scene.add(floor)

    // this.scene = scene
    // this.camera = camera
    // this.renderer = renderer

    // // let margin = -1.6
    // // this.state.artobjects.map(artobject => {
    // //   this.createPainting(artobject.upload, margin)
    // //   let margin = margin + 0.5
    // //   console.log(this.state)
    // // })
    // // this.createPainting(this.state.artobjects.upload, -0.6)
    // // this.createPainting('https://betredeapi.logachev.top/media/jru1z80UvCw.jpg', 0.6)

    // camera.position.z = 3
    // renderer.setClearColor('pink')
    // renderer.setSize(width, height)

    // // const controls = new OrbitControls(camera);
    // // controls.minPolarAngle = Math.PI / 2
    // // controls.maxPolarAngle = Math.PI / 2

    // const rig = new THREE.Object3D();
    // rig.add(camera);
    // scene.add(rig);

    // const controls = new FirstPersonControls(camera, scene, rig);
    // controls.strafing = true;
    // const clock = new THREE.Clock()

    // this.controls = controls
    // this.clock = clock

    // this.mount.appendChild(this.renderer.domElement)
    // this.start()
  }

  // componentWillUnmount() {
  //   this.stop()
  //   this.mount.removeChild(this.renderer.domElement)
  // }

  // start() {
  //   if (!this.frameId) {
  //     this.frameId = requestAnimationFrame(this.animate)
  //   }
  // }

  // stop() {
  //   cancelAnimationFrame(this.frameId)
  // }

  // animate() {
  //   // this.controls.update()
  //   this.controls.update(this.clock.getDelta());
  //   this.renderScene()
  //   this.frameId = window.requestAnimationFrame(this.animate)
  // }

  // renderScene() {

  //   this.renderer.render(this.scene, this.camera)
  // }

  // render() {
  //   return (
  //     <div
  //       className="scene"
  //       ref={(mount) => { this.mount = mount }}
  //     />
  //   )
  // }

render() {
    const { sceneIsLoading, space, artObjects } = this.props
    
    return (
      <Fragment>
        {
          sceneIsLoading 
          ?
          <h1>Loading...</h1>
          :
          <GenerateScene />
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
    space: state.artspace.space,
    artObjects: state.artspace.artObjects,
    sceneIsLoading: state.artspace.sceneIsLoading,
})

export default connect(mapStateToProps, { getScene })(Scene)
