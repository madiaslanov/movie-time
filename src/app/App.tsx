import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {useEffect} from "react";
import {onAuthStateChanged} from "../services/authService.ts";
import {useAuthStore} from "../store/auth-store.ts";

const queryClient = new QueryClient();

function App() {

    const {setUser, isLoading} = useAuthStore();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged((user) => {
            setUser(user);
        });


        return () => unsubscribe();
    }, [setUser]);


    if (isLoading) {
        return <div>Идет проверка аутентификации...</div>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false}/>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    );
}

export default App;