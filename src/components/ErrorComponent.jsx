import Box from "@mui/material/Box";

const ErrorComponent = ({ error }) => {
    return (
        <Box>
            <p>{error.message}: </p>
            <h3>{error.response.data.msg}</h3>
        </Box>
    );
};

export default ErrorComponent;
