import './index.scss';
import { useEffect, useRef } from 'react';
import setupCardHoverAnimation from './animation';

type PieceCard = {
    image: string;
}

type PieceCardProps = {
    props: PieceCard;
}

const PieceCard = ({ props }: PieceCardProps) => {
    const containerRef = useRef<HTMLLIElement | null>(null);
    const circleRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const circle = circleRef.current;
        if (!container || !circle) return;
        const cleanup = setupCardHoverAnimation(container, circle);
        return cleanup;
    }, []);

    return(
        <li className="piece-card" ref={containerRef}>
            <div ref={circleRef}>
                <img src={props.image} alt="" className="piece-card__image"/>
            </div>
        </li>
    )
}

export default PieceCard;