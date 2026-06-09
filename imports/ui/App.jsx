import React, { useState } from 'react';
import {LoadingPage} from "./pages/LoadingPage";
import {LoginPage} from "./pages/LoginPage";
import {MachinePage} from "./pages/MachinePage";

export const App = () => {
    const [currentPage, setCurrentPage] = useState("loading");

    // Quando o tempo da LoadingPage acabar, ela chama esta função
    const handleLoadingComplete = () => {
        setCurrentPage("login");
    };

    const handleLogin = () => {
        setCurrentPage("machine");
    }

    // Se estiver carregando, mostra a splash screen
    if (currentPage === "loading") {
        return <LoadingPage onLoadingComplete={handleLoadingComplete}/>;
    }

    if (currentPage === "login") {
        return <LoginPage onLogin={handleLogin}/>;
    }

    if (currentPage === "machine") {
        return <MachinePage />;
    }
};
