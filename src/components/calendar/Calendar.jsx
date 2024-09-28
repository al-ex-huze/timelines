import * as React from "react";

import { Box } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = () => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

    return (
        <Box
            sx={{
                flexGrow: 1,
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Offset sx={{ mt: 1 }} />
            <Box
                sx={{
                    flexGrow: 1,
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar/>
                </LocalizationProvider>
            </Box>
        </Box>
    );
};

export default Calendar;
