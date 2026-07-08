import './Help.css';
import helpAnimation from '../../images/animations/support.svg';

export default function Help(){
    return (
        <div className='help'>
            <img className='help__animation' alt='help' src={helpAnimation} />
            <h2 className='help__title'>Возникла проблема?</h2>
            <p className='help__p'>Напишите нам в Telegram и мы обязательно разберёмся</p>
            <a href='https://t.me/nikitapoluchaetcya'>
                <button className='help__button'>Обратиться в поддержку</button>
            </a>
        </div>
    );
}