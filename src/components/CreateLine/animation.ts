// animation.ts
import gsap from 'gsap';
import { type RefObject } from 'react';

interface AnimationSetup {
  cleanup: () => void;
}

export const setupLineAnimation = (scope: RefObject<HTMLElement | null>): AnimationSetup => {
  if (!scope.current) return { cleanup: () => {} };

  const ctx = gsap.context(() => {
    const svg = scope.current!.querySelector('#line-svg');
    if (!svg) return;

    const createRandomPath = () => {
      const numSegments = gsap.utils.random(2, 9, 1);
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
    const saturation = gsap.utils.random(60, 100); // 鮮やかめ
    const lightness = gsap.utils.random(45, 70);   // 少し明るめ
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', gsap.utils.random(200, 400).toString());
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('fill', 'none');
      svg.appendChild(path);

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: gsap.utils.random(0.5, 1),
        ease: 'power2.out',
        // onComplete: () => {
        //   gsap.to(path, {
        //     opacity: 0,
        //     duration: 0.3,
        //     delay: 10,
        //     onComplete: () => path.remove(),
        //   });
        // },
      });
    };

    gsap.timeline({ repeat: -1 })
      .call(createRandomPath)
      .to({}, { duration: 1 })
      .call(createRandomPath)
      .to({}, { duration: 1 });
  }, scope);

  return {
    cleanup: () => ctx.revert(),
  };
};

// import gsap from "gsap";
// import { type RefObject } from "react";

// interface AnimationSetup {
//   cleanup: () => void;
//   tween: gsap.core.Tween | null;
// }

// export const setupLineAnimation = (
//   scope: RefObject<HTMLElement | null>
// ): AnimationSetup => {
//   let activeTween: gsap.core.Animation | null = null;

//   const ctx = gsap.context(() => {
//     const container = scope.current;
//     if (!container) return;

//     // === SVGの生成 ===
//     const svgNS = "http://www.w3.org/2000/svg";
//     const svg: SVGSVGElement = document.createElementNS(svgNS, "svg");
//     svg.style.width = "100%";
//     svg.style.height = "100%";
//     svg.style.position = "absolute";
//     svg.style.top = "0";
//     svg.style.left = "0";
//     svg.style.pointerEvents = "none";
//     container.appendChild(svg);

//     // === ランダムな線を生成 ===
//     const width = container.clientWidth;
//     const height = container.clientHeight;
//     const startX = gsap.utils.random(0, width);
//     const startY = gsap.utils.random(0, height);
//     const turns = gsap.utils.random(1, 4, 1); // 曲がる回数（整数）

//     const points: { x: number; y: number }[] = [{ x: startX, y: startY }];

//     for (let i = 0; i < turns; i++) {
//       const prev = points[points.length - 1];
//       const next = {
//         x: gsap.utils.clamp(0, width, prev.x + gsap.utils.random(-200, 200)),
//         y: gsap.utils.clamp(0, height, prev.y + gsap.utils.random(-200, 200)),
//       };
//       points.push(next);
//     }

//     // === pathデータを作成 ===
//     const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
//     const line: SVGPathElement = document.createElementNS(svgNS, "path");
//     line.setAttribute("d", pathData);
//     line.setAttribute("fill", "none");
//     line.setAttribute("stroke-linecap", "round");
//     line.setAttribute("stroke-linejoin", "round");
//     line.setAttribute("stroke-width", "4");

//     // === カラー設定（HSLベース） ===
//     const baseHue = 200;
//     const hue = (baseHue + gsap.utils.random(-60, 60)) % 360;
//     const saturation = gsap.utils.random(70, 100);
//     const lightness = gsap.utils.random(50, 70);
//     const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//     line.setAttribute("stroke", color);

//     svg.appendChild(line);

//     // === ★ 色コードを各点に表示 ===
//     const colorTexts: SVGTextElement[] = [];
//     points.forEach((p) => {
//       const text: SVGTextElement = document.createElementNS(svgNS, "text");
//       text.setAttribute("x", String(p.x));
//       text.setAttribute("y", String(p.y - 10));
//       text.setAttribute("fill", color);
//       text.setAttribute("font-size", "12");
//       text.setAttribute("font-family", "monospace");
//       text.textContent = color;
//       text.style.opacity = "0";
//       svg.appendChild(text);
//       colorTexts.push(text);
//     });

//     // === アニメーション設定 ===
//     const totalLength = line.getTotalLength?.() || 1000;
//     gsap.set(line, { strokeDasharray: totalLength, strokeDashoffset: totalLength });

//     const tl = gsap.timeline({
//       repeat: -1,
//       repeatDelay: 1.5,
//       defaults: { ease: "power2.inOut" },
//     });

//     // 線を描くアニメーション
//     tl.to(line, {
//       strokeDashoffset: 0,
//       duration: 2 + turns * 0.3,
//     });

//     // テキスト（色コード）を順番にフェードイン
//     colorTexts.forEach((t, i) => {
//       tl.to(
//         t,
//         { opacity: 1, duration: 0.4 },
//         (i / (turns + 1)) * (2 + turns * 0.3)
//       );
//     });

//     activeTween = tl;
//   }, scope);

//   return {
//     cleanup: () => ctx.revert(),
//     tween: activeTween,
//   };
// };