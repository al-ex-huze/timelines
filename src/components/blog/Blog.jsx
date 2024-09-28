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
import { experimentalStyled as styled } from "@mui/material/styles";

import BlogList from "./BlogList";
import BlogFeatured from "./BlogFeatured";
import { getEvents } from "../../../api";
import CircularLoader from "../CircularLoader";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

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

    const handleClick = () => {
        console.info("You clicked the filter chip.");
    };

    React.useEffect(() => {
        const fetchBlogData = async () => {
            console.log("useeffect");
            setError(null);
            setIsLoading(true);
            try {
                const eventsData = await getEvents(
                    ``,
                    sortByQuery,
                    sortByIsAsc
                );
                setBlogData(eventsData);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogData();
        console.log(blogData);
    }, []);

    if (isLoading || blogData.length === 0) {
        return <CircularLoader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                {" "}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div>
                        <Typography variant="h1" gutterBottom>
                            Blog
                        </Typography>
                        <Typography>For blogging</Typography>
                    </div>
                    <Box
                        sx={{
                            display: { xs: "flex", sm: "none" },
                            flexDirection: "row",
                            gap: 1,
                            width: { xs: "100%", md: "fit-content" },
                            overflow: "auto",
                        }}
                    >
                        <Search />
                    </Box>
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
                        <Box
                            sx={{
                                display: "inline-flex",
                                flexDirection: "row",
                                gap: 3,
                                overflow: "auto",
                            }}
                        >
                            <Chip
                                onClick={handleClick}
                                size="medium"
                                label="All categories"
                            />
                            <Chip
                                onClick={handleClick}
                                size="medium"
                                label="Projects"
                                sx={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: { xs: "none", sm: "flex" },
                                flexDirection: "row",
                                gap: 1,
                                width: { xs: "100%", md: "fit-content" },
                                overflow: "auto",
                            }}
                        >
                            <Search />
                        </Box>
                    </Box>
                    <BlogFeatured blogData={blogData} />
                    <BlogList blogData={blogData} />
                </Box>
            </Box>
        </Box>
    );
};

export default Blog;
