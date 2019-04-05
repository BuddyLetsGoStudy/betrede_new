import * as THREE from 'three'

/**
 * FirstPersonControls class
 *
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */
class FirstPersonControls {
  /**
   * Constructor
   * @param  {object} object     Object
   * @param  {object} domElement Dom element
   */
  constructor( object, domElement = document ) {
    this.object = object
    this.target = new THREE.Vector3( 0, 0, 0 )

    this.domElement = domElement

    this.enabled = true

    this.movementSpeed = 2
    this.lookSpeed = 0.005

    this.lookVertical = true
    this.autoForward = false

    this.activeLook = true

    this.heightSpeed = false
    this.heightCoef = 1.0
    this.heightMin = 0.0
    this.heightMax = 0.0

    this.constrainVertical = true
    this.verticalMin = 0
    this.verticalMax = Math.PI

    this.autoSpeedFactor = 0.1

    this.mouseX = 0
    this.mouseY = 0

    this.lat = 0
    this.lon = 0
    this.phi = 0
    this.theta = 0

    this.moveForward = false
    this.moveBackward = false
    this.moveLeft = false
    this.moveRight = false

    this.mouseDragOn = true

    this.viewHalfX = 0
    this.viewHalfY = 0

    if ( this.domElement !== document ) {
      this.domElement.setAttribute( 'tabindex', - 1 )
    }

    this._contextMenu = this.contextMenu.bind(this)
    this._onMouseMove = this.onMouseMove.bind(this)
    this._onMouseDown = this.onMouseDown.bind(this)
    this._onMouseUp = this.onMouseUp.bind(this)
    this._onKeyDown = this.onKeyDown.bind(this)
    this._onKeyUp = this.onKeyUp.bind(this)
    this._handleResize = this.handleResize.bind(this)
    document.body.style.cursor = 'none'

    this.bindEvents()
  }

  /**
   * HandleResize function
   */
  handleResize() {
    if ( this.domElement === document ) {
      this.viewHalfX = window.innerWidth / 2
      this.viewHalfY = window.innerHeight / 2
    } else {
      this.viewHalfX = this.domElement.offsetWidth / 2
      this.viewHalfY = this.domElement.offsetHeight / 2
    }
  }

  /**
   * BindEvents function
   */
  bindEvents() {
    this.domElement.addEventListener( 'contextmenu', this._contextmenu, false )
    this.domElement.addEventListener( 'mousemove', this._onMouseMove, false )
    this.domElement.addEventListener( 'mousedown', this._onMouseDown, false )
    this.domElement.addEventListener( 'mouseup', this._onMouseUp, false )

    window.addEventListener( 'keydown', this._onKeyDown, false )
    window.addEventListener( 'keyup', this._onKeyUp, false )

    window.addEventListener( 'resize', this._handleResize, false );
  }

  /**
   * OnMouseDown function
   * @param  {object} event Event
   */
  onMouseDown( event ) {
    if ( this.domElement !== document ) {
      this.domElement.focus()
    }

    event.preventDefault()
    event.stopPropagation()

    if ( this.activeLook ) {
      switch ( event.button ) {
      case 0:
        this.moveForward = true
        break
      case 2:
        this.moveBackward = true
        break
      }
    }

    this.mouseDragOn = true
  }

  /**
   * OnMouseUp function
   * @param  {object} event Event
   */
  onMouseUp( event ) {
    event.preventDefault()
    event.stopPropagation()

    if ( this.activeLook ) {
      switch ( event.button ) {
      case 0:
        this.moveForward = false
        break
      case 2:
        this.moveBackward = false
        break
      }
    }

    this.mouseDragOn = false
  }

  /**
   * OnMouseMove function
   * @param  {object} event Event
   */
  onMouseMove ( event ) {
    if ( this.domElement === document ) {
      this.mouseX = event.pageX - this.viewHalfX
      this.mouseY = event.pageY - this.viewHalfY
    } else {
      this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX
      this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY
    }
  }

  /**
   * OnKeyDown function
   * @param  {object} event Event
   */
  onKeyDown( event ) {
    switch ( event.keyCode ) {

    case 38: /*up*/
    case 87: /*W*/
      this.moveForward = true
      break

    case 37: /*left*/
    case 65: /*A*/
      this.moveLeft = true
      break

    case 40: /*down*/
    case 83: /*S*/
      this.moveBackward = true
      break

    case 39: /*right*/
    case 68: /*D*/
      this.moveRight = true
      break

    case 82: /*R*/
      this.moveUp = true
      break
    case 70: /*F*/
      this.moveDown = true
      break
    }
  }

  /**
   * OnKeyUp function
   * @param  {object} event Event
   */
  onKeyUp( event ) {
    switch ( event.keyCode ) {

    case 38: /*up*/
    case 87: /*W*/
      this.moveForward = false
      break

    case 37: /*left*/
    case 65: /*A*/
      this.moveLeft = false
      break

    case 40: /*down*/
    case 83: /*S*/
      this.moveBackward = false
      break

    case 39: /*right*/
    case 68: /*D*/
      this.moveRight = false
      break

    case 82: /*R*/
      this.moveUp = false
      break

    case 70: /*F*/
      this.moveDown = false
      break
    }
  }

  /**
   * Update function
   * @param  {object} delta Delta
   */
  update( delta ) {
    this.handleResize()
    if ( this.enabled === false ) {
      return
    }

    if ( this.heightSpeed ) {
      let y = THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax )
      let heightDelta = y - this.heightMin

      this.autoSpeedFactor = delta * ( heightDelta * this.heightCoef )

    } else {
      this.autoSpeedFactor = 0.0
    }

    let actualMoveSpeed = delta * this.movementSpeed

    if ( this.moveForward || ( this.autoForward && ! this.moveBackward ) ) {
      this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) )
    }
    if ( this.moveBackward ) {
      this.object.translateZ( actualMoveSpeed )
    }

    if ( this.moveLeft ) {
      this.object.translateX( - actualMoveSpeed )
    }
    if ( this.moveRight ) {
      this.object.translateX( actualMoveSpeed )
    }

    if ( this.moveUp ) {
      this.object.translateY( actualMoveSpeed )
    }
    if ( this.moveDown ) {
      this.object.translateY( - actualMoveSpeed )
    }

    let actualLookSpeed = delta * this.lookSpeed

    if ( ! this.activeLook ) {
      actualLookSpeed = 0
    }

    let verticalLookRatio = 0

    if ( this.constrainVertical ) {
      verticalLookRatio = Math.PI / ( this.verticalMax - this.verticalMin )
    }

    this.lon += this.mouseX * actualLookSpeed
    if ( this.lookVertical ) {
      this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio
    }

    this.lat = Math.max( - 85, Math.min( 85, this.lat ) )
    this.phi = THREE.Math.degToRad( 90 - this.lat )

    this.theta = THREE.Math.degToRad( this.lon )

    if ( this.constrainVertical ) {
      this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax )
    }

    let targetPosition = this.target
    let position = this.object.position

    if(position.y <= 0){
      position.y = 0
    }

    if(position.y >= 0.1){
      position.y = 0.1
    }

    targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta )
    targetPosition.y = position.y + 100 * Math.cos( this.phi )
    targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta )

    this.object.lookAt( targetPosition )
  }

  /**
   * ContextMenu function
   * @param  {object} event Event
   */
  contextMenu( event ) {
    event.preventDefault()
  }

  /**
   * Dispose function
   */
  dispose() {
    this.domElement.removeEventListener( 'contextmenu', this._contextmenu, false )
    this.domElement.removeEventListener( 'mousedown', this._onMouseDown, false )
    this.domElement.removeEventListener( 'mousemove', this._onMouseMove, false )
    this.domElement.removeEventListener( 'mouseup', this._onMouseUp, false )

    window.removeEventListener( 'keydown', this._onKeyDown, false )
    window.removeEventListener( 'keyup', this._onKeyUp, false )
  }
}

export default FirstPersonControls






// import * as THREE from 'three';

// const ZAXIS = new THREE.Vector3(0, 0, 1);
// const YAXIS = new THREE.Vector3(0, 1, 0);

// export default class FirstPersonControls {
//   enabled = true;
//   verticalMovement = false;
//   strafing = false;
//   boost = true;
//   movementSpeed = 1.0;
//   snapAngle = 50 * Math.PI / 360;
//   boostFactor = 4;

//   _angleQuaternion = new THREE.Quaternion();

//   _moveForward = false;
//   _moveBackward = false;
//   _moveLeft = false;
//   _moveRight = false;
//   _moveUp = false;
//   _moveDown = false;
//   _boosting = false;

//   constructor (camera, scene, rig) {
//     this._camera = camera;
//     if (!rig) {
//       this.rig = new THREE.Object3D();
//       this.rig.add(camera);
//       scene.add(this.rig);
//     } else {
//       this.rig = rig;
//     }

//     window.addEventListener('keydown', this._onKeyDown, false);
//     window.addEventListener('keyup', this._onKeyUp, false);
//   }

//   _onKeyDown = (event) => {
//     if (event.repeat) { return; }

//     switch (event.key.toLowerCase()) {
//       case 'arrowup':
//       case 'w': this._moveForward = true; break;

//       case 'arrowleft':
//       case 'a': this._moveLeft = true; break;

//       case 'arrowdown':
//       case 's': this._moveBackward = true; break;

//       case 'arrowright':
//       case 'd': this._moveRight = true; break;

//       case 'r': this._moveUp = true; break;
//       case 'f': this._moveDown = true; break;

//       case 'shift': this._boosting = true; break;

//       case 'q': this.snap('left'); break;
//       case 'e': this.snap('right'); break;
//     }
//   };

//   _onKeyUp = (event) => {
//     switch (event.key.toLowerCase()) {
//       case 'arrowup':
//       case 'w': this._moveForward = false; break;

//       case 'arrowleft':
//       case 'a': this._moveLeft = false; break;

//       case 'arrowdown':
//       case 's': this._moveBackward = false; break;

//       case 'arrowright':
//       case 'd': this._moveRight = false; break;

//       case 'r': this._moveUp = false; break;
//       case 'f': this._moveDown = false; break;


//       case 'shift': this._boosting = false; break;
//     }
//   };

//   _angle = 0;
//   _tempMatrix = new THREE.Matrix4()
//   snap (direction) {
//     const deltaAngle = this.snapAngle * (direction === 'left' ? 1 : -1);
//     this._angle += deltaAngle;
//     this._angleQuaternion.setFromAxisAngle(YAXIS, this._angle);

//     this._tempMatrix.makeTranslation(this._camera.position.x, this._camera.position.y, this._camera.position.z);
//     this.rig.matrix.multiply(this._tempMatrix);

//     this._tempMatrix.makeRotationY(-deltaAngle);
//     this.rig.matrix.multiply(this._tempMatrix);

//     this._tempMatrix.makeRotationY(deltaAngle * 2);
//     this.rig.matrix.multiply(this._tempMatrix);

//     this._tempMatrix.makeTranslation(-this._camera.position.x, -this._camera.position.y, -this._camera.position.z);
//     this.rig.matrix.multiply(this._tempMatrix);

//     this.rig.matrix.decompose(this.rig.position, this.rig.quaternion, this.rig.scale);
//   }

//   _direction = new THREE.Vector3();
//   _collapseYComponent (quaternion) {
//     this._direction.set(0, 0, 1);
//     this._direction.applyQuaternion(quaternion);
//     this._direction.y = 0;
//     this._direction.normalize();
//     quaternion.setFromUnitVectors(ZAXIS, this._direction);
//   }

//   _tempObject = new THREE.Object3D();
//   update (delta) {
//     if (!this.enabled) return;

//     this._tempObject.position.set(0, 0, 0);
//     this._tempObject.quaternion.copy(this._camera.quaternion);
//     this._tempObject.quaternion.multiplyQuaternions(this._angleQuaternion, this._camera.quaternion);
//     this._collapseYComponent(this._tempObject.quaternion);

//     let actualMoveSpeed = delta * this.movementSpeed;
//     if (this.boost && this._boosting) actualMoveSpeed = actualMoveSpeed * this.boostFactor;

//     if (this._moveForward) this._tempObject.translateZ(- actualMoveSpeed);
//     if (this._moveBackward) this._tempObject.translateZ(actualMoveSpeed);

//     if (this.strafing && this._moveLeft) this._tempObject.translateX(- actualMoveSpeed);
//     if (this.strafing && this._moveRight) this._tempObject.translateX(actualMoveSpeed);

//     if (this.verticalMovement && this._moveUp) this._tempObject.translateY(actualMoveSpeed);
//     if (this.verticalMovement && this._moveDown) this._tempObject.translateY(- actualMoveSpeed);

//     this.rig.position.add(this._tempObject.position);
//   }

//   dispose () {
//     window.removeEventListener('keydown', this._onKeyDown, false);
//     window.removeEventListener('keyup', this._onKeyUp, false);
//   }
// }


