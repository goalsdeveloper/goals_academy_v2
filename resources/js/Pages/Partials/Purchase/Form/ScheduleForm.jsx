import { useState } from "react";
import moment from "moment";
import ButtonPill from "@/Components/ButtonPill";
import ExpandedButton from "@/Components/ExpandedButton";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import { ThemeProvider, createTheme } from "@mui/material";
import "@/script/momentCustomLocale";

export default function ScheduleForm({
    show,
    setShow,
    data,
    setData,
    temp,
    setTemp,
    unavailableDate,
    cities,
    places,
    rules,
}) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCityOptions, setShowCityOptions] = useState(false);
    const [showPlaceOptions, setShowPlaceOptions] = useState(false);
    const theme = createTheme({
        typography: {
            fontSize: {
                1: "1vw",
                4: "4vw",
            },
        },
    });
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() =>
                    showDatePicker ? setShowDatePicker(false) : setShow(false)
                }
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh] h-[70vh]`}
            >
                <div
                    className={`${
                        showDatePicker ? "" : "hidden"
                    } absolute top-0 left-0 right-0 bottom-0 bg-dark bg-opacity-25 rounded-xl`}
                    onClick={() => setShowDatePicker(false)}
                ></div>
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="text-secondary font-poppins font-bold text-[4.5vw] md:text-[1.2vw]">
                            Pilih Jadwal Bimbingan
                        </h5>
                        <i
                            role="button"
                            className={
                                "fa-solid fa-times text-[5vw] md:text-[1.5vw]"
                            }
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div>
                    <p className="font-medium mb-[3vw] md:mb-[1.25vw]">
                        Pilih Tanggal Bimbingan :
                    </p>
                    <div className="relative w-full">
                        <ExpandedButton
                            className="shadow-centered-spread rounded-sm h-[9vw] md:h-[2.5vw]"
                            borderClassName={
                                temp.schedule != ""
                                    ? "border-2 border-secondary"
                                    : "border-0"
                            }
                            textClassName={`font-medium ${
                                temp.schedule != ""
                                    ? "text-dark"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                            {temp.schedule != ""
                                ? moment(temp.schedule).format(
                                      "dddd, DD MMMM YYYY"
                                  )
                                : "Pilih Tanggal"}
                        </ExpandedButton>
                        <div
                            className={`hidden md:block absolute top-0 left-0 right-0 rounded-[.4vw] shadow-centered-spread w-full transition-all duration-500 overflow-visible ${
                                showDatePicker
                                    ? "scale-100"
                                    : "scale-0 -translate-y-[50%] -translate-x-[50%]"
                            }`}
                        >
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                    dateLibInstance={moment}
                                >
                                    <StaticDatePicker
                                        slotProps={{
                                            toolbar: { hidden: true },
                                            actionBar: {
                                                sx: { display: "none" },
                                            },
                                            switchViewButton: {
                                                sx: { display: "none" },
                                            },
                                            nextIconButton: {
                                                sx: { fontSize: "1.75vw" },
                                            },
                                            previousIconButton: {
                                                sx: { fontSize: "1.75vw" },
                                            },
                                            calendarHeader: {
                                                sx: {
                                                    fontSize: "1.25vw",
                                                    height: "4vw",
                                                    maxHeight: "unset",
                                                    margin: 0,
                                                    padding: "0 .75vw 0 1.5vw",
                                                },
                                            },
                                        }}
                                        sx={{
                                            fontSize: "fontSize.1",
                                            minWidth: "unset",
                                            width: "100%",
                                            height: "25vw",
                                            padding: "1vw 1vw 2vw",
                                            maxHeight: "unset",
                                            "& .MuiDateCalendar-root": {
                                                width: "100%",
                                                height: "fit-content",
                                                maxHeight: "unset",
                                            },
                                            "& .MuiPickersLayout-contentWrapper":
                                                {
                                                    width: "100%",
                                                    height: "100%",
                                                },
                                            "& .MuiDayCalendar-monthContainer":
                                                {
                                                    width: "100%",
                                                    height: "fit-content",
                                                    position: "relative",
                                                },
                                            "& .MuiPickersSlideTransition-root":
                                                {
                                                    width: "100%",
                                                    height: "fit-content",
                                                    minHeight: "unset",
                                                },
                                            "& .MuiDayCalendar-weekDayLabel": {
                                                width: "3vw",
                                                height: "3vw",
                                            },
                                            "& .MuiPickersDay-root": {
                                                width: "3vw",
                                                height: "3vw",
                                            },
                                            "& .MuiPickersDay-root.Mui-selected":
                                                { backgroundColor: "#FF8854" },
                                            "& .MuiPickersDay-root.Mui-selected:hover":
                                                { backgroundColor: "#FF6420" },
                                            "& .MuiPickersYear-yearButton.Mui-selected":
                                                { backgroundColor: "#FF8854" },
                                        }}
                                        minDate={moment()}
                                        maxDate={moment().add("6", "day")}
                                        shouldDisableDate={(date) => {
                                            return unavailableDate.includes(
                                                date.format("YYYY-MM-DD")
                                            );
                                        }}
                                        onChange={(date) => {
                                            setTemp(
                                                "schedule",
                                                date.format("YYYY-MM-DD")
                                            );
                                            setShowDatePicker(false);
                                        }}
                                    ></StaticDatePicker>
                                </LocalizationProvider>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <div className={"city" in rules ? "" : "hidden"}>
                    <p className="font-medium mb-[3vw] md:mb-[1.25vw]">
                        Pilih Kota Bimbingan{" "}
                        {"city" in rules
                            ? rules.city
                                ? ""
                                : " (opsional)"
                            : ""}
                        :
                    </p>
                    <ExpandedButton
                        className="shadow-centered-spread rounded-sm h-[9vw] md:h-[2.5vw]"
                        borderClassName={
                            temp.city != ""
                                ? "border-2 border-secondary"
                                : "border-0"
                        }
                        textClassName={`font-medium ${
                            temp.city != "" ? "text-dark" : "text-gray-400"
                        }`}
                        icon={`fa-solid fa-chevron-down duration-500 ${
                            showCityOptions ? "-rotate-180 -z-10" : ""
                        }`}
                        onClick={() => {
                            if (showPlaceOptions) {
                                setShowPlaceOptions(false);
                            }
                            setShowCityOptions(!showCityOptions);
                        }}
                    >
                        {temp.city != "" ? temp.city : "Pilih Kota"}
                    </ExpandedButton>
                    <TECollapse
                        show={showCityOptions}
                        className="w-[110%] -ms-[5%] px-[4%] shadow-none"
                    >
                        <TECollapseItem className="grid gap-[5vw] md:gap-[1.75vw] p-[.5vw] pe-[1.5vw] md:pe-[1.5vw] h-[20vw] md:h-[10vw] overflow-y-scroll">
                            {cities.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="w-full flex justify-between items-center h-[8vw] md:h-[3vw] px-[4vw] md:px-[1vw] font-medium shadow-centered rounded-sm border-0 hover:bg-secondary hover:text-white text-gray-400 cursor-pointer"
                                        onClick={() => {
                                            if (temp.city != item) {
                                                setTemp({
                                                    ...temp,
                                                    city: item,
                                                    place: "",
                                                });
                                            } else {
                                                setTemp("city", item);
                                            }
                                            setShowCityOptions(false);
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </TECollapseItem>
                    </TECollapse>
                </div>
                <div className={"place" in rules ? "" : "hidden"}>
                    <p className="font-medium mb-[3vw] md:mb-[1.25vw]">
                        Pilih Lokasi Bimbingan{" "}
                        {"place" in rules
                            ? rules.place
                                ? ""
                                : " (opsional)"
                            : ""}
                        :
                    </p>
                    <ExpandedButton
                        className={`shadow-centered-spread rounded-sm h-[9vw] md:h-[2.5vw] ${
                            temp.city != "" ? "" : "bg-slate-100"
                        }`}
                        borderClassName={
                            temp.place != ""
                                ? "border-2 border-secondary"
                                : "border-0"
                        }
                        textClassName={`font-medium ${
                            temp.place != "" ? "text-dark" : "text-gray-400"
                        }`}
                        icon={`fa-solid fa-chevron-down duration-500 ${
                            showPlaceOptions ? "-rotate-180 -z-10" : ""
                        }`}
                        onClick={() => {
                            if (temp.city != "") {
                                if (showCityOptions) {
                                    setShowCityOptions(false);
                                }
                                setShowPlaceOptions(!showPlaceOptions);
                            }
                        }}
                    >
                        {temp.place != "" ? temp.place : "Pilih Lokasi"}
                    </ExpandedButton>
                    <TECollapse
                        show={showPlaceOptions}
                        className="w-[110%] -ms-[5%] px-[4%] shadow-none"
                    >
                        <TECollapseItem className="grid gap-[5vw] md:gap-[1.75vw] p-[.5vw] pe-[1.5vw] md:pe-[1.5vw] h-[20vw] md:h-[10vw] overflow-y-scroll">
                            {temp.city != "" ? (
                                places[temp.city].map((item, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="w-full flex justify-between items-center h-[8vw] md:h-[3vw] px-[4vw] md:px-[1vw] font-medium shadow-centered rounded-sm border-0 hover:bg-secondary hover:text-white text-gray-400 cursor-pointer"
                                            onClick={() => {
                                                setTemp("place", item);
                                                setShowPlaceOptions(false);
                                            }}
                                        >
                                            {item}
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    className="w-full flex justify-between items-center h-[8vw] md:h-[3vw] px-[4vw] md:px-[1vw] font-medium shadow-centered rounded-sm border-0 hover:bg-secondary hover:text-white text-gray-400 cursor-pointer"
                                    onClick={() => setShowPlaceOptions(false)}
                                >
                                    Kosong
                                </div>
                            )}
                        </TECollapseItem>
                    </TECollapse>
                </div>
                <div className="flex justify-center md:justify-end mt-[1vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={
                            "place" in rules
                                ? temp.schedule != "" && temp.place != ""
                                : temp.schedule != ""
                        }
                        onClick={(e) => {
                            if (
                                "place" in rules
                                    ? temp.schedule != "" && temp.place != ""
                                    : temp.schedule != ""
                            ) {
                                setData({
                                    ...data,
                                    schedule: temp.schedule,
                                    city: temp.city,
                                    place: temp.place,
                                });
                                setShow(false);
                            }
                        }}
                    >
                        Simpan
                    </ButtonPill>
                </div>
            </div>
            <div
                className={`${
                    showDatePicker
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } md:hidden fixed left-0 flex justify-center items-center gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh] h-[70vh]`}
            >
                <div
                    className={`rounded-[1vw] flex md:rounded-[.4vw] shadow-centered-spread w-full h-[50vh] transition-all duration-500 overflow-visible`}
                >
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider
                            dateAdapter={AdapterMoment}
                            dateLibInstance={moment}
                        >
                            <StaticDatePicker
                                slotProps={{
                                    toolbar: { hidden: true },
                                    actionBar: { sx: { display: "none" } },
                                    switchViewButton: {
                                        sx: { display: "none" },
                                    },
                                    nextIconButton: { sx: { fontSize: "6vw" } },
                                    previousIconButton: {
                                        sx: { fontSize: "6vw" },
                                    },
                                    calendarHeader: {
                                        sx: {
                                            fontSize: "5vw",
                                            height: "10vw",
                                            maxHeight: "unset",
                                            margin: 0,
                                            padding: "1vw 0 6vw 4vw",
                                        },
                                    },
                                }}
                                sx={{
                                    fontSize: "fontSize.4",
                                    minWidth: "unset",
                                    width: "100%",
                                    height: "50vh",
                                    padding: "6vw 3vw 6vw",
                                    maxHeight: "unset",
                                    "& .MuiDateCalendar-root": {
                                        width: "100%",
                                        height: "fit-content",
                                        maxHeight: "unset",
                                    },
                                    "& .MuiPickersLayout-contentWrapper": {
                                        width: "100%",
                                        height: "100%",
                                    },
                                    "& .MuiDayCalendar-monthContainer": {
                                        width: "100%",
                                        height: "fit-content",
                                        position: "relative",
                                    },
                                    "& .MuiPickersSlideTransition-root": {
                                        width: "100%",
                                        height: "fit-content",
                                        minHeight: "unset",
                                    },
                                    "& .MuiDayCalendar-weekDayLabel": {
                                        width: "10vw",
                                        height: "10vw",
                                    },
                                    "& .MuiPickersDay-root": {
                                        width: "10vw",
                                        height: "10vw",
                                    },
                                    "& .MuiPickersDay-root.Mui-selected": {
                                        backgroundColor: "#FF8854",
                                    },
                                    "& .MuiPickersYear-yearButton.Mui-selected":
                                        { backgroundColor: "#FF8854" },
                                }}
                                minDate={moment()}
                                maxDate={moment().add("6", "day")}
                                shouldDisableDate={(date) => {
                                    return unavailableDate.includes(
                                        date.format("YYYY-MM-DD")
                                    );
                                }}
                                onChange={(date) => {
                                    setTemp(
                                        "schedule",
                                        date.format("YYYY-MM-DD")
                                    );
                                    setShowDatePicker(false);
                                }}
                            ></StaticDatePicker>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
}
