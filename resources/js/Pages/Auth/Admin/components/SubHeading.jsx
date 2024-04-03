import React from "react";

const SubHeading = ({ title, children }) => {
    return (
        <div className="flex w-full justify-between items-center">
            <span className="text-[1.2vw] font-medium">{title}</span>
            {children}
        </div>
    );
};

export default SubHeading;
