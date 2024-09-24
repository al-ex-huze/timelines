import { IconButton } from "@mui/material";

import Box from "@mui/material/Box";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Tooltip from "@mui/material/Tooltip";

import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const TimelineChartTogglePanel = ({
    groupRowsState,
    setGroupRowsState,
}) => {
    const toggleGroupRowsState = () => {
        setGroupRowsState(!groupRowsState);
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
        </Box>
    );
};

export default TimelineChartTogglePanel;