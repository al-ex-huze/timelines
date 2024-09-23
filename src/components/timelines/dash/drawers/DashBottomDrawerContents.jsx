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

const DashBottomDrawerContents = ({ layout, setLayout }) => {
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
        <>
            <List>
                <ListItem disablePadding>
                    <Link href={`.`} color="inherit" underline="none" width="100%">
                        <ListItemButton>
                            <ListItemIcon>
                                <ArrowBackIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Back"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton onClick={() => toggleRGLItem("Timeline")}>
                        <ListItemIcon>
                            <ViewTimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Timeline"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => toggleRGLItem("Add Event")}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Add Event"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    );
};

export default DashBottomDrawerContents;
