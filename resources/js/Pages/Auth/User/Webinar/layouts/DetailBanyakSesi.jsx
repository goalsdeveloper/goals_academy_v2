import GoalsButton from "@/Components/elements/GoalsButton";
import {
    ProductItemCardContent,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import DetailSatuSesi from "./DetailSatuSesi";

const DetailBanyakSesi = ({ data }) => {
    const [showDetail, setShowDetail] = React.useState(null);

    return (
        <div className="relative space-y-[2vw]">


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
                                className="relative w-full flex md:border border-neutral-20 p-[3.7vw] md:p-[1.2vw] gap-[2.9vw] rounded-[.8vw] shadow md:shadow-none justify-between items-center"
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
                                    className={`rounded-[.8vw] px-[5.5vw] md:px-0 shadow md:shadow-none ${
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
