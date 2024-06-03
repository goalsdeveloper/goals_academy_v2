import GoalsChip from "@/Components/elements/GoalsChip";
import React from "react";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";

const ProductListFilter = ({ data, setData, filterList, type = "product" }) => {
    const [initialData] = useState(data);
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const [selected, setSelected] = useState(filterList[0]);
    const [isShow, setIsShow] = useState(false);

    function getFilterVars(item) {
        switch (type) {
            case "product":
                return item.ongoing;
            case "transaction":
                return item.status.toLowerCase();
        }
    }

    const handleFilterChange = (filter) => {
        setSelected(filter);
        if (filter.value === filterList[0].value) {
            setData(initialData);
        } else {
            const filteredData = initialData.filter((item) => {
                return getFilterVars(item) === filter.value;
            });
            setData(filteredData);
        }
    };

    return (
        <>
            {isMobile ? (
                <div className="relative">
                    <button
                        onClick={() => setIsShow(true)}
                        className="flex h6 font-normal items-center gap-[.8vw] text-neutral-60"
                    >
                        {selected.label}{" "}
                        <FiChevronDown className="text-[4.2vw]" />
                    </button>
                    {isShow && (
                        <div className="absolute right-0 flex flex-col w-max border shadow-centered-spread rounded-[2.7vw] bg-white h6 font-normal overflow-hidden z-[50]">
                            {filterList.map((item, index) => (
                                <button
                                    key={index}
                                    className={`text-start py-[3.7vw] px-[7.4vw] ${
                                        selected.value == item.value
                                            ? "bg-secondary text-white"
                                            : "bg-white hover:bg-primary-10"
                                    }`}
                                    onClick={() => {
                                        handleFilterChange(item);
                                        setIsShow(false);
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <GoalsChip
                    dataList={filterList}
                    selected={selected}
                    setSelected={(p) => handleFilterChange(p)}
                />
            )}
        </>
    );
};

export default ProductListFilter;
