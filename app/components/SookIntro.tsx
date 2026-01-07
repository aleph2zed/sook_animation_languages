'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './sookIntro.module.css';
import { sookSteps } from './sookIntroSteps';

export interface SookIntroProps {
  loop?: boolean;
  autoPlay?: boolean;
  onDone?: () => void;
}

export const SookIntro: React.FC<SookIntroProps> = ({
  loop = true,
  autoPlay = true,
  onDone,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneticRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const narrativeTextRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const finalLogoRef = useRef<HTMLDivElement>(null);
  const eyeLeftRef = useRef<HTMLDivElement>(null);
  const eyeRightRef = useRef<HTMLDivElement>(null);
  const pupilLeftRef = useRef<HTMLDivElement>(null);
  const pupilRightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const eyeAnimRef = useRef<gsap.core.Timeline | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentPhonetic, setCurrentPhonetic] = useState('');
  const [currentScript, setCurrentScript] = useState('');
  const [currentMeaning, setCurrentMeaning] = useState('');
  const [currentNarrative, setCurrentNarrative] = useState('');
  const [currentFont, setCurrentFont] = useState("'Montserrat', sans-serif");
  const [currentColor, setCurrentColor] = useState('#0a0a0f');
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Eye blink */
  const blink = useCallback(() => {
    const eyeL = eyeLeftRef.current;
    const eyeR = eyeRightRef.current;
    if (!eyeL || !eyeR) return;

    const tl = gsap.timeline();
    tl.to(eyeL, { scaleY: 0.1, duration: 0.08, ease: 'power2.in' }, 0);
    tl.to(eyeR, { scaleY: 0.1, duration: 0.08, ease: 'power2.in' }, 0.02);
    tl.to(eyeL, { scaleY: 1, duration: 0.12, ease: 'power2.out' }, 0.1);
    tl.to(eyeR, { scaleY: 1, duration: 0.12, ease: 'power2.out' }, 0.12);
    return tl;
  }, []);

  /* Eye look animation loop */
  const startEyeAnimation = useCallback(() => {
    const pupilL = pupilLeftRef.current;
    const pupilR = pupilRightRef.current;
    if (!pupilL || !pupilR) return;

    eyeAnimRef.current?.kill();

    const tl = gsap.timeline({ repeat: -1 });

    tl.to([pupilL, pupilR], { x: 0, duration: 0.4, ease: 'power2.out' });
    tl.to({}, { duration: 0.5 });
    tl.add(blink());
    tl.to({}, { duration: 0.3 });
    tl.to([pupilL, pupilR], { x: -8, duration: 0.3, ease: 'power2.out' });
    tl.to({}, { duration: 0.6 });
    tl.to([pupilL, pupilR], { x: 8, duration: 0.4, ease: 'power2.out' });
    tl.to({}, { duration: 0.6 });
    tl.add(blink());
    tl.to([pupilL, pupilR], { x: 0, duration: 0.3, ease: 'power2.out' });
    tl.to({}, { duration: 0.8 });
    tl.to(pupilL, { x: 4, y: -3, duration: 0.3, ease: 'power2.out' }, 'upRight');
    tl.to(pupilR, { x: 5, y: -3, duration: 0.3, ease: 'power2.out' }, 'upRight');
    tl.to({}, { duration: 0.5 });
    tl.to([pupilL, pupilR], { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    tl.add(blink());
    tl.to({}, { duration: 1.0 });

    eyeAnimRef.current = tl;
  }, [blink]);

  const stopEyeAnimation = useCallback(() => {
    eyeAnimRef.current?.kill();
    eyeAnimRef.current = null;
    if (pupilLeftRef.current && pupilRightRef.current) {
      gsap.set([pupilLeftRef.current, pupilRightRef.current], { x: 0, y: 0 });
    }
  }, []);

  const animateCycle = useCallback(() => {
    if (!containerRef.current || !mainTextRef.current || !subTextRef.current || !watermarkRef.current || !phoneticRef.current || !finalLogoRef.current || !narrativeTextRef.current) return;
    if (prefersReducedMotion) return;

    const currentItem = sookSteps[indexRef.current];
    const nextIndex = (indexRef.current + 1) % sookSteps.length;
    const isGoingToFinal = currentItem.isFinal;
    const isLastBeforeFinal = sookSteps[nextIndex]?.isFinal && !currentItem.isFinal;
    
    const container = containerRef.current;
    const phonetic = phoneticRef.current;
    const mainText = mainTextRef.current;
    const subText = subTextRef.current;
    const watermark = watermarkRef.current;
    const finalLogo = finalLogoRef.current;
    const glow = glowRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        indexRef.current = nextIndex;
        if (indexRef.current === 0 && !loop) {
          onDone?.();
          return;
        }
        animateCycle();
      },
    });

    /* FINAL frame: watermark seamlessly morphs into logo with eyes */
    if (isGoingToFinal) {
      /* Background to final color */
      tl.to(container, {
        backgroundColor: currentItem.color,
        duration: 1.4,
        ease: 'power2.inOut',
      }, 0);

      /* Hide phonetic and main text */
      tl.to([phonetic, mainText], {
        opacity: 0,
        filter: 'blur(15px)',
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in',
      }, 0);

      /* Watermark becomes visible and shrinks to exact final logo size */
      tl.to(watermark, {
        opacity: 0.6,
        scale: 0.36,
        duration: 1.0,
        ease: 'power2.inOut',
      }, 0.2);

      /* Prepare final logo at smaller size to match watermark, invisible */
      tl.set(finalLogo, { opacity: 0, scale: 0.85 }, 0);

      /* Seamless crossfade: watermark fades out as logo fades in simultaneously */
      tl.to(watermark, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      }, 1.1);

      tl.to(finalLogo, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.inOut',
      }, 1.1);

      /* Expand to full size after crossfade */
      tl.to(finalLogo, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 1.35);

      /* Glow intensifies */
      if (glow) {
        tl.to(glow, {
          opacity: 0.5,
          scale: 0.9,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.5);

        tl.to(glow, {
          opacity: 0.25,
          scale: 1,
          duration: 0.5,
        }, 1.3);
      }

      /* Update state */
      tl.call(() => {
        setCurrentPhonetic('');
        setCurrentMeaning(currentItem.meaning);
        setIsFinal(true);
      }, [], 0.5);

      /* Blink when logo fully appears */
      tl.add(blink(), 1.4);

      /* Start eye animation */
      tl.call(() => startEyeAnimation(), [], 1.6);

      /* Meaning slides in */
      tl.fromTo(
        subText,
        { filter: 'blur(8px)', opacity: 0, y: 30 },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        1.3
      );

      /* Hold */
      tl.to({}, { duration: 3.5 });

      /* If looping, reset */
      if (loop) {
        tl.call(() => stopEyeAnimation());

        /* Final logo fades out */
        tl.to(finalLogo, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        });

        /* Watermark resets to background state */
        tl.set(watermark, { scale: 1 });
        tl.to(watermark, {
          opacity: 0.03,
          duration: 0.4,
        }, '<');

        tl.to(subText, {
          opacity: 0,
          y: -20,
          duration: 0.3,
        }, '<');

        tl.call(() => {
          setIsFinal(false);
        });
      }

    } else {
      /* Normal morph transition */

      tl.to(phonetic, {
        filter: 'blur(12px)',
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
      }, 0);

      tl.to(mainText, {
        filter: 'blur(20px)',
        scale: 0.85,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      }, 0);

      tl.to(subText, {
        filter: 'blur(10px)',
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: 'power2.in',
      }, 0);

      tl.to(narrativeTextRef.current, {
        filter: 'blur(10px)',
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: 'power2.in',
      }, 0);

      if (glow) {
        tl.to(glow, {
          opacity: 0.5,
          scale: 1.2,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.1);

        tl.to(glow, {
          opacity: 0.15,
          scale: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        }, 0.5);
      }

      tl.to(container, {
        backgroundColor: currentItem.color,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 0.15);

      tl.call(() => {
        setCurrentPhonetic(currentItem.phonetic);
        setCurrentFont(currentItem.font);
        setCurrentScript(currentItem.script);
        setCurrentMeaning(currentItem.meaning);
        setCurrentColor(currentItem.color);
        setCurrentNarrative(currentItem.narrativeHTML || '');
        setIsFinal(false);
      }, [], 0.4);

      /* Prep watermark before final - make it slightly more visible */
      if (isLastBeforeFinal) {
        tl.to(watermark, {
          opacity: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        }, 0.3);
      }

      tl.fromTo(
        phonetic,
        { filter: 'blur(10px)', opacity: 0, y: 20 },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        0.4
      );

      tl.fromTo(
        mainText,
        { filter: 'blur(25px)', scale: 1.2, opacity: 0 },
        { filter: 'blur(0px)', scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' },
        0.5
      );

      tl.fromTo(
        subText,
        { filter: 'blur(8px)', opacity: 0, y: 25 },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.65
      );

      tl.fromTo(
        narrativeTextRef.current,
        { filter: 'blur(8px)', opacity: 0, y: 25 },
        { filter: 'blur(0px)', opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.75
      );

      tl.to(mainText, { scale: 1.02, duration: 0.2, ease: 'power2.out' }, 1.2);
      tl.to(mainText, { scale: 1, duration: 0.3, ease: 'power2.inOut' }, 1.4);

      tl.to({}, { duration: 1.6 });
    }

    timelineRef.current = tl;
  }, [loop, onDone, prefersReducedMotion, blink, startEyeAnimation, stopEyeAnimation]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      animateCycle();
    }, 300);

    return () => {
      clearTimeout(timer);
      timelineRef.current?.kill();
      stopEyeAnimation();
    };
  }, [autoPlay, animateCycle, prefersReducedMotion, stopEyeAnimation]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const finalStep = sookSteps[sookSteps.length - 1];
      setCurrentPhonetic('');
      setCurrentScript('');
      setCurrentMeaning(finalStep.meaning);
      setCurrentFont(finalStep.font);
      setIsFinal(true);
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = finalStep.color;
      }
      if (finalLogoRef.current) {
        finalLogoRef.current.style.opacity = '1';
        finalLogoRef.current.style.transform = 'scale(1)';
      }
      if (watermarkRef.current) {
        watermarkRef.current.style.opacity = '0';
      }
    }
  }, [prefersReducedMotion]);

  const handleStart = useCallback(() => onDone?.(), [onDone]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${prefersReducedMotion ? styles.reducedMotion : ''}`}
      aria-label="S00K brand intro"
      role="img"
    >
      <nav className={styles.nav}>
        <div>S00K World</div>
        <div>Menu</div>
      </nav>

      {/* Background watermark that shrinks into final logo */}
      <div ref={watermarkRef} className={styles.watermark}>
        S00K
      </div>

      {/* Final logo with animated eyes */}
      <div ref={finalLogoRef} className={styles.finalLogo}>
        <span className={styles.letterS}>S</span>
        <div ref={eyeLeftRef} className={styles.eye}>
          <div ref={pupilLeftRef} className={styles.pupil} />
        </div>
        <div ref={eyeRightRef} className={styles.eye}>
          <div ref={pupilRightRef} className={styles.pupil} />
        </div>
        <span className={styles.letterK}>K</span>
      </div>

      <div ref={glowRef} className={styles.glowOrb} />

      <div className={styles.contentWrapper}>
        <div 
          ref={phoneticRef} 
          className={`${styles.phoneticText} ${isFinal ? styles.hidden : ''}`}
        >
          {currentPhonetic}
        </div>

        <h1
          ref={mainTextRef}
          className={`${styles.dynamicText} ${isFinal ? styles.hidden : ''}`}
          style={{ fontFamily: currentFont, color: currentColor }}
        >
          {currentScript}
        </h1>
        
        <div ref={subTextRef} className={styles.subText}>
          {currentMeaning}
        </div>

        <div 
          ref={narrativeTextRef}
          className={styles.narrativeText}
          dangerouslySetInnerHTML={{ __html: currentNarrative }}
        />
      </div>

      <button className={styles.startButton} onClick={handleStart} aria-label="Skip intro">
        Enter S00K
      </button>
    </div>
  );
};

export default SookIntro;
