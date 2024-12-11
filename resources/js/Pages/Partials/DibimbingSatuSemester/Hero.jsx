import gradientBg3 from "/resources/img/vector/gradient-bg-3.svg";
import gradientBg4 from "/resources/img/vector/gradient-bg-4.svg";
import figure9 from "/resources/img/figure/9.svg";
import { useMediaQuery } from "react-responsive";

export default function Hero() {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="hero" className="">
            <div className="relative w-[90%] md:w-[100%] md:ps-[12.5vw] md:pe-[7.5vw] mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 overflow-hidden">
                {!isMobile && 
                    <div className="absolute left-0 bottom-0 w-full sm:w-10/12 md:w-6/12 h-[38vw] overflow-hidden -z-10">
                        <img
                            className=""
                            src={gradientBg3}   
                            alt="Gradient Bg 3"
                        />
                    </div>
                }
                <div className="flex flex-col items-center md:block md:w-7/12 mt-[18.6vw] md:-mt-[8vw]">
                    <h1 className="text-center md:text-start text-[5vw] md:text-[2.5vw] mb-[4.19vw] md:mb-[1vw]">
                        Ubah Tantangan{" "}
                        <span className="text-primary">Jadi Prestasi</span>
                    </h1>
                    <p className="w-[70%] md:w-[30vw] font-poppins md:font-sans font-medium md:font-normal text-center md:text-start text-[2.8vw] md:text-[1.25vw]">
                        Program bimbingan intensif satu semester dengan 28 kali pertemuan bersama {!isMobile && <br />}
                        <span className="md:font-semibold">Tutor Professional Goals Academy</span>
                    </p>
                </div>
                <div className="w-[58.14vw] md:w-[56%] h-[55vw] md:h-[36.75vw] mt-[4vw] md:mt-0 overflow-hidden">
                    <img
                        className=""
                        src={figure9}   
                        alt="Figure 9"
                    />
                </div>
                {!isMobile && 
                    <div className="absolute right-0 bottom-0 w-full sm:w-10/12 md:w-6/12 h-[38vw] overflow-hidden -z-10">
                        <img
                            className="translate-x-[4vw]"
                            src={gradientBg4}   
                            alt="Gradient Bg 4"
                        />
                    </div>
                }
            </div>
        </section>
    );
}
