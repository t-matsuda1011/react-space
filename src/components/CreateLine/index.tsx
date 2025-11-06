import { useEffect, useRef } from 'react';
import { setupLineAnimation } from './animation';
import './index.scss'

export const CreateLine = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { cleanup } = setupLineAnimation(containerRef);
    return () => cleanup();
  }, []);

  return (
    <div ref={containerRef} className="line-wrapepr">
      <svg id="line-svg" className="line-created" />
    </div>
  );
};