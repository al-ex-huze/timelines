import * as React from "react";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";

import EventsGrid from "./EventsGrid";
import TimelineBuilder from "./TimelineBuilder";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const TimelinesDash = ({eventsToDisplay, setEventsToDisplay}) => {
    const [eventID, setEventID] = React.useState(0);
    const [eventsData, setEventsData] = React.useState([]);
    const { timeline_name } = useParams();

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
                        eventsData={eventsData}
                        setEventsData={setEventsData}
                        setEventID={setEventID}
                        eventsToDisplay={eventsToDisplay}
                        setEventsToDisplay={setEventsToDisplay}
                        timeline_name={timeline_name}
                    />
                    <EventsGrid
                        eventsData={eventsData}
                        setEventsData={setEventsData}
                        eventID={eventID}
                        eventsToDisplay={eventsToDisplay}
                    />
                </Box>
    );
};

export default TimelinesDash;
