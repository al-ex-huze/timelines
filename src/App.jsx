import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import {
    closestCenter,
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

import AppBarTop from "./components/AppBarTop";
import DrawerController from "./components/DrawerController";
import Timelines from "./components/Timelines";

const App = (props) => {
    const [open, setOpen] = React.useState(true);
    const [forceMobile, setForceMobile] = React.useState(false);
    const [openMobileBottom, setOpenMobileBottom] = React.useState(false);

    const toggleBottomDrawer = () => {
        setOpenMobileBottom(!openMobileBottom);
    };

    const handleBottomDrawerOpen = () => {
        setOpenMobileBottom(true);
    };

    const handleBottomDrawerClose = () => {
        setOpenMobileBottom(false);
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    const testItems = ["One"];

    const [activeId, setActiveId] = React.useState(null);
    const [items, setItems] = React.useState(testItems);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBarTop
                    forceMobile={forceMobile}
                    setForceMobile={setForceMobile}
                    handleBottomDrawerOpen={handleBottomDrawerOpen}
                    handleBottomDrawerClose={handleBottomDrawerClose}
                    openMobileBottom={openMobileBottom}
                />
                <DrawerController
                    forceMobile={forceMobile}
                    open={open}
                    setOpen={setOpen}
                    openMobileBottom={openMobileBottom}
                    setOpenMobileBottom={setOpenMobileBottom}
                    toggleBottomDrawer={toggleBottomDrawer}
                />
                <DndContext
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                    sensors={sensors}
                >
                    <SortableContext
                        items={items}
                        strategy={rectSortingStrategy}
                    >
                        <Timelines activeId={activeId} items={items} />
                    </SortableContext>
                </DndContext>
            </Box>
        </>
    );
};

export default App;
