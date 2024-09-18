import React, { forwardRef } from "react";

import EventCard from "./EventCard";

const EventDraggableItem = forwardRef(
    ({ uniqueName, index, faded, style, id, ...props }, ref) => {
        const inlineStyles = {
            opacity: faded ? "0.2" : "1",
            transformOrigin: "0 0",
            height: index === 0 ? 300 : 300,
            width: index === 0 ? 300 : 300,
            gridRowStart: index === 0 ? "span 2" : null,
            gridColumnStart: index === 0 ? "span 2" : null,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "grey",
            borderRadius: "8px",
            outline: "none",
            ...style,
        };

        return (
            <div ref={ref} style={inlineStyles} >
                <EventCard id={id} {...props}>
                </EventCard>
            </div>
        );
    }
);

export default EventDraggableItem;