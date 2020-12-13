import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {useTranslation} from "react-i18next";

const ItemInfoList = ({item}) => {
    const {t, i18n} = useTranslation("ItemInfoList");

    const date = new Date(item.date);

    return <List>
        {item.id !== "" &&
        <ListItem><ListItemText primary={item.id} secondary={t("id")}/></ListItem>}
        {item.date !== "" &&
        <ListItem><ListItemText primary={new Intl.DateTimeFormat(i18n.language).format(date)}
                                secondary={t("date")}/></ListItem>}
        {item.shop !== "" &&
        <ListItem><ListItemText primary={item.shop} secondary={t("shop")}/></ListItem>}
        {item.baker1 !== "" &&
        <ListItem><ListItemText primary={item.baker1} secondary={t("baker1")}/></ListItem>}
        {item.established !== "" &&
        <ListItem><ListItemText primary={item.established}
                                secondary={t("established")}/></ListItem>}
        {item.baker2 !== "" &&
        <ListItem><ListItemText primary={item.place} secondary={t("place")}/></ListItem>}
        {item.series !== "" &&
        <ListItem><ListItemText primary={item.series} secondary={t("series")}/></ListItem>}
        {item.composition !== "" &&
        <ListItem><ListItemText primary={item.composition}
                                secondary={t("composition")}/></ListItem>}
        {item.healthClaim !== "" &&
        <ListItem><ListItemText primary={item.healthClaim}
                                secondary={t("healthClaim")}/></ListItem>}
        {item.name !== "" &&
        <ListItem><ListItemText primary={item.name} secondary={t("name")}/></ListItem>}
        {item.support !== "" &&
        <ListItem><ListItemText primary={item.support} secondary={t("support")}/></ListItem>}
        {item.motive !== "" &&
        <ListItem><ListItemText primary={item.motive} secondary={t("motive")}/></ListItem>}
        {item.bagColor !== "" &&
        <ListItem><ListItemText primary={item.bagColor} secondary={t("bagColor")}/></ListItem>}
        {item.coarseness !== "" &&
        <ListItem><ListItemText primary={item.coarseness}
                                secondary={t("coarseness")}/></ListItem>}
        {item.coarsenessPercentage !== "" &&
        <ListItem><ListItemText primary={item.coarsenessPercentage}
                                secondary={t("coarsenessPercentage")}/></ListItem>}
        {item.fibrePercentage !== "" &&
        <ListItem><ListItemText primary={item.fibrePercentage} secondary={t("fibrePercentage")}/></ListItem>}
        {item.weight !== "" &&
        <ListItem><ListItemText primary={item.weight} secondary={t("weight")}/></ListItem>}
        {item.price !== "" &&
        <ListItem><ListItemText primary={item.price} secondary={t("price")}/></ListItem>}
        {item.keyhole !== "" &&
        <ListItem><ListItemText primary={item.keyhole} secondary={t("keyhole")}/></ListItem>}
        {item.comment !== "" &&
        <ListItem><ListItemText primary={item.comment} secondary={t("comment")}/></ListItem>}
        {item.pricePerKg !== "" &&
        <ListItem><ListItemText primary={item.pricePerKg}
                                secondary={t("pricePerKg")}/></ListItem>}
    </List>;
};

ItemInfoList.propTypes = {
    item: PropTypes.any.isRequired
};

export default ItemInfoList;
