import GoalsChip from "@/Components/elements/GoalsChip";
import React from "react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

const ProductListFilter = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [selected, setSelected] = useState("Semua");
    const [isShow, setIsShow] = useState(false);
    const dataList = ["Semua", "Dalam Proses", "Selesai"];

    return (
        <>
            {isMobile ? (
                <div className="relative">
                    <button
                        onClick={() => setIsShow(true)}
                        className="flex h6 font-normal items-center gap-[.8vw] text-neutral-60"
                    >
                        {selected} <FiChevronDown className="text-[4.2vw]" />
                    </button>
                    {isShow && (
                        <div className="absolute right-0 flex flex-col w-max border shadow-centered-spread rounded-[2.7vw] bg-white h6 font-normal overflow-hidden z-[50]">
                            {dataList.map((item, index) => (
                                <button
                                    key={index}
                                    className={`text-start py-[3.7vw] px-[7.4vw] ${
                                        selected == item
                                            ? "bg-secondary text-white"
                                            : "bg-white hover:bg-primary-10"
                                    }`}
                                    onClick={() => {
                                        setSelected(item);
                                        setIsShow(false);
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <GoalsChip
                    dataList={dataList}
                    selected={selected}
                    setSelected={(p) => setSelected(p)}
                />
            )}
        </>
    );
};

export default ProductListFilter;
