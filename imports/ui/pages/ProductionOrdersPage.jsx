import React, {useState} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Machines} from '/imports/api/machines/collection';
import {ProductionOrders} from '/imports/api/productionOrders/collection';

export const ProductionOrdersPage = () => {
    const [selectedMachine, setSelectedMachine] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');

    // Subscription and real-time data retrieval
    const {orders, machines, isLoading} = useTracker(() => {
        const subOrders = Meteor.subscribe('productionOrders.all');
        const subMachines = Meteor.subscribe('machines.all');
        return {
            orders: ProductionOrders.find({}, {sort: {createdAt: -1}}).fetch(),
            machines: Machines.find({}).fetch(),
            isLoading: !subOrders.ready() || !subMachines.ready()
        };
    });

    const handleCreateOrder = (e) => {
        e.preventDefault();
        const data = {
            product: productName,
            quantityPlanned: Number(quantity),
            machineId: selectedMachine,
        };

        Meteor.call('productionOrders.insert', data, (err) => {
            if (err) {
                alert(err.reason);
            } else {
                // Limpa o formulário após o sucesso
                setProductName('');
                setQuantity('');
                setSelectedMachine('');
            }
        });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Ordens de Produção (OP)</h1>

            {/* Industrial-style form with large buttons. */}
            <section className="bg-white p-6 rounded-lg shadow-md mb-10">
                <h2 className="text-xl font-semibold mb-4">Nova Ordem de Produção</h2>
                <form onSubmit={handleCreateOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        className="p-4 border-2 rounded text-lg"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantidade Planejada"
                        className="p-4 border-2 rounded text-lg"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    <select
                        className="p-4 border-2 rounded text-lg bg-white"
                        value={selectedMachine}
                        onChange={(e) => setSelectedMachine(e.target.value)}
                        required
                    >
                        <option value="">Selecione a Máquina</option>
                        {machines.map(m => (
                            <option key={m._id} value={m._id}>{m.name}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white text-xl font-bold py-4 rounded shadow-lg active:bg-blue-800 transition-all"
                    >
                        ABRIR ORDEM DE PRODUÇÃO
                    </button>
                </form>
            </section>

            {/* Real-time listing of work orders. */}
            <section className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                    <tr>
                        <th className="p-4">Produto</th>
                        <th className="p-4">Máquina</th>
                        <th className="p-4">Qtd. Planejada</th>
                        <th className="p-4">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order._id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium">{order.product}</td>
                            <td className="p-4">{machines.find(m => m._id === order.machineId)?.name || 'N/A'}</td>
                            <td className="p-4">{order.quantityPlanned}</td>
                            <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'IN_PROGRESS' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {order.status}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};