import React from 'react';
import './index.scss';
import './animation'; // レガシーサポート用
import { useSectionScrollAnimation } from './useSectionScrollAnimation';

type SectionScrollProps = {
    children?: React.ReactNode;
    // アニメーションのカスタマイズオプション（オプショナル）
    animationOptions?: {
        x?: number;
        y?: number;
        opacity?: number;
        duration?: number;
        ease?: string;
        start?: string;
        end?: string;
        toggleActions?: string;
        markers?: boolean;
    };
    // フックベースのアニメーションを使用するかどうか
    useHookBasedAnimation?: boolean;
}

const SectionScroll = ({ 
    children, 
    animationOptions = {}, 
    useHookBasedAnimation = true 
}: SectionScrollProps) => {
    // カスタムフックを使用してアニメーションを管理
    const animationRef = useSectionScrollAnimation(
        useHookBasedAnimation ? animationOptions : {}
    );

    return (
        <div 
            className="section-scroll" 
            ref={useHookBasedAnimation ? animationRef : undefined}
        >
            {children}
        </div>
    );
};

export default SectionScroll;