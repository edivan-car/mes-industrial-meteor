import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ProductionOrders } from '../../api/productionOrders/productionOrdersCollection';

export const ProductionOrdersPage = ({ onSelectOP }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // 1. Assinar os dados e buscar do banco
    const { orders, isLoading } = useTracker(() => {
        const handle = Meteor.subscribe('productionOrders.all');
        const list = ProductionOrders.find({
            opCode: { $regex: searchTerm, $options: 'i' } // Busca parcial e insensível a maiúsculas
        }).fetch();

        return {
            orders: list,
            isLoading: !handle.ready(),
        };
    }, [searchTerm]); // Re-executa quando o searchTerm muda

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-black mb-8 text-gray-800">BUSCAR ORDEM DE PRODUÇÃO</h1>

            {/* Input de Busca Estilo Industrial */}
            <div className="relative mb-10">
                <input
                    type="text"
                    placeholder="Digite ou bipe o código da OP (ex: 55555...)"
                    className="w-full p-6 text-2xl border-4 border-blue-600 rounded-2xl focus:ring-4 focus:ring-blue-200 outline-none uppercase font-mono shadow-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
                <div className="absolute right-6 top-6 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Lista de Resultados */}
            <div className="space-y-4">
                {isLoading ? (
                    <p className="text-center font-bold text-gray-400 animate-pulse text-xl">CARREGANDO...</p>
                ) : orders.length > 0 ? (
                    orders.map(op => (
                        <button
                            key={op._id}
                            onClick={() => onSelectOP(op)}
                            className="w-full bg-white border-2 border-gray-100 hover:border-blue-500 p-6 rounded-3xl flex justify-between items-center transition-all hover:shadow-lg active:scale-95 group"
                        >
                            <div className="text-left">
                                <span className="text-sm font-black text-blue-600 uppercase tracking-tighter">Código da OP</span>
                                <p className="text-3xl font-black text-gray-800 font-mono">{op.opCode}</p>
                                <p className="text-lg text-gray-500 font-bold uppercase mt-1">{op.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-black text-gray-400 uppercase tracking-tighter">Qtd. Programada</span>
                                <p className="text-4xl font-black text-gray-800">{op.quantity}</p>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="text-center p-12 bg-gray-50 rounded-3xl border-2 border-dashed">
                        <p className="text-xl font-bold text-gray-400 uppercase">Nenhuma ordem encontrada</p>
                    </div>
                )}
            </div>
        </div>
    );
};