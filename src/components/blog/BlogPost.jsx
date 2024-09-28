import * as React from "react";

import { useParams } from "react-router-dom";
import { experimentalStyled as styled } from "@mui/material/styles";

import {
    Box,
    Button,
    Link,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenWithIcon from "@mui/icons-material/OpenWith";

import { getEventByID } from "../../../api";

import CircularLoader from "../CircularLoader";

const BlogPost = ({}) => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

    const { event_id } = useParams();

    const [blogPost, setBlogPost] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        console.log("BlogPost Use Effect()");
        console.log(event_id);
        if (event_id !== 0) {
            getEventByID(event_id).then((event) => {
                setBlogPost(event);
                console.log(event.title);
                setIsLoading(false);
            });
        }
    }, [event_id]);

    if (event_id === 0) return null;
    if (blogPost === undefined) return null;
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
            <Card
                variant="outlined"
                sx={{ width: 300, maxWidth: 300, height: 300, maxHeight: 300 }}
            >
                <CardHeader title={`${blogPost.title}`} />
                <CardMedia
                    component="img"
                    height="100"
                    image={`${blogPost.event_img_url_1}`}
                    alt="Blog Post Image"
                />
                <CardContent>
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
                </CardContent>
                <CardActions disableSpacing></CardActions>
            </Card>
        </Box>
    );
};

export default BlogPost;
