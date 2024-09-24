import * as React from "react";

import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BottomDrawerContents = ({}) => {
    return (
        <List>
            <ListItem disablePadding>
                <Link href={`.`} color="inherit" underline="none" width="100%">
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
                <Link href={`/timelines/grid/add`} color="inherit" underline="none" width="100%">
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
