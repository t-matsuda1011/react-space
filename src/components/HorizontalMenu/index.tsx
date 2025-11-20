import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function HorizontalMenu() {
  const trackRef = useRef<HTMLDivElement>(null);
  
  const state = useRef({
    isDragging: false,
    startX: 0,          
    currentX: 0,        
    prevTranslate: 0,   
    itemWidth: 220,     // アイテムの幅(200) + gap(20)
    maxScroll: 0
  });

  const items = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5", "Menu 6"];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackWidth = items.length * state.current.itemWidth;
    // 画面幅より余裕を持たせてスクロール限界を設定
    // 最後のアイテムも中央に来るように計算
    const centerOffset = window.innerWidth / 2 - 100; 
    state.current.maxScroll = -(trackWidth - window.innerWidth + centerOffset);
    
    gsap.set(track, { x: 0 });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    state.current.isDragging = true;
    state.current.startX = e.clientX;
    state.current.prevTranslate = state.current.currentX;
    
    document.body.style.cursor = "grabbing";
    gsap.killTweensOf(trackRef.current); // 動いている途中なら止める
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!state.current.isDragging) return;

    const x = e.clientX;
    const diff = x - state.current.startX;
    
    // 現在の位置 = ドラッグ開始時の位置 + 移動距離
    let newTranslate = state.current.prevTranslate + diff;

    state.current.currentX = newTranslate;
    gsap.set(trackRef.current, { x: newTranslate });
  };

  // ★ここを大幅修正★
  const handleMouseUp = (e: React.MouseEvent) => {
    if (!state.current.isDragging) return;
    state.current.isDragging = false;
    document.body.style.cursor = "default";

    const { currentX, itemWidth, startX, prevTranslate, maxScroll } = state.current;
    
    // 1. 今回のドラッグ距離
    const dragDiff = e.clientX - startX;
    
    // 2. 現在「何番目」のアイテムに一番近いか（ベースの計算）
    // 左へスクロールするとXはマイナスになるので、マイナスをつけて正のindex(0,1,2...)に変換
    let targetIndex = -Math.round(currentX / itemWidth);

    // 3. 【重要】スワイプ判定（「半分いかなくても隣へ進める」処理）
    const moveThreshold = 50; // 50px以上動かしたらスワイプとみなす
    
    // ドラッグ前のインデックスを計算
    const prevIndex = -Math.round(prevTranslate / itemWidth);

    // もし「一番近い場所」が「移動前と同じ」だった場合でも、
    // ユーザーが50px以上動かしていたら強制的に隣へ進める
    if (targetIndex === prevIndex) {
        if (dragDiff < -moveThreshold) {
            // 左へ強くスワイプ → 次のアイテムへ
            targetIndex++;
        } else if (dragDiff > moveThreshold) {
            // 右へ強くスワイプ → 前のアイテムへ
            targetIndex--;
        }
    }

    // 4. インデックス番号から座標（x）に戻す
    // index 1 なら -220px の位置へ
    let targetX = -(targetIndex * itemWidth);

    // 5. 行き過ぎ防止（Clamp）
    // 0（左端）から maxScroll（右端）の間に収める
    if (targetX > 0) targetX = 0;
    // maxScrollより小さくならないように（maxScroll自体がマイナス値なので注意）
    // ここを厳密にしすぎるとバウンドしなくなるので、簡易的に制限
    
    // 状態更新
    state.current.currentX = targetX;

    // 吸着アニメーション
    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.4,
      ease: "power3.out", // キビキビ動くように変更
      overwrite: true
    });
  };

  return (
    <div 
      style={{ 
        width: "100%", 
        overflow: "hidden",
        padding: "50px 0",
        background: "#f0f0f0",
        touchAction: "none" // スマホでのブラウザバック等を防ぐ
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        ref={trackRef}
        style={{ 
          display: "flex", 
          gap: "20px",
          // ★修正: 最初のアイテムを画面中央にする（画面幅の半分 - アイテムの半分）
          paddingLeft: "calc(50vw - 100px)", 
          width: "max-content",
          cursor: "grab"
        }}
      >
        {items.map((item, i) => (
          <div 
            key={i}
            style={{
              width: "200px",
              height: "300px",
              background: "#333",
              color: "#fff",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              userSelect: "none",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}