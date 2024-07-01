import { common } from "@mui/material/colors";

export function canSubmitFormCheckerProgress(progress, data) {
    const { products } = progress || {};
    const { contact_type } = products || {};
    const total_meet = products.total_meet;

    const isOnline = contact_type === "online";
    const isOffline = contact_type === "offline";
    const isHybrid = contact_type === "hybrid";
    const isOther = contact_type === "other";

    let commonChecks = !data.tutor_id;

    if (total_meet == 1) {
        commonChecks = commonChecks || !data.date || !data.time;
    }

    if (isOnline && (commonChecks || !data.location)) return true;
    if (isOffline && (commonChecks || !data.place_id)) return true;
    if (isHybrid && (commonChecks || (!data.place_id && !data.location)))
        return true;
    if (isOther && !data.tutor_id) return true;

    return false;
}

export function canSubmitFormCheckerRecentOrder(order, data) {
    const { products } = order || {};
    const { contact_type } = products || {};
    const total_meet = products.total_meet;

    const isOnline = contact_type === "online";
    const isOffline = contact_type === "offline";
    const isHybrid = contact_type === "hybrid";
    const isOther = contact_type === "other";

    let commonChecks = !data.tutor_id;

    if (total_meet == 1) {
        commonChecks = commonChecks || !data.date || !data.time;

        if (isOnline && (commonChecks || !data.location)) return true;
        if (isOffline && (commonChecks || !data.place_id)) return true;
        if (isHybrid && (commonChecks || (!data.place_id && !data.location)))
            return true;
        if (isOther && !data.tutor_id) return true;

        return false;
    }

    if (commonChecks) return true;

    return false;
}
