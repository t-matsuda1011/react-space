import { useRef, useEffect } from "react";

// ボールの定義
type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

// ドラッグ操作の状態管理用
type DragState = {
  isDragging: boolean;
  ballIndex: number | null; // どのボールを掴んでいるか
  currentMouseX: number;
  currentMouseY: number;
};

export default function CanvasGsap({ count = 5 }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const balls = useRef<Ball[]>([]);
  
  // ドラッグ中の情報を保持（再レンダリング不要なのでuseRefを使用）
  const dragInfo = useRef<DragState>({
    isDragging: false,
    ballIndex: null,
    currentMouseX: 0,
    currentMouseY: 0,
  });

  // --- 初期化とループ処理 ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    // ボールの初期生成
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

      // 1. 物理計算と移動の更新
      balls.current.forEach((ball, index) => {
        // ドラッグ中のボールは、物理演算を止めて「その場」に固定する
        // (またはマウスに追従させることも可能ですが、今回は「引っ張る」ので固定します)
        if (dragInfo.current.isDragging && dragInfo.current.ballIndex === index) {
            return; 
        }

        // 摩擦
        ball.vx *= 0.99;
        ball.vy *= 0.99;

        // 静止判定
        if (Math.abs(ball.vx) < 0.01) ball.vx = 0;
        if (Math.abs(ball.vy) < 0.01) ball.vy = 0;

        // 移動
        ball.x += ball.vx;
        ball.y += ball.vy;

        // 壁の跳ね返り
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

      // 2. ボール同士の衝突判定
      for (let i = 0; i < balls.current.length; i++) {
        for (let j = i + 1; j < balls.current.length; j++) {
          const b1 = balls.current[i];
          const b2 = balls.current[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.radius + b2.radius;

          if (dist < minDist) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            
            // 位置補正
            b1.x -= nx * overlap * 0.5;
            b1.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;

            // 速度交換（反射）
            const dvx = b2.vx - b1.vx;
            const dvy = b2.vy - b1.vy;
            const velAlongNormal = dvx * nx + dvy * ny;

            if (velAlongNormal > 0) continue;

            const restitution = 0.9;
            const impulse = -(1 + restitution) * velAlongNormal;
            const jImpulse = impulse / 2; 

            b1.vx -= nx * jImpulse;
            b1.vy -= ny * jImpulse;
            b2.vx += nx * jImpulse;
            b2.vy += ny * jImpulse;
          }
        }
      }

      // 3. ドラッグ中のガイドライン（照準線）の描画
      if (dragInfo.current.isDragging && dragInfo.current.ballIndex !== null) {
        const targetBall = balls.current[dragInfo.current.ballIndex];
        
        ctx.beginPath();
        ctx.moveTo(targetBall.x, targetBall.y); // ボールの中心から
        ctx.lineTo(dragInfo.current.currentMouseX, dragInfo.current.currentMouseY); // マウスの位置まで
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)"; // 半透明の赤
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      // 4. ボールの描画
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

  // 1. マウスを押したとき：ボール判定
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // クリックされたボールを探す
    balls.current.forEach((ball, index) => {
        const dx = x - ball.x;
        const dy = y - ball.y;
        if (dx*dx + dy*dy < ball.radius * ball.radius) {
            // ドラッグ開始
            dragInfo.current = {
                isDragging: true,
                ballIndex: index,
                currentMouseX: x,
                currentMouseY: y
            };
            // 掴んだ瞬間に速度をリセット（ピタッと止める）
            ball.vx = 0;
            ball.vy = 0;
        }
    });
  };

  // 2. マウスを動かしたとき：照準の更新
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!dragInfo.current.isDragging) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      dragInfo.current.currentMouseX = e.clientX - rect.left;
      dragInfo.current.currentMouseY = e.clientY - rect.top;
  };

  // 3. マウスを離したとき：発射！
  const handleMouseUp = () => {
      if (!dragInfo.current.isDragging || dragInfo.current.ballIndex === null) return;

      const ball = balls.current[dragInfo.current.ballIndex];
      
      // ベクトル計算（ボールの位置 - マウスの位置）
      // マウスを引いた方向と「逆」に飛ばすため
      const dx = ball.x - dragInfo.current.currentMouseX;
      const dy = ball.y - dragInfo.current.currentMouseY;

      // パワー調整係数（0.1など適当な値を掛けて調整）
      const power = 0.15;

      ball.vx = dx * power;
      ball.vy = dy * power;

      // ドラッグ解除
      dragInfo.current = {
          isDragging: false,
          ballIndex: null,
          currentMouseX: 0,
          currentMouseY: 0
      };
  };

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        // キャンバス外で離しても解除されるようにmouseleaveもつけると親切です
        onMouseLeave={handleMouseUp} 
      />
    </div>
  );
}