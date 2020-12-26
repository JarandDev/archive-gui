import React from "react";
import Paper from "@material-ui/core/Paper";
import Dropdown from "../../common/Dropdown";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useTranslation} from "react-i18next";
import {getYears} from "../../../constants/years";
import {getArchiveItemsForYear, updateArchiveItem} from "../../../services/archiveItemService";
import {getImageNamesForYear} from "../../../services/importDataService";
import "./ImageDataConnector.css";
import Alert from "@material-ui/lab/Alert";
import MoreInfoDialog from "./MoreInfoDialog";
import {getFirebaseImageUrl} from "../../../constants/urls";

function ImageDataConnector() {
    const [items, setItems] = React.useState([]);
    const [itemsDropdownData, setItemsDropdownData] = React.useState({});
    const [itemSelected, setItemSelected] = React.useState("");
    const [yearSelected, setYearSelected] = React.useState("");
    const [images, setImages] = React.useState({});
    const [imageFrontIndex, setImageFrontIndex] = React.useState(0);
    const [moreInfoDialogOpen, setMoreInfoDialogOpen] = React.useState(false);
    const [connectSuccess, setConnectSuccess] = React.useState("");
    const [connectError, setConnectError] = React.useState("");
    const {t} = useTranslation("common");

    const yearDropdownData = {
        id: "year",
        name: t("year"),
        items: getYears()
    };

    const resetForm = () => {
        setItemSelected("");
        setConnectSuccess("");
        setConnectError("");
    };

    const handleConnectItemSelect = (filterId, selected) => setItemSelected(selected);

    const handleYearSelect = (filterId, selected) => {
        resetForm();
        setImageFrontIndex(0);
        setYearSelected(selected);
        if (selected === "") {
            setItems([]);
            setItemsDropdownData({});
            setImages({});
            return;
        }
        getArchiveItemsForYear(selected).then(data => {
            setItems(data);
            setItemsDropdownData({
                id: "chooseElement",
                name: t("chooseElement"),
                items: data.map(({id, breadName}) => ({id, name: breadName}))
            });
        });
        getImageNamesForYear(selected).then(data => {
            setImages({year: selected, imageNames: data});
        });
    };

    const handleConnect = async () => {
        setConnectSuccess("");
        setConnectError("");

        const item = items.find(i => i.id === itemSelected);
        if (!item) {
            setConnectError(t("noItemSelected"));
            return;
        }

        const imageFront = images.imageNames[imageFrontIndex];
        const imageBack = images.imageNames[imageFrontIndex + 1];

        const success = await updateArchiveItem(item, imageFront, imageBack);
        if (success) {
            setConnectSuccess(t("connectSuccess", {id: item.id, imageFront: imageFront, imageBack: imageBack}));
        } else {
            setConnectError(t("connectError"));
        }
    };

    const handleMoreInfoDialogOpen = () => {
        setMoreInfoDialogOpen(true);
    };

    const handleMoreInfoDialogClose = () => {
        setMoreInfoDialogOpen(false);
    };

    const handlePrevious = () => {
        setImageFrontIndex(imageFrontIndex - 2);
        resetForm();
    };

    const handleNext = () => {
        setImageFrontIndex(imageFrontIndex + 2);
        resetForm();
    };

    return (
        <Paper className="Panel">
            <h4>{t("connectDataAndImages")}</h4>
            <div className="FlexCenter">
                <Dropdown dropdownData={yearDropdownData} onSelect={handleYearSelect}
                          selected={yearSelected}/>
            </div>
            {yearSelected !== "" && images.year && images.imageNames.length > 0 && images.year === yearSelected &&
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div className="FlexCenter">
                        <img
                            className="SettingsImage"
                            src={getFirebaseImageUrl(yearSelected, images.imageNames[imageFrontIndex])}
                            alt="bread bag"
                        />
                        <img
                            className="SettingsImage"
                            src={getFirebaseImageUrl(yearSelected, images.imageNames[imageFrontIndex + 1])}
                            alt="bread bag"
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    {itemsDropdownData && itemsDropdownData.items && <div className="FlexColumnCenter">
                        <Dropdown dropdownData={itemsDropdownData}
                                  onSelect={handleConnectItemSelect}
                                  selected={itemSelected}/>
                        <Button type="submit" variant="contained"
                                color="primary" onClick={handleConnect}>{t("connectItemToImages")}</Button>
                        <div className="Content">
                            {itemSelected !== "" &&
                            <Button variant="contained" onClick={handleMoreInfoDialogOpen}>{t("moreInfo")}</Button>}
                            {moreInfoDialogOpen &&
                            <MoreInfoDialog item={items.find(i => i.id === itemSelected)}
                                            onMoreInfoClose={handleMoreInfoDialogClose}/>}
                        </div>
                        <div className="Content">
                            {connectSuccess !== "" && <Alert severity="success">{connectSuccess}</Alert>}
                            {connectError !== "" && <Alert severity="error">{connectError}</Alert>}
                        </div>
                    </div>}
                </Grid>
                <Grid item xs={12}>
                    <div className="FlexEvenly">
                        <Button className={imageFrontIndex === 0 ? "Hide" : ""}
                                variant="contained" color="primary"
                                onClick={handlePrevious}>{t("previous")}</Button>
                        <Button className={imageFrontIndex + 2 === images.imageNames.length - 2 ? "Hide" : ""}
                                variant="contained" color="primary"
                                onClick={handleNext}>{t("next")}</Button>
                    </div>
                </Grid>
            </Grid>}
            {yearSelected !== "" && images.year && images.imageNames.length === 0 &&
            <Grid item xs={12}>
                <div className="FlexCenter">
                    <Alert severity="info">
                        {t("noImagesToConnect")}
                    </Alert>
                </div>
            </Grid>}
            {yearSelected === "" && <div className="FlexCenter">
                <p>{t("selectYearInfo")}</p>
            </div>}
        </Paper>);
}

export default ImageDataConnector;
