import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
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
    cols=1
}) {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
        if (onChange) {
            onChange(!show ? value : ""); // Toggle value
        }
    };

    const getClassByCols = () => {
        switch (cols) {
            case 2: return ["w-[200%]", "grid-cols-2"];
            case 3: return ["w-[300%]", "grid-cols-3"];
            case 4: return ["w-[400%]", "grid-cols-4"];
            case 5: return ["w-[500%]", "grid-cols-5"];
            case 6: return ["w-[600%]", "grid-cols-6"];
            case 7: return ["w-[700%]", "grid-cols-7"];
            case 8: return ["w-[800%]", "grid-cols-8"];
            case 9: return ["w-[900%]", "grid-cols-9"];
            case 10: return ["w-[1000%]", "grid-cols-10"];
            case 11: return ["w-[1100%]", "grid-cols-11"];
            case 12: return ["w-[1200%]", "grid-cols-12"];
            default: return ["w-full", "grid-cols-1"];
        }
    }

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
                type="button"
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
            <div className="relative text-[3.32vw] md:text-[.83vw]">
                <TECollapse
                    show={show}
                    className={`${
                        show ? "" : "md:hidden"
                    } absolute z-30 ${getClassByCols()[0]} md:shadow-none pt-0 md:-translate-y-[1.5vw]`}
                    onClick={() => setShow(false)}
                >
                    <TECollapseItem
                        className="bg-white w-fit border-1 rounded-[2vw] md:rounded-[.5vw] shadow-md overflow-visible"
                        breakClassName="hidden md:inline"
                    >
                        <div className={`h-full max-h-[48vw] md:max-h-[12vw] overflow-auto scrollbar-hidden grid ${getClassByCols()[1]}`}>
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
            className={`hover:bg-skin cursor-pointer p-[2vw] md:p-[1vw] text-center ${className}`}
        >
            {children}
        </div>
    );
}

export { SelectInput, SelectInputItem };
