import * as React from "react";

import {
    Box,
    Typography,
    CardMedia,
    Link,
    Chip,
    FormControl,
    InputAdornment,
    OutlinedInput,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import {
    GradientCard,
    StyledCardContent,
    StyledTypography,
} from "../StyledCards";

const BlogFeatured = ({ blogData }) => {
    return (
        <Grid container spacing={2} columns={12}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Link href={`/blog/${blogData[0].event_id}`} underline="none">
                    <GradientCard variant="outlined">
                        <CardMedia
                            component="img"
                            alt="featured post"
                            image={blogData[0].event_img_url_1}
                            aspect-ratio="16 / 9"
                            sx={{
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        />
                        <StyledCardContent>
                            <Typography
                                gutterBottom
                                variant="caption"
                                component="div"
                            >
                                {blogData[0].tag}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                            >
                                {blogData[0].title}
                            </Typography>
                            <StyledTypography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                {blogData[0].description}
                            </StyledTypography>
                        </StyledCardContent>
                    </GradientCard>
                </Link>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Link href={`/blog/${blogData[0].event_id}`} underline="none">
                    <GradientCard variant="outlined">
                        <CardMedia
                            component="img"
                            alt="featured post"
                            image={blogData[1].event_img_url_1}
                            aspect-ratio="16 / 9"
                            sx={{
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        />
                        <StyledCardContent>
                            <Typography
                                gutterBottom
                                variant="caption"
                                component="div"
                            >
                                {blogData[1].tag}
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                            >
                                {blogData[1].title}
                            </Typography>
                            <StyledTypography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                {blogData[1].description}
                            </StyledTypography>
                        </StyledCardContent>
                    </GradientCard>
                </Link>
            </Grid>
        </Grid>
    );
};

export default BlogFeatured;
