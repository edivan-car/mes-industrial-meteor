import React from 'react';

export const Header = () => {
    return (
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
    )
}