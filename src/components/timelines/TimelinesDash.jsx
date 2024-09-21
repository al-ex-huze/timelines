import * as React from "react";
import { useParams } from "react-router-dom";

import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { experimentalStyled as styled } from "@mui/material/styles";

import LineBuilder from "./LineBuilder";
import TimelineBuilder from "./TimelineBuilder";
import EventCard from "./EventCard";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const TimelinesDash = ({ layout, setLayout }) => {
    const [eventsData, setEventsData] = React.useState([]);
    const { timeline_name } = useParams();

    const renderComponent = (componentType) => {
        switch (componentType) {
            case "EventCard":
                return <EventCard />;
            case "Timeline":
                return (
                    <TimelineBuilder
                        eventsData={eventsData}
                        setEventsData={setEventsData}
                        timeline_name={timeline_name}
                    />
                );
            case "Line":
                return <LineBuilder />;
            case "Bar":
                return <BarChart />;
            case "Radar":
                return <RadarChart />;
            case "Donut":
                return <DonutChart />;
            case "PolarChart":
                return <PolarChart />;
        }
    };

    const getCols = (width) => {
        if (width < 600) return 1;
        if (width < 900) return 2;
        if (width < 1200) return 4;
        if (width < 1536) return 6;
        return 8;
    };

    const [cols, setCols] = React.useState(getCols(window.innerWidth));

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    const addWidget = () => {
        const newWidget = {
            i: `Example`,
            x: 0,
            y: Infinity,
            w: 8,
            h: 8,
        };
        setLayout([...layout, newWidget]);
    };

    // Function to remove a widget...
    // Function to update a widget...

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setCols(getCols(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const gridMarginProps = {
        margin: [2, 2], // Default margin for all breakpoints
        // Responsive margin overrides for specific breakpoints
        responsiveMargins: {
            lg: [10, 10],
            md: [8, 8],
            sm: [6, 6],
            xs: [4, 4],
            xxs: [2, 2],
        },
    };

    const responsiveProps = {
        className: "responsive-grid",
        breakpoints: { lg: 1536, md: 1200, sm: 900, xs: 600, xxs: 0 },
        cols: { lg: cols, md: cols, sm: cols, xs: cols, xxs: cols },
        rowHeight: 200,
        layouts: {
            lg: [
                { i: "Example", x: 0, y: 0, w: 4, h: 4 },
                { i: "EventCard", x: 0, y: 0, w: 4, h: 4 },
                { i: "Timeline", x: 0, y: 0, w: 16, h: 4 },
                { i: "Line", x: 0, y: 0, w: 4, h: 4 },
            ],
            md: [
                { i: "EventCard", x: 0, y: 0, w: 4, h: 4 },
                { i: "Timeline", x: 0, y: 0, w: 8, h: 4 },
                { i: "Line", x: 0, y: 0, w: 4, h: 4 },
            ],
            sm: [
                { i: "Example", x: 0, y: 0, w: 4, h: 4 },
                { i: "EventCard", x: 0, y: 0, w: 4, h: 4 },
                { i: "Timeline", x: 0, y: 0, w: 4, h: 4 },
                { i: "Line", x: 0, y: 0, w: 4, h: 4 },
            ],
            xs: [
                { i: "Example", x: 0, y: 0, w: 4, h: 4 },
                { i: "EventCard", x: 0, y: 0, w: 4, h: 4 },
                { i: "Timeline", x: 0, y: 0, w: 2, h: 4 },
                { i: "Line", x: 0, y: 0, w: 4, h: 4 },
            ],
            xxs: [
                { i: "Example", x: 0, y: 0, w: 4, h: 4 },
                { i: "EventCard", x: 0, y: 0, w: 4, h: 4 },
                { i: "Timeline", x: 0, y: 0, w: 1, h: 4 },
                { i: "Line", x: 0, y: 0, w: 4, h: 4 },
            ],
            // More layouts for other breakpoints...
        },
        compactType: "vertical",
        isDraggable: true,
        isResizable: true,
        margin: gridMarginProps.margin,
        responseive: "true,",
    };

    const handleDragStart = (
        layout,
        oldItem,
        newItem,
        placeholder,
        e,
        element
    ) => {
        console.log("Started dragging item with id:", oldItem.i);
    };

    const handleDragStop = (
        layout,
        oldItem,
        newItem,
        placeholder,
        e,
        element
    ) => {
        console.log("Stopped dragging item with id:", oldItem.i);
        // Update the layout state or perform other actions
    };

    const handleResizeStop = (
        layout,
        oldItem,
        newItem,
        placeholder,
        e,
        element
    ) => {
        console.log("Resized item with id:", oldItem.i);
        // Update the layout state or perform other actions
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Offset sx={{ mb: 1 }} />
            <Button onClick={addWidget}>ADD</Button>
            <ResponsiveReactGridLayout
                {...responsiveProps}
                onDragStart={handleDragStart}
                onDragStop={handleDragStop}
                onResizeStop={handleResizeStop}
            >
                {layout.map((item) => (
                    <div key={item.i} style={{ background: "#009688" }}>
                        {`Widget ${item.i}`}
                        <Paper elevation={3}>{renderComponent(item.i)}</Paper>
                    </div>
                ))}
            </ResponsiveReactGridLayout>
        </Box>
    );
};

export default TimelinesDash;
