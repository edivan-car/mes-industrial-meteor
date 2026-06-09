import React, { useState, useRef, useEffect } from "react";
import {useSubscribe, useFind} from "meteor/react-meteor-data";
import {OperatorsCollection} from "../../api/operators/OperatorsCollection";

export const LoginPage = ({ onLogin }) => {
    const [registration, setRegistration] = useState("");
    //const [searchResult, setSearchResult] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const isLoading = useSubscribe("operators");

    const searchResult = useFind(() => {
        if (!registration) return [];
        return OperatorsCollection.find({registration: registration});
    }, [registration]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-100">

            {/* CABEÇALHO */}
            <header className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold">Nome da Empresa</p>
                    <p className="text-xs text-slate-400">Filial: 18 - Cidade</p>
                </div>
                <div>
                    {/* Ícone de engrenagem */}
                    <button className="text-slate-400 hover:text-white transition">
                        ⚙️
                    </button>
                </div>
            </header>

            {/* CORPO */}
            <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6">

                {/* Logo */}
                <img
                    src="/assets/images/logo_mes.png"
                    alt="Logo MES"
                    className="w-60"
                />

                {/* Card de Login */}
                <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm flex flex-col gap-4">

                    <h2 className="text-center text-lg font-bold text-slate-700 tracking-wide uppercase">
                        Login
                    </h2>

                    {/* Campo de matrícula */}
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Informe a matrícula"
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value)}
                        disabled={selectedOperator != null}
                        className="border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Área de resultado */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-400">
                        {isLoading() ? (
                            <p>Carregando...</p>
                        ) : searchResult.length > 0 ? (
                            searchResult.map((op) => (
                                <p key={op._id}
                                   onClick={() => setSelectedOperator(op)}
                                    className="text-slate-700 cursos-pointer hover:bg-slate-200 px-2 py-1 rounded transition">
                                    {op.registration} — {op.name} | C.C: {op.cc}
                                </p>
                            ))
                        ) : registration ? (
                            <p>Nenhum funcionário encontrado.</p>
                        ) : (
                            <p>Selecione o funcionário...</p>
                        )}
                    </div>

                    {/* Funcionário selecionado */}
                    {selectedOperator && (
                        <div className="bg-blue-50 border border-blue-300 rounded-lg px-4 py-3 text-sm text-slate-700 flex items-center justify-between">
                            <span>✅ {selectedOperator.name} selecionado</span>
                            <button
                                onClick={() => {
                                    setSelectedOperator(null);
                                    setRegistration("");
                                    inputRef.current?.focus();
                            }}
                                className="text-blue-400 hover:text-red-500 transition font-bold">
                                X
                            </button>
                        </div>
                    )}

                    {/* Botão de login */}
                    <button
                        onClick={() => onLogin()}
                        disabled={selectedOperator === null}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-slate-300 disabled:cursor-not-allowed">
                        Entrar
                    </button>

                </div>
            </main>
        </div>
    )
}