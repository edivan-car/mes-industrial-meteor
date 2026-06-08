import React, {useState, useEffect} from 'react';
import {LoadingPage} from "./pages/LoadingPage";
import {LoginPage} from "./pages/LoginPage";

export const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Quando o tempo da LoadingPage acabar, ela chama esta função
    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    // Se estiver carregando, mostra a splash screen
    if (isLoading) {
        return <LoadingPage onLoadingComplete={handleLoadingComplete}/>;
    }

    // Se carregou, mostra a tela principal (que evoluiremos para o login/dash)
    return (
        <LoginPage />
    );
};
