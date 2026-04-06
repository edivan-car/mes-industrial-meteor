import React, { useState } from 'react';
import { NavButton } from './components/NavButton';
import { MachinesPage } from './pages/MachinesPage';
import { OperatorsPage } from './pages/OperatorsPage';
import { ProductionOrdersPage } from './pages/ProductionOrdersPage';
import { ProductionPage } from './pages/ProductionPage';

export const App = () => {
    const [currentPage, setCurrentPage] = useState('machines');
    const [selectedOP, setSelectedOP] = useState(null);

    // Function to handle OP selection.
    const handleSelectOP = (op) => {
        setSelectedOP(op);
        setCurrentPage('production_active'); // Switch to an active product "sub-page".
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'machines':
                return <MachinesPage />;
            case 'operators':
                return <OperatorsPage />;
            case 'production':
                // We switched the selection function to Angina Search.
                return <ProductionOrdersPage onSelectOP={handleSelectOP} />;
            case 'production_active':
                // If an OP is selected, render the Cockpit.
                return (
                    <ProductionPage
                        activeOP={selectedOP}
                        onExit={() => setCurrentPage('production')}
                    />
                );
            default:
                return <MachinesPage />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased">
            <nav className="bg-gray-800 p-4 flex gap-4 shadow-xl border-b-4 border-blue-600">
                <NavButton
                    label="MÁQUINAS"
                    isActive={currentPage === 'machines'}
                    onClick={() => setCurrentPage('machines')}
                />
                <NavButton
                    label="OPERADORES"
                    isActive={currentPage === 'operators'}
                    onClick={() => setCurrentPage('operators')}
                />
                <NavButton
                    label="PRODUÇÃO"
                    isActive={currentPage === 'production' || currentPage === 'production_active'}
                    onClick={() => setCurrentPage('production')}
                />
            </nav>

            <main className="container mx-auto py-6">
                {renderPage()}
            </main>
        </div>
    );
};