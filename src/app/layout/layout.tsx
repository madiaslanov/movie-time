import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
                <Outlet />
        </div>
    );
};
