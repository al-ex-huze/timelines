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
    const [layout, setLayout] = React.useState([
        { i: "widget1", x: 0, y: 0, w: 2, h: 4 },
        // More widgets...
    ]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <AppBarTop />
                <DrawerController layout={layout} setLayout={setLayout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/timelines/*"
                        element={
                            <Timelines layout={layout} setLayout={setLayout} />
                        }
                    />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
};

export default App;
