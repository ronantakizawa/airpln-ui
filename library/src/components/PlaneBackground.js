export  class PlaneBackground extends HTMLElement {
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
 
 
 customElements.define('plane-background', PlaneBackground);
 