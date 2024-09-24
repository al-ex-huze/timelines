import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { experimentalStyled as styled } from "@mui/material/styles";

const Home = () => {
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
                >
                    <Grid size="auto">
                        <Card
                            variant="outlined"
                            sx={{
                                width: 300,
                                maxWidth: 300,
                                height: 300,
                                maxHeight: 300,
                            }}
                        >
                            <CardHeader title={"Timelines"} />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                >
                                    View and create timelines.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Link href={`/timelines`}>
                                    <Button variant="contained">Select</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size="auto">
                        <Card
                            variant="outlined"
                            sx={{
                                width: 300,
                                maxWidth: 300,
                                height: 300,
                                maxHeight: 300,
                            }}
                        >
                            <CardHeader title={"Calendar"} />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                >
                                    View and schedule events.
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Link href={`/calendar`}>
                                    <Button variant="contained">Select</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid size="auto">
                        <Card
                            variant="outlined"
                            sx={{
                                width: 300,
                                maxWidth: 300,
                                height: 300,
                                maxHeight: 300,
                            }}
                        >
                            <CardHeader title={"Blog"} />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                >
                                    View or create timelines
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Link href={`/blog`}>
                                    <Button variant="contained">Select</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;
