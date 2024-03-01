import {
    ProductItemCardContent,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import GoalsButton from "@/Components/elements/GoalsButton";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { FiChevronDown, FiChevronLeft } from "react-icons/fi";
import CardImage from "/resources/img/karir/academic-internship.png";
import { detailWebinar as dataWebinar } from "./data";
import { FileMediaItemBackdrop } from "../Bimbingan/DetailSatuPertemuan";
import React from "react";

const DetailWebinar = ({ auth }) => {
    return (
        <MainLayout auth={auth} title="Detail Webinar">
            <div className="container mx-auto space-y-[2.5vw] text-secondary mb-[5.2vw]">
                <Link
                    href="/bimbingan"
                    className="flex text-[1vw] font-medium gap-[.5vw] items-center leading-none"
                >
                    <FiChevronLeft className="text-[1.2vw]" />
                    Kembali
                </Link>

                <div className="flex justify-between items-center">
                    <h1 className="md:font-medium text-black text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                        Detail Webinar
                    </h1>

                    <div className="space-x-[.5vw]">
                        <GoalsButton variant="bordered">
                            Beri Ulasan
                        </GoalsButton>
                    </div>
                </div>

                <div className="relative space-y-[2vw]">
                    <ProductItemCardLayout imageUrl={CardImage}>
                        <ProductItemCardContent>
                            <div className="text-[1vw] space-y-[.2vw]">
                                <h2 className="h5 font-medium mb-[.4vw]">
                                    Webinar 1
                                </h2>
                                <p className="text-neutral-60">
                                    11 - 29 Februari 2024
                                </p>
                                <p className="text-neutral-60">19.00 WIB</p>
                            </div>
                            <GoalsButton variant="info">
                                Gabung Webinar
                            </GoalsButton>
                        </ProductItemCardContent>
                    </ProductItemCardLayout>

                    <DetailSatuSesi data={dataWebinar[0].detail} />
                    <DetailBanyakSesi data={dataWebinar} />
                </div>
            </div>
        </MainLayout>
    );
};

export default DetailWebinar;

const DetailSatuSesi = ({ data, className = "" }) => {
    const gapSize = 1;

    return (
        <div className={`flex gap-[${gapSize}vw] ${className}`}>
            {/* Informasi */}
            <div
                className="w-full border border-neutral-20 rounded-[.8vw] p-[3.3vw] space-y-[1.6vw]"
                style={{
                    height: `calc(50% - ${gapSize * 0.5}vw)`,
                }}
            >
                <h2 className="h4 font-medium text-secondary">Informasi</h2>
                <ul className="text-black space-y-[1.25vw]">
                    {data.informasi.map((item, index) => {
                        return (
                            <li key={index} className="space-y-[.2vw]">
                                <h3 className="h6 font-normal text-neutral-50">
                                    {item.title}
                                </h3>
                                <p className="text-[1.25vw] text-neutral-80 font-medium">
                                    {item.value}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
            {/* Lampiran */}
            <div
                className="w-full border border-neutral-20 rounded-[.8vw] p-[3.3vw] space-y-[1.6vw]"
                style={{
                    height: `calc(50% - ${gapSize * 0.5}vw)`,
                }}
            >
                <h2 className="h4 font-medium text-secondary">
                    File dan media
                </h2>

                <div className="space-y-[.2vw]">
                    {data.fileMedia.map((item, index) => {
                        return (
                            <FileMediaItemBackdrop key={index} item={item} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const DetailBanyakSesi = ({ data }) => {
    const [showDetail, setShowDetail] = React.useState(null);

    return (
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
                            className="relative w-full flex border border-neutral-20 p-[1.2vw] gap-[2.9vw] rounded-[.8vw] justify-between items-center"
                        >
                            <h3 className="font-medium h4">{item.sesi}</h3>

                            <span className="flex items-center gap-[.5vw] font-medium text-[1vw]">
                                <FiChevronDown
                                    className={`pt-[.2vw] text-[1.5vw] transition-all duration-300 ${
                                        showDetail == item.id
                                            ? "rotate-180"
                                            : "rotate-0"
                                    }`}
                                />{" "}
                                Lihat Detail
                            </span>
                        </button>

                        {showDetail === item.id && (
                            <DetailSatuSesi
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
    );
};
