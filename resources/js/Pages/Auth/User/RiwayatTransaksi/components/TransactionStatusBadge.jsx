import GoalsBadge from "@/Components/elements/GoalsBadge";
import React from "react";

const TransactionStatusBadge = ({ data }) => {
    return (
        <GoalsBadge
            title={data.status}
            className={`${getStatusClass(data.status)}`}
        />
    );
};

export default TransactionStatusBadge;

export const getStatusClass = (status) => {
    for (const [statuses, className] of Object.entries(statusClassMap)) {
        if (statuses.split(", ").includes(status)) {
            return className;
        }
    }
    return "";
};

const statusClassMap = {
    "Success, Berhasil, Selesai": "bg-success-10 text-success-50",
    "Berjalan, Ongoing": "bg-warning-10 text-warning-50",
    "Pending, Menunggu, Menuggu": "bg-gray-100 text-gray-500",
    "Failed, Gagal": "bg-red-100 text-red-400",
};
