import React from "react";
import Quote from "@/Assets/icons/double-quote.png";

import testimony2 from "/resources/img/testimony/roziqin.jpg";

export default function Testimony() {
    return (
        <section className="relative object-cover bg-testimony-bg h-[85vw] md:h-[37.5vw] pt-[5vw] pb-[2vw] space-y-[2.8vw] md:space-y-[1.2vw]">
            <div className="w-[90%] md:w-[80%] mx-auto space-y-[.4vw]">
                <h2 className="text-[3.7vw] md:text-[1.8vw] font-bold text-white">
                    Kata Mereka Tentang Goals Academy
                </h2>
                <p className="text-white text-[2.7vw] md:text-[1.2vw]">
                    Cerita pengalaman seru selama bimbingan di Goals Academy
                </p>
            </div>
            <div className="flex overflow-x-hidden pb-[2vw] w-max">
                <div className="flex gap-x-[1.2vw] px-[.6vw] animate-scroll-slower z-10">
                    {Array.from({ length: 5 }).map((item) => (
                        <TestimonyCard />
                    ))}
                </div>
                <div className="flex gap-x-[1.2vw] px-[.6vw] animate-scroll-slower z-10">
                    {Array.from({ length: 5 }).map((item) => (
                        <TestimonyCard />
                    ))}
                </div>
            </div>

            <div className="absolute bg-white h-[80%] w-full top-[40%] z-0" />
        </section>
    );
}

const TestimonyCard = () => {
    return (
        <div className="bg-white w-[57vw] md:w-[28.4vw] h-[53vw] md:h-[19.4vw] rounded-[2.8vw] md:rounded-[.6vw] border p-[3.7vw] md:p-[1.8vw] space-y-[2.7vw] md:space-y-[1.2vw] z-10 shadow">
            {/* icon */}

            <img
                src={Quote}
                alt="icon-testimony"
                className="w-[2.3vw] md:w-[1vw] aspect-square"
            />

            <p className="h-[24vw] md:h-fit text-[2.7vw] md:text-[1vw] line-clamp-[7] mmd:line-clamp-6">
                Gara-gara liat kontennya goals academy, yang awalnya aku males
                banget, sekarang jadi dapet motivasi buat ngelanjutin skripsiku.
                Alhasil sekarang tinggal 1 step lagi buat lulus kuliah. Wisuda!
            </p>

            <hr />

            <div className="flex gap-[2.8vw] md:gap-[1.4vw] items-center">
                <img
                    className="h-[7vw] md:h-[3.1vw] rounded-full bg-secondary aspect-square"
                    src={testimony2}
                    alt="User Icon"
                />

                <div>
                    <h3 className="text-[2.8vw] md:text-[.8vw] font-semibold">Kezia</h3>
                    <p className="text-[2.8vw] md:text-[.8vw]">Fakultas Ilmu Budaya</p>
                </div>
            </div>
        </div>
    );
};
