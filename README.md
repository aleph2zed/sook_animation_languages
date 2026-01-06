# s00k GSAP Intro Animation

Premium GSAP intro animation for the s00k livestream ecommerce brand. Features animated wordmark cycling through multiple language scripts with eye animations on the zeros in the latin form.

## Features

- Animated wordmark transitions through 5 language scripts (Latin, Korean, Arabic, Devanagari, Cyrillic)
- Eye animations on the zeros in latin s00k (pupil drift, blink, focus lock)
- Two panel layout with meaning card on the right
- Responsive design (desktop two columns, mobile stacked)
- Respects prefers reduced motion
- Optional dock animation for final logo lock in
- No external fonts (SVG outlines only)
- No MorphSVGPlugin required (crossfade + blur + scale transitions)

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:3000 to see the intro animation.

## Project Structure

```
s00k_gsap/
├── app/
│   ├── components/
│   │   ├── SookIntro.tsx          # Main animation component
│   │   ├── sookIntro.module.css   # CSS module styles
│   │   └── sookIntroSteps.ts      # Steps data helper
│   ├── intro/
│   │   └── page.tsx               # Demo route
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Redirects to /intro
├── public/
│   └── sook/
│       ├── latin.svg              # Latin s00k with eye groups
│       ├── korean.svg             # Korean 숙
│       ├── arabic.svg             # Arabic سوق
│       ├── devanagari.svg         # Devanagari सुख
│       └── cyrillic.svg           # Cyrillic сук
├── package.json
├── tsconfig.json
└── next.config.js
```

## Component API

```tsx
interface SookIntroProps {
  loop?: boolean;           // Loop animation continuously (default: true)
  autoPlay?: boolean;       // Auto play on mount (default: true)
  onDone?: () => void;      // Callback when animation completes
  dockOnComplete?: boolean; // Dock logo into header position when complete (default: false)
}
```

## Animation Timeline

1. Latin s00k appears with eyes active
2. Blink during hold
3. Transition to Korean 숙 (eyes pause, pupils fade)
4. Transition to Arabic سوق
5. Transition to Devanagari सुख
6. Transition to Cyrillic сук
7. Return to Latin s00k (eyes resume)
8. Final blink
9. Loop or complete (with optional dock animation)

Total loop duration: approximately 7 seconds

## Eye Animation Spec

### Pupil Drift
- Pupils move within 8px range
- Smooth sine easing
- Random targets every 1.2 to 2.0 seconds
- Both eyes look at same target with tiny offset

### Blink
- ScaleY animation (1.0 to 0.1 to 1.0)
- Duration: 0.08s close, 0.12s open
- 0.02s offset between left and right eye
- Triggered at least once per cycle

### Focus Lock
- When leaving latin: pupils fade to 0.3 opacity, reset to center
- When returning to latin: pupils fade to 1.0 opacity, drift resumes

## Accessibility

- Aria label on container
- Respects prefers reduced motion
- Static fallback with skip button for reduced motion users

## SVG Structure for Latin

The latin.svg includes separable groups for eye animation:

```xml
<svg viewBox="0 0 1200 400">
  <g id="latin">
    <path id="sPath" d="..." />
    <g id="eyeLeft">
      <ellipse id="zeroLeft" ... />
      <circle id="pupilLeft" class="pupil" ... />
      <circle id="shineLeft" class="shine" ... />
    </g>
    <g id="eyeRight">
      <ellipse id="zeroRight" ... />
      <circle id="pupilRight" class="pupil" ... />
      <circle id="shineRight" class="shine" ... />
    </g>
    <path id="kPath" d="..." />
  </g>
</svg>
```

## Figma SVG Prep Checklist

See the checklist at the bottom of this README for manual Figma steps if you need to update the SVG assets.

## License

Proprietary. All rights reserved.


