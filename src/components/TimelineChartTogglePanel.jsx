const TimelineChartTogglePanel = ({
    groupRowsState,
    setGroupRowsState,
    groupNames,
    setGroupNames,
}) => {
    const toggleGroupRowsState = () => {
        setGroupRowsState(!groupRowsState);
    };

    const toggleGroupNames = () => {
        setGroupNames(!groupNames);
    };
    return (
        <div className="TimelineTogglePanel__control-buttons">
            <div
                className="TimelineTogglePanel__control-button active"
                id="button1"
                onClick={toggleGroupRowsState}
            >
                {groupRowsState ? "▲" : "▼"}
            </div>
            <div
                className="TimelineTogglePanel__control-button"
                id="button2"
                onClick={toggleGroupNames}
            >
                {groupNames ? "▼" : "▲"}
            </div>
            <div
                className="TimelineTogglePanel__control-button"
                id="button2"
            ></div>
        </div>
    );
};

export default TimelineChartTogglePanel;
