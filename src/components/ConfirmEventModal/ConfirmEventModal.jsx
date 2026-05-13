import { useEffect } from 'react';
import './ConfirmEventModal.css';

export default function ConfirmEventModal({ onClose }) {

    useEffect(() => {
        const scrollBarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, []);

    return (
        <div className='confirm__modal'>

            <div
                className='confirm__modal-overlay'
                onClick={onClose}
            />

            <div className='confirm__modal-content'>

                <button
                    className='confirm__modal-close'
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className='confirm__modal-title'>
                    Предупреждаем
                </h2>

                <p className='confirm__modal-text'>
                    После нажатия кнопки «Записаться» будет списано одно посещение абонемента.
                    В случае неявки, посещение всё равно будет списано.
                </p>

                <p className='confirm__modal-text'>
                    Введите номер абонемента, который вы хотите использовать.
                </p>

                <input
                    className='confirm__modal-input'
                    type='text'
                    placeholder='Номер абонемента'
                />

                <p className='confirm__modal-text'>
                    Подробнее об условиях —{' '}
                    <a
                        className='confirm__modal-link'
                        href='/about-subscribe'
                    >
                        Об абонементах
                    </a>
                </p>

                <button className='confirm__modal-button'>
                    Записаться
                </button>

            </div>
        </div>
    );
}