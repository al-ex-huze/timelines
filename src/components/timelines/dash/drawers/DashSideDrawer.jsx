import * as React from "react";

import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiDrawer from "@mui/material/Drawer";

import SideDrawerContents from "./DashSideDrawerContents";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const CollapsibleDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme),
            },
        },
    ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const SideDrawer = ({
    createTimelineToggle,
    setCreateTimelineToggle,
    currentItems,
    layout,
    setLayout,
    location,
}) => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <CollapsibleDrawer
            variant="permanent"
            open={open}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <DrawerHeader />
            <DrawerHeader>
                {open ? (
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleDrawerOpen}>
                        <ChevronRightIcon />
                    </IconButton>
                )}
            </DrawerHeader>
            <Divider />
            <SideDrawerContents
                createTimelineToggle={createTimelineToggle}
                setCreateTimelineToggle={setCreateTimelineToggle}
                currentItems={currentItems}
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                layout={layout}
                setLayout={setLayout}
                location={location}
            />
        </CollapsibleDrawer>
    );
};
export default SideDrawer;
