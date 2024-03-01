import {
    ProductItemCardContent,
    ProductItemCardHeader,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import GoalsBadge from "@/Components/elements/GoalsBadge";
import { useState } from "react";
import DetailSatuPertemuan from "./DetailSatuPertemuan";
import CardImage from "/resources/img/karir/academic-internship.png";
import GoalsButton from "@/Components/elements/GoalsButton";
import React from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import GoalsDatePicker from "@/Components/elements/GoalsDatePicker";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";

const DetailBanyakPertemuan = ({ data }) => {
    const [showDetail, setShowDetail] = useState(null);
    const [isAturJadwalShow, setIsAturJadwalShow] = useState(false);

    return (
        <div className="relative space-y-[2vw]">
            <ProductItemCardLayout imageUrl={CardImage} className="hidden md:flex">
                <AturJadwalPopup
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
                            Dibimbing Tuntas
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
                {data.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <button
                                onClick={() =>
                                    showDetail == item.id
                                        ? setShowDetail(null)
                                        : setShowDetail(item.id)
                                }
                                className="relative w-full flex md:border border-neutral-20 p-[2vw] md:p-[1.2vw] gap-[2.9vw] rounded-[.8vw] justify-between items-center"
                            >
                                <h3 className="font-medium h6 md:h4">{item.sesi}</h3>

                                <span className="flex items-center gap-[.5vw] font-medium text-[3.25vw] md:text-[1vw]">
                                    <FiChevronDown
                                        className={`pt-[.4vw] md:pt-[.2vw] text-[4vw] md:text-[1.5vw] transition-all duration-300 ${
                                            showDetail == item.id
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />{" "}
                                    Lihat Detail
                                </span>
                            </button>

                            {showDetail === item.id && (
                                <DetailSatuPertemuan
                                    className={`${
                                        showDetail === item.id
                                            ? "scale-y-100"
                                            : "scale-y-0"
                                    }`}
                                    data={item.detail}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default DetailBanyakPertemuan;

const AturJadwalPopup = ({ show, setShow }) => {
    return (
        <GoalsPopup show={show} setShow={setShow}>
            <div className="flex justify-between text-black">
                <p className="text-[1.2vw] font-semibold">Atur Jadwal</p>
                <button onClick={() => setShow()}>
                    <FiX className="text-[1.8vw]" />
                </button>
            </div>

            <div className="flex flex-col gap-[.4vw]">
                {/* <GoalsDatePicker /> */}
                <GoalsSelectInput>
                    <GoalsSelectInputItem>Malang</GoalsSelectInputItem>
                    <GoalsSelectInputItem>Surabaya</GoalsSelectInputItem>
                    <GoalsSelectInputItem>Jakarta</GoalsSelectInputItem>
                </GoalsSelectInput>
                <GoalsTextInput
                    label="Lokasi Bimbingan"
                    placeholder="Pilih Lokasi Cafe"
                />
                <GoalsTextInput
                    label="Topik Bimbingan"
                    placeholder="Pilih Catatan"
                />

                <GoalsButton className="w-full mt-[.8vw]">Simpan</GoalsButton>
            </div>
        </GoalsPopup>
    );
};