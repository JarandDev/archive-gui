import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import {useTranslation} from "react-i18next";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import ItemInfoList from "../common/ItemInfoList";
import {IMAGES_BASE_URL} from "../../constants/urls";

const useStyles = makeStyles(() => ({
    media: {
        height: 0,
        paddingTop: "253.31%", // 287:727
    }
}));

function BreadBagsItemDialog({item, onClose}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const {t} = useTranslation("BreadBagsItemDialog");

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const date = new Date(item.date);

    return <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">{item.breadName}</DialogTitle>
        <DialogContent>
            {item.description !== "" && <DialogContentText>{item.description}</DialogContentText>}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <ItemInfoList item={item}/>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card>
                        <CardMedia
                            className={classes.media}
                            image={`${IMAGES_BASE_URL}/${date.getFullYear()}/${item.imageFront}`}
                            title="bread bags item"
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card>
                        <CardMedia
                            className={classes.media}
                            image={`${IMAGES_BASE_URL}/${date.getFullYear()}/${item.imageBack}`}
                            title="bread bags item"
                        />
                    </Card>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                {t("close")}
            </Button>
        </DialogActions>
    </Dialog>;
}

BreadBagsItemDialog.propTypes = {
    item: PropTypes.any.isRequired
};

export default BreadBagsItemDialog;
