import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import BreadBagsItemDialog from "./BreadBagsItemDialog";
import {getFirebaseImageUrl} from "../../constants/urls";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "253.31%", // 287:727
    }
}));

function BreadBagsItem({item}) {
    const classes = useStyles();
    const [seeDetails, setSeeDetails] = React.useState(false);
    const {t, i18n} = useTranslation("common");

    const handleSeeDetails = () => {
        setSeeDetails(true);
    };

    const handleDialogClose = () => {
        setSeeDetails(false);
    };

    const date = new Date(item.date);

    return (
        <Card className={classes.root}>
            {seeDetails && <BreadBagsItemDialog item={item} onClose={handleDialogClose}/>}
            <CardMedia
                className={classes.media}
                image={getFirebaseImageUrl(date.getFullYear(), item.imageFront)}
                title="bread bags item"
            />
            <Typography paragraph><b>{item.breadName}</b></Typography>
            <Typography paragraph>
                {new Intl.DateTimeFormat(i18n.language).format(date)}
            </Typography>
            <CardActions disableSpacing>
                <Button size="small" color="primary" onClick={handleSeeDetails}>
                    {t("seeDetails")}
                </Button>
            </CardActions>
        </Card>
    );
}

export default BreadBagsItem;
