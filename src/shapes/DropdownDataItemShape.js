import PropTypes from "prop-types";

const DropdownDataItemShape = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
});

export default DropdownDataItemShape;
