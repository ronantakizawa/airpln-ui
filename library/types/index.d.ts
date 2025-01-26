declare module '@ronantakizawa/airpln-ui' {
    export class BurstButton extends HTMLElement {
        createPlanes(): void;
        createPlane(): void;
    }
    export class ProgressButton extends HTMLElement {
        startAnimation(): void;
        reset(): void;
    }
    export class OrbitLoading extends HTMLElement {}
    export class OrbitLoadingCircle extends HTMLElement {}
    export class CloudLoading extends HTMLElement {}
    export class PlaneBackground extends HTMLElement {}
    export class FlightMapGlobe extends HTMLElement {
        getCoordinates(location: string): Promise<{lat: number, lng: number}>;
        calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
        calculateFlightDuration(distance: number): string;
        calculateCO2(distance: number): number;
        addFlightPath(): Promise<void>;
        updateAirplanePosition(startCoords: {lat: number, lng: number}, endCoords: {lat: number, lng: number}): void;
        updateMetrics(startCoords: {lat: number, lng: number}, endCoords: {lat: number, lng: number}): void;
        showError(message: string): void;
    }
}