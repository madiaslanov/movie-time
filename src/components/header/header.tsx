import style from './header.module.css';
import {NavLink, useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        console.log("Search button clicked!");
    };

    const handleProfileClick = () => {
        console.log("Profile button clicked!");
    };

    const getNavLinkClass = ({ isActive }: any) => {
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
                    <li>
                        <NavLink to={'/'}
                                 className={getNavLinkClass}
                                 end
                        >
                            Главная Старница
                        </NavLink>

                    </li>
                    <li>
                        <NavLink to={'/movies'}
                                 className={getNavLinkClass}
                        >
                            Фильмы
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/actors'}
                                 className={getNavLinkClass}
                        >
                            Актеры
                        </NavLink>

                    </li>
                </ul>
            </div>
            <div className={style.rightSide}>
                <button className={style.buttonStyle} onClick={handleSearchClick}>
                    <img src="/search-button.svg" alt="Search"/>
                </button>
                <button className={style.buttonStyle} onClick={handleProfileClick}>
                    <img src="/profile-icon.svg" alt="Profile"/>
                </button>
            </div>
        </div>
    );
};

export default Header;