import * as React from "react";
import { isMobile } from "react-device-detect";

import DataGridSideDrawer from "./DataGridSideDrawer";
import BottomDrawer from "./DataGridBottomDrawer";

const DataGridDrawerController = ({
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
                <DataGridSideDrawer
                    createTimelineToggle={createTimelineToggle}
                    setCreateTimelineToggle={setCreateTimelineToggle}
                    currentItems={currentItems}
                    layout={layout}
                    setLayout={setLayout}
                ></DataGridSideDrawer>
            )}
        </>
    );
};

export default DataGridDrawerController;
