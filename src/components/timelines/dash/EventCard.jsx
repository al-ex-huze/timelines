import * as React from "react";
import { format } from "date-fns";

import {
    Box,
    Card,
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
    Tooltip,
    Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { deleteEventByID } from "../../../../api";
import { filterEventFromLayout } from "../../../utils/utils";

import { styled } from "@mui/system";

const smallCardWidth = 128;

const StyledCard = styled(Card)({
    position: "relative",
    height: "100%",
    overflow: "hidden",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    padding: "1px",
});

const TopContainer = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    background:
        "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1))",
    display: "block",
    justifyContent: "space-between",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px",
    padding: "0px",
});

const TitleAndMoreContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "0px",
});

const BottomContainer = styled(Box)({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1))",
    overflow: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "8px",
});

const TitleTypography = styled(Typography)({
    color: "white",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "calc(100% - 48px)",
});

const DatesTypography = styled(Typography)({
    color: "white",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "calc(100% - 48px)",
});

const BodyTypography = styled(Typography)({
    color: "white",
    textAlign: "justify",
});

const EventCard = ({ eventCardData, setIsEventDeleted, setLayout }) => {
    eventCardData = JSON.parse(eventCardData);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openSuccessDialog, setOpenSuccessDialog] = React.useState(false);
    const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
    const [isCardSmall, setIsCardSmall] = React.useState(false);
    const cardRef = React.useRef(null);

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
            return filterEventFromLayout(
                previousLayout,
                eventCardData.event_id
            );
        });
    };

    const handleConfirmDelete = () => {
        deleteEventByID(eventCardData.event_id)
            .then(() => {
                setIsEventDeleted(true);
                removeEventFromLayout();
                setOpenSuccessDialog(true);
            })
            .catch((error) => {
                setOpenErrorDialog(true);
            });
        handleDeleteDialogClose();
    };

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.contentRect.width < smallCardWidth) {
                    setIsCardSmall(true);
                } else {
                    setIsCardSmall(false);
                }
            }
        });
        if (cardRef.current) {
            resizeObserver.observe(cardRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <>
            <StyledCard ref={cardRef}>
                <CardMedia
                    component="img"
                    height="100%"
                    image={`${eventCardData.image_url_1}`}
                    alt="Event image"
                />
                <TopContainer
                    sx={{ padding: isCardSmall ? "8px 6px" : "8px 16px" }}
                >
                    <TitleAndMoreContainer>
                        {!isCardSmall && (
                            <TitleTypography variant="h6">
                                {eventCardData.title}
                            </TitleTypography>
                        )}
                        <IconButton
                            size="small"
                            edge="end"
                            onClick={handleMenuClick}
                        >
                            <MoreVertIcon sx={{ color: "white" }} />
                        </IconButton>
                    </TitleAndMoreContainer>
                    {!isCardSmall && (
                        <Tooltip
                            title={`${eventCardData.start_date ? format(
                                new Date(eventCardData.start_date),
                                "dd MMMM yyyy"
                            ) : " "} to ${eventCardData.end_date ? format(
                                new Date(eventCardData.end_date),
                                "dd MMMM yyyy"
                            ) : " "}`}
                        >
                            <DatesTypography variant="body2">
                                {new Date(
                                    eventCardData.start_date
                                ).getFullYear()}
                                {" to "}
                                {new Date(eventCardData.end_date).getFullYear()}
                            </DatesTypography>
                        </Tooltip>
                    )}
                </TopContainer>
                <BottomContainer>
                    {!isCardSmall && (
                        <BodyTypography variant="body2">
                            {eventCardData.body}
                        </BodyTypography>
                    )}
                </BottomContainer>
            </StyledCard>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={removeEventFromLayout}>
                    <CloseIcon /> Close
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <DeleteIcon /> Delete
                </MenuItem>
            </Menu>
            <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event?
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
        </>
    );
};

export default EventCard;
