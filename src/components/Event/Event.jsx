import './Event.css';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import drawingVideo from '../../video/drawing.mp4';
import drawingPicture from '../../images/pictures/drawing.png';
import figureVideo from '../../video/figure.mp4';
import figurePicture from '../../images/pictures/figure.png';
import ConfirmEventModal from '../ConfirmEventModal/ConfirmEventModal';

const eventsData = [
    {
        id: 1,
        title: "Рисование красками",
        day: "Вторник",
        time: "16:00 – 18:00",
        age: "5–10 лет",
        description: `Дети учатся работать с цветом, кистями и создают собственные картины. 
        Основной упор — на творчество и свободу самовыражения.`,
        media: [
            drawingPicture,
            drawingVideo
        ]
    },
    {
        id: 2,
        title: "Лепка из глины",
        day: "Четверг",
        time: "17:00 – 19:00",
        age: "6–12 лет",
        description: `Работа с глиной развивает моторику и воображение.
        Дети создают фигурки, посуду и забирают работы домой.`,
        media: [
            figurePicture,
            figureVideo
        ]
    }
];

export default function Event() {
    const { id } = useParams();
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const event = eventsData.find(e => e.id === Number(id));

    if (!event) {
        return <div className="event">Мероприятие не найдено</div>;
    }

    return (
    <section className="event">

        <div className="event__container">

            {/* HERO (ОТДЕЛЬНО СВЕРХУ) */}
            <div className="event__hero">
                <h1>{event.title}</h1>

                <div className="event__meta">
                    <span>{event.day}</span>
                    <span>{event.time}</span>
                    <span>Возраст: {event.age}</span>
                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="event__layout">

                {/* LEFT */}
                <div className="event__grid">
                    {event.media.map((item, index) => (
                        <div key={index} className="event__media">
                            {item.includes(".mp4") ? (
                                <video controls>
                                    <source src={item} type="video/mp4" />
                                </video>
                            ) : (
                                <img src={item} alt={event.title} />
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT */}
                <div className="event__description">
                    <h2>Описание</h2>
                    <p>{event.description}</p>

                    <button onClick={() => setConfirmModalOpen(true)}>Записаться</button>
                </div>

            </div>

        </div>

        {confirmModalOpen && (<ConfirmEventModal onClose={() => setConfirmModalOpen(false)} />)}

    </section>
);
}