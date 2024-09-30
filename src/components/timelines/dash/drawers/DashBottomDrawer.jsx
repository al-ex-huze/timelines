import * as React from "react";

import { Global } from "@emotion/react";
import {
    Box,
    Skeleton,
    SwipeableDrawer,
} from "@mui/material";

import DashBottomDrawerContents from "./DashBottomDrawerContents";
import { StyledPuller } from "../../../styled/StyledComponents";

const drawerBleeding = 56;

const DashBottomDrawer = ({ layout, setLayout }) => {
    const [openMobileBottom, setOpenMobileBottom] = React.useState(false);
    const [animate, setAnimate] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpenMobileBottom(newOpen);
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
            const interval = setInterval(() => {
                setAnimate((prev) => !prev);
            }, 7000);
            return () => clearInterval(interval);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(80% - ${drawerBleeding}px)`,
                        overflow: "visible",
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={openMobileBottom}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "transparent",
                        position: "relative",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <StyledPuller className={animate ? "animate" : ""} />
                </Box>
                <Box sx={{ overflow: "scroll" }}>
                    <DashBottomDrawerContents
                        layout={layout}
                        setLayout={setLayout}
                    />
                    <Skeleton variant="rectangular" height="auto" />
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default DashBottomDrawer;
