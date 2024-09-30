import React from "react";

import IconFeat1 from "@/Assets/icons/icon-feat1.svg";
import IconFeat2 from "@/Assets/icons/icon-feat2.svg";
import IconFeat3 from "@/Assets/icons/icon-feat3.svg";
import IconFeat4 from "@/Assets/icons/icon-feat4.svg";

export default function Preliminary() {
    return (
        <section className="bg-gradient-to-b from-primary-10 to-transparent to-50% md:to-35% rounded-[11.6vw] md:rounded-[3rem]">
            <div className="relative py-[7.4vw] md:py-[6.25vw] w-[80vw] mx-auto space-y-[2.5vw]">
                <div className="md:flex justify-between space-y-[1.2vw]">
                    <h2 className="text-[3.7vw] md:text-[1.8vw]">
                        Jarak bukan Masalah untuk
                        <br />
                        <span className="text-primary-40">
                            Lulus Lebih Cepat
                        </span>
                    </h2>
                    <p className="text-[3.2vw] md:text-[1.2vw] md:w-[27%]">
                        Buat jadwal bimbingan dengan tutor secara online atau
                        tatap muka dan berinteraksi secara langsung.
                    </p>
                </div>

                <div className="w-full overflow-x-auto scrollbar-hidden">
                    <div className="flex gap-[1.8vw] md:gap-4 w-max md:w-full">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="w-[70vw] md:w-full border rounded-[3.7vw] md:rounded-[.8vw] bg-white space-y-[.9vw] md:space-y-[.4vw] p-[3.7vw] md:p-[1.6vw]"
                            >
                                <div className="w-[11.6vw] h-[11.6vw] md:w-[3.6vw] md:h-[3.6vw] border rounded-full">
                                    <img
                                        src={item.icon}
                                        alt="icon-feat"
                                        className="object-cover w-full h-full p-1 rounded-full"
                                    />
                                </div>
                                <h3 className="font-sans text-[3.2vw] md:text-[1vw] font-semibold">
                                    {item.title}
                                </h3>
                                <p className="font-sans text-[3.2vw] md:text-[1vw]">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const data = [
    {
        id: 1,
        icon: IconFeat1,
        title: "Tutor Professional dan Friendly",
        desc: "Nikmati pengalaman bimbingan skripsi bersama tutor-tutor profesional, friendly, dan solutif pilihan Goals Academy.",
    },
    {
        id: 2,
        icon: IconFeat2,
        title: "Bebas Request Jadwal",
        desc: "Tidak perlu khawatir dengan waktu bimbingan. Sesuaikan jadwal bimbingan dengan kebutuhan dan aktivitasmu!",
    },
    {
        id: 3,
        icon: IconFeat3,
        title: "Mentoring 24/7",
        desc: "Terkendala skripsi di luar jam bimbingan? Konsultasikan kendala skripsimu kapan pun kamu butuhkan.",
    },
    {
        id: 4,
        icon: IconFeat4,
        title: "Program Tuntas 3 Bulan",
        desc: "Kami menawarkan metode bimbingan efektif dan efisien untuk bantu mempercepat kelulusanmu.",
    },
];
