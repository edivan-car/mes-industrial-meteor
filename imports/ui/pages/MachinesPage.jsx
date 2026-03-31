import React from 'react';
import {Meteor} from 'meteor/meteor';
import {useTracker} from 'meteor/react-meteor-data';
import {Machines} from '../../api/machines/collection';
import m from "../../../.meteor/local/build/programs/web.browser/packages/modules";

export const MachinesPage = () => {
    // Meteor signature
    const machines = useTracker(() => {
        Meteor.subscribe('machines.all');
        return Machines.find({}, { sort: { createdAt: -1 } }).fetch();
    });

    // Add new machine
    const handleAdd = () => {
        const name = prompt('Nome da nova máquina:');
        if (!name) return;
        Meteor.callAsync('machines.insert', { name }, (err) => {
            if (err) alert(err.reason);
        });
    };

    // Change status
    const handleStatus = (machine, status) => {
        Meteor.callAsync('machines.updateStatus', machine._id, status, (err) => {
            if (err) alert(err.reason);
        });
    };

    // Function for status colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'RUNNING': return 'bg-green-500';
            case 'STOPPED': return 'bg-gray-400';
            case 'FAILURE': return 'bg-red-500';
            default: return 'bg-gray-200';
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Máquinas</h1>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                >
                    + Adicionar Máquina
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {machines.map((m) => (
                        <tr key={m._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-700">{m._id}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{m.name}</td>
                            <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${getStatusColor(m.status)}`}>
                    {m.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 space-x-2">
                                <button
                                    onClick={() => handleStatus(m, 'RUNNING')}
                                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
                                >
                                    RUN
                                </button>
                                <button
                                    onClick={() => handleStatus(m, 'STOPPED')}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded text-xs"
                                >
                                    STOP
                                </button>
                                <button
                                    onClick={() => handleStatus(m, 'FAILURE')}
                                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                                >
                                    FAIL
                                </button>
                            </td>
                        </tr>
                    ))}
                    {machines.length === 0 && (
                        <tr>
                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                Nenhuma máquina cadastrada
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};