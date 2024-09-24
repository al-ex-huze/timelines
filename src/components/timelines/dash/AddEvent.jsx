import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

import { postEvent } from "../../../../api";

import ErrorComponent from "../../ErrorComponent";

const AddEvent = ({ setIsEventAdded, timeline_name }) => {
    const [isCreating, setIsCreating] = React.useState(false);
    const [addEventError, setAddEventError] = React.useState("");
    const [eventTitleInput, setEventTitleInput] = React.useState("");
    const [eventBodyInput, setEventBodyInput] = React.useState("");
    const [eventSkillsInput, setEventSkillsInput] = React.useState("");
    const [eventTopicsInput, setEventTopicsInput] = React.useState("");
    const [startDateInput, setStartDateInput] = React.useState(new Date());
    const [endDateInput, setEndDateInput] = React.useState(new Date());

    const handleSubmitNewEvent = (event) => {
        setIsCreating(true);
        const newEvent = {
            author: "al-ex-huze",
            timeline: timeline_name,
            title: eventTitleInput,
            body: eventBodyInput,
            skills: eventSkillsInput,
            topics: eventTopicsInput,
            start_date: startDateInput,
            end_date: endDateInput,
        };
        postEvent(newEvent)
            .then(() => {
                setEventTitleInput("");
                setEventBodyInput("");
                setIsEventAdded(true);
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
                                slotProps={{
                                    textField: {
                                        size: "small",
                                        fullWidth: true,
                                    },
                                }}
                                label="End Date"
                                selected={endDateInput}
                                onChange={(date) =>
                                    date && setEndDateInput(date)
                                }
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={6}>
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
                    <Grid size={6}>
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
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        );
    }
};

export default AddEvent;
