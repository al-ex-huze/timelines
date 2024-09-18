import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import { ThemeContext } from "./contexts/ThemeContext";

import AppBarTop from "./components/AppBarTop";
import DrawerController from "./components/DrawerController";
import Timelines from "./components/Timelines";

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
                <Timelines />
            </Box>
        </ThemeProvider>
    );
};

export default App;
