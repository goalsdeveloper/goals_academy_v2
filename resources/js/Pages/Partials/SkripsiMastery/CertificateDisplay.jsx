import background from "/resources/img/vector/gradient-bg-9.svg";
import image from "/resources/img/skripsi-mastery/img-3.png";

export default function CertificateDisplay () {
    return (
        <section id="certificate-display" className="relative md:pt-[4.17vw] md:pb-[4vw] overflow-hidden">
            <div className="w-full absolute top-0 -z-10">
                <img src={background} alt="" />
            </div>
            <div className="w-[84.375%] mx-auto md:space-y-[3.38vw]">
                <h2 className="text-center text-white md:text-[2.5vw]">CV-mu setelah mengikuti kursus selama 6 bulan</h2>
                <div className="w-fit mx-auto">
                    <img src={image} alt="Skripsi Mastery Poster" className="md:w-[63.18vw] md:rounded-[2.08vw] object-cover" />
                </div>
            </div>
        </section>
    )
}