import gsap from 'gsap';
import { type RefObject } from 'react';

export type AnimationBoxType = 'fadeIn' | 'slideIn' | 'bounce' | 'circle';

interface AnimationSetup {
    cleanup: () => void;
    tween: gsap.core.Tween | null;
}

export const setupAnimation = (
    scope: RefObject<HTMLElement>,
    animationType: AnimationBoxType
): AnimationSetup => {
    let activeTween: gsap.core.Tween | null = null;
    const ctx = gsap.context(() => {
        switch (animationType) {
            case 'fadeIn':
                activeTween = gsap.from('.animate-box', {
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    repeat: -1,
                    repeatDelay: 1,
                });
                break;
            
            case 'slideIn':
                activeTween = gsap.from('.animate-box', {
                    x: -300,
                    duration: 1.5,
                    ease: 'power2.out',
                    repeat: -1,
                    repeatDelay: 1,
                });
                break;
            
            case 'bounce':
                activeTween = gsap.from('.animate-box', {
                    y: -100,
                    duration: 1, 
                    ease: 'bounce.out',
                    repeat: -1,
                    repeatDelay: 1,
                });
                break;
            case 'circle':
                const params = {radian: 0};
                activeTween = gsap.to(params, {
                    radian: Math.PI * 2,
                    duration: 3,
                    ease: 'power4.inOut',
                    onUpdate: () => {
                        const {radian} = params;
                        const x = Math.cos(radian) * 50;
                        const y = Math.sin(radian) * 50;
                        gsap.set('.animate-box', {x, y});
                    },
                    repeat: -1,
                });
        }
    }, scope);
    return{
        cleanup: () => ctx.revert(),
        tween: activeTween,
    }
};