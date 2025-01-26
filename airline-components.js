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
                    position: relative;
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
                    font-family: system-ui, -apple-system, sans-serif;
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
                    font-family: system-ui, -apple-system, sans-serif;
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
                    font-family: system-ui, -apple-system, sans-serif;
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
                    font-family: 'Roboto', system-ui, -apple-system, sans-serif;
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
 
 
 // Register all components
 customElements.define('burst-button', BurstButton);
 customElements.define('progress-button', ProgressButton);
 customElements.define('orbit-loading', OrbitLoading);
 customElements.define('cloud-loading', CloudLoading);
 customElements.define('orbit-loading-circle', OrbitLoadingCircle);
 customElements.define('passport-book', PassportBook);
 
 
 // Export the components
 export { BurstButton, ProgressButton, OrbitLoading, CloudLoading, OrbitLoadingCircle, PassportBook }