declare module '@your-username/airline-components' {
    export class BurstButton extends HTMLElement {
        createPlanes(): void;
        createPlane(): void;
    }

    export class ProgressButton extends HTMLElement {
        startAnimation(): void;
        reset(): void;
    }

    export class OrbitLoading extends HTMLElement {}
    export class CloudLoading extends HTMLElement {}
}
