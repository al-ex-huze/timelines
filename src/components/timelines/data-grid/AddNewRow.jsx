import PropTypes from 'prop-types';

import {
    GridRowModes,
} from "@mui/x-data-grid";

import Button from "@mui/material/Button";

import AddIcon from "@mui/icons-material/Add";

const AddNewRow = (props) => {
    const { rows, setRows, setRowModesModel } = props;

    const handleAddClick = () => {
        const id = rows.length + 1;
        setRows((oldRows) => [
            ...oldRows,
            {
                id,
                isNew: true,
            },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "Timeline" },
        }));
    };

    return (
        <Button
            color="primary"
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAddClick}
        >
            Add Timeline
        </Button>
    );
}

AddNewRow.propTypes = {
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func.isRequired,
    setRowModesModel: PropTypes.func.isRequired,
};

export default AddNewRow