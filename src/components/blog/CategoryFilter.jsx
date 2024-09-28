import * as React from "react";

import {
    Box,
    Chip,
} from "@mui/material";

import { getTimelines } from "../../../api";
import CircularLoader from "../CircularLoader";

const CategoryFilter = ({ blogFilter, setBlogFilter }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [timelineFilterList, setTimelineFilterList] = React.useState([]);

    const handleChipClick = (category) => {
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

    if (isLoading) {
        return <CircularLoader />;
    }
    if (error) {
        return <ErrorComponent error={error} />;
    }
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
                onClick={() => handleChipClick("")}
                size="medium"
                label="All categories"
                variant={blogFilter === "" ? "" : "outlined"}
            />
            {timelineFilterList.map((timelineFilterItem, index) => {
                return (
                    <Chip
                        key={index}
                        onClick={() => handleChipClick(`${timelineFilterItem}`)}
                        size="medium"
                        label={`${timelineFilterItem}`}
                        variant={blogFilter === timelineFilterItem ? "" : "outlined"}
                    />
                );
            })}
        </Box>
    );
};

export default CategoryFilter;
