import {createBrowserRouter} from "react-router-dom";
import {Layout} from "../layout/layout.tsx";
import Home from "../../components/home/home.tsx";
import MovieDetails from "../../components/movie-details/movie-details.tsx";
import PeopleDetails from "../../components/people-details/people-details.tsx";
import AllMovies from "../../components/all-movies/all-movies.tsx";
import Login from "../../pages/login/login.tsx";
import Signup from "../../pages/signup/signup.tsx";
import Profile from "../../pages/profile/profile.tsx";
import Favorites from "../../pages/favorites/favorites.tsx";
import ProtectedRoute from "./protected-route.tsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <Home/>},
            {path: 'movie/:id', element: <MovieDetails/>},
            {path: 'people/:id', element: <PeopleDetails/>},
            {path: 'movies', element: <AllMovies/>},
            {path: 'login', element: <Login/>},
            {path: 'signup', element: <Signup/>},
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Profile/>
                    </ProtectedRoute>
                ),
            },
            {
                path: 'favorites',
                element: (
                    <ProtectedRoute>
                        <Favorites/>
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);