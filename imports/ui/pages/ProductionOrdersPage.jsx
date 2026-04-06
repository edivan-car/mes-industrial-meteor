import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const ProductionOrdersPage = () => {
    const [opCode, setOpCode] = useState('');
    const [currentOP, setCurrentOP] = useState(null);
    const [error, setError] = useState('');

    const handleSearchOP = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // We call a method on the server to search for the OP by code/ID.
            const op = await Meteor.callAsync('productionOrders.search', opCode);

            if (op) {
                setCurrentOP(op);
            } else {
                setError('Ordem de Produção não encontrada!');
                setCurrentOP(null);
            }
        } catch (err) {
            setError('Erro ao buscar OP.');
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-gray-800">CARGA DE PRODUÇÃO</h1>
                <p className="text-gray-600">Informe o código da OP para iniciar o trabalho</p>
            </header>

            {/* OP Search - Giant Input for Tablet */}
            <form onSubmit={handleSearchOP} className="flex gap-4 mb-10">
                <input
                    type="text"
                    placeholder="DIGITE OU BIPE O CÓDIGO DA OP"
                    className="flex-1 p-6 text-2xl font-bold border-4 border-gray-300 rounded-2xl focus:border-blue-600 outline-none"
                    value={opCode}
                    onChange={(e) => setOpCode(e.target.value.toUpperCase())}
                    autoFocus
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-10 rounded-2xl font-black text-xl shadow-lg active:scale-95"
                >
                    BUSCAR
                </button>
            </form>

            {/* Display of OP Data (Conference Card) */}
            {currentOP && (
                <div className="bg-white border-4 border-blue-600 rounded-3xl p-8 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="text-sm font-bold text-gray-400 uppercase">Produto</label>
                            <p className="text-3xl font-black text-gray-800">{currentOP.productName}</p>
                            <p className="text-xl text-gray-600">{currentOP.productCode}</p>
                        </div>
                        <div className="text-right">
                            <label className="text-sm font-bold text-gray-400 uppercase">Qtd. Programada</label>
                            <p className="text-5xl font-black text-blue-600">{currentOP.quantity} <span className="text-2xl text-gray-400">UN</span></p>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-100" />

                    <div className="flex justify-between items-center">
                        <div>
                            <label className="text-sm font-bold text-gray-400 uppercase">Entrega Prevista</label>
                            <p className="text-xl font-bold text-gray-700">{currentOP.dueDate}</p>
                        </div>

                        <button
                            className="bg-green-600 text-white py-6 px-12 rounded-2xl font-black text-2xl shadow-xl hover:bg-green-700 active:scale-95 transition-all"
                            onClick={() => alert("Vincular OP à Máquina...")}
                        >
                            CONFIRMAR E CARREGAR
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border-l-8 border-red-600 p-6 rounded-xl">
                    <p className="text-red-700 font-bold text-xl">{error}</p>
                </div>
            )}
        </div>
    );
};