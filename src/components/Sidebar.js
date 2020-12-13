import React from 'react';
import PropTypes from "prop-types";
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

function Sidebar({open, toggleSidebar}) {
    const classes = useStyles();

    return <Drawer anchor="left" open={open} onClose={toggleSidebar(false)}>
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleSidebar(false)}
            onKeyDown={toggleSidebar(false)}
        >
            <List>
                <ListItem button key={0}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary={"Hjem"}/>
                </ListItem>
                <ListItem button key={1}>
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText primary={"Om Arkivet"}/>
                </ListItem>
            </List>
        </div>
    </Drawer>;
}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
}

export default Sidebar;
