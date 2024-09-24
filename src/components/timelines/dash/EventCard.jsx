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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteEventByID } from "../../../../api";
import { filterEventFromLayout } from "../../../utils/utils";

const EventCard = ({ eventCardData, setIsEventDeleted, setLayout }) => {
    eventCardData = JSON.parse(eventCardData);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        handleMenuClose();
        setOpenDeleteDialog(true);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleSuccessDialogClose = () => {
        setOpenSuccessDialog(false);
    };

    const handleErrorDialogClose = () => {
        setOpenErrorDialog(false);
    };

    const removeEventFromLayout = () => {
        setLayout((previousLayout) => {
            return filterDeletedEvent(previousLayout, eventCardData.id);
        });
    };

    const handleConfirmDelete = () => {
        deleteEventByID(eventCardData.id)
            .then(() => {
                setOpenSuccessDialog(true);
                setIsEventDeleted(true);
                filterEventFromLayout();
            })
            .catch((error) => {
                setOpenErrorDialog(true);
            });
        handleDeleteDialogClose();
    };
    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
            }}
        >
            <CardHeader
                action={
                    <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${eventCardData.title}`}
                titleTypographyProps={{ textAlign: "left" }}
            />
            <CardMedia
                component="img"
                height="50"
                image={`${eventCardData.image_url_1}`}
                alt="Event image"
            />
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", textAlign: "justify" }}
                >
                    {eventCardData.body}
                </Typography>
            </CardContent>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleDeleteClick}>
                    <DeleteIcon /> Delete
                </MenuItem>
            </Menu>
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
                        {eventCardData.title} was deleted successfully.
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
        </Card>
    );
};

export default EventCard;
