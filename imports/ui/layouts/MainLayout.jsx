import React from 'react';

export const MainLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-slate-100">
        {children}
    </div>
)