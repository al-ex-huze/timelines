import * as React from "react";

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DataGridSideDrawerContents = ({ open }) => {
    return (
        <List>
            <ListItem disablePadding sx={{ display: "block" }}>
                <Link href={`.`} color="inherit" underline="none">
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
                </Link>
            </ListItem>
            <Divider />
            <ListItem disablePadding sx={{ display: "block" }}>
                <Link href={`/timelines/grid/add`} color="inherit" underline="none">
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
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={"Create Timeline"}
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
                </Link>
            </ListItem>
        </List>
    );
};

export default DataGridSideDrawerContents;
