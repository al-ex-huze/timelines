import * as React from "react";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const BottomDrawerContents = ({currentItems}) => {
    return (
        <div>
            <List>
                {currentItems.map((element, index) => (
                    <ListItem key={element.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <element.icon />
                            </ListItemIcon>
                            <ListItemText primary={element.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {currentItems.map((element, index) => (
                    <ListItem key={element.text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <element.icon />
                            </ListItemIcon>
                            <ListItemText primary={element.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
        // </Box>
    );
};

export default BottomDrawerContents;
