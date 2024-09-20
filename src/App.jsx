import * as React from "react";
import { Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import { ThemeContext } from "./contexts/ThemeContext";

import AppBarTop from "./components/AppBarTop";
import Blog from "./components/Blog";
import Calendar from "./components/Calendar";
import Home from "./components/Home";
import DrawerController from "./components/drawers/DrawerController";
import Timelines from "./components/timelines/Timelines";

const App = () => {
    const { theme } = React.useContext(ThemeContext);
    console.log("DEBUG")
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <AppBarTop />
                <DrawerController />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/timelines/*" element={<Timelines />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
};

export default App;
