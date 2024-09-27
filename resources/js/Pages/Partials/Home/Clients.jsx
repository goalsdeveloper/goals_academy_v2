import React from "react";
import { useMediaQuery } from "react-responsive";

export default function Clients() {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section className=" relative py-[4vw] md:pt-[8vw] md:pb-[5vw] mx-auto space-y-[3vw]">
            <div className="w-[80vw] md:w-[85vw] mx-auto text-center">
                <h3 className="mb-[2vw] md:mb-0 text-[3.7vw] md:text-[1.8vw]">
                    Telah Dipercaya oleh Lebih dari 100+{isMobile ? <br /> : " "}
                    <span className="text-primary">Mahasiswa Indonesia</span>
                </h3>
                <p className="text-[3.2vw] md:text-[1.2vw]">
                    Mahasiswa dari beragam universitas mempercayakan kelulusan
                    mereka kepada Goals Academy
                </p>
            </div>

            <div className="w-full flex flex-nowrap relative gap-0 pt-[4vw] md:pt-[2vw] pb-[8vw] md:pb-[4vw]">
                <div className="absolute bg-gradient-to-r from-white to-transparent w-[15vw] left-0 h-full z-10 hidden md:block"></div>
                <div className="absolute bg-gradient-to-l from-white to-transparent w-[15vw] right-0 h-full z-10 hidden md:block"></div>
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-[2vw] [&_img]:max-w-none px-3 lg:px-12 animate-scroll-200">
                    {Array.from({ length: 11 }).map(i => (
                        uniLogos.map((item) => (
                            <li key={item.id}>
                                <img
                                    // key={item.id}
                                    src={item.logo}
                                    className="w-[11.6vw] h-[11.6vw] md:w-[6vw] md:h-[6vw]"
                                />
                            </li>
                        ))
                    ))}
                </ul>
                <ul className="flex items-center justify-center md:justify-start [&_li]:mx-[2vw] [&_img]:max-w-none px-3 lg:px-12 animate-scroll-200">
                    {Array.from({ length: 11 }).map(i => (
                        uniLogos.map((item) => (
                            <li key={item.id}>
                                <img
                                    // key={item.id}
                                    src={item.logo}
                                    className="w-[11.6vw] h-[11.6vw] md:w-[6vw] md:h-[6vw]"
                                />
                            </li>
                        ))
                    ))}
                </ul>
            </div>
        </section>
    );
}

const uniLogos = [
    {
        id: 1,
        logo: "/img/clients-uni/ub-logo.png",
    },
    {
        id: 2,
        logo: "/img/clients-uni/unair-logo.png",
    },
    {
        id: 3,
        logo: "/img/clients-uni/unand-logo.png",
    },
    {
        id: 4,
        logo: "/img/clients-uni/ipb-logo.png",
    },
    {
        id: 5,
        logo: "/img/clients-uni/um-logo.png",
    },
    {
        id: 6,
        logo: "/img/clients-uni/telu-logo.png",
    },
    {
        id: 7,
        logo: "/img/clients-uni/unud-logo.png",
    },
    {
        id: 8,
        logo: "/img/clients-uni/its-logo.png",
    },
    {
        id: 9,
        logo: "/img/clients-uni/itera-logo.png",
    },
    {
        id: 10,
        logo: "/img/clients-uni/itb-logo.png",
    },
    {
        id: 11,
        logo: "/img/clients-uni/ui-logo.png",
    },
];
