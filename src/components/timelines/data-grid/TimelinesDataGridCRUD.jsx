import * as React from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { experimentalStyled as styled } from "@mui/material/styles";

import { getTimelines, postTimeline } from "../../../../api";

import AddNewRow from "./AddNewRow";
import AddTimeline from "./AddTimeline";
import CircularLoader from "../../CircularLoader";
import DataGridDrawerController from "./drawers/DataGridDrawerController";
import DeleteTimeline from "./DeleteTimeline";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";

const TimelinesDataGridCRUD = ({ layout, setLayout }) => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [rowModesModel, setRowModesModel] = React.useState({});

    const [isTimelineDeleted, setIsTimelineDeleted] = React.useState(false);

    const navigate = useNavigate();

    const handleViewClick = (event, cellValues) => {
        navigate(`/timelines/${cellValues.row.timeline_name}`);
    };

    const columns = [
        { field: "id", headerName: "ID", hide: true, flex: 1 / 3 },
        {
            field: "View",
            renderCell: (cellValues) => {
                const isInEditMode =
                    rowModesModel[cellValues.id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [];
                }
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
            flex: 1 / 2,
        },
        {
            field: "timeline_name",
            headerName: "Timeline",
            editable: true,
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            editable: true,
            flex: 1,
        },
        {
            field: "begin_date",
            headerName: "Begin Date",
            type: "date",
            editable: true,

            flex: 1,
        },
        {
            field: "finish_date",
            headerName: "Finish Date",
            type: "date",
            editable: true,
            flex: 1,
        },
        {
            field: "Delete",
            renderCell: (cellValues) => {
                const isInEditMode =
                    rowModesModel[cellValues.id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [];
                }
                return (
                    <DeleteTimeline
                        setIsTimelineDeleted={setIsTimelineDeleted}
                        cellValues={cellValues}
                    />
                );
            },
            flex: 1,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1 / 2,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [];
            },
        },
    ];

    React.useEffect(() => {
        const getTimelinesData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const timelinesData = await getTimelines();
                const timelinesDataWithID = timelinesData.map(
                    (timeline, index) => ({
                        id: index + 1,
                        timeline_name: timeline.timeline_name,
                        description: timeline.description,
                        begin_date: new Date(timeline.begin_date),
                        finish_date: new Date(timeline.finish_date),
                    })
                );
                setRows(timelinesDataWithID);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        getTimelinesData();
    }, [isTimelineDeleted]);

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
    };

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        console.log(newRow);
        const newTimeline = {
            timeline_name: newRow.timeline_name,
            description: newRow.description,
            begin_date: newRow.begin_date,
            finish_date: newRow.finish_date,
        };
        postTimeline(newTimeline)
            .then(() => {})
            .catch((error) => {
                const addTimelineError = window.confirm(`Error: ${error}`);
            });
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <>
            <DataGridDrawerController layout={layout} setLayout={setLayout} />
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
                    {isLoading ? (
                        <CircularLoader />
                    ) : error ? (
                        <div> {error}</div>
                    ) : (
                        <>
                            <Box style={{ height: "100%", width: "100%" }}>
                                <AddNewRow
                                    rows={rows}
                                    setRows={setRows}
                                    setRowModesModel={setRowModesModel}
                                />
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <DataGrid
                                                rows={rows}
                                                columns={columns}
                                                editMode="row"
                                                processRowUpdate={
                                                    processRowUpdate
                                                }
                                                experimentalFeatures={{
                                                    newEditingApi: true,
                                                }}
                                                rowModesModel={rowModesModel}
                                                onRowModesModelChange={
                                                    handleRowModesModelChange
                                                }
                                                onRowEditStop={
                                                    handleRowEditStop
                                                }
                                                components={{
                                                    CustomAddTimeline:
                                                        AddNewRow,
                                                }}
                                                componentsProps={{
                                                    CustomAddTimeline: {
                                                        rows,
                                                        setRows,
                                                        setRowModesModel,
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/add"
                                        element={<AddTimeline />}
                                    />
                                </Routes>
                            </Box>
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default TimelinesDataGridCRUD;
