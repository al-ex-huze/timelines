export const filterEventFromLayout = (previousLayout, eventID) => {
    let newLayout = [];
    if (previousLayout.length === 0) return newLayout;
    newLayout = previousLayout.filter((widget) => {
        if (!widget.data) {
            return true;
        } else {
            const widgetData = JSON.parse(widget.data);
            if (widgetData.event_id === eventID) {
                return false;
            } else {
                return true;
            }
        }
    });
    return newLayout;
};

export const checkIfEventIsInLayout = (previousLayout, newEventItem) => {
    let eventExists = false;
    eventExists = previousLayout.some((widget) => {
        if (widget.data === undefined) {
            return false;
        } else {
            const widgetData = JSON.parse(widget.data);
            if(widgetData.event_id === newEventItem.event_id) return true;
        }
    });
    return eventExists;
};