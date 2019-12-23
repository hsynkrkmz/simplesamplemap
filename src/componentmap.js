import React, { Component,useRef } from 'react';
import * as THREE from "three";


class ComponentMap extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      zoom: 5
   
    };
     
  }
   componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
   
  }

  componentWillUnmount() {
  
    window.cancelAnimationFrame(this.requestID);
    
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = 400;
    const height =400;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.cube = new THREE.Mesh(geometry, material);
  //  this.scene.add(this.cube);

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
   
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.camera.position.z =this.state.zoom;
    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };


  
 zoomOut=()=>{
  this.setState({zoom:this.state.zoom+1})
 }

 zoomIn=()=>{
  this.setState({zoom:this.state.zoom-1})
 }

 addShape=(shape)=>{

  var map = new THREE.TextureLoader().load( shape );
  var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
  var sprite = new THREE.Sprite( material );
  sprite.scale.set(100,100,1);
  this.scene.add( sprite );


 }
 
  render() {
    return <div ref={ref => (this.el = ref)} >
     {this.state.zoom}
      <button onClick={this.zoomOut}>zoom out</button>
      <button onClick={this.zoomIn}>zoom in</button><br/>
      <input type="text" id="x"  /><br/>
      <button onClick={() => this.addShape(document.getElementById('x').value)}>add box</button><br/>
    </div>;
  }
}

export default ComponentMap;
