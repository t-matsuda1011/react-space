import './index.scss';
import CanvasGsap from '../../components/CanvasGsap';
import MagneticButton from '../../components/MagneticButton';
import ScaredText from '../../components/ScaredText';
import FallingText from '../../components/FallingText';

function Note() {
    return (
        <div>
            <FallingText text='こんにちは。この文字が読めますか？' />
            <ScaredText />
            <MagneticButton />
            <CanvasGsap />
        </div>
    );
}

export default Note;