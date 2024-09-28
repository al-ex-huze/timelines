import * as React from "react";

import {
    Box,
    Typography,
    Pagination
} from "@mui/material";

import Grid from "@mui/material/Grid2";

import BlogListCard from "./BlogListCard";


const BlogList = ({ blogData }) => {

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                All
            </Typography>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {blogData.map((postData, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6 }}>
                        <BlogListCard postData={postData} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
                <Pagination
                    hidePrevButton
                    hideNextButton
                    count={10}
                    boundaryCount={10}
                />
            </Box>
        </div>
    );
};
export default BlogList;
