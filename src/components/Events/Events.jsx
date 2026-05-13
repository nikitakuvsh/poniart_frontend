import './Events.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmEventModal from '../ConfirmEventModal/ConfirmEventModal';
import paintImage from '../../images/pictures/paint.png';
import titleIco from '../../images/icons/icoTitleSVG.svg';
import flowersTitleImage from '../../images/pictures/eventsFlowers.png';

const eventsData = [
    {
        id: 1,
        title: "Живопись и рисунок",
        day: "Вторник",
        time: "16:00 – 18:00",
        image: paintImage
    },
    {
        id: 2,
        title: "Лепка из глины",
        day: "Четверг",
        time: "17:00 – 19:00",
        image: "https://afishka31.ru/img/actions/2022/24628.jpg"
    },
    {
        id: 3,
        title: "Создание игрушек",
        day: "Суббота",
        time: "14:00 – 16:00",
        image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800"
    }
];

export default function Events() {
    const navigate = useNavigate();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    return (
        <section className="events" id='events'>
            <div className="events__container">
                <div className='title__container'>
                    <img className='events__title-ico' src={titleIco}/>
                    <div>
                        <h2 className="events__title">Мероприятия</h2>
                        <p className='events__subtitle brush'>Творчество, которое вдохновляет</p>
                    </div>
                    <div>
                        <img className='flowers__title right' src={flowersTitleImage} />
                    </div>
                </div>

                <div className="events__list">

                    {eventsData.map((event) => (
                        <div
                            className="event__card"
                            key={event.id}
                            onClick={() => navigate(`event/${event.id}`)}
                        >

                            <div className="event__image">
                                <img src={event.image} alt={event.title} />
                            </div>

                            <div className="event__content">

                                <div className="event__info">
                                    <span className="event__day">{event.day}</span>
                                    <span className="event__time">{event.time}</span>
                                </div>

                                <h3>{event.title}</h3>

                                <button onClick={(e) => { e.stopPropagation(); setConfirmModalOpen(true); }}>Записаться</button>

                            </div>
                        </div>
                    ))}

                </div>
                
                <div className='text-under__container'>
                    <p className="events__text--under">День рождения без банальных застолий? Легко. Свидание, где вы создаёте что-то вместе? Это возможно.</p>
                    <p className='events__text--under'>Приводите гостей или вторую половинку — мы превратим мастер-класс в незабываемый праздник.</p>
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