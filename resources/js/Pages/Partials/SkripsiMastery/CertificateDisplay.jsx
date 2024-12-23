import { useMediaQuery } from "react-responsive";
import background from "/resources/img/vector/gradient-bg-9.svg";
import backgroundMobile from "/resources/img/vector/gradient-bg-9-mobile.svg";
import image from "/resources/img/skripsi-mastery/certificate.png";

export default function CertificateDisplay () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="certificate-display" className="relative pt-[19.17vw] pb-[26vw] md:pt-[4.17vw] md:pb-[4vw] md:overflow-hidden z-10">
            <div className="w-full absolute top-0 -z-10">
                <img className="w-full rounded-[3.32vw] md:rounded-[.83vw]" src={isMobile ? backgroundMobile : background} alt="" />
            </div>
            <div className="md:w-[84.375%] mx-auto space-y-[19.42vw] md:space-y-[3.38vw]">
                <h2 className="w-[88.35%] md:w-auto mx-auto text-center text-white text-[5.825vw] md:text-[2.5vw]">CV-mu setelah mengikuti kursus selama 6 bulan</h2>
                <div className="w-fit mx-auto">
                    <img src={image} alt="Skripsi Mastery Poster" className="w-full md:w-[57vw] md:rounded-[2.08vw] object-cover" />
                </div>
            </div>
        </section>
    )
}