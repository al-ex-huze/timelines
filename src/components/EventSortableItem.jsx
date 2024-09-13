import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import EventDraggableItem from "./EventDraggableItem";

const EventSortableItem = (props) => {
    const sortable = useSortable({ id: props.uniqueName });
    const selectedeventid = props.selectedeventid;

    const {
        attributes,
        listeners,
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <EventDraggableItem
            ref={setNodeRef}
            style={style}
            selectedeventid={selectedeventid}
            {...props}
            {...attributes}
            {...listeners}
        >
        </EventDraggableItem>
    );
};

export default EventSortableItem;
