import {useState, useRef, useEffect} from 'react';

    const Test = () => {
        const [count, setCount] = useState(0);
        const prevCount = useRef(0);
        useEffect(() => {
            console.log("描画が完了しました")
            console.log("前回：", prevCount.current, "今回：", count);
            prevCount.current = count;
        });

        return (
            <div>
                <p>Count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Increment</button>
            </div>
        );
    }

export default Test;