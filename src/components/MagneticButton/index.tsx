import { useRef } from "react";
import gsap from "gsap";

export default function MagneticButton() {
  const innerRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const inner = innerRef.current;
    if (!inner) return;

    // 親要素（当たり判定エリア）の情報を取得
    const rect = e.currentTarget.getBoundingClientRect();

    // 中心からの距離を計算
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // GSAPで動かす
    gsap.to(inner, {
      x: dx * 0.5,
      y: dy * 0.5,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;

    // 元に戻す（バネの動き）
    gsap.to(inner, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
      overwrite: "auto"
    });
  };

  return (
    <div 
      style={{ display: "inline-block", padding: "40px" }} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        ref={innerRef}
        style={{
          padding: "20px 40px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "50px",
          border: "none",
          background: "#333",
          color: "#fff",
          cursor: "pointer",
          display: "block",
          // テキストを選択できないようにするとアプリっぽくなります
          userSelect: "none" 
        }}
      >
        MAGNETIC
      </button>
    </div>
  );
}