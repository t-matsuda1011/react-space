import './index.scss'
import DropZone from '../../components/DropZone';
import DraggableItem from '../../components/DraggableItem';

function Sticker() {
    return (
        <div className="sticker-page">
            <h1>Sticker Page</h1>
            <DropZone>
                <DraggableItem>
                    <p>Drag me!</p>
                </DraggableItem>
                <DraggableItem>
                    <p>Drag me!</p>
                </DraggableItem>
                <DraggableItem>
                    <p>Drag me!</p>
                </DraggableItem>
                <DraggableItem>
                    <p>Drag me!</p>
                </DraggableItem>
            </DropZone>
        </div>
    );
}

export default Sticker;