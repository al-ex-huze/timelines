import * as React from "react";
import { useParams } from "react-router-dom";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Box from "@mui/material/Box";

import { experimentalStyled as styled } from "@mui/material/styles";

import AddEvent from "./AddEvent";
import DashDrawerController from "./drawers/DashDrawerController";
import EventCard from "./EventCard";
import TimelineBuilder from "./TimelineBuilder";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const GrabHandle = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
    },
    position: "fixed",
    width: "100%",
    height: "25px",
    top: -25,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    cursor: "move",
}));

const TimelinesDash = ({ layout, setLayout }) => {
    const [eventsData, setEventsData] = React.useState([]);
    const [isEventAdded, setIsEventAdded] = React.useState(false);
    const [isEventDeleted, setIsEventDeleted] = React.useState(false);

    const { timeline_name } = useParams();

    const renderComponent = (componentType, componentData) => {
        switch (componentType.split(" - ")[0]) {
            case "Event Card":
                return (
                    <>
                        <GrabHandle className={"drag-handle"} />{" "}
                        <EventCard
                            eventCardData={componentData}
                            setLayout={setLayout}
                            setIsEventDeleted={setIsEventDeleted}
                        />
                    </>
                );
            case "Timeline":
                return (
                    <>
                        <GrabHandle className={"drag-handle"} />
                        <TimelineBuilder
                            eventsData={eventsData}
                            setEventsData={setEventsData}
                            isEventAdded={isEventAdded}
                            setIsEventAdded={setIsEventAdded}
                            isEventDeleted={isEventDeleted}
                            setIsEventDeleted={setIsEventDeleted}
                            layout={layout}
                            setLayout={setLayout}
                            timeline_name={timeline_name}
                            timelineHeight={timelineHeight}
                            timelineWidth={timelineWidth}
                        />
                    </>
                );
            case "Add Event":
                return (
                    <>
                        <GrabHandle className={"drag-handle"} />
                        <AddEvent
                            setIsEventAdded={setIsEventAdded}
                            timeline_name={timeline_name}
                        />
                    </>
                );
        }
    };

    const getCols = (width) => {
        if (width < 600) return 1;
        if (width < 900) return 1;
        if (width < 1200) return 2;
        if (width < 1536) return 3;
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
            lg: [{ i: "Timeline", x: 0, y: 0, w: 8, h: 1 }],
            md: [{ i: "Timeline", x: 0, y: 0, w: 8, h: 1 }],
            sm: [{ i: "Timeline", x: 0, y: 0, w: 8, h: 1 }],
            xs: [{ i: "Timeline", x: 0, y: 0, w: 8, h: 1 }],
            xxs: [{ i: "Timeline", x: 0, y: 0, w: 8, h: 1 }],
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

    const CustomResizeHandle = () => {
        return (
            <Box
                sx={{
                    width: 25,
                    height: 25,
                    position: "absolute",
                    cursor: "nwse-resize",
                    bottom: 0,
                    right: 0,
                    zIndex: 10,
                    "& img": {
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        transition: "filter 0.3s ease",
                        filter: "invert(14%) sepia(46%) saturate(1743%) hue-rotate(173deg) brightness(107%) contrast(103%)",
                    },
                    "&:hover img": {
                        filter: "invert(40%) sepia(8%) saturate(1988%) hue-rotate(161deg) brightness(90%) contrast(93%)",
                    },
                }}
            >
                <img
                    src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/dblarw.svg"
                    height={25}
                    width={25}
                />
            </Box>
        );
    };

    return (
        <>
            <DashDrawerController layout={layout} setLayout={setLayout} />
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
                    resizeHandle={
                        <div>
                            <CustomResizeHandle />
                        </div>
                    }
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
