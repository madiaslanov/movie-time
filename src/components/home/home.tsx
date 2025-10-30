import {TextCustom} from "../../shared/ui/text-custom/text-custom.tsx";
import styles from "./home.module.css"
import PopularMovies from "./popular-movies/popular-movies.tsx";
import UpcomingMovies from "./uncoming-movies/upcoming-movies.tsx";
import FamousPeople from "./famous-people/famous-people.tsx";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.movieButtonRow}>
                <TextCustom size="l" weight="regular" className={styles.topMovie}>
                    Топ Фильмы
                </TextCustom>
                <button>
                    <TextCustom size="l" weight="regular">
                        Смотреть больше <img src="/next-page-icon.png" alt=""/>
                    </TextCustom>
                </button>
            </div>

            <PopularMovies/>
            <div className={styles.movieButtonRow}>
                <TextCustom size="l" weight="regular" className={styles.topMovie}>
                    Новинки от Movie-Time
                </TextCustom>
                <button>
                    <TextCustom size="l" weight="regular">
                        Смотреть больше <img src="/next-page-icon.png" alt=""/>
                    </TextCustom>
                </button>
            </div>
            <UpcomingMovies/>
            <div className={styles.movieButtonRow}>
                <TextCustom size="l" weight="regular" className={styles.topMovie}>
                    Популярные Актеры
                </TextCustom>
                <button>
                    <TextCustom size="l" weight="regular">
                        Смотреть больше <img src="/next-page-icon.png" alt=""/>
                    </TextCustom>
                </button>
            </div>
            <FamousPeople/>

        </div>
    );
};

export default Home;