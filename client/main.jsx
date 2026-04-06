import React from "react";
import {createRoot} from "react-dom/client";
import {Meteor} from 'meteor/meteor';
import {App} from "/imports/ui/App";
import "/client/main.css";

Meteor.startup(() => {
    const container = document.getElementById("react-target");

    if (!container) {
        console.error("Erro fatal: o elemento 'react-target' não foi encontrado no HTML.");
        return;
    }

    const root = createRoot(container);

    // StrictMode helps find lifecycle bugs and outdated APIs during development.
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
});
