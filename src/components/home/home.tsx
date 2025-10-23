import {TextCastom} from "../../shared/ui/text-castom/text-castom.tsx";
import styles from "./home.module.css"
import PopularMovies from "./popular-movies/popular-movies.tsx";
import UpcomingMovies from "./uncoming-movies/upcoming-movies.tsx";
import FamousPeople from "./famous-people/famous-people.tsx";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.movieButtonRow}>
                <TextCastom size="l" weight="regular" className={styles.topMovie}>
                    Топ Фильмы
                </TextCastom>
                <button>
                    <TextCastom size="l" weight="regular">
                        Смотреть больше <img src="/next-page-icon.png" alt=""/>
                    </TextCastom>
                </button>
            </div>

            <PopularMovies/>
            <div className={styles.movieButtonRow}>
                <TextCastom size="l" weight="regular" className={styles.topMovie}>
                    Новинки от Movie-Time
                </TextCastom>
                <button>
                    <TextCastom size="l" weight="regular">
                        Смотреть больше <img src="/next-page-icon.png" alt=""/>
                    </TextCastom>
                </button>
            </div>
            <UpcomingMovies/>
            <div className={styles.movieButtonRow}>
                <TextCastom size="l" weight="regular" className={styles.topMovie}>
                    Популярные Актеры
                </TextCastom>
                <button>
                    <TextCastom size="l" weight="regular">
                        Смотреть больше <img src="/next-page-icon.png" alt=""/>
                    </TextCastom>
                </button>
            </div>
            <FamousPeople/>

        </div>
    );
};

export default Home;