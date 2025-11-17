import { useRef, useEffect } from "react";
import gsap from "gsap";

type Ball = {
    x: number;
    y: number;
    radius: number;
    originalRadius: number;
    color: string;
}

export default function CanvasGsap({ count = 5 }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const balls = useRef<Ball[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 800;

        balls.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 30,
            originalRadius: 30,
            color: "#093",
        }));

        // ---- renderループは一度開始したら永遠に動き続ける ----
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < balls.current.length; i++) {
                for (let j = i + 1; j < balls.current.length; j++) {
                    const ballA = balls.current[i];
                    const ballB = balls.current[j];

                    const dx = ballA.x - ballB.x;
                    const dy = ballA.y - ballB.y;
                    const distSq = dx * dx + dy * dy;

                    const minDist = ballA.radius + ballB.radius;

                    if (distSq < minDist * minDist) {
                        // アニメーション: 衝突したら赤くなり、一時的に拡大する
                        // (GSAPのoverwrite: "auto" で連続呼び出し時の動作をスムーズにします)
                        gsap.to([ballA, ballB], {
                            radius: 50,
                            duration: 0.2,
                            yoyo: true, // 元に戻る
                            repeat: 1,
                            overwrite: "auto", // 新しいアニメーションで上書き
                            ease: "power1.out"
                        });
                    }
                }
            }

            for (const ball of balls.current) {
                ctx.fillStyle = "#093";
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(render);
        };

        render();
    }, [count]);

    // ---- クリックイベントはここに保持 ----
    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas!.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        balls.current.forEach((ball) => {
            const dx = clickX - ball.x;
            const dy = clickY - ball.y;
            const distSq = dx * dx + dy * dy;
            const rSq = ball.radius * ball.radius;

            if (distSq < rSq) {
                gsap.to(ball, {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    duration: 1,
                    ease: "back.out(1.7)"
                })
            }
        })
    };


    return (
        <div>
            <canvas ref={canvasRef} onClick={handleClick} />
        </div>
    );
}
