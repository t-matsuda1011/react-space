import React, { createContext } from "react";

export type DragContextType = {
    dropZoneRef: React.RefObject<HTMLDivElement | null>;
    onDrop: (draggedElement: HTMLElement) => void;
};

export const DragContext = createContext<DragContextType | null>(null);