import {
    Box,
    Button,
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
    Typography,
} from "@mui/material";

const UpdateRowDialog = ({    handleCancelUpdate,
    handleConfirmUpdate,
    openUpdateRowDialog,}) =>{

return (
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
);
}

export default UpdateRowDialog