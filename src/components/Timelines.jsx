import * as React from "react";

import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";

import { DragOverlay } from "@dnd-kit/core";

import SortableItem from "./SortableItem";
import DraggableItem from "./DraggableItem";

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

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Timelines = ({ activeId, items }) => {
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
                            {index + 1}
                            <SortableItem
                                key={uniqueName}
                                uniqueName={uniqueName}
                                index={index}
                            />
                        </Item>
                    </Grid>
                ))}
                <DragOverlay adjustScale={true}>
                    {activeId ? (
                        <DraggableItem
                            uniqueName={activeId}
                            index={items.indexOf(activeId)}
                        />
                    ) : null}
                </DragOverlay>
            </Grid>
        </Box>
    );
};

export default Timelines;
