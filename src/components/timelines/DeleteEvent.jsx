import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { deleteEventByID } from "../../../api";

import ErrorComponent from "../ErrorComponent";

const DeleteEvent = ({ eventToDelete }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [deleteEventError, setDeleteEventError] = useState("");

    const toggleDeleteConfirm = () => {
        setShowDeleteConfirm(!showDeleteConfirm);
    };

    const handleDeleteEvent = () => {
        setIsDeleting(true);
        deleteEventByID(eventToDelete.id)
            .then(() => {
                setIsDeleting(false);
                setIsDeleted(true);
            })
            .catch((error) => {
                setIsDeleting(false);
                console.log(error);
                setDeleteEventError(
                    " Delete Unsuccessful - Something Went Wrong"
                );
            });
    };

    if (deleteEventError) return <ErrorComponent error={deleteEventError} />;
    if (isDeleting)
        return <div className="Content__micro-card">Please Wait</div>;
    if (isDeleted)
        return <div className="Content__micro-card">Event Deleted</div>;
    return (
        <div className="Content__component">
            <IconButton onClick={toggleDeleteConfirm}>
                <DeleteIcon />
            </IconButton>
            {showDeleteConfirm && (
                <button
                    className="Content__delete-confirm-button"
                    onClick={handleDeleteEvent}
                >
                    Confirm Delete {eventToDelete.title}
                </button>
            )}
        </div>
    );
};

export default DeleteEvent;
