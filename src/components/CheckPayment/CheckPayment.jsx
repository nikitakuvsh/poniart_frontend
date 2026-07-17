import { useEffect, useState } from "react";
import "./CheckPayment.css";
import checkPaymentAnimation from "../../images/animations/Payment.svg";
import successAnimation from '../../images/animations/success.svg';

export default function CheckPayment() {
    const [status, setStatus] = useState("pending");
    const [subscriptionNumber, setSubscriptionNumber] = useState(null);
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;


    useEffect(() => {

        const paymentId = localStorage.getItem("payment_id");


        if (!paymentId) {
            setStatus("not_found");
            return;
        }


        let intervalId;


        const getSubscription = async () => {
    try {
        const response = await fetch(
            `https://${BACKEND_API}/subscriptions/by-payment/${paymentId}`
        );

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        setSubscriptionNumber(data.number);


        const savedSubscriptions = JSON.parse(
            localStorage.getItem("subscriptions") || "[]"
        );


        const exists = savedSubscriptions.some(
            item => item.number === data.number
        );


        if (!exists) {

            savedSubscriptions.push({
                number: data.number,
                full_name: data.full_name,
                type: data.type,
                used_visits: data.used_visits,
                visit_limit: data.visit_limit,
                weekly_limit: data.weekly_limit
            });


            localStorage.setItem(
                "subscriptions",
                JSON.stringify(savedSubscriptions)
            );

        }


    } catch (error) {

        console.error(
            "Subscription error:",
            error
        );

    }
};



        const checkPayment = async () => {

            try {

                const response = await fetch(
                    `https://${BACKEND_API}/payments/status/${paymentId}`
                );


                if (!response.ok) {
                    throw new Error("Ошибка проверки платежа");
                }


                const data = await response.json();


                setStatus(data.status);



                if (data.status === "succeeded") {

                    await getSubscription();


                    localStorage.removeItem(
                        "payment_id"
                    );


                    clearInterval(intervalId);

                }



                if (data.status === "canceled") {

                    localStorage.removeItem(
                        "payment_id"
                    );


                    clearInterval(intervalId);

                }



            } catch (error) {

                console.error(
                    "Payment check error:",
                    error
                );


                setStatus("error");


                clearInterval(intervalId);

            }

        };



        checkPayment();


        intervalId = setInterval(
            checkPayment,
            2000
        );



        return () => {
            clearInterval(intervalId);
        };


    }, []);





    const content = {

        pending: (
            <>
                <h2>Проверяем ваш платёж...</h2>
                <p>Если вы уже оплатили, статус обновится автоматически.</p>
            </>
        ),


        waiting_for_capture: (
            <>
                <h2>Платёж подтверждается...</h2>
                <p>Обычно это занимает несколько секунд.</p>
            </>
        ),


        succeeded: (
            <>
                <img 
                    className="success-animation" 
                    src={successAnimation} 
                    alt="success" 
                />

                <h2>Оплата прошла успешно!</h2>

                <p>
                    Ваш абонемент активирован.
                </p>


                {subscriptionNumber && (
                    <div className="subscription-number">

                        <span>
                            Номер вашего абонемента
                        </span>


                        <strong>
                            {subscriptionNumber}
                        </strong>


                        <p>
                            Обязательно сохраните этот номер.
                            Он понадобится при записи на мероприятия.
                        </p>

                    </div>
                )}

            </>
        ),


        canceled: (
            <>
                <h2>❌ Оплата отменена</h2>

                <p>
                    Платёж не был завершён. Вы можете оформить новый.
                </p>

                <p>
                    Если деньги списались, а вы видите это уведомление,
                    обратитесь в поддержку
                </p>
            </>
        ),


        not_found: (
            <>
                <h2>Платёж не найден</h2>

                <p>
                    Возможно, ссылка устарела.
                </p>
            </>
        ),


        error: (
            <>
                <h2>⚠️ Ошибка проверки</h2>

                <p>
                    Не удалось проверить статус платежа.
                </p>
            </>
        )

    };





    return (
        <section className="payment-success">

            <div className="payment-success__container">


                {
                    ["pending", "waiting_for_capture"].includes(status) && (
                        <div className="payment-success__loader">

                            <img
                                className="payment-success__animation"
                                src={checkPaymentAnimation}
                                alt="payment"
                            />

                        </div>
                    )
                }



                <div className="payment-success__content">
                    {content[status]}
                </div>



            </div>

        </section>
    );
}