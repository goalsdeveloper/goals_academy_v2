import { TECollapse } from "tw-elements-react";
import TECollapseItem from "../TECollapseItem";
import ExpandedButton from "../ExpandedButton";

function GoalsSelectInput ({ show, setShow, label="", placeholder="Pilih satu", data="", error="", icon="", chevronIcon="", className, children }) {
    return (
        <div className="text-inherit">
            {label != "" ? (
                <p className="mb-[.5vw]">{label}</p>
            ) : (<></>)}
            <ExpandedButton
                className={`rounded-[1vw] md:rounded-[.4vw] h-[9vw] md:h-[3vw] leading-[2vw] md:px-[1.5vw] cursor-pointer ${
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
                <TECollapse show={show} className={`${show ? "" : "hidden"} absolute z-50 w-[120%] shadow-none -translate-x-[8.25%] -translate-y-[2.5vw] px-[10%] py-[1vw]`} onClick={() => setShow(false)}>
                    <TECollapseItem className="bg-white w-full border-1 rounded-[.5vw] shadow-md">
                        <div className="h-full max-h-[16vw] overflow-y-auto">
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
        <div onClick={onClick} className={`hover:bg-skin cursor-pointer p-[1vw] ${className}`}>
            {children}
        </div>
    )
}

export {GoalsSelectInput, GoalsSelectInputItem}
