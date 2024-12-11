import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import GoalsButton from "@/Components/GoalsButton";
import calendarIcon from "/resources/img/icon/calendar-1.png";
import circle1 from "/resources/img/vector/circle-1.svg";
import circle2 from "/resources/img/vector/circle-2.svg";
import circle3 from "/resources/img/vector/circle-3.svg";
import circle4 from "/resources/img/vector/circle-4.svg";

export default function CTA({ registrationLink }) {
    const [variant, setVariant] = useState(3);

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="cta" className="relative bg-secondary">
            {isMobile
                ? <img src={circle4} alt="" className="absolute top-0 left-0 h-full" />
                : (
                    <>
                        <img src={circle1} alt="" className="absolute top-0 left-0 h-full" />

                        {variant == 2
                            ? <img src={circle2} alt="" className="absolute top-0 left-[38vw] h-full" />
                            : <img src={circle3} alt="" className="absolute top-0 right-0 h-full" />
                        }
                    </>
                )
            }

            <div className="container mx-auto relative h-[58.14vw] md:h-[22vw] flex flex-col md:flex-row justify-center md:justify-between items-center">
                <div className="flex flex-col items-center md:items-start gap-[2.56vw] md:gap-[1.3vw]">

                    {((variant == 2) || isMobile) &&
                        <span className="w-fit p-[1vw] px-[2vw] md:p-[.5vw] md:px-[1.5vw] bg-red-500 text-white rounded-[1vw] md:rounded-[.5vw] text-[2.8vw] md:text-[1.25vw] font-medium md:font-semibold font-poppins">Bimbingan Sudah Dimulai!</span>
                    }

                    <div className="flex flex-col items-center md:items-start gap-[1vw]">
                        <h2 className="text-white text-[5vw] md:text-[2.5vw]">DIBIMBING SATU SEMESTER</h2>
                        <p className="text-[2.8vw] md:text-[1.25vw] flex items-center gap-[1vw] md:gap-[.5vw] !text-white text-center md:text-start">
                            <img className="w-[3vw] md:w-[2vw]" src={calendarIcon} alt="📆" /> Bimbingan Dimulai : 2 September 2024
                        </p>
                    </div>

                    {((variant == 2) && !isMobile) &&
                        <GoalsButton className="w-fit px-[1.25vw] font-sans !font-bold text-[1.04vw] rounded-[.25vw]" activeClassName="bg-white text-secondary hover:bg-soft">DAFTAR SEKARANG</GoalsButton>
                    }

                </div>

                {isMobile
                    ? (
                        <div className="w-full grid grid-cols-2 gap-[2vw] mt-[7.44vw]">
                            <GoalsButton href="https://wa.me/6282147638286" target="_blank" className="font-sans font-medium md:!font-bold text-[3.25vw] md:text-[1.04vw] rounded-[1.8vw] md:rounded-[.5vw]" activeClassName="bg-none hover:bg-white text-white hover:text-secondary border-white border-2">Hubungi CS</GoalsButton>
                            <GoalsButton href={registrationLink} className="w-full md:w-fit md:px-[2vw] font-sans !font-medium text-[3.25vw] md:text-[1.04vw] rounded-[1.8vw] md:rounded-[.5vw]" activeClassName="bg-white text-secondary hover:bg-soft">Daftar Sekarang</GoalsButton>
                        </div>
                    )
                    : (
                        <>
                            {variant == 1 &&
                                <GoalsButton href={registrationLink} className="w-full md:w-fit md:px-[2vw] font-sans !font-medium text-[3.25vw] md:text-[1.04vw] rounded-[1.8vw] md:rounded-[.5vw]" activeClassName="bg-white text-secondary hover:bg-soft">Daftar Sekarang</GoalsButton>
                            }

                            {variant == 2 &&
                                <div className="text-white">
                                    <p className="font-poppins text-[2.8vw] md:text-[1.25vw] mb-[1vw] pe-[1vw]">Ada Pertanyaan?</p>
                                    <GoalsButton href="https://wa.me/6282147638286" target="_blank" className="font-sans font-medium md:!font-bold text-[3.25vw] md:text-[1.04vw] rounded-[1.8vw] md:rounded-[.5vw]" activeClassName="bg-none hover:bg-white text-white hover:text-secondary border-white border-2">Hubungi CS</GoalsButton>
                                </div>
                            }

                            {variant == 3 &&
                                <>
                                    <div className="w-[24vw] flex flex-col items-center gap-[1vw] px-[1vw] border-x-[.1vw] border-white text-center">
                                        <span className="w-fit p-[.5vw] px-[1.5vw] bg-red-500 text-white rounded-[.5vw] text-[2.8vw] md:text-[1.25vw] font-semibold font-poppins">Bimbingan Sudah Dimulai!</span>
                                        <p className="text-[2.8vw] md:text-[1.25vw] flex items-center gap-[.5vw] !text-white">Hubungi CS untuk<br />ikut bimbingan sekarang</p>
                                    </div>
                                    <GoalsButton href="https://wa.me/6282147638286" target="_blank" className="w-full md:w-fit md:px-[2vw] font-sans !font-medium text-[3.25vw] md:text-[1.04vw] rounded-[1.8vw] md:rounded-[.25vw]" activeClassName="bg-white text-secondary hover:bg-soft">Hubungi CS</GoalsButton>
                                </>
                            }
                        </>
                    )
                }

            </div>
        </section>
    );
}
