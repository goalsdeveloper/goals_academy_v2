import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import GoalsButton from "../GoalsButton";

function GoalsSelectInput ({ show, setShow, label="", placeholder="Pilih satu", data="", error="", icon="", chevronIcon="", required=false, className, labelClassName, filledClassName="border-2 border-secondary text-secondary", emptyClassName="border-1 border-light-grey text-light-grey", children }) {
    return (
        <div className="text-inherit">
            {label != "" ? (
                <p className={`mb-[2vw] md:mb-[.5vw] ${labelClassName}`}>{label}{required ? <span className="text-red-600">*</span> : <></>}</p>
            ) : (<></>)}
            <GoalsButton
                className={`justify-between rounded-[2vw] md:rounded-[.4vw] h-[12vw] md:h-[3vw] leading-[2vw] px-[3vw] md:px-[1vw] cursor-pointer ${className}`}
                activeClassName={data != "" ? filledClassName : emptyClassName}
                onClick={() => setShow(!show)}
            >
                {icon != "" ? (
                    <>
                        <i className={icon}></i>
                        &nbsp;&nbsp;
                    </>
                ) : (<></>)}
                {data != "" ? data : placeholder}
                <i className={chevronIcon != "" ? chevronIcon : `fa-solid fa-chevron-down duration-300 ${show != "" ? "-rotate-180" : ""}`}></i>
            </GoalsButton>
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
                <p className="text-red-500 text-[3.6vw] md:text-[.9vw] mt-[.25vw]">{error}</p>
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
