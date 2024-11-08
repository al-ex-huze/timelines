import * as React from "react";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { experimentalStyled as styled } from "@mui/material/styles";
import { Box, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import { format } from "date-fns";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import GradientCancelIcon from "../../styled/GradientCancelIcon";
import GradientEditIcon from "../../styled/GradientEditIcon";
import GradientSaveIcon from "../../styled/GradientSaveIcon";

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
import ErrorComponent from "../../ErrorComponent";
import UpdateRowDialog from "./UpdateRowDialog";

import { GradientButton } from "../../styled/StyledComponents";

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
        { field: "id", headerName: "ID" },
        {
            field: "View",
            renderCell: (cellValues) => {
                const isInEditMode =
                    rowModesModel[cellValues.id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return ["..."];
                }
                return (
                    <GradientButton
                        onClick={(event) => {
                            handleViewClick(event, cellValues);
                        }}
                        startIcon={<VisibilityIcon />}
                        sx={{
                            padding: { xs: "6px 0px 5px 12px", md: "4px 12px" },
                        }}
                    >
                        <Typography
                            sx={[
                                isMobile
                                    ? { display: "none" }
                                    : {
                                          display: { xs: "none", md: "flex" },
                                          fontWeight: 400,
                                      },
                            ]}
                        >
                            View
                        </Typography>
                    </GradientButton>
                );
            },
            flex: 2 / 3,
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
            headerName: "Start Date",
            editable: isRowEditable,
            flex: 1,
            renderEditCell: (params) => {
                return <DatePickerCell params={params} />;
            },
        },
        {
            field: "finish_date",
            headerName: "Edit Date",
            editable: isRowEditable,
            flex: 1,
            renderEditCell: (params) => {
                return <DatePickerCell params={params} />;
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1,
            cellClassName: "actions",
            getActions: ({ id, row }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;
                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<GradientSaveIcon />}
                            label="Save"
                            sx={{
                                color: "primary.main",
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<GradientCancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }
                return [
                    <GridActionsCellItem
                        icon={<GradientEditIcon />}
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

    const DatePickerCell = ({ params }) => {
        const [value, setValue] = React.useState(dayjs(params.value));
        const handleDateChange = (newValue) => {
            setValue(newValue);
            params.api.setEditCellValue({
                id: params.id,
                field: "date",
                value: newValue,
            });
        };
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    value={value}
                    onChange={handleDateChange}
                    slotProps={{
                        style: { marginTop: 20 },
                        textField: {
                            error: false,
                            variant: "filled",
                        },
                    }}
                    textField={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        );
    };

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
                        begin_date: timeline.begin_date
                            ? format(
                                  new Date(timeline.begin_date),
                                  "dd MMMM yyyy"
                              )
                            : "",
                        finish_date: timeline.finish_date
                            ? format(
                                  new Date(timeline.finish_date),
                                  "dd MMMM yyyy"
                              )
                            : "",
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
    }, [isMobile]);

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

    const [openUpdateRowDialog, setOpenUpdateRowDialog] = React.useState(false);
    const [openRowUpdateSuccessDialog, setOpenRowUpdateSuccessDialog] =
        React.useState(false);
    const [openRowUpdateErrorDialog, setOpenRowUpdateErrorDialog] =
        React.useState(false);
    const [pendingRow, setPendingRow] = React.useState(null);

    const handleProcessRowUpdateConfirmation = (newRow) => {
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
            const updatedRow = { ...newRow, isNew: false };
            setRows(
                rows.map((row) => (row.id === newRow.id ? updatedRow : row))
            );
            setIsRowEditable(false);
            return updatedRow;
        } else {
            setPendingRow(newRow);
            setOpenUpdateRowDialog(true);
            return newRow;
        }
    };

    const handleConfirmUpdate = () => {
        console.log("update confirm debug");
        const timelineUpdate = {
            timeline_name_update: pendingRow.timeline_name,
            description_update: pendingRow.description,
            begin_date_update: pendingRow.begin_date,
            finish_date_update: pendingRow.finish_date,
        };
        patchTimelineByName(timelineToEdit, timelineUpdate)
            .then(() => {
                setOpenRowUpdateSuccessDialog(true);
            })
            .catch((error) => {
                setOpenRowUpdateErrorDialog(true);
            });
        setOpenUpdateRowDialog(false);
        const updatedRow = { ...pendingRow, isNew: false };
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === pendingRow.id ? { ...row, ...pendingRow } : row
            )
        );
        setIsRowEditable(false);
        setPendingRow(null);
        return updatedRow;
    };

    const handleCancelUpdate = () => {
        setOpenUpdateRowDialog(false);
        setPendingRow(null);
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    if (error) {
        return <ErrorComponent error={error} />;
    }
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
                        <Box style={{ width: "100%" }}>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            initialState={{
                                                columns: {
                                                    columnVisibilityModel: {
                                                        id: false,
                                                    },
                                                },
                                            }}
                                            disableSelectionOnClick
                                            editMode="row"
                                            processRowUpdate={
                                                handleProcessRowUpdateConfirmation
                                            }
                                            onProcessRowUpdateError={(error) =>
                                                setError(error)
                                            }
                                            experimentalFeatures={{
                                                newEditingApi: true,
                                            }}
                                            rowModesModel={rowModesModel}
                                            onRowModesModelChange={
                                                handleRowModesModelChange
                                            }
                                            onRowEditStop={handleRowEditStop}
                                            slots={{
                                                footer: isMobile
                                                    ? () => null
                                                    : AddNewRow,
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
                                <Route path="/add" element={<AddTimeline />} />
                            </Routes>
                            <UpdateRowDialog
                                handleCancelUpdate={handleCancelUpdate}
                                handleConfirmUpdate={handleConfirmUpdate}
                                openRowUpdateSuccessDialog={
                                    openRowUpdateSuccessDialog
                                }
                                setOpenRowUpdateSuccessDialog={
                                    setOpenRowUpdateSuccessDialog
                                }
                                openRowUpdateErrorDialog={
                                    openRowUpdateErrorDialog
                                }
                                setOpenRowUpdateErrorDialog={
                                    setOpenRowUpdateErrorDialog
                                }
                                openUpdateRowDialog={openUpdateRowDialog}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default TimelinesDataGridCRUD;
