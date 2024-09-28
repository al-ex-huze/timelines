import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";

export const GradientCard = styled(Card)(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    background:
        "linear-gradient(135deg, rgba(248, 249, 250, 0.5), rgba(240, 243, 245, 0.5))",
    ...theme.applyStyles("dark", {
        background:
            "linear-gradient(135deg,  rgba(0, 25, 42, 0.5),rgba(0, 13 , 21, 0.5))",
    }),
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
    },
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
