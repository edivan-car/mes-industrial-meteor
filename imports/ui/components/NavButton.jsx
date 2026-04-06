import React from "react";

export const NavButton = ({label, isActive, onClick}) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 py-5 px-4 text-xl font-black rounded-xl transition-all shadow-md active:scale-95 ${
                isActive
                    ? 'bg-blue-600 text-white border-b-4 border-blue-800'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
            {label}
        </button>
    );
};