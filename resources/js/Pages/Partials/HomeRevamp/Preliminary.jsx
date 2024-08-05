import React from "react";

import IconFeat1 from "@/Assets/icons/icon-feat.png";

export default function Preliminary() {
    return (
        <section className="bg-gradient-to-b from-primary-10 to-transparent to-50% md:to-35% rounded-[11.6vw] md:rounded-[3rem]">
            <div className="relative py-[7.4vw] md:py-[4vw] w-[80vw] mx-auto space-y-[2.5vw]">
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

                <div className="flex gap-4">
                    {Array.from({ length: 4 }).map((item) => (
                        <div className="w-[25%] border rounded-[.8vw] bg-white space-y-[.4vw] p-[1.6vw]">
                            <div className="w-[3.6vw] h-[3.6vw] border rounded-full">
                                <img
                                    src={IconFeat1}
                                    alt="icon-feat"
                                    className="object-cover w-full h-full p-1 rounded-full"
                                />
                            </div>
                            <h3 className="font-sans text-[1vw] font-semibold">
                                Tutor Professional dan Friendly
                            </h3>
                            <p className="font-sans text-[1vw]">
                                Nikmati pengalaman bimbingan skripsi bersama
                                tutor-tutor profesional, friendly, dan solutif
                                pilihan Goals Academy.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
