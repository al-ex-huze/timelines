import * as React from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";

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

import EventsDnDGrid from "./EventsDnDGrid";
import TimelineBuilder from "./TimelineBuilder";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const TimelinesDash = ({items, setItems}) => {
    const [eventID, setEventID] = React.useState(0);
    const [eventsData, setEventsData] = React.useState([]);
    const { timeline_name } = useParams();

    const [activeId, setActiveId] = React.useState(null);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id
                );
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    };

    const handleDragCancel = () => {
        setActiveId(null);
    };

    return (
        
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            sensors={sensors}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <Box
                    sx={{
                        flexGrow: 1,
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Offset sx={{ mb: 1 }} />
                    <TimelineBuilder
                        eventsData={eventsData}
                        setEventsData={setEventsData}
                        setEventID={setEventID}
                        items={items}
                        setItems={setItems}
                        timeline_name={timeline_name}
                    />
                    <EventsDnDGrid
                        eventsData={eventsData}
                        setEventsData={setEventsData}
                        activeId={activeId}
                        eventID={eventID}
                        items={items}
                    />
                </Box>
            </SortableContext>
        </DndContext>
    );
};

export default TimelinesDash;
