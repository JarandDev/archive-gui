import PropTypes from "prop-types";
import DropdownDataItemShape from "./DropdownDataItemShape";

const DropdownDataShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(DropdownDataItemShape).isRequired
});

export default DropdownDataShape;
