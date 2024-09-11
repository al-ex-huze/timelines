import * as React from "react";
import { isMobile } from "react-device-detect";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AppBarTop from "./components/AppBarTop";
import SideDrawerResponder from "./components/SideDrawer";

const App = () => {
    const [open, setOpen] = React.useState(true);

    console.log(isMobile);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBarTop open={open} />
                <SideDrawerResponder open={open} setOpen={setOpen} />
            </Box>
        </>
    );
};

export default App;
