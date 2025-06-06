
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {StoreProvider} from "app/providers/StoreProvider";
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>
);