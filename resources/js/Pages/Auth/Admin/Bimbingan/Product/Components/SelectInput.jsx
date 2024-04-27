import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import GoalsButton from "@/Components/GoalsButton";
import { useState } from "react";

function SelectInput({
    label = "Label",
    placeholder = "Pilih satu",
    disabled = false,
    value = "",
    error = "",
    icon = "",
    chevronIcon = "",
    required = false,
    className = "",
    filledClassName = "border-1 border-light-grey text-light-grey font-semibold",
    emptyClassName = "border-1 border-light-grey text-light-grey font-normal",
    children,
    onChange, // New prop for handling value change
}) {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
        if (onChange) {
            onChange(!show ? value : ""); // Toggle value
        }
    };

    return (
        <div className={`text-inherit ${className}`}>
            {label !== "" && (
                <p className="mb-[2vw] md:mb-[.5vw]">
                    {label}
                    <sup
                        className={`${
                            required ? "" : "hidden"
                        } text-red-600 -top-1 ml-px`}
                    >
                        *
                    </sup>
                </p>
            )}
            <button
                disabled={disabled}
                className={`flex disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-default justify-between items-center flex-wrap gap-[1vw] rounded-[2vw] md:rounded-[.4vw] h-[12vw] md:h-[3vw] leading-[2vw] px-[3vw] md:px-[1vw] cursor-pointer text-[.83vw] border w-full border-neutral-50 ${
                    value !== "" ? filledClassName : emptyClassName
                }`}
                onClick={handleToggle} // Use handleToggle instead of setShow(!show)
            >
                {icon !== "" && (
                    <>
                        <i className={icon}></i>
                        &nbsp;&nbsp;
                    </>
                )}
                {value !== "" ? value : placeholder}
                <i
                    className={
                        chevronIcon !== ""
                            ? chevronIcon
                            : `fa-solid fa-chevron-down duration-300 ${
                                  show ? "-rotate-180" : ""
                              }`
                    }
                ></i>
            </button>
            <div className="relative text-[.83vw]">
                <TECollapse
                    show={show}
                    className={`${
                        show ? "" : "md:hidden"
                    } md:absolute z-30 w-full md:w-[120%] md:shadow-none md:-translate-x-[8.25%] pt-0 md:-translate-y-[1.5vw] md:px-[10%] pb-[.5vw]`}
                    onClick={() => setShow(false)}
                >
                    <TECollapseItem
                        className="bg-white w-full border-1 rounded-[2vw] md:rounded-[.5vw] shadow-md"
                        breakClassName="hidden md:inline"
                    >
                        <div className="h-full max-h-[52vw] md:max-h-[16vw] overflow-y-auto">
                            {children}
                        </div>
                    </TECollapseItem>
                </TECollapse>
            </div>
            {error !== "" && (
                <p className="text-red-500 text-[3.6vw] md:text-[.9vw] mt-[.25vw]">
                    {error}
                </p>
            )}
        </div>
    );
}

function SelectInputItem({ className, onClick, children }) {
    return (
        <div
            onClick={onClick}
            className={`hover:bg-skin cursor-pointer p-[4vw] md:p-[1vw] ${className}`}
        >
            {children}
        </div>
    );
}

export { SelectInput, SelectInputItem };
