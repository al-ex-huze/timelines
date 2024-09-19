import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
    dashChartsList,
    dashControlsList,
} from "../timelines/DrawersLists";

const SideDrawerContents = ({ open }) => {

    return (
        <>
            <List>
                {dashChartsList.map((element, index) => (
                    <ListItem
                        key={element.text}
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
                                <element.icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={element.text}
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
                {dashControlsList.map((element, index) => (
                    <ListItem
                        key={element.text}
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
                                <element.icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={element.text}
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
