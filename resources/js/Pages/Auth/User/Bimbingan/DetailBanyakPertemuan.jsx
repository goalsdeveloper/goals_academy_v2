import { ProductItemCardContent, ProductItemCardHeader, ProductItemCardLayout } from "@/Components/ProductItemCard";
import GoalsBadge from "@/Components/elements/GoalsBadge";
import { useState } from "react";
import DetailSatuPertemuan from "./DetailSatuPertemuan";
import CardImage from "/resources/img/karir/academic-internship.png";
import GoalsButton from "@/Components/elements/GoalsButton";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const DetailBanyakPertemuan = ({ data }) => {
    const [showDetail, setShowDetail] = useState(null);

    return (
        <div className="relative space-y-[2vw]">
            <ProductItemCardLayout imageUrl={CardImage}>
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

                    <GoalsButton variant="info">
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
