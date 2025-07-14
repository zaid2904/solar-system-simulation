/**
 * 3D Solar System Simulation using Three.js
 * Features: Realistic planetary orbits, speed controls, interactive camera, and more
 */

class SolarSystemSimulation {
    constructor() {
        // Core Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.clock = new THREE.Clock();
        
        // Animation state
        this.isAnimating = true;
        this.animationId = null;
        
        // Solar system objects
        this.sun = null;
        this.planets = [];
        this.starField = null;
        
        // Raycaster for mouse interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        // UI elements
        this.tooltip = document.getElementById('planet-tooltip');
        this.loadingScreen = document.getElementById('loading');
        
        // Planet data with realistic properties
        this.planetData = [
            {
                name: 'Mercury',
                size: 0.8,
                distance: 8,
                speed: 4.15,
                color: 0x8C7853,
                info: 'Closest planet to the Sun. Surface temperature: 427°C'
            },
            {
                name: 'Venus',
                size: 1.2,
                distance: 12,
                speed: 1.62,
                color: 0xFFA500,
                info: 'Hottest planet in our solar system. Thick toxic atmosphere.'
            },
            {
                name: 'Earth',
                size: 1.3,
                distance: 16,
                speed: 1.0,
                color: 0x6B93D6,
                info: 'Our home planet. 71% of surface covered by water.'
            },
            {
                name: 'Mars',
                size: 1.0,
                distance: 20,
                speed: 0.53,
                color: 0xCD5C5C,
                info: 'The Red Planet. Has the largest volcano in the solar system.'
            },
            {
                name: 'Jupiter',
                size: 3.2,
                distance: 28,
                speed: 0.084,
                color: 0xD8CA9D,
                info: 'Largest planet. Has over 80 moons including Europa and Io.'
            },
            {
                name: 'Saturn',
                size: 2.8,
                distance: 36,
                speed: 0.034,
                color: 0xFAD5A5,
                info: 'Famous for its prominent ring system. Less dense than water.'
            },
            {
                name: 'Uranus',
                size: 2.2,
                distance: 44,
                speed: 0.012,
                color: 0x4FD0E3,
                info: 'Tilted on its side. Coldest planetary atmosphere in solar system.'
            },
            {
                name: 'Neptune',
                size: 2.1,
                distance: 52,
                speed: 0.006,
                color: 0x4B70DD,
                info: 'Windiest planet. Winds can reach speeds of 2,100 km/h.'
            }
        ];
        
        this.init();
    }
    
    async init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createControls();
        this.createLighting();
        this.createStarField();
        this.createSun();
        this.createPlanets();
        this.setupEventListeners();
        this.setupUI();
        
        // Hide loading screen and start animation
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            this.animate();
        }, 1000);
    }
    
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);
    }
    
    createCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 30, 60);
    }
    
    createRenderer() {
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    createControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 200;
        this.controls.maxPolarAngle = Math.PI;
        
        // Enhanced mobile support
        this.controls.enablePan = true;
        this.controls.enableZoom = true;
        this.controls.enableRotate = true;
        
        // Touch sensitivity adjustments
        this.controls.rotateSpeed = 0.5;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        
        // Better touch handling
        this.controls.touches = {
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
        };
        
        // Auto-rotate for demo purposes (can be toggled)
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 0.5;
    }
    
    createLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);
        
        // Point light from the sun
        const sunLight = new THREE.PointLight(0xffffff, 2, 300);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        this.scene.add(sunLight);
    }
    
    createStarField() {
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            sizeAttenuation: false
        });
        
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        this.starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.starField);
    }
    
    createSun() {
        const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            emissive: 0xffaa00,
            emissiveIntensity: 0.3
        });
        
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.sun.userData = {
            name: 'Sun',
            info: 'The center of our solar system. Surface temperature: 5,778K'
        };
        this.scene.add(this.sun);
    }
    
    createPlanets() {
        this.planetData.forEach((data, index) => {
            const planet = this.createPlanet(data);
            this.planets.push(planet);
            this.scene.add(planet.group);
        });
    }
    
    createPlanet(data) {
        // Create planet group for orbit
        const planetGroup = new THREE.Group();
        
        // Create planet geometry and material
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: data.color,
            shininess: 30
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = data.distance;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Add planet data to userData
        mesh.userData = {
            name: data.name,
            info: data.info,
            originalDistance: data.distance
        };
        
        // Create orbit line
        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x444444,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const orbitLine = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbitLine.rotation.x = -Math.PI / 2;
        
        planetGroup.add(mesh);
        this.scene.add(orbitLine);
        
        return {
            group: planetGroup,
            mesh: mesh,
            orbitLine: orbitLine,
            angle: Math.random() * Math.PI * 2, // Random starting position
            speed: data.speed,
            originalSpeed: data.speed,
            distance: data.distance,
            name: data.name
        };
    }
    
    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Mouse interaction for planet tooltips
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.renderer.domElement.addEventListener('mouseleave', this.hideTooltip.bind(this));
        
        // Pause/Resume button
        const pauseBtn = document.getElementById('pause-resume');
        pauseBtn.addEventListener('click', this.toggleAnimation.bind(this));
        
        // Reset button
        const resetBtn = document.getElementById('reset');
        resetBtn.addEventListener('click', this.resetAnimation.bind(this));
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        
        // Panel toggle for mobile
        const panelToggle = document.getElementById('panel-toggle');
        panelToggle.addEventListener('click', this.togglePanel.bind(this));
        
        // Speed control sliders
        this.planetData.forEach((data, index) => {
            const slider = document.getElementById(`${data.name.toLowerCase()}-speed`);
            const speedValue = slider.nextElementSibling;
            
            slider.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                this.planets[index].speed = this.planets[index].originalSpeed * speed;
                speedValue.textContent = `${speed.toFixed(1)}x`;
            });
        });
    }
    
    setupUI() {
        // Initialize speed value displays
        this.planetData.forEach((data) => {
            const slider = document.getElementById(`${data.name.toLowerCase()}-speed`);
            const speedValue = slider.nextElementSibling;
            speedValue.textContent = `${slider.value}x`;
        });
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Check for intersections with planets and sun
        const objects = this.planets.map(p => p.mesh).concat([this.sun]);
        const intersects = this.raycaster.intersectObjects(objects);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            this.showTooltip(event.clientX, event.clientY, object.userData);
            document.body.style.cursor = 'pointer';
        } else {
            this.hideTooltip();
            document.body.style.cursor = 'default';
        }
    }
    
    showTooltip(x, y, userData) {
        const tooltip = this.tooltip;
        const title = document.getElementById('tooltip-title');
        const info = document.getElementById('tooltip-info');
        
        title.textContent = userData.name;
        info.textContent = userData.info;
        
        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;
        tooltip.classList.add('visible');
    }
    
    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }
    
    toggleAnimation() {
        const pauseBtn = document.getElementById('pause-resume');
        
        if (this.isAnimating) {
            this.isAnimating = false;
            pauseBtn.textContent = '▶️ Resume';
            pauseBtn.classList.add('paused');
        } else {
            this.isAnimating = true;
            pauseBtn.textContent = '⏸️ Pause';
            pauseBtn.classList.remove('paused');
        }
    }
    
    resetAnimation() {
        // Reset planet positions
        this.planets.forEach((planet, index) => {
            planet.angle = Math.random() * Math.PI * 2;
            planet.speed = planet.originalSpeed;
            
            // Reset UI sliders
            const slider = document.getElementById(`${planet.name.toLowerCase()}-speed`);
            const speedValue = slider.nextElementSibling;
            slider.value = 1;
            speedValue.textContent = '1.0x';
        });
        
        // Reset camera position
        this.camera.position.set(0, 30, 60);
        this.controls.reset();
    }
    
    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
        }
    }
    
    togglePanel() {
        const panel = document.getElementById('control-panel');
        const panelToggle = document.getElementById('panel-toggle');
        
        if (panel.classList.contains('collapsed')) {
            panel.classList.remove('collapsed');
            panel.classList.add('expanded');
            panelToggle.textContent = '⬇️';
        } else {
            panel.classList.remove('expanded');
            panel.classList.add('collapsed');
            panelToggle.textContent = '⬆️';
        }
    }
    
    updatePlanets() {
        if (!this.isAnimating) return;
        
        const deltaTime = this.clock.getDelta();
        
        this.planets.forEach((planet) => {
            // Update planet orbital position
            planet.angle += planet.speed * deltaTime;
            
            // Calculate new position
            const x = Math.cos(planet.angle) * planet.distance;
            const z = Math.sin(planet.angle) * planet.distance;
            
            planet.mesh.position.x = x;
            planet.mesh.position.z = z;
            
            // Rotate planet on its axis
            planet.mesh.rotation.y += deltaTime * 2;
        });
        
        // Rotate sun on its axis
        if (this.sun) {
            this.sun.rotation.y += deltaTime * 0.5;
        }
        
        // Subtle star field rotation
        if (this.starField) {
            this.starField.rotation.y += deltaTime * 0.01;
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        
        this.updatePlanets();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Clean up Three.js resources
        this.scene.traverse((object) => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        this.renderer.dispose();
    }
}

// Initialize the solar system simulation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js library not loaded!');
        document.getElementById('loading').innerHTML = `
            <div style="text-align: center; color: #ff6b6b;">
                <h2>Error Loading Three.js</h2>
                <p>Please check your internet connection and refresh the page.</p>
            </div>
        `;
        return;
    }
    
    // Initialize the simulation
    window.solarSystem = new SolarSystemSimulation();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.solarSystem) {
        window.solarSystem.destroy();
    }
});