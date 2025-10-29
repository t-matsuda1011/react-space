import gsap from "gsap";

export const setupHoverAnimation = (el: HTMLElement) => {
  let xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
  let yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

  const handleMouseMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    // 吸い付く感じにするために、差分を少し縮小
    xTo(relX * 0.2);
    yTo(relY * 0.2);
  };

  const handleMouseLeave = () => {
    // 元の位置に戻る
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  el.addEventListener("mousemove", handleMouseMove);
  el.addEventListener("mouseleave", handleMouseLeave);

  // クリーンアップ関数を返す
  return () => {
    el.removeEventListener("mousemove", handleMouseMove);
    el.removeEventListener("mouseleave", handleMouseLeave);
  };
};