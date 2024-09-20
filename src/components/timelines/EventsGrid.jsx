import * as React from "react";

import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

import EventCard from "./EventCard";

const GridPlot = styled(Paper)(({ theme }) => ({
    backgroundColor: "#C0C4C8",
    ...theme.typography.body2,
    padding: 1,
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#20313C",
    }),
}));

const EventsGrid = ({ eventsToDisplay }) => {
    return (
        <Grid
            container
            spacing={{ xs: 1 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            display="flex"
            justifyContent="center"
            alignItems="stretch"
        >
                <Grid size="auto">
                    <GridPlot>
                        <EventCard />
                    </GridPlot>
                </Grid>
        </Grid>
    );
};

export default EventsGrid;
