import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DropdownDataShape from "../../shapes/DropdownDataShape";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Dropdown({dropdownData, selected, onSelect}) {
    const classes = useStyles();
    const {t} = useTranslation("common");

    const handleChange = event => {
        onSelect(dropdownData.id, event.target.value);
    };

    return (<FormControl className={classes.formControl}>
        <InputLabel id={`${dropdownData.id}-label`}>{dropdownData.name}</InputLabel>
        <Select
            labelId={`${dropdownData.id}-label`}
            id={dropdownData.id}
            key={dropdownData.id}
            value={selected}
            onChange={handleChange}>
            <MenuItem value=""><em>{t("none")}</em></MenuItem>
            {dropdownData.items.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
        </Select>
    </FormControl>);
}

Dropdown.propTypes = {
    dropdownData: DropdownDataShape.isRequired,
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default Dropdown;
