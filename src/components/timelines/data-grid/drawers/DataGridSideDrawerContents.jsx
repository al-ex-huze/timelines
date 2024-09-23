import * as React from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const DataGridSideDrawerContents = ({ open }) => {

    return (
        <>
            <List>
                <ListItem disablePadding sx={{ display: "block" }}>
                    <Link href={`/timelines/grid/add`}>
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
            <Divider />
        </>
    );
};

export default DataGridSideDrawerContents;
