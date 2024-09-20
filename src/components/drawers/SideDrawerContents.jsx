import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const SideDrawerContents = ({ currentItems, open, layout, setLayout }) => {
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
                    w: 2,
                    h: 4,
                };
                return [...layout, newWidget];
            }
        });
    };
    return (
        <>
            <List>
                {currentItems.map((element, index) => (
                    <ListItem
                        key={element.text}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            onClick={() => toggleRGLItem(element.text)}
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
        </>
    );
};

export default SideDrawerContents;
