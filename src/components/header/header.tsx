import style from './header.module.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth-store.ts";
import { useTranslation } from "react-i18next";
import { logoutUser } from '../../services/authService.ts';
import { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient.ts';

const Header = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthStore();
    const profilePictureVersion = useAuthStore((state) => state.profilePictureVersion);
    const { t, i18n } = useTranslation();
    const [profileIconUrl, setProfileIconUrl] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            let objectUrl: string;

            apiClient.get('/users/profile-picture', { responseType: 'blob' })
                .then(response => {
                    objectUrl = URL.createObjectURL(response.data);
                    setProfileIconUrl(objectUrl);
                })
                .catch(error => {
                    console.error("Failed to load profile icon for header", error);
                    setProfileIconUrl(null);
                });

            return () => {
                if (objectUrl) {
                    URL.revokeObjectURL(objectUrl);
                }
            };
        } else {
            setProfileIconUrl(null);
        }
    }, [isAuthenticated, user, profilePictureVersion]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/');
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
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
                    <li><NavLink to='/favorites' className={getNavLinkClass}>{t('header.favorites')}</NavLink></li>
                </ul>
            </div>
            <div className={style.rightSide}>
                <div className={style.languageSwitcher}>
                    <button onClick={() => changeLanguage('en')} disabled={i18n.language === 'en'}>EN</button>
                    <button onClick={() => changeLanguage('ru')} disabled={i18n.language === 'ru'}>RU</button>
                    <button onClick={() => changeLanguage('kz')} disabled={i18n.language === 'kz'}>KZ</button>
                </div>
                {isAuthenticated ? (
                    <>
                        <button className={style.buttonStyle} onClick={() => navigate('/profile')}>
                            <img src={profileIconUrl || "/profile-icon.svg"} alt="Profile"
                                 className={style.profileIcon}/>
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
