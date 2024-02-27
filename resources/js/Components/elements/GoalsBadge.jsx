import React from "react";

const GoalsBadge = ({
    className,
    title,
    ...rest
}) => {
    return (
        <div className={`flex w-fit justify-center items-center h6 leading-none px-[.8vw] py-[.3vw] rounded-[.3vw] font-medium ${className}`} {...rest}>
            {title}
        </div>
    );
};

export default GoalsBadge;
