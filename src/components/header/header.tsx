import style from './header.module.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store.ts";
import { useTranslation } from "react-i18next";

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuthStore();
    const { t, i18n } = useTranslation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? `${style.navLink} ${style.activeLink}` : style.navLink;
    };

    return (
        <div className={style.container}>
            <div className={style.leftSide}>
                <img
                    className={style.logo}
                    src="/Movietime-nav-logo-new.png"
                    alt="Movietime Logo"
                    onClick={() => navigate('/')}
                />
                <ul>
                    <li><NavLink to='/' className={getNavLinkClass} end>{t('header.home')}</NavLink></li>
                    <li><NavLink to='/movies' className={getNavLinkClass}>{t('header.movies')}</NavLink></li>
                    {isAuthenticated && (
                        <li><NavLink to='/favorites' className={getNavLinkClass}>{t('header.favorites')}</NavLink></li>
                    )}
                </ul>
            </div>
            <div className={style.rightSide}>
                <div className={style.languageSwitcher}>
                    <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>EN</button>
                    <button onClick={() => changeLanguage('ru')} disabled={i18n.language === 'ru'}>RU</button>
                    <button onClick={() => changeLanguage('kz')} disabled={i18n.language === 'kz'}>KZ</button>
                </div>
                <input type="text" placeholder={t('allMovies.searchPlaceholder')} className={style.searchInput} />

                {isAuthenticated ? (
                    <>
                        <button className={style.buttonStyle} onClick={() => navigate('/profile')}>
                            <img src={user?.profilePicture || "/profile-icon.svg"} alt="Profile" className={style.profileIcon} />
                        </button>
                        <button onClick={handleLogout} className={style.authButton}>{t('header.logout')}</button>
                    </>
                ) : (
                    <button onClick={() => navigate('/login')} className={style.authButton}>{t('header.login')}</button>
                )}
            </div>
        </div>
    );
};

export default Header;