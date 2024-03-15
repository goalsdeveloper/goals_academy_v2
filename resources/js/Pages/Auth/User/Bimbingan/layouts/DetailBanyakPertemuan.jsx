import GoalsBadge from "@/Components/elements/GoalsBadge";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import {
    ProductItemCardContent,
    ProductItemCardHeader,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import React, { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import DetailSatuPertemuan from "./DetailSatuPertemuan";
import CardImage from "/resources/img/karir/academic-internship.png";
import GoalsDatePicker from "@/Components/elements/GoalsDatePicker";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import { createTheme } from "@mui/material";

const DetailBanyakPertemuan = ({ data, dataAturJadwalComp }) => {
    const [showDetail, setShowDetail] = useState(null);
    const [isAturJadwalShow, setIsAturJadwalShow] = useState(false);
    console.log(data)
    return (
        <div className="relative space-y-[2vw]">
            <ProductItemCardLayout
                imageUrl={data[0].products}
                className="hidden md:flex"
            >
                <AturJadwalPopup
                    {...dataAturJadwalComp}
                    show={isAturJadwalShow}
                    setShow={() => setIsAturJadwalShow(false)}
                />
                <ProductItemCardHeader>
                    <GoalsBadge
                        title="Bimbingan Skripsi"
                        className="text-secondary bg-primary-10"
                    />
                </ProductItemCardHeader>
                <ProductItemCardContent>
                    {/* Content */}
                    <div className="text-[1vw] space-y-[.2vw]">
                        <h2 className="h5 font-medium mb-[.4vw]">
                            {data[0].products.name}
                        </h2>
                        <p className="text-neutral-60">
                            Berlaku hingga : Selasa, 24 Agustus 2023
                        </p>
                    </div>
                    <GoalsButton
                        variant="info"
                        onClick={() => setIsAturJadwalShow(true)}
                    >
                        Atur jadwal sesi berikutnya
                    </GoalsButton>
                </ProductItemCardContent>
            </ProductItemCardLayout>

            {/* Sesi Dropdown Detail */}
            <div className="space-y-[.8vw]">
                {data.map((item, index) => (
                    <DropdownDetail
                        key={index}
                        item={item}
                        index={index + 1}
                        isVisible={showDetail}
                        setIsVisible={setShowDetail}
                    />
                ))}
            </div>
        </div>
    );
};

export default DetailBanyakPertemuan;

export const DropdownDetail = ({ isVisible, setIsVisible, item, index }) => {
    return (
        <React.Fragment>
            <button
                onClick={() =>
                    isVisible == item.id
                        ? setIsVisible(null)
                        : setIsVisible(item.id)
                }
                className="relative w-full flex md:border border-neutral-20 p-[3.7vw] md:p-[1.2vw] gap-[2.9vw] rounded-[.8vw] shadow md:shadow-none justify-between items-center"
            >
                <h3 className="font-medium text-[3.7vw] md:text-[1.2vw]">
                    Sesi {index}
                </h3>

                <span className="flex items-center gap-[.5vw] font-medium text-[3.25vw] md:text-[1vw]">
                    <FiChevronDown
                        className={`pt-[.4vw] md:pt-[.2vw] text-[4vw] md:text-[1.5vw] transition-all duration-300 ${
                            isVisible == item.id ? "rotate-180" : "rotate-0"
                        }`}
                    />{" "}
                    Lihat Detail
                </span>
            </button>

            {isVisible === item.id && (
                <DetailSatuPertemuan
                    className={`rounded-[.8vw] px-[5.5vw] md:px-0 shadow md:shadow-none ${
                        isVisible === item.id ? "scale-y-100" : "scale-y-0"
                    }`}
                    data={item}
                />
            )}
        </React.Fragment>
    );
};

const AturJadwalPopup = ({ show, setShow, cities, date }) => {
    const [showForm, setShowForm] = useState({
        schedule: false,
        city: false,
        place: false,
        topic: false,
        addOn: false,
        document: false,
    });

    const { data, setData, errors, setError, post } = useForm({
        schedule: "",
        city: "",
        place: "",
        document: [],
        topic: "",
    });

    const theme = createTheme({
        typography: {
            fontSize: {
                1: "1vw",
                4: "4vw",
            },
        },
    });

    const unavailableDate = date.map((i) => i.date);

    const showFormHandler = (key, value) => {
        const tempShowForm = { ...showForm };
        Object.keys(tempShowForm).forEach((i) => {
            i == key ? (tempShowForm[i] = value) : (tempShowForm[i] = false);
        });
        setShowForm(tempShowForm);
    };

    return (
        <GoalsPopup show={show} setShow={setShow}>
            <div className="flex justify-between text-black">
                <p className="text-[1.2vw] font-semibold">Atur Jadwal</p>
                <button onClick={() => setShow()}>
                    <FiX className="text-[1.8vw]" />
                </button>
            </div>
            {/* {"schedule" in rules && ( */}
            <div>
                <>
                    <GoalsDatePicker
                        // required={rules["schedule"]}
                        show={showForm.schedule}
                        setShow={(i) => showFormHandler("schedule", i)}
                        wrapperClassName="hidden md:block"
                        label="Pilih Jadwal Bimbinganmu"
                        data={data.schedule}
                        setData={(i) => setData("schedule", i)}
                        minDate={moment()}
                        maxDate={moment().add(6, "days")}
                        shouldDisableDate={unavailableDate}
                        theme={theme}
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
                                    fontSize: "1vw",
                                    height: "5vw",
                                    maxHeight: "unset",
                                    margin: 0,
                                    padding: "0 0 1vw 1.25vw",
                                },
                            },
                        }}
                        sx={{
                            fontSize: "fontSize.1",
                            minWidth: "unset",
                            width: "100%",
                            height: "24vw",
                            padding: "0 1vw 0",
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
                                width: "2.5vw",
                                height: "2.5vw",
                            },
                            "& .MuiPickersDay-root": {
                                width: "2.5vw",
                                height: "2.5vw",
                            },
                            "& .MuiPickersDay-root.Mui-selected": {
                                backgroundColor: "#FF8854",
                            },
                            "& .MuiPickersDay-root.Mui-selected:hover": {
                                backgroundColor: "#FF6420",
                            },
                            "& .MuiPickersYear-yearButton.Mui-selected": {
                                backgroundColor: "#FF8854",
                            },
                            ".css-sc0lva-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)":
                                {
                                    color: "#DDDDDD",
                                },
                        }}
                    />
                    <GoalsDatePicker
                        // required={rules["schedule"]}
                        show={showForm.schedule}
                        setShow={(i) => showFormHandler("schedule", i)}
                        wrapperClassName="md:hidden"
                        label="Pilih Jadwal Bimbinganmu"
                        data={data.schedule}
                        setData={(i) => setData("schedule", i)}
                        minDate={moment()}
                        maxDate={moment().add(6, "days")}
                        shouldDisableDate={unavailableDate}
                        theme={theme}
                        slotProps={{
                            toolbar: { hidden: true },
                            actionBar: {
                                sx: { display: "none" },
                            },
                            switchViewButton: {
                                sx: { display: "none" },
                            },
                            nextIconButton: {
                                sx: { fontSize: "7vw" },
                            },
                            previousIconButton: {
                                sx: { fontSize: "7vw" },
                            },
                            calendarHeader: {
                                sx: {
                                    fontSize: "4vw",
                                    height: "16vw",
                                    maxHeight: "unset",
                                    margin: 0,
                                    padding: "0 0 0 4vw",
                                },
                            },
                        }}
                        sx={{
                            fontSize: "fontSize.4",
                            minWidth: "unset",
                            width: "100%",
                            height: "85vw",
                            padding: "0 3vw 0",
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
                            "& .MuiPickersDay-root.Mui-selected:hover": {
                                backgroundColor: "#FF6420",
                            },
                            "& .MuiPickersYear-yearButton.Mui-selected": {
                                backgroundColor: "#FF8854",
                            },
                            ".css-sc0lva-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)":
                                {
                                    color: "#DDDDDD",
                                },
                        }}
                    />
                </>
                {/* )} */}
                {/* {"city" in rules && ( */}
                <>
                    <GoalsSelectInput
                        // required={rules["city"]}
                        show={showForm.city}
                        setShow={(i) => showFormHandler("city", i)}
                        label="Kota Bimbingan"
                        placeholder="Pilih Kota"
                        data={
                            data.city != ""
                                ? cities.filter(
                                      (item) => item.id == data.city
                                  )[0].city
                                : ""
                        }
                    >
                        {cities.map((item, index) => {
                            return (
                                <GoalsSelectInputItem
                                    key={index}
                                    onClick={() => {
                                        if (data.place == "") {
                                            setData("city", item.id);
                                        } else {
                                            setData({
                                                ...data,
                                                city: item.id,
                                                place: "",
                                            });
                                        }
                                    }}
                                >
                                    {item.city}
                                </GoalsSelectInputItem>
                            );
                        })}
                    </GoalsSelectInput>
                    <GoalsSelectInput
                        // required={rules["place"]}
                        show={showForm.place}
                        setShow={(i) => showFormHandler("place", i)}
                        label="Lokasi Bimbingan"
                        placeholder="Pilih Lokasi Bimbingan"
                        data={
                            data.place != ""
                                ? cities
                                      .filter((item) => item.id == data.city)[0]
                                      .places.filter(
                                          (item) => item.id == data.place
                                      )[0].place
                                : ""
                        }
                    >
                        {data.city != "" ? (
                            cities
                                .filter((item) => item.id == data.city)[0]
                                .places.map((item, index) => {
                                    return (
                                        <GoalsSelectInputItem
                                            key={index}
                                            onClick={() =>
                                                setData("place", item.id)
                                            }
                                        >
                                            {item.place}
                                        </GoalsSelectInputItem>
                                    );
                                })
                        ) : (
                            <GoalsSelectInputItem>
                                Pilih kota terlebih dahulu
                            </GoalsSelectInputItem>
                        )}
                    </GoalsSelectInput>
                </>
                {/* )} */}
                {/* {"topic" in rules && ( */}
                {/* topics.length ? (
                <GoalsSelectInput
                    // required={rules["topic"]}
                    show={showForm.topic}
                    setShow={(i) => showFormHandler("topic", i)}
                    label="Topik Bimbingan"
                    placeholder="Pilih Topik Bimbingan"
                    data={
                        data.topic != ""
                            ? topics.filter((item) => item.id == data.topic)[0]
                                  .topic
                            : ""
                    }
                >
                    {topics.map((item, index) => {
                        return (
                            <GoalsSelectInputItem
                                key={index}
                                onClick={() => setData("topic", item.id)}
                            >
                                {item.topic}
                            </GoalsSelectInputItem>
                        );
                    })}
                </GoalsSelectInput>) */}
                {/* )} */}
                <GoalsButton className="w-full mt-[.8vw]">Simpan</GoalsButton>
            </div>
        </GoalsPopup>
    );
};
