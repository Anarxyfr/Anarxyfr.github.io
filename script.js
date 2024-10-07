const container = document.createElement('div');
document.body.appendChild(container);

const controlsDiv = document.createElement('div');
controlsDiv.id = 'controls';
controlsDiv.style.position = 'absolute';
controlsDiv.style.top = '10px';
controlsDiv.style.left = '10px';
controlsDiv.style.background = 'rgba(255, 255, 255, 0.8)';
controlsDiv.style.padding = '10px';
controlsDiv.style.borderRadius = '5px';
controlsDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
container.appendChild(controlsDiv);

controlsDiv.innerHTML = `
    <h2>Controls</h2>
    <h5>By @anarxyfr on discord</h5>
    <button onclick="changeShape('cube')">Cube</button>
    <button onclick="changeShape('sphere')">Sphere</button>
    <button onclick="changeShape('cone')">Cone</button>
    <button onclick="resetZoom()">Reset Zoom</button><br><br>
    <label><input type="checkbox" id="toggleEdges" onclick="toggleEdges()" checked> Toggle Edges</label><br>
    <label><input type="checkbox" id="toggleWireframe" onclick="toggleWireframe()"> Wireframe</label>
`;

const script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
script.onload = init;
document.head.appendChild(script);

function init() {
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    let currentShape = 'cube';
    let shapeMesh;
    let edges;
    let isWireframe = false;

    function createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0x0077ff, transparent: true, opacity: 0.8 });
        return new THREE.Mesh(geometry, material);
    }

    function createSphere() {
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x0077ff, transparent: true, opacity: 0.8 });
        return new THREE.Mesh(geometry, material);
    }

    function createCone() {
        const geometry = new THREE.ConeGeometry(0.5, 1, 32);
        const material = new THREE.MeshPhongMaterial({ color: 0x0077ff, transparent: true, opacity: 0.8 });
        return new THREE.Mesh(geometry, material);
    }

    window.changeShape = function(shape) {
        currentShape = shape;

        if (shapeMesh) {
            scene.remove(shapeMesh);
            if (edges) {
                scene.remove(edges);
            }
        }

        switch (currentShape) {
            case 'cube':
                shapeMesh = createCube();
                break;
            case 'sphere':
                shapeMesh = createSphere();
                break;
            case 'cone':
                shapeMesh = createCone();
                break;
        }

        const edgesGeometry = new THREE.EdgesGeometry(shapeMesh.geometry);
        const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
        shapeMesh.add(edges);

        scene.add(shapeMesh);

        const axesHelper = new THREE.AxesHelper(1);
        shapeMesh.add(axesHelper);
    };

    changeShape(currentShape);

    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
    const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = Math.PI / 2;
    scene.add(groundPlane);

    camera.position.z = 5;

    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    window.addEventListener('mousedown', (event) => {
        isDragging = true;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaX = event.clientX - previousMouseX;
            const deltaY = event.clientY - previousMouseY;

            shapeMesh.rotation.y += deltaX * 0.01;
            shapeMesh.rotation.x += deltaY * 0.01;

            previousMouseX = event.clientX;
            previousMouseY = event.clientY;
        }
    });

    let zoomSpeed = 0.001;
    let targetZoom = camera.position.z;
    const initialZoom = camera.position.z;

    window.addEventListener('wheel', (event) => {
        event.preventDefault();
        targetZoom += event.deltaY * zoomSpeed;

        targetZoom = Math.max(1, Math.min(20, targetZoom));
    });

    window.resetZoom = function() {
        targetZoom = initialZoom;
    };

    function animate() {
        requestAnimationFrame(animate);
        camera.position.z += (targetZoom - camera.position.z) * 0.1;
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    window.toggleEdges = function() {
        if (edges) {
            edges.visible = !edges.visible;
        }
    };

    window.toggleWireframe = function() {
        isWireframe = !isWireframe;
        shapeMesh.material.wireframe = isWireframe;
    };

    function resetRotation() {
        shapeMesh.rotation.set(0, 0, 0);
    }
}
