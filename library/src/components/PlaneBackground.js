export class PlaneBackground extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
       
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: -1;
                }
 
 
                .bg-container {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #9dbed6 0%, #ecf5ff 100%);
                    background-image:
                        radial-gradient(rgba(255,255,255,0.5) 15%, transparent 20%),
                        radial-gradient(rgba(255,255,255,0.4) 10%, transparent 20%);
                    background-size: 250px 250px, 300px 300px;
                    background-position: 50px 100px, 250px 300px;
                    overflow: hidden;
                }
 
 
                .bg-planes {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                }
 
 
                .bg-plane {
                    position: absolute;
                    font-size: 2rem;
                    color: rgba(0, 0, 0, 0.2);
                    animation: roam linear infinite;
                }
 
 
                .bg-plane:nth-child(1) {
                    top: 5%;  left: -10%;
                    font-size: 2.2rem;
                    animation-duration: 18s;
                }
                .bg-plane:nth-child(2) {
                    top: 20%; left: -15%;
                    font-size: 1.8rem;
                    color: rgba(0, 0, 0, 0.25);
                    animation-duration: 22s;
                }
                .bg-plane:nth-child(3) {
                    top: 35%; left: -12%;
                    animation-duration: 20s;
                }
                .bg-plane:nth-child(4) {
                    top: 50%; left: -14%;
                    font-size: 2.4rem;
                    color: rgba(0, 0, 0, 0.15);
                    animation-duration: 26s;
                }
                .bg-plane:nth-child(5) {
                    top: 60%; left: -8%;
                    font-size: 1.6rem;
                    color: rgba(0, 0, 0, 0.1);
                    animation-duration: 17s;
                }
                .bg-plane:nth-child(6) {
                    top: 72%; left: -10%;
                    font-size: 2rem;
                    color: rgba(0, 0, 0, 0.2);
                    animation-duration: 25s;
                }
                .bg-plane:nth-child(7) {
                    top: 85%; left: -18%;
                    font-size: 2.2rem;
                    color: rgba(0, 0, 0, 0.18);
                    animation-duration: 28s;
                }
                .bg-plane:nth-child(8) {
                    top: 90%; left: -5%;
                    font-size: 1.8rem;
                    color: rgba(0, 0, 0, 0.25);
                    animation-duration: 19s;
                }
 
 
                @keyframes roam {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(220vw); }
                }
            </style>
            <div class="bg-container">
                <div class="bg-planes">
                    <div class="bg-plane">✈</div>
                    <div class="bg-plane">✈</div>
                    <div class="bg-plane">✈</div>
                    <div class="bg-plane">✈</div>
                    <div class="bg-plane">✈</div>
                    <div class="bg-plane">✈</div>
                    <div class="bg-plane">✈</div>
                    <div class="bg-plane">✈</div>
                </div>
            </div>
        `;
    }
 }
 
 
 customElements.define('plane-background', PlaneBackground);
 