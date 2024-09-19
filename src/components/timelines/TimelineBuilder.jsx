import * as React from "react";

import { getEvents } from "../../../api";

import CircularLoader from "../CircularLoader";
import TimelineChart from "./TimelineChart";

const TimelineBuilder = ({
    setEventID,
    eventsData,
    setEventsData,
    items,
    setItems,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);

    React.useEffect(() => {
        console.log("TimelineBuilder UseEffect()");
        setIsLoading(true);
        getEvents("", sortByQuery, sortByIsAsc)
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
                        eventsData={eventsData}
                        setEventID={setEventID}
                        items={items}
                        setItems={setItems}
                    />
                </>
            ) : null}
        </>
    );
};

export default TimelineBuilder;
