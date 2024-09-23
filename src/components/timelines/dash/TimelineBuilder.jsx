import * as React from "react";

import { getEvents } from "../../../../api";

import CircularLoader from "../../CircularLoader";
import TimelineChart from "./TimelineChart";
import TimelineChartTogglePanel from "./TimelineChartTogglePanel";

const TimelineBuilder = ({
    eventsData,
    setEventsData,
    eventsToDisplay,
    setEventsToDisplay,
    layout,
    setLayout,
    timeline_name,
    timelineHeight,
    timelineWidth,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);
    const [groupRowsState, setGroupRowsState] = React.useState(false);
    const [groupNames, setGroupNames] = React.useState(true);

    React.useEffect(() => {
        console.log("TimelineBuilder UseEffect()");
        setIsLoading(true);
        getEvents(`${timeline_name}`, sortByQuery, sortByIsAsc)
            .then((events) => {
                setEventsData(events);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [timeline_name, sortByQuery, sortByIsAsc]);

    if (isLoading) return <CircularLoader />;
    return (
        <>
            {eventsData[0] !== undefined ? (
                    <TimelineChart
                        eventsData={eventsData}
                        eventsToDisplay={eventsToDisplay}
                        setEventsToDisplay={setEventsToDisplay}
                        timelineHeight={timelineHeight}
                        timelineWidth={timelineWidth}
                        groupRowsState={groupRowsState}
                        setGroupRowsState={setGroupRowsState}
                        groupNames={groupNames}
                        setGroupNames={setGroupNames}
                        layout={layout}
                        setLayout={setLayout}
                    >
                        <TimelineChartTogglePanel
                            groupRowsState={groupRowsState}
                            setGroupRowsState={setGroupRowsState}
                            groupNames={groupNames}
                            setGroupNames={setGroupNames}
                        />
                    </TimelineChart>
            ) : (
                <p>No Events For This Timeline Yet</p>
            )}
        </>
    );
};

export default TimelineBuilder;
