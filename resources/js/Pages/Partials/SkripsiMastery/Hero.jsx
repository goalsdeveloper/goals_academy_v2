import { FaAlignLeft, FaStar } from "react-icons/fa6";
import groupPicture from "/resources/img/skripsi-mastery/group-picture.svg";
import image from "/resources/img/skripsi-mastery/img-1.png";

export default function Hero () {
    return (
        <section id="hero" className="md:pt-[5.4vw] md:pb-[6.2vw]">
            <div className="w-[84.375%] mx-auto">
                <div className="flex justify-between items-stretch">
                    <div className="w-[49vw] space-y-[1.67vw]">
                        <div className="md:w-[26vw] border-1 border-gray-300 rounded-full px-[2.08vw] py-[.83vw] flex justify-between items-center">
                            <img src={groupPicture} alt="Group Picture" className="md:w-[6.67vw]" />
                            <p className="md:w-[13.9vw] font-poppins font-medium text-[.83vw]"><span className="text-secondary font-semibold text-[1.25vw]">5.000+</span> mahasiswa telah bimbingan di Goals Academy</p>
                        </div>
                        <h1 className="md:text-[2.5vw] leading-normal">Belajar Strategi Nyusun Skripsi dari Ahlinya Biar Kamu Bisa Segera Lulus Dan Dapet Pekerjaan Impianmu</h1>
                    </div>
                    <div className="w-[18.28vw] flex flex-col justify-between">
                        <div className="space-y-[1vw]">
                            <p className="text-[1.875vw] font-semibold font-poppins flex items-center md:gap-[1vw]"><FaStar className="text-yellow-500" /> 4.8/5</p>
                            <p className="text-neutral-70">Tingkat kepuasan mahasiswa terhadap hasil bimbingan</p>
                        </div>
                        <div className="space-y-[1vw]">
                            <p className="text-[1.875vw] font-semibold font-poppins flex items-center md:gap-[1vw]"><FaAlignLeft className="text-blue-500 -rotate-90" /> 82%</p>
                            <p className="text-neutral-70">Tingkat kepuasan mahasiswa terhadap hasil bimbingan</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center md:gap-[2.5vw] font-poppins font-semibold md:mt-[3.34vw] md:mb-[4.48vw]">
                    <p className="md:text-[1.875vw] text-secondary">23 : 59 : 59</p>
                    <p className="md:text-[1.25vw]">Dapatkan harga waitinglist sebelum berakhir</p>
                </div>
                <div className="flex justify-center">
                    <img src={image} alt="Skripsi Mastery Poster" className="md:w-[65.834vw] md:rounded-[2.08vw] object-cover" />
                </div>
            </div>
        </section>
    )
}