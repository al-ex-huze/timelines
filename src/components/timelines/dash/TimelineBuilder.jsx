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
    const [error, setError] = React.useState(null);
    const limit = 100;
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalCount, setTotalCount] = React.useState(0);
    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);
    const [groupRowsState, setGroupRowsState] = React.useState(false);
    const [groupNames, setGroupNames] = React.useState(true);

    React.useEffect(() => {
        const fetchEventData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const eventsData = await getEvents(
                    `${timeline_name}`,
                    sortByQuery,
                    sortByIsAsc,
                    limit,
                    pageNumber
                );
                setEventsData(eventsData);
                setIsEventAdded(false);
                setIsEventDeleted(false);
                setIsLoading(false);
                if (eventsData.length === 0) {
                    setEventsData([]);
                } else {
                    if (eventsData[0].total_count === undefined) {
                        setTotalCount(0);
                    } else {
                        setTotalCount(eventsData[0].total_count);
                    }
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEventData();
    }, [
        timeline_name,
        pageNumber,
        sortByQuery,
        sortByIsAsc,
        limit,
        isEventAdded,
        isEventDeleted,
    ]);

    if (isLoading) {
        return <CircularLoader />;
    }
    if (error) {
        return <ErrorComponent error={error} />;
    }
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
