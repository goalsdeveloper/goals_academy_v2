import React from "react";

import LeftPeople from "@/Assets/image/hero/left_people.png";
import RightPeople from "@/Assets/image/hero/right_people.png";
import GoalsButton from "@/Components/elements/GoalsButton";

export default function Hero() {
    return (
        <section className="relative py-[8vw] w-[80vw] mx-auto space-y-[2vw]">
            <div className="mx-auto w-[60vw] space-y-[2vw]">
                <h1 className="before:icon-primary sm:before:w-0 md:before:w-10 md:before:h-10 md:before:-ms-8 md:before:-mt-5 xl:before:w-20 xl:before:h-20 xl:before:-ms-16 xl:before:-mt-10 text-[2.5vw] text-center">
                    Ceritakan Kendala Skripsimu dan Temukan Solusinya Bersama{" "}
                    <span className="text-primary">Goals Academy</span>
                </h1>
                <p className="leading-snug mx-auto text-center text-[1.2vw] text-neutral-70">
                    Percepat kelulusanmu bersama tutor yang solutif <br /> dan
                    friendly kapan pun dan dimana pun kalian berada.
                </p>
            </div>
            <div className="flex justify-between w-[90%] mx-auto">
                <div className="flex-1">
                    <img src={LeftPeople} className="object-contain w-[20vw]" />
                </div>

                <div className="flex flex-col items-center flex-[2] gap-[2vw]">
                    <GoalsButton className="text-nowrap">
                        Daftar Bimbingan Sekarang
                    </GoalsButton>
                    <div className="flex">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <>
                                <div className="text-center">
                                    <h2 className="leading-relaxed">90%</h2>
                                    <p className="text-[1vw] w-[85%] mx-auto pt-[.5vw]">
                                        Mahasiswa lulus tepat waktu
                                    </p>
                                </div>
                                <div className="last:hidden w-[1px] h-[75%] bg-neutral-40 flex-shrink-0 mt-[.7vw]"></div>
                            </>
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <img
                        src={RightPeople}
                        className="ml-auto object-contain w-[14.4vw]"
                    />
                </div>
            </div>

            <div
                className="-z-20 absolute top-[2vw] -right-[2vw] w-48 h-48 rounded-full"
                style={{
                    background: "rgb(255,217,201)",
                    background:
                        "radial-gradient(circle, rgba(255,217,201,.8) 0%, rgba(255,227,216,0) 80%)",
                }}
            />
            <div
                className="-z-20 absolute top-[11vw] right-[6vw] w-48 h-48 rounded-full"
                style={{
                    background: "rgb(255,217,201)",
                    background:
                        "radial-gradient(circle, rgba(255,217,201,.8) 0%, rgba(255,227,216,0) 80%)",
                }}
            />
            <div
                className="-z-20 absolute top-[13vw] -right-[5vw] w-48 h-48 rounded-full"
                style={{
                    background: "rgb(255,217,201)",
                    background:
                        "radial-gradient(circle, rgba(255,217,201,.8) 0%, rgba(255,227,216,0) 80%)",
                }}
            />
            {/* <div
                className="-z-20 absolute top-[22vw] right-[3vw] w-36 h-36 rounded-full"
                style={{
                    background: "rgb(255,217,201)",
                    background:
                        "radial-gradient(circle, rgba(255,217,201,1) 0%, rgba(255,227,216,0) 80%)",
                }}
            />
            <div
                className="-z-20 absolute top-[18vw] right-[12vw] w-36 h-36 rounded-full"
                style={{
                    background: "rgb(255,217,201)",
                    background:
                        "radial-gradient(circle, rgba(255,217,201,1) 0%, rgba(255,227,216,0) 80%)",
                }}
            /> */}
            <div
                className="-z-20 absolute top-[2vw] -right-[18vw] w-56 h-56 rounded-full border-[4px] border-dashed border-[#FFA680]"
            />
        </section>
    );
}
