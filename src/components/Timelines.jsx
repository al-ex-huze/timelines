import * as React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
    height:"100%"
}));

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Timelines = () => {
    return (
        <Box sx={{ flexGrow: 1, height:"100vh", display:"flex", flexDirection:"column" }} >
            <Offset sx={{ mb: 1 }} />
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                display="flex"
                alignItems="stretch"
                
            >
                {Array.from(Array(6)).map((_, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <Item>{index + 1}</Item>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Timelines;
