
const formWindow = document.getElementById('form-window');
const loadForm =()=> formWindow.classList.add('visible');


function displayPano (options) {
   
    document.getElementById("content").classList.add("visible");

    // Create scene
    scene = new THREE.Scene();

    // Create camera and position it 
    camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
    camera.position.x = 35;//30
    camera.position.y = -5; //-15
    camera.position.z = 35; //35
    
    scene.add(camera);
  

    // Create render, append canvas to the DOM
    container = document.getElementById('content');
    renderer = new THREE.WebGLRenderer({ antialias: true, });
    renderer.setSize(width, height);
    element = renderer.domElement;
    container.appendChild(element);


    //CSS3D Scene
    scene2 = new THREE.Scene();

    options.buttons.forEach(function(button) {

        //HTML
        const btnAnimalOuter = document.createElement('div'); //used to create image div
        btnAnimalOuter.classList.add('btn-animal-outer');
        btnAnimalOuter.classList.add(button.className);
        btnAnimalOuter.style.transform = button.transform;


        //create image and append to image div
        const btnAnimalInner = document.createElement("div");
        btnAnimalInner.classList.add('btn-animal-inner');
        btnAnimalInner.classList.add(button.animalClassName);
        btnAnimalInner.style.backgroundImage = 'url(' + button.backgroundImage + ')';
        btnAnimalInner.style.backgroundPosition = button.position;
        btnAnimalInner.setAttribute('data-content', button.title);


        btnAnimalInner.onclick = function() { 
            var infoWindow = document.getElementById('info-window');
            infoWindow.classList.add('visible');

            infoWindow.querySelector('.animal-image').style.backgroundImage = 'url(' + button.modalInfo.image + ')';
            infoWindow.querySelector('.animal-image').style.backgroundPosition = button.modalInfo.position;
            infoWindow.querySelector('.animal-icon').style.backgroundImage = 'url(' + button.modalInfo.icon + ')';
            infoWindow.querySelector('.animal-name').innerHTML= button.modalInfo.title;
            infoWindow.querySelector('.animal-description_1').innerHTML= button.modalInfo.description_1;
            infoWindow.querySelector('.animal-description_2').innerHTML= button.modalInfo.description_2;
            infoWindow.querySelector('.btn-name').innerHTML= button.modalInfo.button_name;


            formWindow.querySelector('.animal-image').style.backgroundImage = 'url(' + button.modalInfo.image + ')';
            formWindow.querySelector('.animal-image').style.backgroundPosition = button.modalInfo.position;
            formWindow.querySelector('.btn-name').innerHTML= button.modalInfo.button_name;
            formWindow.querySelector('.adopt-name').innerHTML= button.modalInfo.adopt_name;

        }; // close btnAnimalInner function
         
        btnAnimalOuter.appendChild(btnAnimalInner);

        //CSS Object for image
        div = new THREE.CSS3DObject(btnAnimalOuter);
        div.position.x = -4000;//-2000
        div.position.y = 9;
        div.position.z = -2800;
        div.rotation.y = Math.PI;
        scene2.add(div);

    }); // close for each function

    //CSS3D Renderer
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    container.appendChild(renderer2.domElement);

    // Add Light
    const light = new THREE.AmbientLight( 0x4ffffff ); // soft white light
    scene.add( light );
    const pointLight = new THREE.PointLight( 0xffffff, 10,10 ); // soft white light
    pointLight.position.set(0,5,5);
    scene.add( pointLight );

    // Add the surrounding with the sphere geometry
    const surroundingGeometry = new THREE.SphereGeometry(400,50,50);
    const loader = new THREE.TextureLoader();
    loader.load('images/' + options.image, function(texture) {
        let surroundingMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        let surroundingBox = new THREE.Mesh( surroundingGeometry, surroundingMaterial );
        scene.add( surroundingBox );
    });

    // controls for the surrounding
    controls = new THREE.OrbitControls(camera);
    controls.enablePan = true;
    controls.enableZoom = true; 
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 0.5;


    render();
   
    function render() {
        controls.update();
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        renderer2.render(scene2, camera);
    }
} // close display panorama function


window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
