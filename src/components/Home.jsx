import * as React from "react";

import Grid from "@mui/material/Grid2";

import { Box, Link, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
    GradientCard,
    StyledCardContent,
    StyledTypography,
} from "./StyledComponents";

const Home = () => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Offset sx={{ mt: 1 }} />
                <Grid container spacing={2} columns={12} sx={{ margin: 2 }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Link href={`/timelines`} underline="none">
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
                                        Timelines
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
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                height: "100%",
                            }}
                        >
                            <Link href={`/calendar`} underline="none">
                                <GradientCard
                                    variant="outlined"
                                    sx={{ height: "100%" }}
                                >
                                    <StyledCardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            height: "100%",
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                        >
                                            Calendar
                                        </Typography>
                                        <StyledTypography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            View Calendar
                                        </StyledTypography>
                                    </StyledCardContent>
                                </GradientCard>
                            </Link>
                            <Link href={`/blog`} underline="none">
                                <GradientCard
                                    variant="outlined"
                                    sx={{ height: "100%" }}
                                >
                                    <StyledCardContent
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            height: "100%",
                                        }}
                                    >
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="div"
                                        >
                                            Blog
                                        </Typography>
                                        <StyledTypography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            View blog
                                        </StyledTypography>
                                    </StyledCardContent>
                                </GradientCard>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Tooltip title="Coming soon">
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
                                        Account
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Manage Account
                                    </StyledTypography>
                                </StyledCardContent>
                            </GradientCard>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;
