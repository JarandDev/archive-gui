import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {useHistory} from "react-router-dom";
import UserShape from "../shapes/UserShape";

function Archives({user}) {
    const [hasEditPermission, setEditPermission] = React.useState(false);
    const history = useHistory();
    const {t} = useTranslation("common");

    useEffect(() => {
        if (user.loggedIn && user.scopes.includes("archive-api.archive.write")) {
            setEditPermission(true);
        }
    }, [user]);

    const handleGoToArchive = () => {
        history.push("/bread-bags");
    };

    const handleEditArchive = () => {
        history.push("/settings/bread-bags");
    };

    return <div className="Content">
        <Container maxWidth="md">
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">{t("archive")}</Typography>
            </Breadcrumbs>
            <Card>
                <CardActionArea onClick={handleGoToArchive}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {t("archives.breadBags.name")}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {t("archives.breadBags.description")}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleGoToArchive}>
                        {t("archives.breadBags.goToLinkText")}
                    </Button>
                    {hasEditPermission &&
                    <Button size="small" color="primary" onClick={handleEditArchive}>
                        {t("archives.breadBags.editLinkText")}
                    </Button>}
                </CardActions>
            </Card>
        </Container>
    </div>;
}

Archives.propTypes = {
    user: UserShape.isRequired
};

export default Archives;
