import GoalsBadge from "@/Components/elements/GoalsBadge";
import React from "react";

const TransactionStatusBadge = ({ data }) => {
    return (
        <GoalsBadge
            title={data.status}
            className={`${statusClassMap[data.status]}`}
        />
    );
};

export default TransactionStatusBadge;

export const statusClassMap = {
    Success: "bg-success-10 text-success-50",
    Berhasil: "bg-success-10 text-success-50",
    Selesai: "bg-success-10 text-success-50",
    Berjalan: "bg-warning-10 text-warning-50",
    Ongoing: "bg-warning-10 text-warning-50",
    Pending: "bg-warning-10 text-warning-50",
    Failed: "bg-red-100 text-red-400",
    Gagal: "bg-red-100 text-red-400",
};
