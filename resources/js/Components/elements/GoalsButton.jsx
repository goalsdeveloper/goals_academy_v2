import { Link } from "@inertiajs/react";
import React from "react";

const GoalsButton = ({
    className = "",
    children,
    variant = "primary",
    isLink = false,
    type = "button",
    method = "GET",
    size = "default",
    href = "/",
    ...rest
}) => {
    const Wrapper = isLink ? Link : React.Fragment;

    function getProps() {
        switch (isLink) {
            case true:
                return {
                    href: href,
                    method: method,
                    className: `${className}`
                };
            default:
                return {};
        }
    }

    function getSizeClassName() {
        switch (size) {
            case "sm":
                return "py-[.6vw] px-[1.2vw] rounded-[.4vw] text-[.7vw]";
            case "lg":
                return "px-4 py-2 text-lg";
            default:
                return "px-[8.3vw] md:px-[2vw] py-[3.2vw] md:py-[.8vw] rounded-[1.8vw] md:rounded-[.4vw] text-[3.7vw] md:text-[1vw]";
        }
    }

    function getVariantClassName() {
        switch (variant) {
            case "primary":
                return "bg-secondary hover:bg-primary text-white ";
            case "bordered":
                return "border-1 lg:border-2 border-secondary text-secondary hover:border-primary hover:text-primary";
            case "info":
                return "bg-info-40 hover:bg-info-50 text-white";
            case "primary-inverse":
                return "bg-primary-10 text-secondary hover:bg-primary-20";
            case "success":
                return " bg-success-50 hover:bg-success-60 text-white";
            case "success-bordered":
                return "border-1 lg:border-2 border-success-50 text-success-50 hover:border-success-60 hover:text-success-60";
            default:
                return "border-1 border-neutral-20";
        }
    }

    return (
        <Wrapper {...getProps()}>
            <button
                className={`font-medium transition-all box-border ${getVariantClassName()} ${getSizeClassName()} ${className}`}
                type={type}
                {...rest}
            >
                {children}
            </button>
        </Wrapper>
    );
};

export default GoalsButton;
