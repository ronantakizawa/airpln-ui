export class BurstButton extends HTMLElement {
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

        plane.style.animationName = 'none';
        void plane.offsetWidth;
        plane.style.animationName = 'burstFlyPlane';
        plane.style.transform = `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) rotate(${angle * (180/Math.PI)}deg)`;
        
        document.body.appendChild(plane);
        setTimeout(() => {
            document.body.removeChild(plane);
        }, 1000);
    }
}

customElements.define('burst-button', BurstButton);
