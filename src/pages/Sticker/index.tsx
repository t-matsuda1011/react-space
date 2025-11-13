import './index.scss'
import { useState } from 'react';
import { stickerData, type StickerDataType } from '../../data/stickerData';
import DropZone from '../../components/DropZone';
import DraggableItem from '../../components/DraggableItem';

function Sticker() {
    const [ selectedItem, setSelectedItem ] = useState<StickerDataType | null>(null);

    const handleDrop = (itemId: string) => {
        const item = stickerData.find((d) => d.id === itemId);
        if (item) setSelectedItem(item);
    }

    const handleReset = () => {
        setSelectedItem(null);
    }

    return (
    <div className="sticker-page">
            <DropZone 
                onItemDrop={handleDrop}
                onItemReset={handleReset}
                selectedItemId={selectedItem?.id || null}
            >
                {stickerData.map((item) => (
                    <DraggableItem key={item.id} itemId={item.id}>
                        <img src={item.imagePath} alt={item.name} />
                    </DraggableItem>
                ))}
            </DropZone>
            <div className="detail-zone">
                {selectedItem ? (
                    <div>
                        <h3>{selectedItem.name}</h3>
                        <p>{selectedItem.description}</p>
                        {selectedItem.imagePathThum && (<img src={selectedItem.imagePathThum} alt={selectedItem.name} />) }
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
}

export default Sticker;