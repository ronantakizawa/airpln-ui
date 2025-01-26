export class CloudLoading extends HTMLElement {
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

                .cloud-1 {
                    width: 100px;
                    height: 30px;
                    top: 50px;
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

customElements.define('cloud-loading', CloudLoading);