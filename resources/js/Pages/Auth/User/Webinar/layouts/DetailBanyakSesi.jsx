import GoalsButton from "@/Components/elements/GoalsButton";
import {
    ProductItemCardContent,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import DetailSatuSesi from "./DetailSatuSesi";
import CardImage from "/resources/img/karir/academic-internship.png";

const DetailBanyakSesi = ({ data }) => {
    const [showDetail, setShowDetail] = React.useState(null);

    return (
        <div className="relative space-y-[2vw]">
            <ProductItemCardLayout
                imageUrl={CardImage}
                className="hidden md:flex"
            >
                <ProductItemCardContent>
                    <div className="text-[1vw] space-y-[.2vw]">
                        <h2 className="h5 font-medium mb-[.4vw]">Webinar 1</h2>
                        <p className="text-neutral-60">11 - 29 Februari 2024</p>
                        <p className="text-neutral-60">19.00 WIB</p>
                    </div>
                    <GoalsButton variant="info">Gabung Webinar</GoalsButton>
                </ProductItemCardContent>
            </ProductItemCardLayout>

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
                                <h3 className="font-medium text-[3.7vw] md:text-[1.2vw]">
                                    {item.sesi}
                                </h3>

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
        </div>
    );
};

export default DetailBanyakSesi;
