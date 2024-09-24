import * as React from "react";
import { isMobile } from "react-device-detect";

import BottomDrawer from "./DataGridBottomDrawer";
import DataGridSideDrawer from "./DataGridSideDrawer";

const DataGridDrawerController = ({
    layout,
    setLayout,
}) => {
    return (
        <>
            {isMobile ? (
                <BottomDrawer
                    layout={layout}
                    setLayout={setLayout}
                ></BottomDrawer>
            ) : (
                <DataGridSideDrawer
                    layout={layout}
                    setLayout={setLayout}
                ></DataGridSideDrawer>
            )}
        </>
    );
};

export default DataGridDrawerController;
