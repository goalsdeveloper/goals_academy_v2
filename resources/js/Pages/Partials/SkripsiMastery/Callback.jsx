import { useMediaQuery } from "react-responsive";
import GoalsButton from "@/Components/elements/GoalsButton";
import background from "/resources/img/skripsi-mastery/bg-quotes.svg";
import backgroundMobile from "/resources/img/skripsi-mastery/bg-quotes-mobile.svg";

export default function Callback () {    
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="callback" className="relative pt-[23.54vw] pb-[118.5vw] md:py-[10vw] overflow-hidden">
            <div className="w-full absolute top-0 -z-10">
                <img className="w-full" src={isMobile ? backgroundMobile : background} alt="Background Image" />
            </div>
            <div className="w-[85%] md:w-[84.375%] mx-auto *:text-white md:space-y-[3.38vw]">
                <div className="h-full md:w-[65%] text-center md:text-left space-y-[11.65vw] md:space-y-[4.17vw]">
                    <div className="space-y-[7.77vw] *:text-white md:space-y-[1.67vw]">
                        <h2 className="leading-normal text-[5.825vw] md:text-[2.5vw]">“Selesai nggaknya skripsi dan seperti apa kamu 5 tahun kedepan, tergantung apa yang kamu lakukan hari ini”</h2>
                        <p className="font-poppins text-[2.9vw] md:text-[1.25vw]">Yordhan Ghalis Dewangga - CEO Goals Academy</p>
                    </div>
                    <div>
                        <a href="#pricelist"><GoalsButton className="!bg-primary !border-primary w-[62.93vw] md:w-[20.83vw] text-[3.4vw] md:text-[1.04vw]">Take Action Sekarang!</GoalsButton></a>
                    </div>
                </div>
            </div>
        </section>
    )
}