import * as React from "react";

import {
    Typography,
    CardMedia,
    Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { getEvents } from "../../../api";

import CircularLoader from "../CircularLoader";
import ErrorComponent from "../ErrorComponent";
import {
    GradientCard,
    StyledCardContent,
    StyledTypography,
} from "../StyledCards";

const BlogFeatured = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    
    const [featuredBlogData, setFeaturedBlogData] = React.useState([]);

    React.useEffect(() => {
        const fetchBlogData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const eventsData = await getEvents(``);
                setFeaturedBlogData(eventsData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogData();
    }, []);

    if (isLoading) {
        return <CircularLoader />;
    }
    if (error) {
        return <ErrorComponent error={error} />;
    }
    return (
        <>
            {featuredBlogData.length === 0 ? (
                <p>No data available</p>
            ) : (
                <Grid container spacing={2} columns={12}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Link
                            href={`/blog/${featuredBlogData[0].event_id}`}
                            underline="none"
                        >
                            <GradientCard variant="outlined">
                                <CardMedia
                                    component="img"
                                    alt="featured post"
                                    image={featuredBlogData[0].event_img_url_1}
                                    aspect-ratio="16 / 9"
                                    sx={{
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                        height: 300,
                                    }}
                                />
                                <StyledCardContent>
                                    <Typography
                                        gutterBottom
                                        variant="caption"
                                        component="div"
                                    >
                                        {featuredBlogData[0].tag}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        {featuredBlogData[0].title}
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {featuredBlogData[0].description}
                                    </StyledTypography>
                                </StyledCardContent>
                            </GradientCard>
                        </Link>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Link
                            href={`/blog/${featuredBlogData[1].event_id}`}
                            underline="none"
                        >
                            <GradientCard variant="outlined">
                                <CardMedia
                                    component="img"
                                    alt="featured post"
                                    image={featuredBlogData[1].event_img_url_1}
                                    aspect-ratio="16 / 9"
                                    sx={{
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                        height: 300,
                                    }}
                                />
                                <StyledCardContent>
                                    <Typography
                                        gutterBottom
                                        variant="caption"
                                        component="div"
                                    >
                                        {featuredBlogData[1].tag}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="div"
                                    >
                                        {featuredBlogData[1].title}
                                    </Typography>
                                    <StyledTypography
                                        variant="body2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {featuredBlogData[1].description}
                                    </StyledTypography>
                                </StyledCardContent>
                            </GradientCard>
                        </Link>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default BlogFeatured;
