import * as React from "react";
import { useParams } from "react-router-dom";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { experimentalStyled as styled } from "@mui/material/styles";

import LineBuilder from "./LineBuilder";
import TimelineBuilder from "./TimelineBuilder";
import DrawerController from "../drawers/DrawerController";

import EventCard from "./EventCard";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const TimelinesDash = ({ layout, setLayout }) => {
    const [eventsData, setEventsData] = React.useState([]);
    const { timeline_name } = useParams();

    const currentItems =  [
        { text: "Timeline", icon: ViewTimelineIcon },
        { text: "Add Event", icon: AddIcon },
        { text: "Delete", icon: DeleteIcon },
    ]
    
    const renderComponent = (componentType, componentData) => {
        switch (componentType.split(" ")[0]) {
            case "EventCard":
                return <EventCard eventCardData={componentData} />;
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
        if (width < 900) return 1;
        if (width < 1200) return 1;
        if (width < 1536) return 2;
        return 4;
    };

    const [cols, setCols] = React.useState(getCols(window.innerWidth));

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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
        margin: [50, 50],
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
        rowHeight: 200,
        layouts: {
            lg: [
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            md: [
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            sm: [
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            xs: [
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
            xxs: [
                { i: "Timeline", x: 0, y: 0, w: 8, h: 1 },
                { i: "Line", x: 0, y: 0, w: 8, h: 1 },
            ],
        },
        compactType: "vertical",
        isDraggable: true,
        isResizable: true,
        margin: gridMarginProps.margin,
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
        if (oldItem.i === "Timeline") {
            updateTimelineSize("100%");
        }
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
        if (oldItem.i === "Timeline") {
            setTimeout(function () {
                updateTimelineSize("100%");
            }, 200);
        }
    };

    return (
        <>
            <DrawerController currentItems={currentItems} layout={layout} setLayout={setLayout} />
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Offset sx={{ mb: 1 }} />
                <ResponsiveReactGridLayout
                    {...responsiveProps}
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    onResizeStop={handleResizeStop}
                >
                    {layout.map((item) => (
                        <div key={item.i}>
                            {renderComponent(item.i, item.data)}
                        </div>
                    ))}
                </ResponsiveReactGridLayout>
            </Box>
        </>
    );
};

export default TimelinesDash;
