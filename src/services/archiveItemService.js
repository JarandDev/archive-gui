import {ARCHIVE_API_BASE_URL} from "../constants/urls";

const uploadArchiveItems = async file => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${ARCHIVE_API_BASE_URL}/archive/bread-bags/item`, {
        method: "POST",
        credentials: "same-origin",
        body: formData
    });
    return await response.json();
};

const getArchiveItems = async options => {
    let parameters = "";
    if (options) {
        if (options.limit) {
            parameters += `?limit=${options.limit}`;
        }
        if (options.offset) {
            parameters += (parameters === "" ? "?" : "&") + `offset=${options.offset}`;
        }
    }
    const response = await fetch(`${ARCHIVE_API_BASE_URL}/archive/bread-bags/item${parameters}`, {
        method: "GET",
        credentials: "same-origin"
    });
    if (!response.ok) {
        return {};
    }
    return await response.json();
};

const getArchiveItemsForYear = async year => {
    const response = await fetch(`${ARCHIVE_API_BASE_URL}/archive/bread-bags/item?year=${year}`, {
        method: "GET",
        credentials: "same-origin"
    });
    if (!response.ok) {
        return {};
    }
    return await response.json();
};

const updateArchiveItem = async (item, imageFront, imageBack) => {
    const response = await fetch(`${ARCHIVE_API_BASE_URL}/archive/bread-bags/item/${item.id}`, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...item, imageFront, imageBack})
    });
    return response.ok;
};

const deleteArchiveItems = async () => {
    const response = await fetch(`${ARCHIVE_API_BASE_URL}/archive/bread-bags/item`, {
        method: "DELETE",
        credentials: "same-origin"
    });
    if (!response.ok) {
        return {};
    }
    return await response.json();
};

export {uploadArchiveItems, getArchiveItems, getArchiveItemsForYear, updateArchiveItem, deleteArchiveItems};
