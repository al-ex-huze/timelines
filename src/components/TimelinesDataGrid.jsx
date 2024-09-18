import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { getTimelines } from "../../api";

import CircularLoader from "./CircularLoader";

const columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
];

const TimelinesDataGrid = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [timelinesData, setTimelinesData] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        setIsLoading(true);
        console.log("TimelinesDataGrid Use Effect()");
        getTimelines().then((data) => {
            const dataWithID = data.map((datum, index) => ({
                ...datum,
                id: index,
            }));
            setRows(dataWithID);
            console.log(dataWithID);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <CircularLoader />;
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
};

export default TimelinesDataGrid;
