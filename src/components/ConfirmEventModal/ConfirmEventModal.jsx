import { useEffect, useState } from 'react';
import './ConfirmEventModal.css';

export default function ConfirmEventModal({ event, onClose }) {

    const [subscriptionNumber, setSubscriptionNumber] = useState("");
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;

    useEffect(() => {
        const scrollBarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;

        if (event?.dates?.length === 1) {
            setSelectedSchedule(event.dates[0].id);
        }

        const stored = localStorage.getItem("subscriptions");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSubscriptions(parsed);
                if (parsed.length > 0) { setSubscriptionNumber(parsed[0].number) };
            }

            catch (e) { console.error(e); }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [event]);

    const handleBooking = async () => {

        if (!selectedSchedule) {
            alert("Выберите время мероприятия.");
            return;
        }

        if (!subscriptionNumber.trim()) {
            alert("Введите номер абонемента.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`http://${BACKEND_API}/events/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    schedule_id: selectedSchedule,
                    subscription_number: subscriptionNumber.trim()
                })
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.detail || "Не удалось записаться.");
                return;
            }

            alert("Вы успешно записались на мероприятие!");
            onClose();

        } catch (error) {
            console.error(error);
            alert("Ошибка соединения с сервером.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='confirm__modal'>

            <div
                className='confirm__modal-overlay'
                onClick={loading ? undefined : onClose}
            />

            <div className='confirm__modal-content'>

                <button
                    className='confirm__modal-close'
                    onClick={onClose}
                    disabled={loading}
                >
                    ×
                </button>

                <h2 className='confirm__modal-title'>
                    Предупреждаем
                </h2>

                <p className='confirm__modal-text'>
                    После нажатия кнопки «Записаться» будет списано одно посещение
                    абонемента. В случае неявки посещение всё равно считается
                    использованным.
                </p>

                <div className="confirm__modal-schedule">

                    <h3 className="confirm__modal-schedule-title">
                        Выберите удобное время
                    </h3>

                    <div className="confirm__modal-times">

                        {event?.dates?.map(schedule => (

                            <button
                                key={schedule.id}
                                type="button"
                                className={
                                    selectedSchedule === schedule.id
                                        ? "confirm__modal-time active"
                                        : "confirm__modal-time"
                                }
                                onClick={() => setSelectedSchedule(schedule.id)}
                            >

                                <div className="confirm__modal-radio">
                                    {selectedSchedule === schedule.id && (
                                        <div className="confirm__modal-radio-inner" />
                                    )}
                                </div>

                                <div className="confirm__modal-time-info">

                                    <span className="confirm__modal-time-day">
                                        {schedule.day}
                                    </span>

                                    <span className="confirm__modal-time-hours">
                                        {schedule.start_time} — {schedule.end_time}
                                    </span>

                                </div>

                            </button>

                        ))}

                    </div>

                </div>

                <p className='confirm__modal-text'>
                    Введите номер абонемента:
                </p>

                {subscriptions.length > 0 ? (

                    <select
                        className="confirm__modal-select"
                        value={subscriptionNumber}
                        onChange={(e) => setSubscriptionNumber(e.target.value)}
                        disabled={loading}
                    >

                        {subscriptions.map(subscription => (

                            <option
                                key={subscription.id}
                                value={subscription.number}
                            >
                                {subscription.type.toUpperCase()} • №{subscription.number}
                                {" • "}
                                {subscription.used_visits}
                                /
                                {subscription.visit_limit ?? "∞"}
                            </option>

                        ))}

                    </select>

                ) : (

                    <input
                        className='confirm__modal-input'
                        type='text'
                        placeholder='Номер абонемента'
                        value={subscriptionNumber}
                        onChange={(e) => setSubscriptionNumber(e.target.value)}
                        disabled={loading}
                    />

                )}

                <p className='confirm__modal-text'>
                    Подробнее об условиях —{" "}
                    <a
                        className='confirm__modal-link'
                        href='/about-subscribe'
                    >
                        Об абонементах
                    </a>
                </p>

                <button
                    className='confirm__modal-button'
                    onClick={handleBooking}
                    disabled={loading}
                >
                    {loading ? "Записываем..." : "Записаться"}
                </button>

            </div>

        </div>
    );
}