import * as React from "react";
import { isMobile } from "react-device-detect";

import SideDrawer from "./DashSideDrawer";
import BottomDrawer from "./BottomDrawer";

const DrawerController = ({
    createTimelineToggle,
    setCreateTimelineToggle,
    currentItems,
    layout,
    setLayout,
}) => {
    return (
        <>
            {isMobile ? (
                <BottomDrawer
                    currentItems={currentItems}
                    layout={layout}
                    setLayout={setLayout}
                    location={location}
                ></BottomDrawer>
            ) : (
                <SideDrawer
                    createTimelineToggle={createTimelineToggle}
                    setCreateTimelineToggle={setCreateTimelineToggle}
                    currentItems={currentItems}
                    layout={layout}
                    setLayout={setLayout}
                ></SideDrawer>
            )}
        </>
    );
};

export default DrawerController;
