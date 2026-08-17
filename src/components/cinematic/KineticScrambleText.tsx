import React, { useEffect, useRef } from 'react';

interface KineticScrambleTextProps {
  targetText: string;
  className?: string;
  triggerProgress: number; // 0 to 1
  scrambleChars?: string;
}

const GLYPHS = '0123456789ABCDEF$#@%&*+-/<>~ΞΨΩ';

export const KineticScrambleText: React.FC<KineticScrambleTextProps> = ({
  targetText,
  className = '',
  triggerProgress,
  scrambleChars = GLYPHS,
}) => {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const currentTextRef = useRef<string>(targetText);

  useEffect(() => {
    if (!elementRef.current) return;

    const length = targetText.length;
    const resolvedChars = Math.floor(triggerProgress * length);

    let output = '';
    for (let i = 0; i < length; i++) {
      if (targetText[i] === ' ') {
        output += ' ';
      } else if (i < resolvedChars) {
        output += targetText[i];
      } else if (i < resolvedChars + 4) {
        output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      } else {
        output += ' ';
      }
    }

    elementRef.current.innerText = output;
    currentTextRef.current = output;
  }, [triggerProgress, targetText, scrambleChars]);

  return (
    <span
      ref={elementRef}
      className={`font-mono tracking-tight select-none transition-colors duration-150 ${className}`}
    >
      {targetText}
    </span>
  );
};
