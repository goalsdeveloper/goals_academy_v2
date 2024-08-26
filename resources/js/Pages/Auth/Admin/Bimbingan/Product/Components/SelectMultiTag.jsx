import TECollapseItem from "@/Components/TECollapseItem";
import { useState } from "react";
import { TECollapse } from "tw-elements-react";

const SelectMultiTag = ({
    label = "Label",
    disabled= false,
    placeholder = "Pilih satu atau lebih",
    value = "",
    error = "",
    icon = "",
    chevronIcon = "",
    required = false,
    className = "",
    labelClassName = "",
    filledClassName = "border-1 border-light-grey text-light-grey font-semibold",
    emptyClassName = "border-1 border-light-grey text-light-grey font-normal",
    handleClearTag = () => {},
    children,
    onChange, // New prop for handling value change
}) => {
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
        if (onChange) {
            onChange(!show ? value : ""); // Toggle value
        }
    };

    return (
        <div className="text-inherit">
            {label !== "" && (
                <p className={`mb-[2vw] md:mb-[.5vw] ${labelClassName}`}>
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
                className={`flex flex-nowrap disabled:bg-gray-100 disabled:border-gray-300 disabled:cursor-default justify-between items-center gap-[1vw] rounded-[2vw] md:rounded-[.4vw] h-fit py-[1vw] leading-[2vw] px-[3vw] md:px-[1vw] cursor-pointer text-[.83vw] border w-full border-neutral-50 ${value !== "" ? filledClassName : emptyClassName}`}
                // activeClassName={
                //
                // }
                type="button"
                onClick={handleToggle} // Use handleToggle instead of setShow(!show)
            >
                <div className="flex flex-wrap items-center gap-[.75vw]">
                    {value.length > 0
                        ? value.map((item) => (
                              <div key={item.id} className="rounded-full px-[.4vw] border border-secondary text-secondary">
                                  {item.name || item.topic}
                              </div>
                          ))
                        : placeholder}
                </div>
                <i
                    className={
                        chevronIcon !== ""
                            ? chevronIcon
                            : `fa-solid fa-chevron-down duration-300 ${
                                  show ? "-rotate-180" : ""
                              }` + ""
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
                            <div className="hover:bg-skin cursor-pointer p-[4vw] md:p-[1vw] flex items-center gap-[.5vw]" onClick={() => handleClearTag()}><i className="fa-solid fa-trash-can"></i> Hapus Pilihan</div>
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
};

function SelectMultiTagItem({ className, onClick, children }) {
    return (
        <div
            onClick={() => onClick()}
            className={`hover:bg-skin cursor-pointer p-[4vw] md:p-[1vw] ${className}`}
        >
            {children}
        </div>
    );
}

export { SelectMultiTag, SelectMultiTagItem };
