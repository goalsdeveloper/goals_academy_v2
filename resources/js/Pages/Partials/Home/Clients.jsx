import React from "react";

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

            <div className="relative pt-[2vw] pb-[4vw]">
                <div className="absolute bg-gradient-to-r from-white to-transparent w-[15vw] left-0 h-full z-10 hidden md:block"></div>
                <div className="absolute bg-gradient-to-l from-white to-transparent w-[15vw] right-0 h-full z-10 hidden md:block"></div>
                <div className="flex overflow-hidden w-full whitespace-nowrap">
                    <div className="flex gap-6 px-3 lg:px-12 lg:gap-24 animate-scroll">
                        {uniLogos.map((item) => (
                            <img
                                key={item.id}
                                src={item.logo}
                                className="w-[11.6vw] h-[11.6vw] md:w-[8vw] md:h-[8vw]"
                            />
                        ))}
                    </div>
                    <div className="flex gap-6 px-3 lg:px-12 lg:gap-24 animate-scroll">
                        {uniLogos.map((item) => (
                            <img
                                key={item.id}
                                src={item.logo}
                                className="w-[11.6vw] h-[11.6vw] md:w-[8vw] md:h-[8vw]"
                            />
                        ))}
                    </div>
                </div>
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
