export const filterDeletedEvent = (previousLayout, eventID) => {
    let newLayout = [];
    if (previousLayout.length === 0) return newLayout
    newLayout = previousLayout.filter((widget) => {
        console.log(widget);
        if (!widget.data) {
            return true;
        } else {
            const widgetData = JSON.parse(widget.data);
            console.log(widgetData)
            
            if (widgetData.id === eventID){
                return false
            } else {
                return true
            }
        }
    });
    console.log(newLayout);
    return newLayout;
};
