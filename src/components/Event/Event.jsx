import './Event.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import ConfirmEventModal from '../ConfirmEventModal/ConfirmEventModal';

import drawingPicture from '../../images/pictures/drawing.png';
import secondDrawingPicture from '../../images/pictures/secondDrawing.png';
import modelingImage from '../../images/pictures/modeling.png';
import secondModelingImage from '../../images/pictures/secondModeling.png';

import eventInfoImage from '../../images/pictures/eventsFlowers.png';

import calendarIcon from '../../images/icons/calendar.svg';
import twoPeopleIcon from '../../images/icons/twopeople.svg';
import seatsIcon from '../../images/icons/seats.svg';
import clockIcon from '../../images/icons/clock.svg';
import paletteIcon from '../../images/icons/palette.svg';
import canvasIcon from '../../images/icons/canvas.svg';
import apronIcon from '../../images/icons/apron.svg';
import teaIcon from '../../images/icons/tea.svg';
import brushImage from '../../images/pictures/brush.png';

const fallback = {
    1: {
        previewImage: eventInfoImage,
        expectationImage: [drawingPicture, secondDrawingPicture]
    },
    2: {
        previewImage: eventInfoImage,
        expectationImage: [modelingImage, secondModelingImage]
    }
};

export default function Event() {
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/events/${id}`)
            .then(res => res.json())
            .then(setEvent)
            .catch(console.error);
    }, [id]);

    if (!event) {
        return <div className="event">Загрузка...</div>;
    }

    const eventId = Number(id);
    const fb = fallback[eventId];

    // 1️⃣ Для event-info__image-img: ТОЛЬКО fallback для id 1 и 2
    const previewImage = fb?.previewImage || null;

    // 2️⃣ Для what-will-happen__image: 
    //    - для id 1 и 2 используем fallback
    //    - для остальных id используем серверные картинки
    let expectationImages;
    if (fb) {
        // Для id 1 и 2 - fallback
        expectationImages = fb.expectationImage;
    } else {
        // Для остальных id - серверные картинки
        expectationImages = [event.image_1, event.image_2].filter(Boolean);
        // Если нет серверных картинок, используем заглушку
        if (expectationImages.length === 0) {
            expectationImages = [eventInfoImage, eventInfoImage];
        }
        // Если только одна картинка, дублируем её
        if (expectationImages.length === 1) {
            expectationImages = [expectationImages[0], expectationImages[0]];
        }
    }

    const firstDate = event.dates?.[0];

    const programItems = event.program?.length
        ? event.program
            .map(p => p.text)
            .join(' ')
            .split('.')
            .map(s => s.trim())
            .filter(Boolean)
        : [];

    const getDurationText = (start, end) => {
        if (!start || !end) return "";

        const [sh, sm = "0"] = start.split(":");
        const [eh, em = "0"] = end.split(":");

        const startMinutes = Number(sh) * 60 + Number(sm);
        const endMinutes = Number(eh) * 60 + Number(em);

        let diff = endMinutes - startMinutes;
        if (diff <= 0) return "";

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        if (minutes === 0) {
            return `${hours} ${hours === 1 ? "час" : hours < 5 ? "часа" : "часов"}`;
        }

        const hourText =
            hours === 1 ? "час" : hours < 5 ? "часа" : "часов";

        return `${hours} ${hourText} ${minutes} мин`;
    };

    return (
        <section className="event">

            <div className='event__container'>
                <div className='event-info__flex'>

                    <div className='event-info__text'>
                        <h2 className='event-info__title'>{event.title}</h2>

                        <p className='event-info__subtitle'>
                            Творчество, которое вдохновляет
                        </p>

                        <p className='event-info__p'>
                            {event.subtitle}
                        </p>

                        <button
                            className='event-info__button button--enter-event'
                            onClick={() => setConfirmModalOpen(true)}
                        >
                            Записаться на мероприятие
                        </button>
                    </div>

                    <div className='event-info__image'>
                        {/* 1️⃣ ТОЛЬКО для id 1 и 2, ТОЛЬКО из fallback */}
                        {previewImage && (
                            <img
                                className='event-info__image-img'
                                src={previewImage}
                                alt={event.title}
                            />
                        )}
                    </div>

                </div>

                <div className='event-info__block'>

                    <div className='event-info__small-block'>
                        <img src={calendarIcon} className='event-info__small-block-image' alt="Календарь" />

                        <div>
                            <h4 className='event-info__small-block-title'>
                                Дата и время
                            </h4>

                            <p className='event-info__small-block-text'>
                                {firstDate?.day}
                            </p>

                            <p className='event-info__small-block-text'>
                                {firstDate
                                    ? `${firstDate.start_time} – ${firstDate.end_time}`
                                    : ""}
                            </p>
                        </div>
                    </div>

                    <div className='event-info__small-block'>
                        <img src={twoPeopleIcon} className='event-info__small-block-image' alt="Возраст" />

                        <div>
                            <h4 className='event-info__small-block-title'>
                                Возраст
                            </h4>

                            <p className='event-info__small-block-text'>
                                {event.child_age} лет
                            </p>
                        </div>
                    </div>

                    <div className='event-info__small-block'>
                        <img src={seatsIcon} className='event-info__small-block-image' alt="Места" />

                        <div>
                            <h4 className='event-info__small-block-title'>
                                Количество мест
                            </h4>

                            <p className='event-info__small-block-text'>
                                До {event.seats} человек
                            </p>
                        </div>
                    </div>

                    <div className='event-info__small-block'>
                        <img src={clockIcon} className='event-info__small-block-image' alt="Длительность" />

                        <div>
                            <h4 className='event-info__small-block-title'>
                                Длительность
                            </h4>

                            <p className='event-info__small-block-text'>
                                {firstDate
                                    ? getDurationText(firstDate.start_time, firstDate.end_time)
                                    : ""}
                            </p>
                        </div>
                    </div>

                </div>

                <div className='event-info__what-will-happen'>
                    <div className='flex'>

                        <div style={{'width' : '400px'}}>
                            <h2 className='what-will-happen__title'>Что будет?</h2>

                            <div className='what-will-happen__items'>
                                {event.program?.length > 0 ? (
                                    event.program.map((item, index) => (
                                        <p key={index} className='what-will-happen__text'>
                                            {item.text}
                                        </p>
                                    ))
                                ) : (
                                    <p className='what-will-happen__text'>Программа мероприятия</p>
                                )}
                            </div>
                        </div>

                        <div className='right'>
                            {/* 2️⃣ Для id 1 и 2 - fallback, для остальных - серверные картинки */}
                            {expectationImages[0] && (
                                <img
                                    className='what-will-happen__image'
                                    src={expectationImages[0]}
                                    alt="Ожидание 1"
                                />
                            )}
                            {expectationImages[1] && (
                                <img
                                    className='what-will-happen__image'
                                    src={expectationImages[1]}
                                    alt="Ожидание 2"
                                />
                            )}
                        </div>

                    </div>
                </div>

                <h2 className='event-info-block__under-title'>
                    Всё включено
                </h2>

                <div className='event-info-block__under'>
                    <div className='under__small-block'>
                        <img className='under__small-icon' src={paletteIcon} alt="Палитра" />
                        <p className='under__small-text'>Все материалы</p>
                    </div>

                    <div className='under__small-block'>
                        <img className='under__small-icon' src={canvasIcon} alt="Холст" />
                        <p className='under__small-text'>Холст на подрамнике</p>
                    </div>

                    <div className='under__small-block'>
                        <img className='under__small-icon' src={apronIcon} alt="Фартук" />
                        <p className='under__small-text'>Фартук и защита</p>
                    </div>

                    <div className='under__small-block'>
                        <img className='under__small-icon' src={teaIcon} alt="Чай" />
                        <p className='under__small-text'>Чай, вода и угощения</p>
                    </div>

                    <div className='under__small-block'>
                        <img className='under__small-icon' src={paletteIcon} alt="Атмосфера" />
                        <p className='under__small-text'>
                            Творческая атмосфера и поддержка
                        </p>
                    </div>
                </div>

                <div className='event__attention'>
                    <div className='attention--circle'>!</div>

                    <div>
                        <h2 className='attention__title'>Важно знать</h2>

                        <p className='attention__text'>
                            Одежда может испачкаться, надевайте то, что не жалко.
                            Если не сможете прийти — посещение всё равно будет считаться списанным
                        </p>
                    </div>

                    <img className='attention__img' src={brushImage} alt="Кисть" />
                </div>

            </div>

            {confirmModalOpen && (
                <ConfirmEventModal onClose={() => setConfirmModalOpen(false)} />
            )}

        </section>
    );
}