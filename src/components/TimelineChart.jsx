import * as React from "react";

import ReactApexChart from "react-apexcharts";
import TimelineChartTogglePanel from "./TimelineChartTogglePanel";

import Box from "@mui/material/Box";

const TimelineChart = ({ eventsData, setEventID, items, setItems }) => {
    const [groupRowsState, setGroupRowsState] = React.useState(true);
    const [groupNames, setGroupNames] = React.useState(true);
    let series = [];
    let options = {};

    series = [
        ...eventsData.map((event) => {
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
                        ID: event.event_id,
                        Timeline: event.timeline,
                        Title: event.title,
                        Body: event.body,
                    },
                ],
            };
        }),
    ];

    options = {
        chart: {
            animations: {
                enabled: true,
                easing: "easeinout",
                speed: 1000,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 500,
                },
            },
            events: {
                dataPointSelection: function (_event, _chartContext, opts) {
                    // console.log(
                    //     opts.w.globals.initialSeries[opts.seriesIndex].data[
                    //         opts.dataPointIndex
                    //     ].ID
                    // );
                    setItems([
                        ...items,
                        {
                            id: String(
                                opts.w.globals.initialSeries[opts.seriesIndex]
                                    .data[opts.dataPointIndex].ID
                            ),
                        },
                    ]);
                },
            },
            toolbar: { show: false },
            type: "rangeBar",
            zoom: {
                enabled: false,
            },
        },
        colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#3F51B5",
            "#546E7A",
            "#D4526E",
            "#8D5B4C",
            "#F86624",
            "#D7263D",
            "#1B998B",
            "#2E294E",
            "#F46036",
            "#E2C044",
        ],
        dataLabels: {
            enabled: false,
            enabledOnSeries: [],
            formatter: function (_val, opt) {
                const data =
                    opt.w.globals.initialSeries[opt.seriesIndex].data[
                        opt.dataPointIndex
                    ];
                return data.Title;
            },
            textAnchor: "start",
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: "14px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "bold",
                colors: undefined,
            },
            background: {
                enabled: true,
                foreColor: "#fff",
                padding: 4,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: "#fff",
                opacity: 0.9,
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: "#000",
                    opacity: 0.45,
                },
            },
            dropShadow: {
                enabled: false,
                top: 1,
                left: 1,
                blur: 1,
                color: "#000",
                opacity: 0.45,
            },
        },
        fill: {
            type: "solid",
        },
        legend: {
            show: false,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "100%",
                rangeBarGroupRows: groupRowsState,
                distributed: false,
                dataLabels: {
                    position: "top",
                    maxItems: 100,
                    hideOverflowingLabels: false,
                    total: {
                        enabled: false,
                        formatter: undefined,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: "#373d3f",
                            fontSize: "12px",
                            fontFamily: undefined,
                            fontWeight: 600,
                        },
                    },
                },
            },
        },
        tooltip: {
            custom: function ({ seriesIndex, dataPointIndex, w }) {
                const data =
                    w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                return (
                    '<div style="color:black;padding:5px 5px 5px 5px;width:25%;">' +
                    "<span>" +
                    data.Timeline +
                    "<br>" +
                    "<b>" +
                    data.Title +
                    "</b>" +
                    "</span>" +
                    "</div>"
                );
            },
        },
        xaxis: {
            type: "datetime",
            min: new Date(2024, 0, 0).getTime(),
            max: new Date(2024, 11, 0).getTime(),
            position: "bottom",
            labels: {
                show: true,
            },
        },
        yaxis: {
            show: false,
            labels: {
                minWidth: 0,
                offsetX: 0,
                offsetY: 0,
            },
        },
    };

    return (
        <Box sx={{ flexDirection: "row" }}>
            <ReactApexChart
                options={options}
                series={series}
                type="rangeBar"
                height={350}
            />
            <TimelineChartTogglePanel
                groupRowsState={groupRowsState}
                setGroupRowsState={setGroupRowsState}
                groupNames={groupNames}
                setGroupNames={setGroupNames}
            />
        </Box>
    );
};

export default TimelineChart;
