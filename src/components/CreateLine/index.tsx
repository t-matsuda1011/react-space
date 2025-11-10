import { useEffect, useRef, useCallback, useState } from 'react';
import { setupLineAnimation } from './animation';
import './index.scss'

export const CreateLine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ cleanup: () => void; togglePause: () => void } | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const animation = setupLineAnimation(containerRef);
    animationRef.current = animation;
    return () => animation.cleanup();
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      if (animationRef.current) {
        animationRef.current.togglePause();
        setIsPaused(prev => !prev);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="container">
    <div 
      ref={containerRef} 
      className="line-wrapepr"
      tabIndex={0}
    >
      <svg id="line-svg" className="line-created" />
    </div>
      <div className="title-set">
        <div className="title-head">
          <p>Random</p>
          <p>Line</p>
          <p>Animation</p>
        </div>
      </div>
    </div>
  );
};