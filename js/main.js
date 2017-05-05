var camera, scene, renderer;
var controls;
var element, container;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;

var width  = window.innerWidth;
var height = window.innerHeight;

init();

function init() {
    
    // Create scene
    scene = new THREE.Scene();

    // Create camera and position it 
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 1500);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 0;
    scene.add(camera);
    // camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Create render, append canvas to the DOM
    container = document.getElementById('sphere');
    renderer = new THREE.WebGLRenderer({ antialias: true, });
    renderer.setSize(width, height);
    element = renderer.domElement;
    container.appendChild(element);


     //CSS3D Scene
    scene2 = new THREE.Scene();
    
    
    //CSS3D Renderer
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild(renderer2.domElement);
        



    // Add Light
    var light = new THREE.AmbientLight( 0x4ffffff ); // soft white light
    scene.add( light );
    
    var pointLight = new THREE.PointLight( 0xffffff, 10,10 ); // soft white light
    pointLight.position.set(0,5,5);
    scene.add( pointLight );

    var loader = new THREE.TextureLoader();

    //add circle geometry as ground
    var surroundingGeometry = new THREE.CircleBufferGeometry(150,150,30);
    loader.load('images/snow-b.png', function(texture) {
        var surroundingMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        var surroundingBox = new THREE.Mesh( surroundingGeometry, surroundingMaterial );
        surroundingBox.position.y = -50
        surroundingBox.rotateX(toRadians(90));
        scene.add( surroundingBox );
    });

    //add sphere geometry as background
    var sphereGeometry = new THREE.SphereGeometry(170, 32, 30);
    loader.load('images/background.jpg', function(texture) {
        var sphereMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        var sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial );
        scene.add( sphereMesh );
    });

    //add circle geometry as a button images
    var buttonGeometry = new THREE.CircleGeometry( 16, 40 );
    loader.load('images/land-front.png', function(texture) {
        var buttonMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide } );
        var buttonPlane = new THREE.Mesh( buttonGeometry, buttonMaterial );
        buttonPlane.rotateX(toRadians(-90));
        buttonPlane.position.y += -49;
        buttonPlane.position.x += -79;
        buttonPlane.position.z += -25;
        buttonPlane.userData= { image: "land.jpg", type: "btnInfo", buttons: buttons.land };
        scene.add(buttonPlane); 

        //HTML
        element = document.createElement('div');
        element.innerHTML = 'LAND';
        element.className = 'land-div';

        //CSS Object
        div = new THREE.CSS3DObject(element);
        div.rotateX(toRadians(-90));
        div.position.y += -49;
        div.position.x += -79;
        div.position.z += -25;
        div.rotation.y = Math.PI;
        scene2.add(div);
    });

     loader.load('images/sea-front.png', function(texture) {
        var buttonMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide } );
        var buttonPlane = new THREE.Mesh( buttonGeometry, buttonMaterial );
        buttonPlane.rotateX(toRadians(-91));
        buttonPlane.position.x += -10;
        buttonPlane.position.y += -49;
        buttonPlane.position.z += 10;
        buttonPlane.userData= { image: "sea.jpg", type: "btnInfo", buttons: buttons.sea };
        scene.add(buttonPlane); 
        
              //HTML
        element = document.createElement('div');
        element.innerHTML = 'SEA';
        element.className = 'sea-div';

        //CSS Object
        div = new THREE.CSS3DObject(element);
        div.rotateX(toRadians(-90));
        div.position.y += -10;
        div.position.x += -49;
        div.position.z += -10;
        div.rotation.y = Math.PI;
        scene2.add(div);
    });

    loader.load('images/threats-front.png', function(texture) {
        var buttonMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide } );
        var buttonPlane = new THREE.Mesh( buttonGeometry, buttonMaterial );
        buttonPlane.rotateX(toRadians(-90));
        buttonPlane.position.y += -49;
        buttonPlane.position.x += 40;
        buttonPlane.position.z += 38;
        buttonPlane.userData= { image: "threats.jpg", type: "btnInfo", buttons: buttons.threats };
        scene.add(buttonPlane); 

                  //HTML
        element = document.createElement('div');
        element.innerHTML = 'THREATS';
        element.className = 'threats-div';

        //CSS Object
        div = new THREE.CSS3DObject(element);
        div.rotateX(toRadians(-90));
        div.position.y += -49;
        div.position.x += -40;
        div.position.z += -38;
        div.rotation.y = Math.PI;
        scene2.add(div);
    });

    loader.load('images/protective-front.png', function(texture) {
        var buttonMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide } );
        var buttonPlane = new THREE.Mesh( buttonGeometry, buttonMaterial );
        buttonPlane.rotateX(toRadians(-90));
        buttonPlane.position.y += -49;
        buttonPlane.position.x += 70;
        buttonPlane.position.z += -25;
        buttonPlane.userData= { image: "protected.jpg", type: "btnInfo", buttons: buttons.protected};
        scene.add(buttonPlane); 

                  //HTML
        element = document.createElement('div');
        element.innerHTML = 'PROTECTED';
        element.className = 'protected-div';

        //CSS Object
        div = new THREE.CSS3DObject(element);
        div.rotateX(toRadians(-90));
        div.position.y += -49;
        div.position.x += -70;
        div.position.z += -25;
        div.rotation.y = Math.PI;
        scene2.add(div);
    });


           
//     var bGeometry = new THREE.CircleGeometry( 9, 40 );
//     var bmaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
// var circle = new THREE.Mesh( bGeometry, bmaterial );
// circle.rotateX(toRadians(-88));
// circle.position.y += -49;
// scene.add( circle );
//  // console.log(buttonPlane.rotation.x);

    // controls for the surrounding
    controls = new THREE.OrbitControls(camera);
    controls.enablePan = true;
    controls.enableZoom = true; 
    controls.target.set( 0, 0, 0 );
      
    render();
    function render() {
        controls.update();
        // buttonPlane.rotation.x += 0.1;
        renderer.render(scene, camera);
        renderer2.render(scene2, camera);
        requestAnimationFrame(render);
    }
}//close func init

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function setFromCamera(raycaster, coords, origin){
    raycaster.ray.origin.copy( camera.position );
    raycaster.ray.direction.set( coords.x, coords.y, 0.5 ).unproject( camera ).sub( camera.position ).normalize();
}


var mouseMoved = false;
function onMouseDown(event){
    mouseMoved = false;
}

function onMouseMove(event){
    mouseMoved = true;
}

function onMouseUp(event){

    // TODO
    // Should we use raycasting now? If not, return.

    if ( mouseMoved ) {
        return;
    }

    mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    
    var intersects = raycaster.intersectObjects( scene.children );
    
    if ( intersects.length > 1 ) {

        var target = intersects[ 0 ].object;

        if ( target.userData.type != "btnInfo" ) {
            return;
        }

        if ( target.userData.url)  {
            // window.location = target.userData.url;
        }
        
        var options = target.userData;
        displayPano(options);
        // seaPanorama(options);

        // target.material.color.setHex( Math.random() * 0xffffff );
        target.scale.x +=  0.01;
        // target.scale.y = Math.random() + 0.5;
        // target.scale.z = Math.random() + 0.5;

    }
}//close mouseup

document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false); 


window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function onMouseWheel(event) {
    
    event.preventDefault();
    
    console.log(camera.fov);
    
    if (event.wheelDeltaY) { // WebKit
        camera.fov -= event.wheelDeltaY * 0.05;
    } 
    else if (event.wheelDelta) {  // Opera / IE9
        camera.fov -= event.wheelDelta * 0.05;
    } 
    else if (event.detail) { // Firefox
        camera.fov += event.detail * 1.0;
    }
    camera.fov = Math.max(40, Math.min(100, camera.fov));
    camera.updateProjectionMatrix();
}

document.addEventListener('mousewheel', onMouseWheel, false);
document.addEventListener('DOMMouseScroll', onMouseWheel, false);



// TODO MOVE!!!
document.querySelector('#info-window .close-button').addEventListener('click', function(e) {
    e.target.parentNode.classList.remove('visible');
});

document.querySelector('#info-window .more-info').addEventListener('onMouseWheel', function(e) {
    e.target.parentNode.classList.remove('visible');
});