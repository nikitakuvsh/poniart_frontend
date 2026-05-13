import './Event.css';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import drawingVideo from '../../video/drawing.mp4';
import drawingPicture from '../../images/pictures/drawing.png';
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

        <div className='event__container'>
            <div className='event-info__flex'>
                <div className='event-info__text'>
                    <h2 className='event-info__title'>Живопись и рисунок</h2>
                    <p className='event-info__subtitle'>Творчество, которое вдохновляет</p>
                    <p className='event-info__p'>Погрузимся в мир красок и фантазии! Напишем свою картину акрилом на холсте с профессиональным художником. Подходит для новичков и тех, кто уже пробовал рисовать</p>
                    <button className='event-info__button button--enter-event' onClick={() => setConfirmModalOpen(true)}>Записаться на мероприятие</button>
                </div>
                <div className='event-info__image'>
                    <img className='event-info__image-img' src={eventInfoImage} />
                </div>
            </div>

            <div className='event-info__block'>
                <div className='event-info__small-block'>
                    <img src={calendarIcon} className='event-info__small-block-image' />
                    <div>
                        <h4 className='event-info__small-block-title'>Дата и время</h4>
                        <p className='event-info__small-block-text'>Вторник, 27 мая</p>
                        <p className='event-info__small-block-text'>16:00 - 18:00</p>
                    </div>
                </div>

                <div className='event-info__small-block'>
                    <img src={twoPeopleIcon} className='event-info__small-block-image' />
                    <div>
                        <h4 className='event-info__small-block-title'>Возраст</h4>
                        <p className='event-info__small-block-text'>Для детей от 6 лет и взрослых</p>
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
                        <p className='what-will-happen__text'>Познакомимся с основами композиции и цвета</p>
                        <p className='what-will-happen__text'>Выберем сюжет и создадим эскиз</p>
                        <p className='what-will-happen__text'>Напишем картину акриловыми красками</p>
                        <p className='what-will-happen__text'>Заберёте готовую работу домой!</p>
                    </div>

                    <div className='right'>
                        <img className='what-will-happen__image' src={drawingPicture} />
                        <img className='what-will-happen__image' src={drawingPicture} />
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
                    <p className='attention__text'>Одежда может испачкаться, надевайте то, что не жалко. Если не сможете прийти — посещение всё равно будет считаться списанным</p>
                </div>
                <img className='attention__img' src={brushImage} />
            </div>
        </div>

        {confirmModalOpen && (<ConfirmEventModal onClose={() => setConfirmModalOpen(false)} />)}

    </section>
);
}