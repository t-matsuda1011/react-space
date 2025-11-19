import { useRef, useEffect } from "react";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

type DragState = {
  isDragging: boolean;
  ballIndex: number | null;
  currentMouseX: number;
  currentMouseY: number;
};

export default function CanvasGsap({ count = 5 }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const balls = useRef<Ball[]>([]);
  
  const dragInfo = useRef<DragState>({
    isDragging: false,
    ballIndex: null,
    currentMouseX: 0,
    currentMouseY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    // 初期化
    balls.current = Array.from({ length: count }, () => ({
      x: Math.random() * (canvas.width - 60) + 30,
      y: Math.random() * (canvas.height - 60) + 30,
      vx: 0,
      vy: 0,
      radius: 30,
      color: "#093",
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. 物理計算
      balls.current.forEach((ball, index) => {
        // ドラッグ中のボールは物理演算をスキップ（位置を固定）
        if (dragInfo.current.isDragging && dragInfo.current.ballIndex === index) {
            return; 
        }

        ball.vx *= 0.99;
        ball.vy *= 0.99;

        if (Math.abs(ball.vx) < 0.01) ball.vx = 0;
        if (Math.abs(ball.vy) < 0.01) ball.vy = 0;

        ball.x += ball.vx;
        ball.y += ball.vy;

        // 壁判定
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -1;
        } else if (ball.x + ball.radius > canvas.width) {
          ball.x = canvas.width - ball.radius;
          ball.vx *= -1;
        }
        if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= -1;
        } else if (ball.y + ball.radius > canvas.height) {
          ball.y = canvas.height - ball.radius;
          ball.vy *= -1;
        }
      });

      // 2. 衝突判定
      for (let i = 0; i < balls.current.length; i++) {
        for (let j = i + 1; j < balls.current.length; j++) {
            // ... (衝突判定のコードは変更なしなので省略可能です) ...
            const b1 = balls.current[i];
            const b2 = balls.current[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const minDist = b1.radius + b2.radius;
            if(dist < minDist){
                const overlap = minDist - dist;
                const nx = dx / dist;
                const ny = dy / dist;
                b1.x -= nx * overlap * 0.5;
                b1.y -= ny * overlap * 0.5;
                b2.x += nx * overlap * 0.5;
                b2.y += ny * overlap * 0.5;
                const dvx = b2.vx - b1.vx;
                const dvy = b2.vy - b1.vy;
                const p = dvx * nx + dvy * ny;
                if(p > 0) continue;
                const res = 0.9;
                const imp = -(1+res) * p / 2;
                b1.vx -= nx * imp;
                b1.vy -= ny * imp;
                b2.vx += nx * imp;
                b2.vy += ny * imp;
            }
        }
      }

      // 3. ガイドライン描画
      if (dragInfo.current.isDragging && dragInfo.current.ballIndex !== null) {
        const targetBall = balls.current[dragInfo.current.ballIndex];
        ctx.beginPath();
        ctx.moveTo(targetBall.x, targetBall.y);
        ctx.lineTo(dragInfo.current.currentMouseX, dragInfo.current.currentMouseY);
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      // 4. ボール描画
      for (const ball of balls.current) {
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(render);
    };

    render();
  }, [count]);


  // --- イベントハンドラ ---

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    balls.current.forEach((ball, index) => {
        const dx = x - ball.x;
        const dy = y - ball.y;
        if (dx*dx + dy*dy < ball.radius * ball.radius) {
            dragInfo.current = {
                isDragging: true,
                ballIndex: index,
                currentMouseX: x,
                currentMouseY: y
            };
            ball.vx = 0;
            ball.vy = 0;

            // ★追加: つかんだ瞬間に「握るアイコン」にする
            canvas.style.cursor = "grabbing"; 
        }
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // ドラッグ中の処理
      if (dragInfo.current.isDragging) {
          dragInfo.current.currentMouseX = mouseX;
          dragInfo.current.currentMouseY = mouseY;
          return;
      }

      // ★追加: ドラッグしていない時、マウスの下にボールがあるかチェック
      let isHovering = false;
      balls.current.forEach((ball) => {
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        if (dx*dx + dy*dy < ball.radius * ball.radius) {
            isHovering = true;
        }
      });

      // ボールの上なら「開いた手✋」、何もないなら「矢印」
      canvas.style.cursor = isHovering ? "grab" : "default";
  };

  const handleMouseUp = () => {
      if (!dragInfo.current.isDragging || dragInfo.current.ballIndex === null) return;

      // --- ひっぱり計算（スリングショット） ---
      const ball = balls.current[dragInfo.current.ballIndex];
      const dx = ball.x - dragInfo.current.currentMouseX;
      const dy = ball.y - dragInfo.current.currentMouseY;
      
      const power = 0.15;
      ball.vx = dx * power;
      ball.vy = dy * power;

      dragInfo.current = {
          isDragging: false,
          ballIndex: null,
          currentMouseX: 0,
          currentMouseY: 0
      };

      // ★追加: 放したら「普通のカーソル」に戻す
      // (またはマウス位置に合わせて grab に戻す)
      if (canvasRef.current) {
          canvasRef.current.style.cursor = "default";
      }
  };

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} 
        // 初期状態のカーソル
        style={{ cursor: "default" }}
      />
    </div>
  );
}