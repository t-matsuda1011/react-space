import PieceCard from '../../components/pieceCard';
import Test from '../../components/Test';
import './index.scss';

function Photo() {

    const photos = Array.from({ length: 300 }, (_, i) => ({
    id: i + 1,
    url: `/images/photo_(${i + 1}).png`,
    title: `Photo ${i + 1}`
    }));

    return (
        <div>
            <h1 className='photo-title'>Light</h1>
            <ul className="photo-list">
                {photos.map(photo => (
                    <PieceCard key={photo.id} props={{ image: photo.url }} />
                ))}
            </ul>
            <Test />
        </div>
    );
}

export default Photo;