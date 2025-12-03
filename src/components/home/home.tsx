import {TextCustom} from "../../shared/ui/text-custom/text-custom.tsx";
import styles from "./home.module.css";
import PopularMovies from "./popular-movies/popular-movies.tsx";
import UpcomingMovies from "./uncoming-movies/upcoming-movies.tsx";
import FamousPeople from "./famous-people/famous-people.tsx";
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.container}>
            <div className={styles.movieButtonRow}>
                <TextCustom size="l" weight="regular" className={styles.topMovie}>
                    {t('home.popularMovies')}
                </TextCustom>
                <button>
                    <TextCustom size="l" weight="regular">
                        {t('home.seeMore')} <img src="/next-page-icon.png" alt=""/>
                    </TextCustom>
                </button>
            </div>
            <PopularMovies/>

            <div className={styles.movieButtonRow}>
                <TextCustom size="l" weight="regular" className={styles.topMovie}>
                    {t('home.upcomingMovies')}
                </TextCustom>
                <button>
                    <TextCustom size="l" weight="regular">
                        {t('home.seeMore')} <img src="/next-page-icon.png" alt=""/>
                    </TextCustom>
                </button>
            </div>
            <UpcomingMovies/>

            <div className={styles.movieButtonRow}>
                <TextCustom size="l" weight="regular" className={styles.topMovie}>
                    {t('home.famousPeople')}
                </TextCustom>
                <button>
                    <TextCustom size="l" weight="regular">
                        {t('home.seeMore')} <img src="/next-page-icon.png" alt=""/>
                    </TextCustom>
                </button>
            </div>
            <FamousPeople/>
        </div>
    );
};

export default Home;