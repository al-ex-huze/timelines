import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import TimelineIcon from "@mui/icons-material/Timeline";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HexagonIcon from "@mui/icons-material/Hexagon";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PieChartIcon from "@mui/icons-material/PieChart";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export const drawerItems = {
    "/": [{ text: "Timeline", icon: ViewTimelineIcon }],
    "/timelines": [
        { text: "Timeline", icon: ViewTimelineIcon },
        // { text: "Line", icon: SsidChartIcon },
        // { text: "Bar", icon: EqualizerIcon },
        // { text: "Polar", icon: TrackChangesIcon },
        // { text: "Radar", icon: HexagonIcon },
        // { text: "Donut", icon: DonutLargeIcon },
        // { text: "Pie", icon: PieChartIcon },
        // { text: "Bubble", icon: BubbleChartIcon },
        { text: "Create Timeline", icon: AddIcon },
        { text: "Delete", icon: DeleteIcon },
    ],
    "/timelines/*": [
        { text: "Timeline", icon: ViewTimelineIcon },
        { text: "Add Event", icon: AddIcon },
        { text: "Delete", icon: DeleteIcon },
    ],
    "/home": [
        { text: "Add", icon: AddIcon },
        { text: "Delete", icon: DeleteIcon },
    ],
    "/calendar": [
        { text: "Add", icon: AddIcon },
        { text: "Delete", icon: DeleteIcon },
    ],
    "/blog": [
        { text: "Add", icon: AddIcon },
        { text: "Delete", icon: DeleteIcon },
    ],
};
