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
