import * as React from "react";

import Button from "@mui/material/Button";

import { deleteTimelineByName } from "../../../../api";

import ErrorComponent from "../../ErrorComponent";

const DeleteTimeline = ({ cellValues, setIsTimelineDeleted }) => {
    const timelineToDelete = cellValues.row.timeline_name;
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [deleteTimelineError, setDeleteTimelineError] = React.useState("");

    const toggleDeleteConfirm = () => {
        setShowDeleteConfirm(!showDeleteConfirm);
    };

    const handleDeleteTimeline = () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${timelineToDelete}?`
        );
        if (confirmDelete) {
            setIsDeleting(true);
            deleteTimelineByName(timelineToDelete)
                .then(() => {
                    setIsDeleting(false);
                    setIsTimelineDeleted(true);
                })
                .catch((error) => {
                    setIsDeleting(false);
                    console.log(error);
                    setDeleteTimelineError(
                        " Delete Unsuccessful - Something Went Wrong"
                    );
                });
        }
    };

    if (deleteTimelineError)
        return <ErrorComponent error={deleteTimelineError} />;
    if (isDeleting) return <div>Please Wait</div>;
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
                handleDeleteTimeline(event, cellValues);
            }}
        >
            Delete
        </Button>
    );
};

export default DeleteTimeline;
