import './Subscribes.css';
import { useState } from 'react';
import titleImg from '../../images/icons/subscribeIcon.png';
import klyaksaImg from '../../images/icons/klyaksa.svg';
import flowerFirst from '../../images/icons/flower1.svg';
import flowerSecond from '../../images/icons/flower2.svg';
import flowerThird from '../../images/icons/flower3.svg';
import flowerLast from '../../images/icons/flower4.svg';
import ConfirmAbonementModal from '../ConfirmAbonementModal/ConfirmAbonementModal';

const plans = [
    {
        id: 1,
        title: "Разовый",
        type: "trial",
        subtitle: "(для новичков)",
        price: "1000 ₽",
        color: "#7BC4B3",
        flower: flowerFirst,
        features: [
            "1 занятие",
            "Все материалы включены",
            "Знакомство с преподавателем",
            "Подбор направления обучения",
            "Мини-разбор уровня подготовки"
        ]
    },
    {
        id: 2,
        title: "Стандарт",
        type: "standard",
        badge: "⭐️ Самый популярный",
        price: "2000 ₽",
        color: "#F29C7A",
        flower: flowerSecond,
        features: [
            "4 занятия",
            "Все материалы включены",
            "Индивидуальный подход",
            "Возможность выбрать удобное расписание",
            "Поддержка преподавателя между занятиями"
        ]
    },
    {
        id: 3,
        title: "Оптимальный",
        type: "optimal",
        badge: "🔥 Лучшее соотношение цена/качество",
        price: "5 800 ₽",
        color: "#D8A85C",
        flower: flowerThird,
        features: [
            "8 занятий",
            "Все материалы включены",
            "Скидка 10% на мастер-классы",
            "Подходит для регулярных занятий",
            "Возможность попробовать разные техники"
        ]
    },
    {
        id: 4,
        title: "Про",
        type: "pro",
        badge: "👑 Максимальный результат",
        price: "5 400 ₽",
        color: "#B59AD6",
        flower: flowerLast,
        features: [
            "Один раз в неделю 1.5 — 2 часа",
            "Подготовка к поступлению в художественную школу",
            "Индивидуальный план поступления",
            "Пробный вступительный экзамен в формате школы",
            "Отчёт для родителей",
            "Помощь в создании и оформлении портфолио"
        ]
    }
];

export default function Subscribes() {
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <section className="subscribes" id='subscriptions'>
            <div className="subscribes__container">

                <div className='title__container'>
                    <img className='title__img' src={titleImg} alt="title" />
                    <div className='title__text-container'>
                        <h2 className="subscribes__title">Абонементы</h2>
                        <p className='subscribes__subtitle brush'>Выберите формат, который подходит именно вам</p>
                    </div>
                </div>

                <div className="subscribes__list">
                    {plans.map((plan) => (
                        <div
                            className="subscribe-card"
                            key={plan.id}
                            onClick={() => {
                                setSelectedPlan(plan);
                                setConfirmModalOpen(true);
                            }}
                        >
                            <div className="subscribe-card__badge" style={{ '--badge-color': plan.color }}>
                                {plan.badge && (
                                    <p className="badge__absolute">
                                        {plan.badge}
                                    </p>
                                )}
                                <img className='badge__klyaksa' src={klyaksaImg} alt="klyaksa" />
                                <h3 className='badge__title brush'>{plan.title}</h3>
                                {plan.subtitle && <span>{plan.subtitle}</span>}
                            </div>

                            <div className="subscribe-card__body">
                                <ul className="subscribe-card__features">
                                    {plan.features.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>

                                <div className="subscribe-card__bottom">
                                    <img className='subscribe-card__bottom--flower' style={{ '--badge-color': plan.color }} src={plan.flower} alt="flower" />
                                    <div className="subscribe-card__price" style={{ '--badge-color': plan.color }}>{plan.price}</div>
                                    <button className="subscribe-card__btn" style={{ '--badge-color': plan.color }}>
                                        Выбрать
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {confirmModalOpen && (
                    <ConfirmAbonementModal plan={selectedPlan} onClose={() => setConfirmModalOpen(false)} />
                )}

            </div>
        </section>
    );
}