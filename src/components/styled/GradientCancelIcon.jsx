import { Box, useTheme } from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";

const GradientCancelIcon = () => {

    const theme = useTheme()

    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.1s ease, box-shadow 0.3s ease",
                "&:hover svg": {
                    fill: "url(#gradient)",
                    transform: "scale(1.1)",
                },
            }}
        >
            <svg width="0" height="0">
                <defs>
                    <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{
                                stopColor:
                                    theme.palette.mode === "dark"
                                        ? "#F8F9FA"
                                        : "#003153",
                                stopOpacity: 1,
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                                stopColor:
                                    theme.palette.mode === "dark"
                                        ? "#F0F3F5"
                                        : "#00253F",
                                stopOpacity: 1,
                            }}
                        />
                    </linearGradient>
                </defs>
            </svg>
            <CancelIcon
                sx={{
                    width: 28,
                    height: 28,
                    fill: "url(#gradient)",
                }}
            />
        </Box>
    );
};

export default GradientCancelIcon;