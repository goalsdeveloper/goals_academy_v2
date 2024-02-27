import React from "react";
import { useState } from "react";

const GoalsChip = () => {
    // pindahkan data ke dalam state
    const data = ["Semua", "Dalam Proses", "Selesai"];
    const [selected, setSelected] = useState("Semua");

    return (
        <div className="flex gap-[1vw]">
            {data.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setSelected(item)}
                    className={`flex items-center border border-neutral-20 px-[1vw] py-[.8vw] rounded-[.8vw] text-[1vw] ${
                        selected === item ? "bg-secondary text-white" : "bg-white"
                    }`}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

export default GoalsChip;
