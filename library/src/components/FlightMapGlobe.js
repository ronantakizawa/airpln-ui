export class FlightMapGlobe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    min-height: 500px;
                }
                #metrics-container {
                    position: absolute;
                    top: 100px;
                    right: 20px;
                    color: white;
                    background: rgba(0, 0, 0, 0.6);
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 300px;
                    backdrop-filter: blur(5px);
                    display: none;
                }
                .metric-group {
                    margin-bottom: 15px;
                }
                .metric-group h3 {
                    margin: 0 0 8px 0;
                    font-size: 14px;
                    color: #88ccff;
                }
                .metric-item {
                    margin: 5px 0;
                    font-size: 13px;
                }
                #input-container {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 1000;
                    display: flex;
                    gap: 10px;
                }
                .location-input {
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    width: 200px;
                }
                #add-flight-btn {
                    padding: 8px 16px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                #add-flight-btn:hover {
                    background: #45a049;
                }
                #error-message {
                    position: absolute;
                    top: 60px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: red;
                    background: rgba(255, 255, 255, 0.9);
                    padding: 5px 10px;
                    border-radius: 4px;
                    display: none;
                }
                #globeViz {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div id="input-container">
                <input type="text" id="from-input" class="location-input" placeholder="From (e.g., 'New York')">
                <input type="text" id="to-input" class="location-input" placeholder="To (e.g., 'London')">
                <button id="add-flight-btn">Add Flight Path</button>
            </div>
            <div id="error-message"></div>
            <div id="globeViz"></div>
            <div id="metrics-container">
                <div class="metric-group">
                    <h3>Flight Information</h3>
                    <div id="flight-duration" class="metric-item"></div>
                    <div id="flight-distance" class="metric-item"></div>
                    <div id="time-difference" class="metric-item"></div>
                </div>
                <div class="metric-group">
                    <h3>Environmental Impact</h3>
                    <div id="co2-emissions" class="metric-item"></div>
                    <div id="fuel-consumption" class="metric-item"></div>
                </div>
                <div class="metric-group">
                    <h3>Route Details</h3>
                    <div id="avg-flights" class="metric-item"></div>
                    <div id="typical-aircraft" class="metric-item"></div>
                    <div id="cruising-altitude" class="metric-item"></div>
                </div>
            </div>
        `;

        this.world = null;
        this.points = [];
        this.arcs = [];
        this.airplaneModel = null;
        this.AIRPLANE_SCALE = 0.5;
        this.AIRPLANE_ALTITUDE = 0.15;
    }

    async connectedCallback() {
        await this.loadDependencies();
        this.initializeGlobe();
        this.setupEventListeners();
    }

    async loadDependencies() {
        // Load THREE.js and GLTFLoader
        await Promise.all([
            this.loadScript('https://unpkg.com/three@0.139.2/build/three.min.js'),
            this.loadScript('https://unpkg.com/three@0.139.2/examples/js/loaders/GLTFLoader.js'),
            this.loadScript('https://unpkg.com/globe.gl@2.32.1/dist/globe.gl.min.js')
        ]);
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    initializeGlobe() {
        this.world = Globe()
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
            .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
            .arcColor(() => '#ffff00')
            .arcAltitude(0)
            .arcStroke(1.5)
            .arcsData([])
            .pointsData([])
            .pointColor(() => '#ff0000')
            .pointAltitude(0.1)
            .pointRadius(0.5)
            (this.shadowRoot.getElementById('globeViz'));
        
        // Center the globe
        this.world.camera().position.set(0, 0, 300);
        this.world.controls().enableZoom = true;
        this.world.controls().enablePan = true;
        this.world.controls().dampingFactor = 0.1;
        this.world.controls().minDistance = 100;
        this.world.controls().maxDistance = 500;

        // Enable controls and set rotation
        this.world.controls().autoRotate = true;
        this.world.controls().autoRotateSpeed = 0.1;

        // Load airplane model
        const loader = new THREE.GLTFLoader();
        loader.load(
            'Plane.glb',
            (gltf) => {
                this.airplaneModel = gltf.scene;
                this.airplaneModel.scale.set(this.AIRPLANE_SCALE, this.AIRPLANE_SCALE, this.AIRPLANE_SCALE);
            },
            undefined,
            (error) => console.error('Error loading airplane model:', error)
        );
    }

    setupEventListeners() {
        this.shadowRoot.getElementById('add-flight-btn').addEventListener('click', () => this.addFlightPath());
        this.shadowRoot.getElementById('from-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.shadowRoot.getElementById('to-input').focus();
        });
        this.shadowRoot.getElementById('to-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addFlightPath();
        });
    }

    async getCoordinates(location) {
        try {
            const response = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
            );
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                return {
                    lat: data.results[0].latitude,
                    lng: data.results[0].longitude
                };
            }
            throw new Error('Location not found');
        } catch (err) {
            console.error('Error in getCoordinates:', err);
            throw err;
        }
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    calculateFlightDuration(distance) {
        const avgSpeed = 850; // Average cruising speed in km/h
        const hours = distance / avgSpeed;
        const fullHours = Math.floor(hours);
        const minutes = Math.round((hours - fullHours) * 60);
        return `${fullHours}h ${minutes}m`;
    }

    calculateCO2(distance) {
        return Math.round(distance * 0.09 * 300); // Assuming average 300 passengers
    }

    async addFlightPath() {
        const fromLocation = this.shadowRoot.getElementById('from-input').value.trim();
        const toLocation = this.shadowRoot.getElementById('to-input').value.trim();

        if (!fromLocation || !toLocation) {
            this.showError('Please enter both locations');
            return;
        }

        try {
            const startCoords = await this.getCoordinates(fromLocation);
            const endCoords = await this.getCoordinates(toLocation);

            // Update points and arcs
            this.points = [startCoords, endCoords];
            this.world.pointsData(this.points);

            const arc = {
                startLat: startCoords.lat,
                startLng: startCoords.lng,
                endLat: endCoords.lat,
                endLng: endCoords.lng
            };
            this.arcs = [arc];
            this.world.arcsData(this.arcs);

            // Add airplane and update metrics
            this.updateAirplanePosition(startCoords, endCoords);
            this.updateMetrics(startCoords, endCoords);

            // Reset inputs
            this.shadowRoot.getElementById('from-input').value = '';
            this.shadowRoot.getElementById('to-input').value = '';
            this.shadowRoot.getElementById('error-message').style.display = 'none';

        } catch (err) {
            console.error('Error adding flight path:', err);
            this.showError('Error finding locations. Please try again.');
        }
    }

    updateAirplanePosition(startCoords, endCoords) {
        if (!this.airplaneModel) return;

        // Calculate the great circle path
        const λ1 = startCoords.lng * Math.PI / 180;
        const φ1 = startCoords.lat * Math.PI / 180;
        const λ2 = endCoords.lng * Math.PI / 180;
        const φ2 = endCoords.lat * Math.PI / 180;

        // Find the true midpoint along the great circle
        const Bx = Math.cos(φ2) * Math.cos(λ2 - λ1);
        const By = Math.cos(φ2) * Math.sin(λ2 - λ1);
        const midφ = Math.atan2(
            Math.sin(φ1) + Math.sin(φ2),
            Math.sqrt((Math.cos(φ1) + Bx) * (Math.cos(φ1) + Bx) + By * By)
        );
        const midλ = λ1 + Math.atan2(By, Math.cos(φ1) + Bx);

        // Convert back to degrees
        const midLat = midφ * 180 / Math.PI;
        const midLng = midλ * 180 / Math.PI;

        const midpointPos = this.world.getCoords(midLat, midLng, this.AIRPLANE_ALTITUDE);
        const startPos = this.world.getCoords(startCoords.lat, startCoords.lng, this.AIRPLANE_ALTITUDE);
        const endPos = this.world.getCoords(endCoords.lat, endCoords.lng, this.AIRPLANE_ALTITUDE);

        // Remove existing airplane
        const existingAirplane = this.world.scene().getObjectByName('airplane');
        if (existingAirplane) {
            this.world.scene().remove(existingAirplane);
        }

        // Add new airplane
        const airplane = this.airplaneModel.clone();
        airplane.position.set(midpointPos.x, midpointPos.y, midpointPos.z);
        airplane.name = 'airplane';

        // Calculate direction vector pointing from midpoint to destination
        const direction = new THREE.Vector3()
            .subVectors(endPos, midpointPos)
            .normalize();

        // Calculate up vector (pointing from the center of the Earth)
        const up = new THREE.Vector3(midpointPos.x, midpointPos.y, midpointPos.z).normalize();
        
        // Calculate right vector
        const right = new THREE.Vector3().crossVectors(up, direction).normalize();
        
        // Recalculate corrected up vector
        const correctedUp = new THREE.Vector3().crossVectors(direction, right).normalize();

        // Create and apply rotation matrix
        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.set(
            right.x, correctedUp.x, direction.x, 0,
            right.y, correctedUp.y, direction.y, 0,
            right.z, correctedUp.z, direction.z, 0,
            0, 0, 0, 1
        );

        airplane.rotation.setFromRotationMatrix(rotationMatrix);
        this.world.scene().add(airplane);
    }

    updateMetrics(startCoords, endCoords) {
        const distance = this.calculateDistance(
            startCoords.lat, startCoords.lng,
            endCoords.lat, endCoords.lng
        );
        const duration = this.calculateFlightDuration(distance);
        const co2 = this.calculateCO2(distance);

        this.shadowRoot.getElementById('flight-duration').textContent = `Flight Duration: ${duration}`;
        this.shadowRoot.getElementById('flight-distance').textContent = 
            `Distance: ${Math.round(distance)} km (${Math.round(distance * 0.621371)} miles)`;
        this.shadowRoot.getElementById('time-difference').textContent = 
            `Time Zones Crossed: ${Math.abs(Math.round(startCoords.lng - endCoords.lng) / 15)}`;
        
        this.shadowRoot.getElementById('co2-emissions').textContent = `CO₂ Emissions: ${co2} kg`;
        this.shadowRoot.getElementById('fuel-consumption').textContent = 
            `Fuel Consumption: ${Math.round(distance * 0.1)} gallons`;

        this.shadowRoot.getElementById('avg-flights').textContent = `Average Flights: 3-5 daily`;
        this.shadowRoot.getElementById('typical-aircraft').textContent = `Common Aircraft: Boeing 777, Airbus A350`;
        this.shadowRoot.getElementById('cruising-altitude').textContent = `Cruising Altitude: 35,000 ft`;

        this.shadowRoot.getElementById('metrics-container').style.display = 'block';
    }

    showError(message) {
        const errorMessage = this.shadowRoot.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
}

// Register the component
customElements.define('flight-map-globe', FlightMapGlobe);

