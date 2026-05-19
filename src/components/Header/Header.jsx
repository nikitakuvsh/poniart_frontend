import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import './Header.css';
import logoImage from '../../images/icons/logo.svg';

export default function Header() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // закрытие по клику вне
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // блок скролла
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    const aButton = document.getElementsByClassName('a--events');

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>

            <div className="header__content">

                <div className="header__logo" onClick={() => {navigate('/#about'); closeMenu(); }}>
                    <img className='header__logo-image' src={logoImage} alt='Пони Арт' title='Творческая студия ПониАрт'/>
                </div>

                <nav className="header__nav-desktop">
                    <a href="#events" onClick={() => navigate('/#events')}>Мероприятия</a>
                    <a href="#subscriptions" onClick={() => navigate('/#subscriptions')}>Абонементы</a>
                    <Link to="/about-subscribe">Об абонементах</Link>
                </nav>

                <button className="header__btn">
                    Записаться
                </button>

                <div
                    className={`header__burger ${menuOpen ? 'is-open' : ''}`}
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

            {/* MOBILE MENU */}
            <nav
                ref={menuRef}
                className={`header__nav-mobile ${menuOpen ? 'is-open' : ''}`}
            >

                {/* кнопка закрытия */}
                <div className="header__close" onClick={closeMenu}>✕</div>

                <a href="#events" onClick={closeMenu}>
                    Мероприятия
                </a>

                <a href="#subscriptions" onClick={closeMenu}>
                    Абонементы
                </a>

                <Link to="/about-subscribe" onClick={closeMenu}>
                    Об абонементах
                </Link>

                <button className="header__btn" onClick={() => {aButton.click(); navigate('/#events'); closeMenu(); }}>
                    Записаться
                </button>
            </nav>

            {menuOpen && <div className="header__overlay" />}
        </header>
    );
}