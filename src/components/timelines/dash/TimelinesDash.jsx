import * as React from "react";
import { useParams } from "react-router-dom";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Box from "@mui/material/Box";

import { experimentalStyled as styled } from "@mui/material/styles";

import LineBuilder from "./LineBuilder";
import TimelineBuilder from "./TimelineBuilder";
import DashDrawerController from "./drawers/DashDrawerController";

import AddEvent from "./AddEvent";
import EventCard from "./EventCard";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GrabHandle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
    },
    position:"fixed",
    width: "100%",
    height: "25px",
    top: -25,
    cursor: "move",
}));

const TimelinesDash = ({ layout, setLayout }) => {
    const [eventsData, setEventsData] = React.useState([]);
    const { timeline_name } = useParams();

    const renderComponent = (componentType, componentData) => {
        switch (componentType.split(" - ")[0]) {
            case "Event Card":
                return (
                    <>
                        <GrabHandle className={"drag-handle"} />{" "}
                        <EventCard eventCardData={componentData} />
                    </>
                );
            case "Timeline":
                return (
                    <>
                        <GrabHandle className={"drag-handle"} />
                        <TimelineBuilder
                            eventsData={eventsData}
                            setEventsData={setEventsData}
                            layout={layout}
                            setLayout={setLayout}
                            timeline_name={timeline_name}
                            timelineHeight={timelineHeight}
                            timelineWidth={timelineWidth}
                        />
                    </>
                );
            case "Line":
                return <LineBuilder />;
            case "Add Event":
                return (
                    <>
                        <GrabHandle className={"drag-handle"} />
                        <AddEvent
                            useForceUpdate={useForceUpdate}
                            timeline_name={timeline_name}
                        />
                    </>
                );
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
        margin: [75, 75],
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
            <DashDrawerController
                layout={layout}
                setLayout={setLayout}
            />
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
                    draggableHandle=".drag-handle"
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
