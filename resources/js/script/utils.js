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
