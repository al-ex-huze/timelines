import { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { postEvent } from "../../../api";

import ErrorComponent from "../ErrorComponent";

const AddEvent = ({ timeline_name }) => {

    console.log(timeline_name)
    const [isCreating, setIsCreating] = useState(false);
    const [addEventError, setAddEventError] = useState("");
    const [eventTitleInput, setEventTitleInput] = useState("");
    const [eventBody, setEventBody] = useState("");
    const [eventSkills, setEventSkills] = useState("");
    const [eventTopics, setEventTopics] = useState("");
    const [startDateInput, setStartDateInput] = useState(new Date());
    const [endDateInput, setEndDateInput] = useState(new Date());

    // const [showAddEventToggle, setShowAddEventToggle] = useState(true);

    // const toggleShowAddEvent = () => {
    //     setShowAddEventToggle(!showAddEventToggle);
    // };

    const handleSubmitNewEvent = (event) => {
        event.preventDefault();
        setIsCreating(true);
        const newEvent = {
            author: "Guest",
            timeline: timelineSingleData.timeline_name,
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
            <><p>DEBUG</p>
            <form onSubmit={handleSubmitNewEvent}>
                <ul>
                    <li>
                        <label>
                            <input
                                className="Sidebar__event-title-input"
                                required
                                placeholder="Event *"
                                value={eventTitleInput}
                                onChange={(event) => {
                                    setEventTitleInput(event.target.value);
                                } } />
                        </label>
                        <label>
                            <input
                                className="Sidebar__event-body-input"
                                required
                                placeholder="Description *"
                                value={eventBody}
                                onChange={(event) => {
                                    setEventBody(event.target.value);
                                } } />
                        </label>
                        <label>
                            <input
                                className="Sidebar__skills-body-input"
                                placeholder="Skills"
                                value={eventSkills}
                                onChange={(event) => {
                                    setEventSkills(event.target.value);
                                } } />
                        </label>
                        <label>
                            <input
                                className="Sidebar__topics-body-input"
                                placeholder="Topics"
                                value={eventTopics}
                                onChange={(event) => {
                                    setEventTopics(event.target.value);
                                } } />
                        </label>
                        {/* <label>
        <DatePicker
            selected={startDateInput}
            onChange={(date) =>
                date && setStartDateInput(date)
            }
            dateFormat="dd/MM/yyyy"
        />
    </label>
    <label>
        <DatePicker
            selected={endDateInput}
            onChange={(date) =>
                date && setEndDateInput(date)
            }
            dateFormat="dd/MM/yyyy"
        />
    </label> */}
                    </li>
                </ul>
                <button type="submit">Submit</button>
            </form></>
        );
    }
};

export default AddEvent;
