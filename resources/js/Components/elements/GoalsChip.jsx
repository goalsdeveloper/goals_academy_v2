import React from "react";
import { useState } from "react";

const GoalsChip = ({ dataList, className, setSelected, selected, ...rest }) => {
    // pindahkan data ke dalam state
    return (
        <div className="flex gap-[1vw]">
            {dataList.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setSelected(item)}
                    className={`flex items-center border border-neutral-20 px-[1vw] py-[.8vw] rounded-[.8vw] text-[1vw] ${
                        selected === item
                            ? "bg-secondary text-white"
                            : "bg-white"
                    } ${className}`}
                    {...rest}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default GoalsChip;
