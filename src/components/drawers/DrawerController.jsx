import * as React from "react";

import { isMobile } from "react-device-detect";

import SideDrawer from "./SideDrawer";
import BottomDrawer from "./BottomDrawer";

const DrawerController = ({
    page,
    open,
    setOpen,
    forceMobile,
    openMobileBottom,
    setOpenMobileBottom,
}) => {
    return (
        <>
            {forceMobile || isMobile ? (
                <BottomDrawer
                    openMobileBottom={openMobileBottom}
                    setOpenMobileBottom={setOpenMobileBottom}
                >
                </BottomDrawer>
            ) : (
                <SideDrawer
                open={open}
                setOpen={setOpen}
                >
                </SideDrawer>
            )}
        </>
    );
};

export default DrawerController;
