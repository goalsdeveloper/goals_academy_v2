import { common } from "@mui/material/colors";

export function canSubmitFormCheckerProgress(progress, data) {
    const { products } = progress || {};
    const { contact_type } = products || {};
    const bimbingan_sekali_cat_id = 2;
    const cat_id = products.category_id;

    const isOnline = contact_type === "online";
    const isOffline = contact_type === "offline";
    const isHybrid = contact_type === "hybrid";
    const isOther = contact_type === "other";

    let commonChecks = !data.tutor_id;

    if (cat_id == bimbingan_sekali_cat_id) {
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
    const bimbingan_sekali_cat_id = 2;
    const cat_id = products.category_id;

    let commonChecks = !data.tutor_id;

    if (cat_id == bimbingan_sekali_cat_id) {
        commonChecks = commonChecks || !data.date || !data.time;
    }

    if (commonChecks) return true;

    return false;
}
