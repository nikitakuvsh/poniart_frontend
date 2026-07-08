import { useEffect, useState } from "react";
import "./MySubscribes.css";

export default function MySubscribes() {

    const [subscriptions, setSubscriptions] = useState([]);


    useEffect(() => {
    const loadSubscriptions = async () => {
        const savedSubscriptions = JSON.parse(
            localStorage.getItem("subscriptions") || "[]"
        );


        if (!savedSubscriptions.length) {
            return;
        }


        try {
            const updatedSubscriptions = await Promise.all(
                savedSubscriptions.map(async (item) => {

                    const response = await fetch(
                        `http://localhost:8000/subscriptions/${item.number}`
                    );


                    if (!response.ok) {
                        return item;
                    }


                    return await response.json();

                })
            );


            setSubscriptions(updatedSubscriptions);


            localStorage.setItem(
                "subscriptions",
                JSON.stringify(updatedSubscriptions)
            );


        } catch (error) {

            console.error(
                "Subscription error:",
                error
            );


            setSubscriptions(savedSubscriptions);

        }
    };


    loadSubscriptions();

}, []);



    const getTypeName = (type) => {
        const types = {
            pro: "PRO",
            optimal: "Оптимальный",
            standard: "Стандарт",
            trial: "Пробный"
        };

        return types[type] || "Абонемент";
    };



    return (
        <section className="my-subscribes">
            <div className="my-subscribes__container">

                <h1 className="my-subscribes__title">
                    Мои абонементы
                </h1>

                {
                    subscriptions.length ? (
                        <div className="my-subscribes__list">

                            {subscriptions.map((subscription) => (
                                <div
                                    className="my-subscribes__item"
                                    key={subscription.number}
                                >

                                    <div className="my-subscribes__badge">
                                        {getTypeName(subscription.type)}
                                    </div>


                                    <div className="my-subscribes__row">
                                        <span>
                                            Владелец
                                        </span>

                                        <strong>
                                            {subscription.full_name}
                                        </strong>
                                    </div>


                                    <div className="my-subscribes__row">
                                        <span>
                                            Номер абонемента
                                        </span>

                                        <strong className="my-subscribes__number">
                                            {subscription.number}
                                        </strong>
                                    </div>


                                    <div className="my-subscribes__row">
                                        <span>
                                            Посещения
                                        </span>

                                        {
                                            subscription.type === "pro" ? (
                                                <strong>
                                                    Безлимит *
                                                </strong>
                                            ) : (
                                                <strong>
                                                    {subscription.used_visits} из {subscription.visit_limit}
                                                </strong>
                                            )
                                        }
                                    </div>


                                    {
                                        subscription.type === "pro" && (
                                            <p className="my-subscribes__pro-info">
                                                * Одно посещение в неделю
                                            </p>
                                        )
                                    }

                                </div>
                            ))}

                        </div>
                    ) : (
                        <p className="my-subscribes__empty">
                            У вас пока нет активных абонементов.
                        </p>
                    )
                }


                <p className="my-subscribes__hint">
                    Сохраняйте номера абонементов.
                    Они понадобятся при записи и посещении мероприятий.
                </p>

            </div>
        </section>
    );
}