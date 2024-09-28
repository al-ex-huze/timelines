import { Box, Link, Typography } from "@mui/material";

import { experimentalStyled as styled } from "@mui/material/styles";

import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const StyledTypography = styled(Typography)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
});

const TitleTypography = styled(Typography)(({ theme }) => ({
    position: "relative",
    textDecoration: "none",
    "&:hover": { cursor: "pointer" },
    "& .arrow": {
        visibility: "hidden",
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
    },
    "&:hover .arrow": {
        visibility: "visible",
        opacity: 0.7,
    },
    "&:focus-visible": {
        outline: "3px solid",
        outlineColor: "hsla(210, 98%, 48%, 0.5)",
        outlineOffset: "3px",
        borderRadius: "8px",
    },
    "&::before": {
        content: '""',
        position: "absolute",
        width: 0,
        height: "1px",
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.text.primary,
        opacity: 0.3,
        transition: "width 0.3s ease, opacity 0.3s ease",
    },
    "&:hover::before": {
        width: "100%",
    },
}));
const BlogListCard = ({ postData }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 1,
                height: "100%",
            }}
        >
            <Link
                href={`/blog/${postData.event_id}`}
                textDecoration="none"
                underline="none"
            >
                <Typography
                    gutterBottom
                    variant="caption"
                    component="div"
                    color="text.primary"
                >
                    {postData.timeline}
                </Typography>
                <TitleTypography
                    gutterBottom
                    variant="h6"
                    tabIndex={0}
                    color="text.primary"
                >
                    {postData.title}
                    <NavigateNextRoundedIcon
                        className="arrow"
                        sx={{ fontSize: "1rem" }}
                    />
                </TitleTypography>
                <StyledTypography
                    variant="body2"
                    color="text.primary"
                    gutterBottom
                >
                    {postData.description}
                </StyledTypography>
            </Link>
        </Box>
    );
};

export default BlogListCard;
