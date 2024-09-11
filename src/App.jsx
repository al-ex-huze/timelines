import * as React from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AppBarTop from "./components/AppBarTop";
import DrawerController from "./components/DrawerController";

const App = () => {
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
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBarTop
                    open={open}
                    forceMobile={forceMobile}
                    setForceMobile={setForceMobile}
                    openMobileBottom={openMobileBottom}
                    handleBottomDrawerOpen={handleBottomDrawerOpen}
                    handleBottomDrawerClose={handleBottomDrawerClose}
                />
                <DrawerController
                    open={open}
                    setOpen={setOpen}
                    forceMobile={forceMobile}
                    openMobileBottom={openMobileBottom}
                    setOpenMobileBottom={setOpenMobileBottom}
                    toggleBottomDrawer={toggleBottomDrawer}
                />
            </Box>
        </>
    );
};

export default App;
