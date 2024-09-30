import Box from "@mui/material/Box";

const CustomResizeHandle = () => {
    return (
        <Box
            sx={{
                width: 64,
                height:64,
                position: "absolute",
                cursor: "nwse-resize",
                bottom: -18,
                right: -19,
                zIndex: 10,
                "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transition: "filter 0.3s ease",
                    filter: "invert(5%) sepia(63%) saturate(4390%) hue-rotate(187deg) brightness(92%) contrast(102%)",
                },
                "&:hover img": {
                    filter: "invert(10%) sepia(28%) saturate(6655%) hue-rotate(185deg) brightness(92%) contrast(104%);",
                },
            }}
        >
            <img
                src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/chvdnr.svg"

            />
        </Box>
    );
};

export default CustomResizeHandle;
