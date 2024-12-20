import * as React from "react";
import { useParams } from "react-router-dom";

import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import Box from "@mui/material/Box";

import { experimentalStyled as styled } from "@mui/material/styles";

import AddEvent from "./AddEvent";
import DashItemResizeHandle from "../../styled/DashItemResizeHandle";
import DashDrawerController from "./drawers/DashDrawerController";
import EventCard from "./EventCard";
import TimelineBuilder from "./TimelineBuilder";
import { GrabHandle } from "../../styled/StyledComponents";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const TimelinesDash = ({ layout, setLayout }) => {
    const { timeline_name } = useParams();
    const [eventsData, setEventsData] = React.useState([]);
    const [isEventAdded, setIsEventAdded] = React.useState(false);
    const [isEventDeleted, setIsEventDeleted] = React.useState(false);
    const [timelineHeight, setTimelineHeight] = React.useState("100%");
    const [timelineWidth, setTimelineWidth] = React.useState("100%");
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    const getCols = (width) => {
        if (width < 600) return 1;
        if (width < 900) return 1;
        if (width < 1200) return 4;
        if (width < 1536) return 8;
        return 16;
    };

    const [cols, setCols] = React.useState(getCols(window.innerWidth));

    const useForceUpdate = () => {
        const [, setCount] = React.useState(0);
        return () => setCount((count) => count + 1);
    };

    const forceUpdate = useForceUpdate();

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

    const renderComponent = (componentType, componentData) => {
        switch (componentType.split(" - ")[0]) {
            case "Event Card":
                return (
                    <>
                        <GrabHandle className={"drag-handle"} />
                        <EventCard
                            eventCardData={componentData}
                            eventCardLayoutID={componentType.split(" - ")[1]}
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
                            cols={cols}
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

    const gridMarginProps = {
        margin: [25, 50],
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
        rowHeight: 360,
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
    ) => {};

    const handleDragStop = (
        layout,
        oldItem,
        newItem,
        placeholder,
        e,
        element
    ) => {
        if (oldItem.i === "Timeline") {
            updateTimelineSize("100%");
        }
    };

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
        if (oldItem.i === "Timeline") {
            setTimeout(function () {
                updateTimelineSize("100%");
            }, 200);
        }
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
                    layout={layout}
                    onDragStart={handleDragStart}
                    onDragStop={handleDragStop}
                    onResizeStop={handleResizeStop}
                    draggableHandle=".drag-handle"
                    resizeHandle={
                        <div>
                            <DashItemResizeHandle />
                        </div>
                    }
                >
                    {layout.map((item) => (
                        <div key={item.i} data-grid={item}>
                            {renderComponent(item.i, item.data)}
                        </div>
                    ))}
                </ResponsiveReactGridLayout>
            </Box>
        </>
    );
};

export default TimelinesDash;
