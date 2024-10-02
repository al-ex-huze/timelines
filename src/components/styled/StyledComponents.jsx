import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

export const GradientButton = styled(Button)(({ theme }) => ({
    minWidth: 0,
    padding: "6px 16px 5px 0px 16px",
    position: "relative",
    overflow: "hidden",
    color: "white",
    background:
        "linear-gradient(135deg, rgba(0, 37, 63, 1), rgba(0, 49 , 83, 1))",
    border: "none",
    "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
            "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        transition: "left 0.2s ease",
        opacity: 0,
    },
    "&:hover:before": {
        left: "100%",
        opacity: 1,
        animation: "sheen-animation 0.2s forwards",
    },
    "@keyframes sheen-animation": {
        "0%": { left: "-100%" },
        "100%": { left: "100%" },
    },
}));

export const GradientCard = styled(Card)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    background:
        "linear-gradient(135deg, rgba(240, 243, 245, 0.5), rgba(248, 249, 250, 0.5))",
    ...theme.applyStyles("dark", {
        background:
            "linear-gradient(135deg, rgba(0, 13 , 21, 0.5), rgba(0, 25, 42, 0.5))",
    }),
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
    },
}));

export const GrabHandle = styled(Box)(({ theme }) => ({
    // background:
    //     "linear-gradient(135deg, rgba(0, 37, 63, 1), rgba(0, 49 , 83, 1))",
    // "&:hover": {
    //     background:
    //         "linear-gradient(135deg, rgba(0, 49 , 83, 1), rgba(32, 75, 105, 1))",
    // },
    background:
        "rgba(0, 37, 63, 1)",
    "&:hover": {
        background:
            "linear-gradient(135deg, rgba(0, 49 , 83, 1), rgba(32, 75, 105, 1))",
    },
    transition: "background 0.3s ease",
    position: "fixed",
    width: "100%",
    height: "25px",
    top: -25,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    cursor: "move",
}));

export const StyledCardContent = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 16,
    flexGrow: 1,
    "&:last-child": {
        paddingBottom: 16,
    },
});

export const StyledTypography = styled(Typography)({
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
});

export const StyledPuller = styled("div")(({ theme }) => ({
    width: 40,
    height: 8,
    borderRadius: 3,
    position: "relative",
    top: 8,
    left: "calc(50% - 20px)",
    color: "white",
    background:
        "linear-gradient(135deg, rgba(0, 37, 63, 1), rgba(0, 49 , 83, 1))",
    border: "none",
    animation: "none",
    "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
            "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        transition: "left 0.2s ease",
        opacity: 0,
    },
    "&.animate:before": {
        left: "100%",
        opacity: 1,
        animation: "sheen-animation 0.2s forwards",
    },
    "@keyframes sheen-animation": {
        "0%": { left: "0%" },
        "100%": { left: "100%", width: "0%" },
    },
}));
