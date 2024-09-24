import * as React from "react";

import { getEvents } from "../../../../api";

import CircularLoader from "../../CircularLoader";
import ErrorComponent from "../../ErrorComponent";
import TimelineChart from "./TimelineChart";
import TimelineChartTogglePanel from "./TimelineChartTogglePanel";

const TimelineBuilder = ({
    eventsData,
    setEventsData,
    isEventAdded,
    setIsEventAdded,
    isEventDeleted,
    setIsEventDeleted,
    layout,
    setLayout,
    timeline_name,
    timelineHeight,
    timelineWidth,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null)
    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);
    const [groupRowsState, setGroupRowsState] = React.useState(false);
    const [groupNames, setGroupNames] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(true);
        getEvents(`${timeline_name}`, sortByQuery, sortByIsAsc)
            .then((events) => {
                setEventsData(events);
                setIsEventAdded(false)
                setIsEventDeleted(false)
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error)
            });
    }, [timeline_name, sortByQuery, sortByIsAsc, isEventAdded, isEventDeleted]);

    if (error) return <ErrorComponent error={error} />
    if (isLoading) return <CircularLoader />;
    return (
        <>
            {eventsData[0] !== undefined ? (
                    <TimelineChart
                        eventsData={eventsData}
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
