import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAPプラグインを登録
gsap.registerPlugin(ScrollTrigger);

// カスタムフックのオプション型
interface SectionScrollOptions {
    x?: number;
    y?: number;
    opacity?: number;
    duration?: number;
    ease?: string;
    start?: string;
    end?: string;
    toggleActions?: string;
    markers?: boolean;
}

/**
 * スクロールアニメーションのカスタムフック
 * @param options アニメーションのオプション設定
 * @returns 要素につけるためのref
 */
export const useSectionScrollAnimation = (options: SectionScrollOptions = {}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        // デフォルト設定
        const defaultOptions: Required<SectionScrollOptions> = {
            x: 128,
            y: 0,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
        };

        // オプションをマージ
        const config = { ...defaultOptions, ...options };

        // アニメーションを作成
        const animation = gsap.from(element, {
            x: config.x,
            y: config.y,
            opacity: config.opacity,
            duration: config.duration,
            ease: config.ease,
            scrollTrigger: {
                trigger: element,
                start: config.start,
                end: config.end,
                toggleActions: config.toggleActions,
                markers: config.markers,
            }
        });

        // クリーンアップ関数
        return () => {
            if (animation.scrollTrigger) {
                animation.scrollTrigger.kill();
            }
            animation.kill();
        };
    }, [options]);

    return elementRef;
};