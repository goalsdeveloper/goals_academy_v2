import React from "react";
import ubLogo from "@/Assets/image/logo/ub-logo.png";

export default function Clients() {
    return (
        <section className="relative py-[4vw] mx-auto space-y-[3vw]">
            <div className="mx-auto text-center w-fit">
                <h3>
                    Telah Dipercaya oleh Lebih dari 100+{" "}
                    <span className="text-primary">Mahasiswa Indonesia</span>
                </h3>
                <p>
                    Mahasiswa dari beragam universitas mempercayakan kelulusan
                    mereka kepada Goals Academy
                </p>
            </div>

            <div className="relative flex gap-16 overflow-hidden">
                <div className="absolute bg-gradient-to-r from-white to-transparent w-[15vw] left-0 h-32 z-10"></div>
                <div className="absolute bg-gradient-to-l from-white to-transparent w-[15vw] right-0 h-32 z-10"></div>
                <div className="flex gap-16 animate-scroll">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <img key={index} src={ubLogo} className="w-[8vw]"/>
                    ))}
                </div>
            </div>
        </section>
    );
}
