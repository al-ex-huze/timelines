import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenWithIcon from "@mui/icons-material/OpenWith";

import { getEventByID } from "../../api";

import CircularLoader from "./CircularLoader";
import { BorderStyleOutlined } from "@mui/icons-material";

const EventCard = ({ selectedeventid, ...props }) => {
    const [eventSingle, setEventSingle] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        console.log("EventCard Use Effect()");
        if (selectedeventid !== 0) {
            getEventByID(selectedeventid).then((event) => {
                setEventSingle(event);
                console.log(event.title);
                setIsLoading(false);
            });
        }
    }, [selectedeventid]);

    if (selectedeventid === 0) return null;
    if (eventSingle === undefined) return null;
    if (isLoading) return <CircularLoader />;

    return (
        <Card
            variant="outlined"
            sx={{ width: 300, maxWidth: 300, height: 300, maxHeight: 300 }}
        >
            <CardHeader
                action={
                    <>
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        <Tooltip title="Drag Card">
                            <OpenWithIcon {...props} />
                        </Tooltip>
                    </>
                }
                title={`${eventSingle.title}`}
            />
            <CardMedia
                component="img"
                height="100"
                image={`${eventSingle.event_img_url_1}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {eventSingle.body}
                </Typography>
                {/* <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {eventSingle.skills}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {eventSingle.topics}
                </Typography> */}
            </CardContent>
            <CardActions disableSpacing></CardActions>
        </Card>
    );
};

export default EventCard;

//<Tooltip title="Drag Card">
//    <IconButton sx={{ borderRadius: "8px" }} aria-label="move-card">
//        <OpenWithIcon {...props} sx={{ width: 50, height: 50 }} />
//    </IconButton>
//</Tooltip>;
