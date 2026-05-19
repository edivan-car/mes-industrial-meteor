import React, { useEffect } from "react";

export const LoadingPage = ({ onLoadingComplete }) => {
    // simulação de tempo de carregamento (3 segundos)
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoadingComplete();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-100 text-gray-900">
            {/* Container da Logo com animação */}
            <div className="animate-pulse flex flex-col items-center">
                <img
                    src="/assets/images/logo_mes.png"
                    alt="Logo MES"
                    className="w-80 h-42 mb-8"
                />
                <h1 className="text-base font-medium tracking-widest text-gray-900 uppercase">
                    Inicializando o Sistema...
                </h1>

                {/* Barra de progresso estilo "Painel" */}
                <div className="w-64 h-4 mt-6 bg-slate-300 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-[loading_3s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </div>
    );
};