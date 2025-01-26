# Airpln UI Kit

https://ronantakizawa.github.io/airpln-ui/

A sleek, modern UI component library designed specifically for airline and travel-related websites. This kit provides interactive, aviation-themed UI elements with smooth animations and a professional aesthetic.

<img width="1072" alt="Screenshot 2025-01-26 at 7 07 16 AM" src="https://github.com/user-attachments/assets/719264cd-13e2-4df1-9b43-e835c726252c" />

## Installation

### Via NPM
```bash
npm install @ronantakizawa/airpln-ui
```

### Via CDN
```html
<script type="module">
    import { BurstButton, ProgressButton, OrbitLoading, CloudLoading } 
    from 'https://cdn.jsdelivr.net/gh/ronantakizawa/airpln-ui/airline-components.js';
</script>
```

## Usage

### In HTML
```html
<!-- Burst Button -->
<burst-button>Click Me!</burst-button>

<!-- Progress Button -->
<progress-button>Book Flight</progress-button>

<!-- Orbit Loading Animation -->
<orbit-loading></orbit-loading>

<!-- Cloud Loading Animation -->
<cloud-loading></cloud-loading>
```

### In React/JSX
```jsx
import '@ronantakizawa/airpln-ui'

function App() {
  return (
    <div>
      {/* Burst Button */}
      <burst-button>Click Me!</burst-button>

      {/* Progress Button */}
      <progress-button>Book Flight</progress-button>

      {/* Orbit Loading */}
      <orbit-loading></orbit-loading>

      {/* Cloud Loading */}
      <cloud-loading></cloud-loading>
    </div>
  )
}
```

### In TypeScript React
If you're using TypeScript, add these type declarations to your project:

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'burst-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'progress-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'orbit-loading': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'cloud-loading': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
```

## Available Components

### BurstButton
An interactive button that creates a burst of airplane animations when clicked.

### ProgressButton
A button with a smooth airplane animation that transitions into a checkmark on completion.

### OrbitLoading
A loading indicator featuring an orbiting airplane animation.

### CloudLoading
A scenic loading animation with floating clouds and a flying airplane.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

You can customize the components using CSS custom properties:

```css
/* Example customization */
burst-button {
    --button-background: linear-gradient(135deg, #38b2ac, #319795);
    --button-hover-transform: scale(1.05);
}

progress-button {
    --button-background: #2b6cb0;
    --success-background: #2f855a;
}
```
