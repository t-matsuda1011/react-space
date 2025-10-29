import gsap from "gsap";

const setupCardHoverAnimation = (
  container: HTMLElement,
  circle: HTMLElement
) => {
  const handleEnter = () => {
    gsap.to(container, { width: 20, height: 20, duration: 0.3 });
    gsap.to(circle, { scale: 1.2, duration: 0.3 });
  };

  const handleLeave = () => {
    gsap.to(container, { width: 30, height: 30, duration: 0.3 });
    gsap.to(circle, { scale: 1, x: 0, y: 0, duration: 0.3 });
  };

  const handleMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const moveX = ((relX - rect.width / 2) / rect.width) * 20;
    const moveY = ((relY - rect.height / 2) / rect.height) * 20;

    gsap.to(circle, {
      x: moveX,
      y: moveY,
      ease: "power2.out",
      duration: 0.3,
    });
  };

  container.addEventListener("mouseenter", handleEnter);
  container.addEventListener("mouseleave", handleLeave);
  container.addEventListener("mousemove", handleMove);

  // 🔧 クリーンアップ関数を返す（ReactのuseEffectで使う）
  return () => {
    container.removeEventListener("mouseenter", handleEnter);
    container.removeEventListener("mouseleave", handleLeave);
    container.removeEventListener("mousemove", handleMove);
  };
};

export default setupCardHoverAnimation;