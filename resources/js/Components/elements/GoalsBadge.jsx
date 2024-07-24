import React from "react";

const GoalsBadge = ({
    className,
    title,
    ...rest
}) => {
    return (
        <div className={`flex w-fit justify-center items-center text-[2.3vw] md:text-[0.8vw] leading-none px-[3.7vw] md:px-[.8vw] py-[1.1vw] md:py-[.3vw] rounded-[.8vw] md:rounded-[.3vw] font-medium ${className}`} {...rest}>
            {title}
        </div>
    );
};

export default GoalsBadge;
