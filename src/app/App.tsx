import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {useEffect} from "react";
import {onAuthStateChanged} from "../services/authService.ts"; // Импортируем наш сервис
import {useAuthStore} from "../store/auth-store.ts"; // Импортируем стор

const queryClient = new QueryClient();

function App() {
    // Получаем функцию для обновления пользователя из стора
    const {setUser, isLoading} = useAuthStore();

    useEffect(() => {
        // Устанавливаем слушателя состояния аутентификации
        const unsubscribe = onAuthStateChanged((user) => {
            setUser(user); // Обновляем наш стор при изменении статуса в Firebase
        });

        // Отписываемся от слушателя при размонтировании компонента
        return () => unsubscribe();
    }, [setUser]);

    // Пока мы проверяем статус пользователя, можно показать глобальный лоадер
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