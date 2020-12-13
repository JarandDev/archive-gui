import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Container from "@material-ui/core/Container";
import Dropdown from "../common/Dropdown";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import {useHistory} from "react-router-dom";
import {getArchiveItems} from "../../services/archiveItemService";
import {getItemFilters} from "../../services/itemFilterService";
import {v4 as uuidv4} from "uuid";
import Grid from "@material-ui/core/Grid";
import BreadBagsItem from "./BreadBagsItem";
import Pagination from "@material-ui/lab/Pagination";

function BreadBags() {
    const [items, setItems] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [bakeryDropdownData, setBakeryDropdownData] = React.useState({id: "", name: "", items: []});
    const [placeDropdownData, setPlaceDropdownData] = React.useState({id: "", name: "", items: []});
    const [yearFoundDropdownData, setYearFoundDropdownData] = React.useState({id: "", name: "", items: []});
    const [coarsenessDropdownData, setCoarsenessDropdownData] = React.useState({id: "", name: "", items: []});
    const [filtersSelected, setFiltersSelected] = React.useState({
        bakery: "",
        place: "",
        yearFound: "",
        coarseness: ""
    });
    const [isFiltersVisible, setFiltersVisible] = React.useState(true);
    const history = useHistory();
    const {t} = useTranslation("common");

    useEffect(() => {
        getArchiveItems().then(data => {
            setItems(data);
        });
        getItemFilters().then(data => {
            setBakeryDropdownData({
                id: "bakery",
                name: t("bakery"),
                items: data.bakeries.map(bakery => ({id: uuidv4(), name: bakery}))
            });
            setPlaceDropdownData({
                id: "place",
                name: t("place"),
                items: data.places.map(place => ({id: uuidv4(), name: place}))
            });
            setYearFoundDropdownData({
                id: "yearFound",
                name: t("yearFound"),
                items: data.years.map(year => ({id: uuidv4(), name: year}))
            });
            setCoarsenessDropdownData({
                id: "coarseness",
                name: t("coarseness"),
                items: data.coarseness.map(coarsenessValue => ({id: uuidv4(), name: coarsenessValue}))
            });
        });
    }, [t]);

    const handleGoToArchives = () => {
        history.push("/");
    };

    const handleDropdownSelect = (filterId, selected) => {
        setFiltersSelected({...filtersSelected, [filterId]: selected});
        setPage(1);
    };

    const toggleFiltersVisible = () => setFiltersVisible(!isFiltersVisible);

    const clearFilters = () => {
        setFiltersSelected({bakery: "", place: "", yearFound: "", coarseness: ""});
        setPage(1);
    };

    const countFilters = () => Object.values(filtersSelected).filter(i => i !== "").length;

    const shouldShowItem = item => {
        let shouldShow = true;
        if (filtersSelected.bakery !== "") {
            const bakeryName = bakeryDropdownData.items.find(i => i.id === filtersSelected.bakery).name;
            shouldShow = item.baker1 === bakeryName;
        }
        if (shouldShow && filtersSelected.place !== "") {
            const placeName = placeDropdownData.items.find(i => i.id === filtersSelected.place).name;
            shouldShow = item.place === placeName;
        }
        if (shouldShow && filtersSelected.yearFound !== "") {
            const yearFoundName = yearFoundDropdownData.items.find(i => i.id === filtersSelected.yearFound).name;
            shouldShow = item.date.includes(yearFoundName);
        }
        if (shouldShow && filtersSelected.coarseness !== "") {
            const coarsenessName = coarsenessDropdownData.items.find(i => i.id === filtersSelected.coarseness).name;
            shouldShow = item.coarseness === coarsenessName;
        }
        return shouldShow;
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const renderItems = () => {
        if (items.length === 0) {
            return null;
        }
        const filteredItems = items.filter(item => shouldShowItem(item));
        const fullPageCount = Math.round(filteredItems.length / 12);
        const pageCount = filteredItems.length % 12 === 0 ? fullPageCount - 1 : fullPageCount;
        const startIndex = page === 1 ? 0 : (page - 1) * 12 - 1;
        const shownItems = [];
        for (let i = startIndex; i < startIndex + 12 && i < filteredItems.length; i++) {
            shownItems.push(filteredItems[i]);
        }

        return <div className="FlexColumnCenter">
            <Grid className="Content FlexCenter" container spacing={3}>
                {shownItems.map(item =>
                    <Grid item xs={12} md={2}><BreadBagsItem item={item}/></Grid>)}
            </Grid>
            <Pagination count={pageCount} defaultPage={page} onChange={handlePageChange}/>
        </div>;
    };

    return <div className="Content">
        <Container maxWidth="lg">
            <Breadcrumbs aria-label="breadcrumb">
                <Link className="Pointer" color="inherit" onClick={handleGoToArchives}>
                    {t("archive")}
                </Link>
                <Typography color="textPrimary">{t("archives.breadBags.name")}</Typography>
            </Breadcrumbs>
            <h1>{t("archives.breadBags.name")}</h1>
            <div className={!isFiltersVisible ? "DisplayNone" : ""}>
                <Dropdown dropdownData={bakeryDropdownData}
                          selected={filtersSelected.bakery}
                          onSelect={handleDropdownSelect}/>
                <Dropdown dropdownData={placeDropdownData}
                          selected={filtersSelected.place}
                          onSelect={handleDropdownSelect}/>
                <Dropdown dropdownData={yearFoundDropdownData}
                          selected={filtersSelected.yearFound}
                          onSelect={handleDropdownSelect}/>
                <Dropdown dropdownData={coarsenessDropdownData}
                          selected={filtersSelected.coarseness}
                          onSelect={handleDropdownSelect}/>
            </div>
            <div>
                <Chip label={t("filtersSelected", {filterCount: countFilters()})}/>
                <Chip label={t("clearFilters")} onClick={clearFilters}/>
                <Chip label={isFiltersVisible ? t("hideFilters") : t("showFilters")} onClick={toggleFiltersVisible}/>
            </div>
            {renderItems()}
        </Container>
    </div>;
}

export default BreadBags;
