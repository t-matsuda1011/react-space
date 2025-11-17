import { useEffect, useRef } from "react";
import gsap from "gsap";

// Canvas + GSAP 基本アニメーション
export default function CanvasGsapBall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballX = useRef(50); // ボールの現在位置（状態はuseRefで保持）

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 200;

    // GSAP のアニメーション（x座標を動かす）
    gsap.to(ballX, {
      current: 550,
      duration: 2,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });

    // 毎フレーム描画するループ
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(ballX.current, 100, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#4F46E5";
      ctx.fill();

      requestAnimationFrame(render);
    };

    render();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-semibold">Canvas × GSAP 基本アニメーション</h2>
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg" />
    </div>
  );
}
