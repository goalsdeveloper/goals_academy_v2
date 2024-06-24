export function isDisabledLocation(progress, data) {
    const { products } = progress || {};
    const { contact_type } = products || {};

    const isOnline = contact_type === "online";
    const isOffline = contact_type === "offline";
    const isHybrid = contact_type === "hybrid";
    const isOther = contact_type === "other";

    const commonChecks = !data.tutor_id || !data.date || !data.time;

    if (isOnline && (commonChecks || !data.location)) return true;
    if (isOffline && (commonChecks || !data.place_id)) return true;
    if (isHybrid && (commonChecks || (!data.place_id && !data.location)))
        return true;
    if (isOther && !data.tutor_id) return true;

    return false;
}
