import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

import { postTimeline } from "../../../../api";
import ErrorComponent from "../../ErrorComponent";
import { GradientButton } from "../../styled/StyledComponents";

const AddTimeline = () => {
    const [error, setError] = React.useState(null);
    const [isCreating, setIsCreating] = React.useState(false);
    const [timelineNameInput, setTimelineNameInput] = React.useState("");
    const [descriptionInput, setDescriptionInput] = React.useState("");

    const today = dayjs();
    const oneWeekAgo = today.subtract(7, "day");
    const [beginDateInput, setBeginDateInput] = React.useState(oneWeekAgo);
    const [finishDateInput, setFinishDateInput] = React.useState(today);

    const handleSubmitNewTimeline = (event) => {
        setIsCreating(true);
        const newTimeline = {
            timeline_name: timelineNameInput,
            description: descriptionInput,
            begin_date: beginDateInput.format(`YYYY-MM-DD`),
            finish_date: finishDateInput.format(`YYYY-MM-DD`),
        };
        const postNewTimeline = async (newTimeline) => {
            setError(null);
            setIsCreating(true);
            try {
                await postTimeline(newTimeline);
            } catch (error) {
                setError(error);
            } finally {
                setTimelineNameInput("");
                setDescriptionInput("");
                setIsCreating(false);
            }
        };
        postNewTimeline(newTimeline);
    };

    if (error) {
        return <ErrorComponent error={error} />;
    }
    if (isCreating) {
        return <p>Please Wait</p>;
    }
    return (
        <Card
            component="form"
            sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                padding: 5,
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmitNewTimeline}
        >
            <Grid container spacing={1}>
                <Grid size={6}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                    >
                        <DatePicker
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                },
                            }}
                            label="Start Date"
                            selected={beginDateInput}
                            value={dayjs(beginDateInput)}
                            onChange={(date) => {
                                setBeginDateInput(date.toDate());
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid size={6}>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale="en-gb"
                    >
                        <DatePicker
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                },
                            }}
                            label="End Date"
                            selected={finishDateInput}
                            value={dayjs(finishDateInput)}
                            onChange={(date) => {
                                setFinishDateInput(date.toDate());
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid size={6}>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Timeline Name"
                        value={timelineNameInput}
                        onChange={(event) => {
                            setTimelineNameInput(event.target.value);
                        }}
                    />
                </Grid>
                <Grid size={6}>
                    <TextField
                        fullWidth
                        required
                        id="outlined"
                        label="Description"
                        value={descriptionInput}
                        onChange={(event) => {
                            setDescriptionInput(event.target.value);
                        }}
                    />
                </Grid>
                <Grid size={6}>
                    <GradientButton variant="contained" type="submit">
                        Submit
                    </GradientButton>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AddTimeline;
