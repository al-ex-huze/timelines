import * as React from "react";
import { Routes, Route } from "react-router-dom";

import TimelinesDash from "./TimelinesDash";
import TimelinesDataGrid from "./TimelinesDataGrid";
const Timelines = () => {
    const [eventsToDisplay, setEventsToDisplay] = React.useState([]);
    return (
        <Routes>
            <Route path="/" element={<TimelinesDataGrid />} />
            <Route
                path="/:timeline_name"
                element={
                    <TimelinesDash
                        eventsToDisplay={eventsToDisplay}
                        setEventsToDisplay={setEventsToDisplay}
                    />
                }
            />
        </Routes>
    );
};

export default Timelines;
