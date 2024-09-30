import * as React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import {
    GradientCard,
    StyledCardContent,
    StyledTypography,
} from "../styled/StyledComponents";

const Timelines = () => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    height: "99vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Offset sx={{ mt: 1 }} />
                <Grid
                    container
                    spacing={{ xs: 1 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="stretch"
                    sx={{ margin: 2 }}
                >
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Link href={`/timelines/grid`} underline="none">
                            <GradientCard
                                variant="outlined"
                                sx={{ height: "100%" }}
                            >
                                <StyledCardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        Custom Timelines
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        View and create timelines.
                                    </StyledTypography>
                                </StyledCardContent>
                            </GradientCard>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Timelines;
