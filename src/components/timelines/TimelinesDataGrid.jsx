import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { experimentalStyled as styled } from "@mui/material/styles";

import { getTimelines } from "../../../api";

import CircularLoader from "../CircularLoader";
import ErrorComponent from "../ErrorComponent";

const TimelinesDataGrid = () => {
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const navigate = useNavigate();

    const handleClick = (event, cellValues) => {
        navigate(`/timelines/${cellValues.row.timeline_name}`);
    };

    const columns = [
        { field: "id", headerName: "ID", hide: true, flex: 1 },
        {
            field: "View",
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(event) => {
                            handleClick(event, cellValues);
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

    if (error) return <ErrorComponent error={error} />;
    if (isLoading) return <CircularLoader />;
    return (
        <Box
            sx={{
                flexGrow: 1,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Offset sx={{ mt: 1 }} />
            {selectedRow && <h1>Selected: {selectedRow.timeline_name}</h1>}

            <Box style={{ height: "100%", width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={handleRowClick}
                />
            </Box>
        </Box>
    );
};

export default TimelinesDataGrid;
