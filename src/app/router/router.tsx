import { createBrowserRouter } from "react-router-dom";
import {Layout} from "../layout/layout.tsx";
import Home from "../../components/home/home.tsx";
import MovieDetails from "../../components/movie-details/movie-details.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            {path: 'movie/:id', element: <MovieDetails/>}
        ],
    },
]);
