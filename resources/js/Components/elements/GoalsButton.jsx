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
        }
    }

    return (
        <button
            className={`font-medium px-[2vw] py-[.8vw] rounded-[.4vw] text-[1vw] transition-all ${className} ${getVariantClassName()}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default GoalsButton;
