import * as React from "react";

import { getEvents } from "../../api";

import CircularLoader from "./CircularLoader";
import TimelineChart from "./TimelineChart";

const TimelineBuilder = ({
    setEventID,
    timelinesData,
    timelineSingleData,
    setTimelineSingleData,
    setLineChartSelectedWeek,
    timeline_name,
    timelineSingleName,
    setTimelineSingleName,
    items,
    setItems,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [eventsData, setEventsData] = React.useState([]);

    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);

    React.useEffect(() => {
        console.log("TimelineBuilder UseEffect()");
        setIsLoading(true);
        getEvents(timelineSingleName, sortByQuery, sortByIsAsc)
            .then((events) => {
                setEventsData(events);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [sortByQuery, sortByIsAsc]);

    if (isLoading) return <CircularLoader />;
    return (
        <>
            {eventsData[0] !== undefined ? (
                <>
                    <TimelineChart
                        timelinesData={timelinesData}
                        timelineSingleData={timelineSingleData}
                        setTimelineSingleData={setTimelineSingleData}
                        eventsData={eventsData}
                        setEventID={setEventID}
                        timelineSingleName={timelineSingleName}
                        setTimelineSingleName={setTimelineSingleName}
                        items={items}
                        setItems={setItems}
                    />
                </>
            ) : null}
        </>
    );
};

export default TimelineBuilder;
