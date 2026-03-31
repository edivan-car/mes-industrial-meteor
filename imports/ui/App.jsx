import React, { useState } from 'react';
import { MachinesPage } from './pages/MachinesPage';
import { OperatorsPage } from './pages/OperatorsPage';
import { ProductionOrdersPage } from './pages/ProductionOrdersPage';

export const App = () => {
    // State to control which page is active.
    const [currentPage, setCurrentPage] = useState('machines');

    // Function to render the selected page.
    const renderPage = () => {
        switch (currentPage) {
            case 'machines': return <MachinesPage />;
            case 'operators': return <OperatorsPage />;
            case 'orders': return <ProductionOrdersPage />;
            default: return <MachinesPage />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation Menu - Industrial Style (Large Buttons) */}
            <nav className="bg-gray-800 p-4 flex gap-4 shadow-xl border-b-4 border-blue-600">
                <button
                    onClick={() => setCurrentPage('machines')}
                    className={`flex-1 py-5 px-4 text-xl font-black rounded-xl transition-all shadow-md active:scale-95 ${
                        currentPage === 'machines'
                            ? 'bg-blue-600 text-white border-b-4 border-blue-800'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    MÁQUINAS
                </button>

                <button
                    onClick={() => setCurrentPage('operators')}
                    className={`flex-1 py-5 px-4 text-xl font-black rounded-xl transition-all shadow-md active:scale-95 ${
                        currentPage === 'operators'
                            ? 'bg-blue-600 text-white border-b-4 border-blue-800'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    OPERADORES
                </button>

                <button
                    onClick={() => setCurrentPage('orders')}
                    className={`flex-1 py-5 px-4 text-xl font-black rounded-xl transition-all shadow-md active:scale-95 ${
                        currentPage === 'orders'
                            ? 'bg-blue-600 text-white border-b-4 border-blue-800'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    ORDENS (OP)
                </button>
            </nav>

            {/* Content Area */}
            <main className="container mx-auto">
                {renderPage()}
            </main>
        </div>
    );
};