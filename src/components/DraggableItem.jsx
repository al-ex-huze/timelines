import React, { forwardRef } from "react";

const DraggableItem = forwardRef(
    ({ uniqueName, index, faded, style, ...props }, ref) => {
        const inlineStyles = {
            opacity: faded ? "0.2" : "1",
            transformOrigin: "0 0",
            height: index === 0 ? 200 : 200,
            gridRowStart: index === 0 ? "span 2" : null,
            gridColumnStart: index === 0 ? "span 2" : null, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "grey",
            ...style,
        };

        return (
            <div ref={ref} style={inlineStyles} {...props}>
                {uniqueName}
            </div>
        );
    }
);

export default DraggableItem;