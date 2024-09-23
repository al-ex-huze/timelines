import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const BottomDrawerContents = ({ currentItems, layout, setLayout }) => {
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
            {currentItems.map((element) => (
                <ListItem key={element.text} disablePadding>
                    <ListItemButton onClick={() => toggleRGLItem(element.text)}>
                        <ListItemIcon>
                            <element.icon />
                        </ListItemIcon>
                        <ListItemText primary={element.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default BottomDrawerContents;
