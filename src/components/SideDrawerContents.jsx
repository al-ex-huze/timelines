import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const SideDrawerContents = ({
    open,
    handleDrawerOpen,
    handleDrawerClose,
}) => {
    const theme = useTheme();

    return (
        <>
            <DrawerHeader></DrawerHeader>
            <DrawerHeader>
                {open ? (
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={handleDrawerOpen}>
                        <ChevronRightIcon />
                    </IconButton>
                )}
            </DrawerHeader>
            <Divider />
            <List>
                {[
                    "Inbox",
                    "Starred",
                    "Send email",
                    "Drafts",
                    "Test",
                    "Testing",
                    "Testing Testing",
                ].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                          justifyContent: "initial",
                                      }
                                    : {
                                          justifyContent: "center",
                                      },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: "center",
                                    },
                                    open
                                        ? {
                                              mr: 3,
                                          }
                                        : {
                                              mr: "auto",
                                          },
                                ]}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                sx={[
                                    open
                                        ? {
                                              opacity: 1,
                                          }
                                        : {
                                              opacity: 0,
                                          },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {[
                    "All mail",
                    "Trash",
                    "Spam",
                    "Trash Testing Testing",
                    "Spam Testing Testing",
                    "All mail Testing",
                    "Trash Testing",
                    "Spam Testing",
                ].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                          justifyContent: "initial",
                                      }
                                    : {
                                          justifyContent: "center",
                                      },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: "center",
                                    },
                                    open
                                        ? {
                                              mr: 3,
                                          }
                                        : {
                                              mr: "auto",
                                          },
                                ]}
                            >
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                sx={[
                                    open
                                        ? {
                                              opacity: 1,
                                          }
                                        : {
                                              opacity: 0,
                                          },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default SideDrawerContents;
