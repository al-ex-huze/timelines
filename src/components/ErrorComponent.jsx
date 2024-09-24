import Box from "@mui/material/Box";

const ErrorComponent = ({ error }) => {
    return (
        <Box>
            <p>ERROR : {error.message}</p>
        </Box>
    );
};

export default ErrorComponent;
