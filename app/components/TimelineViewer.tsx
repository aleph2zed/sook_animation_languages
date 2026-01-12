'use client';

import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './timelineViewer.module.css';
import { sookSteps } from './sookIntroSteps';

interface TimelineSegment {
  label: string;
  startTime: number;
  duration: number;
  description: string;
  color: string;
}

const timelineSegments: TimelineSegment[] = [
  // Arabic Phase
  { label: 'Arabic Intro', startTime: 0, duration: 0.8, description: 'Background color change + phonetic fade in', color: '#C05621' },
  { label: 'Arabic Hold', startTime: 0.8, duration: 0.6, description: 'Display Arabic script', color: '#C05621' },
  { label: 'Arabic Exit', startTime: 1.4, duration: 0.6, description: 'Fade out and transition', color: '#C05621' },

  // Korean Phase
  { label: 'Korean Intro', startTime: 2.0, duration: 0.8, description: 'Background change to Korean color', color: '#5C7A7C' },
  { label: 'Korean Hold', startTime: 2.8, duration: 0.6, description: 'Display Korean script', color: '#5C7A7C' },
  { label: 'Korean Exit', startTime: 3.4, duration: 0.6, description: 'Fade out and transition', color: '#5C7A7C' },

  // Hindi Phase
  { label: 'Hindi Intro', startTime: 4.0, duration: 0.8, description: 'Background change to Hindi color', color: '#D69E2E' },
  { label: 'Hindi Hold', startTime: 4.8, duration: 0.6, description: 'Display Hindi script', color: '#D69E2E' },
  { label: 'Hindi Exit', startTime: 5.4, duration: 0.6, description: 'Fade out and transition', color: '#D69E2E' },

  // Russian Phase
  { label: 'Russian Intro', startTime: 6.0, duration: 0.8, description: 'Background change to Russian color', color: '#1B3B36' },
  { label: 'Russian Hold', startTime: 6.8, duration: 0.6, description: 'Display Russian script', color: '#1B3B36' },
  { label: 'Russian Exit', startTime: 7.4, duration: 0.6, description: 'Fade out and transition', color: '#1B3B36' },

  // Final Phase
  { label: 'Final Logo Morph', startTime: 8.0, duration: 1.0, description: 'Watermark becomes logo', color: '#0a0a0f' },
  { label: 'Logo Crossfade', startTime: 9.1, duration: 0.3, description: 'Watermark fades to final logo', color: '#0a0a0f' },
  { label: 'Logo Expand', startTime: 9.35, duration: 0.5, description: 'Logo expands to full size', color: '#0a0a0f' },
  { label: 'Eyes Blink', startTime: 10.0, duration: 0.3, description: 'Eyes blink animation', color: '#0a0a0f' },
  { label: 'Eyes Loop', startTime: 10.3, duration: 3.5, description: 'Eyes looking around', color: '#0a0a0f' },
];

export const TimelineViewer: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<TimelineSegment | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playheadRef = useRef<HTMLDivElement>(null);

  const totalDuration = 13.8; // Total animation duration

  const playTimeline = () => {
    setIsPlaying(true);
    const timeline = gsap.timeline({
      onComplete: () => setIsPlaying(false),
    });

    timeline.to(playheadRef.current, {
      left: '100%',
      duration: totalDuration,
      ease: 'none',
    });
  };

  const resetTimeline = () => {
    setIsPlaying(false);
    gsap.set(playheadRef.current, { left: '0%' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Animation Timeline</h2>
        <div className={styles.controls}>
          <button 
            onClick={playTimeline} 
            disabled={isPlaying}
            className={styles.playBtn}
          >
            ▶ Play
          </button>
          <button 
            onClick={resetTimeline}
            className={styles.resetBtn}
          >
            ⟲ Reset
          </button>
        </div>
      </div>

      <div className={styles.timelineWrapper}>
        <div className={styles.timeline}>
          {timelineSegments.map((segment, idx) => (
            <div
              key={idx}
              className={styles.segment}
              style={{
                left: `${(segment.startTime / totalDuration) * 100}%`,
                width: `${(segment.duration / totalDuration) * 100}%`,
                backgroundColor: segment.color,
              }}
              onClick={() => setSelectedSegment(segment)}
              title={segment.label}
            >
              <span className={styles.segmentLabel}>{segment.label}</span>
            </div>
          ))}
          <div ref={playheadRef} className={styles.playhead} />
        </div>

        <div className={styles.timeMarkers}>
          {[0, 2, 4, 6, 8, 10, 12].map((time) => (
            <div key={time} className={styles.marker}>
              <div className={styles.markerLine} />
              <span className={styles.markerLabel}>{time}s</span>
            </div>
          ))}
        </div>
      </div>

      {selectedSegment && (
        <div className={styles.details}>
          <h3>{selectedSegment.label}</h3>
          <div className={styles.detailRow}>
            <span className={styles.label}>Start:</span>
            <span>{selectedSegment.startTime.toFixed(2)}s</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Duration:</span>
            <span>{selectedSegment.duration.toFixed(2)}s</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Description:</span>
            <span>{selectedSegment.description}</span>
          </div>
        </div>
      )}

      <div className={styles.stepsTable}>
        <h3>Script Sequences</h3>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeader}>Language</th>
              <th className={styles.tableHeader}>Script</th>
              <th className={styles.tableHeader}>Phonetic</th>
              <th className={styles.tableHeader}>Meaning</th>
              <th className={styles.tableHeader}>Color</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {sookSteps.map((step) => (
              <tr key={step.id} className={styles.tableRow}>
                <td className={`${styles.tableCell} ${styles.language}`}>{step.id.toUpperCase()}</td>
                <td className={`${styles.tableCell} ${styles.script}`} style={{ fontFamily: step.font, fontSize: '20px' }}>
                  {step.script}
                </td>
                <td className={styles.tableCell}>{step.phonetic}</td>
                <td className={styles.tableCell}>{step.meaning}</td>
                <td className={styles.tableCell}>
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: step.color }}
                    title={step.color}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
