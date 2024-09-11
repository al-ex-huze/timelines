import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import BottomDrawerContents from "./BottomDrawerContents";

const drawerBleeding = 56;

const StyledBox = styled("div")(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.applyStyles("dark", {
        backgroundColor: grey[800],
    }),
}));

const Puller = styled("div")(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
    ...theme.applyStyles("dark", {
        backgroundColor: grey[900],
    }),
}));

const ListBox = styled("div")(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.applyStyles("dark", {
        backgroundColor: grey[800],
    }),
    overflow: "scroll",
}));

const BottomDrawer = ({ openMobileBottom, setOpenMobileBottom }) => {
    const toggleDrawer = (newOpen) => () => {
        setOpenMobileBottom(newOpen);
    };

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
                <StyledBox
                    sx={{
                        position: "relative",
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: "visible",
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                </StyledBox>
                <ListBox>
                    <BottomDrawerContents />
                    <Skeleton variant="rectangular" height="auto" />
                </ListBox>
            </SwipeableDrawer>
        </>
    );
};

export default BottomDrawer;
