import { useMemo, useRef } from "react";
import { DragContext } from "./DragContext";
import type { DragContextType } from "./DragContext";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import './index.scss';

gsap.registerPlugin(Draggable);

type DropZoneProps = {
    children?: React.ReactNode;
    onItemDrop: (itemId: string) => void;
    onItemReset: () => void;
    selectedItemId: string | null;
}

const DropZone = ({ children, onItemDrop, onItemReset, selectedItemId }: DropZoneProps) => {

    const targetZoneRef = useRef<HTMLDivElement>(null);

    const contextValue: DragContextType = useMemo(() => ({
        dropZoneRef: targetZoneRef,
        onDrop: onItemDrop,
        onReset: onItemReset,
        selectedItemId: selectedItemId
    }), [onItemDrop, onItemReset, selectedItemId]);

    const isOccupied = selectedItemId !== null;

    return (
        <DragContext.Provider value={contextValue}>
            <div className="drop-zone-container">
                <div className="item-list">
                    {children}
                </div>
                <div className="target-wrapper">
                    <p>Drop here!</p>
                    <div ref={targetZoneRef} className={`target-box ${isOccupied ? 'occupied' : ''}`}>
                    </div>
                </div>
            </div>
        </DragContext.Provider>
    )

}

export default DropZone;