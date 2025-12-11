import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../firebase-config';
import { useAuthStore } from "../store/auth-store.ts";

const queryClient = new QueryClient();

function App() {

    const { setUser, setIsLoading, isLoading } = useAuthStore();

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, setIsLoading]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>Идет проверка аутентификации...</h1>
            </div>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;