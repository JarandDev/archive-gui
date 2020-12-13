import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";
import ItemInfoList from "../../common/ItemInfoList";

function MoreInfoDialog({item, onMoreInfoClose}) {
    const [open, setOpen] = React.useState(true);
    const {t} = useTranslation("common");

    const handleClose = () => {
        setOpen(false);
        onMoreInfoClose();
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="upload-dialog-title"
        aria-describedby="upload-dialog-description"
    >
        <DialogTitle id="upload-dialog-title">{t("moreInfo")}</DialogTitle>
        <DialogContent className="FlexColumnCenter">
            <ItemInfoList item={item}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                {t("close")}
            </Button>
        </DialogActions>
    </Dialog>;
}

MoreInfoDialog.propTypes = {
    item: PropTypes.any.isRequired,
    onMoreInfoClose: PropTypes.func.isRequired
};

export default MoreInfoDialog;
