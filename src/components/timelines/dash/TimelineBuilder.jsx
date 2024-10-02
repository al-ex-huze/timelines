import * as React from "react";

import { getEvents } from "../../../../api";
import {
    checkIfEventIsInLayout,
    filterEventFromLayout,
} from "../../../utils/utils";

import CircularLoader from "../../CircularLoader";
import ErrorComponent from "../../ErrorComponent";
import TimelineChart from "./TimelineChart";

import RestoreIcon from "@mui/icons-material/Restore";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";

const TimelineBuilder = ({
    eventsData,
    setEventsData,
    isEventAdded,
    setIsEventAdded,
    isEventDeleted,
    setIsEventDeleted,
    layout,
    setLayout,
    timeline_name,
    timelineHeight,
    timelineWidth,
}) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const limit = 100;
    const [pageNumber, setPageNumber] = React.useState(1);
    const [totalCount, setTotalCount] = React.useState(0);
    const [sortByQuery] = React.useState("");
    const [sortByIsAsc] = React.useState(true);
    const [groupRowsState, setGroupRowsState] = React.useState(false);
    const [groupNames, setGroupNames] = React.useState(true);

    const toggleGroupRowsState = () => {
        setGroupRowsState(!groupRowsState);
    };

    React.useEffect(() => {
        const fetchEventData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const eventsData = await getEvents(
                    `${timeline_name}`,
                    sortByQuery,
                    sortByIsAsc,
                    limit,
                    pageNumber
                );
                setEventsData(eventsData);
                setIsEventAdded(false);
                setIsEventDeleted(false);
                setIsLoading(false);
                if (eventsData.length === 0) {
                    setEventsData([]);
                } else {
                    if (eventsData[0].total_count === undefined) {
                        setTotalCount(0);
                    } else {
                        setTotalCount(eventsData[0].total_count);
                    }
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEventData();
    }, [
        timeline_name,
        pageNumber,
        sortByQuery,
        sortByIsAsc,
        limit,
        isEventAdded,
        isEventDeleted,
    ]);

    let options = {
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
                    const newEvent = {
                        id: String(
                            opts.w.globals.initialSeries[opts.seriesIndex].data[
                                opts.dataPointIndex
                            ].Id
                        ),
                        title: String(
                            opts.w.globals.initialSeries[opts.seriesIndex].data[
                                opts.dataPointIndex
                            ].Title
                        ),
                        body: String(
                            opts.w.globals.initialSeries[opts.seriesIndex].data[
                                opts.dataPointIndex
                            ].Body
                        ),
                        image_url_1: String(
                            opts.w.globals.initialSeries[opts.seriesIndex].data[
                                opts.dataPointIndex
                            ].Image
                        ),
                    };
                    handleAddToList(newEvent);
                },
            },
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                    customIcons: [
                        {
                            icon: groupRowsState
                                ? `<img src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/clrallrnd.svg" style="margin:0px 3px;width:24px;height:24px;filter:invert(14%)sepia(24%)saturate(5161%)hue-rotate(182deg)brightness(94%)contrast(102%);">`
                                : `<img src="https://alimageexbuckhuetzepub.s3.eu-north-1.amazonaws.com/vewcolrnd.svg" style="margin:2px 5px;width:20px;height:20px;filter:invert(14%)sepia(24%)saturate(5161%)hue-rotate(182deg)brightness(94%)contrast(102%);">`,
                            index: 4,
                            title: "Collapse/Expand Bars",
                            class: "custom-icon",
                            click: function (chart, options, e) {
                                toggleGroupRowsState();
                            },
                        },
                    ],
                },
            },
            type: "rangeBar",
            zoom: {
                enabled: true,
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
            position: "bottom",
            labels: {
                show: true,
            },
            show: true,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
            labels: {
                minWidth: 20,
                offsetX: 0,
                offsetY: 0,
            },
        },
    };

    const handleAddToList = (newEventItem) => {
        setLayout((previousLayout) => {
            const isEventAlreadyInLayout = checkIfEventIsInLayout(
                previousLayout,
                newEventItem
            );
            if (isEventAlreadyInLayout) {
                return filterEventFromLayout(previousLayout, newEventItem.id);
            } else {
                const newWidget = {
                    i: `Event Card - ${previousLayout.length + 1}`,
                    data: `${JSON.stringify(newEventItem)}`,
                    x: 0,
                    y: 0,
                    w: 2,
                    h: 1,
                };
                return [...previousLayout, newWidget];
            }
        });
    };

    if (isLoading) {
        return <CircularLoader />;
    }
    if (error) {
        return <ErrorComponent error={error} />;
    }
    return (
        <>
            {eventsData[0] !== undefined ? (
                <TimelineChart
                    eventsData={eventsData}
                    timelineHeight={timelineHeight}
                    timelineWidth={timelineWidth}
                    groupRowsState={groupRowsState}
                    setGroupRowsState={setGroupRowsState}
                    groupNames={groupNames}
                    setGroupNames={setGroupNames}
                    layout={layout}
                    setLayout={setLayout}
                    options={options}
                />
            ) : (
                <p>No Events For This Timeline Yet</p>
            )}
        </>
    );
};

export default TimelineBuilder;
