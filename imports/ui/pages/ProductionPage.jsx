// imports/ui/pages/ProductionPage.jsx
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

export const ProductionPage = ({ activeOP, machine, operator }) => {
    const [status, setStatus] = useState('IDLE'); // IDLE, RUNNING, STOPPED
    const [showReasonModal, setShowReasonModal] = useState(false);
    const [shiftStartTime] = useState(new Date()); // Inicia ao carregar a página

    // Método para registrar eventos no MongoDB (Meteor 3.0)
    const logEvent = async (newStatus, reason = null) => {
        try {
            await Meteor.callAsync('productionLogs.insert', {
                machineId: machine._id,
                operatorId: operator._id,
                opId: activeOP._id,
                status: newStatus,
                reason: reason,
                timestamp: new Date()
            });
            setStatus(newStatus);
        } catch (err) {
            console.error("Erro ao registrar log:", err);
        }
    };

    const handleStartClick = () => {
        if (status === 'STOPPED') {
            // If you were stopped, you need to say why before returning.
            setShowReasonModal(true);
        } else {
            logEvent('RUNNING');
        }
    };

    const confirmReasonAndStart = (reason) => {
        setShowReasonModal(false);
        logEvent('RUNNING', reason);
    };

    return (
        <div className="p-8">
            {/* Active Business Hours Indicator */}
            <div className="text-right mb-4">
                <span className="bg-blue-100 text-blue-700 py-2 px-4 rounded-full font-bold text-sm">
                    EXPEDIENTE INICIADO ÀS: {shiftStartTime.toLocaleTimeString()}
                </span>
            </div>

            {/* Main Status Display */}
            <div className={`p-12 rounded-[3rem] text-center mb-8 border-b-8 transition-all ${
                status === 'RUNNING' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
            }`}>
                <h1 className="text-9xl font-black tracking-tighter text-gray-800">
                    {status === 'RUNNING' ? 'PRODUZINDO' : 'PARADA'}
                </h1>
            </div>

            {/* Operational Controls */}
            <div className="grid grid-cols-2 gap-10">
                <button
                    onClick={handleStartClick}
                    disabled={status === 'RUNNING'}
                    className="h-56 bg-green-600 text-white rounded-3xl font-black text-5xl shadow-2xl active:scale-95 disabled:opacity-30"
                >
                    INICIAR
                </button>

                <button
                    onClick={() => logEvent('STOPPED')}
                    disabled={status !== 'RUNNING'}
                    className="h-56 bg-yellow-500 text-white rounded-3xl font-black text-5xl shadow-2xl active:scale-95 disabled:opacity-30"
                >
                    PARADA
                </button>
            </div>

            {/* Stop Reason (Popup) */}
            {showReasonModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
                    <div className="bg-white rounded-[2rem] p-10 max-w-2xl w-full shadow-2xl">
                        <h2 className="text-3xl font-black mb-6 text-gray-800">MOTIVO DA PARADA</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {['SETUP', 'MANUTENÇÃO', 'LIMPEZA', 'FALTA DE MATERIAL'].map((reason) => (
                                <button
                                    key={reason}
                                    onClick={() => confirmReasonAndStart(reason)}
                                    className="p-6 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-2xl text-2xl font-bold transition-all text-left"
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