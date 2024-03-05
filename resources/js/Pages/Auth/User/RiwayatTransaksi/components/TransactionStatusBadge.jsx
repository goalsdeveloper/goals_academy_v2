import GoalsBadge from "@/Components/elements/GoalsBadge";
import React from "react";

const TransactionStatusBadge = ({ data }) => {
    const statusClassMap = {
        Berhasil: "bg-success-10 text-success-50",
        Pending: "bg-warning-10 text-warning-50",
        Gagal: "bg-red-100 text-red-400",
    };

    return (
        <GoalsBadge
            title={data.status}
            className={`${statusClassMap[data.status]}`}
        />
    );
};

export default TransactionStatusBadge;
