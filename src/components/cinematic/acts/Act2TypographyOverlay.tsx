import React from 'react';
import { ACT2_TARGETS, type Act2WordKey } from '../three/act2/typography/act2TargetLayout';
import './act2TypographyOverlay.css';

export interface Act2TypographyOverlayProps {
  /** Actual CSS stage width / 1672. Parent must own canonical stage sizing. */
  scale: number;
  className?: string;
}

const ORDER: Act2WordKey[] = ['we', 'sellOut', 'your', 'realEstate', 'project'];

export const Act2TypographyOverlay: React.FC<Act2TypographyOverlayProps> = ({
  scale,
  className = '',
}) => {
  return (
    <div
      className={`act2-type-overlay absolute inset-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {ORDER.map((key) => {
        const b = ACT2_TARGETS[key];
        const style: React.CSSProperties = {
          left: b.x * scale,
          top: b.y * scale,
          width: b.width * scale,
          height: b.height * scale,
          ['--act2-font-size' as string]: `${b.fontPx * scale}px`,
        };

        return (
          <div
            key={key}
            className={`act2-type-box act2-box-${key}`}
            style={style}
            data-act2-word={key}
          >
            <span className={`act2-type-word ${b.className}`}>{b.text}</span>

            {key === 'project' && (
              <span
                className="act2-type-word act2-word-project-reflection"
                aria-hidden="true"
              >
                {b.text}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
