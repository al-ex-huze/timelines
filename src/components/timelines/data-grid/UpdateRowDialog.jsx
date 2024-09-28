import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const UpdateRowDialog = ({
    handleCancelUpdate,
    handleConfirmUpdate,
    openRowUpdateSuccessDialog,
    setOpenRowUpdateSuccessDialog,
    openRowUpdateErrorDialog,
    setOpenRowUpdateErrorDialog,
    openUpdateRowDialog,
}) => {
    const handleSuccessDialogClose = () => {
        setOpenRowUpdateSuccessDialog(false);
    };

    const handleErrorDialogClose = () => {
        setOpenRowUpdateErrorDialog(false);
    };

    return (
        <>
            <Dialog open={openUpdateRowDialog} onClose={handleCancelUpdate}>
                <DialogTitle>Confirm Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to update existing timeline?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirmUpdate}
                        color="primary"
                        variant="contained"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={handleCancelUpdate}
                        color="secondary"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openRowUpdateSuccessDialog} onClose={handleSuccessDialogClose}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Updated successfully.
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
            <Dialog open={openRowUpdateErrorDialog} onClose={handleErrorDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update unsuccessful.</DialogContentText>
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

export default UpdateRowDialog;
