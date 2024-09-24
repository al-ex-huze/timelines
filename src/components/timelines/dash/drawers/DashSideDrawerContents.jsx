import * as React from "react";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const DashSideDrawerContents = ({ open, layout, setLayout }) => {
    const toggleRGLItem = (listItem) => {
        setLayout((previousLayout) => {
            const itemExists = previousLayout.some(
                (item) => item.i === listItem
            );
            if (itemExists) {
                return previousLayout.filter((item) => item.i !== listItem);
            } else {
                const newWidget = {
                    i: `${listItem}`,
                    x: 0,
                    y: Infinity,
                    w: 8,
                    h: 1,
                };
                return [...layout, newWidget];
            }
        });
    };

    return (
        <List>
            <Link href={`.`} color="inherit" underline="none">
                <ListItem disablePadding sx={{ display: "block" }}>
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
                            <ArrowBackIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Back"}
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
            </Link>
            <Divider />
            <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    onClick={() => toggleRGLItem("Timeline")}
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
                        <ViewTimelineIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Toggle Timeline"}
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
            <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    onClick={() => toggleRGLItem("Add Event")}
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
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"Add Event"}
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
        </List>
    );
};

export default DashSideDrawerContents;