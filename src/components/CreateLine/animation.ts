// animation.ts
import gsap from 'gsap';
import { type RefObject } from 'react';

interface AnimationSetup {
  cleanup: () => void;
  togglePause: () => void;
}

export const setupLineAnimation = (scope: RefObject<HTMLElement | null>): AnimationSetup => {
  
  if (!scope.current) {
    return { cleanup: () => {}, togglePause: () => {} };
  }

  let timeline: gsap.core.Timeline | null = null;
  let isPaused = false;
  let ctx: gsap.Context | null = null;

  ctx = gsap.context(() => {
    const svg = scope.current!.querySelector('#line-svg');
    if (!svg) {
      return;
    }
    
    // SVGのviewBoxを設定
    svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    

    const createRandomPath = () => {
      
      // 一時停止中の場合は新しい線を作成しない
      if (isPaused) {
        return;
      }

      const numSegments = gsap.utils.random(6, 8, 1);
      const startX = gsap.utils.random(100, window.innerWidth - 100);
      const startY = gsap.utils.random(100, window.innerHeight - 100);
      let d = `M${startX},${startY}`;

      let x = startX;
      let y = startY;
      for (let i = 0; i < numSegments; i++) {
        x += gsap.utils.random(-300, 300);
        y += gsap.utils.random(-200, 200);
        d += ` L${x},${y}`;
      }

      const hue = gsap.utils.random(0, 360);
      const saturation = gsap.utils.random(60, 100);
      const lightness = gsap.utils.random(45, 70);
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', gsap.utils.random(150, 250).toString()); // より適切な線の太さに調整
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('fill', 'none');
      svg.appendChild(path);

      // 線の中央位置を計算（線の長さの50%の位置）
      const length = path.getTotalLength();
      const midPoint = path.getPointAtLength(length / 2);

      // 色情報をテキストとして表示
      const colorText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const hueRounded = Math.round(hue);
      const satRounded = Math.round(saturation);
      const lightRounded = Math.round(lightness);
      const colorInfo = `HSL(${hueRounded}, ${satRounded}%, ${lightRounded}%)`;
      
      colorText.setAttribute('x', midPoint.x.toString());
      colorText.setAttribute('y', midPoint.y.toString());
      colorText.setAttribute('fill', 'white');
      colorText.setAttribute('font-size', '14');
      colorText.setAttribute('font-family', 'Arial Narrow, sans-serif');
      colorText.setAttribute('text-anchor', 'middle'); // 中央揃え
      colorText.setAttribute('dominant-baseline', 'central'); // 垂直中央揃え
      colorText.textContent = colorInfo;
      svg.appendChild(colorText);

      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      // テキストも線と同じタイミングでアニメーション開始
      gsap.set(colorText, { display: 'none', ease: 'none' });

      // 線とテキストを同時にアニメーション（カチカチした動き）
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: gsap.utils.random(0.5, 1),
        ease: 'none', // イージングなしでカチカチした動き
      });

      // テキストは線の開始と同時に表示
      gsap.to(colorText, {
        display: 'block',
        duration: 1,
        ease: 'none',
      });      
    };

    timeline = gsap.timeline({ 
      repeat: -1,
      ease: 'none' // タイムライン全体もカチカチした動きに
    })
      .call(createRandomPath)
      .to({}, { duration: 1, ease: 'none' }) // 待機時間もイージングなし
      .call(createRandomPath)
      .to({}, { duration: 1, ease: 'none' }); // 待機時間もイージングなし      
  }, scope);

  const togglePause = () => {
    
    isPaused = !isPaused;
    
    if (timeline) {
      if (isPaused) {
        timeline.pause();
      } else {
        timeline.play();
      }
    } else {
      console.log('Timeline not found!'); // デバッグ用
    }
  };

  return {
    cleanup: () => {
      if (ctx) {
        ctx.revert();
      }
    },
    togglePause,
  };
};