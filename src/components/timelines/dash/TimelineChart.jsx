import * as React from "react";

import Box from "@mui/material/Box";

import ReactApexChart from "react-apexcharts";

const TimelineChart = ({ eventsData, groupNames, children, options }) => {
    let series = [
        ...eventsData.map((event, index) => {
            return {
                name: event.title,
                data: [
                    {
                        x: groupNames ? "all" : event.timeline,
                        y: [
                            new Date(event.start_date).getTime(),
                            event.end_date
                                ? new Date(event.end_date).getTime()
                                : new Date().getTime(),
                        ],
                        Id: event.event_id,
                        Index: index,
                        Timeline: event.timeline,
                        Title: event.title,
                        Body: event.body,
                        Image: event.event_img_url_1,
                    },
                ],
            };
        }),
    ];

    return (
        <>
            <ReactApexChart
                options={options}
                series={series}
                type="rangeBar"
                height={"100%"}
            />
            <Box>{children}</Box>
        </>
    );
};

export default TimelineChart;
