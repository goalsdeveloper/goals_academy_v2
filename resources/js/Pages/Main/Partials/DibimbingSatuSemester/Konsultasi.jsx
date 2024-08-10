import { useMediaQuery } from "react-responsive";
import GoalsButton from "@/Components/GoalsButton";
import gradientBg5 from "/resources/img/vector/gradient-bg-5.svg";

export default function Konsultasi () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="konsultasi" className="container mx-auto md:w-auto relative mb-[9vw] md:mb-0">
            <div className="relative shadow-normal rounded-[7.6vw] md:rounded-[1.75vw] md:h-[15.625vw] overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-[10vw] md:gap-0 py-[11.628vw] px-[6vw] md:p-[4vw]">
                    <div className="md:w-2/3 text-center md:text-start">
                        <h2 className="text-[5.6vw] md:text-[1.875vw] text-black font-bold md:font-semibold md:leading-[3vw] mb-[3vw] md:mb-[1vw]">Masih Bingung {isMobile && <br />}<span className="text-primary">Program Apa {isMobile && <br />}Yang Cocok Buat Kamu?</span></h2>
                        <p className="text-[3.256vw] md:text-[1.04vw] font-medium md:font-normal">Yuk, konsultasikan sekarang juga</p>
                    </div>
                    <div>
                        <GoalsButton href="https://wa.me/6282147638286" target="_blank" className="w-[40.47vw] md:w-fit px-[2vw] font-sans text-[3.256vw] md:text-[1.04vw] rounded-[2vw] md:rounded-[.5vw]">Hubungi CS</GoalsButton>
                    </div>
                </div>
                <img src={gradientBg5} alt="background" className="absolute left-0 top-0 bottom-0 w-full h-full -z-10" />
            </div>
        </section>
    )
}