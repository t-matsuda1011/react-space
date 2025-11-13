import React, { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { DragContext } from "../DropZone/DragContext";
import './index.scss';

gsap.registerPlugin(Draggable);

let globalZIndexCounter = 1000;

type DraggableItemProps = {
    children: React.ReactNode;
    itemId: string;
}

const DraggableItem = ({ children, itemId }: DraggableItemProps) => {
    
    const context = useContext(DragContext);
    const dragItemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!dragItemRef.current || !context) {
            return;
        }

        const { dropZoneRef, onDrop, onReset, selectedItemId } = context;

        Draggable.create(dragItemRef.current, {
            type: "x,y",
            bounds: window,
            onDragStart: function () {
                globalZIndexCounter++;
                gsap.set(this.target, { zIndex: globalZIndexCounter });
            },
            onDragEnd: function () {
                const targetZone = dropZoneRef.current;
                const isHit = targetZone && this.hitTest(targetZone, "50%");
                const isOccupied = selectedItemId !== null;
                const amIselected = selectedItemId === itemId;

                if (isHit) {
                    if (!isOccupied || amIselected) {
                        onDrop(itemId);

                        const targetRect = targetZone.getBoundingClientRect();
                        const itemRect = this.target.getBoundingClientRect();

                        const targetCx = targetRect.left + targetRect.width / 2;
                        const targetCy = targetRect.top + targetRect.height / 2;
                        const itemCx = itemRect.left + itemRect.width / 2;
                        const itemCy = itemRect.top + itemRect.height / 2;

                        const moveX = targetCx - itemCx;
                        const moveY = targetCy - itemCy;

                        gsap.to(this.target, {
                            x: `+=${moveX}`,
                            y: `+=${moveY}`,
                            duration: 0.4,
                            ease: "back.out(1.7)"
                        });
                    }
                    else {
                        gsap.to(this.target, { x: 0, y: 0, duration: 0.4, ease: "power2.out" })
                    }
                }
                else {
                    if (amIselected) {
                        onReset();
                    }
                }
            }
        });
    }, [context, itemId]);

    return (
        <div ref={dragItemRef} className="draggable-item">
            {children}
        </div>
    );
}

export default DraggableItem;