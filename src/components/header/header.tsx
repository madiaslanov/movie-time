import style from './header.module.css';
import {TextCastom} from "../../shared/ui/text-castom/text-castom.tsx";

const Header = () => {
    return (
        <div className={style.container}>
            <div className={style.leftSide}>
                    <img className={style.logo} src="/Movietime-nav-logo-new.png" alt=""/>
                <ul>
                    <TextCastom size="m" weight="bold">Главная Страница</TextCastom>
                    <TextCastom size="m" weight="bold">Сериалы</TextCastom>
                    <TextCastom size="m" weight="bold">Фильмы</TextCastom>
                    <TextCastom size="m" weight="bold">Актеры</TextCastom>
                </ul>
            </div>
            <div className={style.rightSide}>
                <button className={style.buttonStyle}>
                    <img src="/search-button.svg" alt=""/>
                </button>
                <button className={style.buttonStyle}>
                    <img src="/profile-icon.svg" alt=""/>
                </button>
            </div>
        </div>
    );
};

export default Header;