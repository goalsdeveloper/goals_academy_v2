import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import GoalsButton from "@/Components/GoalsButton";
import ExpandedButton from "@/Components/ExpandedButton";

function GoalsSelectMultipleInput ({ show, setShow, label="", placeholder="Pilih satu", data=[], error="", icon="", chevronIcon="", required=false, className, filledClassName="border-2 border-secondary text-secondary", emptyClassName="border-1 border-light-grey text-light-grey", children, onClick }) {
    return (
        <div>
            {label != "" ? (
                <p className="mb-[2vw] md:mb-[.5vw]">{label}<sup className={`${required ? "" : "hidden"} text-red-600`}>*</sup></p>
            ) : (<></>)}
            <ExpandedButton
                className={`rounded-[2vw] md:rounded-[.4vw] h-[12vw] md:h-[3vw] leading-[2vw] md:px-[1.5vw] cursor-pointer ${
                    data.length > 0 ? filledClassName : emptyClassName
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
                {data.length > 0 ? 'Add-On ditambahkan' : (placeholder)}
            </ExpandedButton>
            <div className="relative">
                <TECollapse show={show} className={`${show ? "" : "md:hidden"} md:absolute z-30 w-full md:w-[120%] md:shadow-none md:-translate-x-[8.25%] pt-0 md:-translate-y-[1.5vw] md:px-[10%] pb-[.5vw]`}>
                    <TECollapseItem className="bg-white w-full border-1 rounded-[2vw] md:rounded-[.5vw] shadow-md" breakClassName="hidden md:inline">
                        <div className="h-full max-h-[52vw] md:max-h-[16vw] overflow-y-auto">
                            {children}
                        </div>
                        <hr />
                        <div className="flex justify-end mt-[2vw] p-[2vw] md:mt-[.5vw] md:p-[.5vw]">
                            <GoalsButton className="w-[30%] rounded-[2vw] md:rounded-[.5vw]" onClick={() => {
                                onClick()
                                setShow(false)
                            }}>Simpan</GoalsButton>
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

function GoalsSelectMultipleInputItem ({ className, checked=true, onClick, children }) {
    return (
        <div onClick={onClick} className={`flex items-center gap-[2.5vw] md:gap-[.5vw] hover:bg-skin cursor-pointer p-[4vw] md:p-[1vw] ${className}`}>
            <div className={`w-[4.8vw] h-[4.8vw] md:w-[1.2vw] md:h-[1.2vw] flex items-center justify-center rounded-[.2vw] border-1 ${checked ? 'border-secondary bg-secondary' : 'border-light-grey bg-white'}`}>
                <i className="fa-solid fa-check text-[3vw] md:text-[.75vw] text-white"></i>
            </div>
            <span>{children}</span>
        </div>
    )
}

export {GoalsSelectMultipleInput, GoalsSelectMultipleInputItem}
