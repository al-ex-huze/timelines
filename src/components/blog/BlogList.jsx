import * as React from "react";

import { Box, Typography, Pagination } from "@mui/material";

import Grid from "@mui/material/Grid2";

import BlogListCard from "./BlogListCard";

const BlogList = ({
    blogData,
    blogFilter,
    limit,
    pageNumber,
    setPageNumber,
    totalCount,
}) => {
    const handlePageChange = (event, value) => {
        setPageNumber(value);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                {blogFilter}
            </Typography>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {blogData.map((postData, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 12 }}>
                        <BlogListCard postData={postData} />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 4, pb: 4 }}>
                <Pagination
                    onChange={handlePageChange}
                    page={pageNumber}
                    count={Math.round(totalCount / limit)}
                    boundaryCount={5}
                />
            </Box>
        </div>
    );
};
export default BlogList;
