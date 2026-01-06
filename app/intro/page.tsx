'use client';

import { useState, useCallback } from 'react';
import SookIntro from '../components/SookIntro';

export default function IntroPage() {
  const [key, setKey] = useState(0);

  const handleDone = useCallback(() => {
    console.log('Intro complete');
  }, []);

  const handleRestart = useCallback(() => {
    setKey((k) => k + 1);
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SookIntro key={key} loop={true} autoPlay={true} onDone={handleDone} />

      <button
        onClick={handleRestart}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          color: 'rgba(255,255,255,0.4)',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 10000,
        }}
        title="Restart"
      >
        ↻
      </button>
    </main>
  );
}
