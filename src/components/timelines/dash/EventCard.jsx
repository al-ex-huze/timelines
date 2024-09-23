import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import OpenWithIcon from "@mui/icons-material/OpenWith";

import DeleteEvent from "./DeleteEvent";

const EventCard = ({ eventCardData }) => {
    eventCardData = JSON.parse(eventCardData);
    return (
        <Card sx={{ width: "100%", height: "100%" }}>
            <CardHeader
                action={
                    <DeleteEvent eventToDelete={eventCardData}/>
                }
                title={`${eventCardData.title}`}
                titleTypographyProps={{ textAlign: "left" }}
            />
            <CardMedia
                component="img"
                height="50"
                image={`${eventCardData.image_url_1}`}
                alt="Event image"
            />
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", textAlign: "justify" }}
                >
                    {eventCardData.body}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default EventCard;
