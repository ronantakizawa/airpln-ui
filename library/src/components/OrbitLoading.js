export class OrbitLoading extends HTMLElement {
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

customElements.define('orbit-loading', OrbitLoading);