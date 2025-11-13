import React, { createContext } from "react";

export type DragContextType = {
    dropZoneRef: React.RefObject<HTMLDivElement | null>;
    onDrop: (itemId: string) => void;
    onReset: () => void;
    selectedItemId: string | null;
};

export const DragContext = createContext<DragContextType | null>(null);