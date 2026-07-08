import './Footer.css';
import telegramIcon from '../../images/icons/telegram.svg';
import maxIcon from '../../images/icons/max.webp';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__info'>
          <p className='footer__inn'>ИНН: 504713417334</p>
          <p className='footer__name'>Понизовкин Илья Юрьевич</p>
        </div>

        <div className='footer__subscribe'>
          <p className='footer__subscribe-text'>
            Будьте в курсе новостей — <br />
            подписывайтесь на наши сообщества!
          </p>
        </div>

        <div className='footer__social-wrapper'>
          <div className='footer__social'>
            <a className='footer__link' href='https://t.me/poniart' target='_blank' rel='noopener noreferrer' aria-label='Telegram'>
              <img className='footer__link-icon' alt='Telegram' title='Мы в Telegram' src={telegramIcon} />
              <span className='footer__link-label'>Telegram</span>
            </a>

            <a className='footer__link' href='https://max.ru/join/7hyju1J1y9VroLN3XNNWFzWCxnWLjXLOPzbUH_SfJP4' target='_blank' rel='noopener noreferrer' aria-label='MAX'>
              <img className='footer__link-icon' alt='MAX' title='Мы в MAX' src={maxIcon} />
              <span className='footer__link-label'>MAX</span>
            </a>
          </div>
        </div>
      </div>

      <div className='footer__bottom'>
        <p className='footer__copyright'>
          © {new Date().getFullYear()} Все права защищены
        </p>
      </div>
    </footer>
  );
}