import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import OpenWithIcon from "@mui/icons-material/OpenWith";

const EventCard = ({ eventToDisplay }) => {
    return (
        <Card
            variant="outlined"
            // sx={{ width: 300, maxWidth: 300, height: 300, maxHeight: 300 }}
        >
            <CardHeader
                // action={
                //     <Tooltip title="Drag Card">
                //         <OpenWithIcon sx={{ margin: 1 }} />
                //     </Tooltip>
                // }
                title={`${eventToDisplay.title}`}
                titleTypographyProps={{ textAlign: "left" }}
            />
            <CardMedia
                component="img"
                height="100"
                image={`${eventToDisplay.image_url_1}`}
                alt="Event image"
            />
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", textAlign: "justify" }}
                >
                    {eventToDisplay.body}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;
