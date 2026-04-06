import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Machines } from '../../api/machines/collection';

export const MachinesPage = () => {
    const [machineName, setMachineName] = useState('');

    // Real-time signing of machine data
    const { machines, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe('machines.all');
        return {
            machines: Machines.find({}, { sort: { createdAt: -1 } }).fetch(),
            isLoading: !handler.ready(),
        };
    });

    const handleAddMachine = (e) => {
        e.preventDefault();
        if (!machineName) return;

        Meteor.call('machines.insert', { name: machineName }, (err) => {
            if (err) {
                alert(err.reason);
            } else {
                setMachineName('');
            }
        });
    };

    const updateStatus = async (id, status) => {
        try {
            // Update the status according to the business rules: RUNNING, STOPPED or FAILURE
            await Meteor.callAsync('machines.updateStatus', id, status);
        } catch (err){
            alert("Erro ao atualizar: " + err.reason);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Monitoramento de Máquinas</h1>
                <p className="text-gray-600">Controle de status e ativos do chão de fábrica</p>
            </header>

            {/* Registration Form - Standardized with other pages */}
            <section className="bg-white p-8 rounded-xl shadow-lg mb-10 max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Nova Máquina</h2>
                <form onSubmit={handleAddMachine} className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        className="flex-1 p-4 border-2 border-gray-200 rounded-lg text-lg outline-none focus:border-blue-500"
                        placeholder="Ex: Prensa Hidráulica 01"
                        value={machineName}
                        onChange={(e) => setMachineName(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-md active:scale-95 transition-all text-lg"
                    >
                        CADASTRAR MÁQUINA
                    </button>
                </form>
            </section>

            {/* Grid of Machines - Robust cards for use in Tablets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {machines.map((machine) => (
                    <div
                        key={machine._id}
                        className={`bg-white rounded-2xl shadow-xl overflow-hidden border-l-8 transition-all ${
                            machine.status === 'RUNNING' ? 'border-green-500' :
                                machine.status === 'FAILURE' ? 'border-red-500' : 'border-gray-400'
                        }`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight">{machine.name}</h3>
                                    <div className="mt-2 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full animate-pulse ${
                        machine.status === 'RUNNING' ? 'bg-green-500' :
                            machine.status === 'FAILURE' ? 'bg-red-500' : 'bg-gray-400'
                    }`}></span>
                                        <span className="font-bold text-gray-500 uppercase">{machine.status || 'OFFLINE'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Action Buttons - Large for easy touch */}
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => updateStatus(machine._id, 'RUNNING')}
                                    className={`py-6 rounded-xl font-black text-lg shadow-md transition-all active:scale-90 ${
                                        machine.status === 'RUNNING'
                                            ? 'bg-green-600 text-white ring-4 ring-green-200'
                                            : 'bg-gray-100 text-gray-400 hover:bg-green-50'
                                    }`}
                                >
                                    RUN
                                </button>
                                <button
                                    onClick={() => updateStatus(machine._id, 'STOPPED')}
                                    className={`py-6 rounded-xl font-black text-lg shadow-md transition-all active:scale-90 ${
                                        machine.status === 'STOPPED'
                                            ? 'bg-gray-600 text-white ring-4 ring-gray-200'
                                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                    }`}
                                >
                                    STOP
                                </button>
                                <button
                                    onClick={() => updateStatus(machine._id, 'FAILURE')}
                                    className={`py-6 rounded-xl font-black text-lg shadow-md transition-all active:scale-90 ${
                                        machine.status === 'FAILURE'
                                            ? 'bg-red-600 text-white ring-4 ring-red-200'
                                            : 'bg-gray-100 text-gray-400 hover:bg-red-50'
                                    }`}
                                >
                                    FAIL
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};