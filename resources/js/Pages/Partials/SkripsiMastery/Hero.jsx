import { useMediaQuery } from "react-responsive";
import { FaAlignLeft, FaStar } from "react-icons/fa6";
import groupPicture from "/resources/img/skripsi-mastery/group-picture.svg";
import image from "/resources/img/skripsi-mastery/img-1.png";
import imageMobile from "/resources/img/skripsi-mastery/img-1-mobile.png";

export default function Hero () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="hero" className="pt-[16.89vw] md:pt-[5.4vw] md:pb-[6.2vw]">
            <div className="w-[88.35%] md:w-[84.375%] mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between items-stretch gap-[11.65vw] md:gap-0">
                    <div className="md:w-[49vw] space-y-[3.93vw] md:space-y-[1.67vw]">
                        <div className="md:w-[26vw] border-1 border-gray-300 rounded-full px-[5.825vw] md:px-[2.08vw] py-[1.94vw] md:py-[.83vw] flex justify-between items-center">
                            <img src={groupPicture} alt="Group Picture" className="w-[15.72vw] md:w-[6.67vw]" />
                            <p className="w-[55vw] md:w-[13.9vw] font-poppins font-medium text-[2.9vw] md:text-[.83vw]"><span className="text-primary font-semibold text-[3.4vw] md:text-[1.25vw]">5.000+</span> mahasiswa telah bimbingan di Goals Academy</p>
                        </div>
                        <h1 className="text-[5.825vw] md:text-[2.5vw] leading-normal">Belajar Strategi Nyusun Skripsi dari Ahlinya Biar Kamu Bisa Segera Lulus Dan Dapet Pekerjaan Impianmu</h1>
                    </div>
                    <div className="md:w-[18.28vw] flex md:flex-col justify-between">
                        <div className="space-y-[1.94vw] md:space-y-[1vw]">
                            <p className="text-[3.88vw] md:text-[1.875vw] font-semibold font-poppins flex md:items-center gap-[1.94vw] md:gap-[1vw]"><FaStar className="text-yellow-500" /> 4.8/5</p>
                            <p className="text-neutral-70 text-[2.9vw] md:text-[1.25vw]">Tingkat kepuasan mahasiswa terhadap hasil bimbingan</p>
                        </div>
                        <div className="space-y-[1.94vw] md:space-y-[1vw]">
                            <p className="text-[3.88vw] md:text-[1.875vw] font-semibold font-poppins flex md:items-center gap-[1.94vw] md:gap-[1vw]"><FaAlignLeft className="text-blue-500 -rotate-90" /> 82%</p>
                            <p className="text-neutral-70 text-[2.9vw] md:text-[1.25vw]">Mahasiswa berhasil lulus kurang dari 6 bulan</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-[5.825vw] md:gap-[2.5vw] font-poppins *:md:font-semibold text-neutral-70 mt-[7.37vw] mb-[9.7vw] md:mt-[3.34vw] md:mb-[4.48vw]">
                    <p className="w-[29.85vw] md:w-auto text-[5.825vw] md:text-[1.875vw] font-bold text-primary">23 : 59 : 59</p>
                    <p className="w-[52.43vw] md:w-auto font-sans md:font-poppins text-[2.9vw] md:text-[1.25vw]">Dapatkan harga waitinglist sebelum berakhir</p>
                </div>
                <div className="w-[110%] h-[70vw] md:w-auto md:h-auto -translate-x-[5vw] md:-translate-x-0 flex justify-center">
                    <img src={isMobile ? imageMobile : image} alt="Skripsi Mastery Poster" className="md:w-[65.834vw] md:rounded-[2.08vw] object-cover" />
                </div>
            </div>
        </section>
    )
}