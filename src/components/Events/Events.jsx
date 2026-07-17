import './Events.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ConfirmEventModal from '../ConfirmEventModal/ConfirmEventModal';

import paintImage from '../../images/pictures/eventDrawingHolst.png';
import lepkaImage from '../../images/pictures/lepka.png';

import titleIco from '../../images/icons/icoTitleSVG.svg';
import flowersTitleImage from '../../images/pictures/eventsFlowers.png';

import saglImage from '../../images/pictures/sagl.jpg';

const eventImages = {
    1: paintImage,
    2: lepkaImage,
    3: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800"
};

export default function Events() {
    const navigate = useNavigate();
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;

    const [events, setEvents] = useState([]);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    useEffect(() => {
        fetch(`http://${BACKEND_API}/events`)
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch(console.error);
    }, []);

    // Функция для получения изображения события
    const getEventImage = (eventId) => {
        // Если есть в eventImages - используем
        if (eventImages[eventId]) {
            return eventImages[eventId];
        }
        // Иначе используем дефолтное изображение
        return saglImage;
    };

    return (
        <section className="events" id="events">
            <div className="events__container">

                <div className="title__container">
                    <img
                        className="events__title-ico"
                        src={titleIco}
                        alt=""
                    />

                    <div>
                        <h2 className="events__title">Мероприятия</h2>
                        <p className="events__subtitle brush">
                            Творчество, которое вдохновляет
                        </p>
                    </div>

                    <div>
                        <img
                            className="flowers__title right"
                            src={flowersTitleImage}
                            alt=""
                        />
                    </div>
                </div>

                <div className="events__list">
                    {events.map((event) => {
                        const firstDate = event.dates?.[0];
                        const imageUrl = getEventImage(event.id);

                        return (
                            <div
                                className="event__card"
                                key={event.id}
                                onClick={() => navigate(`event/${event.id}`)}
                            >
                                <div className="event__image">
                                    <img
                                        src={imageUrl}
                                        alt={event.title}
                                    />
                                </div>

                                <div className="event__content">
                                    <div className="event__info">

                                        {event.dates?.map((date) => (

                                            <div
                                                key={date.id}
                                                className="event__date"
                                            >
                                                <div className='event__day--block'>
                                                    <span className="event__day">
                                                        {date.day}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="event__time">
                                                        {date.start_time} – {date.end_time}
                                                    </span>
                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                    <h3>{event.title}</h3>

                                    <button
                                        onClick={() => {
                                            navigate(`event/${event.id}`)
                                        }}
                                    >
                                        Записаться
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-under__container">
                    <p className="events__text--under">
                        День рождения без банальных застолий? Легко. Свидание,
                        где вы создаёте что-то вместе? Это возможно.
                    </p>

                    <p className="events__text--under">
                        Приводите гостей или вторую половинку — мы превратим
                        мастер-класс в незабываемый праздник.
                    </p>
                </div>
            </div>

            {confirmModalOpen && (
                <ConfirmEventModal
                    onClose={() => setConfirmModalOpen(false)}
                />
            )}
        </section>
    );
}