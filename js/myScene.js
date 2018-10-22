// The easiest way to add camera controls is with Orbit Control.
// In order for OrbitControls to work, you need to import it, check JS Settings
// Check OrbitControl for extra features/configuration.

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

// Orbit Controls >
var controls = new THREE.OrbitControls( camera );
// I prefer to swap the mouse controls, but most examples out there don't:
/*
controls.mouseButtons = {
    ORBIT: THREE.MOUSE.RIGHT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.LEFT
  };
  */
controls.enableDamping = true; // For that slippery Feeling
controls.dampingFactor = 0.12; // Needs to call update on render loop 
controls.rotateSpeed = 0.08; // Rotate speed
controls.autoRotate = false; // turn this guy to true for a spinning camera
controls.autoRotateSpeed = 0.08; // 30
controls.maxPolarAngle = Math.PI/2; // Don't let to go below the ground
// < Orbit Controls


// renderer/shadow settings Note I updated some syntax from previous examples
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; //Shadow
renderer.shadowMapSoft = true; // Shadow
renderer.shadowMap.type = THREE.PCFShadowMap; //Shadow
document.body.appendChild(renderer.domElement);

// Define Geometry
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ // Required For Shadows
  color: 0xecebec,
  specular: 0x000000,
  shininess: 100
});

//Cube
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 0.8;
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);
camera.position.x = 0;
camera.position.y = 1.8;
camera.position.z = 3;

// Floor
var floorGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xffebec,
  specular: 0x000000,
  shininess: 100
});

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
scene.add(floor);

// Wall
var wallGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
var wallMaterial = new THREE.MeshPhongMaterial({
  color: 0xffebec,
  specular: 0x000000,
  shininess: 100
});

var wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.rotation.z  = -0.5 * Math.PI;
wall.receiveShadow = true;
scene.add(wall);


// Lights
// Ambient light for general illumination
var ambientLight = new THREE.AmbientLight(0x090909);
scene.add(ambientLight);

// Spotlight for specific illumination
var spotLight = new THREE.SpotLight(0xAAAAAA);
spotLight.position.set(2, 3, 3);
spotLight.castShadow = true;
spotLight.shadow.bias = 0.0001;
spotLight.shadow.mapSize.width = 2048; // Shadow Quality
spotLight.shadow.mapSize.height = 2048; // Shadow Quality
scene.add(spotLight);

// AxisHelper
//The X axis is red. The Y axis is green. The Z axis is blue.
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Render Loop
function render() {
  requestAnimationFrame(render);
  // cube.rotation.x += 0.001; // spin cube
  // cube.rotation.y += 0.005; //spin cube
  controls.update();
  renderer.render(scene, camera);
}


window.addEventListener( 'resize', onWindowResize, false );
render();

// Functions :

function onWindowResize() {
	  camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
}
