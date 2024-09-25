import * as React from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { experimentalStyled as styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";

import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import {
    getTimelines,
    patchTimelineByName,
    postTimeline,
} from "../../../../api";

import AddNewRow from "./AddNewRow";
import AddTimeline from "./AddTimeline";
import CircularLoader from "../../CircularLoader";
import DataGridDrawerController from "./drawers/DataGridDrawerController";
import DeleteTimeline from "./DeleteTimeline";
import EditTimeline from "./EditTimeline";

const TimelinesDataGridCRUD = ({ layout, setLayout }) => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [isRowEditable, setIsRowEditable] = React.useState(false);
    const [timelineToEdit, setTimelineToEdit] = React.useState(null);

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
                    return ["..."];
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
            flex: 1,
        },
        {
            field: "timeline_name",
            headerName: "Timeline",
            editable: isRowEditable,
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            editable: isRowEditable,
            flex: 1,
        },
        {
            field: "begin_date",
            headerName: "Begin Date",
            type: "date",
            editable: isRowEditable,
            flex: 1,
        },
        {
            field: "finish_date",
            headerName: "Finish Date",
            type: "date",
            editable: isRowEditable,
            flex: 1,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1 / 2,
            cellClassName: "actions",
            getActions: ({ id, row }) => {
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
                return [
                    // <EditTimeline
                    // />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id, row.timeline_name)}
                        color="inherit"
                    />,
                    <DeleteTimeline
                        timeline_name={row.timeline_name}
                        handleDeleteConfirmed={handleDeleteConfirmed}
                        id={id}
                    />,
                ];
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
    }, []);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleDeleteConfirmed = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleEditClick = (id, timelineNameToEdit) => () => {
        setTimelineToEdit(timelineNameToEdit);
        setIsRowEditable(true);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "timeline_name" },
        }));
    };

    const handleSaveEditConfirmed = (id) => {
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

    const handleCancelClick = (id) => () => {
        setIsRowEditable(false);
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
        if (newRow.isNew) {
            const newTimeline = {
                timeline_name: newRow.timeline_name,
                description: newRow.description,
                begin_date: newRow.begin_date,
                finish_date: newRow.finish_date,
            };
            postTimeline(newTimeline)
                .then(() => {})
                .catch((error) => {});
        } else {
            const timelineUpdate = {
                timeline_name_update: newRow.timeline_name,
                description_update: newRow.description,
                begin_date_update: newRow.begin_date,
                finish_date_update: newRow.finish_date,
            };
            patchTimelineByName(timelineToEdit, timelineUpdate)
                .then(() => {})
                .catch((error) => {});
        }
        setIsRowEditable(false);
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
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <DataGrid
                                                rows={rows}
                                                columns={columns}
                                                disableSelectionOnClick
                                                editMode="row"
                                                processRowUpdate={
                                                    processRowUpdate
                                                }
                                                onProcessRowUpdateError={(
                                                    error
                                                ) => console.log(error)}
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
                                                slots={{
                                                    footer: AddNewRow,
                                                }}
                                                slotProps={{
                                                    footer: {
                                                        setIsRowEditable,
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
