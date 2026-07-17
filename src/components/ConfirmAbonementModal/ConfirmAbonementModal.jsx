import { useEffect, useState } from 'react';
import './ConfirmAbonementModal.css';

export default function ConfirmAbonementModal({ plan, onClose }) {
  const [isChecked, setIsChecked] = useState(false);
  const [fullName, setFullName] = useState('');
  const BACKEND_API = process.env.REACT_APP_BACKEND_API;

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, []);


  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };


  const handleSubmit = async () => {

    if (!isChecked || !fullName.trim()) {
      return;
    }


    try {
      const response = await fetch(`http://${BACKEND_API}/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Number(
            plan.price
              .replace("₽", "")
              .replace(/\s/g, "")
              .replace(",", ".")
          ),
          description: `Абонемент "${plan.title}"`,
          full_name: fullName.trim(),
          subscription_type: plan.type
        })
      });


      if (!response.ok) {
        throw new Error("Ошибка оплаты");
      }


      const data = await response.json();


      localStorage.setItem(
        "payment_id",
        data.payment_id
      );


      localStorage.setItem(
        "full_name",
        fullName.trim()
      );

      localStorage.setItem("subscription_type", plan.type);


      window.location.href = data.confirmation_url;


    } catch (e) {
      console.error(e);
      alert("Не удалось создать платеж");
    }
  };


  const isDisabled = !isChecked || !fullName.trim();


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
          Рекомендуем
        </h2>


        <p className='confirm__modal-text'>
          Перед приобретением абонемента настоятельно просим вас ознакомиться с положением «Об абонементах».
        </p>

        <p className='confirm__modal-text'>После оплаты обязательно нажмите кнопку "Вернуться на сайт"!</p>


        <label className='confirm__modal-field'>
          ФИО *
          
          <input
            className='confirm__modal-name-input'
            type='text'
            placeholder='Иванов Иван Иванович'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>



        <label className='confirm__modal-label'>

          <input
            className='confirm__modal-input'
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            required
            name='confirm'
          />

          Ознакомлен и согласен с положением{' '}
          
          <a 
            className='confirm__modal-link' 
            href='/about-subscribe' 
            target='_blank' 
            rel='noopener noreferrer'
          >
            «Об абонементах»
          </a>

        </label>


        <button
          className={`confirm__modal-button ${
            isDisabled 
              ? 'confirm__modal-button--disabled' 
              : ''
          }`}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Перейти к оплате
        </button>


      </div>

    </div>
  );
}