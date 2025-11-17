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
                    <li><Link to="/gsap">GSAP</Link></li>
                    <li><Link to="/lines">Lines</Link></li>
                    <li><Link to="/scroll">Scroll</Link></li>
                    <li><Link to="/sticker">Sticker</Link></li>
                    <li><Link to="/note">Note</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;