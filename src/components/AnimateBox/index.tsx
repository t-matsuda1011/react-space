import './index.scss'
import { setupAnimation, type AnimationBoxType } from './animation'
import { useEffect, useRef } from 'react';

interface AnimationBoxProps {
    animationType?: AnimationBoxType;
    backgroundColor?: string;
    shape?: 'circle' | 'square';
    text: string;
    width?: string | number;
    height?: string | number;
    fontSize?: string | number;
}

const AnimateBox: React.FC<AnimationBoxProps> = (props) => {

    const { animationType, backgroundColor, shape, text, width, height, fontSize } = props;
    const mainRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);

    const boxStyle: React.CSSProperties = {
        backgroundColor: backgroundColor,
        borderRadius: shape === 'circle' ? '50%' : '0px',
        width: width,
        height: height,
        fontSize: fontSize,
        cursor: 'pointer',
    };

    useEffect(() => {
        if (mainRef.current && animationType) {
            const { cleanup, tween } = setupAnimation(mainRef as React.RefObject<HTMLElement>, animationType);
            animationRef.current = tween;
            return () => {
                cleanup();
                animationRef.current = null;
            };
        }
    }, [animationType]);

    const handleClick = () => {
        const tween = animationRef.current;
        if (tween) {
            if (tween.paused()) {
                tween.play();
            } else {
                tween.pause();
            }
        }
    };

    return (
        <div ref={mainRef} style={{margin: '20px'}} onClick={handleClick}>
            <div className='animate-box' style={boxStyle}>
                {text}
            </div>
        </div>
    );
}

export default AnimateBox;