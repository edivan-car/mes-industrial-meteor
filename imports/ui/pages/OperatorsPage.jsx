import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Operators } from '../../api/operators/operatorsCollection';

export const OperatorsPage = () => {
    const [name, setName] = useState('');
    const [shift, setShift] = useState('A');

    // Search for operators in real time.
    const { operators, isLoading } = useTracker(() => {
        const handler = Meteor.subscribe('operators.all');
        return {
            operators: Operators.find({}, { sort: { name: 1 } }).fetch(),
            isLoading: !handler.ready(),
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;

        Meteor.call('operators.insert', { name, shift }, (err) => {
            if (err) {
                alert('Erro ao cadastrar: ' + err.reason);
            } else {
                setName('');
                setShift('A');
            }
        });
    };

    const handleRemove = (id) => {
        if (confirm('Deseja remover este operador?')) {
            Meteor.call('operators.remove', id);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Cadastro de Operadores</h1>
                <p className="text-gray-600">Gerencie a equipe e os turnos de trabalho</p>
            </header>

            {/* Registration Form - Tablet Style */}
            <section className="bg-white p-8 rounded-xl shadow-lg mb-10 max-w-4xl">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                        <input
                            type="text"
                            className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg focus:border-blue-500 outline-none transition-colors"
                            placeholder="Ex: João Silva"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full md:w-48">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Turno</label>
                        <select
                            className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg bg-white outline-none"
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
                        >
                            <option value="A">Turno A</option>
                            <option value="B">Turno B</option>
                            <option value="C">Turno C</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-md active:scale-95 transition-transform text-lg"
                    >
                        CADASTRAR
                    </button>
                </form>
            </section>

            {/* Operator Table */}
            <section className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
                        <th className="py-4 px-6">Operador</th>
                        <th className="py-4 px-6 text-center">Turno</th>
                        <th className="py-4 px-6 text-right">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700 text-lg">
                    {isLoading ? (
                        <tr><td colSpan="3" className="p-4 text-center">Carregando...</td></tr>
                    ) : operators.map((op) => (
                        <tr key={op._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 px-6 font-medium">{op.name}</td>
                            <td className="py-4 px-6 text-center">
                  <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-bold">
                    {op.shift}
                  </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                                <button
                                    onClick={() => handleRemove(op._id)}
                                    className="text-red-500 hover:text-red-700 font-bold px-3 py-1"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};