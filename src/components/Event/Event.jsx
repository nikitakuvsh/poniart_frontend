import './Event.css';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import drawingVideo from '../../video/drawing.mp4';
import drawingPicture from '../../images/pictures/drawing.png';
import secondDrawingPicture from '../../images/pictures/secondDrawing.png';
import figureVideo from '../../video/figure.mp4';
import figurePicture from '../../images/pictures/figure.png';
import ConfirmEventModal from '../ConfirmEventModal/ConfirmEventModal';
import eventInfoImage from '../../images/pictures/eventsFlowers.png';
import calendarIcon from '../../images/icons/calendar.svg';
import twoPeopleIcon from '../../images/icons/twopeople.svg';
import seatsIcon from '../../images/icons/seats.svg';
import clockIcon from '../../images/icons/clock.svg';
import paletteIcon from '../../images/icons/palette.svg';
import canvasIcon from '../../images/icons/canvas.svg';
import apronIcon from '../../images/icons/apron.svg';
import teaIcon from '../../images/icons/tea.svg';
import loveIcon from '../../images/icons/love.svg';
import brushImage from '../../images/pictures/brush.png';
import modelingImage from '../../images/pictures/modeling.png';
import secondModelingImage from '../../images/pictures/secondModeling.png';
import modelingPreview from '../../images/pictures/modelingPreview.png';

const eventsData = [
    {
        id: 1,
        title: "Живопись и рисунок",
        day: "Вторник, 27 мая",
        time: "16:00 – 18:00",
        age: "5–10 лет",
        description: `Погрузимся в мир красок и фантазии! Напишем свою картину акрилом на холсте с профессиональным художником. Подходит для новичков и тех, кто уже пробовал рисовать`,
        type: 'drawing',
        expectation: `Познакомимся с основами композии и цвета
        Выберем сюжет и создадим эскиз
        Напишем картину акриловыми красками
        Заберёте готовую работу домой!`,
        expectationImage: [drawingPicture, secondDrawingPicture],
        previewImage: eventInfoImage,
    },
    {
        id: 2,
        title: "Лепка из воздушного пластелина",
        day: "Четверг",
        time: "17:00 – 19:00",
        age: "6–12 лет",
        description: `Работа с глиной развивает моторику и воображение.
        Дети создают фигурки, посуду и забирают работы домой.`,
        type: 'lepka',
        expectation: `Познакомимся с техникой лепки и основами формы
        Создадим собственную фигурку или персонажа
        Научимся работать с воздушным пластелином
        Заберёте свою поделку домой!`,
        expectationImage: [modelingImage, secondModelingImage],
        previewImage: modelingPreview,
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

        <div className='event__container'>
            <div className='event-info__flex'>
                <div className='event-info__text'>
                    <h2 className='event-info__title'>{event.title}</h2>
                    <p className='event-info__subtitle'>Творчество, которое вдохновляет</p>
                    <p className='event-info__p'>{event.description}</p>

                    <button className='event-info__button button--enter-event' onClick={() => setConfirmModalOpen(true)}>
                        Записаться на мероприятие
                    </button>
                </div>

                <div className='event-info__image'>
                    <img className='event-info__image-img' src={event.previewImage} />
                </div>
            </div>

            <div className='event-info__block'>
                <div className='event-info__small-block'>
                    <img src={calendarIcon} className='event-info__small-block-image' />

                    <div>
                        <h4 className='event-info__small-block-title'>Дата и время</h4>
                        <p className='event-info__small-block-text'>{event.day}</p>
                        <p className='event-info__small-block-text'>{event.time}</p>
                    </div>
                </div>

                <div className='event-info__small-block'>
                    <img src={twoPeopleIcon} className='event-info__small-block-image' />

                    <div>
                        <h4 className='event-info__small-block-title'>Возраст</h4>
                        <p className='event-info__small-block-text'>{event.age}</p>
                    </div>
                </div>

                <div className='event-info__small-block'>
                    <img src={seatsIcon} className='event-info__small-block-image' />

                    <div>
                        <h4 className='event-info__small-block-title'>Количество мест</h4>
                        <p className='event-info__small-block-text'>До 12 человек</p>
                    </div>
                </div>

                <div className='event-info__small-block'>
                    <img src={clockIcon} className='event-info__small-block-image' />

                    <div>
                        <h4 className='event-info__small-block-title'>Длительность</h4>
                        <p className='event-info__small-block-text'>2 часа</p>
                    </div>
                </div>
            </div>

            <div className='event-info__what-will-happen'>
                <div className='flex'>
                    <div>
                        <h2 className='what-will-happen__title'>Что будет?</h2>
                        <p className='what-will-happen__text'>{event.expectation}</p>
                    </div>

                    <div className='right'>
                        <img className='what-will-happen__image' src={event.expectationImage[0]} />
                        <img className='what-will-happen__image' src={event.expectationImage[1]} />
                    </div>
                </div>
            </div>

            <h2 className='event-info-block__under-title'>Всё включено</h2>

            <div className='event-info-block__under'>
                <div className='under__small-block'>
                    <img className='under__small-icon' src={paletteIcon}/>
                    <p className='under__small-text'>Все материалы</p>
                </div>

                <div className='under__small-block'>
                    <img className='under__small-icon' src={canvasIcon}/>
                    <p className='under__small-text'>Холст на подрамнике</p>
                </div>

                <div className='under__small-block'>
                    <img className='under__small-icon' src={apronIcon}/>
                    <p className='under__small-text'>Фартук и защита</p>
                </div>

                <div className='under__small-block'>
                    <img className='under__small-icon' src={teaIcon}/>
                    <p className='under__small-text'>Чай, вода и угощения</p>
                </div>

                <div className='under__small-block'>
                    <img className='under__small-icon' src={paletteIcon}/>
                    <p className='under__small-text'>Творческая атмосфера и поддержка</p>
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

                <img className='attention__img' src={brushImage} />
            </div>
        </div>

        {confirmModalOpen && (
            <ConfirmEventModal onClose={() => setConfirmModalOpen(false)} />
        )}

    </section>
);
}