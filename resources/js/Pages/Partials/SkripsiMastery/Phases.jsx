import { useMediaQuery } from "react-responsive";
import GoalsButton from "@/Components/elements/GoalsButton";
import background from "/resources/img/vector/gradient-bg-7.svg";
import backgroundMobile from "/resources/img/vector/gradient-bg-7-mobile.svg";

export default function Phases () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    
    const data = [
        "Mindset dan Aktivasi Critical Thinking Dalam Kepenulisan",
        "Menemukan Topik Terbaik untuk Skripsimu",
        "Menyusun Proposal Skripsi dan Halaman Skripsi",
        "Metodologi Penelitian",
        "Pengumpulan Data Berdasarkan Teori Indikator",
        "Selesai Bab 4 dan Bab 5 Tanpa Drama",
        "Menghadapi Sidang Akhir dengan Penuh Kesiapan"
    ]

    return (
        <section id="phases" className="relative pt-[12.86vw] pb-[12.86vw] md:pt-[6.2vw] md:pb-[3.85vw] overflow-hidden">
            <div className="absolute top-[20vw] md:-top-[10vw] right-0 -z-10">
                <img src={isMobile ? backgroundMobile : background} alt="Background Image" className="md:w-[65vw]" />
            </div>
            <div className="w-[88.35%] md:w-[84.375%] mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-[9.7vw] md:gap-0">
                    <h2 className="md:w-[49.11vw] text-[5.825vw] md:text-[2.5vw]">Bagaimana Program Skripsi Mastery ini Bisa Membantu Masa Depanmu?</h2>
                    <p className="md:w-[33.18vw] text-[2.9vw] md:text-[1.25vw]">Kami udah siapin roadmap fast track buat kamu nyusun skripsi di tahun 2025 biar ga perlu nambah semester lagi</p>
                </div>
                <div className="flex justify-center mt-[10.19vw] mb-[9.7vw] md:mt-[8.34vw] md:mb-[4.69vw]">
                    <div className="w-full md:w-[30.21vw]">
                        {data.map((item, index) => index ? (
                            <div key={index}>
                                <hr className="border-neutral-30 md:border-dark my-[5.285vw] md:my-[2.08vw]" />
                                <div className="flex justify-center md:justify-between items-center gap-[7.7vw] md:gap-0">
                                    <p className="font-poppins font-bold text-secondary text-[5.825vw] md:text-[2.5vw]">Phase<span className="text-[9.7vw] md:text-[3.75vw]">{index+1}</span></p>
                                    <p className="w-[47.57vw] md:w-[18vw] text-[2.9vw] md:text-[1.25vw]">{item}</p>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="flex justify-center md:justify-between items-center gap-[7.7vw] md:gap-0">
                                <p className="font-poppins font-bold text-secondary text-[5.825vw] md:text-[2.5vw]">Phase<span className="text-[9.7vw] md:text-[3.75vw]">{index+1}</span></p>
                                <p className="w-[47.57vw] md:w-[18vw] text-[2.9vw] md:text-[1.25vw]">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center">
                    <GoalsButton variant="bordered" className="text-[3.4vw] md:text-[1.04vw]">BONUS Time Management dan Tools Bantu Skripsimu</GoalsButton>
                </div>
            </div>
        </section>
    )
}