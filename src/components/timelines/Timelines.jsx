import * as React from "react";
import { Routes, Route } from "react-router-dom";

import TimelinesDash from "./TimelinesDash";
import TimelinesDataGrid from "./TimelinesDataGrid";
const Timelines = ({ layout, setLayout }) => {
    const [chartsToDisplay, setChartsToDisplay] = React.useState([]);
    const [eventsToDisplay, setEventsToDisplay] = React.useState([]);

    return (
        <Routes>
            <Route path="/" element={<TimelinesDataGrid />} />
            <Route
                path="/:timeline_name"
                element={
                    <TimelinesDash
                        chartsToDisplay={chartsToDisplay}
                        setChartsToDisplay={setChartsToDisplay}
                        eventsToDisplay={eventsToDisplay}
                        setEventsToDisplay={setEventsToDisplay}
                        layout={layout}
                        setLayout={setLayout}
                    />
                }
            />
        </Routes>
    );
};

export default Timelines;
