import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const ProductionPage = ({ activeOP, onExit }) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, RUNNING, STOPPED
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [showReasonModal, setShowReasonModal] = useState(false);

    const logEvent = async (newStatus, reason = null) => {
        try {
            await Meteor.callAsync('productionLogs.insert', {
                opId: activeOP._id,
                opCode: activeOP.opCode,
                status: newStatus,
                reason: reason,
            });
            setStatus(newStatus);
        } catch (err) {
            console.error("Erro ao registrar log:", err);
        }
    };

    const handleStart = () => {
        if (status === 'STOPPED') {
            setShowReasonModal(true);
        } else {
            logEvent('RUNNING');
        }
    };

    return (
        <div className="p-4 max-w-5xl mx-auto space-y-4">
            {/* 1. ÁREA DE INFORMAÇÃO DA OP (Identidade Visual Industrial) */}
            <div className="bg-white border-l-8 border-blue-600 rounded-2xl shadow-lg p-6 grid grid-cols-2 gap-6">
                <div>
                    <span className="text-gray-400 font-black text-xs uppercase">Ordem de Produção</span>
                    <h2 className="text-4xl font-black text-blue-900 font-mono">{activeOP.opCode}</h2>
                    <p className="text-xl font-bold text-gray-700 mt-2">{activeOP.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-l pl-6 border-gray-100">
                    <div>
                        <span className="text-gray-400 font-black text-xs uppercase">Cód. Produto</span>
                        <p className="text-xl font-bold text-gray-800">{activeOP.productCode}</p>
                    </div>
                    <div>
                        <span className="text-gray-400 font-black text-xs uppercase">Qtd. Programada</span>
                        <p className="text-3xl font-black text-gray-800">{activeOP.quantity}</p>
                    </div>
                    <div className="col-span-2">
                        <span className="text-gray-400 font-black text-xs uppercase">Data de Entrega</span>
                        <p className="text-xl font-bold text-red-600">{activeOP.dueDate}</p>
                    </div>
                </div>
            </div>

            {/* 2. ÁREA DE CONFIRMAÇÃO (Bloqueio de Segurança) */}
            {!isConfirmed ? (
                <div className="bg-yellow-50 border-4 border-yellow-400 rounded-3xl p-8 text-center">
                    <h3 className="text-2xl font-black text-yellow-800 mb-4 uppercase">
                        Confirme as informações acima para liberar a máquina
                    </h3>
                    <button
                        onClick={() => setIsConfirmed(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-12 py-6 rounded-2xl text-3xl font-black shadow-xl transition-all active:scale-95"
                    >
                        CONFIRMAR CARREGAMENTO
                    </button>
                    <button onClick={onExit} className="block mx-auto mt-6 text-gray-500 underline font-bold">
                        Voltar para busca
                    </button>
                </div>
            ) : (
                /* 3. ÁREA DE CONTROLE REDUZIDA (Liberada após confirmação) */
                <div className="space-y-6 animate-fadeIn">
                    <div className={`p-8 rounded-3xl text-center border-b-8 transition-all ${
                        status === 'RUNNING' ? 'bg-green-100 border-green-600' : 'bg-red-100 border-red-600'
                    }`}>
                        <span className="font-black text-gray-500 uppercase">Status Atual</span>
                        <h1 className="text-7xl font-black text-gray-900">
                            {status === 'RUNNING' ? 'EM PRODUÇÃO' : 'MÁQUINA PARADA'}
                        </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <button
                            onClick={handleStart}
                            disabled={status === 'RUNNING'}
                            className="h-40 bg-green-600 text-white rounded-3xl font-black text-4xl shadow-lg active:scale-95 disabled:opacity-20"
                        >
                            INICIAR
                        </button>
                        <button
                            onClick={() => logEvent('STOPPED')}
                            disabled={status !== 'RUNNING'}
                            className="h-40 bg-red-600 text-white rounded-3xl font-black text-4xl shadow-lg active:scale-95 disabled:opacity-20"
                        >
                            PARADA
                        </button>
                    </div>

                    <button onClick={onExit} className="w-full py-4 bg-gray-200 text-gray-600 rounded-xl font-bold uppercase hover:bg-gray-300">
                        Finalizar Expediente / Trocar OP
                    </button>
                </div>
            )}

            {/* Modal de Motivo de Parada (Popup) */}
            {showReasonModal && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
                    <div className="bg-white rounded-[2.5rem] p-10 max-w-2xl w-full">
                        <h2 className="text-3xl font-black mb-8 text-center uppercase">Motivo da Parada Anterior</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {['Setup / Troca Refugo', 'Manutenção Mecânica', 'Falta de Matéria-Prima', 'Limpeza 5S'].map(reason => (
                                <button
                                    key={reason}
                                    onClick={() => { setShowReasonModal(false); logEvent('RUNNING', reason); }}
                                    className="p-6 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-2xl text-2xl font-bold text-left transition-colors"
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};