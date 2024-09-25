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

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { patchTimelineByName } from "../../../../api";

const EditTimeline = ({ handleSaveEditConfirmed, id, timeline_name }) => {
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

    const handleEditButtonClick = () => {
        setOpenEditDialog(true);
    };

    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
    };

    const handleSuccessDialogClose = () => {
        setOpenSuccessDialog(false);
        handleSaveEditConfirmed(id)
    };

    const handleErrorDialogClose = () => {
        setOpenErrorDialog(false);
    };

    const handleConfirmEdit = () => {
        console.log("debug handcofiurm")
        // patchTimelineByName(timeline_name)
        //     .then(() => {
        //         setOpenSuccessDialog(true);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         setOpenErrorDialog(true);
        //     });
        handleEditDialogClose();
    };

    return (
        <>
            <IconButton  onClick={handleEditButtonClick}>
                <EditIcon />
            </IconButton>
            <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                <DialogTitle>Confirm Save</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to update this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirmEdit}
                        color="primary"
                        variant="contained"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={handleEditDialogClose}
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
                        {timeline_name} was updated successfully.
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
                    <DialogContentText>Edit unsuccessful.</DialogContentText>
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

export default EditTimeline;
