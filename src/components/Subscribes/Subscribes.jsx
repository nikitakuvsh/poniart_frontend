import './Subscribes.css';
import { useNavigate } from 'react-router-dom';
import titleImg from '../../images/icons/subscribeIcon.png';
import klyaksaImg from '../../images/icons/klyaksa.svg';
import flowerFirst from '../../images/icons/flower1.svg';
import flowerSecond from '../../images/icons/flower2.svg';
import flowerThird from '../../images/icons/flower3.svg';
import flowerLast from '../../images/icons/flower4.svg';

const plans = [
    {
        id: 1,
        title: "Разовый",
        subtitle: "(пробный)",
        price: "1 200 ₽",
        color: "#7BC4B3",
        flower: flowerFirst,
        features: [
            "1 занятие",
            "Все материалы включены",
            "Знакомство с атмосферой студии"
        ]
    },
    {
        id: 2,
        title: "Стандарт",
        price: "3 800 ₽",
        color: "#F29C7A",
        flower: flowerSecond,
        features: [
            "4 занятия",
            "Все материалы включены",
            "Срок действия: 1 месяц",
            "Групповые занятия"
        ]
    },
    {
        id: 3,
        title: "Gold",
        price: "6 900 ₽",
        color: "#D8A85C",
        flower: flowerThird,
        features: [
            "8 занятий",
            "Все материалы включены",
            "Срок действия: 2 месяца",
            "Групповые занятия",
            "Скидка 10% на мастер-классы"
        ]
    },
    {
        id: 4,
        title: "PRO",
        price: "9 900 ₽",
        color: "#B59AD6",
        flower: flowerLast,
        features: [
            "12 занятий",
            "Все материалы включены",
            "Срок действия: 3 месяца",
            "Групповые и индивидуальные занятия",
            "Скидка 15%",
            "Приоритетная запись"
        ]
    }
];

export default function Subscribes() {
    const navigate = useNavigate();
    return (
        <section className="subscribes" id='subscriptions'>
            <div className="subscribes__container">

                <div className='title__container'>
                    <img className='title__img' src={titleImg} />
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
                            onClick={() => navigate(`/subscribe/${plan.id}`)}
                        >
                            <div className="subscribe-card__badge" style={{ '--badge-color': plan.color}}>
                                <img className='badge__klyaksa' src={klyaksaImg}/>
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
                                    <img className='subscribe-card__bottom--flower' style={{'--badge-color': plan.color}} src={plan.flower} />
                                    <div className="subscribe-card__price" style={{'--badge-color': plan.color}}>{plan.price}</div>
                                    <button className="subscribe-card__btn" style={{'--badge-color': plan.color}}>
                                        Выбрать
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}