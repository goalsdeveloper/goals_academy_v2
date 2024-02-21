import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import GoalsButton from "@/Components/GoalsButton";
import ExpandedButton from "@/Components/ExpandedButton";

function GoalsSelectMultipleInput ({ show, setShow, label="", placeholder="Pilih satu", data=[], error="", icon="", chevronIcon="", className, children, onClick }) {
    return (
        <div>
            {label != "" ? (
                <p className="mb-[.5vw]">{label}</p>
            ) : (<></>)}
            <ExpandedButton
                className={`rounded-[1vw] md:rounded-[.4vw] h-[9vw] md:h-[3vw] leading-[2vw] md:px-[1.5vw] cursor-pointer ${
                    data.length > 0
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
                {data.length > 0 ? 'Add-On ditambahkan' : (placeholder)}
            </ExpandedButton>
            <div className="relative">
                <TECollapse show={show} className={`${show ? "" : "hidden"} absolute z-50 w-[120%] shadow-none -translate-x-[8.25%] -translate-y-[1.5vw] px-[10%] pb-[.5vw]`}>
                    <TECollapseItem className="bg-white w-full border-1 rounded-[.5vw] shadow-md">
                        <div className="h-full max-h-[16vw] overflow-y-auto">
                            {children}
                        </div>
                        <hr />
                        <div className="flex justify-center md:justify-end mt-[.5vw] p-[.5vw]">
                            <GoalsButton className="w-6/12 md:w-[30%] rounded-[.5vw]" onClick={() => {
                                onClick()
                                setShow(false)
                            }}>Simpan</GoalsButton>
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

function GoalsSelectMultipleInputItem ({ className, checked=true, onClick, children }) {
    return (
        <div onClick={onClick} className={`flex items-center gap-[.5vw] hover:bg-skin cursor-pointer p-[1vw] ${className}`}>
            <div className={`w-[1.2vw] h-[1.2vw] flex items-center justify-center rounded-[.2vw] border-1 ${checked ? 'border-secondary bg-secondary' : 'border-light-grey bg-white'}`}>
                <i className="fa-solid fa-check text-[.75vw] text-white"></i>
            </div>
            <span>{children}</span>
        </div>
    )
}

export {GoalsSelectMultipleInput, GoalsSelectMultipleInputItem}
