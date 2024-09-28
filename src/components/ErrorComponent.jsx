import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";

const ErrorComponent = ({ error }) => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
    return (
        <Box>
            <Offset sx={{ mt: 1 }} />
            <p>ERROR : {error.message ? error.message : error}</p>
        </Box>
    );
};

export default ErrorComponent;