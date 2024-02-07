import { useState } from "react";
import ExpandedButton from "../ExpandedButton";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { ThemeProvider, createTheme } from "@mui/material";
import "@/script/momentCustomLocale";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "../TECollapseItem";

export default function GoalsDatePicker ({ show, setShow, label="", chevronIcon="", data, setData, error="", minDate, maxDate, shouldDisableDate, theme, slotProps, sx, className }) {
    return (
        <div>
            {label != "" ? (
                <p className="mb-[.5vw]">{label}</p>
            ) : (<></>)}
            <ExpandedButton
                className={`rounded-[1vw] md:rounded-[.4vw] h-[9vw] md:h-[3vw] leading-[2vw] md:px-[1.5vw] ${
                    data != ""
                        ? "border-2 border-secondary text-secondary"
                        : "border-1 border-light-grey text-light-grey"
                } ${className}`}
                iconClassName={`group-hover:text-inherit ${
                    data != "" ? "text-grey" : ""
                }`}
                icon={chevronIcon != "" ? chevronIcon : `fa-solid fa-chevron-down duration-300 ${show != "" ? "-rotate-180" : ""}`}
                onClick={() => setShow(!show)}
            >
                <i className="fa-regular fa-calendar"></i>
                &nbsp;&nbsp;
                {data != "" ? moment(data).format("dddd, DD MMMM YYYY") : "Pilih Tanggal"}
            </ExpandedButton>
            <div className="relative">
                <TECollapse show={show} className="absolute border-1 bg-white w-full shadow-md pb-[2vw] z-50">
                    <TECollapseItem>
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
                <p className="text-red-500 text-[.9vw] mt-[.25vw]">This field is required!</p>
            ) : (<></>)}
        </div>
    )
}
