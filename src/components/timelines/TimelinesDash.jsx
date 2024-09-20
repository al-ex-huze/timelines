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

import EventsGrid from "./EventsGrid";
import TimelineBuilder from "./TimelineBuilder";
import EventCard from "./EventCard";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const TimelinesDash = ({
    eventsToDisplay,
    setEventsToDisplay,
    layout,
    setLayout,
}) => {
    const [eventsData, setEventsData] = React.useState([]);
    const { timeline_name } = useParams();

    const renderComponent = (componentType) => {
        switch (componentType) {
            case "Event":
                return <EventCard />;
            case "Timeline":
                return (
                    <TimelineBuilder
                        eventsData={eventsData}
                        setEventsData={setEventsData}
                        eventsToDisplay={eventsToDisplay}
                        setEventsToDisplay={setEventsToDisplay}
                        timeline_name={timeline_name}
                    />
                );
            case "Line":
                return <LineChart />;
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

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    const addWidget = () => {
        const newWidget = {
            i: `widget${layout.length + 1}`,
            x: 0,
            y: Infinity,
            w: 2,
            h: 4,
        };
        setLayout([...layout, newWidget]);
    };

    // Function to remove a widget...
    // Function to update a widget...

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const gridMarginProps = {
        margin: [20, 20], // Default margin for all breakpoints
        // Responsive margin overrides for specific breakpoints
        responsiveMargins: {
            lg: [30, 30],
            md: [20, 20],
            sm: [10, 10],
            xs: [5, 5],
            xxs: [5, 5],
        },
    };

    const responsiveProps = {
        className: "responsive-grid",
        breakpoints: { lg: 1536, md: 1200, sm: 900, xs: 600, xxs: 0 },
        cols: { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 },
        layouts: {
            lg: [{ i: "1", x: 0, y: 0, w: 1, h: 2 }],
            md: [{ i: "1", x: 0, y: 0, w: 1, h: 2 }],
            // More layouts for other breakpoints...
        },
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
                <Button onClick={addWidget}>ADD</Button>

                {layout.map((item) => (
                    <div key={item.i} style={{ background: "#009688" }}>
                        {`Widget ${item.i}`}
                        <Paper elevation={3}>
                            {renderComponent(item.i)}
                        </Paper>
                    </div>
                ))}
                <div key="b">
                    <Paper elevation={3}>
                        <EventsGrid
                            eventsData={eventsData}
                            setEventsData={setEventsData}
                            eventsToDisplay={eventsToDisplay}
                        />
                    </Paper>
                </div>
            </ResponsiveReactGridLayout>
        </Box>
    );
};

export default TimelinesDash;
