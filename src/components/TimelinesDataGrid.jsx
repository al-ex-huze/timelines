import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { experimentalStyled as styled } from "@mui/material/styles";

import { getTimelines } from "../../api";

import CircularLoader from "./CircularLoader";
import ErrorComponent from "./ErrorComponent";

const TimelinesDataGrid = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState();
    const [rows, setRows] = React.useState([]);
    const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

    const columns = [
        { field: "id", headerName: "ID", hide: false },
        { field: "timeline_name", headerName: "Timeline", width: 200 },
        { field: "description", headerName: "Description", width: 300 },
        { field: "begin_date", headerName: "Begin Date", width: 150 },
        { field: "finish_date", headerName: "Finish Date", width: 150 },
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
                console.log(dataWithID);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

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
            <Box style={{ height: "100%", width: "100%" }}>
                <DataGrid rows={rows} columns={columns} />
            </Box>
        </Box>
    );
};

export default TimelinesDataGrid;
