import {Outlet} from "react-router-dom";
import Header from "../../components/header/header";
import style from "./layout.module.css"


export const Layout = () => {
    return (
        <div className={style.container}>
            <Header/>
            <Outlet/>
        </div>
    );
};
