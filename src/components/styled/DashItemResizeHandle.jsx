import Box from "@mui/material/Box";

const DashItemResizeHandle = () => {
    return (
        <Box
            sx={{
                width: 76,
                height:76,
                position: "absolute",
                cursor: "nwse-resize",
                bottom: -25,
                right: -25,
                zIndex: 10,
                "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "filter 0.3s ease",
                    filter: "invert(14%) sepia(24%) saturate(5161%) hue-rotate(182deg) brightness(94%) contrast(102%);",
                },
                "&:hover img": {
                    filter: "invert(22%) sepia(68%) saturate(490%) hue-rotate(160deg) brightness(98%) contrast(91%);",
                },
            }}
        >
            <img
                src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/chvdnrstr.svg"
            />
        </Box>
    );
};

export default DashItemResizeHandle;
