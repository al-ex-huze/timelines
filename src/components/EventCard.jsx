import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { getEventByID } from "../../api";

const EventCard = ({ selectedeventid }) => {
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
    if (isLoading) return <p>Loading Event</p>;
    return (
        <Card sx={{ width: 345, maxWidth: 345, height: 345, maxHeight: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${eventSingle.title}`}
                subheader={`${eventSingle.event_id}`}
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
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {eventSingle.skills}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {eventSingle.topics}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default EventCard;
