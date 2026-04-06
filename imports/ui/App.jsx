import React, {useState} from 'react';
import { NavButton } from './components/NavButton';
import {MachinesPage} from './pages/MachinesPage';
import {OperatorsPage} from './pages/OperatorsPage';
import {ProductionOrdersPage} from './pages/ProductionOrdersPage';

export const App = () => {
    // State to control which page is active.
    const [currentPage, setCurrentPage] = useState('machines');

    // Function to render the selected page.
    const renderPage = () => {
        console.log("Página atual: ", currentPage);

        switch (currentPage) {
            case 'machines':
                return <MachinesPage/>;
            case 'operators':
                return <OperatorsPage/>;
            case 'orders':
                return <ProductionOrdersPage/>;
            default:
                return <MachinesPage/>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation Menu - Industrial Style (Large Buttons) */}
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
                    label="ORDENS (OP)"
                    isActive={currentPage === 'orders'}
                    onClick={() => setCurrentPage('orders')}
                />
            </nav>

            {/* Content Area */}
            <main className="container mx-auto">
                {renderPage()}
            </main>
        </div>
    );
};