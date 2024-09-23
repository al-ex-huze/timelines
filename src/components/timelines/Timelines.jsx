import * as React from "react";
import { Routes, Route } from "react-router-dom";

import TimelinesDash from "./TimelinesDash";
import TimelinesDataGrid from "./TimelinesDataGrid";
const Timelines = ({ layout, setLayout }) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <TimelinesDataGrid layout={layout} setLayout={setLayout} />
                }
            />
            <Route
                path="/:timeline_name"
                element={
                    <TimelinesDash layout={layout} setLayout={setLayout} />
                }
            />
        </Routes>
    );
};

export default Timelines;
