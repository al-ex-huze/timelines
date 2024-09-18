import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import EventDraggableItem from "./EventDraggableItem";

const EventSortableItem = (props) => {
    const sortable = useSortable({ id: props.id });
    const item = props.item;

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
            item={item}
            {...props}
            {...attributes}
            {...listeners}
        >
        </EventDraggableItem>
    );
};

export default EventSortableItem;
