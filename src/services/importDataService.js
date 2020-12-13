import {ARCHIVE_API_BASE_URL} from "../constants/urls";

const getImageNamesForYear = async year => {
    const response = await fetch(`${ARCHIVE_API_BASE_URL}/import-data/image-name/${year}`, {
        method: "GET",
        credentials: "same-origin"
    });
    if (!response.ok) {
        return {};
    }
    return await response.json();
};

export {getImageNamesForYear};
