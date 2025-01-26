// airline-components.js




// Burst Button Component
class BurstButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      
        this.shadowRoot.innerHTML = `
            <style>
                .plane-button {
                    padding: 16px 32px;
                    font-size: 18px;
                    background: linear-gradient(135deg, #0477BF, #0369a1);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    Pos
 ition: relative;
                    overflow: hidden;
                    transition: transform 0.2s;
                }
                .plane-button:hover {
                    transform: translateY(-2px);
                }
                .plane {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    fill: #0477BF;
                    opacity: 0;
                    pointer-events: none;
                }
                @keyframes flyPlane {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(var(--tx), var(--ty)) rotate(var(--rotation));
                        opacity: 0;
                    }
                }
            </style>
            <button class="plane-button">
                <slot>Click!</slot>
            </button>
        `;
        this.button = this.shadowRoot.querySelector('.plane-button');
        this.button.addEventListener('click', () => this.createPlanes());
    }
    createPlanes() {
        for (let i = 0; i < 8; i++) {
            this.createPlane();
        }
    }
    createPlane() {
        // Create a style element for the animation if it doesn't exist
        if (!document.querySelector('#burst-plane-style')) {
            const style = document.createElement('style');
            style.id = 'burst-plane-style';
            style.textContent = `
                @keyframes burstFlyPlane {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        const plane = document.createElement('div');
        plane.style.position = 'fixed';
        plane.style.zIndex = '9999';
        plane.style.pointerEvents = 'none';
      
        plane.innerHTML = `
            <svg class="plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 24px; height: 24px; fill: #0477BF;">
                <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/>
            </svg>
        `;
        const rect = this.button.getBoundingClientRect();
        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        plane.style.left = `${rect.left + rect.width / 2}px`;
        plane.style.top = `${rect.top + rect.height / 2}px`;
        plane.style.transform = `translate(-50%, -50%)`;
        plane.style.animation = 'burstFlyPlane 1s ease-out forwards';
        // Add specific transform for this plane
        plane.style.animationName = 'none'; // Reset animation
        void plane.offsetWidth; // Force reflow
        plane.style.animationName = 'burstFlyPlane';
        plane.style.transform = `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) rotate(${angle * (180/Math.PI)}deg)`;
      
        document.body.appendChild(plane);
        setTimeout(() => {
            document.body.removeChild(plane);
        }, 1000);
    }
 }
 // Progress Button Component
 class ProgressButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      
        this.shadowRoot.innerHTML = `
            <style>
                .download-button {
                    padding: 12px 32px;
                    font-size: 16px;
                    background: #0284c7;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: background-color 0.3s ease;
                    font-family: 'Roboto', sans-serif;
                    min-width: 140px;
                }
                .download-button:hover {
                    background: #0369a1;
                }
                .button-text {
                    display: inline-block;
                    transition: opacity 0.2s ease;
                }
                .plane {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    fill: white;
                    top: 50%;
                    left: -30px;
                    transform: translateY(-50%);
                    transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .checkmark {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                    transition: all 0.3s ease;
                }
                .checkmark path {
                    stroke: white;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    transition: stroke-dashoffset 0.3s ease 0.1s;
                }
                .button-success {
                    background: #16a34a;
                }
                .button-success:hover {
                    background: #16a34a;
                }
                .download-button[disabled] {
                    cursor: default;
                }
            </style>
            <button class="download-button">
                <span class="button-text"><slot>Book Flight</slot></span>
                <svg class="plane" viewBox="0 0 576 512">
                    <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/>
                </svg>
                <svg class="checkmark" viewBox="0 0 24 24">
                    <path fill="none" d="M3.5 12.5L9.5 18.5L20.5 5.5"/>
                </svg>
            </button>
        `;
        this.button = this.shadowRoot.querySelector('.download-button');
        this.plane = this.shadowRoot.querySelector('.plane');
        this.buttonText = this.shadowRoot.querySelector('.button-text');
        this.checkmark = this.shadowRoot.querySelector('.checkmark');
      
        this.button.addEventListener('click', () => this.startAnimation());
    }
    startAnimation() {
        if (this.button.disabled) return;
      
        this.button.disabled = true;
        this.plane.style.left = 'calc(100% + 30px)';
        this.buttonText.style.opacity = '0';
      
        setTimeout(() => {
            this.button.classList.add('button-success');
            this.plane.style.opacity = '0';
          
            this.checkmark.style.transform = 'translate(-50%, -50%) scale(1)';
            this.checkmark.style.opacity = '1';
            this.checkmark.querySelector('path').style.strokeDashoffset = '0';
          
            setTimeout(() => {
                this.reset();
            }, 2000);
        }, 800);
    }
    reset() {
        this.button.disabled = false;
        this.button.classList.remove('button-success');
        this.plane.style.opacity = '0';
        this.plane.style.left = '-30px';
        setTimeout(() => {
            this.plane.style.opacity = '1';
        }, 1000);
        this.buttonText.style.opacity = '1';
        this.checkmark.style.transform = 'translate(-50%, -50%) scale(0)';
        this.checkmark.style.opacity = '0';
    }
 }
 // Orbit Loading Component
 class OrbitLoading extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                #loading-container {
                    position: relative;
                    width: 200px;
                    height: 200px;
                }
                #loading-text {
                    font-size: 20px;
                    color: #0477BF;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'Roboto', sans-serif;
                }
                #plane-container {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    top: 30%;
                    left: 30%;
                    transform: translate(-30%, -30%);
                    animation: orbit 3s linear infinite;
                }
                #plane {
                    position: absolute;
                    top: -45px;
                    left: 80%;
                    transform: translateX(-50%);
                    width: 30px;
                    height: 30px;
                    fill: #0477BF;
                    transform-origin: 50% 100%;
                }
                @keyframes orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            </style>
            <div id="loading-container">
                <span id="loading-text">Loading</span>
                <div id="plane-container">
                    <svg id="plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/>
                    </svg>
                </div>
            </div>
        `;
        this.loadingText = this.shadowRoot.getElementById('loading-text');
        this.dots = 1;
      
        setInterval(() => {
            this.loadingText.textContent = "Loading" + ".".repeat(this.dots);
            this.dots = (this.dots % 3) + 1;
        }, 500);
    }
 }
 // Cloud Loading Component
 class CloudLoading extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    min-height: 200px;
                }
                .scene {
                    position: relative;
                    width: 300px;
                    height: 200px;
                    background: linear-gradient(to bottom, #3498db, #85c1e9);
                    border-radius: 8px;
                    overflow: hidden;
                }
                .plane {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    fill: white;
                    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
                    z-index: 2;
                    animation: fly 4s infinite ease-in-out;
                }
                .cloud {
                    position: absolute;
                    background: white;
                    border-radius: 20px;
                    animation: float-across 8s linear infinite;
                    opacity: 0.9;
                }
                .cloud::before,
                .cloud::after {
                    content: '';
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                }
                .cloud-1::before {
                    width: 35px;
                    height: 35px;
                    top: -20px;
                    left: 10px;
                }
                .cloud-1::after {
                    width: 45px;
                    height: 45px;
                    top: -25px;
                    left: 40px;
                }
                .cloud-2 {
                    width: 80px;
                    height: 25px;
                    top: 100px;
                    animation-delay: -4s;
                }
                .cloud-2::before {
                    width: 30px;
                    height: 30px;
                    top: -15px;
                    left: 5px;
                }
                .cloud-2::after {
                    width: 35px;
                    height: 35px;
                    top: -20px;
                    left: 30px;
                }
                .cloud-3 {
                    width: 120px;
                    height: 35px;
                    top: 150px;
                    animation-delay: -2s;
                }
                .cloud-3::before {
                    width: 40px;
                    height: 40px;
                    top: -25px;
                    left: 15px;
                }
                .cloud-3::after {
                    width: 50px;
                    height: 50px;
                    top: -30px;
                    left: 45px;
                }
                @keyframes float-across {
                    from {
                        left: 320px;
                        transform: translateX(0);
                    }
                    to {
                        left: -150px;
                        transform: translateX(0);
                    }
                }
                @keyframes fly {
                    0%, 100% {
                        transform: translate(130px, 80px) rotate(5deg);
                    }
                    25% {
                        transform: translate(130px, 60px) rotate(-2deg);
                    }
                    75% {
                        transform: translate(130px, 100px) rotate(8deg);
                    }
                }
                .loading-text {
                    position: absolute;
                    bottom: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                    font-size: 16px;
                    font-weight: 600;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
                    white-space: nowrap;
                    font-family: 'Roboto', sans-serif;
                }
                .dots {
                    display: inline-block;
                    width: 24px;
                }
            </style>
            <div class="scene">
                <svg class="plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/>
                </svg>
                <div class="cloud cloud-1"></div>
                <div class="cloud cloud-2"></div>
                <div class="cloud cloud-3"></div>
                <div class="loading-text">Loading<span class="dots"></span></div>
            </div>
        `;
        this.dots = this.shadowRoot.querySelector('.dots');
        this.dotCount = 0;
        setInterval(() => {
            this.dotCount = (this.dotCount % 3) + 1;
            this.dots.textContent = '.'.repeat(this.dotCount);
        }, 500);
    }
 }
 // OrbitLoadingCircle Component (from loading2.html)
 class OrbitLoadingCircle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Roboto', sans-serif;
                }
                #loading-container {
                    position: relative;
                    width: 200px;
                    height: 200px;
                }
                #loading-text {
                    font-size: 20px;
                    color: #0477BF;
                    position: absolute;
                    width: 100%;
                    text-align: center;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .progress-ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 3px solid rgba(4, 119, 191, 0.1);
                }
                .progress-ring::after {
                    content: '';
                    position: absolute;
                    top: 70px;
                    left: 70px;
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 3px solid transparent;
                    border-top-color: #0477BF;
                    transform-origin: center;
                    animation: rotate 2s linear infinite;
                }
                .plane {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    fill: #0477BF;
                    top: 14px;
                    left: 128px;
                    transform: translateX(-50%) rotate(45deg);
                }
                .plane-wrapper {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 146px;
                    height: 146px;
                    transform-origin: center;
                    animation: rotate 2s linear infinite;
                }
                @keyframes rotate {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            </style>
            <div id="loading-container">
                <div class="progress-ring"></div>
                <div class="plane-wrapper">
                    <svg class="plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"/>
                    </svg>
                </div>
                <span id="loading-text">Loading</span>
            </div>
        `;
        this.loadingText = this.shadowRoot.getElementById('loading-text');
        let dots = 1;
        setInterval(() => {
            this.loadingText.textContent = "Loading" + ".".repeat(dots);
            dots = (dots % 3) + 1;
        }, 500);
    }
 }
 // Passport Book Component
 class PassportBook extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
      
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .book-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    perspective: 80px;
                    padding: 50px 0;
                }
                @keyframes initAnimation {
                    0% {
                        transform: rotateY(0deg);
                    }
                    100% {
                        transform: rotateY(-21deg);
                    }
                }
                .book {
                    width: 10px;
                    height: 10px;
                    position: relative;
                    transform-style: preserve-3d;
                    transform: rotateY(-21deg);
                    transition: 0.5s ease;
                    animation: 1s ease 0s 1 initAnimation;
                }
                .book-container:hover .book,
                .book-container:focus .book {
                    transform: rotateY(0deg);
                }
                .book > :first-child {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 20px;
                    height: 30px;
                    transform: translateZ(12.5px);
                    background-color: #008efa;
                    border-radius: 0 2px 2px 0;
                    box-shadow: 5px 5px 10px #666;
                }
                .book::before {
                    position: absolute;
                    content: ' ';
                    left: 0;
                    top: 0;
                    width: 23px;
                    height: 300px;
                    transform: translateX(187.5px) rotateY(90deg);
                    background: linear-gradient(90deg,
                        #fff 0%,
                        #f9f9f9 5%,
                        #fff 10%,
                        #f9f9f9 15%,
                        #fff 20%,
                        #f9f9f9 25%,
                        #fff 30%,
                        #f9f9f9 35%,
                        #fff 40%,
                        #f9f9f9 45%,
                        #fff 50%,
                        #f9f9f9 55%,
                        #fff 60%,
                        #f9f9f9 65%,
                        #fff 70%,
                        #f9f9f9 75%,
                        #fff 80%,
                        #f9f9f9 85%,
                        #fff 90%,
                        #f9f9f9 95%,
                        #fff 100%
                    );
                }
                .book::after {
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: ' ';
                    width: 20px;
                    height: 30px;
                    transform: translateZ(-12.5px);
                    background-color: #008efa;
                    border-radius: 0 2px 2px 0;
                }
                img {
                    width: 10%;
                    height: 10%;
                    object-fit: cover;
                }
            </style>
            <div class="book-container">
                <div class="book">
                    <div>
                        <slot>
                            <img src="passport.jpeg" alt="Passport cover"/>
                        </slot>
                    </div>
                </div>
            </div>
        `;
    }
 }
 
 
 // Plane Background Component
 class PlaneBackground extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 250px;
                    height: 250px;
                    position: relative;
                    background: transparent;
                }
                
                .bg-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                
                .bg-plane {
                    position: absolute;
                    font-size: 1.5rem;
                    color: rgba(0, 0, 0, 0.2);
                    animation: roam linear infinite;
                    transform: translateX(-100%);
                }
                
                .bg-plane:nth-child(1) {
                    top: 20%;
                    animation-duration: 4s;
                    animation-delay: 0s;
                }
                
                .bg-plane:nth-child(2) {
                    top: 45%;
                    font-size: 1.8rem;
                    color: rgba(0, 0, 0, 0.15);
                    animation-duration: 5s;
                    animation-delay: 2s;
                }
                
                .bg-plane:nth-child(3) {
                    top: 70%;
                    font-size: 1.3rem;
                    color: rgba(0, 0, 0, 0.25);
                    animation-duration: 3s;
                    animation-delay: 1s;
                }
                
                @keyframes roam {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(250px);
                    }
                }
            </style>
            
            <div class="bg-container">
                <div class="bg-plane">✈</div>
                <div class="bg-plane">✈</div>
                <div class="bg-plane">✈</div>
            </div>
        `;
    }

    connectedCallback() {
        // Ensure the component is properly initialized when added to the DOM
        this.style.display = 'block';
    }
}

 class FlightMapGlobe extends HTMLElement {
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

 // Register all components
 customElements.define('burst-button', BurstButton);
 customElements.define('progress-button', ProgressButton);
 customElements.define('orbit-loading', OrbitLoading);
 customElements.define('cloud-loading', CloudLoading);
 customElements.define('orbit-loading-circle', OrbitLoadingCircle);
 customElements.define('passport-book', PassportBook);
 customElements.define('plane-background', PlaneBackground);
 customElements.define('flight-map-globe', FlightMapGlobe);
 // Export the components
 export { BurstButton, ProgressButton, OrbitLoading, CloudLoading, OrbitLoadingCircle, PassportBook, PlaneBackground, FlightMapGlobe  }