import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en-gb";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

import { postTimeline } from "../../../../api";

import ErrorComponent from "../../ErrorComponent";

const AddTimeline = () => {
    const [isCreating, setIsCreating] = React.useState(false);
    const [addTimelineError, setAddTimelineError] = React.useState("");
    const [timelineNameInput, setTimelineNameInput] = React.useState("");
    const [descriptionInput, setDescriptionInput] = React.useState("");
    const [beginDateInput, setBeginDateInput] = React.useState(new Date());
    const [finishDateInput, setFinishDateInput] = React.useState(new Date());

    const handleSubmitNewTimeline = (event) => {
        setIsCreating(true);
        const newTimeline = {
            timeline_name: timelineNameInput,
            description: descriptionInput,
            begin_date: beginDateInput,
            finish_date: finishDateInput,
        };
        postTimeline(newTimeline)
            .then(() => {
                setTimelineNameInput("");
                setDescriptionInput("");
                setIsCreating(false);
            })
            .catch((error) => {
                setAddTimelineError("Unsuccessful - Something Went Wrong");
            });
    };

    if (addTimelineError) return <ErrorComponent error={addTimelineError} />;
    if (isCreating) return <p>Please Wait</p>;
    return (
        <Card
            component="form"
            sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                padding: 5
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
                            onChange={(date) => date && setBeginDateInput(date)}
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
                            onChange={(date) =>
                                date && setFinishDateInput(date)
                            }
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
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AddTimeline;
