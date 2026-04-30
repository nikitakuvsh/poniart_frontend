import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__content">

                <div className="header__logo" onClick={() => navigate('/#about')}>
                    Пони Арт
                </div>

                <nav className="header__nav">
                    <a href="#events">Мероприятия</a>
                    <a href="#subscriptions">Абонементы</a>
                    <Link to="/about-subscribe">Об абонементах</Link>
                </nav>

                <button className="header__btn">Записаться</button>

            </div>
        </header>
    );
}