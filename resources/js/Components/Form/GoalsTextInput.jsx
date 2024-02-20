import React from "react";

const GoalsTextInput = ({
    type = "text",
    label = "Goals Input",
    placeholder = "Goals Input",
    className = "",
    ...rest
}) => {
    return (
        <div className="flex flex-col gap-[.4vw]">
            <label>{label}</label>
            <input
                {...rest}
                type={type}
                placeholder={placeholder}
                className={`w-full flex justify-between items-center px-[3vw] md:px-[1vw] rounded-md border border-neutral-50 focus:outline-0 text-dark h-[3vw] placeholder:text-light-grey ${className}`}
            />
        </div>
    );
};

export default GoalsTextInput;
