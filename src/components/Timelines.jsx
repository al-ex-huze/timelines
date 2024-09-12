import * as React from "react";

import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";

import EventsDnDGrid from "./EventsDnDGrid";
import TimelineBuilder from "./TimelineBuilder";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Timelines = ({ activeId, items }) => {
    const [eventID, setEventID] = React.useState(0);

    const [selectedEvents, setSelectedEvents] = React.useState([]);

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
            <TimelineBuilder
                setEventID={setEventID}
                setSelectedEvents={setSelectedEvents}
            />
            <EventsDnDGrid
                activeId={activeId}
                eventID={eventID}
                items={items}
                selectedEvents={selectedEvents}
            />
        </Box>
    );
};

export default Timelines;
