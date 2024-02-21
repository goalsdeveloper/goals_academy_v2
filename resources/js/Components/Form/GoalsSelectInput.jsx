import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import ExpandedButton from "@/Components/ExpandedButton";

function GoalsSelectInput ({ show, setShow, label="", placeholder="Pilih satu", data="", error="", icon="", chevronIcon="", className, children }) {
    return (
        <div className="text-inherit">
            {label != "" ? (
                <p className="mb-[2vw] md:mb-[.5vw]">{label}</p>
            ) : (<></>)}
            <ExpandedButton
                className={`rounded-[2vw] md:rounded-[.4vw] h-[12vw] md:h-[3vw] leading-[2vw] md:px-[1.5vw] cursor-pointer ${
                    data != ""
                        ? "border-2 border-secondary text-secondary"
                        : "border-1 border-light-grey text-light-grey"
                } ${className}`}
                icon={chevronIcon != "" ? chevronIcon : `fa-solid fa-chevron-down duration-300 ${show != "" ? "-rotate-180" : ""}`}
                onClick={() => setShow(!show)}
            >
                {icon != "" ? (
                    <>
                        <i className={icon}></i>
                        &nbsp;&nbsp;
                    </>
                ) : (<></>)}
                {data != "" ? (data) : (placeholder)}
            </ExpandedButton>
            <div className="relative">
                <TECollapse show={show} className={`${show ? "" : "md:hidden"} md:absolute z-30 w-full md:w-[120%] md:shadow-none md:-translate-x-[8.25%] pt-0 md:-translate-y-[1.5vw] md:px-[10%] pb-[.5vw]`} onClick={() => setShow(false)}>
                    <TECollapseItem className="bg-white w-full border-1 rounded-[2vw] md:rounded-[.5vw] shadow-md" breakClassName="hidden md:inline">
                        <div className="h-full max-h-[52vw] md:max-h-[16vw] overflow-y-auto">
                            {children}
                        </div>
                    </TECollapseItem>
                </TECollapse>
            </div>
            {error != "" ? (
                <p className="text-red-500 text-[.9vw] mt-[.25vw]">{error}</p>
            ) : (<></>)}
        </div>
    )
}

function GoalsSelectInputItem ({ className, onClick, children }) {
    return (
        <div onClick={onClick} className={`hover:bg-skin cursor-pointer p-[4vw] md:p-[1vw] ${className}`}>
            {children}
        </div>
    )
}

export {GoalsSelectInput, GoalsSelectInputItem}
