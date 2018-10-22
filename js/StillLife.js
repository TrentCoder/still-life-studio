var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// NOTE: antialias causes slowdown. 
var renderer = new THREE.WebGLRenderer( {antialias : true});

var controls = new THREE.OrbitControls( camera );
controls.enableDamping = true; // For that slippery Feeling
controls.dampingFactor = 0.12; // Needs to call update on render loop 
controls.rotateSpeed = 0.08; // Rotate speed
controls.autoRotate = false; // turn this guy to true for a spinning camera
controls.autoRotateSpeed = 0.08; // 30
controls.maxPolarAngle = Math.PI/2; // Don't let to go below the ground

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; //Shadow
renderer.shadowMapSoft = true; // Shadow
renderer.shadowMap.type = THREE.PCFShadowMap; //Shadow
document.body.appendChild(renderer.domElement);

// Camera
camera.position.x = 0;
camera.position.y = 1.8;
camera.position.z = 3;

// Floor
var floorGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
var floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xdddddd,
  specular: 0x000000,
  shininess: 100
});

// TODO: Add texture floor

var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
scene.add(floor);

// Light
var spotLight = new THREE.SpotLight(0xAAAAAA);
spotLight.position.set(0, 100, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = 0.0001;
spotLight.shadow.mapSize.width = 2048; // Shadow Quality
spotLight.shadow.mapSize.height = 2048; // Shadow Quality
scene.add(spotLight);

//var ambientLight = new THREE.AmbientLight(0x090909);
//scene.add(ambientLight);

// AxisHelper
//The X axis is red. The Y axis is green. The Z axis is blue.
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );


function drawACylinder(x,y,z) {
    var cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32);
    var cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.position.set(x,y,z);
    scene.add( cylinder );

    var geometry = new THREE.CylinderBufferGeometry( 1,1,1 );
    var edges = new THREE.EdgesGeometry( cylinderGeometry );
    var line = new THREE.LineSegments( 
            edges, 
            new THREE.LineBasicMaterial( { 
                color: 0x000000,} ) 
    );
    line.position.set(x,y,z);
    scene.add( line );
}


function drawASphere(x, y, z) {
    var sphereGeometry = new THREE.SphereGeometry( 1, 32 , 32);
    var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.set(x,y,z);
    scene.add( sphere );

    var geometry = new THREE.SphereBufferGeometry( 1,1,1 );
    var edges = new THREE.EdgesGeometry( sphereGeometry );
    var line = new THREE.LineSegments( 
            edges, 
            new THREE.LineBasicMaterial( { 
                color: 0x000000,} ) 
    );
    line.position.set(x,y,z);
    scene.add( line );

}

function drawATorus(x, y, z) {
    var torusGeometry = new THREE.TorusGeometry( 1, 0.3, 16, 100 );
    torusGeometry.rotateX(Math.PI / 2);
    var torusMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var torus = new THREE.Mesh( torusGeometry, torusMaterial );
    torus.position.set(x,y,z);
    scene.add( torus );

    var geometry = new THREE.SphereBufferGeometry( 1,1,1 );
    var edges = new THREE.EdgesGeometry( torusGeometry );
    var line = new THREE.LineSegments( 
            edges, 
            new THREE.LineBasicMaterial( { 
                color: 0x000000,} ) 
    );
    line.position.set(x,y,z);
    scene.add( line );

}


function drawABox(x, y, z) {
    var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );


    var boxMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var box = new THREE.Mesh( boxGeometry, boxMaterial );
    box.position.set(x,y,z);
    scene.add( box );

    var geometry = new THREE.BoxBufferGeometry( 1,1,1 );
    var edges = new THREE.EdgesGeometry( geometry );
    var line = new THREE.LineSegments( 
            edges, 
            new THREE.LineBasicMaterial( { 
                color: 0x000000,} ) 
    );
    line.position.set(x,y,z);
    scene.add( line );

}

function drawAModel() {
    var loader = new THREE.JSONLoader();
    loader.load('./marmelab-logo.json', function(geometry) {
        mesh = new THREE.Mesh(geometry);
        mesh.position.set(x,y,z);
        scene.add(mesh);
    });
}

drawACylinder(-2,0.5, 2)
drawABox(0,0.5,0);
drawABox(2,0.5,0);
drawABox(2,0.5,-4);
drawASphere(-2,0.5,0);
drawATorus(2,0.5,3)


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

