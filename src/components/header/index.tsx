import './index.scss';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <Link to="/">My App</Link>
                </div>
                <ul className="header__link">
                    <li><Link to="/photo">写真ページへ</Link></li>
                    <li><Link to="/gsap">GSAPページへ</Link></li>
                    <li><Link to="/lines">ラインページへ</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;