import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function ScaredText() {
  const containerRef = useRef<HTMLDivElement>(null);
  // 各文字の参照を配列で管理
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // 表示したいテキスト
  const text = "こんにちはー";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 各文字に対してループ処理
      charRefs.current.forEach((char, index) => {
        if (!char) return;

        // 1. 文字の中心座標を取得
        // (パフォーマンスのため、本来はresize時のみ計算してキャッシュ推奨ですが、今回は簡易的にここで取得)
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        // 2. マウスとの距離計算 (いつもの dx, dy)
        const dx = e.clientX - charX;
        const dy = e.clientY - charY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 3. 「影響範囲」の設定（半径150px以内なら反応する）
        const radius = 150;

        if (distance < radius) {
          // 近い場合：逃げる！
          
          // 「近ければ近いほど強く逃げる」ためのパワー計算
          // (1 - 距離/半径) で、中心に近いほど 1 になり、端っこは 0 になる
          const power = 1 - distance / radius;
          
          // 逃げる方向 = ベクトル(dx, dy) の逆方向
          // power * 100 で最大100px動くように調整
          const moveX = -(dx / distance) * power * 100;
          const moveY = -(dy / distance) * power * 100;

          gsap.to(char, {
            x: moveX,
            y: moveY,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else {
          // 遠い場合：元の位置(0,0)に戻る
          gsap.to(char, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)", // ぷるんと戻る
            overwrite: "auto"
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        overflow: "hidden"
      }}
    >
      <h1 
        style={{
          fontSize: "8rem",
          fontWeight: "900",
          color: "#fff",
          userSelect: "none", // 選択できないようにする
          whiteSpace: "nowrap",
          cursor: "default"
        }}
      >
        {/* テキストを1文字ずつ分解してspanで囲む */}
        {text.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => { charRefs.current[i] = el; }} // 配列にrefを格納
            style={{ display: "inline-block" }} // transformさせるためにinline-block必須
          >
            {char === " " ? "\u00A0" : char} {/* 空白文字の処理 */}
          </span>
        ))}
      </h1>
    </div>
  );
}