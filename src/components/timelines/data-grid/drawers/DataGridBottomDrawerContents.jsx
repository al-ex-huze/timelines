import * as React from "react";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from "@mui/icons-material/Delete";

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const BottomDrawerContents = ({}) => {
    return (
        <List>
            <ListItem disablePadding>
                <Link href={`.`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ArrowBackIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Back"} />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
                <Link href={`/timelines/grid/add`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddIcon/>
                        </ListItemIcon>
                        <ListItemText primary={"Create Timeline"} />
                    </ListItemButton>
                </Link>
            </ListItem>
        </List>
    );
};

export default BottomDrawerContents;
