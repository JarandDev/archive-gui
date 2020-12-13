import {ARCHIVE_API_BASE_URL} from "../constants/urls";

const getItemFilters = async () => {
    const response = await fetch(`${ARCHIVE_API_BASE_URL}/item-filter`, {
        method: "GET"
    });
    if (!response.ok) {
        return {bakeries: [], places: [], years: [], coarseness: []};
    }
    return await response.json();
};

export {getItemFilters};
