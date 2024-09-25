import * as React from "react";

import {
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import { deleteTimelineByName } from "../../../../api";

const DeleteTimeline = ({ handleDeleteClick, id, timeline_name }) => {
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

    const handleDeleteButtonClick = () => {
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleSuccessDialogClose = () => {
        setOpenSuccessDialog(false);
        handleDeleteClick(id)
    };

    const handleErrorDialogClose = () => {
        setOpenErrorDialog(false);
    };

    const handleConfirmDelete = () => {
        deleteTimelineByName(timeline_name)
            .then(() => {
                setOpenSuccessDialog(true);
            })
            .catch((error) => {
                console.log(error);
                setOpenErrorDialog(true);
            });
        handleDeleteDialogClose();
    };

    return (
        <>
            <IconButton  onClick={handleDeleteButtonClick}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirmDelete}
                        color="primary"
                        variant="contained"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={handleDeleteDialogClose}
                        color="secondary"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openSuccessDialog} onClose={handleSuccessDialogClose}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {timeline_name} was deleted successfully.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSuccessDialogClose}
                        variant="contained"
                        color="primary"
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openErrorDialog} onClose={handleErrorDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>Delete unsuccessful.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleErrorDialogClose}
                        variant="contained"
                        color="primary"
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteTimeline;
