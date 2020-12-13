import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import {uploadArchiveItems} from "../../services/archiveItemService";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

function UpdateDialog({onUploadDialogClose}) {
    const [open, setOpen] = React.useState(true);
    const [isSubmitting, setSubmitting] = React.useState(false);
    const [connectSuccess, setConnectSuccess] = React.useState("");
    const [connectError, setConnectError] = React.useState("");
    const {t} = useTranslation("common");

    const handleClose = () => {
        setOpen(false);
        onUploadDialogClose();
    };

    const handleUpload = async event => {
        setSubmitting(true);
        setConnectSuccess("");
        setConnectError("");

        if (event.target.files.length === 0) {
            setConnectError(t("noFileSelected"));
            return;
        }

        const {unchanged, updated, added, errors} = await uploadArchiveItems(event.target.files[0]);
        setSubmitting(false);

        if (unchanged !== undefined) {
            setConnectSuccess(t("uploadSuccess", {unchanged: unchanged, updated: updated, added: added}));
        } else if (errors) {
            setConnectError(t(errors["file"]));
        } else {
            setConnectError(t("uploadError"));
        }
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="upload-dialog-title"
        aria-describedby="upload-dialog-description"
    >
        <DialogTitle id="upload-dialog-title">{t("uploadTitle")}</DialogTitle>
        <DialogContent className="FlexColumnCenter">
            <DialogContentText id="upload-dialog-description">
                {t("uploadDescription")}
            </DialogContentText>
            <Button variant="contained" component="label"
                    disabled={isSubmitting}
                    startIcon={<CloudUploadIcon/>}>{t("uploadFile")}
                <input type="file" style={{display: "none"}} onChange={handleUpload}/>
            </Button>
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

UpdateDialog.propTypes = {
    onUploadDialogClose: PropTypes.func.isRequired
};

export default UpdateDialog;
