import * as React from "react";

import { isMobile } from "react-device-detect";

import DashSideDrawer from "./DashSideDrawer";
import DashBottomDrawer from "./DashBottomDrawer";

const DashDrawerController = ({
    layout,
    setLayout,
}) => {
    return (
        <>
            {isMobile ? (
                <DashBottomDrawer
                    layout={layout}
                    setLayout={setLayout}
                ></DashBottomDrawer>
            ) : (
                <DashSideDrawer
                    layout={layout}
                    setLayout={setLayout}
                ></DashSideDrawer>
            )}
        </>
    );
};

export default DashDrawerController;
