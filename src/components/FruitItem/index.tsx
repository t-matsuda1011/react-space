import { useEffect, useRef } from 'react';
import './index.scss'
import { setupHoverAnimation } from './animation';

type Fruit = {
    id: number;
    name: string;
    image?: string;
}

type FruitItemProps = {
    fruit: Fruit;
}

const FruitItem = ({ fruit }: FruitItemProps) => {
    const ref = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        const cleanup = setupHoverAnimation(ref.current);
        return cleanup;
    }, []);

    return (
        <li ref={ref} className='fruit-item'>
            <p>{fruit.name}</p>
            {fruit.image && <img src={fruit.image} alt={fruit.name} />}
        </li>
    );
}

export default FruitItem;