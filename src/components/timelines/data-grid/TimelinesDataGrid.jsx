import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { experimentalStyled as styled } from "@mui/material/styles";

import { getTimelines } from "../../../../api";

import AddTimeline from "./AddTimeline";
import CircularLoader from "../../CircularLoader";
import ErrorComponent from "../../ErrorComponent";
import DataGridDrawerController from "./drawers/DataGridDrawerController";

const TimelinesDataGrid = ({ layout, setLayout }) => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const navigate = useNavigate();

    const [createTimelineToggle, setCreateTimelineToggle] =
        React.useState(false);

    const handleViewClick = (event, cellValues) => {
        navigate(`/timelines/${cellValues.row.timeline_name}`);
    };

    const columns = [
        { field: "id", headerName: "ID", hide: true, flex: 1 / 3 },
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleViewClick(event, cellValues);
                        }}
                    >
                        View
                    </Button>
                );
            },
        },
        { field: "timeline_name", headerName: "Timeline", flex: 1 },
        { field: "description", headerName: "Description", flex: 1 },
        { field: "begin_date", headerName: "Begin Date", flex: 1 },
        { field: "finish_date", headerName: "Finish Date", flex: 1 },
    ];

    React.useEffect(() => {
        setIsLoading(true);
        console.log("TimelinesDataGrid Use Effect()");
        getTimelines()
            .then((data) => {
                const dataWithID = data.map((datum, index) => ({
                    ...datum,
                    id: index + 1,
                }));
                setRows(dataWithID);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
    };

    const toggleBottomDrawer = () => {
        setOpenMobileBottom(!openMobileBottom);
    };

    if (error) return <ErrorComponent error={error} />;
    if (isLoading) return <CircularLoader />;
    return (
        <>
            <DataGridDrawerController
                createTimelineToggle={createTimelineToggle}
                setCreateTimelineToggle={setCreateTimelineToggle}
                layout={layout}
                setLayout={setLayout}
            />
            <Box sx={{ width: "100%" }}>
                <Box
                    sx={{
                        flexGrow: 1,
                        height: "99vh",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Offset sx={{ mt: 1 }} />
                    {selectedRow && (
                        <h1>Selected: {selectedRow.timeline_name}</h1>
                    )}
                    <Box style={{ height: "100%", width: "100%" }}>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        onRowClick={handleRowClick}
                                    />
                                }
                            />
                            <Route path="/add" element={<AddTimeline />} />
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default TimelinesDataGrid;
