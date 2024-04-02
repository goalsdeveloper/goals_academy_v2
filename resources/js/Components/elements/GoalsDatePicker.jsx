import moment from "moment";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import ExpandedButton from "@/Components/ExpandedButton";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material";
import "@/script/momentCustomLocale";

export default function GoalsDatePicker ({ show, setShow, label="", chevronIcon="", data, setData, error="", minDate, maxDate, shouldDisableDate=[], theme, slotProps, sx, required=false, wrapperClassName, className, filledClassName="border-2 border-secondary text-secondary", emptyClassName="border-1 border-light-grey text-light-grey" }) {
    return (
        <div className={wrapperClassName}>
            {label != "" ? (
                <p className="mb-[2vw] md:mb-[.5vw]">{label}<sup className={`${required ? "" : "hidden"} text-red-600`}>*</sup></p>
            ) : (<></>)}
            <ExpandedButton
                className={`rounded-[2vw] md:rounded-[.4vw] h-[12vw] md:h-[3vw] leading-[2vw] md:px-[1.5vw] ${
                    data != "" ? filledClassName : emptyClassName
                } ${className}`}
                iconClassName={`group-hover:text-inherit ${
                    data != "" ? "text-secondary" : ""
                }`}
                icon={chevronIcon != "" ? chevronIcon : `fa-solid fa-chevron-down duration-300 ${show != "" ? "-rotate-180" : ""}`}
                onClick={() => setShow(!show)}
            >
                <i className="fa-regular fa-calendar"></i>
                &nbsp;&nbsp;
                {data != "" ? moment(data).format("dddd, DD MMMM YYYY") : "Pilih Tanggal"}
            </ExpandedButton>
            <div className={`${show ? '' : 'md:hidden'} relative`}>
                <TECollapse show={show} className="md:absolute z-30 w-full md:w-[120%] md:shadow-none md:-translate-x-[8.25%] pt-0 md:-translate-y-[1.5vw] md:px-[10%] pb-[.5vw]">
                    <TECollapseItem className="bg-white w-full border-1 rounded-[2vw] md:rounded-[.5vw] shadow-md overflow-hidden" breakClassName="hidden md:inline">
                        <ThemeProvider theme={theme}>
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                dateLibInstance={moment}
                            >
                                <StaticDatePicker
                                    slotProps={slotProps}
                                    sx={sx}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    shouldDisableDate={(date) => {
                                        return shouldDisableDate.includes(
                                            date.format("YYYY-MM-DD")
                                        );
                                    }}
                                    onChange={(date) => {
                                        setData(date.format("YYYY-MM-DD"));
                                        setShow(false);
                                    }}
                                ></StaticDatePicker>
                            </LocalizationProvider>
                        </ThemeProvider>
                    </TECollapseItem>
                </TECollapse>
            </div>
            {error != "" ? (
                <p className="text-red-500 text-[3.6vw] md:text-[.9vw] mt-[.25vw]">{error}</p>
            ) : (<></>)}
        </div>
    )
}
