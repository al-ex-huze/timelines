import * as React from "react";

import {
    Box,
    Typography,
    CardMedia,
    Chip,
    FormControl,
    InputAdornment,
    OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { experimentalStyled as styled } from "@mui/material/styles";

import { getTimelines } from "../../../api";
import BlogList from "./BlogList";
import BlogFeatured from "./BlogFeatured";
import CircularLoader from "../CircularLoader";

import {
    GradientCard,
    StyledCardContent,
    StyledTypography,
} from "../StyledCards";

const TimelineFilter = ({ blogFilter, setBlogFilter }) => {
    const [timelineFilterList, setTimelineFilterList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const handleClick = (category) => {
        setBlogFilter(category);
    };
    React.useEffect(() => {
        const getTimelinesData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const timelinesData = await getTimelines();
                const timelineNames = timelinesData.map((timeline) => {                    
                    return timeline.timeline_name;
                });
                setTimelineFilterList(timelineNames);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getTimelinesData();
    }, []);

    return (
        <Box
            sx={{
                display: "inline-flex",
                flexDirection: "row",
                gap: 3,
                overflow: "auto",
            }}
        >
            <Chip
                onClick={() => handleClick("")}
                size="medium"
                label="All categories"
                variant={blogFilter === "" ? "" : "outlined"}
            />
            {timelineFilterList.map((timelineFilterItem, index) => {
                return (
                    <Chip
                        key={index}
                        onClick={() => handleClick(`${timelineFilterItem}`)}
                        size="medium"
                        label={`${timelineFilterItem}`}
                        variant={blogFilter === timelineFilterItem ? "" : "outlined"}
                    />
                );
            })}
        </Box>
    );
};

export default TimelineFilter;
