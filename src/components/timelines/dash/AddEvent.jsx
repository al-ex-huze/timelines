import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

import { postEvent } from "../../../../api";
import ErrorComponent from "../../ErrorComponent";
import { GradientButton } from "../../styled/StyledComponents";

const AddEvent = ({ setIsEventAdded, timeline_name }) => {
    const [error, setError] = React.useState(null);
    const [isCreating, setIsCreating] = React.useState(false);
    const [eventTitleInput, setEventTitleInput] = React.useState("");
    const [eventBodyInput, setEventBodyInput] = React.useState("");
    const [eventSkillsInput, setEventSkillsInput] = React.useState("");
    const [eventTopicsInput, setEventTopicsInput] = React.useState("");

    const today = dayjs();
    const oneWeekAgo = today.subtract(7, "day");
    const [startDateInput, setStartDateInput] = React.useState(oneWeekAgo);
    const [endDateInput, setEndDateInput] = React.useState(today);

    const handleSubmitNewEvent = (event) => {
        setIsCreating(true);
        const newEvent = {
            author: "al-ex-huze",
            timeline: timeline_name,
            title: eventTitleInput,
            body: eventBodyInput,
            skills: eventSkillsInput,
            topics: eventTopicsInput,
            start_date: startDateInput.format(`YYYY-MM-DD`),
            end_date: endDateInput.format(`YYYY-MM-DD`),
        };
        const postNewEvent = async (newEvent) => {
            setError(null);
            setIsCreating(true);
            try {
                await postEvent(newEvent);
            } catch (error) {
                setError(error);
            } finally {
                setEventTitleInput("");
                setEventBodyInput("");
                setIsEventAdded(true);
                setIsCreating(false);
            }
        };
        postNewEvent(newEvent);
    };

    if (error) {
        return <ErrorComponent error={error} />;
    }
    if (isCreating) return <p>Please Wait</p>;
    if (timeline_name !== "Not Set") {
        return (
            <Card
                component="form"
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: "100%",
                    padding: 1,
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px",
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmitNewEvent}
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
                                        size: "small",
                                        fullWidth: true,
                                    },
                                }}
                                label="Start Date"
                                selected={startDateInput}
                                value={dayjs(startDateInput)}
                                onChange={(date) => {
                                    setStartDateInput(date.toDate());
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
                                        size: "small",
                                        fullWidth: true,
                                    },
                                }}
                                label="End Date"
                                selected={endDateInput}
                                value={dayjs(endDateInput)}
                                onChange={(date) => {
                                    setEndDateInput(date.toDate());
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            size="small"
                            fullWidth
                            required
                            id="outlined-required"
                            label="Event"
                            value={eventTitleInput}
                            onChange={(event) => {
                                setEventTitleInput(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            size="small"
                            fullWidth
                            required
                            id="outlined"
                            label="Description"
                            value={eventBodyInput}
                            onChange={(event) => {
                                setEventBodyInput(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <GradientButton type="submit">
                            Submit
                        </GradientButton>
                    </Grid>
                </Grid>
            </Card>
        );
    }
};

export default AddEvent;
