import * as React from "react";
import { Routes, Route } from "react-router-dom";

import TimelinesDash from "./TimelinesDash";
import TimelinesDataGrid from "./TimelinesDataGrid";
const Timelines = () => {
    const [layout, setLayout] = React.useState([
        { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
    ]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <TimelinesDataGrid
                        layout={layout}
                        setLayout={setLayout}
                    />
                }
            />
            <Route
                path="/:timeline_name"
                element={
                    <TimelinesDash
                        layout={layout}
                        setLayout={setLayout}
                    />
                }
            />
        </Routes>
    );
};

export default Timelines;
