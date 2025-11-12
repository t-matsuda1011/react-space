import './index.scss'
import DropZone from '../../components/DropZone';
import DraggableItem from '../../components/DraggableItem';

function Sticker() {
    return (
        <div className="sticker-page">
            <DropZone>
                <DraggableItem>
                    <img src="/images/blue_fukumimi.png" alt="" />
                </DraggableItem>
                <DraggableItem>
                    <img src="/images/orange.png" alt="" />
                </DraggableItem>
                <DraggableItem>
                    <img src="/images/sticker_01.png" alt="" />
                </DraggableItem>
                <DraggableItem>
                    <p>Drag me!</p>
                </DraggableItem>
            </DropZone>
        </div>
    );
}

export default Sticker;