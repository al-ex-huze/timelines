import * as React from "react";

import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

import EventSortableItem from "./EventSortableItem";

const GridPlot = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#20313C",
    }),
}));

const EventsDnDGrid = ({ activeId, items }) => {
    if (items.length === 0) return null
    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            display="flex"
            alignItems="stretch"
        >
            {items.map((selectedeventid, index) => (
                <Grid key={index} size="auto">
                    <GridPlot>
                        <EventSortableItem
                            key={selectedeventid}
                            uniqueName={`${selectedeventid}`}
                            index={index}
                            selectedeventid={`${selectedeventid}`}
                        />
                    </GridPlot>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventsDnDGrid;
