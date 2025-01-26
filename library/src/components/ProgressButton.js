export class ProgressButton extends HTMLElement {
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

customElements.define('progress-button', ProgressButton);