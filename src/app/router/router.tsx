import { createBrowserRouter } from "react-router-dom";
import {Layout} from "../layout/layout.tsx";
import Home from "../../components/home/home.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
        ],
    },
]);
