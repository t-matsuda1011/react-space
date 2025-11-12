import { useMemo, useRef } from "react";
import { DragContext } from "./DragContext";
import type { DragContextType } from "./DragContext";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import './index.scss';

gsap.registerPlugin(Draggable);

type DropZoneProps = {
    children?: React.ReactNode;
}

const DropZone = ({ children }: DropZoneProps) => {

    const dropZoneRef = useRef<HTMLDivElement>(null);

    const handleDrop = (draggedElement: HTMLElement) => {
        console.log(`「${draggedElement.innerText}がドロップされました！」`)
    };

    const contextValue: DragContextType = useMemo(() => ({
        dropZoneRef: dropZoneRef,
        onDrop: handleDrop
    }), []);

    return (
        <DragContext.Provider value={contextValue}>
            <div ref={dropZoneRef} className="drop-zone">
                {children}
            </div>
        </DragContext.Provider>
    )

}

export default DropZone;