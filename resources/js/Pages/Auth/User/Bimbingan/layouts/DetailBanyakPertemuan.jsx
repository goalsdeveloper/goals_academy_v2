import GoalsBadge from "@/Components/elements/GoalsBadge";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsDatePicker from "@/Components/elements/GoalsDatePicker";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import {
    ProductItemCardContent,
    ProductItemCardHeader,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import { useForm, usePage } from "@inertiajs/react";
import { createTheme } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import DetailSatuPertemuan from "./DetailSatuPertemuan";
import { datepickerStyle, mobileDatepickerStyle } from "./config";

const DetailBanyakPertemuan = ({ data, setIsAturJadwalShow }) => {
    const [showDetail, setShowDetail] = useState(null);
    const statusObject = [
        {
            text: "Menunggu",
            desc: "Bimbingan masih dalam proses konfirmasi, untuk info lebih lanjut bisa menghubungi admin"
        },
        {
            text: "Berjalan",
            desc: "Bimbingan anda sedang berjalan, jika ada kendala selama bimbingan silakan hubungi admin"
        }
    ]
    const isWaiting = data.map(i => i.ongoing).includes('menunggu');
    const isOngoing = data.map(i => i.ongoing).includes('berjalan');
    const isFinished = data.map(i => i.ongoing).every(i => i == 'selesai');

    return (
        <div className="relative space-y-[2vw]">
            <ProductItemCardLayout
                imageUrl={
                    window.location.origin +
                    "/storage/" +
                    data[0].products.product_image
                }
                className="hidden md:flex"
            >
                <ProductItemCardHeader>
                    <GoalsBadge
                        title="Bimbingan Skripsi"
                        className="text-secondary bg-primary-10"
                    />
                    {isWaiting ? (
                        <StatusBadge {...statusObject[0]} contact_person={data[0].products.contact_person} />
                    ) : isOngoing ? (
                        <StatusBadge {...statusObject[1]} contact_person={data[0].products.contact_person} />
                    ) : <></>}
                </ProductItemCardHeader>
                <ProductItemCardContent>
                    {/* Content */}
                    <div className="text-[1vw] space-y-[.2vw]">
                        <h2 className="h5 font-medium mb-[.4vw]">
                            {data[0].products.name}
                        </h2>
                        <p className="text-neutral-60">
                            Berlaku hingga : {moment(data[0].order.created_at).add(Number(data[0].products.active_period) - 1, "days").format("dddd, DD MMMM YYYY")}
                        </p>
                    </div>
                    <GoalsButton
                        disabled={!data.some((item) => item.date === null) || !data.some((item) => item.ongoing === "berjalan")}
                        variant="info"
                        onClick={() => setIsAturJadwalShow()}
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
                disabled={item.date == null || item.date == 0}
                onClick={() =>
                    isVisible == item.id
                        ? setIsVisible(null)
                        : setIsVisible(item.id)
                }
                className={`disabled:grayscale disabled:opacity-90 disabled:pointer-events-none relative w-full flex md:border border-neutral-20 p-[3.7vw] md:p-[1.2vw] gap-[2.9vw] rounded-[.8vw] shadow md:shadow-none justify-between items-center`}
            >
                <h3 className="font-medium text-[3.7vw] md:text-[1.2vw]">
                    Sesi {index}
                </h3>
                {item.date == null || item.date == 0 ? (
                    <p>Jadwal Belum Diatur</p>
                ) : (
                    <span className="flex items-center gap-[.5vw] font-medium text-[3.25vw] md:text-[1vw]">
                        <FiChevronDown
                            className={`pt-[.4vw] md:pt-[.2vw] text-[4vw] md:text-[1.5vw] transition-all duration-300 ${
                                isVisible == item.id ? "rotate-180" : "rotate-0"
                            }`}
                        />{" "}
                        Lihat Detail
                    </span>
                )}
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

export const AturJadwalPopup = ({
    show,
    setShow,
    cities,
    date,
    topics,
    order_code,
    purchased_date,
    active_period,
}) => {
    const { courseDetail } = usePage().props;
    const contact_type = courseDetail[0].products.contact_type;

    const [showForm, setShowForm] = useState({
        date: false,
        city: false,
        place_id: false,
        topic: false,
    });

    const { data, setData, post, reset, processing } = useForm({
        date: "",
        city: "",
        place_id: "",
        topic: "",
    });

    const theme = createTheme({
        typography: {
            fontSize: 14,
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

    function aturJadwalValidator(contact_type) {
        switch (contact_type) {
            case "online":
                return data.date != "" && data.topic != "";
            case "offline":
                return (
                    data.date != "" &&
                    data.city != "" &&
                    data.place_id != "" &&
                    data.topic != ""
                );
            case "hybrid":
                return data.date != "" && data.topic != "";
        }

        return false;
    }

    return (
        <GoalsPopup
            show={show}
            setShow={setShow}
            className="max-h-screen overflow-visible space-y-[2vw] md:space-y-0 scrollbar-hidden"
        >
            <div className="flex justify-between text-black">
                <p className="text-[4.6vw] md:text-[1.2vw] font-semibold">
                    Atur Jadwal
                </p>
                <button onClick={() => setShow()}>
                    <FiX className="text-[3.7vw] md:text-[1.8vw]" />
                </button>
            </div>
            <div className="space-y-[4vw] md:space-y-[1vw]">
                {getInputBasedContactType(
                    contact_type,
                    data,
                    setData,
                    showForm,
                    showFormHandler,
                    cities,
                    topics,
                    theme,
                    unavailableDate,
                    purchased_date,
                    active_period,
                )}
            </div>

            <GoalsButton
                disabled={processing | !aturJadwalValidator(contact_type)}
                className="w-full "
                type="submit"
                onClick={() => {
                    if (!aturJadwalValidator(contact_type)) {
                        alert("Harap isi semua data yang diperlukan");
                        return;
                    }

                    post(`/bimbingan/${order_code}/atur-jadwal`,
                     {
                        onSuccess: () => {
                            reset(),
                                setShow(setShow),
                                toast.success("Berhasil mengatur jadwal");
                        },
                        onError: () => {
                            toast.error("Gagal mengatur jadwal");
                        },
                    });
                }}
            >
                Simpan
            </GoalsButton>
        </GoalsPopup>
    );
};

function getInputBasedContactType(
    contact_type,
    data,
    setData,
    showForm,
    showFormHandler,
    cities,
    topics,
    theme,
    unavailableDate,
    purchased_date,
    active_period
) {
    switch (contact_type) {
        case "online":
            return (
                <>
                    <GoalsDatePicker
                        show={showForm.date}
                        setShow={(i) => showFormHandler("date", i)}
                        wrapperClassName="hidden md:block"
                        label="Pilih Jadwal Bimbinganmu"
                        data={data.date}
                        setData={(i) => setData("date", i)}
                        minDate={moment()}
                        maxDate={moment(purchased_date).add(active_period, "days")}
                        shouldDisableDate={unavailableDate}
                        theme={theme}
                        slotProps={datepickerStyle.slotProps}
                        sx={datepickerStyle.sx}
                        required
                    />
                    <GoalsDatePicker
                        show={showForm.date}
                        setShow={(i) => showFormHandler("date", i)}
                        wrapperClassName="md:hidden"
                        label="Pilih Jadwal Bimbinganmu"
                        data={data.date}
                        setData={(i) => setData("date", i)}
                        minDate={moment()}
                        maxDate={moment(purchased_date).add(active_period, "days")}
                        shouldDisableDate={unavailableDate}
                        theme={theme}
                        slotProps={mobileDatepickerStyle.slotProps}
                        sx={mobileDatepickerStyle.sx}
                        required
                    />

                    {"topic" && topics.length && (
                        <GoalsSelectInput
                            show={showForm.topic}
                            setShow={(i) => showFormHandler("topic", i)}
                            label="Topik Bimbingan"
                            placeholder="Pilih Topik Bimbingan"
                            data={
                                data.topic != ""
                                    ? topics.filter(
                                          (item) => item.id == data.topic
                                      )[0].topic
                                    : ""
                            }
                            required
                        >
                            {topics.map((item, index) => {
                                return (
                                    <GoalsSelectInputItem
                                        key={index}
                                        onClick={() =>
                                            setData("topic", item.id)
                                        }
                                    >
                                        {item.topic}
                                    </GoalsSelectInputItem>
                                );
                            })}
                        </GoalsSelectInput>
                    )}
                </>
            );
        case "offline":
            return (
                <>
                    <GoalsDatePicker
                        show={showForm.date}
                        setShow={(i) => showFormHandler("date", i)}
                        wrapperClassName="hidden md:block"
                        label="Pilih Jadwal Bimbinganmu"
                        data={data.date}
                        setData={(i) => setData("date", i)}
                        minDate={moment()}
                        maxDate={moment(purchased_date).add(active_period, "days")}
                        shouldDisableDate={unavailableDate}
                        theme={theme}
                        slotProps={datepickerStyle.slotProps}
                        sx={datepickerStyle.sx}
                        required
                    />
                    <GoalsDatePicker
                        show={showForm.date}
                        setShow={(i) => showFormHandler("date", i)}
                        wrapperClassName="md:hidden"
                        label="Pilih Jadwal Bimbinganmu"
                        data={data.date}
                        setData={(i) => setData("date", i)}
                        minDate={moment()}
                        maxDate={moment(purchased_date).add(active_period, "days")}
                        shouldDisableDate={unavailableDate}
                        theme={theme}
                        slotProps={mobileDatepickerStyle.slotProps}
                        sx={mobileDatepickerStyle.sx}
                        required
                    />

                    {"topic" && topics.length && (
                        <GoalsSelectInput
                            show={showForm.topic}
                            setShow={(i) => showFormHandler("topic", i)}
                            label="Topik Bimbingan"
                            placeholder="Pilih Topik Bimbingan"
                            data={
                                data.topic != ""
                                    ? topics.filter(
                                          (item) => item.id == data.topic
                                      )[0].topic
                                    : ""
                            }
                            required
                        >
                            {topics.map((item, index) => {
                                return (
                                    <GoalsSelectInputItem
                                        key={index}
                                        onClick={() =>
                                            setData("topic", item.id)
                                        }
                                    >
                                        {item.topic}
                                    </GoalsSelectInputItem>
                                );
                            })}
                        </GoalsSelectInput>
                    )}
                    <GoalsSelectInput
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
                        required
                    >
                        {cities.map((item, index) => {
                            return (
                                <GoalsSelectInputItem
                                    key={index}
                                    onClick={() => {
                                        if (data.place_id == "") {
                                            setData("city", item.id);
                                        } else {
                                            setData({
                                                ...data,
                                                city: item.id,
                                                place_id: "",
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
                        show={showForm.place_id}
                        setShow={(i) => showFormHandler("place_id", i)}
                        label="Lokasi Bimbingan"
                        placeholder="Pilih Lokasi Bimbingan"
                        data={
                            data.place_id != ""
                                ? cities
                                      .filter((item) => item.id == data.city)[0]
                                      .places.filter(
                                          (item) => item.id == data.place_id
                                      )[0].place
                                : ""
                        }
                        required
                    >
                        {data.city != "" ? (
                            cities
                                .filter((item) => item.id == data.city)[0]
                                .places.map((item, index) => {
                                    return (
                                        <GoalsSelectInputItem
                                            key={index}
                                            onClick={() =>
                                                setData("place_id", item.id)
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
            );
        case "hybrid":
            {
                const [isOnline, setIsOnline] = useState(true);
                return (
                    <>
                        <div className="grid grid-cols-2 gap-[1vw]">
                            <GoalsButton variant={isOnline ? "primary" : "bordered"} onClick={() => setIsOnline(true)}>Online</GoalsButton>
                            <GoalsButton variant={!isOnline ? "primary" : "bordered"} onClick={() => setIsOnline(false)}>Offline</GoalsButton>
                        </div>
                        <GoalsDatePicker
                            show={showForm.date}
                            setShow={(i) => showFormHandler("date", i)}
                            wrapperClassName="hidden md:block"
                            label="Pilih Jadwal Bimbinganmu"
                            data={data.date}
                            setData={(i) => setData("date", i)}
                            minDate={moment()}
                            maxDate={moment(purchased_date).add(active_period, "days")}
                            shouldDisableDate={unavailableDate}
                            theme={theme}
                            slotProps={datepickerStyle.slotProps}
                            sx={datepickerStyle.sx}
                            required
                        />
                        <GoalsDatePicker
                            show={showForm.date}
                            setShow={(i) => showFormHandler("date", i)}
                            wrapperClassName="md:hidden"
                            label="Pilih Jadwal Bimbinganmu"
                            data={data.date}
                            setData={(i) => setData("date", i)}
                            minDate={moment()}
                            maxDate={moment(purchased_date).add(active_period, "days")}
                            shouldDisableDate={unavailableDate}
                            theme={theme}
                            slotProps={mobileDatepickerStyle.slotProps}
                            sx={mobileDatepickerStyle.sx}
                            required
                        />

                        {"topic" && topics.length && (
                            <GoalsSelectInput
                                show={showForm.topic}
                                setShow={(i) => showFormHandler("topic", i)}
                                label="Topik Bimbingan"
                                placeholder="Pilih Topik Bimbingan"
                                data={
                                    data.topic != ""
                                        ? topics.filter(
                                              (item) => item.id == data.topic
                                          )[0].topic
                                        : ""
                                }
                                required
                            >
                                {topics.map((item, index) => {
                                    return (
                                        <GoalsSelectInputItem
                                            key={index}
                                            onClick={() =>
                                                setData("topic", item.id)
                                            }
                                        >
                                            {item.topic}
                                        </GoalsSelectInputItem>
                                    );
                                })}
                            </GoalsSelectInput>
                        )}
                        {!isOnline && (
                            <>
                                <GoalsSelectInput
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
                                    required
                                >
                                    {cities.map((item, index) => {
                                        return (
                                            <GoalsSelectInputItem
                                                key={index}
                                                onClick={() => {
                                                    if (data.place_id == "") {
                                                        setData("city", item.id);
                                                    } else {
                                                        setData({
                                                            ...data,
                                                            city: item.id,
                                                            place_id: "",
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
                                    show={showForm.place_id}
                                    setShow={(i) => showFormHandler("place_id", i)}
                                    label="Lokasi Bimbingan"
                                    placeholder="Pilih Lokasi Bimbingan"
                                    data={
                                        data.place_id != ""
                                            ? cities
                                                .filter((item) => item.id == data.city)[0]
                                                .places.filter(
                                                    (item) => item.id == data.place_id
                                                )[0].place
                                            : ""
                                    }
                                    required
                                >
                                    {data.city != "" ? (
                                        cities
                                            .filter((item) => item.id == data.city)[0]
                                            .places.map((item, index) => {
                                                return (
                                                    <GoalsSelectInputItem
                                                        key={index}
                                                        onClick={() =>
                                                            setData("place_id", item.id)
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
                        )}
                    </>
                );
            }
    }
}

function StatusBadge ({ text, desc, contact_person }) {
    return (    
        <div className="relative">
            <GoalsBadge
                title={
                    <span className="flex gap-[.5vw]">
                        {text}{" "}
                        <div className="flex items-center justify-center text-blue-500 border-1 border-blue-500 rounded-full h-[1vw] w-[1vw]">
                            !
                        </div>
                    </span>
                }
                className="text-blue-500 bg-blue-100 peer/status cursor-pointer"
            />
            <div className="absolute bottom-0 translate-y-[100%] hidden hover:block peer-hover/status:block z-10 pt-[.5vw]">
                <div className="w-[24vw] bg-white text-dark text-center shadow-xl rounded-[.625vw] space-y-[2.08vw] pt-[2.5vw] pb-[1.67vw] px-[2.08vw]">
                    <h3 className="font-poppins font-semibold text-[5vw] md:text-[1.25vw]">
                        Informasi Bimbingan
                    </h3>
                    <p className="text-[4vw] md:text-[1vw]">{desc}</p>
                    <div>
                        <GoalsButton
                            onClick={() =>
                                open(
                                    `https://api.whatsapp.com/send?phone=${contact_person}`,
                                    "_blank"
                                )
                            }
                            className="w-full"
                        >
                            Hubungi Admin
                        </GoalsButton>
                        {/* <GoalsButton className="w-full">Kembali</GoalsButton> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
