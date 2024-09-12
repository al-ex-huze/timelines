import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Tooltip from "@mui/material/Tooltip";

import ExpandIcon from "@mui/icons-material/Expand";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";

const TimelineChartTogglePanel = ({
    groupRowsState,
    setGroupRowsState,
    groupNames,
    setGroupNames,
}) => {
    const toggleGroupRowsState = () => {
        setGroupRowsState(!groupRowsState);
    };

    const toggleGroupNames = () => {
        setGroupNames(!groupNames);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent:"flex-end" }}>
            <Tooltip title="Collapse/Expand Bars">
                {groupRowsState ? (
                    <IconButton onClick={toggleGroupRowsState}>
                        <ClearAllIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={toggleGroupRowsState}>
                        <ViewColumnIcon />
                    </IconButton>
                )}
            </Tooltip>
            <Tooltip title="Group/Ungroup Rows">
                {groupNames ? (
                    <IconButton onClick={toggleGroupNames}>
                        <UnfoldLessIcon UnfoldMoreIcon />
                    </IconButton>
                ) : (
                    <IconButton onClick={toggleGroupNames}>
                        <UnfoldMoreIcon />
                    </IconButton>
                )}
            </Tooltip>
        </Box>
    );
};

export default TimelineChartTogglePanel;
