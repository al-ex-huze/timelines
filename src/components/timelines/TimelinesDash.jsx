import * as React from "react";
import { useParams } from "react-router-dom";

import GridLayout from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
        switch (componentType.split(" ")[0]) {
            case "EventCard":
                const eventCardDataSplit = componentType.split(" ");
                eventCardDataSplit.shift();
                const eventCardDataJoin = eventCardDataSplit.join(" ");
                const eventCardData = JSON.parse(eventCardDataJoin);
                return <EventCard eventCardData={eventCardData} />;
            case "Timeline":
                return (
                    <TimelineBuilder
                        eventsData={eventsData}
                        setEventsData={setEventsData}
                        layout={layout}
                        setLayout={setLayout}
                        timeline_name={timeline_name}
                        timelineHeight={timelineHeight}
                        timelineWidth={timelineWidth}
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
            w: 1,
            h: 1,
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
        margin: [50, 50], // Default margin for all breakpoints
        // Responsive margin overrides for specific breakpoints
        responsiveMargins: {
            lg: [1, 1],
            md: [1, 1],
            sm: [1, 1],
            xs: [1, 1],
            xxs: [1, 1],
        },
    };

    const responsiveProps = {
        className: "responsive-grid",
        breakpoints: { lg: 1536, md: 1200, sm: 900, xs: 600, xxs: 0 },
        cols: { lg: cols, md: cols, sm: cols, xs: cols, xxs: cols },
        containerPadding: [50, 50],
        rowHeight: 100,
        layouts: {
            lg: [
                { i: "Example", x: 0, y: 0, w: 1, h: 1 },
                { i: "EventCard", x: 0, y: 0, w: 1, h: 1 },
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            md: [
                { i: "Example", x: 0, y: 0, w: 1, h: 1 },
                { i: "EventCard", x: 0, y: 0, w: 1, h: 1 },
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            sm: [
                { i: "Example", x: 0, y: 0, w: 1, h: 1 },
                { i: "EventCard", x: 0, y: 0, w: 1, h: 1 },
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            xs: [
                { i: "Example", x: 0, y: 0, w: 1, h: 1 },
                { i: "EventCard", x: 0, y: 0, w: 1, h: 1 },
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            xxs: [
                { i: "Example", x: 0, y: 0, w: 1, h: 1 },
                { i: "EventCard", x: 0, y: 0, w: 1, h: 1 },
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
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
        updateTimelineSize("100%");

        // Update the layout state or perform other actions
    };

    const [timelineHeight, setTimelineHeight] = React.useState("100%");
    const [timelineWidth, setTimelineWidth] = React.useState("100%");

    const useForceUpdate = () => {
        const [, setCount] = React.useState(0);
        return () => setCount((count) => count + 1);
    };

    const forceUpdate = useForceUpdate();

    const updateTimelineSize = (newValue) => {
        setTimelineHeight(newValue);
        setTimelineWidth(newValue);
        forceUpdate();
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
        setTimeout(function () {
            updateTimelineSize("100%");
        }, 200);
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
                    <div key={item.i} style={{ background: "#40657E" }}>
                        {/* {`Widget ${item.i}`} */}
                        {renderComponent(item.i)}
                    </div>
                ))}
            </ResponsiveReactGridLayout>
        </Box>
    );
};

export default TimelinesDash;
