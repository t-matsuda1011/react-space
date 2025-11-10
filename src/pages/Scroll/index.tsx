import TextSetScroll from "../../components/TextSetScroll";
import AnimatedItem from "../../components/AnimatedItem";
import './index.scss';

function Scroll() {
    return (
        <div>
            <TextSetScroll>
                <AnimatedItem 
                    className="my-image-layout"
                    animationOptions={{ startAt: 0, endAt: 30 }}
                >
                    hello world
                </AnimatedItem>
                <AnimatedItem 
                    className="my-text-layout text-1"
                    animationOptions={{ startAt: 2, endAt: 8 }}
                >
                    これは
                </AnimatedItem>
                <AnimatedItem 
                    className="my-text-layout text-2"
                    animationOptions={{ startAt: 8, endAt: 14 }}
                >
                    GSAPを使った
                </AnimatedItem>
                <AnimatedItem 
                    className="my-text-layout text-1"
                    animationOptions={{ startAt: 14, endAt: 20 }}
                >
                    スクロール<br/>アニメーションです
                </AnimatedItem>
                <AnimatedItem 
                    className="my-text-layout text-2"
                    animationOptions={{ startAt: 20, endAt: 26 }}
                >
                    楽しんでください！
                </AnimatedItem>
            </TextSetScroll>
        </div>
    );
}

export default Scroll;