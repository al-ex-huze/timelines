import React, { forwardRef } from "react";
import TimelineBuilder from "./TimelineBuilder";

const DraggableItem = forwardRef(
    ({ uniqueName, index, faded, style, ...props }, ref) => {
        const inlineStyles = {
            opacity: faded ? "0.2" : "1",
            transformOrigin: "0 0",
            height: index === 0 ? "fit-content" : "fit-content",
            width: index === 0 ? "100%" : "fit-content",
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
                {uniqueName}
                <TimelineBuilder />
            </div>
        );
    }
);

export default DraggableItem;
