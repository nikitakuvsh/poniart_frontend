import { useEffect } from 'react';
import './ConfirmAbonementModal.css';

export default function ConfirmAbonementModal({ onClose }) {

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

            <div className='confirm__modal-overlay' onClick={onClose} />

            <div className='confirm__modal-content'>

                <button className='confirm__modal-close' onClick={onClose}>×</button>

                <h2 className='confirm__modal-title'>Рекомендуем</h2>

                <p className='confirm__modal-text'>Перед приобритением абонемента настоятельно просим вас ознакомиться с положением «Об абонементах».</p>

                {/* <input className='confirm__modal-input' type ='text' placeholder='Номер абонемента' /> */}

                <label className='confirm__modal-label'>
                    <input className='confirm__modal-input' type='checkbox' required />
                    Ознакомлен и согласен с положением <a className='confirm__modal-link' href='/about-subscribe' target='_blank'>«Об абонементах»</a>
                </label>

                <button className='confirm__modal-button'>Перейти к оплате</button>

            </div>
        </div>
    );
}