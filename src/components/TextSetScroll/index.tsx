import React from "react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TimeLineContext } from "./TimeLineContext";
import './index.scss';

gsap.registerPlugin(ScrollTrigger);

type TextSetScrollProps = {
    children?: React.ReactNode;
}


const TextSetScroll = ({ children }: TextSetScrollProps) => {

    const [tl, setTl] = useState<gsap.core.Timeline | null>(null);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                pin: true,
                start: "top top",
                end: "+=3000",
                scrub: 1,
            }
        });

        setTl(timeline);

        return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
        };
    }, []);
    
    return (
        <TimeLineContext.Provider value={tl}>
            <div ref={elementRef} className="text-set-scroll__container">
                {children}
            </div>
        </TimeLineContext.Provider>
    );
}

export default TextSetScroll;