import { router } from "@inertiajs/react";

export function getValue(obj, propertyString) {
    const properties = propertyString.split(".");
    let value = obj;

    for (let prop of properties) {
        if (value && typeof value === "object" && prop in value) {
            value = value[prop];
        } else {
            return undefined;
        }
    }

    return value;
}

export function toSlug(x) {
    return x
        .replace(/^[^\w\s]+/, "")
        .replace(/^[\s-]+/, "")
        .trim()
        .split(" ")
        .join("-")
        .toLowerCase();
}

export function upperCaseFirstLetter(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

export function getPaginationPages({ links, current_page, last_page }) {
    const countShowFromCurr = 3;
    const pages = [];

    const addPage = (label) => {
        const link = links.find((link) => link.label === label);
        const isExist =  pages.find((page) => page.label === label);
        if (link && !isExist ) {
            pages.push(link);
        }
    };

    addPage("&laquo; Previous");

    if (current_page >= 1) {
        addPage("1");
    }

    if (current_page - countShowFromCurr == 1) {
        addPage("2");
    } else if (current_page > countShowFromCurr) {
        pages.push({ label: "...", url: null });
    }

    if (current_page > 2) {
        addPage(`${current_page - 1}`);
    }

    if (current_page !== 1 && current_page !== last_page) {
        addPage(`${current_page}`);
    }

    if (current_page < last_page - 1) {
        addPage(`${current_page + 1}`);
    }

    if (current_page + countShowFromCurr == last_page) {
        addPage(`${last_page - 1}`);
    } else if (current_page < last_page - 2) {
        pages.push({ label: "...", url: null });
    }

    if (current_page <= last_page) {
        addPage(`${last_page}`);
    }

    addPage("Next &raquo;");

    return pages;
}

export function phoneNumberFormat(x) {
    if (x != null && x.charAt(0) === "0") {
        return "62" + x.slice(1);
    }

    return x;
}

export const truncateWithEllipsis = (str) => {
    const maxLength = 40;
    if (str?.length > maxLength && str) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
};


export const updateSearchParams = (key, value) => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    if (value) {
        urlSearchParams.set(key, value);
    } else {
        urlSearchParams.delete(key);
    }

    router.get(window.location.pathname, Object.fromEntries(urlSearchParams.entries()), { preserveState: true });
};
