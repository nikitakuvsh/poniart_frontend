import './About.css';
import kidsImage from '../../images/pictures/eventDrawing.png';
import kidsImagetwo from '../../images/pictures/kids2.png';
import kidsImagethree from '../../images/pictures/kids3.png';

export default function About() {
    return (
        <section className="about" id='about'>
            <div className="about__container">

                <div className="about__hero">
                    <h1>
                        Пространство, где дети <span>создают</span>, 
                        <span> учатся</span> и <span>раскрываются</span>
                    </h1>
                    <p>
                        Мы проводим творческие мастер-классы и мероприятия,
                        где ребёнок не просто “занят”, а реально пробует,
                        ошибается, смеётся и делает что-то своё.
                    </p>
                </div>

                <div className="about__grid">
                    <div className="about__text">
                        <h2>Почему мы?</h2>
                        <p>
                            У нас нет скучных уроков и “сядь ровно”.
                            Есть краски на руках, клей на столе и глаза,
                            которые горят от интереса.
                        </p>
                        <p>
                            Мы верим, что через творчество дети учатся
                            думать, общаться и быть смелыми.
                        </p>
                    </div>

                    <div className="about__image big">
                        <img src={kidsImage} />
                    </div>

                    <div className="about__image small">
                        <img src={kidsImagetwo}/>
                    </div>

                    <div className="about__image small">
                        <img src={kidsImagethree}/>
                    </div>
                </div>

                <div className="about__bottom">
                    <h2>Не просто занятия</h2>
                    <p>
                        Это место, куда дети хотят возвращаться сами.
                        Где можно испачкаться, придумать, посмеяться
                        и унести домой не только поделку,
                        но и ощущение “я смог”.
                    </p>
                </div>

            </div>
        </section>
    );
}