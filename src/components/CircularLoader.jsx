import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const CircularLoader = () => {

    return (
        <Box
            sx={{
                width: 1,
                height: 1,
                display: "flex",
                alignItems:"center",
                justifyContent: "center",
            }}
        >
            <CircularProgress color="inherit" />
        </Box>
    );

}

export default CircularLoader