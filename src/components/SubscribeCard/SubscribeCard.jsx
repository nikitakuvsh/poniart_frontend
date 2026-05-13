import { useParams } from "react-router-dom";
import "./SubscribeCard.css";

export default function SubscribeCard() {
    const { id } = useParams();

    const plans = [
        {
            id: 1,
            title: "Разовый",
            price: "800 ₽",
            descr: "Разовое посещение на мастер класс или групповое занятие. Оформляется на одного ребёнка. К абонементу привязывается ФИО ребёнка и присваивается индивидуальный номер",
            image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg"
        },
        {
            id: 2,
            title: "Standart",
            price: "3000 ₽",
            descr: "Абонемент STANDART рассчитан на 10 посещений групповых занятий. Не действует на мастер классы. Оформляется на одного ребёнка. К абонементу привязывается ФИО ребёнка и присваивается индивидуальный номер",
            image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg"
        },
        {
            id: 3,
            title: "Gold",
            price: "5000 ₽",
            descr: "Абонемент GOLD рассчитан на 20 посещений групповых занятий. Не действует на мастер классы. Оформляется на одного ребёнка. К абонементу привязывается ФИО ребёнка и присваивается индивидуальный номер",
            image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg"
        },
        {
            id: 4,
            title: "PRO",
            price: "8000 ₽",
            descr: "Абонемент PRO рассчитан на 30 посещений групповых занятий. Действует на мастер классы. Оформляется на одного ребёнка. К абонементу привязывается ФИО ребёнка и присваивается индивидуальный номер",
            image: "https://wellness-class.ru/bitrix/templates/wellness/images/cards/86gold.svg",
        }
    ];

    const plan = plans.find(p => p.id === Number(id));

    if (!plan) {
        return <div className="subscribe__card">Абонемент не найден</div>;
    }

return (
    <div className="about-subscribe">

        <div className="about-subscribe__card">

            {/* LEFT */}
            <div className="about-subscribe__image">
                <img src={plan.image} alt={plan.title} />
            </div>

            {/* RIGHT */}
            <div className="about-subscribe__content">

                <h1 className="about-subscribe__title">
                    {plan.title}
                </h1>

                <p className="about-subscribe__description">
                    {plan.descr}
                </p>

                <div className="about-subscribe__price">
                    {plan.price}
                </div>

                <button className="about-subscribe__button">
                    Оплатить
                </button>

            </div>

        </div>

    </div>
);
}