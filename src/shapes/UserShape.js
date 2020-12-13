import PropTypes from "prop-types";

const UserShape = PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    scopes: PropTypes.arrayOf(PropTypes.string),
    loggedIn: PropTypes.bool
});

export default UserShape;
