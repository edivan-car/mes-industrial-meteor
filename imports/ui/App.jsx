import React, {useState, useEffect} from 'react';
import {LoadingPage} from "./pages/LoadingPage";

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
        <div className="flex min-h-screen bg-slate-50 items-center justify-center">
            <div className="flex flex-col items-center justify-center p-6">
                <img
                    src="/assets/images/logo_mes.png"
                    alt="Logo MES"
                    className="w-80 h-42 mb-8"
                />
                <h1 className="text-2xl font-bold text-blue-600">
                    MES - Sistema Industrial (Operacional)
                </h1>
            </div>
        </div>
    );
};
