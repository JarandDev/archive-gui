import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useTranslation} from "react-i18next";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import {deleteArchiveItems} from "../../services/archiveItemService";

function ConfirmDeleteDialog({onDeleteDialogClose}) {
    const [open, setOpen] = React.useState(true);
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [connectSuccess, setConnectSuccess] = React.useState("");
    const [connectError, setConnectError] = React.useState("");
    const {t} = useTranslation("common");

    const handleClose = () => {
        setOpen(false);
        onDeleteDialogClose();
    };

    const handleDeleteData = async () => {
        setSubmitting(true);
        setConnectSuccess("");
        setConnectError("");

        const {deleted} = await deleteArchiveItems();
        setSubmitting(false);

        if (deleted !== undefined) {
            setConnectSuccess(t("deleteItemsSuccess", {deleted: deleted}));
        } else {
            setConnectError(t("deleteItemsError"));
        }
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
    >
        <DialogTitle id="confirm-delete-dialog-title">{t("deleteItemsTitle")}</DialogTitle>
        <DialogContent className="FlexColumnCenter">
            <DialogContentText id="confirm-delete-dialog-description">
                {t("deleteItemsDescription")}
            </DialogContentText>
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
                    onClick={handleDeleteData} disabled={isSubmitting}>{t("deleteData")}</Button>
            <div className="Content">
                {connectSuccess !== "" && <Alert severity="success">{connectSuccess}</Alert>}
                {connectError !== "" && <Alert severity="error">{connectError}</Alert>}
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                {t("close")}
            </Button>
        </DialogActions>
    </Dialog>;
}

ConfirmDeleteDialog.propTypes = {
    onDeleteDialogClose: PropTypes.func.isRequired
};

export default ConfirmDeleteDialog;
