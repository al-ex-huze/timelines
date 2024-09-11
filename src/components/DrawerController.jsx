import * as React from "react";

import SideDrawer from "./SideDrawer";
import BottomDrawer from "./BottomDrawer";


const DrawerController = ({
    open,
    setOpen,
    forceMobile,
    openMobileBottom,
    setOpenMobileBottom,
}) => {
    return (
        <>
            {forceMobile ? (
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
