import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeContextProvider } from "./contexts/ThemeContext.jsx";

import "@fontsource/poppins";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeContextProvider>
    </StrictMode>
);
