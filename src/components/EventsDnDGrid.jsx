import * as React from "react";

import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

import { DragOverlay } from "@dnd-kit/core";

import EventSortableItem from "./EventSortableItem";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

const EventsDnDGrid = ({ activeId, eventID, items }) => {
    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            display="flex"
            alignItems="stretch"
        >
            {items.map((uniqueName, index) => (
                <Grid key={index} size="auto">
                    <Item>
                        <EventSortableItem
                            key={uniqueName}
                            uniqueName={uniqueName}
                            index={index}
                            eventID={eventID}
                        />
                    </Item>
                </Grid>
            ))}
        </Grid>
    );
};

export default EventsDnDGrid;