import { useEffect } from "react";
import './Where.css';

export default function Where() {

    useEffect(() => {
        if (window.ymaps) {
            window.ymaps.ready(() => {
                const map = new window.ymaps.Map("map", {
                    center: [55.907641, 37.456371],
                    zoom: 15
                });

                const placemark = new window.ymaps.Placemark(
                    [55.907641, 37.456371],
                    {
                        hintContent: "ПониАрт творческая студия",
                        balloonContent: "ПониАрт творческая студия"
                    }
                );

                map.geoObjects.add(placemark);
            });
        }
    }, []);

    return (
        <section className="where">

            <h2 className="where__title">Где мы находимся</h2>

            {/* карта на всю ширину */}
            <div id="map" className="where__map"></div>

            {/* инфо под картой */}
            <div className="where__info">
                <p>ул. Чернышевского, 3, Химки. Подъезд 11, кабинет 55</p>

                <a 
                    href="https://yandex.ru/maps/?rtext=~55.907641,37.456371" 
                    target="_blank"
                    rel="noreferrer"
                    className="where__btn"
                >
                    Проложить маршрут
                </a>
            </div>

        </section>
    );
}