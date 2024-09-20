import * as React from "react";
import { useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";

import SideDrawer from "./SideDrawer";
import BottomDrawer from "./BottomDrawer";

import { drawerItems } from "./DrawersLists";

const DrawerController = ({ layout, setLayout }) => {
    const location = useLocation();
    const normalisePathname = (pathname) => {
        const basePath = pathname.split("/").slice(0, 2).join("/");
        return basePath;
    };
    const normalisedPathname = normalisePathname(location.pathname);
    const currentItems = drawerItems[normalisedPathname] || [];

    return (
        <>
            {isMobile ? (
                <BottomDrawer currentItems={currentItems}></BottomDrawer>
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
