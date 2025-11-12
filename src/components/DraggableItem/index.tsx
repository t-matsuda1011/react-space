import React, { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { DragContext } from "../DropZone/DragContext";
import './index.scss';

gsap.registerPlugin(Draggable);

let globalZIndexCounter = 10;

type DraggableItemProps = {
    children: React.ReactNode;
}

const DraggableItem = ({ children }: DraggableItemProps) => {
    
    const context = useContext(DragContext);
    const dragItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!dragItemRef.current || !context) {
            return;
        }

        const { dropZoneRef, onDrop } = context;

        Draggable.create(dragItemRef.current, {
            type: "x,y",
            bounds: "body",
            onDragStart: function () {
                globalZIndexCounter ++;
                gsap.set(this.target, { zIndex: globalZIndexCounter });
            },
            onDragEnd: function () {
                if (dropZoneRef.current && this.hitTest(dropZoneRef.current, "50%")) {
                    onDrop(dragItemRef.current!);
                } else {
                    gsap.to(this.target, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
                }
            }
        });
    }, [context]);

    return (
        <div ref={dragItemRef} className="draggable-item">
            {children}
        </div>
    );
}

export default DraggableItem;