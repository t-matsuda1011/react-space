import React, { useEffect, useRef } from "react";
import './index.scss';
import { FallingManager } from "./animation";

type FallingTextProps = {
    text: string;
}

export default function FallingText({ text }: FallingTextProps) {
    const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const manager = new FallingManager(spanRefs.current)
        manager.start();

        return () => manager.stop();
    }, [text]);

    return (
        <div className="falling-text-container">
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    ref={(el) => { spanRefs.current[i] = el; }}
                    className="falling-char"
                >
                    {char}
                </span>
            ))}
        </div>
    );
}