import React from "react";
import {useTranslation} from "react-i18next";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ImageDataConnector from "./image-data-connector/ImageDataConnector";
import Alert from "@material-ui/lab/Alert";
import UserShape from "../../shapes/UserShape";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import UploadDialog from "./UploadDialog";

function BreadBagsSettings({user}) {
    const history = useHistory();
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false);
    const {t} = useTranslation("common");

    const handleGoToArchives = () => {
        history.push("/");
    };

    const handleUploadDialogOpen = () => {
        setUploadDialogOpen(true);
    };

    const handleUploadDialogClose = () => {
        setUploadDialogOpen(false);
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const renderForWritePermission = () => {
        return <div className="Content">
            <Container maxWidth="lg">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className="Pointer" color="inherit" onClick={handleGoToArchives}>
                        {t("archive")}
                    </Link>
                    <Typography color="textPrimary">{t("settings")}</Typography>
                    <Typography color="textPrimary">{t("archives.breadBags.name")}</Typography>
                </Breadcrumbs>
                <h1>{t("archives.settings.breadBags.title")}</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className="Panel">
                            <h4>{t("numberOfElements")}</h4>
                            <h3>X</h3>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Paper className="Panel">
                            <h4>{t("editData")}</h4>
                            <div className="FlexEvenly">
                                <Button variant="contained" startIcon={<CloudUploadIcon/>}
                                        onClick={handleUploadDialogOpen}>{t("uploadFile")}
                                </Button>
                                <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
                                        onClick={handleDeleteDialogOpen}>{t("deleteData")}</Button>
                            </div>
                            {uploadDialogOpen && <UploadDialog onUploadDialogClose={handleUploadDialogClose}/>}
                            {deleteDialogOpen && <ConfirmDeleteDialog onDeleteDialogClose={handleDeleteDialogClose}/>}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <ImageDataConnector/>
                    </Grid>
                </Grid>
            </Container>
        </div>;
    };

    const renderPermissionDenied = () => {
        return <div className="Content">
            <Container maxWidth="lg">
                <Alert severity="error">
                    <b>ERROR: </b>{t("permissionsDenied")}
                </Alert>
            </Container>
        </div>;
    };

    const renderLoading = () => {
        return <div className="Content">
            <Container maxWidth="lg">
                <div className="FlexCenter">
                    <CircularProgress/>
                </div>
            </Container>
        </div>;
    };

    if (user.loggedIn !== undefined) {
        if (user.loggedIn && user.scopes.includes("archive-api.archive.write")) {
            return renderForWritePermission();
        } else {
            return renderPermissionDenied();
        }
    } else {
        return renderLoading();
    }
}

BreadBagsSettings.propTypes = {
    user: UserShape.isRequired
};

export default BreadBagsSettings;
