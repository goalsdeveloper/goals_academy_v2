import { useMediaQuery } from "react-responsive";
import image from "/resources/img/skripsi-mastery/img-2.png";
import imageMobile from "/resources/img/skripsi-mastery/img-2-mobile.png";

export default function Quotes () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="quotes" className="py-[16vw] md:pt-[4.27vw] md:pb-[7.34vw] overflow-hidden">
            <div className="w-[88.35%] md:w-[84.375%] mx-auto space-y-[13.59vw] md:space-y-[7.3vw]">
                <div className="md:w-[37vw] mx-auto text-center space-y-[5.825vw] md:space-y-[2.9vw]">
                    <h2 className="text-[5.825vw] md:text-[2.5vw]">Lingkunganmu Menentukan Siapa Dirimu Sekarang</h2>
                    <p className="text-[2.9vw] md:text-[1.25vw]">Goals Academy Siapin Komunitas yang Siap Mendukung Kesehatan Mentalmu Selama Proses Bimbingan Berlangsung</p>
                </div>
                <div className="w-[115%] h-[68.5vw] md:w-auto md:h-auto -translate-x-[6%] md:-translate-x-0 overflow-hidden">
                    <img src={isMobile ? imageMobile : image} alt="Skripsi Mastery Poster" className="w-full md:rounded-[2.08vw] object-cover" />
                </div>
            </div>
        </section>
    )
}