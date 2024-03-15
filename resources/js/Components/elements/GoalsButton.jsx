import React from "react";

const GoalsButton = ({
    className = "",
    children,
    variant = "primary",
    ...rest
}) => {
    function getVariantClassName() {
        switch (variant) {
            case "primary":
                return "bg-secondary hover:bg-primary text-white";
            case "bordered":
                return "border border-secondary text-secondary hover:border-primary hover:text-primary bg-white hover:bg-";
            case "info":
                return "bg-info-40 hover:bg-info-50 text-white";
            case "primary-inverse":
                return "bg-primary-10 text-secondary hover:bg-primary-20";
            default:
                return "border-1 border-neutral-20";
        }
    }

    return (
        <button
            className={`font-medium px-[8.3vw] md:px-[2vw] py-[3.2vw] md:py-[.8vw] rounded-[1.8vw] md:rounded-[.4vw] text-[3.7vw] md:text-[1vw] transition-all ${getVariantClassName()} ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default GoalsButton;
