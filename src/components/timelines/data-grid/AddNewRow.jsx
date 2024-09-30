import PropTypes from "prop-types";

import { GridRowModes } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { GradientButton } from "../../styled/StyledComponents";

const AddNewRow = (props) => {
    const { setIsRowEditable, rows, setRows, setRowModesModel } = props;

    const handleAddClick = () => {
        setIsRowEditable(true);
        const id = rows.length + 1;
        setRows((oldRows) => [
            ...oldRows,
            {
                id,
                timeline_name: "",
                isNew: true,
            },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "timeline_name" },
        }));
    };

    return (
        <GradientButton
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            sx={{ width: "fit-content", margin: 1.2 }}
        >
            <Typography sx={{ fontWeight: 400 }}>Add New</Typography>
        </GradientButton>
    );
};

AddNewRow.propTypes = {
    setIsRowEditable: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func.isRequired,
    setRowModesModel: PropTypes.func.isRequired,
};

export default AddNewRow;
