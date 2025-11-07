import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAPプラグインを登録
gsap.registerPlugin(ScrollTrigger);

// アニメーションを初期化する関数
export const initSectionScrollAnimation = (): (() => void) => {
    // ScrollTriggerインスタンスを保存する配列
    const scrollTriggers: ScrollTrigger[] = [];

    // 各.section-scroll要素にアニメーションを適用
    gsap.utils.toArray<HTMLElement>(".section-scroll").forEach((el) => {
        const animation = gsap.from(el, {
            x: 128,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%", // 要素が画面の80%の位置に来たときにアニメーション開始
                end: "bottom 20%",
                toggleActions: "play none none reverse", // スクロール時の動作
                // markers: true, // デバッグ用（本番では削除）
            }
        });

        // ScrollTriggerインスタンスを保存
        if (animation.scrollTrigger) {
            scrollTriggers.push(animation.scrollTrigger);
        }
    });

    // クリーンアップ関数を返す
    return () => {
        scrollTriggers.forEach(trigger => trigger.kill());
        ScrollTrigger.refresh();
    };
};

// レガシーサポート用（既存のコードとの互換性）
// このファイルがimportされた時に自動実行される
// DOM読み込み完了後にアニメーションを初期化
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSectionScrollAnimation();
        });
    } else {
        initSectionScrollAnimation();
    }
}