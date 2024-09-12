import React, { forwardRef } from "react";

import EventCard from "./EventCard";

const EventDraggableItem = forwardRef(
    ({ uniqueName, index, faded, style, selectedeventid, ...props }, ref) => {
        const inlineStyles = {
            opacity: faded ? "0.2" : "1",
            transformOrigin: "0 0",
            height: index === 0 ? 345 : 345,
            width: index === 0 ? 345 : 345,
            gridRowStart: index === 0 ? "span 2" : null,
            gridColumnStart: index === 0 ? "span 2" : null,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "grey",
            borderRadius: "8px",
            ...style,
        };

        return (
            <div ref={ref} style={inlineStyles} {...props}>
                <EventCard selectedeventid={selectedeventid} />
            </div>
        );
    }
);

export default EventDraggableItem;
