import * as React from "react";
import { isMobile } from "react-device-detect";

import SideDrawer from "./SideDrawer";
import BottomDrawer from "./BottomDrawer";

const DrawerController = ({ currentItems, layout, setLayout }) => {

    return (
        <>
            {isMobile ? (
                <BottomDrawer
                    currentItems={currentItems}
                    layout={layout}
                    setLayout={setLayout}
                ></BottomDrawer>
            ) : (
                <SideDrawer
                    currentItems={currentItems}
                    layout={layout}
                    setLayout={setLayout}
                ></SideDrawer>
            )}
        </>
    );
};

export default DrawerController;
