import React, {Children, useContext, useEffect, useRef} from "react";
import { TimeLineContext } from "../TextSetScroll/TimeLineContext";
import './index.scss';
import gsap from "gsap";

type AnimatedItemProps = {
    children: React.ReactNode;
    className?: string;
    animationOptions?: {
        startAt?: number; // アニメーション開始位置
        endAt?: number;   // アニメーション終了位置
        x?: number;       // X軸の移動量
        y?: number;       // Y軸の移動量
        opacity?: number; // 透明度の変化量
        rotate?: number;  // 回転角度
        duration?: number; // アニメーションの持続時間
    }
}

const AnimatedItem = ({
    children,
    className,
    animationOptions = {}
}: AnimatedItemProps) => {
    const tl = useContext(TimeLineContext);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!tl || !itemRef.current) return;

        const config = {
            startAt: 0,
            endAt: 0,
            x: 0,
            y: 50,
            opacity: 0,
            rotate: 0,
            duration: 0.5,
            ...animationOptions
        };

        gsap.set(itemRef.current, {
            x: config.x,
            y: config.y,
            opacity: config.opacity,
            rotate: config.rotate
        });

        tl.to(itemRef.current, 
            { 
                x: 0,
                y: 0,
                opacity: 1,
                rotate: 0,
                duration: 0.5    
            }, 
            config.startAt
        );
        tl.to(itemRef.current, 
            { 
                x: config.x,
                y: config.y,
                opacity: config.opacity,
                rotate: config.rotate,
                duration: 0.5    
            }, 
            config.endAt
        );

    }, [tl, animationOptions])

    return (
        <div ref={itemRef} className={className} style={{opacity: 0}}>
            { children }
        </div>
    );
}

export default AnimatedItem;