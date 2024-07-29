import React from "react";
import ubLogo from "@/Assets/image/logo/ub-logo.png";

export default function Clients() {
    return (
        <section className=" relative py-[4vw] mx-auto space-y-[3vw]">
            <div className="w-[85vw] mx-auto text-center">
                <h3 className="text-[3.7vw] md:text-[1.8vw]">
                    Telah Dipercaya oleh Lebih dari 100+ <br />
                    <span className="text-primary">Mahasiswa Indonesia</span>
                </h3>
                <p className="text-[3.2vw] md:text-[1.2vw]">
                    Mahasiswa dari beragam universitas mempercayakan kelulusan
                    mereka kepada Goals Academy
                </p>
            </div>

            <div className="relative">
                <div className="absolute bg-gradient-to-r from-white to-transparent w-[15vw] left-0 h-full z-10 hidden md:block"></div>
                <div className="absolute bg-gradient-to-l from-white to-transparent w-[15vw] right-0 h-full z-10 hidden md:block"></div>
                <div className="flex overflow-hidden w-max whitespace-nowrap">
                    <div className="flex gap-3 px-1.5 md:px-7 md:gap-14 animate-scroll">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <img
                                key={index}
                                src={ubLogo}
                                className="w-[11.6vw] md:w-[8vw]"
                            />
                        ))}
                    </div>
                    <div className="flex gap-3 px-1.5 md:px-7 md:gap-14 animate-scroll">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <img
                                key={index}
                                src={ubLogo}
                                className="w-[11.6vw] md:w-[8vw]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
