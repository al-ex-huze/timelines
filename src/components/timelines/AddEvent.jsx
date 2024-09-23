import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";

import { postEvent } from "../../../api";

import ErrorComponent from "../ErrorComponent";

const AddEvent = ({ timeline_name }) => {
    const [isCreating, setIsCreating] = React.useState(false);
    const [addEventError, setAddEventError] = React.useState("");
    const [eventTitleInput, setEventTitleInput] = React.useState("");
    const [eventBody, setEventBody] = React.useState("");
    const [eventSkills, setEventSkills] = React.useState("");
    const [eventTopics, setEventTopics] = React.useState("");
    const [startDateInput, setStartDateInput] = React.useState(new Date());
    const [endDateInput, setEndDateInput] = React.useState(new Date());

    const handleSubmitNewEvent = (event) => {
        // event.preventDefault();
        setIsCreating(true);
        const newEvent = {
            author: "al-ex-huze",
            timeline: timeline_name,
            title: eventTitleInput,
            body: eventBody,
            skills: eventSkills,
            topics: eventTopics,
            start_date: startDateInput,
            end_date: endDateInput,
        };
        postEvent(newEvent)
            .then(() => {
                setEventTitleInput("");
                setEventBody("");
                setIsCreating(false);
            })
            .catch((error) => {
                console.log(error);
                setAddEventError("Unsuccessful - Something Went Wrong");
            });
    };

    if (addEventError) return <ErrorComponent error={addEventError} />;
    if (isCreating) return <p>Please Wait</p>;
    if (timeline_name !== "Not Set") {
        return (
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                    flexGrow: 1,

                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmitNewEvent}
            >
                <Grid container spacing={1}>
                    <Grid size={6}>
                        <TextField
                            size="small"
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Event"
                            value={eventTitleInput}
                            onChange={(event) => {
                                setEventTitleInput(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            size="small"
                            required
                            id="outlined"
                            label="Description"
                            value={eventBody}
                            onChange={(event) => {
                                setEventBody(event.target.value);
                            }}
                        />
                    </Grid>
                    {/* <Grid size={6}>
                        <TextField
                            size="small"
                            id="outlined"
                            label="Skills"
                            value={eventSkills}
                            onChange={(event) => {
                                setEventSkills(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            size="small"
                            id="outlined"
                            label="Topics"
                            value={eventTopics}
                            onChange={(event) => {
                                setEventTopics(event.target.value);
                            }}
                        />
                    </Grid> */}
                    <Grid size={6}>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="en-gb"
                        >
                            <DatePicker
                                slotProps={{ textField: { size: "small" } }}
                                label="Event Start Date"
                                selected={startDateInput}
                                onChange={(date) =>
                                    date && setStartDateInput(date)
                                }
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={6}>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale="en-gb"
                        >
                            <DatePicker
                                slotProps={{ textField: { size: "small" } }}
                                label="Event End Date"
                                selected={endDateInput}
                                onChange={(date) =>
                                    date && setEndDateInput(date)
                                }
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={6}>
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        );
    }
};

export default AddEvent;
