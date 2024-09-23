import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { experimentalStyled as styled } from "@mui/material/styles";

import TimelinesDash from "./dash//TimelinesDash";
import TimelinesDataGrid from "./data-grid/TimelinesDataGrid";
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
                <Card
                    variant="outlined"
                    sx={{
                        width: 300,
                        maxWidth: 300,
                        height: 300,
                        maxHeight: 300,
                    }}
                >
                    <CardHeader title={"Custom Timeline"} />
                    <CardContent>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            View data grid of custom timelines
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Link href={`/timelines/grid`}>
                            <Button>Select</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
};

export default Timelines;
