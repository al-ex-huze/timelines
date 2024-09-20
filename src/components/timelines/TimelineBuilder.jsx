import * as React from "react";

import Box from "@mui/material/Box";

import { getEvents } from "../../../api";

import CircularLoader from "../CircularLoader";
import TimelineChart from "./TimelineChart";

const TimelineBuilder = ({
    eventsData,
    setEventsData,
    eventsToDisplay,
    setEventsToDisplay,
    timeline_name,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);

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
        <Box>
            {eventsData[0] !== undefined ? (
                <TimelineChart
                    eventsData={eventsData}
                    eventsToDisplay={eventsToDisplay}
                    setEventsToDisplay={setEventsToDisplay}
                />
            ) : <p>No Events For This Timeline</p>}
        </Box>
    );
};

export default TimelineBuilder;
