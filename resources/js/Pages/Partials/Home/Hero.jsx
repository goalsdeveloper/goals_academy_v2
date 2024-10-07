import React from "react";

import LeftPeople from "@/Assets/image/hero/left_people.png";
import RightPeople from "@/Assets/image/hero/right_people.png";
import GoalsButton from "@/Components/elements/GoalsButton";
import { router } from "@inertiajs/react";
import circleVector from "/resources/img/vector/circle-5.svg";

export default function Hero() {
    const data = [
        {
            val: "90%",
            desc: "Mahasiswa lulus tepat waktu"
        },
        {
            val: "1000+",
            desc: "Mahasiswa memilih Goals Academy"
        },
        {
            val: "30+",
            desc: "Tutor skripsi berpengalaman"
        },
    ]

    return (
        <>
            <section className="relative pt-[10.23vw] md:py-[4vw] w-[85vw] mx-auto space-y-[7.5vw] md:space-y-[2vw]">
                <div className="mx-auto w-[75vw] md:w-[60vw] space-y-[2vw]">
                    <h1 className="before:icon-primary sm:before:w-0 md:before:w-10 md:before:h-10 md:before:-ms-8 md:before:-mt-5 xl:before:w-20 xl:before:h-20 xl:before:-ms-16 xl:before:-mt-10 text-[5.5vw] md:text-[2.5vw] text-center">
                        Ceritakan Kendala Skripsimu dan Temukan Solusinya Bersama{" "}<br />
                        <span className="text-primary">Goals Academy</span>
                    </h1>
                    <p className="leading-snug mx-auto text-center text-[3.2vw] md:text-[1.2vw] text-neutral-70">
                        Percepat kelulusanmu bersama tutor yang solutif <br className="hidden md:block"/> dan
                        friendly kapan pun dan dimana pun kalian berada.
                    </p>
                </div>

                <div className="flex justify-between md:w-[90%] mx-auto">
                    <div className="flex-1 hidden md:block">
                        <img src={LeftPeople} className="object-contain w-[20vw]" />
                    </div>

                    <div className="flex flex-col items-center flex-[2] gap-y-[7.5vw] md:gap-[2vw]">
                        <GoalsButton className="text-nowrap" onClick={() => router.visit('/produk')}>
                            Daftar Bimbingan Sekarang
                        </GoalsButton>
                        <div className="flex">
                            {data.map(({val, desc}, index) => (
                                <>
                                    <div key={index} className="text-center">
                                        <h2 className="leading-relaxed">{val}</h2>
                                        <p className="text-[2.8vw] md:text-[1vw] w-[85%] mx-auto pt-[.5vw]">
                                            {desc}
                                        </p>
                                    </div>
                                    <div className="last:hidden w-[1px] h-[75%] bg-neutral-40 flex-shrink-0 mt-[.7vw]"></div>
                                </>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 hidden md:block">
                        <img
                            src={RightPeople}
                            className="ml-auto object-contain w-[14.4vw]"
                        />
                    </div>
                </div>

                <div
                    className="hidden md:block -z-20 absolute top-[2vw] -right-[2vw] md:w-[15vw] h-[15vw] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,217,201,.8) 0%, rgba(255,227,216,0) 70%)",
                    }}
                />
                <div
                    className="hidden md:block -z-20 absolute top-[9vw] right-[5vw] md:w-[15vw] h-[15vw] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,217,201,.8) 0%, rgba(255,227,216,0) 70%)",
                    }}
                />
                <div
                    className="hidden md:block -z-20 absolute top-[11vw] -right-[5vw] md:w-[15vw] h-[15vw] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,217,201,.8) 0%, rgba(255,227,216,0) 70%)",
                    }}
                />
                {/* <div
                    className="-z-20 absolute top-[22vw] right-[3vw] w-36 h-36 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,217,201,1) 0%, rgba(255,227,216,0) 80%)",
                    }}
                />
                <div
                    className="-z-20 absolute top-[18vw] right-[12vw] w-36 h-36 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,217,201,1) 0%, rgba(255,227,216,0) 80%)",
                    }}
                /> */}
                <div
                    className="hidden md:block -z-20 absolute top-[2vw] -right-[18vw] w-56 h-56 rounded-full border-[4px] border-dashed border-[#FFA680]"
                />
                {/* <div
                    className="md:hidden -z-20 absolute -top-[5vw] -right-[40vw] w-44 h-44 rounded-full border-[6px] border-dashed border-[#FFA680]"
                /> */}
            </section>
            <div className="md:hidden absolute pt-[18vw] top-0 left-0 w-full -z-20"><img src={circleVector} alt="" /></div>
        </>
    );
}
