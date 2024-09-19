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
import TimelineDash from "./components/timelines/TimelineDash";
import TimelinesDataGrid from "./components/timelines/TimelinesDataGrid";

const App = () => {
    const { theme } = React.useContext(ThemeContext);

    const [open, setOpen] = React.useState(true);
    const [forceMobile, setForceMobile] = React.useState(false);
    const [openMobileBottom, setOpenMobileBottom] = React.useState(false);

    const toggleBottomDrawer = () => {
        setOpenMobileBottom(!openMobileBottom);
    };

    const handleBottomDrawerOpen = () => {
        setOpenMobileBottom(true);
    };

    const handleBottomDrawerClose = () => {
        setOpenMobileBottom(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <AppBarTop
                    forceMobile={forceMobile}
                    setForceMobile={setForceMobile}
                    handleBottomDrawerOpen={handleBottomDrawerOpen}
                    handleBottomDrawerClose={handleBottomDrawerClose}
                    openMobileBottom={openMobileBottom}
                />
                <DrawerController
                    forceMobile={forceMobile}
                    open={open}
                    setOpen={setOpen}
                    openMobileBottom={openMobileBottom}
                    setOpenMobileBottom={setOpenMobileBottom}
                    toggleBottomDrawer={toggleBottomDrawer}
                />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/timelines"
                            element={<TimelinesDataGrid />}
                        />
                        <Route
                            path="/timelines/:timeline_name"
                            element={<TimelineDash />}
                        />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/blog" element={<Blog />} />
                    </Routes>
            </Box>
        </ThemeProvider>
    );
};

export default App;
