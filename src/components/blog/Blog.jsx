import * as React from "react";

import {
    Box,
    Typography,
    FormControl,
    InputAdornment,
    OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { experimentalStyled as styled } from "@mui/material/styles";

import { getEvents } from "../../../api";
import BlogList from "./BlogList";
import BlogFeatured from "./BlogFeatured";
import CircularLoader from "../CircularLoader";
import ErrorComponent from "../ErrorComponent";
import TimelineFilter from "./TimelineFilter";

import {
    GradientCard,
    StyledCardContent,
    StyledTypography,
} from "../StyledCards";

export function Search() {
    return (
        <FormControl
            sx={{ width: { xs: "100%", md: "25ch" } }}
            variant="outlined"
        >
            <OutlinedInput
                size="small"
                id="search"
                placeholder="Search…"
                sx={{ flexGrow: 1 }}
                startAdornment={
                    <InputAdornment
                        position="start"
                        sx={{ color: "text.primary" }}
                    >
                        <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                }
                inputProps={{
                    "aria-label": "search",
                }}
            />
        </FormControl>
    );
}

const Blog = () => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

    const [blogData, setBlogData] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);
    const limit = 10;
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalCount, setTotalCount] = React.useState(0);
    const [blogFilter, setBlogFilter] = React.useState("");

    React.useEffect(() => {
        setPageNumber(1);
        setBlogFilter(blogFilter);
    }, [blogFilter]);

    React.useEffect(() => {
        const fetchBlogData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const eventsData = await getEvents(
                    `${blogFilter}`,
                    sortByQuery,
                    sortByIsAsc,
                    limit,
                    pageNumber
                );
                setBlogData(eventsData);
                if (eventsData[0].total_count === undefined) {
                    setTotalCount(0);
                } else {
                    setTotalCount(eventsData[0].total_count);
                }
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogData();
    }, [blogFilter, pageNumber]);

    if (isLoading) {
        return <CircularLoader />;
    }
    if (error) {
        return <ErrorComponent error={error} />;
    }
    return (
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
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100vh",
                    width: "100%",
                    display: "block",
                    justifyContent: "center",
                    padding: 2,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div>
                        <Typography variant="h1" gutterBottom>
                            Blog
                        </Typography>
                        <Typography>For blogging</Typography>
                    </div>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column-reverse", md: "row" },
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: { xs: "start", md: "center" },
                            gap: 4,
                            overflow: "auto",
                        }}
                    >
                        <TimelineFilter
                            blogFilter={blogFilter}
                            setBlogFilter={setBlogFilter}
                        />
                    </Box>
                    <BlogFeatured />
                    <Grid container spacing={2} columns={12}>
                        <Grid size={{ xs: 12, md: 7 }}>
                            {blogData.length > 0 ? (
                                <BlogList
                                    blogData={blogData}
                                    limit={limit}
                                    pageNumber={pageNumber}
                                    setPageNumber={setPageNumber}
                                    totalCount={totalCount}
                                    setTotalCount={setTotalCount}
                                />
                            ) : (
                                "No items for this category"
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Offset sx={{ mt: 1 }} />
                            <Box
                                sx={{
                                    height: "50vh",
                                    color: "white",
                                    position: "sticky",
                                    right: 0,
                                    top: 0,
                                    zIndex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <GradientCard>
                                    <StyledCardContent>
                                        <StyledTypography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            Categories
                                        </StyledTypography>
                                    </StyledCardContent>
                                </GradientCard>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default Blog;
