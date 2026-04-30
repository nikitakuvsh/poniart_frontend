import './Subscribes.css';

const plans = [
    {
        title: "Разовый",
        price: "800 ₽",
        image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg"
    },
    {
        title: "Standart",
        price: "3000 ₽",
        image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg"
    },
    {
        title: "Gold",
        price: "5000 ₽",
        image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg"
    },
    {
        title: "PRO",
        price: "8000 ₽",
        image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg",
    }
];

export default function Subscribes() {
    return (
        <section className="subscribes" id='subscriptions'>
            <div className="subscribes__container">

                <h2 className="subscribes__title">Абонементы</h2>

                <div className="subscribes__list">
                    {plans.map((plan, index) => (
                        <div 
                            className={`subscribe__card ${plan.highlight ? 'active' : ''}`} 
                            key={index}
                        >
                            <div className="subscribe__image">
                                <img src={plan.image} alt={plan.title} />
                            </div>

                            <div className="subscribe__content">
                                <h3>{plan.title}</h3>
                                <p className="price">{plan.price}</p>
                                <button>Купить</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}