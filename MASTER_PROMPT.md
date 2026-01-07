# SOOK - Master Design & Development Prompt

## PROJECT OVERVIEW

You are building **SOOK**, an interactive animated hero experience that showcases a single phonetic sound appearing across 4 different languages, each with distinct cultural and linguistic meanings. The experience culminates in a final branded logo with animated eyes.

**Core Concept**: The word "Sook" (or phonetically similar words) exists in Arabic, Korean, Hindi, and Russian—each with beautiful, positive meanings related to commerce, virtue, happiness, and growth. By connecting these diverse languages through a single sound, SOOK represents a universal marketplace connecting cultures.

**Design Philosophy**: "Gallery Style" - Clean, minimal, high-end aesthetic (think Apple, Aesop). The experience feels like a guided documentary tour rather than a flashy animation.

---

## VISUAL & DATA STRUCTURE

### The Four Languages & Their Stories

Each language entry contains:

| Language | Script | Phonetic | Meaning | Narrative Sentence | Color (Brand) |
|----------|--------|----------|---------|-------------------|---------------|
| **Arabic** | سوق | SOUQ | MARKETPLACE | "In the Arabic world, the **سوق** is where culture trades." | #C05621 (Terracotta) |
| **Korean** | 숙 | SUK | VIRTUE & CHARACTER | "In Korean, **숙** means virtue and purity." | #5C7A7C (Sage Green) |
| **Hindi** | सुख | SUKH | HAPPINESS & EASE | "In Hindi, **सुख** is the state of happiness." | #D69E2E (Saffron Gold) |
| **Russian** | сук | SUK | GROWTH & ROOTS | "In Russian, **сук** is the branch that connects us." | #1B3B36 (Deep Forest) |
| **FINAL** | S00K | — | WELCOME TO THE MARKETPLACE | (Animated logo with eyes) | #0a0a0f (Black) |

### Key Feature: Embedded Foreign Scripts

The narrative sentences contain the foreign script **embedded directly within the text** using HTML `<span>` tags. This allows:
- The foreign script to be styled with its specific color (the "Brand Color" for that language)
- The foreign script to appear in its appropriate font family (e.g., "Noto Naskh Arabic" for Arabic)
- A seamless bilingual visual experience where the script pops against the narrative text

Example (HTML in data):
```html
"In the Arabic world, the <span class='embedded-script' style='font-family: \"Noto Naskh Arabic\", serif; color: #C05621;'>سوق</span> is where culture trades."
```

---

## DESIGN SYSTEM

### Background
- **Color**: Static White (#ffffff)
- **Reason**: Reduces cognitive load. The animation itself is complex; a static background keeps the viewer's eye calm and focused on the content. Elevates the brand to feel premium and gallery-like.

### Typography Hierarchy

1. **Phonetic Label** (smallest)
   - Font: Montserrat, 300 weight
   - Size: Responsive (clamp: 1.5rem - 2.5rem)
   - Color: Dark grey (rgba(26, 26, 26, 0.5))
   - Style: UPPERCASE, letter-spaced
   - Purpose: Language context cue

2. **Main Foreign Script** (largest, hero)
   - Font: Language-specific (Noto Naskh Arabic, Noto Sans KR, etc.)
   - Size: Responsive (clamp: 5rem - 14rem)
   - Color: Brand Color for that language (applies dynamically via inline styles)
   - Weight: 700 (bold)
   - Purpose: Main visual anchor

3. **Meaning Headline** (secondary)
   - Font: Montserrat, 400-800 weight
   - Size: Responsive (clamp: 0.7rem - 0.95rem)
   - Color: Dark grey (rgba(26, 26, 26, 0.6))
   - Style: UPPERCASE, letter-spaced
   - Purpose: Defines what the script means in English

4. **Narrative Sentence** (new, conversational)
   - Font: Montserrat, 400 weight (elegant, not heavy)
   - Size: Responsive (clamp: 1.1rem - 1.8rem)
   - Color: Dark grey (#1a1a1a)
   - Line-height: 1.6 (readable)
   - Margin: 2.5rem above (breathing room)
   - Contains embedded foreign scripts with specific colors/fonts
   - Purpose: Tell a micro-story, educate, humanize the abstract visuals

### Font Families

**English/Headings:**
- Montserrat (weights: 300, 400, 800)

**Foreign Scripts:**
- Arabic: "Noto Naskh Arabic", serif (weight 700)
- Korean: "Noto Sans KR", sans-serif (weight 700)
- Hindi: "Noto Sans Devanagari", sans-serif (weight 700)
- Russian: "Roboto", sans-serif (weight 700)

All fonts are sourced from Google Fonts CDN.

### Color Palette

| Language | Primary (Script) | Context |
|----------|-----------------|---------|
| Arabic | #C05621 | Terracotta - warm, trade-associated |
| Korean | #5C7A7C | Sage Green - calm, virtuous |
| Hindi | #D69E2E | Saffron Gold - joyful, auspicious |
| Russian | #1B3B36 | Deep Forest - rooted, grounded |
| Final | #0a0a0f | Near-Black - professional, elegant |

---

## ANIMATION ARCHITECTURE

### Animation Flow (Per Cycle)

Each cycle follows this sequence:

**Phase 1: Transition Out (0.5s)**
- All text elements fade out, blur up, and move upward
- Stagger: slight delay between elements for fluidity

**Phase 2: Content Update (Hidden)**
- Update state with new language data
- Apply new font family to main script
- Apply new color to main script
- Set new narrative HTML (with embedded script spans)

**Phase 3: Transition In (1.0-1.2s)**
- Phonetic: blur in + slide up (0.5s)
- Main Script: elastic pop effect (1.2s) - scale from 0.8 → 1, with elastic easing
- Meaning: subtle slide up (0.8s)
- Narrative: smooth fade up (0.6s, delayed to start after meaning)

**Phase 4: Hold Time (3.5s)**
- Display content for reading and absorption

**Phase 5: Loop or Final**
- If final state reached: watermark morphs into animated logo with eyes
- If looping: return to Phase 1

### GSAP Implementation Notes

- **Timeline-based**: Use `gsap.timeline()` for sequenced animations
- **Easing Functions**: 
  - Exits: `power2.in` (smooth acceleration out)
  - Entries: `power2.out` or `power3.out` (smooth deceleration in)
  - Hero Pop: `elastic.out(1, 0.6)` (bouncy, feels alive)
- **Blur Filters**: Use CSS filter blur for entrance/exit elegance
- **Stagger**: Use `stagger` property for subtle multi-element sequencing

---

## INTERACTION & FEATURES

### Main Loop
- Cycles through 4 languages on a timer (approximately 6-7s per language including animations and hold time)
- After the 4th language, transitions to final logo state
- If `loop` prop is true, resets and begins again

### Reduced Motion Support
- Detects `prefers-reduced-motion` media query
- Disables animations if detected
- Shows final state immediately

### Accessibility
- Semantic HTML (`<h1>`, `<div role="img">`)
- ARIA labels for context
- Color not the only differentiator (meaning text also changes)
- Sufficient contrast between text and white background

### Responsive Design
- Mobile-first breakpoints (480px, 768px)
- Font sizes use `clamp()` for fluid scaling
- Narrative text has max-width (850px) for readability
- Watermark opacity/size adjusts for smaller screens

---

## TECHNICAL REQUIREMENTS

### Stack
- **Framework**: Next.js 14+ with TypeScript
- **Animation Library**: GSAP 3.12+
- **Styling**: CSS Modules
- **Fonts**: Google Fonts API

### Component Structure
- **SookIntro.tsx**: Main component with all animation logic
- **sookIntroSteps.ts**: Data structure containing language entries
- **sookIntro.module.css**: Scoped styles

### Key Props
- `loop` (boolean): Whether to loop the animation cycle
- `autoPlay` (boolean): Start animations automatically on mount
- `onDone` (callback): Triggered when animation sequence completes

### State Management
- Use React `useState` for current language data
- Use `useRef` for DOM element references (to avoid re-renders during animations)
- Use `useCallback` for memoized animation function

---

## IMPLEMENTATION CHECKLIST

- [ ] Update data structure (`sookIntroSteps.ts`) to include `narrativeHTML` field with embedded script spans
- [ ] Add CSS styles for `.narrativeText` and `.embedded-script` classes
- [ ] Add `narrativeTextRef` to component for targeting
- [ ] Update state to include `currentNarrative` and `currentColor`
- [ ] Modify `animateCycle()` to handle narrative text entrance/exit animations
- [ ] Use `dangerouslySetInnerHTML` to render HTML narrative with embedded spans (sanitize if needed)
- [ ] Update color styling to apply to main script dynamically (inline style `color: currentColor`)
- [ ] Change background from dark to white (#ffffff)
- [ ] Update all text colors to dark/black for white background
- [ ] Update nav color to dark
- [ ] Remove text-shadow from main script for cleaner gallery look
- [ ] Ensure narrative text animates in after meaning text (stagger timing)
- [ ] Test responsive behavior on mobile
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Ensure Google Fonts are properly loaded for all 4 language scripts

---

## FINAL STATE

After cycling through all 4 languages, the experience reaches a **Final State**:

1. **Watermark Transformation**: The background "SOOK" watermark becomes visible and shrinks
2. **Logo Morphing**: Simultaneously, the final logo (S + eyes + K) fades in and scales to full size
3. **Eyes Animation**: Once fully visible, the logo's animated eyes begin blinking and looking around
4. **Meaning Display**: The meaning text ("WELCOME TO THE MARKETPLACE") slides in below

This final state holds for several seconds as the main branded moment of the experience.

---

## DESIGN DECISIONS & RATIONALE

### Why White Background?
- **Reduced Cognitive Load**: The experience has significant motion and visual complexity (morphing text, foreign scripts, color changes). A static white background keeps the viewer grounded.
- **Premium Feeling**: Matches luxury brands and art galleries. Makes the content feel intentional and refined.
- **Better Text Contrast**: Dark text on white is highly readable; allows for elegant, lighter typography.

### Why Embedded Scripts?
- **Contextual Learning**: Readers understand the word within its linguistic context, not in isolation.
- **Bilingual Flow**: Feels natural, like a guide explaining something in both languages simultaneously.
- **Visual Cohesion**: The foreign script "pops" within the sentence through color and font weight, creating visual interest without clashing.

### Why This Animation Sequence?
- **Elastic Pop**: Makes the main script feel alive and celebratory, capturing viewer attention.
- **Staggered Entry**: Each element doesn't hit at once; the cascading animation feels choreographed and intentional.
- **Hold Time**: Gives viewers time to read and absorb the narrative sentence, not rushing them.

---

## NEXT STEPS FOR REFINEMENT

1. **Narrative Refinement**: Consider if the narrative sentences fully capture the essence of each language's meaning. Test with native speakers for cultural authenticity.
2. **Color Accessibility**: Run contrast checks to ensure embedded scripts maintain readability against the narrative text color.
3. **Animation Timing**: Fine-tune hold times based on average reading speed for the narrative sentences.
4. **Mobile Experience**: Test on actual mobile devices to ensure text sizes are comfortable and animations perform smoothly.
5. **Internationalization**: Consider adding language toggling (if the project expands).

---

## USAGE EXAMPLE

```tsx
import { SookIntro } from '@/app/components/SookIntro';

export default function Page() {
  return (
    <SookIntro 
      loop={true}
      autoPlay={true}
      onDone={() => console.log('Intro complete')}
    />
  );
}
```

---

**Last Updated**: January 6, 2026
**Designer Notes**: Gallery-style, reduced motion support, responsive, accessible, conversational narrative structure.
