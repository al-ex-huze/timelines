import * as React from "react";

import { useParams } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";

import {
    Box,
    Typography,
    Paper,
    Container,
} from "@mui/material";

import { getEventByID } from "../../../api";

import CircularLoader from "../CircularLoader";
import ErrorComponent from "../ErrorComponent";

const BlogPost = ({}) => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

    const { event_id } = useParams();

    const [blogPost, setBlogPost] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    
    React.useEffect(() => {
        const fetchBlogPostData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const eventData = await getEventByID(event_id);
                setBlogPost(eventData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogPostData();
    }, [event_id]);

    if (error) return <ErrorComponent error={error} />
    if (blogPost === undefined) return <ErrorComponent error={"undefined"} />;
    if (isLoading) return <CircularLoader />;

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
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {`${blogPost.title}`}
                    </Typography>
                    <Box
                        component="img"
                        sx={{
                            height: 300,
                            maxHeight: { xs: 200, md: 400 },
                        }}
                        src={`${blogPost.event_img_url_1}`}
                        alt="Blog Post Image"
                    />
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        gutterBottom
                    >
                        {new Date(blogPost.created_at).toLocaleDateString()}
                    </Typography>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1">{blogPost.body}</Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            {blogPost.body}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                        >
                            {blogPost.skills}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                        >
                            {blogPost.topics}
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default BlogPost;
