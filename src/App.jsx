import * as React from "react";
import { Routes, Route } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import { ThemeContext } from "./contexts/ThemeContext";

import AppBarTop from "./components/AppBarTop";
import Blog from "./components/blog/Blog";
import BlogPost from "./components/blog/BlogPost";
import Calendar from "./components/calendar/Calendar";
import Home from "./components/Home";
import Timelines from "./components/timelines/Timelines";
import TimelinesDash from "./components/timelines/dash/TimelinesDash";
import TimelinesDataGridCRUD from "./components/timelines/data-grid/TimelinesDataGridCRUD";

const App = () => {
    const { theme } = React.useContext(ThemeContext);
    const [layout, setLayout] = React.useState([
        { i: "Timeline", x: 0, y: 0, w: 16, h: 1 },
    ]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <AppBarTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/timelines/" element={<Timelines />} />
                    <Route
                        path="/timelines/grid/*"
                        element={
                            <TimelinesDataGridCRUD
                                layout={layout}
                                setLayout={setLayout}
                            />
                        }
                    />
                    <Route
                        path="/timelines/:timeline_name"
                        element={
                            <TimelinesDash
                                layout={layout}
                                setLayout={setLayout}
                            />
                        }
                    />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:event_id" element={<BlogPost />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
};

export default App;
